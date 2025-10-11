import { ListOrdered, Search, Music, X } from 'lucide-react';

/**
 * Renders the sidebar for song selection and search.
 * Includes an overlay for closing on mobile.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Whether the sidebar is currently visible.
 * @param {Function} props.onClose - Function to call to close the sidebar.
 * @param {Array<object>} props.songs - The list of songs to display (already filtered).
 * @param {Array<number>} props.selectedSongIds - An array of IDs for the currently selected songs.
 * @param {Function} props.onToggleSong - Function to call when a song is clicked.
 * @param {string} props.searchTerm - The current value of the search input.
 * @param {Function} props.onSearchChange - Function to update the search term.
 * @param {number} props.totalSongCount - The total number of songs available.
 */
const Sidebar = ({
    isOpen,
    onClose,
    songs,
    selectedSongIds,
    onToggleSong,
    searchTerm,
    onSearchChange,
    totalSongCount
}) => {
    return (
        <>
            {/* Overlay for mobile view, appears when sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                ></div>
            )}

            {/* Sidebar Panel */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-100 p-6 overflow-y-auto transition-transform duration-300 ease-in-out print:hidden
                    lg:sticky lg:top-20 lg:w-1/3 lg:max-w-xs lg:h-[calc(100vh-5rem)] lg:translate-x-0 lg:shadow-none
                    ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}
                `}
            >
                <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center">
                    <ListOrdered className="w-5 h-5 mr-2" />
                    Song Index ({totalSongCount})
                </h2>

                {/* Search Bar */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search by title or artist..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                {/* Song List */}
                <div className="space-y-3">
                    {songs.length > 0 ? (
                        songs.map(song => (
                            <div
                                key={song.id}
                                className={`p-3 rounded-xl cursor-pointer transition duration-200 shadow-sm
                                    ${selectedSongIds.includes(song.id)
                                        ? 'bg-emerald-100 border-2 border-emerald-500 shadow-lg'
                                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                                    }`}
                                onClick={() => onToggleSong(song.id)}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-gray-800 leading-snug">{song.title}</p>
                                        <p className="text-sm text-gray-500">
                                            {song.artist}
                                        </p>
                                    </div>
                                    {selectedSongIds.includes(song.id) ? (
                                        <X className="w-5 h-5 text-red-500 hover:text-red-700" />
                                    ) : (
                                        <Music className="w-5 h-5 text-emerald-500" />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-8">No songs found.</p>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
