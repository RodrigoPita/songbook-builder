/**
 * Renders a single line of a song, containing an aligned chord line above a lyric line.
 * It uses a <pre> tag for chords to preserve whitespace for precise alignment.
 * @param {object} props - The component props.
 * @param {string} props.chordLine - The string containing chords and spaces for alignment.
 * @param {string} props.lyricLine - The string containing the song lyrics for this line.
 */
const ChordProLine = ({ chordLine, lyricLine }) => {
    // If the line is completely empty, render a spacer div to maintain vertical rhythm.
    if (!chordLine && !lyricLine) return <div className="h-4"></div>;

    return (
        // Container for a single line of lyrics and chords.
        <div className="chord-pro-line font-mono text-sm sm:text-base leading-relaxed break-words print:text-sm">
            {/* The chord line, using a <pre> tag to respect all whitespace for alignment. */}
            <pre
                className="chord-line text-base sm:text-lg text-emerald-600 font-extrabold m-0 p-0 overflow-visible print:text-base"
                style={{ height: '1.4rem', lineHeight: '1', fontFamily: 'monospace' }}
            >
                {chordLine}
            </pre>
            {/* The lyric line, with a negative margin to sit snugly under the chords. */}
            <div
                className="lyric-line text-gray-800 m-0 p-0"
                style={{ marginTop: '-0.3rem', lineHeight: '1.5' }}
            >
                {lyricLine}
            </div>
        </div>
    );
};

export default ChordProLine;
