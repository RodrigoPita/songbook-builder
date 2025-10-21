#!/usr/bin/env node

/**
 * Script to automatically sync songs to Firebase
 * Scans public/charts/*.cho files and updates both:
 *   1. public/index.json (for backup)
 *   2. Firebase Firestore + Storage
 * 
 * Usage:
 *   node scripts/syncSongs.js
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

// Extract metadata from ChordPro file
function extractMetadata(content, filename) {
  const titleMatch = content.match(/\{title:\s*([^}]+)\}/i);
  const artistMatch = content.match(/\{artist:\s*([^}]+)\}/i);
  const keyMatch = content.match(/\{(?:key|k):\s*([A-G][#b]?m?)\}/i);

  const title = titleMatch ? titleMatch[1].trim() : filename.replace('.cho', '');
  const artist = artistMatch ? artistMatch[1].trim() : '';
  const key = keyMatch ? keyMatch[1].trim() : '';

  // Generate ID from filename
  const id = filename.replace('.cho', '').toLowerCase().replace(/\s+/g, '_');

  return { id, title, artist, key, filename };
}

async function syncSongs() {
  try {
    console.log('🔄 Starting sync...\n');

    const chartsDir = path.join(__dirname, '../public/charts');
    const indexPath = path.join(__dirname, '../public/index.json');

    // Get all .cho files
    const files = fs.readdirSync(chartsDir)
      .filter(file => file.endsWith('.cho'))
      .sort();

    console.log(`📁 Found ${files.length} .cho files\n`);

    const indexData = [];
    let syncedCount = 0;

    for (const filename of files) {
      try {
        const filePath = path.join(chartsDir, filename);
        const content = fs.readFileSync(filePath, 'utf8');
        const metadata = extractMetadata(content, filename);

        console.log(`Processing: ${metadata.title}...`);

        // Upload to Storage
        const destination = `charts/${filename}`;
        await bucket.upload(filePath, {
          destination,
          metadata: {
            contentType: 'text/plain',
            metadata: {
              songId: metadata.id,
              title: metadata.title
            }
          }
        });

        const file = bucket.file(destination);
        await file.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;

        // Update Firestore
        await db.collection('songs').doc(metadata.id).set({
          title: metadata.title,
          artist: metadata.artist,
          key: metadata.key,
          filename: metadata.filename,
          fileUrl: publicUrl,
          updatedAt: new Date()
        }, { merge: true });

        // Add to index.json
        indexData.push({
          id: metadata.id,
          title: metadata.title,
          artist: metadata.artist,
          key: metadata.key,
          filename: metadata.filename
        });

        console.log(`✅ ${metadata.title} synced`);
        syncedCount++;

      } catch (err) {
        console.error(`❌ Error syncing ${filename}:`, err.message);
      }
    }

    // Write index.json
    fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf8');
    console.log(`\n📝 index.json updated with ${indexData.length} songs`);

    console.log(`\n🎉 Sync complete!`);
    console.log(`✅ Synced: ${syncedCount} songs`);
    console.log(`📍 Firebase: Firestore + Storage`);
    console.log(`📍 Local: index.json updated`);

  } catch (err) {
    console.error('💥 Sync failed:', err);
    process.exit(1);
  }
}

syncSongs();
