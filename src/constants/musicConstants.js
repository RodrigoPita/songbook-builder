export const SEMITONE_MAP = {
    "C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4, "F": 5, 
    "F#": 6, "Gb": 6, "G": 7, "G#": 8, "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11
};

export const NOTES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
export const NOTES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
export const SHARP_KEYS = ["G", "D", "A", "E", "B", "F#"]; 

export const HARMONIC_FIELD = {
    "C":  ["C",  "Dm", "Em", "F",  "G",  "Am", "B°"],
    "Db": ["Db", "Ebm", "Fm", "Gb", "Ab", "Bbm", "C°"],
    "D":  ["D",  "Em", "F#m", "G",  "A",  "Bm", "C#°"],
    "Eb": ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "D°"],
    "E":  ["E",  "F#m", "G#m", "A",  "B",  "C#m", "D#°"],
    "F":  ["F",  "Gm", "Am", "Bb", "C",  "Dm", "E°"],
    "F#": ["F#", "G#m", "A#m", "B",  "C#", "D#m", "E#°"], 
    "G":  ["G",  "Am", "Bm", "C",  "D",  "Em", "F#°"],
    "Ab": ["Ab", "Bbm", "Cm", "Db", "Eb", "Fm", "G°"],
    "A":  ["A",  "Bm", "C#m", "D",  "E",  "F#m", "G#°"],
    "Bb": ["Bb", "Cm", "Dm", "Eb", "F",  "Gm", "A°"],
    "B":  ["B",  "C#m", "D#m", "E",  "F#", "G#m", "A#°"],
};

export const MAJOR_KEYS_FOR_DEGREE = Object.keys(HARMONIC_FIELD);
