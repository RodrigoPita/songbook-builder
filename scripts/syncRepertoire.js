#!/usr/bin/env node

/**
 * Bidirectional sync script for Repertoire collection
 * 
 * Syncs songs in both directions:
 *   1. Local files (public/repertoire/*.cho) → Firebase (Storage + Firestore)
 *   2. Firebase Storage *.cho files → Firestore (if missing)
 * 
 * Usage:
 *   node scripts/syncRepertoire.js
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

// Collection and storage path for repertoire
const COLLECTION_NAME = 'repertoire';
const STORAGE_PATH = 'repertoire';
const LOCAL_DIR = 'public/repertoire';

// ========================================
// SORTING UTILITIES
// ========================================

function stripArticles(title) {
    if (!title || typeof title !== 'string') return '';
    const articles = /^(A|O|Os|As|Um|Uma|An|The)\s+/i;
    return title.replace(articles, '').trim();
}

function compareTitles(titleA, titleB) {
    const a = stripArticles(titleA).toLowerCase();
    const b = stripArticles(titleB).toLowerCase();
    return a.localeCompare(b, 'pt-BR', { sensitivity: 'base' });
}

// ========================================
// METADATA EXTRACTION
// ========================================

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

async function syncRepertoire() {
    try {
        console.log('🎵 Starting repertoire sync...\n');

        const chartsDir = path.join(__dirname, `../${LOCAL_DIR}`);

        // ========================================
        // STEP 1: Sync LOCAL → FIREBASE
        // ========================================
        console.log('📤 Step 1: Syncing local files to Firebase...\n');

        const localFiles = fs.existsSync(chartsDir)
            ? fs.readdirSync(chartsDir).filter(file => file.endsWith('.cho')).sort()
            : [];

        console.log(`📁 Found ${localFiles.length} local .cho files`);

        let uploadedCount = 0;

        for (const filename of localFiles) {
            try {
                const filePath = path.join(chartsDir, filename);
                const content = fs.readFileSync(filePath, { encoding: 'utf8' });
                const metadata = extractMetadata(content, filename);

                console.log(`  ↑ Uploading: ${metadata.title || filename}...`);

                // Upload to Storage
                const contentBuffer = Buffer.from(content, 'utf8');
                const destination = `${STORAGE_PATH}/${filename}`;
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
                await db.collection(COLLECTION_NAME).doc(metadata.id).set({
                    title: metadata.title,
                    artist: metadata.artist,
                    tags: metadata.tags,
                    filename: metadata.filename,
                    fileUrl: publicUrl,
                    updatedAt: new Date()
                }, { merge: true });

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

        const [storageFiles] = await bucket.getFiles({ prefix: `${STORAGE_PATH}/` });
        const choFilesInStorage = storageFiles
            .filter(file => file.name.endsWith('.cho'))
            .map(file => file.name.replace(`${STORAGE_PATH}/`, ''));

        console.log(`🗄️  Found ${choFilesInStorage.length} .cho files in Storage`);

        const firestoreSnapshot = await db.collection(COLLECTION_NAME).get();
        const firestoreIds = new Set(firestoreSnapshot.docs.map(doc => doc.id));

        console.log(`📊 Found ${firestoreIds.size} documents in Firestore`);

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

                    const file = bucket.file(`${STORAGE_PATH}/${filename}`);
                    const [content] = await file.download();
                    const contentStr = content.toString('utf8');
                    const metadata = extractMetadata(contentStr, filename);

                    await file.makePublic();
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${STORAGE_PATH}/${filename}`;

                    await db.collection(COLLECTION_NAME).doc(metadata.id).set({
                        title: metadata.title,
                        artist: metadata.artist,
                        tags: metadata.tags,
                        filename: metadata.filename,
                        fileUrl: publicUrl,
                        updatedAt: new Date(),
                        syncedFromStorage: true
                    });

                    console.log(`  ✓ Synced: ${metadata.title || filename}`);

                } catch (err) {
                    console.error(`  ✗ Error syncing ${filename}:`, err.message);
                }
            }
        } else {
            console.log('✅ All Storage files are in Firestore');
        }

        // ========================================
        // SUMMARY
        // ========================================
        const finalCount = await db.collection(COLLECTION_NAME).get();

        console.log(`\n${'='.repeat(50)}`);
        console.log('🎉 Repertoire sync complete!');
        console.log(`${'='.repeat(50)}`);
        console.log(`📤 Local → Firebase: ${uploadedCount} files`);
        console.log(`📥 Storage → Firestore: ${missingInFirestore.length} files`);
        console.log(`📊 Total in Firestore: ${finalCount.size} songs`);
        console.log(`🔤 Sorting: Client-side (ignoring articles)`);
        console.log(`${'='.repeat(50)}\n`);

    } catch (err) {
        console.error('💥 Sync failed:', err);
        process.exit(1);
    }
}

syncRepertoire();
