import { getTagColor } from '../../utils/tagColors';

/**
 * Tags View - Shows overview of all tags with counts and quick access to edit
 */
const TagManagerTagsView = ({
  filteredTags,
  collectionSongs,
  onEditTag,
  onSelectSong
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        All Tags ({filteredTags.length})
      </h2>

      {filteredTags.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTags.map(({ tag, count }) => {
            const colors = getTagColor(tag);
            return (
              <div
                key={tag}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-opacity-70 transition"
                style={{ backgroundColor: colors.bg }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg" style={{ color: colors.text }}>{tag}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-medium border border-opacity-20"
                      style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.text }}
                    >
                      {count} {count === 1 ? 'song' : 'songs'}
                    </span>
                    <button
                      onClick={() => onEditTag(tag)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Songs with this tag */}
                <div className="mt-3 space-y-1 max-h-40 overflow-y-auto">
                  {collectionSongs
                    .filter(song => (song.tags || []).includes(tag))
                    .map(song => (
                      <button
                        key={`${song.collection}-${song.id}`}
                        onClick={() => onSelectSong(song)}
                        className="w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-emerald-50 rounded transition"
                      >
                        {song.title}
                      </button>
                    ))
                  }
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No tags found
        </div>
      )}
    </div>
  );
};

export default TagManagerTagsView;
