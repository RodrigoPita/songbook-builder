import React, { useCallback, useState } from 'react';
import { useSongbook } from './hooks/useSongbook';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SongbookPreview from './components/SongbookPreview';

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {
        allSongs,
        selectedSongs,
        semitoneShift,
        searchTerm,
        setSearchTerm,
        toggleSongSelection,
        handleShiftChange,
        filteredSongs,
    } = useSongbook();

    // Use browser print dialog for PDF export
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                userId={null} // Pass userId if you have authentication
            />
            <div className="flex flex-1 relative">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    songs={filteredSongs}
                    selectedSongIds={selectedSongs.map(song => song.id)}
                    onToggleSong={toggleSongSelection}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    totalSongCount={allSongs.length}
                />
                <SongbookPreview
                    songs={selectedSongs}
                    semitoneShift={semitoneShift}
                    onShiftChange={handleShiftChange}
                    onExportPdf={handlePrint}
                />
            </div>
        </div>
    );
};

export default App;
