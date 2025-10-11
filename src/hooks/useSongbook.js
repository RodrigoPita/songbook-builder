import { useState, useEffect, useCallback } from 'react';

export function useSongbook() {
  const [songsMetadata, setSongsMetadata] = useState([]);
  const [songsContent, setSongsContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingSongs, setLoadingSongs] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMetadata();
  }, []);

  const loadMetadata = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Em desenvolvimento: /charts/index.json
      // Em produção (GitHub Pages): /songbook-builder/charts/index.json
      // Mas como os arquivos estão em public/, o Vite serve diretamente
      const indexPath = `${import.meta.env.BASE_URL}charts/index.json`;
      
      console.log('Tentando carregar de:', indexPath);
      
      const response = await fetch(indexPath);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: Não foi possível carregar o index.json`);
      }
      
      const metadata = await response.json();
      console.log('Metadados carregados:', metadata);
      
      setSongsMetadata(metadata);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar metadados:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Carrega o conteúdo de uma música específica
  const loadSongContent = useCallback(async (songId) => {
    // Se já está carregada, retorna do cache
    if (songsContent[songId]) {
      return songsContent[songId];
    }

    // Se já está carregando, não carrega novamente
    if (loadingSongs[songId]) {
      return null;
    }

    const song = songsMetadata.find(s => s.id === songId);
    if (!song) {
      console.error(`Música com id ${songId} não encontrada nos metadados`);
      return null;
    }

    try {
      setLoadingSongs(prev => ({ ...prev, [songId]: true }));
      
      const songPath = `${import.meta.env.BASE_URL}charts/${song.filename}`;
      console.log('Carregando música de:', songPath);
      
      const response = await fetch(songPath);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: Não foi possível carregar ${song.filename}`);
      }
      
      const content = await response.text();
      
      const songData = {
        id: song.id,
        title: song.title,
        artist: song.artist,
        content: content,
        filename: song.filename
      };
      
      setSongsContent(prev => ({ ...prev, [songId]: songData }));
      setLoadingSongs(prev => ({ ...prev, [songId]: false }));
      
      console.log(`Música ${songId} carregada com sucesso`);
      return songData;
      
    } catch (err) {
      console.error(`Erro ao carregar música ${songId}:`, err);
      setLoadingSongs(prev => ({ ...prev, [songId]: false }));
      return null;
    }
  }, [songsMetadata, songsContent, loadingSongs]);

  // Carrega múltiplas músicas de uma vez
  const loadMultipleSongs = useCallback(async (songIds) => {
    const promises = songIds.map(id => loadSongContent(id));
    return Promise.all(promises);
  }, [loadSongContent]);

  const reloadMetadata = () => {
    setSongsMetadata([]);
    setSongsContent({});
    loadMetadata();
  };

  return {
    songsMetadata,
    songsContent,
    loading,
    loadingSongs,
    error,
    loadSongContent,
    loadMultipleSongs,
    reloadMetadata
  };
}