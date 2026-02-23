/**
 * Core music theory — chromatic alphabet, note utilities, and visual colours.
 *
 * The chromatic scale uses sharps only (C, C#, D, …).
 * All fretboard calculations derive from these 12 notes.
 */

export const CHROMATIC_NOTES = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
] as const;

export type Note = typeof CHROMATIC_NOTES[number];

/**
 * Returns the note at a given fret above the open string note.
 * Wraps around the 12-note octave automatically.
 */
export function getNoteAtFret(openNote: Note, fret: number): Note {
    const root = CHROMATIC_NOTES.indexOf(openNote);
    return CHROMATIC_NOTES[(root + fret) % 12];
}

/**
 * A unique, visually distinct colour for each of the 12 chromatic notes.
 * Used consistently everywhere in the UI.
 */
export const NOTE_COLORS: Record<Note, string> = {
    'C': '#ef4444', // red
    'C#': '#f97316', // orange
    'D': '#f59e0b', // amber
    'D#': '#facc15', // yellow
    'E': '#84cc16', // lime
    'F': '#22c55e', // green
    'F#': '#14b8a6', // teal
    'G': '#06b6d4', // cyan
    'G#': '#3b82f6', // blue
    'A': '#8b5cf6', // violet
    'A#': '#d946ef', // fuchsia
    'B': '#f43f5e', // rose
};
