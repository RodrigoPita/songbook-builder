import { useState, useEffect, useMemo, useCallback } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';

export function useSongbook() {
    // State for songs and loading
    const [allSongs, setAllSongs] = useState([]);
    const [songsContent, setSongsContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // UI states
    const [selectedSongIds, setSelectedSongIds] = useState([]);
    const [semitoneShift, setSemitoneShift] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    // Load metadata from Firestore on mount
    useEffect(() => {
        loadSongsMetadata();
    }, []);

    const loadSongsMetadata = async () => {
        try {
            setLoading(true);
            setError(null);

            // Query Firestore for all songs, ordered by title
            const songsQuery = query(
                collection(db, 'songs'),
                orderBy('title', 'asc')
            );
            
            const querySnapshot = await getDocs(songsQuery);
            
            // Transform Firestore documents to app format
            const songs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                artist: doc.data().artist || '',
                key: doc.data().key || '',
                filename: doc.data().filename,
                fileUrl: doc.data().fileUrl, // URL do Storage
                tags: Array.isArray(doc.data().tags) 
                    ? doc.data().tags.map(m => m.toLowerCase().trim())
                    : (doc.data().tags ? [doc.data().tags.toLowerCase().trim()] : []),
                content: null
            }));

            console.log('Songs loaded from Firebase:', songs.length);
            setAllSongs(songs);

        } catch (err) {
            console.error('Error loading songs from Firebase:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
            // Option 1: Use stored fileUrl (faster)
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

            // Option 2: Generate URL from Storage path (fallback)
            const fileRef = ref(storage, `charts/${song.filename}`);
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
    }, [allSongs, songsContent]);

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

    // Songs filtered by search
    const filteredSongs = useMemo(() => {
        if (!searchTerm.trim()) return allSongs;

        const term = searchTerm.toLowerCase();
        return allSongs.filter(song =>
            song.title.toLowerCase().includes(term) ||
            (song.artist && song.artist.toLowerCase().includes(term)) ||
            (song.tags && song.tags.some(tag => tag.includes(term)))
        );
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
