import { useState, useEffect, useMemo, useCallback } from 'react';

export function useSongbook() {
  // Estado para músicas e carregamento
  const [allSongs, setAllSongs] = useState([]);
  const [songsContent, setSongsContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados da UI (mantém a mesma interface do hook original)
  const [selectedSongIds, setSelectedSongIds] = useState([]);
  const [semitoneShift, setSemitoneShift] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Carrega os metadados ao iniciar
  useEffect(() => {
    loadSongsMetadata();
  }, []);

  const loadSongsMetadata = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const indexPath = `${import.meta.env.BASE_URL}charts/index.json`;
      console.log('Carregando metadados de:', indexPath);
      
      const response = await fetch(indexPath);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: Não foi possível carregar o index.json`);
      }
      
      const metadata = await response.json();
      console.log('Metadados carregados:', metadata);
      
      // Transforma os metadados no formato esperado pelo app
      const songs = metadata.map(song => ({
        id: song.id,
        title: song.title,
        artist: song.artist || '',
        filename: song.filename,
        content: null // Será carregado sob demanda
      }));
      
      setAllSongs(songs);
      
    } catch (err) {
      console.error('Erro ao carregar metadados:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Carrega o conteúdo de uma música específica
  const loadSongContent = useCallback(async (songId) => {
    // Se já está carregado, não carrega novamente
    if (songsContent[songId]) {
      return songsContent[songId];
    }

    const song = allSongs.find(s => s.id === songId);
    if (!song) {
      console.error(`Música ${songId} não encontrada`);
      return null;
    }

    try {
      const songPath = `${import.meta.env.BASE_URL}charts/${song.filename}`;
      console.log(`Carregando conteúdo de ${song.title}:`, songPath);
      
      const response = await fetch(songPath);
      
      if (!response.ok) {
        throw new Error(`Erro ao carregar ${song.filename}`);
      }
      
      const content = await response.text();
      
      setSongsContent(prev => ({
        ...prev,
        [songId]: content
      }));
      
      return content;
      
    } catch (err) {
      console.error(`Erro ao carregar música ${songId}:`, err);
      return null;
    }
  }, [allSongs, songsContent]);

  // Toggle seleção de música
  const toggleSongSelection = useCallback(async (songId) => {
    setSelectedSongIds(prev => {
      const isSelected = prev.includes(songId);
      
      if (isSelected) {
        // Desseleciona
        return prev.filter(id => id !== songId);
      } else {
        // Seleciona e carrega o conteúdo
        loadSongContent(songId);
        return [...prev, songId];
      }
    });

    // Inicializa a transposição em 0
    if (!semitoneShift[songId]) {
      setSemitoneShift(prev => ({
        ...prev,
        [songId]: 0
      }));
    }
  }, [semitoneShift, loadSongContent]);

  // Atualiza a transposição de uma música
  const handleShiftChange = useCallback((songId, newShift) => {
    setSemitoneShift(prev => ({
      ...prev,
      [songId]: newShift
    }));
  }, []);

  // Músicas filtradas pela busca
  const filteredSongs = useMemo(() => {
    if (!searchTerm.trim()) {
      return allSongs;
    }

    const term = searchTerm.toLowerCase();
    return allSongs.filter(song => 
      song.title.toLowerCase().includes(term) ||
      (song.artist && song.artist.toLowerCase().includes(term))
    );
  }, [allSongs, searchTerm]);

  // Músicas selecionadas com conteúdo e transposição
  const selectedSongs = useMemo(() => {
    return selectedSongIds
      .map(id => {
        const song = allSongs.find(s => s.id === id);
        if (!song) return null;

        return {
          id: song.id,
          title: song.title,
          artist: song.artist,
          content: songsContent[id] || '', // Conteúdo pode estar sendo carregado
          transposition: semitoneShift[id] || 0
        };
      })
      .filter(song => song !== null);
  }, [selectedSongIds, allSongs, songsContent, semitoneShift]);

  return {
    // Dados
    allSongs,
    selectedSongs,
    semitoneShift,
    
    // Estado de busca
    searchTerm,
    setSearchTerm,
    
    // Músicas filtradas
    filteredSongs,
    
    // Ações
    toggleSongSelection,
    handleShiftChange,
    
    // Estado de carregamento
    loading,
    error,
    
    // Para recarregar se necessário
    reloadSongs: loadSongsMetadata
  };
}