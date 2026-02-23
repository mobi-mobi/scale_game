/**
 * Fretboard — the full interactive fretboard grid.
 *
 * Layout (top → bottom): fret number header, then one StringRow per string.
 * Strings are displayed high-e at top, low-E at bottom (standard diagram convention).
 * Horizontally scrollable on smaller screens.
 */

import type { Note } from '../music/notes';
import { StringRow } from './StringRow';

const FRET_COUNT = 12;
const FRET_NUMBERS = Array.from({ length: FRET_COUNT + 1 }, (_, i) => i);

// String labels are derived from the actual open-note of each string (fretboard[idx][0])
// so they always reflect the current tuning rather than hardcoded Standard names.

/** Fret positions that typically have inlay markers */
const INLAY_FRETS = new Set([3, 5, 7, 9, 12]);

interface FretboardProps {
    /** 2D note grid — [stringIndex (0=low E)][fretIndex (0=open)] */
    fretboard: Note[][];
    activeNotes: Set<Note>;
}

export function Fretboard({ fretboard, activeNotes }: FretboardProps) {
    // Reverse so highest string (e) renders at the top
    const displayStrings = [...fretboard].reverse();

    return (
        <div className="overflow-x-auto fretboard-scroll">
            <div className="inline-block">

                {/* Fret number header */}
                <div className="flex items-center mb-0.5 pl-10">
                    {FRET_NUMBERS.map((fret) => (
                        <div
                            key={fret}
                            className={[
                                'flex items-center justify-center text-[10px] font-medium shrink-0',
                                INLAY_FRETS.has(fret) ? 'text-slate-300' : 'text-slate-600',
                                fret === 0 ? 'w-14' : 'w-18',
                            ].join(' ')}
                        >
                            {fret === 0 ? '♦' : fret}
                        </div>
                    ))}
                </div>

                {/* String rows — label is the open-string note so it updates with tuning */}
                {displayStrings.map((notes, idx) => (
                    <StringRow
                        key={idx}
                        notes={notes}
                        activeNotes={activeNotes}
                        label={notes[0]}
                    />
                ))}

                {/* Inlay dots below the board */}
                <div className="flex items-center mt-1 pl-10">
                    {FRET_NUMBERS.map((fret) => (
                        <div
                            key={fret}
                            className={[
                                'flex items-center justify-center shrink-0',
                                fret === 0 ? 'w-14' : 'w-18',
                            ].join(' ')}
                        >
                            {INLAY_FRETS.has(fret) && fret !== 12 && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#3a3a50]" />
                            )}
                            {fret === 12 && (
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#3a3a50]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#3a3a50]" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
