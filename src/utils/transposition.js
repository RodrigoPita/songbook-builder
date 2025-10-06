import {
    SEMITONE_MAP,
    NOTES_SHARP,
    NOTES_FLAT,
    SHARP_KEYS,
    HARMONIC_FIELD,
    MAJOR_KEYS_FOR_DEGREE
} from '../constants/musicConstants';

// 1. Extracts Root, Quality, Modifier, and Bass.
export function getBaseChordInfo(chord) {
    const parts = chord.split('/');
    const mainChord = parts[0];
    const bassNote = parts.length > 1 ? parts[1].trim() : null;

    const match = mainChord.match(/^([A-G][#b]?)(m|dim|maj)?/i);
    if (!match) return { root: null, quality: '', modifier: '', bassNote };

    const root = match[1];
    let quality = match[2] || '';
    const modifier = mainChord.substring(match[0].length);

    return { root, quality: quality.toLowerCase(), modifier, bassNote };
}

// 2. Determines the new key (for display and notation only)
export function getTargetKeyFromShift(originalKey, shift) {
    const originalIndex = SEMITONE_MAP[originalKey];
    if (originalIndex === undefined) return originalKey;

    const newChromaticIndex = (originalIndex + shift + 12) % 12;
    const targetKeySharp = NOTES_SHARP[newChromaticIndex];

    if (!SHARP_KEYS.includes(targetKeySharp) && NOTES_FLAT[newChromaticIndex] !== targetKeySharp) {
        return NOTES_FLAT[newChromaticIndex];
    }
    return targetKeySharp;
}

// 3. Determines the diatonic degree (for diatonic transposition).
const getDiatonicDegree = (chord, originalKey) => {
    // Try to use the original key if it's a major key (or a minor/modified key that is in the map)
    let effectiveKey = MAJOR_KEYS_FOR_DEGREE.includes(originalKey) ? originalKey : null;

    if (!effectiveKey) {
        // For minor keys (e.g., Am), use the parallel major (C) to calculate the diatonic degree.
        const originalIndex = SEMITONE_MAP[originalKey.replace('m', '')];
        if (originalIndex !== undefined) {
             // C + 3 = Eb (Cm -> Eb)
             const majorParallelIndex = (originalIndex + 3) % 12;
             effectiveKey = NOTES_SHARP[majorParallelIndex];
             // Try to correct for common flats (e.g., D# -> Eb)
             if (majorParallelIndex === 3) effectiveKey = 'Eb'; // D# -> Eb
             if (majorParallelIndex === 8) effectiveKey = 'Ab'; // G# -> Ab
             if (majorParallelIndex === 10) effectiveKey = 'Bb'; // A# -> Bb
        }
    }
    
    const keyChords = HARMONIC_FIELD[effectiveKey] || HARMONIC_FIELD[originalKey];
    if (!keyChords) return -1;

    const { root } = getBaseChordInfo(chord);
    if (!root) return -1;

    for (let degree = 0; degree < keyChords.length; degree++) {
        const fieldChordInfo = getBaseChordInfo(keyChords[degree]);
        // Compare the semitone of the chord root with the semitone of the harmonic field chord root
        if (SEMITONE_MAP[root] === SEMITONE_MAP[fieldChordInfo.root]) {
            return degree; // Diatonic degree found (0=I, 1=ii, 2=iii, etc.)
        }
    }
    
    return -1; 
};
// 4. Direct chromatic transposition, used for non-diatonic chords and bass notes.
const applyChromaticShift = (rootNote, shift, targetKey) => {
    if (!rootNote) return null;
    
    const originalNoteIndex = SEMITONE_MAP[rootNote];
    if (originalNoteIndex === undefined) return rootNote;

    const newChromaticIndex = (originalNoteIndex + shift + 12) % 12;
    
    // If the target key is a "flat key" (not in SHARP_KEYS), prefer flats.
    const isTargetFlatKey = !SHARP_KEYS.includes(targetKey);

    let newNote = NOTES_SHARP[newChromaticIndex];
    
    if (isTargetFlatKey) {
        // If the note at the chromatic index has a flat representation in the FLAT table, use that.
        if (NOTES_FLAT[newChromaticIndex] !== NOTES_SHARP[newChromaticIndex]) {
             newNote = NOTES_FLAT[newChromaticIndex];
        }
    }
    
    return newNote;
}
// 5. Transposes the chord (main hybrid logic)
export const transposeChord = (chord, originalKey, semitoneShift) => {
    if (!chord || semitoneShift === 0) return chord; 
    
    const targetKey = getTargetKeyFromShift(originalKey, semitoneShift);
    const chordInfo = getBaseChordInfo(chord);
    
    if (!chordInfo.root) return chord; // Not a standard chord (e.g., N.C.)

    let newRoot;
    let newQuality = chordInfo.quality;

    // 1. Try Diatonic Transposition
    const targetField = HARMONIC_FIELD[targetKey];
    const originalDegree = getDiatonicDegree(chord, originalKey);

    if (originalDegree !== -1 && targetField) {
        // DIATONIC: use the corresponding chord from the target key's harmonic field
        const targetDiatonicChord = targetField[originalDegree];
        const targetBaseInfo = getBaseChordInfo(targetDiatonicChord);
        
        newRoot = targetBaseInfo.root;
        
        // Quality Adjustment: If the original chord had no quality (C) but the target does (Dm), apply the quality (m)
        if (!chordInfo.quality && targetBaseInfo.quality === 'm') {
            newQuality = 'm';
        } else {
             newQuality = chordInfo.quality;
        }

    } else {
        // --- 2. Chromatic (Fallback) ---
        // Non-diatonic/borrowed chord
        newRoot = applyChromaticShift(chordInfo.root, semitoneShift, targetKey);
    }
    
    // 3. Build the Chord
    let finalChord = `${newRoot}${newQuality}${chordInfo.modifier}`;
    
    // 4. Transpose the Bass (ALWAYS Chromatic)
    if (chordInfo.bassNote) {
        const newBassNote = applyChromaticShift(chordInfo.bassNote, semitoneShift, targetKey);
        if (newBassNote) {
            finalChord += `/${newBassNote}`;
        }
    }
    
    return finalChord;
};
