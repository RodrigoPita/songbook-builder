import { X, Plus } from 'lucide-react';

/**
 * Tag Edit View - Bulk manage songs for a specific tag
 */
const TagManagerTagEditView = ({
  editingTag,
  songsWithTag,
  songsWithoutTag,
  tagEditSearch,
  setTagEditSearch,
  onAddTagToSong,
  onRemoveTagFromSong,
  onBack,
  saving
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition"
          >
            ← Back to Tags
          </button>
          <h2 className="text-xl font-bold text-gray-800">
            Editing Tag: <span className="text-emerald-600">{editingTag}</span>
          </h2>
        </div>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
          {songsWithTag.length} {songsWithTag.length === 1 ? 'song' : 'songs'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Songs WITH this tag */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Songs with "{editingTag}" ({songsWithTag.length})
          </h3>
          <div className="border-2 border-emerald-200 rounded-lg p-4 bg-emerald-50 max-h-[600px] overflow-y-auto">
            {songsWithTag.length > 0 ? (
              <div className="space-y-2">
                {songsWithTag.map(song => (
                  <div
                    key={`${song.collection}-${song.id}`}
                    className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{song.title}</p>
                      {song.artist && (
                        <p className="text-sm text-gray-500 truncate">{song.artist}</p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveTagFromSong(song)}
                      disabled={saving}
                      className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                      title="Remove tag from this song"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                No songs have this tag yet
              </p>
            )}
          </div>
        </div>

        {/* Right: Songs WITHOUT this tag (with search) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Add Songs to "{editingTag}"
            </h3>
          </div>

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search songs to add..."
            value={tagEditSearch}
            onChange={(e) => setTagEditSearch(e.target.value)}
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />

          <div className="border-2 border-gray-200 rounded-lg p-4 max-h-[600px] overflow-y-auto">
            {songsWithoutTag.length > 0 ? (
              <div className="space-y-2">
                {songsWithoutTag.map(song => (
                  <button
                    key={`${song.collection}-${song.id}`}
                    onClick={() => onAddTagToSong(song)}
                    disabled={saving}
                    className="w-full flex items-center justify-between bg-white hover:bg-emerald-50 p-3 rounded-lg shadow-sm transition disabled:opacity-50"
                  >
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-medium text-gray-800 truncate">{song.title}</p>
                      {song.artist && (
                        <p className="text-sm text-gray-500 truncate">{song.artist}</p>
                      )}
                    </div>
                    <Plus className="ml-3 w-5 h-5 text-emerald-600" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                {tagEditSearch.trim() ? 'No songs found matching your search' : 'All songs already have this tag'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagManagerTagEditView;
