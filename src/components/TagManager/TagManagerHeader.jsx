import { Tags, LogOut, List, Tag, Filter, X } from 'lucide-react';

/**
 * Header component for TagManager with collection toggle, view toggle, search, and filters
 */
const TagManagerHeader = ({
  user,
  signOut,
  collectionView,
  setCollectionView,
  view,
  setView,
  searchQuery,
  setSearchQuery,
  selectedTags,
  setSelectedTags,
  showTagFilter,
  setShowTagFilter,
  allTagsWithCounts,
  onCollectionChange,
  onViewChange
}) => {
  const toggleTagFilter = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Tags className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-800">Tag Manager</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Signed in as</p>
              <p className="font-semibold text-gray-800">{user.email}</p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-4 bg-white rounded-lg shadow-md p-4">
          {/* Collection Toggle */}
          <div className="flex gap-2 mb-4 pb-4 border-b border-gray-200">
            <button
              onClick={() => onCollectionChange('vozes-de-hipona')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                collectionView === 'vozes-de-hipona'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Vozes de Hipona
            </button>
            <button
              onClick={() => onCollectionChange('repertoire')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                collectionView === 'repertoire'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Repertoire
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => onViewChange('songs')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                  view === 'songs'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
                Songs View
              </button>
              <button
                onClick={() => onViewChange('tags')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                  view === 'tags'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Tag className="w-4 h-4" />
                Tags View
              </button>
            </div>

            <div className="flex gap-2 flex-1 sm:max-w-md">
              {/* Search */}
              <input
                type="text"
                placeholder={view === 'songs' ? 'Search songs...' : 'Search tags...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />

              {/* Filter Button (Songs View Only) */}
              {view === 'songs' && (
                <div className="relative">
                  <button
                    onClick={() => setShowTagFilter(!showTagFilter)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition border-2 ${
                      selectedTags.length > 0
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    {selectedTags.length > 0 && (
                      <span className="px-1.5 py-0.5 bg-emerald-600 text-white rounded-full text-xs font-bold">
                        {selectedTags.length}
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
                      <div className="absolute right-0 mt-2 w-80 bg-white border-2 border-gray-300 rounded-lg shadow-xl z-20 max-h-96 overflow-y-auto">
                        <div className="p-3 border-b border-gray-200 bg-gray-50">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">Filter by Tags</span>
                            {selectedTags.length > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTags([]);
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
                                className={`w-full text-left px-3 py-2 rounded-lg transition flex justify-between items-center ${
                                  selectedTags.includes(tag)
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'hover:bg-gray-100 text-gray-700'
                                }`}
                              >
                                <span className="font-medium">{tag}</span>
                                <span className="text-xs text-gray-500">{count} songs</span>
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
              )}
            </div>
          </div>

          {/* Tag Filters (Songs View Only) */}
          {view === 'songs' && selectedTags.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-700">Filtering by:</span>
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium"
                  >
                    {tag}
                    <button
                      onClick={() => toggleTagFilter(tag)}
                      className="hover:bg-emerald-200 rounded-full p-0.5 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TagManagerHeader;
