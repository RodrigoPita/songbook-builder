import { X, Plus, Loader } from 'lucide-react';

/**
 * Songs View - Shows list of songs with tag editing for individual songs
 */
const TagManagerSongsView = ({
  filteredSongs,
  selectedSong,
  setSelectedSong,
  availableTags,
  availableTagsSearch,
  setAvailableTagsSearch,
  onAddTag,
  onRemoveTag,
  saving
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Song List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Songs ({filteredSongs.length})
          </h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredSongs.map(song => (
              <button
                key={`${song.collection}-${song.id}`}
                onClick={() => setSelectedSong(song)}
                className={`w-full text-left p-3 rounded-lg transition border-2 ${
                  selectedSong?.id === song.id && selectedSong?.collection === song.collection
                    ? 'bg-emerald-100 border-emerald-500'
                    : 'bg-white border-gray-200 hover:border-emerald-300'
                }`}
              >
                <p className="font-semibold text-gray-800">{song.title}</p>
                {song.artist && (
                  <p className="text-sm text-gray-500">{song.artist}</p>
                )}
                {song.tags && song.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {song.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Tag Editor */}
        <div>
          {selectedSong ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Song: {selectedSong.title}
              </h2>

              {/* Current Tags */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Tags:
                </label>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border-2 border-gray-200 rounded-lg">
                  {selectedSong.tags && selectedSong.tags.length > 0 ? (
                    selectedSong.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-medium"
                      >
                        {tag}
                        <button
                          onClick={() => onRemoveTag(tag)}
                          disabled={saving}
                          className="hover:bg-emerald-200 rounded-full p-0.5 transition disabled:opacity-50"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No tags yet</span>
                  )}
                </div>
              </div>

              {/* Available Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Available Tags ({availableTags.length}):
                </label>

                {/* Search bar for tags */}
                <input
                  type="text"
                  placeholder="Search tags..."
                  value={availableTagsSearch}
                  onChange={(e) => setAvailableTagsSearch(e.target.value)}
                  className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />

                <div className="border-2 border-gray-200 rounded-lg p-3 max-h-96 overflow-y-auto">
                  {availableTags.length > 0 ? (
                    <div className="space-y-2">
                      {availableTags.map(({ tag, count }) => (
                        <button
                          key={tag}
                          onClick={() => onAddTag(tag)}
                          disabled={saving}
                          className="w-full flex items-center justify-between bg-white hover:bg-emerald-50 p-3 rounded-lg border border-gray-200 transition disabled:opacity-50"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-800">{tag}</span>
                            <span className="text-xs text-gray-500">({count} {count === 1 ? 'song' : 'songs'})</span>
                          </div>
                          <Plus className="w-5 h-5 text-emerald-600" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4 text-sm">
                      All available tags have been added to this song
                    </p>
                  )}
                </div>
              </div>

              {saving && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  <Loader className="w-4 h-4 animate-spin inline mr-2" />
                  Updating Firestore and .cho file...
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Select a song to edit its tags
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagManagerSongsView;
