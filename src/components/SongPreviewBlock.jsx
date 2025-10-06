import { processChordProSimple } from '../utils/chordProcessor';
import { getTargetKeyFromShift } from '../utils/transposition';

const SongPreviewBlock = ({ song, shift }) => {
    const originalKey = song.key;
    const targetKey = getTargetKeyFromShift(originalKey, shift); 
    const transposedContent = processChordProSimple(song.content, originalKey, shift);
    const shiftText = shift === 0 ? "Original" : (shift > 0 ? `+${shift}` : `${shift}`);

    return (
        <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl shadow-lg mb-6 break-inside-avoid print:shadow-none print:border-0 print:p-0">
            <div className="mb-4 pb-2 border-b border-gray-200 print:border-b-0">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight">
                    {song.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                    <span className="font-semibold text-emerald-600">Tom Atual:</span> {targetKey} 
                    <span className="mx-2 text-gray-300">|</span> 
                    <span className="text-xs sm:text-sm">Original: {originalKey} ({shiftText})</span>
                </p>
            </div>
            <div className="text-base leading-relaxed print:text-sm">
                {transposedContent}
            </div>
        </div>
    );
};

export default SongPreviewBlock;
