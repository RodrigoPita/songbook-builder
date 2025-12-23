import { useState } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/firebase';

/**
 * Custom hook for tag operations (add, remove, update .cho files)
 */
export function useTagOperations() {
  const [saving, setSaving] = useState(false);

  /**
   * Update .cho file with new tags
   */
  const updateChoFile = async (song, newTags) => {
    try {
      const choPath = song.collection === 'songs' ? 'charts' : 'repertoire';
      const storageRef = ref(storage, `${choPath}/${song.filename}`);

      const downloadUrl = await getDownloadURL(storageRef);
      const response = await fetch(downloadUrl);
      const choContent = await response.text();

      const lines = choContent.split('\n');
      let updatedContent = '';
      let tagsUpdated = false;

      for (const line of lines) {
        if (line.match(/^\{tags?:/i)) {
          updatedContent += `{tags: ${newTags.join(', ')}}\n`;
          tagsUpdated = true;
        } else {
          updatedContent += line + '\n';
        }
      }

      if (!tagsUpdated) {
        const linesArray = updatedContent.split('\n');
        let insertIndex = 0;

        for (let i = 0; i < linesArray.length; i++) {
          if (linesArray[i].match(/^\{(title|artist|key):/i)) {
            insertIndex = i + 1;
          }
        }

        linesArray.splice(insertIndex, 0, `{tags: ${newTags.join(', ')}}`);
        updatedContent = linesArray.join('\n');
      }

      const blob = new Blob([updatedContent.trim()], { type: 'text/plain;charset=utf-8' });

      // Upload with metadata to ensure public access
      const metadata = {
        contentType: 'text/plain;charset=utf-8',
        cacheControl: 'public, max-age=31536000',
      };

      await uploadBytes(storageRef, blob, metadata);

      // Get the new public download URL and update Firestore
      const newDownloadUrl = await getDownloadURL(storageRef);
      const songRef = doc(db, song.collection, song.id);
      await updateDoc(songRef, {
        fileUrl: newDownloadUrl
      });

      return true;
    } catch (error) {
      console.error('Error updating .cho file:', error);
      return false;
    }
  };

  /**
   * Add a tag to a song
   */
  const addTagToSong = async (song, tag) => {
    if (song.tags && song.tags.includes(tag)) {
      return { success: false, message: 'Tag already exists' };
    }

    try {
      setSaving(true);

      const songRef = doc(db, song.collection, song.id);
      await updateDoc(songRef, {
        tags: arrayUnion(tag)
      });

      const newTags = [...(song.tags || []), tag];
      const choUpdated = await updateChoFile(song, newTags);

      return {
        success: choUpdated,
        updatedSong: { ...song, tags: newTags },
        message: choUpdated ? null : 'Firestore updated but .cho file sync failed'
      };
    } catch (error) {
      console.error('Error adding tag:', error);
      return { success: false, message: 'Error adding tag' };
    } finally {
      setSaving(false);
    }
  };

  /**
   * Remove a tag from a song
   */
  const removeTagFromSong = async (song, tag) => {
    if (!song.tags || !song.tags.includes(tag)) {
      return { success: false, message: 'Tag does not exist' };
    }

    try {
      setSaving(true);

      const songRef = doc(db, song.collection, song.id);
      await updateDoc(songRef, {
        tags: arrayRemove(tag)
      });

      const newTags = (song.tags || []).filter(t => t !== tag);
      const choUpdated = await updateChoFile(song, newTags);

      return {
        success: choUpdated,
        updatedSong: { ...song, tags: newTags },
        message: choUpdated ? null : 'Firestore updated but .cho file sync failed'
      };
    } catch (error) {
      console.error('Error removing tag:', error);
      return { success: false, message: 'Error removing tag' };
    } finally {
      setSaving(false);
    }
  };

  return {
    saving,
    addTagToSong,
    removeTagFromSong,
    updateChoFile
  };
}
