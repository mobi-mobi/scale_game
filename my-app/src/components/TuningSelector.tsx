/**
 * TuningSelector — choose a tuning preset or customise individual strings.
 *
 * Two-tier control:
 *  1. Preset dropdown — jumps to a named tuning (Standard, Drop D, etc.)
 *  2. Per-string dropdowns — fine-tune any individual string (shows "Custom" in preset)
 */

import type { ChangeEvent } from 'react';
import { CHROMATIC_NOTES, type Note } from '../music/notes';
import { TUNING_PRESETS, type Tuning } from '../music/tuning';

interface TuningSelectorProps {
    tuning: Tuning;
    onTuningChange: (tuning: Tuning) => void;
}

/** Labels for strings 6 → 1 (low → high), matching tuning array order */
const STRING_LABELS = ['6', '5', '4', '3', '2', '1'];

const selectClass =
    'bg-[#1e1e28] border border-[#3a3a50] text-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors';

export function TuningSelector({ tuning, onTuningChange }: TuningSelectorProps) {
    const currentPreset = TUNING_PRESETS.find(
        (p) => p.strings.every((n, i) => n === tuning[i])
    );

    function handlePresetChange(e: ChangeEvent<HTMLSelectElement>) {
        const preset = TUNING_PRESETS.find((p) => p.name === e.target.value);
        if (preset) onTuningChange([...preset.strings]);
    }

    function handleStringChange(index: number, note: Note) {
        const next = [...tuning] as Tuning;
        next[index] = note;
        onTuningChange(next);
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Preset selector */}
            <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest w-14 shrink-0">
                    Preset
                </span>
                <select
                    value={currentPreset?.name ?? 'Custom'}
                    onChange={handlePresetChange}
                    className={`${selectClass} text-sm px-3 py-2 pr-8`}
                >
                    {!currentPreset && <option value="Custom">Custom</option>}
                    {TUNING_PRESETS.map((p) => (
                        <option key={p.name} value={p.name}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Per-string note selectors */}
            <div className="flex items-end gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest w-14 shrink-0 pb-1">
                    Strings
                </span>
                {tuning.map((note, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                        <span className="text-[10px] text-slate-500 font-medium">{STRING_LABELS[idx]}</span>
                        <select
                            value={note}
                            onChange={(e) => handleStringChange(idx, e.target.value as Note)}
                            className={`${selectClass} text-xs px-2 py-1.5 w-14 text-center`}
                        >
                            {CHROMATIC_NOTES.map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
}
