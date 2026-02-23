/**
 * Guitar tuning definitions.
 *
 * Strings are always ordered low → high (string 6 → string 1),
 * matching the physical order on a guitar headstock.
 * Display code reverses this order so high-e appears at the top.
 */

import type { Note } from './notes';

export type Tuning = Note[];

export interface TuningPreset {
    name: string;
    strings: Tuning; // 6 notes: [low E, A, D, G, B, high e]
}

export const TUNING_PRESETS: TuningPreset[] = [
    // ── Standard & Whole-Step Variations ─────────────────────────────────────
    { name: 'Standard (EADGBe)', strings: ['E', 'A', 'D', 'G', 'B', 'E'] },
    { name: 'Half Step Down (Eb)', strings: ['D#', 'G#', 'C#', 'F#', 'A#', 'D#'] },
    { name: 'Full Step Down (D)', strings: ['D', 'G', 'C', 'F', 'A', 'D'] },
    { name: '1½ Steps Down (C#)', strings: ['C#', 'F#', 'B', 'E', 'G#', 'C#'] },
    { name: 'Two Steps Down (C)', strings: ['C', 'F', 'A#', 'D#', 'G', 'C'] },

    // ── Drop Tunings ─────────────────────────────────────────────────────────
    { name: 'Drop D', strings: ['D', 'A', 'D', 'G', 'B', 'E'] },
    { name: 'Drop C#', strings: ['C#', 'G#', 'C#', 'F#', 'A#', 'D#'] },
    { name: 'Drop C', strings: ['C', 'G', 'C', 'F', 'A', 'D'] },
    { name: 'Drop B', strings: ['B', 'F#', 'B', 'E', 'G#', 'C#'] },
    { name: 'Drop A#', strings: ['A#', 'F', 'A#', 'D#', 'G', 'C'] },
    { name: 'Drop A', strings: ['A', 'E', 'A', 'D', 'F#', 'B'] },

    // ── Open Tunings ─────────────────────────────────────────────────────────
    { name: 'Open G (DGDGBd)', strings: ['D', 'G', 'D', 'G', 'B', 'D'] },
    { name: 'Open D (DADFAd)', strings: ['D', 'A', 'D', 'F#', 'A', 'D'] },
    { name: 'Open E (EBEGBe)', strings: ['E', 'B', 'E', 'G#', 'B', 'E'] },
    { name: 'Open A (EAEACe)', strings: ['E', 'A', 'E', 'A', 'C#', 'E'] },
    { name: 'Open C (CGCGCe)', strings: ['C', 'G', 'C', 'G', 'C', 'E'] },

    // ── Alternate / Popular ───────────────────────────────────────────────────
    { name: 'DADGAD', strings: ['D', 'A', 'D', 'G', 'A', 'D'] },
    { name: 'Double Drop D (DADGBd)', strings: ['D', 'A', 'D', 'G', 'B', 'D'] },
];

export const DEFAULT_TUNING: TuningPreset = TUNING_PRESETS[0];
