import { transposeChord } from './transposition';
import ChordProLine from '../components/ChordProLine';

const CHORD_REGEX = /(\[.*?\])([^\[]*)/g;
const DIRECTIVE_REGEX = /\{([^:}]+):?([^}]*)\}/;

// Extract parentheses from chord for proper transposition
const extractParentheses = (chordContent) => {
    let prefix = '';
    let suffix = '';
    let chord = chordContent;

    if (chord.startsWith('(')) {
        prefix = '(';
        chord = chord.substring(1);
    }

    if (chord.endsWith(')')) {
        suffix = ')';
        chord = chord.substring(0, chord.length - 1);
    }

    return { prefix, chord, suffix };
};

// Process a single chord/lyric match
const processChordMatch = (match, originalKey, semitoneShift) => {
    let chordContent = match[1].replace(/\[|\]/g, '');
    const lyrics = match[2];

    const { prefix, chord, suffix } = extractParentheses(chordContent);
    const transposedChord = transposeChord(chord.trim(), originalKey, semitoneShift);
    const finalChord = prefix + transposedChord + suffix;

    // Ensure minimum spacing between chords
    const minSpacing = finalChord.length + 2;
    const paddingLength = Math.max(minSpacing, lyrics.length);

    return {
        chord: finalChord.padEnd(paddingLength, ' '),
        lyric: lyrics.padEnd(paddingLength, ' ')
    };
};

// Process ChordPro content and return rendered elements
export const processChordProSimple = (content, originalKey, semitoneShift) => {
    const lines = content.split('\n');
    const processedElements = [];
    let inChorus = false;

    lines.forEach((line, lineIndex) => {
        const trimmedLine = line.trim();

        // Handle directives
        const directiveMatch = trimmedLine.match(DIRECTIVE_REGEX);
        if (directiveMatch) {
            const directive = directiveMatch[1].toLowerCase().trim();

            if (directive === 'start_of_chorus' || directive === 'soc') {
                inChorus = true;
                processedElements.push(<div key={`soc-${lineIndex}`} className="h-4" />);
            } else if (directive === 'end_of_chorus' || directive === 'eoc') {
                inChorus = false;
                processedElements.push(<div key={`eoc-${lineIndex}`} className="h-4" />);
            }
            return;
        }

        // Handle empty lines
        if (trimmedLine.length === 0) {
            processedElements.push(<div key={`empty-${lineIndex}`} className="h-4" />);
            return;
        }

        // Process chord/lyric lines
        const matches = [...trimmedLine.matchAll(CHORD_REGEX)];
        let chordLine = '';
        let lyricLine = '';

        // Handle text before first chord
        if (matches.length > 0 && matches[0].index > 0) {
            const initialText = trimmedLine.substring(0, matches[0].index);
            lyricLine += initialText;
            chordLine += ' '.repeat(initialText.length);
        }

        // Process each chord match
        matches.forEach((match) => {
            const { chord, lyric } = processChordMatch(match, originalKey, semitoneShift);
            chordLine += chord;
            lyricLine += lyric;
        });

        // Handle text after last chord
        const lastMatch = matches[matches.length - 1];
        if (lastMatch) {
            const lastIndex = lastMatch.index + lastMatch[0].length;
            if (lastIndex < trimmedLine.length) {
                const remainingText = trimmedLine.substring(lastIndex);
                lyricLine += remainingText;
                chordLine += ' '.repeat(remainingText.length);
            }
        }

        // Handle lines with only lyrics (no chords)
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
    });

    return processedElements;
};
