/**
 * FretCell — a single cell on the fretboard grid.
 *
 * Visible notes:
 *   - Fretted  → filled circle (note colour)
 *   - Open     → hollow circle (outline only) — standard chord diagram convention
 * Inactive notes show a tiny neutral placeholder dot.
 */

import { NOTE_COLORS, type Note } from '../music/notes';

interface FretCellProps {
    note: Note;
    isVisible: boolean;
    isOpen: boolean; // true for fret 0 (open string)
}

export function FretCell({ note, isVisible, isOpen }: FretCellProps) {
    const color = NOTE_COLORS[note];

    return (
        <div
            className={[
                'relative flex items-center justify-center shrink-0',
                'h-14',
                isOpen
                    ? 'w-14 border-r-[3px] border-r-[#a08060]' // nut
                    : 'w-18 border-r border-r-[#2a2a38]',       // regular fret
            ].join(' ')}
        >
            {/* Horizontal string line — sits behind the dot */}
            <div
                aria-hidden
                className="absolute inset-0 flex items-center pointer-events-none z-0"
            >
                <div className="w-full h-[1.5px] bg-[#908878] opacity-50" />
            </div>

            {/* Note dot */}
            {isVisible ? (
                isOpen ? (
                    /* Open string — hollow circle outlined in the note colour */
                    <div
                        className="note-dot relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold select-none"
                        style={{
                            border: `2.5px solid ${color}`,
                            color: color,
                            backgroundColor: `${color}18`,
                        }}
                    >
                        {note}
                    </div>
                ) : (
                    /* Fretted note — solid filled circle */
                    <div
                        className="note-dot relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white select-none"
                        style={{ backgroundColor: color }}
                    >
                        {note}
                    </div>
                )
            ) : (
                /* Invisible placeholder — keeps string line readable */
                <div className="relative z-10 w-3 h-3 rounded-full bg-[#1e1e28]" />
            )}
        </div>
    );
}
