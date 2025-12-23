import { useState } from 'react';
import { ListOrdered, Search, Music, X, Filter } from 'lucide-react';

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
 * @param {Array<object>} props.allTagsWithCounts - Array of {tag, count} objects.
 * @param {Array<string>} props.selectedTagFilters - Array of selected tag strings.
 * @param {Function} props.toggleTagFilter - Function to toggle a tag filter.
 */
const Sidebar = ({
    isOpen,
    onClose,
    songs,
    selectedSongIds,
    onToggleSong,
    searchTerm,
    onSearchChange,
    allTagsWithCounts = [],
    selectedTagFilters = [],
    toggleTagFilter
}) => {
    const [showTagFilter, setShowTagFilter] = useState(false);

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
                    Índice ({songs.length})
                </h2>

                {/* Search Bar with Filter Button */}
                <div className="mb-4 space-y-2">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search by title or artist..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>

                        {/* Filter Button */}
                        <div className="relative">
                            <button
                                onClick={() => setShowTagFilter(!showTagFilter)}
                                className={`px-3 py-2 rounded-lg border-2 transition ${
                                    selectedTagFilters.length > 0
                                        ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Filter className="w-5 h-5" />
                                {selectedTagFilters.length > 0 && (
                                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-emerald-600 text-white rounded-full text-xs font-bold">
                                        {selectedTagFilters.length}
                                    </span>
                                )}
                            </button>

                            {/* Tag Filter Dropdown */}
                            {showTagFilter && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowTagFilter(false)}
                                    />

                                    {/* Dropdown */}
                                    <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-gray-300 rounded-lg shadow-xl z-20 max-h-80 overflow-y-auto">
                                        <div className="p-3 border-b border-gray-200 bg-gray-50 sticky top-0">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-gray-700 text-sm">Filter by Tags</span>
                                                {selectedTagFilters.length > 0 && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            selectedTagFilters.forEach(tag => toggleTagFilter(tag));
                                                        }}
                                                        className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
                                                    >
                                                        Clear All
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-2">
                                            {allTagsWithCounts.length > 0 ? (
                                                allTagsWithCounts.map(({ tag, count }) => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => toggleTagFilter(tag)}
                                                        className={`w-full text-left px-3 py-2 rounded-lg transition flex justify-between items-center text-sm ${
                                                            selectedTagFilters.includes(tag)
                                                                ? 'bg-emerald-100 text-emerald-800 font-medium'
                                                                : 'hover:bg-gray-100 text-gray-700'
                                                        }`}
                                                    >
                                                        <span>{tag}</span>
                                                        <span className="text-xs text-gray-500">{count}</span>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="text-center py-4 text-gray-500 text-sm">
                                                    No tags available
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Active Tag Filters Display */}
                    {selectedTagFilters.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {selectedTagFilters.map(tag => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium"
                                >
                                    {tag}
                                    <button
                                        onClick={() => toggleTagFilter(tag)}
                                        className="hover:bg-emerald-200 rounded-full p-0.5 transition"
                                    >
                                        <X className="w-2.5 h-2.5" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
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
