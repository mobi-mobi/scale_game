/**
 * Fretboard builder — pure function with no side effects.
 *
 * Returns a 2D array [stringIndex][fretIndex] → Note where:
 *   - stringIndex 0 = low E (string 6), 5 = high e (string 1)
 *   - fretIndex 0 = open string, 1–N = fret positions
 */

import { getNoteAtFret, type Note } from './notes';
import type { Tuning } from './tuning';

export function buildFretboard(tuning: Tuning, fretCount: number = 12): Note[][] {
    return tuning.map((openNote) =>
        Array.from({ length: fretCount + 1 }, (_, fret) => getNoteAtFret(openNote, fret))
    );
}
