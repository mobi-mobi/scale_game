/**
 * NoteFilter — toggle which of the 12 chromatic notes are shown on the fretboard.
 *
 * Each button uses the note's unique colour (full opacity = active, greyed = inactive).
 * "All" and "None" shortcuts allow quick reset.
 */

import { CHROMATIC_NOTES, NOTE_COLORS, type Note } from '../music/notes';

interface NoteFilterProps {
    activeNotes: Set<Note>;
    onToggle: (note: Note) => void;
    onAll: () => void;
    onNone: () => void;
}

export function NoteFilter({ activeNotes, onToggle, onAll, onNone }: NoteFilterProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* Shortcut buttons */}
            <button
                onClick={onAll}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#252530] text-slate-300 hover:bg-[#353545] border border-[#3a3a50] transition-colors"
            >
                All
            </button>
            <button
                onClick={onNone}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#252530] text-slate-300 hover:bg-[#353545] border border-[#3a3a50] transition-colors"
            >
                None
            </button>

            {/* Divider */}
            <div className="w-px h-7 bg-[#3a3a50]" />

            {/* Note buttons */}
            {CHROMATIC_NOTES.map((note) => {
                const color = NOTE_COLORS[note];
                const isActive = activeNotes.has(note);
                return (
                    <button
                        key={note}
                        onClick={() => onToggle(note)}
                        title={`Toggle ${note}`}
                        className="w-10 h-10 rounded-full text-[11px] font-bold transition-all duration-150 select-none"
                        style={{
                            backgroundColor: isActive ? color : '#252530',
                            border: `2px solid ${isActive ? color : '#3a3a50'}`,
                            color: isActive ? '#ffffff' : '#60607a',
                            boxShadow: isActive ? `0 0 14px ${color}60` : 'none',
                            transform: isActive ? 'scale(1.05)' : 'scale(1)',
                        }}
                    >
                        {note}
                    </button>
                );
            })}
        </div>
    );
}
