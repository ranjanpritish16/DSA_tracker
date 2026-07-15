"use client";

import { useState } from "react";
import { Problem, ProblemState, Category, CATEGORY_META } from "@/lib/types";
import { leetcodeSearchUrl, gfgSearchUrl } from "@/lib/data";
import { getRevisitInfo } from "@/lib/revisit";
import { CategoryPicker } from "./CategoryPicker";

const DIFF_COLOR: Record<Problem["difficulty"], string> = {
  Easy: "text-catA",
  Medium: "text-catC",
  Hard: "text-catD",
};

export function ProblemRow({
  problem,
  state,
  onSetCategory,
  onToggleSolved,
  onToggleHint,
  onSetNotes,
}: {
  problem: Problem;
  state: ProblemState;
  onSetCategory: (c: Category) => void;
  onToggleSolved: () => void;
  onToggleHint: () => void;
  onSetNotes: (notes: string) => void;
}) {
  const [notesOpen, setNotesOpen] = useState(false);
  const revisit = getRevisitInfo(state.category, state.lastTouched);
  const lc = problem.leetcodeUrl ?? leetcodeSearchUrl(problem.name);
  const gfg = problem.gfgUrl ?? gfgSearchUrl(problem.name);

  return (
    <div className="group border-b border-line/60 last:border-b-0">
      <div className="flex items-center gap-3 py-2.5 px-1">
        <button
          type="button"
          onClick={onToggleSolved}
          aria-pressed={state.solved}
          aria-label={state.solved ? "Mark unsolved" : "Mark solved"}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
            state.solved ? "border-catA bg-catA/20 text-catA" : "border-line text-transparent hover:border-dim"
          }`}
        >
          ✓
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="truncate text-sm text-ink">{problem.name}</span>
            <span className={`font-mono text-[11px] ${DIFF_COLOR[problem.difficulty]}`}>
              {problem.difficulty}
            </span>
            {revisit.dueDate && (
              <span
                className={`font-mono text-[11px] ${revisit.isDue ? "text-catD" : "text-dim"}`}
                title={revisit.dueDate.toDateString()}
              >
                {revisit.isDue
                  ? "revision due"
                  : `revisit in ${revisit.daysLeft}d`}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={lc}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-line px-2 py-1 font-mono text-[11px] text-dim hover:border-dim hover:text-ink"
          >
            LC
          </a>
          <a
            href={gfg}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-line px-2 py-1 font-mono text-[11px] text-dim hover:border-dim hover:text-ink"
          >
            GFG
          </a>

          <button
            type="button"
            onClick={onToggleHint}
            title="Needed a hint / peeked at solution"
            aria-pressed={state.withHint}
            className={`rounded border px-2 py-1 font-mono text-[11px] transition-colors ${
              state.withHint
                ? "border-catC text-catC bg-catC/10"
                : "border-line text-dim hover:border-dim hover:text-ink"
            }`}
          >
            hint
          </button>

          <CategoryPicker value={state.category} onChange={onSetCategory} />

          <button
            type="button"
            onClick={() => setNotesOpen((v) => !v)}
            aria-expanded={notesOpen}
            className="rounded border border-line px-2 py-1 font-mono text-[11px] text-dim hover:border-dim hover:text-ink"
          >
            {notesOpen ? "hide" : "note"}
          </button>
        </div>
      </div>

      {notesOpen && (
        <div className="px-1 pb-3 pl-8">
          <textarea
            value={state.notes}
            onChange={(e) => onSetNotes(e.target.value)}
            placeholder="Mistake, edge case, approach to remember…"
            rows={2}
            className="w-full resize-none rounded-md border border-line bg-panel2 p-2 text-xs text-ink placeholder:text-dim/60 focus:border-catB"
          />
          {state.category && (
            <p className="mt-1 text-[11px] text-dim">
              {CATEGORY_META[state.category].label} — {CATEGORY_META[state.category].description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
