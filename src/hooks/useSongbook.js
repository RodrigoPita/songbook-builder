import { useState, useEffect, useMemo, useCallback } from 'react';

export function useSongbook() {
    // State for songs and loading
    const [allSongs, setAllSongs] = useState([]);
    const [songsContent, setSongsContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // UI states (maintains the same interface as the original hook)
    const [selectedSongIds, setSelectedSongIds] = useState([]);
    const [semitoneShift, setSemitoneShift] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    // Load metadata on mount
    useEffect(() => {
        loadSongsMetadata();
    }, []);

    const loadSongsMetadata = async () => {
        try {
            setLoading(true);
            setError(null);

            const indexPath = `${import.meta.env.BASE_URL}charts/index.json`;
            console.log('Loading metadata from:', indexPath);

            const response = await fetch(indexPath);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: Could not load index.json`);
            }

            const metadata = await response.json();
            console.log('Metadata loaded:', metadata);

            // Transform metadata to the format expected by the app
            const songs = metadata.map(song => ({
                id: song.id,
                title: song.title,
                artist: song.artist || '',
                key: song.key || '', // Original key from index.json
                filename: song.filename,
                content: null // Will be loaded on demand
            }));

            setAllSongs(songs);

        } catch (err) {
            console.error('Error loading metadata:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Extract key (tone) from ChordPro content
    const extractKeyFromContent = (content) => {
        // Look for {key: X} or {k: X} in ChordPro format
        const keyMatch = content.match(/\{(?:key|k):\s*([A-G][#b]?m?)\}/i);
        return keyMatch ? keyMatch[1] : null;
    };

    // Load content of a specific song
    const loadSongContent = useCallback(async (songId) => {
        // If already loaded, don't load again
        if (songsContent[songId]) {
            return songsContent[songId];
        }

        const song = allSongs.find(s => s.id === songId);
        if (!song) {
            console.error(`Song ${songId} not found`);
            return null;
        }

        try {
            const songPath = `${import.meta.env.BASE_URL}charts/${song.filename}`;
            console.log(`Loading content of ${song.title}:`, songPath);

            const response = await fetch(songPath);

            if (!response.ok) {
                throw new Error(`Error loading ${song.filename}`);
            }

            const content = await response.text();

            // Extract key from content
            const key = extractKeyFromContent(content);

            // Update allSongs with extracted key
            setAllSongs(prev => prev.map(s =>
                s.id === songId ? { ...s, key } : s
            ));

            setSongsContent(prev => ({
                ...prev,
                [songId]: content
            }));

            console.log(`Song ${song.title} loaded. Original key: ${key || 'not found'}`);

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
                // Deselect
                return prev.filter(id => id !== songId);
            } else {
                // Select and load content
                loadSongContent(songId);
                return [...prev, songId];
            }
        });

        // Initialize transposition at 0
        if (!semitoneShift[songId]) {
            setSemitoneShift(prev => ({
                ...prev,
                [songId]: 0
            }));
        }
    }, [semitoneShift, loadSongContent]);

    // Update transposition of a song
    const handleShiftChange = useCallback((songId, newShift) => {
        setSemitoneShift(prev => ({
            ...prev,
            [songId]: newShift
        }));
    }, []);

    // Reset transposition of a song to 0
    const resetTransposition = useCallback((songId) => {
        setSemitoneShift(prev => ({
            ...prev,
            [songId]: 0
        }));
    }, []);

    // Increment transposition
    const incrementTransposition = useCallback((songId) => {
        setSemitoneShift(prev => ({
            ...prev,
            [songId]: (prev[songId] || 0) + 1
        }));
    }, []);

    // Decrement transposition
    const decrementTransposition = useCallback((songId) => {
        setSemitoneShift(prev => ({
            ...prev,
            [songId]: (prev[songId] || 0) - 1
        }));
    }, []);

    // Songs filtered by search
    const filteredSongs = useMemo(() => {
        if (!searchTerm.trim()) {
            return allSongs;
        }

        const term = searchTerm.toLowerCase();
        return allSongs.filter(song =>
            song.title.toLowerCase().includes(term) ||
            (song.artist && song.artist.toLowerCase().includes(term))
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
                    key: song.key || '', // Original key
                    content: songsContent[id] || '', // Content may be loading
                    transposition: semitoneShift[id] || 0
                };
            })
            .filter(song => song !== null);
    }, [selectedSongIds, allSongs, songsContent, semitoneShift]);

    return {
        // Data
        allSongs,
        selectedSongs,
        semitoneShift,

        // Search state
        searchTerm,
        setSearchTerm,

        // Filtered songs
        filteredSongs,

        // Actions
        toggleSongSelection,
        handleShiftChange,
        resetTransposition,
        incrementTransposition,
        decrementTransposition,

        // Loading state
        loading,
        error,

        // Reload if necessary
        reloadSongs: loadSongsMetadata
    };
}
