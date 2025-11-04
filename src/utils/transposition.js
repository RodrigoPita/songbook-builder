import {
    SEMITONE_MAP,
    NOTES_SHARP,
    NOTES_FLAT,
    SHARP_KEYS,
    HARMONIC_FIELD,
    RELATIVE_MINORS,
    MAJOR_TO_RELATIVE_MINOR,
    MAJOR_KEYS_FOR_DEGREE
} from '../constants/musicConstants';

export const isMinorKey = (key) => {
    return key.endsWith('m');
};

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

export const getSemitoneShift = (originalKey, targetKey) => {
    const baseOriginalKey = isMinorKey(originalKey) 
        ? RELATIVE_MINORS[originalKey] || originalKey
        : originalKey;

    const baseTargetKey = isMinorKey(targetKey)
        ? RELATIVE_MINORS[targetKey] || targetKey
        : targetKey;

    const originalIndex = SEMITONE_MAP[baseOriginalKey];
    const targetIndex = SEMITONE_MAP[baseTargetKey];

    if (originalIndex === undefined || targetIndex === undefined) {
        console.warn(`Error: Base original key '${baseOriginalKey}' or target key '${baseTargetKey}' not found in SEMITONE_MAP.`);
        return 0;
    }

    let shift = targetIndex - originalIndex;
    if (shift > 6) shift -= 12;
    if (shift < -6) shift += 12;
    
    return shift;
};

// Get target key after transposition
export function getTargetKeyFromShift(originalKey, shift) {
    const wasOriginalKeyMinor = isMinorKey(originalKey);

    const keyForShiftCalculation = wasOriginalKeyMinor 
        ? RELATIVE_MINORS[originalKey] || originalKey.replace('m', '') // Fallback: remove 'm' if not in map
        : originalKey;

    const originalIndex = SEMITONE_MAP[keyForShiftCalculation];
    if (originalIndex === undefined) return originalKey;

    const newChromaticIndex = (originalIndex + shift + 12) % 12;
    let majorTargetKeyName = NOTES_SHARP[newChromaticIndex];

    if (!SHARP_KEYS.includes(majorTargetKeyName) && NOTES_FLAT[newChromaticIndex] !== majorTargetKeyName) {
        majorTargetKeyName = NOTES_FLAT[newChromaticIndex];
    }

    if (wasOriginalKeyMinor) {
        return MAJOR_TO_RELATIVE_MINOR[majorTargetKeyName] || majorTargetKeyName + 'm';
    }

    return majorTargetKeyName;
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
const applyChromaticShift = (rootNote, shift, targetKeyForSpelling) => {
    if (!rootNote) return null;

    const originalNoteIndex = SEMITONE_MAP[rootNote];
    if (originalNoteIndex === undefined) return rootNote;

    const newChromaticIndex = (originalNoteIndex + shift + 12) % 12;

    const baseTargetMajorKey = isMinorKey(targetKeyForSpelling)
        ? RELATIVE_MINORS[targetKeyForSpelling] || targetKeyForSpelling.replace('m', '')
        : targetKeyForSpelling;

    const preferSharps = SHARP_KEYS.includes(baseTargetMajorKey);

    if (preferSharps) {
        return NOTES_SHARP[newChromaticIndex];
    } else {
        return NOTES_FLAT[newChromaticIndex];
    }
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
