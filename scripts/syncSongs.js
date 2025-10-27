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

// Extract metadata from ChordPro file (matching bash script behavior)
function extractMetadata(content, filename) {
  // Extract title
  const titleMatch = content.match(/\{title:\s*([^}]+)\}/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  // Extract artist
  const artistMatch = content.match(/\{artist:\s*([^}]+)\}/i);
  const artist = artistMatch ? artistMatch[1].trim() : '';
  
  // Extract tags (comma-separated list)
  const tagsMatch = content.match(/\{tags:\s*([^}]+)\}/i);
  let tags = [];
  if (tagsMatch) {
    tags = tagsMatch[1]
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  }
  
  // Generate ID from filename
  const id = filename.replace('.cho', '');
  
  return { id, title, artist, filename, tags };
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
        
        // Read file with explicit UTF-8 encoding
        const content = fs.readFileSync(filePath, { encoding: 'utf8' });
        const metadata = extractMetadata(content, filename);

        console.log(`Processing: ${metadata.title || filename}...`);

        // Create a UTF-8 Buffer from content
        const contentBuffer = Buffer.from(content, 'utf8');
        
        // Upload to Storage using .save() method with Buffer
        const destination = `charts/${filename}`;
        const file = bucket.file(destination);
        
        await file.save(contentBuffer, {
          metadata: {
            contentType: 'text/plain; charset=utf-8',
            cacheControl: 'public, max-age=3600',
            metadata: {
              songId: metadata.id,
              title: metadata.title
            }
          },
          resumable: false // Faster for small files
        });

        // Make file public
        await file.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;

        // Update Firestore
        await db.collection('songs').doc(metadata.id).set({
          title: metadata.title,
          artist: metadata.artist,
          tags: metadata.tags,
          filename: metadata.filename,
          fileUrl: publicUrl,
          updatedAt: new Date()
        }, { merge: true });

        // Add to index.json (matching bash script format exactly)
        indexData.push({
          id: metadata.id,
          title: metadata.title,
          artist: metadata.artist,
          filename: metadata.filename,
          tags: metadata.tags
        });

        console.log(`✅ ${metadata.title || filename} synced`);
        syncedCount++;

      } catch (err) {
        console.error(`❌ Error syncing ${filename}:`, err.message);
      }
    }

    // Write index.json locally with UTF-8
    fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), { encoding: 'utf8' });
    console.log(`\n📝 Local index.json updated with ${indexData.length} songs`);

    // Upload index.json to Firebase Storage
    try {
      const indexBuffer = Buffer.from(JSON.stringify(indexData, null, 2), 'utf8');
      const indexFile = bucket.file('index.json');
      
      await indexFile.save(indexBuffer, {
        metadata: {
          contentType: 'application/json; charset=utf-8',
          cacheControl: 'public, max-age=300' // 5 minutes cache
        },
        resumable: false
      });

      await indexFile.makePublic();
      const indexUrl = `https://storage.googleapis.com/${bucket.name}/index.json`;

      console.log(`📤 index.json uploaded to Firebase Storage`);
      console.log(`🔗 ${indexUrl}`);
    } catch (err) {
      console.error(`⚠️  Error uploading index.json:`, err.message);
    }

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
