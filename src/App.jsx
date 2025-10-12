import { useState } from 'react';
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
        loading,
        error,
        reloadSongs
    } = useSongbook();

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading songbook...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Error loading songs</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={reloadSongs}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Try again
                    </button>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Tips:</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Check if <code className="bg-gray-200 px-1 rounded">public/charts/index.json</code> exists</li>
                            <li>• Check if .cho files are in <code className="bg-gray-200 px-1 rounded">public/charts/</code></li>
                            <li>• Check the browser console for more details</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
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
                    onExportPdf={() => window.print()}
                />
            </div>
        </div>
    );
};

export default App;
