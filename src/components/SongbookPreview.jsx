import { FileText, Download, Plus, Minus, ListOrdered, RotateCcw } from 'lucide-react';
import SongPreviewBlock from './SongPreviewBlock';

/**
 * Renders the main songbook preview and export controls.
 * @param {object} props
 * @param {Array<object>} props.songs - Array of selected song objects.
 * @param {object} props.semitoneShift - Object mapping song IDs to semitone shifts.
 * @param {Function} props.onShiftChange - Function to change the semitone shift for a song.
 * @param {Function} props.onExportPdf - Function to export the songbook as PDF.
 */
const SongbookPreview = ({
    songs,
    semitoneShift,
    onShiftChange,
    onExportPdf
}) => {
    return (
        <div className="w-full max-w-4xl mx-auto print:w-full print:mx-0">
            {/* Songbook Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white sticky top-0 z-10 rounded-xl shadow-lg border border-gray-200 print:hidden">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 flex items-center mb-3 sm:mb-0">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-emerald-600" />
                    Prévia do Songbook ({songs.length})
                </h2>
                <button
                    onClick={onExportPdf}
                    disabled={songs.length === 0}
                    className={`flex items-center px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition duration-300 transform hover:scale-105 shadow-lg
                        ${songs.length > 0 
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800'
                            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        }`}
                >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Export PDF
                </button>
            </div>

            {/* Songbook Content */}
            {songs.length === 0 ? (
                <div className="text-center p-12 bg-gray-50 rounded-xl mt-10">
                    <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg sm:text-xl text-gray-600 font-medium">
                        Selecione músicas do índice (clicando no ícone <ListOrdered className="inline w-5 h-5"/> no topo) para criar seu songbook.
                        <br></br>Pesquise por título, artista ou categoria e clique nas músicas desejadas para adicioná-las à prévia do songbook.
                    </p>
                </div>
            ) : (
                <div id="songbook-preview">
                    {songs.map((song, index) => (
                        <div 
                            key={song.id} 
                            className={`mb-8 print:mb-0 print-song-page ${index < songs.length - 1 ? 'print-page-break-after' : ''}`}
                        >
                            {/* Semitone Controls */}
                            <div className="flex items-center justify-end mb-2 print:hidden space-x-2">
                                <label className="text-sm font-medium text-gray-600">Transpose (semitones):</label>
                                <button
                                    onClick={() => onShiftChange(song.id, (semitoneShift[song.id] || 0) - 1)}
                                    disabled={(semitoneShift[song.id] || 0) <= -11}
                                    className="p-2 border border-gray-300 rounded-full bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className={`px-3 py-1 font-semibold rounded-lg text-sm transition-colors ${
                                    (semitoneShift[song.id] || 0) === 0 
                                    ? 'bg-gray-200 text-gray-700' 
                                    : 'bg-emerald-500 text-white'
                                }`}>
                                    {semitoneShift[song.id] || 0}
                                </span>
                                <button
                                    onClick={() => onShiftChange(song.id, (semitoneShift[song.id] || 0) + 1)}
                                    disabled={(semitoneShift[song.id] || 0) >= 11}
                                    className="p-2 border border-gray-300 rounded-full bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                {/* Reset Transposition Button */}
                                <button
                                    onClick={() => onShiftChange(song.id, 0)}
                                    disabled={(semitoneShift[song.id] || 0) === 0}
                                    className={`ml-2 p-2 border border-red-300 rounded-full bg-red-50 text-red-600 transition shadow-sm
                                        ${ (semitoneShift[song.id] || 0) === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-100' }
                                    `}
                                    title="Reset"
                                    >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                            </div>
                            <SongPreviewBlock 
                                song={song} 
                                shift={semitoneShift[song.id] || 0} 
                            />
                            {index < songs.length - 1 && (
                                <hr className="my-10 border-dashed border-gray-300 print:hidden" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SongbookPreview;
