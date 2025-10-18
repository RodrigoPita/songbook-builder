/**
 * Renders a single line of a song, containing an aligned chord line above a lyric line.
 * It uses a <pre> tag for chords to preserve whitespace for precise alignment.
 * @param {object} props - The component props.
 * @param {string} props.chordLine - The string containing chords and spaces for alignment.
 * @param {string} props.lyricLine - The string containing the song lyrics for this line.
 * @param {boolean} props.inChorus - Indicates if the current line is part of a chorus section.
 */
const ChordProLine = ({ chordLine, lyricLine, inChorus }) => {
    if (!chordLine && !lyricLine) return <div className="h-4"></div>;

    const chordClass = `chord-line text-emerald-600 font-extrabold m-0 p-0 print:text-base`;
    const lyricClass = `text-gray-800 ${inChorus ? 'font-bold' : ''}`;

    return (
        <div className={`whitespace-pre-wrap font-mono leading-relaxed print:text-sm print:leading-normal ${inChorus ? 'print:font-bold' : ''}`}>
            {/* Chord line: monospace and bold with responsive font */}
            <pre 
                className={chordClass} 
                style={{ 
                    fontSize: 'clamp(7px, 2.2vw, 20px)',
                    height: 'auto', 
                    minHeight: '1rem',
                    lineHeight: '1.2', 
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                }}
            >
                {chordLine}
            </pre>
            {/* Lyric line: scales with chords */}
            <pre 
                className={lyricClass} 
                style={{ 
                    fontSize: 'clamp(7px, 2.2vw, 20px)',
                    marginTop: '-0.2rem', 
                    lineHeight: '1.4',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                }}
            >
                {lyricLine}
            </pre>
        </div>
    );
};

export default ChordProLine;
