#!/usr/bin/env node

/**
 * Script to migrate songs from local files to Firebase
 * 
 * Usage:
 *   node scripts/migrateToFirebase.js
 * 
 * Requirements:
 *   - Firebase Admin SDK credentials (serviceAccountKey.json)
 *   - public/index.json with song metadata
 *   - public/charts/*.cho files
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../serviceAccountKey.json'), 'utf8')
);

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'songbook-builder.firebasestorage.app'
});

const db = getFirestore();
const bucket = getStorage().bucket();

// Extract key from ChordPro content
function extractKeyFromContent(content) {
  const keyMatch = content.match(/\{(?:key|k):\s*([A-G][#b]?m?)\}/i);
  return keyMatch ? keyMatch[1] : '';
}

async function migrateSongs() {
  try {
    console.log('🔥 Starting Firebase migration...\n');

    // Read index.json
    const indexPath = path.join(__dirname, '../public/index.json');
    const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

    console.log(`📋 Found ${indexData.length} songs in index.json\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const song of indexData) {
      try {
        console.log(`Processing: ${song.title}...`);

        // Read .cho file
        const choPath = path.join(__dirname, `../public/charts/${song.filename}`);
        const choContent = fs.readFileSync(choPath, 'utf8');

        // Extract key if not in index.json
        const key = song.key || extractKeyFromContent(choContent);

        // Upload .cho file to Storage
        const destination = `charts/${song.filename}`;
        await bucket.upload(choPath, {
          destination,
          metadata: {
            contentType: 'text/plain; charset=utf-8',
            metadata: {
              songId: song.id,
              title: song.title
            }
          }
        });

        // Get public URL
        const file = bucket.file(destination);
        await file.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;

        // Add document to Firestore
        await db.collection('songs').doc(song.id).set({
          title: song.title,
          artist: song.artist || '',
          key: key,
          filename: song.filename,
          fileUrl: publicUrl,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        console.log(`✅ ${song.title} migrated successfully`);
        successCount++;

      } catch (err) {
        console.error(`❌ Error migrating ${song.title}:`, err.message);
        errorCount++;
      }
    }

    console.log(`\n🎉 Migration complete!`);
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);

  } catch (err) {
    console.error('💥 Migration failed:', err);
    process.exit(1);
  }
}

// Run migration
migrateSongs();
