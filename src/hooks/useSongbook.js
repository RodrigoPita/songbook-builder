import { useState, useEffect, useMemo, useCallback } from 'react';

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

    // Load metadata on mount
    useEffect(() => {
        loadSongsMetadata();
    }, []);

    const loadSongsMetadata = async () => {
        try {
            setLoading(true);
            setError(null);

            const indexPath = `${import.meta.env.BASE_URL}index.json`;
            const response = await fetch(indexPath);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: Could not load index.json`);
            }

            const metadata = await response.json();

            // Transform metadata to the format expected by the app
            const songs = metadata.map(song => ({
                id: song.id,
                title: song.title,
                artist: song.artist || '',
                key: song.key || '',
                filename: song.filename,
                markers: Array.isArray(song.markers) 
                    ? song.markers.map(m => m.toLowerCase().trim())
                    : (song.markers ? [song.markers.toLowerCase().trim()] : []),
                content: null
            }));

            setAllSongs(songs);

        } catch (err) {
            console.error('Error loading metadata:', err);
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

    // Load content of a specific song
    const loadSongContent = useCallback(async (songId) => {
        if (songsContent[songId]) return songsContent[songId];

        const song = allSongs.find(s => s.id === songId);
        if (!song) return null;

        try {
            const songPath = `${import.meta.env.BASE_URL}charts/${song.filename}`;
            const response = await fetch(songPath);

            if (!response.ok) {
                throw new Error(`Error loading ${song.filename}`);
            }

            const content = await response.text();
            const key = extractKeyFromContent(content);

            // Update allSongs with extracted key
            setAllSongs(prev => prev.map(s =>
                s.id === songId ? { ...s, key } : s
            ));

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

        // Initialize transposition at 0
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
            (song.markers && song.markers.some(marker => marker.includes(term)))
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
                    markers: song.markers || [],
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
