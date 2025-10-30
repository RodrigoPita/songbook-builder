#!/usr/bin/env node

/**
 * Bidirectional sync script for Firebase
 * 
 * Syncs songs in both directions:
 *   1. Local files (public/charts/*.cho) → Firebase (Storage + Firestore)
 *   2. Firebase Storage *.cho files → Firestore (if missing)
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

// Extract metadata from ChordPro content
function extractMetadata(content, filename) {
  const titleMatch = content.match(/\{title:\s*([^}]+)\}/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const artistMatch = content.match(/\{artist:\s*([^}]+)\}/i);
  const artist = artistMatch ? artistMatch[1].trim() : '';

  const tagsMatch = content.match(/\{tags:\s*([^}]+)\}/i);
  let tags = [];
  if (tagsMatch) {
    tags = tagsMatch[1]
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  }

  const id = filename.replace('.cho', '');

  return { id, title, artist, filename, tags };
}

async function syncSongs() {
  try {
    console.log('🔄 Starting bidirectional sync...\n');

    const chartsDir = path.join(__dirname, '../public/charts');
    const indexPath = path.join(__dirname, '../public/index.json');

    // ========================================
    // STEP 1: Sync LOCAL → FIREBASE
    // ========================================
    console.log('📤 Step 1: Syncing local files to Firebase...\n');

    const localFiles = fs.existsSync(chartsDir)
      ? fs.readdirSync(chartsDir).filter(file => file.endsWith('.cho')).sort()
      : [];

    console.log(`📁 Found ${localFiles.length} local .cho files`);

    const indexData = [];
    let uploadedCount = 0;

    for (const filename of localFiles) {
      try {
        const filePath = path.join(chartsDir, filename);
        const content = fs.readFileSync(filePath, { encoding: 'utf8' });
        const metadata = extractMetadata(content, filename);

        console.log(`  ↑ Uploading: ${metadata.title || filename}...`);

        // Upload to Storage
        const contentBuffer = Buffer.from(content, 'utf8');
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
          resumable: false
        });

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

        indexData.push({
          id: metadata.id,
          title: metadata.title,
          artist: metadata.artist,
          filename: metadata.filename,
          tags: metadata.tags
        });

        uploadedCount++;

      } catch (err) {
        console.error(`  ✗ Error uploading ${filename}:`, err.message);
      }
    }

    console.log(`\n✅ Uploaded ${uploadedCount} local files\n`);

    // ========================================
    // STEP 2: Sync FIREBASE STORAGE → FIRESTORE
    // ========================================
    console.log('📥 Step 2: Checking for songs in Storage not in Firestore...\n');

    // Get all .cho files from Storage
    const [storageFiles] = await bucket.getFiles({ prefix: 'charts/' });
    const choFilesInStorage = storageFiles
      .filter(file => file.name.endsWith('.cho'))
      .map(file => file.name.replace('charts/', ''));

    console.log(`🗄️  Found ${choFilesInStorage.length} .cho files in Storage`);

    // Get all song IDs from Firestore
    const firestoreSnapshot = await db.collection('songs').get();
    const firestoreIds = new Set(firestoreSnapshot.docs.map(doc => doc.id));

    console.log(`📊 Found ${firestoreIds.size} documents in Firestore`);

    // Find songs in Storage but not in Firestore
    const missingInFirestore = [];
    for (const filename of choFilesInStorage) {
      const id = filename.replace('.cho', '');
      if (!firestoreIds.has(id)) {
        missingInFirestore.push(filename);
      }
    }

    if (missingInFirestore.length > 0) {
      console.log(`\n⚠️  Found ${missingInFirestore.length} songs in Storage missing from Firestore`);

      for (const filename of missingInFirestore) {
        try {
          console.log(`  ↓ Syncing from Storage: ${filename}...`);

          // Download file from Storage
          const file = bucket.file(`charts/${filename}`);
          const [content] = await file.download();
          const contentStr = content.toString('utf8');
          const metadata = extractMetadata(contentStr, filename);

          // Make sure it's public
          await file.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/charts/${filename}`;

          // Create Firestore document
          await db.collection('songs').doc(metadata.id).set({
            title: metadata.title,
            artist: metadata.artist,
            tags: metadata.tags,
            filename: metadata.filename,
            fileUrl: publicUrl,
            updatedAt: new Date(),
            syncedFromStorage: true
          });

          // Add to index
          if (!indexData.find(s => s.id === metadata.id)) {
            indexData.push({
              id: metadata.id,
              title: metadata.title,
              artist: metadata.artist,
              filename: metadata.filename,
              tags: metadata.tags
            });
          }

          console.log(`  ✓ Synced: ${metadata.title || filename}`);

        } catch (err) {
          console.error(`  ✗ Error syncing ${filename}:`, err.message);
        }
      }
    } else {
      console.log('✅ All Storage files are in Firestore');
    }

    // ========================================
    // STEP 3: Update index.json from Firestore
    // ========================================
    console.log('\n📝 Step 3: Generating index.json from Firestore...\n');

    // Get ALL songs from Firestore (source of truth)
    const allSongsSnapshot = await db.collection('songs').orderBy('title', 'asc').get();
    const finalIndexData = allSongsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        artist: data.artist || '',
        filename: data.filename || '',
        tags: data.tags || []
      };
    });

    console.log(`📊 Retrieved ${finalIndexData.length} songs from Firestore`);

    // Write local index.json
    if (fs.existsSync(path.dirname(indexPath))) {
      fs.writeFileSync(indexPath, JSON.stringify(finalIndexData, null, 2), { encoding: 'utf8' });
      console.log(`✓ Local index.json updated (${finalIndexData.length} songs)`);
    } else {
      console.log(`⚠️  Skipping local index.json (public/ folder not found)`);
    }

    // Upload index.json to Storage
    try {
      const indexBuffer = Buffer.from(JSON.stringify(finalIndexData, null, 2), 'utf8');
      const indexFile = bucket.file('index.json');

      await indexFile.save(indexBuffer, {
        metadata: {
          contentType: 'application/json; charset=utf-8',
          cacheControl: 'public, max-age=300'
        },
        resumable: false
      });

      await indexFile.makePublic();
      const indexUrl = `https://storage.googleapis.com/${bucket.name}/index.json`;

      console.log(`✓ index.json uploaded to Storage`);
      console.log(`  ${indexUrl}`);
    } catch (err) {
      console.error(`✗ Error uploading index.json:`, err.message);
    }

    // ========================================
    // SUMMARY
    // ========================================
    console.log(`\n${'='.repeat(50)}`);
    console.log('🎉 Sync complete!');
    console.log(`${'='.repeat(50)}`);
    console.log(`📤 Local → Firebase: ${uploadedCount} files`);
    console.log(`📥 Storage → Firestore: ${missingInFirestore.length} files`);
    console.log(`📊 Total in Firestore: ${finalIndexData.length} songs`);
    console.log(`${'='.repeat(50)}\n`);

  } catch (err) {
    console.error('💥 Sync failed:', err);
    process.exit(1);
  }
}

syncSongs();
