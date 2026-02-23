/**
 * StringRow — one horizontal guitar string on the fretboard.
 *
 * Renders a labelled row of FretCells (open + fret 1–12).
 * The string label (e.g. "e", "B", "G") sits to the left of the nut.
 */

import type { Note } from '../music/notes';
import { FretCell } from './FretCell';

interface StringRowProps {
    /** All note names for this string: index 0 = open, 1–12 = frets */
    notes: Note[];
    activeNotes: Set<Note>;
    /** Display label for this string, e.g. "e", "B", "E" */
    label: string;
}

export function StringRow({ notes, activeNotes, label }: StringRowProps) {
    return (
        <div className="flex items-center">
            {/* String label */}
            <div className="w-8 shrink-0 text-center text-sm font-semibold text-slate-400 select-none">
                {label}
            </div>

            {/* Fret cells — position relative so string line spans the full width */}
            <div className="relative flex items-center">
                {notes.map((note, fret) => (
                    <FretCell
                        key={fret}
                        note={note}
                        isVisible={activeNotes.has(note)}
                        isOpen={fret === 0}
                    />
                ))}
            </div>
        </div>
    );
}
