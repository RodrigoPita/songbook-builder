import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { normalizeText } from '../../utils/textUtils';
import { useTagOperations } from '../../hooks/useTagOperations';
import TagManagerHeader from './TagManagerHeader';
import TagManagerSongsView from './TagManagerSongsView';
import TagManagerTagsView from './TagManagerTagsView';
import TagManagerTagEditView from './TagManagerTagEditView';
import { Tags, LogIn, Loader } from 'lucide-react';

const TagManager = () => {
  const { user, signInWithGoogle, signOut, isAdmin } = useAuth();
  const { saving, addTagToSong, removeTagFromSong } = useTagOperations();

  // Data state
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [collectionView, setCollectionView] = useState('vozes-de-hipona');
  const [view, setView] = useState('songs');
  const [selectedSong, setSelectedSong] = useState(null);
  const [editingTag, setEditingTag] = useState(null);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [tagEditSearch, setTagEditSearch] = useState('');
  const [availableTagsSearch, setAvailableTagsSearch] = useState('');

  // Fetch songs from both collections
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSongs = async () => {
      try {
        setLoading(true);

        const [songsSnapshot, repertoireSnapshot] = await Promise.all([
          getDocs(collection(db, 'songs')),
          getDocs(collection(db, 'repertoire'))
        ]);

        const songsData = songsSnapshot.docs.map(doc => ({
          id: doc.id,
          collection: 'songs',
          ...doc.data()
        }));

        const repertoireData = repertoireSnapshot.docs.map(doc => ({
          id: doc.id,
          collection: 'repertoire',
          ...doc.data()
        }));

        setSongs([...songsData, ...repertoireData]);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [user]);

  // Filter songs by collection
  const collectionSongs = useMemo(() => {
    return songs.filter(song => {
      if (collectionView === 'vozes-de-hipona') {
        return song.collection === 'songs';
      } else {
        return song.collection === 'repertoire';
      }
    });
  }, [songs, collectionView]);

  // Get all unique tags with counts for current collection
  const allTagsWithCounts = useMemo(() => {
    const tagMap = new Map();
    collectionSongs.forEach(song => {
      (song.tags || []).forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagMap.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => a.tag.localeCompare(b.tag));
  }, [collectionSongs]);

  // Get available tags (tags not on the selected song, filtered by search)
  const availableTags = useMemo(() => {
    if (!selectedSong) return allTagsWithCounts;

    let filtered = allTagsWithCounts.filter(({ tag }) => !(selectedSong.tags || []).includes(tag));

    if (availableTagsSearch.trim()) {
      const normalizedQuery = normalizeText(availableTagsSearch);
      filtered = filtered.filter(({ tag }) => normalizeText(tag).includes(normalizedQuery));
    }

    return filtered;
  }, [allTagsWithCounts, selectedSong, availableTagsSearch]);

  // Filter songs by search query and selected tags
  const filteredSongs = useMemo(() => {
    return collectionSongs.filter(song => {
      // Text search (includes title, artist, and tags) - accent-insensitive
      const matchesSearch = !searchQuery.trim() || (() => {
        const normalizedQuery = normalizeText(searchQuery);

        if (normalizeText(song.title).includes(normalizedQuery)) return true;
        if (song.artist && normalizeText(song.artist).includes(normalizedQuery)) return true;
        if (song.tags && Array.isArray(song.tags)) {
          if (song.tags.some(tag => normalizeText(tag).includes(normalizedQuery))) return true;
        }

        return false;
      })();

      // Tag filter
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => (song.tags || []).includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [collectionSongs, searchQuery, selectedTags]);

  // Filter tags by search query - accent-insensitive
  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return allTagsWithCounts;
    const normalizedQuery = normalizeText(searchQuery);
    return allTagsWithCounts.filter(({ tag }) => normalizeText(tag).includes(normalizedQuery));
  }, [allTagsWithCounts, searchQuery]);

  // Get songs with the editing tag
  const songsWithEditingTag = useMemo(() => {
    if (!editingTag) return [];
    return collectionSongs.filter(song => (song.tags || []).includes(editingTag));
  }, [collectionSongs, editingTag]);

  // Get songs without the editing tag (filtered by search)
  const songsWithoutEditingTag = useMemo(() => {
    if (!editingTag) return [];

    let filtered = collectionSongs.filter(song => !(song.tags || []).includes(editingTag));

    if (tagEditSearch.trim()) {
      const normalizedQuery = normalizeText(tagEditSearch);
      filtered = filtered.filter(song => {
        if (normalizeText(song.title).includes(normalizedQuery)) return true;
        if (song.artist && normalizeText(song.artist).includes(normalizedQuery)) return true;
        return false;
      });
    }

    return filtered;
  }, [collectionSongs, editingTag, tagEditSearch]);

  // Handlers
  const handleCollectionChange = (newCollection) => {
    setCollectionView(newCollection);
    setSelectedTags([]);
    setSelectedSong(null);
    setSearchQuery('');
  };

  const handleViewChange = (newView) => {
    setView(newView);
    setSelectedTags([]);
    setSearchQuery('');
  };

  const handleAddTag = async (tag) => {
    if (!selectedSong) return;

    const normalizedTag = tag.trim().toLowerCase();
    if (selectedSong.tags && selectedSong.tags.includes(normalizedTag)) {
      alert('This tag already exists');
      return;
    }

    const result = await addTagToSong(selectedSong, normalizedTag);

    if (result.success) {
      setSelectedSong(result.updatedSong);
      setSongs(songs.map(s =>
        s.id === selectedSong.id && s.collection === selectedSong.collection
          ? result.updatedSong
          : s
      ));
    } else if (result.message) {
      alert(result.message);
    }
  };

  const handleRemoveTag = async (tag) => {
    if (!selectedSong) return;

    const result = await removeTagFromSong(selectedSong, tag);

    if (result.success) {
      setSelectedSong(result.updatedSong);
      setSongs(songs.map(s =>
        s.id === selectedSong.id && s.collection === selectedSong.collection
          ? result.updatedSong
          : s
      ));
    } else if (result.message) {
      alert(result.message);
    }
  };

  const handleBulkAddTag = async (song) => {
    if (!editingTag) return;

    const result = await addTagToSong(song, editingTag);

    if (result.success) {
      setSongs(songs.map(s =>
        s.id === song.id && s.collection === song.collection
          ? result.updatedSong
          : s
      ));
    } else if (result.message) {
      alert(`Error adding tag to ${song.title}`);
    }
  };

  const handleBulkRemoveTag = async (song) => {
    if (!editingTag) return;

    const result = await removeTagFromSong(song, editingTag);

    if (result.success) {
      setSongs(songs.map(s =>
        s.id === song.id && s.collection === song.collection
          ? result.updatedSong
          : s
      ));
    } else if (result.message) {
      alert(`Error removing tag from ${song.title}`);
    }
  };

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
          <Tags className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tag Manager</h1>
          <p className="text-gray-600 mb-6">
            Please sign in to manage tags
          </p>
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 font-semibold transition"
          >
            <LogIn className="w-5 h-5" />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
          <Tags className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You need admin privileges to access the Tag Manager.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Signed in as: <span className="font-semibold">{user.email}</span>
          </p>
          <button
            onClick={signOut}
            className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TagManagerHeader
        user={user}
        signOut={signOut}
        collectionView={collectionView}
        setCollectionView={setCollectionView}
        view={view}
        setView={setView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        showTagFilter={showTagFilter}
        setShowTagFilter={setShowTagFilter}
        allTagsWithCounts={allTagsWithCounts}
        onCollectionChange={handleCollectionChange}
        onViewChange={handleViewChange}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : (
          <>
            {/* Songs View */}
            {view === 'songs' && (
              <TagManagerSongsView
                filteredSongs={filteredSongs}
                selectedSong={selectedSong}
                setSelectedSong={setSelectedSong}
                availableTags={availableTags}
                availableTagsSearch={availableTagsSearch}
                setAvailableTagsSearch={setAvailableTagsSearch}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
                saving={saving}
              />
            )}

            {/* Tags View */}
            {view === 'tags' && (
              <TagManagerTagsView
                filteredTags={filteredTags}
                collectionSongs={collectionSongs}
                onEditTag={(tag) => {
                  setEditingTag(tag);
                  setView('tag-edit');
                  setTagEditSearch('');
                }}
                onSelectSong={(song) => {
                  setView('songs');
                  setSelectedSong(song);
                }}
              />
            )}

            {/* Tag Edit View */}
            {view === 'tag-edit' && editingTag && (
              <TagManagerTagEditView
                editingTag={editingTag}
                songsWithTag={songsWithEditingTag}
                songsWithoutTag={songsWithoutEditingTag}
                tagEditSearch={tagEditSearch}
                setTagEditSearch={setTagEditSearch}
                onAddTagToSong={handleBulkAddTag}
                onRemoveTagFromSong={handleBulkRemoveTag}
                onBack={() => {
                  setView('tags');
                  setEditingTag(null);
                  setTagEditSearch('');
                }}
                saving={saving}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TagManager;
