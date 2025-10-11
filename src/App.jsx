import { useState, useEffect } from 'react';
import { useSongbook } from './hooks/useSongbook';

function App() {
  const { 
    songsMetadata, 
    songsContent, 
    loading, 
    loadingSongs, 
    error, 
    loadSongContent,
    loadMultipleSongs,
    reloadMetadata 
  } = useSongbook();
  
  const [selectedSongs, setSelectedSongs] = useState({});
  const [transpositions, setTranspositions] = useState({});

  // Gerencia a seleção de músicas
  const toggleSongSelection = async (songId) => {
    const isCurrentlySelected = selectedSongs[songId];
    
    // Se está selecionando (não estava selecionada antes)
    if (!isCurrentlySelected) {
      // Carrega o conteúdo da música se ainda não foi carregado
      if (!songsContent[songId]) {
        await loadSongContent(songId);
      }
    }
    
    setSelectedSongs(prev => ({
      ...prev,
      [songId]: !prev[songId]
    }));
    
    // Inicializa a transposição em 0 se for a primeira vez
    if (!transpositions[songId]) {
      setTranspositions(prev => ({
        ...prev,
        [songId]: 0
      }));
    }
  };

  // Gerencia a transposição
  const transposeUp = (songId) => {
    setTranspositions(prev => ({
      ...prev,
      [songId]: (prev[songId] || 0) + 1
    }));
  };

  const transposeDown = (songId) => {
    setTranspositions(prev => ({
      ...prev,
      [songId]: (prev[songId] || 0) - 1
    }));
  };

  // Exporta para PDF
  const exportToPDF = async () => {
    const selectedSongIds = Object.keys(selectedSongs).filter(id => selectedSongs[id]);
    
    if (selectedSongIds.length === 0) {
      alert('Selecione pelo menos uma música');
      return;
    }
    
    // Garante que todas as músicas selecionadas estão carregadas
    const songsNotLoaded = selectedSongIds.filter(id => !songsContent[id]);
    if (songsNotLoaded.length > 0) {
      console.log('Carregando músicas faltantes...');
      await loadMultipleSongs(songsNotLoaded);
    }
    
    // Aqui você chama sua função de exportação PDF
    const songsToExport = selectedSongIds.map(id => ({
      ...songsContent[id],
      transposition: transpositions[id] || 0
    }));
    
    console.log('Exportando para PDF:', songsToExport);
    // Chame sua função de PDF aqui, por exemplo:
    // generatePDF(songsToExport);
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Carregando songbook...</h2>
        <p>Aguarde enquanto carregamos as músicas disponíveis.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: 'red' }}>Erro ao carregar músicas</h2>
        <p>{error}</p>
        <button 
          onClick={reloadMetadata}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Tentar novamente
        </button>
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
          <h3>Dicas de solução:</h3>
          <ul>
            <li>Verifique se o arquivo <code>public/charts/index.json</code> existe</li>
            <li>Verifique se o formato do JSON está correto</li>
            <li>Veja o console do navegador para mais detalhes</li>
          </ul>
        </div>
      </div>
    );
  }

  const selectedCount = Object.values(selectedSongs).filter(Boolean).length;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Songbook Builder</h1>
      
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#f5f5f5',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <strong>{selectedCount}</strong> música(s) selecionada(s)
        </div>
        <button 
          onClick={exportToPDF}
          disabled={selectedCount === 0}
          style={{ 
            padding: '10px 20px', 
            cursor: selectedCount === 0 ? 'not-allowed' : 'pointer',
            backgroundColor: selectedCount === 0 ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Exportar PDF
        </button>
      </div>

      <div>
        <h2>Músicas Disponíveis ({songsMetadata.length})</h2>
        
        {songsMetadata.length === 0 && (
          <p>Nenhuma música encontrada. Adicione arquivos .cho na pasta public/charts/</p>
        )}
        
        {songsMetadata.map(song => {
          const isSelected = selectedSongs[song.id] || false;
          const isLoading = loadingSongs[song.id] || false;
          
          return (
            <div 
              key={song.id} 
              style={{ 
                marginBottom: '15px', 
                padding: '15px', 
                border: '2px solid #ddd',
                borderRadius: '8px',
                backgroundColor: isSelected ? '#e3f2fd' : 'white',
                transition: 'all 0.3s ease'
              }}
            >
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSongSelection(song.id)}
                  disabled={isLoading}
                  style={{ cursor: isLoading ? 'wait' : 'pointer' }}
                />
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {song.title}
                  </div>
                  {song.artist && (
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {song.artist}
                    </div>
                  )}
                  {isLoading && (
                    <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                      Carregando...
                    </div>
                  )}
                </div>
                
                {isSelected && !isLoading && (
                  <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd'
                  }}>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        transposeDown(song.id);
                      }}
                      style={{
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        fontSize: '18px'
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      minWidth: '40px', 
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}>
                      {transpositions[song.id] || 0}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        transposeUp(song.id);
                      }}
                      style={{
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        fontSize: '18px'
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;