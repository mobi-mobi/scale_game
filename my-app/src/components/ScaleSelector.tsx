/**
 * ScaleSelector — pick a root note + scale type to auto-highlight notes.
 *
 * Keeps local state for the in-progress (partial) selection so each
 * dropdown stays responsive independently. Once both root and scale are
 * chosen, it fires `onScaleSelect` to update the parent.
 */

import { useState, useEffect } from 'react';
import { type Note } from '../music/notes';
import { SCALE_GROUPS, ALL_SCALES, getScaleNotes, ROOT_NOTES } from '../music/scales';

interface ScaleSelectorProps {
    /** Currently committed scale root (null = no active scale) */
    selectedRoot: Note | null;
    /** Currently committed scale name (null = no active scale) */
    selectedScaleName: string | null;
    onScaleSelect: (root: Note, scaleName: string, notes: Set<Note>) => void;
    onClear: () => void;
}

const selectClass =
    'bg-[#1e1e28] border border-[#3a3a50] text-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-sm px-3 py-2';

export function ScaleSelector({
    selectedRoot,
    selectedScaleName,
    onScaleSelect,
    onClear,
}: ScaleSelectorProps) {
    // Local state drives both dropdowns so each is independently selectable
    const [localRoot, setLocalRoot] = useState<Note | null>(selectedRoot);
    const [localScaleName, setLocalScaleName] = useState<string | null>(selectedScaleName);

    // Sync local state when parent clears the selection (e.g. Clear button, manual toggle)
    useEffect(() => {
        setLocalRoot(selectedRoot);
        setLocalScaleName(selectedScaleName);
    }, [selectedRoot, selectedScaleName]);

    function applyIfComplete(root: Note | null, scaleName: string | null) {
        if (!root || !scaleName) return;
        const scale = ALL_SCALES.find((s) => s.name === scaleName);
        if (!scale) return;
        onScaleSelect(root, scaleName, getScaleNotes(root, scale));
    }

    function handleRootChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const root = e.target.value as Note;
        setLocalRoot(root);
        applyIfComplete(root, localScaleName);
    }

    function handleScaleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const scaleName = e.target.value || null;
        setLocalScaleName(scaleName);
        applyIfComplete(localRoot, scaleName);
    }

    const hasSelection = selectedRoot !== null && selectedScaleName !== null;

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Root note */}
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Root</span>
                <select
                    value={localRoot ?? ''}
                    onChange={handleRootChange}
                    className={selectClass}
                >
                    <option value="" disabled>Note</option>
                    {ROOT_NOTES.map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </div>

            {/* Scale type */}
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Scale</span>
                <select
                    value={localScaleName ?? ''}
                    onChange={handleScaleChange}
                    className={`${selectClass} pr-8`}
                >
                    <option value="" disabled>Select scale…</option>
                    {SCALE_GROUPS.map((group) => (
                        <optgroup key={group.group} label={group.group}>
                            {group.scales.map((scale) => (
                                <option key={scale.name} value={scale.name}>
                                    {scale.name}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>

            {/* Active indicator & clear */}
            {hasSelection && (
                <div className="flex items-center gap-2 mt-5">
                    <span className="text-xs text-slate-400 font-medium">
                        {selectedRoot} {selectedScaleName}
                    </span>
                    <button
                        onClick={onClear}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-[#252530] text-slate-400 hover:bg-[#353545] border border-[#3a3a50] transition-colors"
                    >
                        ✕ Clear
                    </button>
                </div>
            )}
        </div>
    );
}
