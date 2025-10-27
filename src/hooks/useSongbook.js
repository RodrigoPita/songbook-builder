import { useState, useEffect, useMemo, useCallback } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

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

    // Load metadata from Firebase Storage (index.json)
    const loadSongsMetadata = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Build Storage URL from bucket name
            const bucketName = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
            const storageUrl = `https://storage.googleapis.com/${bucketName}`;
            const indexUrl = `${storageUrl}/index.json`;
            
            console.log('Loading index from:', indexUrl);
            
            const response = await fetch(indexUrl);
            
            if (!response.ok) {
                throw new Error(`Failed to load index.json: ${response.status}`);
            }
            
            const metadata = await response.json();
            
            // Transform to app format
            const songs = metadata.map(song => ({
                id: song.id,
                title: song.title || '',
                artist: song.artist || '',
                tags: song.tags || [],
                filename: song.filename || '',
                fileUrl: `${storageUrl}/charts/${song.filename}`,
                key: '',
                content: null
            }));

            console.log('Songs loaded from Firebase Storage:', songs.length);
            setAllSongs(songs);

        } catch (err) {
            console.error('Error loading songs from Firebase Storage:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Load on mount
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
            if (song.fileUrl) {
                const response = await fetch(song.fileUrl);
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
            }

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

    // Songs filtered by search (includes tags!)
    const filteredSongs = useMemo(() => {
        if (!searchTerm.trim()) return allSongs;

        const term = searchTerm.toLowerCase();
        return allSongs.filter(song => {
            if (song.title.toLowerCase().includes(term)) return true;
            if (song.artist && song.artist.toLowerCase().includes(term)) return true;
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
