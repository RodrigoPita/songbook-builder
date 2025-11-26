import { processChordProSimple } from '../utils/chordProcessor';
import { getTargetKeyFromShift } from '../utils/transposition';

const SongPreviewBlock = ({ song, shift }) => {
    const originalKey = song.key;
    const targetKey = getTargetKeyFromShift(originalKey, shift);
    const transposedContent = processChordProSimple(song.content, originalKey, shift);
    const shiftText = shift === 0 ? "Original" : (shift > 0 ? `+${shift}` : `${shift}`);

    return (
        <div className="p-3 sm:p-4 lg:p-6 bg-white border border-gray-200 rounded-xl shadow-lg mb-6 break-inside-avoid print:shadow-none print:border-0 print:p-0 print:mb-2 print:bg-transparent">
            <div className="mb-3 sm:mb-4 pb-2 border-b border-gray-200 print:border-b-0">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-800 leading-tight break-words">
                    {song.title}
                    {song.artist && (
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-gray-600 ml-2">
                            ({song.artist})
                        </span>
                    )}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 flex flex-wrap items-center gap-1">
                    <span className="font-semibold text-emerald-600">Tom Atual:</span>
                    <span className="font-bold">{targetKey}</span>
                    <span className="text-gray-300">|</span>
                    <span>Original: {originalKey} ({shiftText})</span>
                </p>
            </div>
            <div className="text-sm sm:text-base leading-relaxed">
                {transposedContent}
            </div>
        </div>
    );
};

export default SongPreviewBlock;
