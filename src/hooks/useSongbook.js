import { useState, useEffect, useMemo } from 'react';
import { initialSongsData } from '../constants/mockData';

export const useSongbook = () => {
    const [allSongs] = useState(initialSongsData);
    const [selectedSongIds, setSelectedSongIds] = useState([]);
    const [semitoneShift, setSemitoneShift] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Initialize shifts for all songs
        const initialShifts = {};
        allSongs.forEach(song => {
            initialShifts[song.id] = 0;
        });
        setSemitoneShift(initialShifts);
    }, [allSongs]);

    const toggleSongSelection = (songId) => {
        setSelectedSongIds(prev =>
            prev.includes(songId)
                ? prev.filter(id => id !== songId)
                : [...prev, songId]
        );
    };

    const handleShiftChange = (songId, change) => {
        setSemitoneShift(prev => {
            const currentShift = prev[songId] || 0;
            let newShift = currentShift + change;
            if (newShift > 11) newShift = 11;
            if (newShift < -11) newShift = -11;
            return { ...prev, [songId]: newShift };
        });
    };

    const filteredSongs = useMemo(() => {
        const lowerCaseSearch = searchTerm.toLowerCase();
        return allSongs.filter(song =>
            song.title.toLowerCase().includes(lowerCaseSearch) ||
            song.artist.toLowerCase().includes(lowerCaseSearch) ||
            song.key.toLowerCase().includes(lowerCaseSearch)
        );
    }, [allSongs, searchTerm]);

    // Array of selected song objects
    const selectedSongs = useMemo(() => {
        return selectedSongIds
            .map(id => allSongs.find(song => song.id === id))
            .filter(Boolean);
    }, [selectedSongIds, allSongs]);

    return {
        allSongs,
        selectedSongIds,
        selectedSongs,
        semitoneShift,
        searchTerm,
        setSearchTerm,
        toggleSongSelection,
        handleShiftChange,
        filteredSongs,
    };
};
