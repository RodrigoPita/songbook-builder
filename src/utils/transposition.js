import {
    SEMITONE_MAP,
    NOTES_SHARP,
    NOTES_FLAT,
    SHARP_KEYS,
    HARMONIC_FIELD,
    MAJOR_KEYS_FOR_DEGREE
} from '../constants/musicConstants';

// Parse chord into components (root, quality, modifier, bass)
export function getBaseChordInfo(chord) {
    let processedChord = chord.trim();

    // Remove optional parentheses
    const optionalParenMatch = processedChord.match(/^\((.*)\)$/);
    if (optionalParenMatch) {
        processedChord = optionalParenMatch[1];
    }

    // Split main chord and bass note
    const parts = processedChord.split('/');
    const mainChord = parts[0];
    const bassNote = parts.length > 1 ? parts[1].trim() : null;

    // Extract root, quality, and modifier
    const match = mainChord.match(/^([A-G][#b]?)(m|dim|maj)?/i);
    if (!match) {
        return { root: null, quality: '', modifier: '', bassNote, originalParen: !!optionalParenMatch };
    }

    const root = match[1];
    const quality = (match[2] || '').toLowerCase();
    const modifier = mainChord.substring(match[0].length);

    return { root, quality, modifier, bassNote, originalParen: !!optionalParenMatch };
}

// Get target key after transposition
export function getTargetKeyFromShift(originalKey, shift) {
    const originalIndex = SEMITONE_MAP[originalKey];
    if (originalIndex === undefined) return originalKey;

    const newChromaticIndex = (originalIndex + shift + 12) % 12;
    const targetKeySharp = NOTES_SHARP[newChromaticIndex];

    // Prefer flats for flat keys
    if (!SHARP_KEYS.includes(targetKeySharp) && NOTES_FLAT[newChromaticIndex] !== targetKeySharp) {
        return NOTES_FLAT[newChromaticIndex];
    }

    return targetKeySharp;
}

// Get diatonic degree of chord in key (0-6 for I-VII, -1 if not diatonic)
const getDiatonicDegree = (chord, originalKey) => {
    let effectiveKey = MAJOR_KEYS_FOR_DEGREE.includes(originalKey) ? originalKey : null;

    // For minor keys, use parallel major
    if (!effectiveKey) {
        const originalIndex = SEMITONE_MAP[originalKey.replace('m', '')];
        if (originalIndex !== undefined) {
            const majorParallelIndex = (originalIndex + 3) % 12;
            effectiveKey = NOTES_SHARP[majorParallelIndex];

            // Correct common flats
            if (majorParallelIndex === 3) effectiveKey = 'Eb';
            if (majorParallelIndex === 8) effectiveKey = 'Ab';
            if (majorParallelIndex === 10) effectiveKey = 'Bb';
        }
    }

    const keyChords = HARMONIC_FIELD[effectiveKey] || HARMONIC_FIELD[originalKey];
    if (!keyChords) return -1;

    const { root } = getBaseChordInfo(chord);
    if (!root) return -1;

    // Find matching degree by semitone comparison
    for (let degree = 0; degree < keyChords.length; degree++) {
        const fieldChordInfo = getBaseChordInfo(keyChords[degree]);
        if (SEMITONE_MAP[root] === SEMITONE_MAP[fieldChordInfo.root]) {
            return degree;
        }
    }

    return -1;
};

// Apply chromatic transposition to a note
const applyChromaticShift = (rootNote, shift, targetKey) => {
    if (!rootNote) return null;

    const originalNoteIndex = SEMITONE_MAP[rootNote];
    if (originalNoteIndex === undefined) return rootNote;

    const newChromaticIndex = (originalNoteIndex + shift + 12) % 12;
    const isTargetFlatKey = !SHARP_KEYS.includes(targetKey);

    let newNote = NOTES_SHARP[newChromaticIndex];

    // Prefer flats for flat keys
    if (isTargetFlatKey && NOTES_FLAT[newChromaticIndex] !== NOTES_SHARP[newChromaticIndex]) {
        newNote = NOTES_FLAT[newChromaticIndex];
    }

    return newNote;
};

// Transpose chord using hybrid diatonic/chromatic logic
export const transposeChord = (chord, originalKey, semitoneShift) => {
    if (!chord || semitoneShift === 0) return chord;

    const targetKey = getTargetKeyFromShift(originalKey, semitoneShift);
    const chordInfo = getBaseChordInfo(chord);

    if (!chordInfo.root) return chord; // Not a standard chord

    let newRoot;
    let newQuality = chordInfo.quality;

    // Try diatonic transposition first
    const targetField = HARMONIC_FIELD[targetKey];
    const originalDegree = getDiatonicDegree(chord, originalKey);

    if (originalDegree !== -1 && targetField) {
        // Diatonic: use corresponding chord from target key
        const targetDiatonicChord = targetField[originalDegree];
        const targetBaseInfo = getBaseChordInfo(targetDiatonicChord);

        newRoot = targetBaseInfo.root;

        // Preserve or inherit quality
        if (!chordInfo.quality && targetBaseInfo.quality === 'm') {
            newQuality = 'm';
        }
    } else {
        // Chromatic fallback for non-diatonic chords
        newRoot = applyChromaticShift(chordInfo.root, semitoneShift, targetKey);
    }

    // Build transposed chord
    let finalChord = `${newRoot}${newQuality}${chordInfo.modifier}`;

    // Transpose bass note (always chromatic)
    if (chordInfo.bassNote) {
        const newBassNote = applyChromaticShift(chordInfo.bassNote, semitoneShift, targetKey);
        if (newBassNote) {
            finalChord += `/${newBassNote}`;
        }
    }

    // Restore parentheses if original had them
    if (chordInfo.originalParen) {
        finalChord = `(${finalChord})`;
    }

    return finalChord;
};
