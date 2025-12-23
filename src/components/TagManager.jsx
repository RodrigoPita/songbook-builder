import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Tags, LogIn, LogOut, Loader, X, Plus, List, Tag, Filter } from 'lucide-react';
import { normalizeText } from '../utils/textUtils';

const TagManager = () => {
  const { user, signInWithGoogle, signOut, isAdmin } = useAuth();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collectionView, setCollectionView] = useState('vozes-de-hipona'); // 'vozes-de-hipona' or 'repertoire'
  const [view, setView] = useState('songs'); // 'songs', 'tags', or 'tag-edit'
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [editingTag, setEditingTag] = useState(null); // Tag being edited in tag-edit view
  const [tagEditSearch, setTagEditSearch] = useState(''); // Search in tag-edit view
  const [availableTagsSearch, setAvailableTagsSearch] = useState(''); // Search for available tags in songs view

  // Fetch songs from both collections
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSongs = async () => {
      try {
        setLoading(true);
        const songsSnapshot = await getDocs(collection(db, 'songs'));
        const repertoireSnapshot = await getDocs(collection(db, 'repertoire'));

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

        const allSongs = [...songsData, ...repertoireData].sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        setSongs(allSongs);
      } catch (error) {
        console.error('Error fetching songs:', error);
        alert('Error loading songs');
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

    // Apply search filter
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

        // Search in title
        if (normalizeText(song.title).includes(normalizedQuery)) return true;

        // Search in artist
        if (song.artist && normalizeText(song.artist).includes(normalizedQuery)) return true;

        // Search in tags
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

  // Update .cho file with new tags
  const updateChoFile = async (song, newTags) => {
    try {
      const choPath = song.collection === 'songs' ? 'charts' : 'repertoire';
      const storageRef = ref(storage, `${choPath}/${song.filename}`);

      const downloadUrl = await getDownloadURL(storageRef);
      const response = await fetch(downloadUrl);
      const choContent = await response.text();

      const lines = choContent.split('\n');
      let updatedContent = '';
      let tagsUpdated = false;

      for (const line of lines) {
        if (line.match(/^\{tags?:/i)) {
          updatedContent += `{tags: ${newTags.join(', ')}}\n`;
          tagsUpdated = true;
        } else {
          updatedContent += line + '\n';
        }
      }

      if (!tagsUpdated) {
        const linesArray = updatedContent.split('\n');
        let insertIndex = 0;

        for (let i = 0; i < linesArray.length; i++) {
          if (linesArray[i].match(/^\{(title|artist|key):/i)) {
            insertIndex = i + 1;
          }
        }

        linesArray.splice(insertIndex, 0, `{tags: ${newTags.join(', ')}}`);
        updatedContent = linesArray.join('\n');
      }

      const blob = new Blob([updatedContent.trim()], { type: 'text/plain;charset=utf-8' });

      // Upload with metadata to ensure public access
      const metadata = {
        contentType: 'text/plain;charset=utf-8',
        cacheControl: 'public, max-age=31536000',
      };

      await uploadBytes(storageRef, blob, metadata);

      // Get the new public download URL and update Firestore
      const newDownloadUrl = await getDownloadURL(storageRef);
      const songRef = doc(db, song.collection, song.id);
      await updateDoc(songRef, {
        fileUrl: newDownloadUrl
      });

      return true;
    } catch (error) {
      console.error('Error updating .cho file:', error);
      return false;
    }
  };

  // Add tag
  const handleAddTag = async (tagToAdd) => {
    if (!tagToAdd || !selectedSong) return;

    // Normalize tag name
    const normalizedTag = tagToAdd.trim().toLowerCase();

    if (selectedSong.tags && selectedSong.tags.includes(normalizedTag)) {
      alert('This tag already exists');
      return;
    }

    try {
      setSaving(true);

      const songRef = doc(db, selectedSong.collection, selectedSong.id);
      await updateDoc(songRef, {
        tags: arrayUnion(normalizedTag)
      });

      const newTags = [...(selectedSong.tags || []), normalizedTag];
      const choUpdated = await updateChoFile(selectedSong, newTags);

      if (choUpdated) {
        const updatedSong = { ...selectedSong, tags: newTags };
        setSelectedSong(updatedSong);
        setSongs(songs.map(s => s.id === selectedSong.id && s.collection === selectedSong.collection ? updatedSong : s));
      } else {
        alert('Warning: Firestore updated but .cho file sync failed');
      }
    } catch (error) {
      console.error('Error adding tag:', error);
      alert('Error adding tag');
    } finally {
      setSaving(false);
    }
  };

  // Remove tag
  const handleRemoveTag = async (tagToRemove) => {
    if (!selectedSong) return;

    try {
      setSaving(true);

      const songRef = doc(db, selectedSong.collection, selectedSong.id);
      await updateDoc(songRef, {
        tags: arrayRemove(tagToRemove)
      });

      const newTags = (selectedSong.tags || []).filter(t => t !== tagToRemove);
      const choUpdated = await updateChoFile(selectedSong, newTags);

      if (choUpdated) {
        const updatedSong = { ...selectedSong, tags: newTags };
        setSelectedSong(updatedSong);
        setSongs(songs.map(s => s.id === selectedSong.id && s.collection === selectedSong.collection ? updatedSong : s));
      } else {
        alert('Warning: Firestore updated but .cho file sync failed');
      }
    } catch (error) {
      console.error('Error removing tag:', error);
      alert('Error removing tag');
    } finally {
      setSaving(false);
    }
  };

  // Toggle tag filter
  const toggleTagFilter = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Add tag to a song (bulk operation for tag-edit view)
  const addTagToSong = async (song, tag) => {
    if (song.tags && song.tags.includes(tag)) return; // Already has tag

    try {
      setSaving(true);

      const songRef = doc(db, song.collection, song.id);
      await updateDoc(songRef, {
        tags: arrayUnion(tag)
      });

      const newTags = [...(song.tags || []), tag];
      const choUpdated = await updateChoFile(song, newTags);

      if (choUpdated) {
        const updatedSong = { ...song, tags: newTags };
        setSongs(songs.map(s => s.id === song.id && s.collection === song.collection ? updatedSong : s));
      }
    } catch (error) {
      console.error('Error adding tag to song:', error);
      alert(`Error adding tag to ${song.title}`);
    } finally {
      setSaving(false);
    }
  };

  // Remove tag from a song (bulk operation for tag-edit view)
  const removeTagFromSong = async (song, tag) => {
    if (!song.tags || !song.tags.includes(tag)) return; // Doesn't have tag

    try {
      setSaving(true);

      const songRef = doc(db, song.collection, song.id);
      await updateDoc(songRef, {
        tags: arrayRemove(tag)
      });

      const newTags = (song.tags || []).filter(t => t !== tag);
      const choUpdated = await updateChoFile(song, newTags);

      if (choUpdated) {
        const updatedSong = { ...song, tags: newTags };
        setSongs(songs.map(s => s.id === song.id && s.collection === song.collection ? updatedSong : s));
      }
    } catch (error) {
      console.error('Error removing tag from song:', error);
      alert(`Error removing tag from ${song.title}`);
    } finally {
      setSaving(false);
    }
  };

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

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
          <Tags className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tag Manager</h1>
          <p className="text-gray-600 mb-6">
            Sign in with your Google account to manage song tags
          </p>
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition shadow"
          >
            <LogIn className="w-5 h-5" />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // Not admin
  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
          <Tags className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to manage tags. Only administrators can access this page.
          </p>
          <button
            onClick={signOut}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition shadow"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-emerald-700 flex items-center">
              <Tags className="w-6 h-6 mr-2" />
              Tag Manager
            </h1>
            <p className="text-sm text-gray-600">
              Signed in as {user.email}
            </p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition shadow"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : (
          <>
            {/* Collection and View Toggles */}
            <div className="mb-4 bg-white rounded-lg shadow-md p-4">
              {/* Collection Toggle */}
              <div className="flex gap-2 mb-4 pb-4 border-b border-gray-200">
                <button
                  onClick={() => { setCollectionView('vozes-de-hipona'); setSelectedTags([]); setSelectedSong(null); setSearchQuery(''); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                    collectionView === 'vozes-de-hipona'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Vozes de Hipona
                </button>
                <button
                  onClick={() => { setCollectionView('repertoire'); setSelectedTags([]); setSelectedSong(null); setSearchQuery(''); }}
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
                    onClick={() => { setView('songs'); setSelectedTags([]); setSearchQuery(''); }}
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
                    onClick={() => { setView('tags'); setSelectedSong(null); setSearchQuery(''); }}
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

            {/* Songs View */}
            {view === 'songs' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Song List */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-3">
                    Songs ({filteredSongs.length})
                  </h2>

                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {filteredSongs.map(song => (
                      <button
                        key={`${song.collection}-${song.id}`}
                        onClick={() => setSelectedSong(song)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition ${
                          selectedSong?.id === song.id && selectedSong?.collection === song.collection
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300 bg-white'
                        }`}
                      >
                        <div className="font-semibold text-gray-800">{song.title}</div>
                        {song.artist && (
                          <div className="text-sm text-gray-600">{song.artist}</div>
                        )}
                        {(song.tags || []).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {song.tags.map(tag => (
                              <span
                                key={tag}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTagFilter(tag);
                                }}
                                className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs cursor-pointer hover:bg-emerald-200 transition"
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

                {/* Tag Editor */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  {selectedSong ? (
                    <>
                      <h2 className="text-lg font-bold text-gray-800 mb-3">
                        Edit Tags: {selectedSong.title}
                      </h2>

                      {/* Current Tags */}
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Current Tags:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {(selectedSong.tags || []).length > 0 ? (
                            selectedSong.tags.map(tag => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium"
                              >
                                {tag}
                                <button
                                  onClick={() => handleRemoveTag(tag)}
                                  disabled={saving}
                                  className="hover:bg-emerald-200 rounded-full p-0.5 transition"
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
                                  onClick={() => handleAddTag(tag)}
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
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <Tags className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Select a song to edit its tags</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tags View */}
            {view === 'tags' && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  All Tags ({filteredTags.length})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTags.map(({ tag, count }) => (
                    <div
                      key={tag}
                      className="border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800 text-lg">{tag}</span>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                            {count} {count === 1 ? 'song' : 'songs'}
                          </span>
                          <button
                            onClick={() => {
                              setEditingTag(tag);
                              setView('tag-edit');
                              setTagEditSearch('');
                            }}
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
                              onClick={() => {
                                setView('songs');
                                setSelectedSong(song);
                              }}
                              className="w-full text-left text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded transition"
                            >
                              {song.title}
                              {song.artist && <span className="text-xs text-gray-400"> • {song.artist}</span>}
                            </button>
                          ))
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tag Edit View */}
            {view === 'tag-edit' && editingTag && (
              <div className="bg-white rounded-lg shadow-md p-4">
                {/* Header with back button */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setView('tags');
                        setEditingTag(null);
                        setTagEditSearch('');
                      }}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition"
                    >
                      ← Back to Tags
                    </button>
                    <h2 className="text-xl font-bold text-gray-800">
                      Editing Tag: <span className="text-emerald-600">{editingTag}</span>
                    </h2>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {songsWithEditingTag.length} {songsWithEditingTag.length === 1 ? 'song' : 'songs'}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Songs WITH this tag */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Songs with "{editingTag}" ({songsWithEditingTag.length})
                    </h3>
                    <div className="border-2 border-emerald-200 rounded-lg p-4 bg-emerald-50 max-h-[600px] overflow-y-auto">
                      {songsWithEditingTag.length > 0 ? (
                        <div className="space-y-2">
                          {songsWithEditingTag.map(song => (
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
                                onClick={() => removeTagFromSong(song, editingTag)}
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
                      {songsWithoutEditingTag.length > 0 ? (
                        <div className="space-y-2">
                          {songsWithoutEditingTag.map(song => (
                            <button
                              key={`${song.collection}-${song.id}`}
                              onClick={() => addTagToSong(song, editingTag)}
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TagManager;
