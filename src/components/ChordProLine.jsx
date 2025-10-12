/**
 * Renders a single line of a song, containing an aligned chord line above a lyric line.
 * It uses a <pre> tag for chords to preserve whitespace for precise alignment.
 * @param {object} props - The component props.
 * @param {string} props.chordLine - The string containing chords and spaces for alignment.
 * @param {string} props.lyricLine - The string containing the song lyrics for this line.
 * @param {boolean} props.inChorus - Indicates if the current line is part of a chorus section.
 */
const ChordProLine = ({ chordLine, lyricLine, inChorus }) => {
    // If the line is completely empty, render a spacer div to maintain vertical rhythm.
    if (!chordLine && !lyricLine) return <div className="h-4"></div>;

    const chordClass = `chord-line text-base sm:text-lg text-emerald-600 font-extrabold m-0 p-0 overflow-visible print:text-base`;
    const lyricClass = `text-gray-800 ${inChorus ? 'font-bold' : ''}`;

    return (
        // Container for a single line of lyrics and chords.
        <div className={`whitespace-pre-wrap font-mono leading-relaxed print:text-sm print:leading-normal ${inChorus ? 'print:font-bold' : ''}`}>
            {/* Chord line: monospace and bold */}
            <pre className={chordClass} style={{ height: '1.4rem', lineHeight: '1', fontFamily: 'monospace' }}>{chordLine}</pre>
            {/* Lyric line: normal text and bold if in chorus */}
            <pre className={lyricClass} style={{ marginTop: '-0.3rem', lineHeight: '1.5' }}>{lyricLine}</pre>
        </div>
    );
};

export default ChordProLine;
