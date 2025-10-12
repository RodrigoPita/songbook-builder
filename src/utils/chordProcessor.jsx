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
            } else if (directive === 'start_of_chorus' || directive === 'soc') {
                inChorus = true;
                processedElements.push(<div key={`soc-${lineIndex}`} className="h-4"></div>);
            } else if (directive === 'end_of_chorus' || directive === 'eoc') {
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

            matches.forEach((match, matchIndex) => {
                const fullMatch = match[0];
                let chordContent = match[1].replace(/\[|\]/g, '');
                const lyrics = match[2];

                // Handle parentheses: extract them and remove from chord for transposition
                let prefix = '';
                let suffix = '';

                // Check for opening parenthesis
                if (chordContent.startsWith('(')) {
                    prefix = '(';
                    chordContent = chordContent.substring(1);
                }

                // Check for closing parenthesis
                if (chordContent.endsWith(')')) {
                    suffix = ')';
                    chordContent = chordContent.substring(0, chordContent.length - 1);
                }

                // Transpose chord (without parentheses)
                const transposedChord = transposeChord(chordContent.trim(), originalKey, semitoneShift);

                // Rebuild with parentheses
                const finalChord = prefix + transposedChord + suffix;

                // Calculate padding needed to ensure chords don't collide:
                // Use the longer of: (transposed chord + 2 spaces) OR (original lyrics length)
                const minSpacing = finalChord.length + 2; // Minimum: chord + 2 spaces
                const paddingLength = Math.max(minSpacing, lyrics.length);

                chordLine += finalChord.padEnd(paddingLength, ' ');
                lyricLine += lyrics.padEnd(paddingLength, ' ');

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
