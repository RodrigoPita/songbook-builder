import { getTargetKeyFromShift, transposeChord } from './transposition';
import ChordProLine from '../components/ChordProLine';

// Processes ChordPro-like content and returns an array of rendered elements.
export const processChordProSimple = (content, originalKey, semitoneShift) => {
    const lines = content.split('\n');
    const processedElements = [];
    const targetKey = getTargetKeyFromShift(originalKey, semitoneShift);

    const CHORD_LINE_REGEX = /(\[.*?\])([^\[]*)/g;
    const DIRECTIVE_REGEX = /\{([^:}]+):?([^}]*)\}/;

    let inChorus = false;

    lines.forEach((line, lineIndex) => {
        const trimmedLine = line.trim();

        // 1. Process directives
        const directiveMatch = trimmedLine.match(DIRECTIVE_REGEX);
        if (directiveMatch) {
            const directive = directiveMatch[1].toLowerCase().trim();
            const value = directiveMatch[2].trim();

            // Key directive - show discreetly
            if (directive === 'key') {
                processedElements.push(
                    <p key={`key-${lineIndex}`} className="text-xs text-gray-400 mt-2 mb-1 print:hidden"></p>
                );
            } else if (directive === 'start_of_chorus' || directive === 'soc') { // 'soc' é um alias comum
                inChorus = true;
                processedElements.push(<div key={`soc-${lineIndex}`} className="h-4"></div>);
            } else if (directive === 'end_of_chorus' || directive === 'eoc') { // 'eoc' é um alias comum
                inChorus = false;
                processedElements.push(<div key={`eoc-${lineIndex}`} className="h-4"></div>);
            }
            // Ignore title and artist directives (shown in header)
            // Ignore all other directives (start_of_verse, end_of_chorus, etc.)
            return;
        }

        // 2. Process chord/lyric lines
        if (trimmedLine.length > 0) {
            const matches = [...trimmedLine.matchAll(CHORD_LINE_REGEX)];
            let chordLine = '';
            let lyricLine = '';
            let lastIndex = 0;

            // Handle text before the first chord (if any)
            if (matches.length > 0 && matches[0].index > 0) {
                const initialText = trimmedLine.substring(0, matches[0].index);
                lyricLine += initialText;
                chordLine += ' '.repeat(initialText.length);
            }

            matches.forEach(match => {
                const fullMatch = match[0];
                const chordContent = match[1].replace(/\[|\]/g, '');
                const lyrics = match[2];

                // Transpose chord
                const transposedChord = transposeChord(chordContent.trim(), originalKey, semitoneShift);

                // Chord line uses lyric spacing for alignment
                const paddingLength = lyrics.length > 0 ? lyrics.length : transposedChord.length;
                chordLine += transposedChord.padEnd(paddingLength, ' ');

                lyricLine += lyrics;
                lastIndex = match.index + fullMatch.length;
            });

            // Handle remaining text after last chord
            if (lastIndex < trimmedLine.length) {
                const remainingText = trimmedLine.substring(lastIndex);
                lyricLine += remainingText;
                chordLine += ' '.repeat(remainingText.length);
            }

            // If line had chords or just lyrics
            if (matches.length === 0) {
                lyricLine = trimmedLine;
                chordLine = ' '.repeat(trimmedLine.length);
            }

            processedElements.push(
                <ChordProLine
                    key={`content-${lineIndex}`}
                    chordLine={chordLine}
                    lyricLine={lyricLine}
                    inChorus={inChorus}
                />
            );
        } else {
            // Empty line, keep spacing
            processedElements.push(<div key={`empty-${lineIndex}`} className="h-4"></div>);
        }
    });

    return processedElements;
};
