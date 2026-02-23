import { useMemo, useState } from 'react';
import { CHROMATIC_NOTES, type Note } from './music/notes';
import { DEFAULT_TUNING, type Tuning } from './music/tuning';
import { buildFretboard } from './music/fretboard';
import { Fretboard } from './components/Fretboard';
import { TuningSelector } from './components/TuningSelector';
import { NoteFilter } from './components/NoteFilter';
import { ScaleSelector } from './components/ScaleSelector';
import './index.css';

const FRET_COUNT = 12;

interface ActiveScale {
  root: Note;
  name: string;
}

export default function App() {
  const [tuning, setTuning] = useState<Tuning>([...DEFAULT_TUNING.strings]);
  const [activeNotes, setActiveNotes] = useState<Set<Note>>(
    () => new Set(CHROMATIC_NOTES)
  );
  // Tracks which scale is currently driving the note selection (null = manual)
  const [activeScale, setActiveScale] = useState<ActiveScale | null>(null);

  const fretboard = useMemo(() => buildFretboard(tuning, FRET_COUNT), [tuning]);

  function handleScaleSelect(root: Note, scaleName: string, notes: Set<Note>) {
    setActiveScale({ root, name: scaleName });
    setActiveNotes(notes);
  }

  function clearScale() {
    setActiveScale(null);
    setActiveNotes(new Set(CHROMATIC_NOTES));
  }

  function toggleNote(note: Note) {
    // Manual toggle clears the scale selection
    setActiveScale(null);
    setActiveNotes((prev) => {
      const next = new Set(prev);
      if (next.has(note)) next.delete(note);
      else next.add(note);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] text-slate-100 flex flex-col">

      {/* ── Top bar ────────────────────────────────────────────── */}
      <header className="border-b border-[#1e1e2a] px-6 py-4 flex items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight leading-none">🎸 Gitar</h1>
          <p className="text-xs text-slate-500 mt-0.5">Fretboard Scale Trainer</p>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────────── */}
      <main className="flex-1 px-6 py-6 flex flex-col gap-8 max-w-screen-xl w-full mx-auto">

        {/* Tuning section */}
        <section>
          <SectionLabel>Tuning</SectionLabel>
          <div className="bg-[#161620] border border-[#252535] rounded-2xl p-5">
            <TuningSelector tuning={tuning} onTuningChange={setTuning} />
          </div>
        </section>

        {/* Scale section */}
        <section>
          <SectionLabel>Scale</SectionLabel>
          <div className="bg-[#161620] border border-[#252535] rounded-2xl p-5">
            <ScaleSelector
              selectedRoot={activeScale?.root ?? null}
              selectedScaleName={activeScale?.name ?? null}
              onScaleSelect={handleScaleSelect}
              onClear={clearScale}
            />
          </div>
        </section>

        {/* Fretboard section */}
        <section>
          <SectionLabel>Fretboard</SectionLabel>
          <div className="bg-[#161620] border border-[#252535] rounded-2xl p-5">
            <Fretboard fretboard={fretboard} activeNotes={activeNotes} />
          </div>
        </section>

        {/* Note filter section */}
        <section>
          <SectionLabel>
            Notes
            {activeScale && (
              <span className="ml-2 text-indigo-400 normal-case tracking-normal font-medium">
                — {activeScale.root} {activeScale.name}
              </span>
            )}
          </SectionLabel>
          <div className="bg-[#161620] border border-[#252535] rounded-2xl p-5">
            <NoteFilter
              activeNotes={activeNotes}
              onToggle={toggleNote}
              onAll={() => { setActiveScale(null); setActiveNotes(new Set(CHROMATIC_NOTES)); }}
              onNone={() => { setActiveScale(null); setActiveNotes(new Set()); }}
            />
          </div>
        </section>

      </main>

      <footer className="border-t border-[#1e1e2a] px-6 py-3 text-center text-xs text-slate-600">
        {activeScale
          ? `${activeScale.root} ${activeScale.name} · ${activeNotes.size} notes`
          : `${activeNotes.size} / 12 notes`
        } · {FRET_COUNT} frets · {tuning.join(' – ')}
      </footer>
    </div>
  );
}

/** Small uppercase section label */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-3 pl-1 flex items-center gap-1">
      {children}
    </h2>
  );
}
