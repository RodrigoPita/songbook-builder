import { useState, useEffect, useMemo, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { sortSongsByTitle } from '../utils/sortUtils';

/**
 * Hook for managing songbook data
 * @param {string} category - 'vozes-de-hipona' or 'repertoire' (defaults to 'vozes-de-hipona')
 */
export function useSongbook(category = 'vozes-de-hipona') {
    // State for songs and loading
    const [allSongs, setAllSongs] = useState([]);
    const [songsContent, setSongsContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // UI states
    const [selectedSongIds, setSelectedSongIds] = useState([]);
    const [semitoneShift, setSemitoneShift] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    // Determine collection and storage path based on category
    // 'vozes-de-hipona' uses 'songs' collection and 'charts' storage for backward compatibility
    const collectionName = category === 'repertoire' ? 'repertoire' : 'songs';
    const storagePath = category === 'repertoire' ? 'repertoire' : 'charts';

    // Load metadata from Firestore
    const loadSongsMetadata = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Query Firestore for all songs from the appropriate collection
            const querySnapshot = await getDocs(collection(db, collectionName));

            // Transform Firestore documents to app format
            const songs = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    title: data.title || '',
                    artist: data.artist || '',
                    tags: data.tags || [],
                    filename: data.filename || '',
                    fileUrl: data.fileUrl || '',
                    key: '', // Will be extracted when loading content
                    content: null
                };
            });

            // Sort songs client-side, ignoring leading articles
            const sortedSongs = sortSongsByTitle(songs);

            console.log(`Songs loaded from ${collectionName}:`, sortedSongs.length);
            setAllSongs(sortedSongs);

        } catch (err) {
            console.error(`Error loading songs from ${collectionName}:`, err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [collectionName]);

    // Load on mount with cleanup
    useEffect(() => {
        let isMounted = true;

        loadSongsMetadata().catch(err => {
            if (isMounted) {
                console.error('Failed to load songs:', err);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [loadSongsMetadata]);

    // Extract key from ChordPro content
    const extractKeyFromContent = (content) => {
        const keyMatch = content.match(/\{(?:key|k):\s*([A-G][#b]?m?)\}/i);
        return keyMatch ? keyMatch[1] : null;
    };

    // Load content of a specific song from Firebase Storage
    const loadSongContent = useCallback(async (songId) => {
        if (songsContent[songId]) return songsContent[songId];

        const song = allSongs.find(s => s.id === songId);
        if (!song) return null;

        try {
            // Use fileUrl from Firestore
            if (song.fileUrl) {
                const response = await fetch(song.fileUrl);
                if (!response.ok) throw new Error(`Error loading ${song.filename}`);
                const content = await response.text();

                const key = extractKeyFromContent(content);

                // Update song with extracted key if not present
                if (!song.key && key) {
                    setAllSongs(prev => prev.map(s =>
                        s.id === songId ? { ...s, key } : s
                    ));
                }

                setSongsContent(prev => ({ ...prev, [songId]: content }));
                return content;
            }

            // Fallback: Generate URL from Storage path
            const fileRef = ref(storage, `${storagePath}/${song.filename}`);
            const url = await getDownloadURL(fileRef);

            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error loading ${song.filename}`);

            const content = await response.text();
            const key = extractKeyFromContent(content);

            if (!song.key && key) {
                setAllSongs(prev => prev.map(s =>
                    s.id === songId ? { ...s, key } : s
                ));
            }

            setSongsContent(prev => ({ ...prev, [songId]: content }));
            return content;

        } catch (err) {
            console.error(`Error loading song ${songId}:`, err);
            return null;
        }
    }, [allSongs, songsContent, storagePath]);

    // Toggle song selection
    const toggleSongSelection = useCallback(async (songId) => {
        setSelectedSongIds(prev => {
            const isSelected = prev.includes(songId);

            if (isSelected) {
                return prev.filter(id => id !== songId);
            } else {
                loadSongContent(songId);
                return [...prev, songId];
            }
        });

        setSemitoneShift(prev => ({ ...prev, [songId]: prev[songId] ?? 0 }));
    }, [loadSongContent]);

    // Update transposition
    const handleShiftChange = useCallback((songId, newShift) => {
        setSemitoneShift(prev => ({ ...prev, [songId]: newShift }));
    }, []);

    // Songs filtered by search (includes tags!)
    const filteredSongs = useMemo(() => {
        if (!searchTerm.trim()) return allSongs;

        const term = searchTerm.toLowerCase();
        return allSongs.filter(song => {
            // Search in title
            if (song.title.toLowerCase().includes(term)) return true;

            // Search in artist
            if (song.artist && song.artist.toLowerCase().includes(term)) return true;

            // Search in tags
            if (song.tags && Array.isArray(song.tags)) {
                if (song.tags.some(tag => tag.toLowerCase().includes(term))) return true;
            }

            return false;
        });
    }, [allSongs, searchTerm]);

    // Selected songs with content and transposition
    const selectedSongs = useMemo(() => {
        return selectedSongIds
            .map(id => {
                const song = allSongs.find(s => s.id === id);
                if (!song) return null;

                return {
                    id: song.id,
                    title: song.title,
                    artist: song.artist,
                    key: song.key || '',
                    tags: song.tags || [],
                    content: songsContent[id] || '',
                    transposition: semitoneShift[id] || 0
                };
            })
            .filter(Boolean);
    }, [selectedSongIds, allSongs, songsContent, semitoneShift]);

    return {
        allSongs,
        selectedSongs,
        semitoneShift,
        searchTerm,
        setSearchTerm,
        filteredSongs,
        toggleSongSelection,
        handleShiftChange,
        loading,
        error,
        reloadSongs: loadSongsMetadata
    };
}
