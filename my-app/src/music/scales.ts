/**
 * Scale definitions — intervals + note derivation.
 *
 * Each scale is defined as an array of semitone steps from the root.
 * Given a root note, `getScaleNotes()` walks the chromatic alphabet
 * and returns the Set of notes that belong to that scale.
 */

import { CHROMATIC_NOTES, getNoteAtFret, type Note } from './notes';

export interface ScaleDefinition {
    name: string;
    /** Semitone intervals from the root (excluding the root itself) */
    intervals: number[];
}

export interface ScaleGroup {
    group: string;
    scales: ScaleDefinition[];
}

export const SCALE_GROUPS: ScaleGroup[] = [
    {
        group: 'Major & Minor',
        scales: [
            { name: 'Major (Ionian)', intervals: [2, 4, 5, 7, 9, 11] },
            { name: 'Natural Minor (Aeolian)', intervals: [2, 3, 5, 7, 8, 10] },
            { name: 'Harmonic Minor', intervals: [2, 3, 5, 7, 8, 11] },
            { name: 'Melodic Minor', intervals: [2, 3, 5, 7, 9, 11] },
        ],
    },
    {
        group: 'Pentatonic & Blues',
        scales: [
            { name: 'Major Pentatonic', intervals: [2, 4, 7, 9] },
            { name: 'Minor Pentatonic', intervals: [3, 5, 7, 10] },
            { name: 'Blues', intervals: [3, 5, 6, 7, 10] },
            { name: 'Major Blues', intervals: [2, 3, 4, 7, 9] },
        ],
    },
    {
        group: 'Modes',
        scales: [
            { name: 'Dorian', intervals: [2, 3, 5, 7, 9, 10] },
            { name: 'Phrygian', intervals: [1, 3, 5, 7, 8, 10] },
            { name: 'Lydian', intervals: [2, 4, 6, 7, 9, 11] },
            { name: 'Mixolydian', intervals: [2, 4, 5, 7, 9, 10] },
            { name: 'Locrian', intervals: [1, 3, 5, 6, 8, 10] },
        ],
    },
    {
        group: 'Exotic',
        scales: [
            { name: 'Phrygian Dominant', intervals: [1, 4, 5, 7, 8, 10] },
            { name: 'Lydian Dominant', intervals: [2, 4, 6, 7, 9, 10] },
            { name: 'Super Locrian (Altered)', intervals: [1, 3, 4, 6, 8, 10] },
            { name: 'Whole Tone', intervals: [2, 4, 6, 8, 10] },
            { name: 'Diminished (H-W)', intervals: [1, 3, 4, 6, 7, 9, 10] },
            { name: 'Diminished (W-H)', intervals: [2, 3, 5, 6, 8, 9, 11] },
            { name: 'Double Harmonic', intervals: [1, 4, 5, 7, 8, 11] },
            { name: 'Hungarian Minor', intervals: [2, 3, 6, 7, 8, 11] },
        ],
    },
];

/** Flat list for easy lookup by name */
export const ALL_SCALES: ScaleDefinition[] = SCALE_GROUPS.flatMap((g) => g.scales);

/**
 * Returns the Set of Note names that belong to the given scale
 * rooted at `root`. The root note is always included.
 */
export function getScaleNotes(root: Note, scale: ScaleDefinition): Set<Note> {
    const notes = new Set<Note>([root]);
    for (const interval of scale.intervals) {
        notes.add(getNoteAtFret(root, interval));
    }
    return notes;
}

/** All 12 chromatic root note options (same as CHROMATIC_NOTES, re-exported for clarity) */
export const ROOT_NOTES: Note[] = [...CHROMATIC_NOTES];
