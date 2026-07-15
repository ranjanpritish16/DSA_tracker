"use client";

import { useState } from "react";
import { Problem, Category } from "@/lib/types";
import { ProgressMap } from "@/lib/useProgress";
import { ProblemRow } from "./ProblemRow";

export function TopicGroup({
  topic,
  problems,
  progress,
  setCategory,
  toggleSolved,
  toggleHint,
  setNotes,
  defaultOpen = true,
}: {
  topic: string;
  problems: Problem[];
  progress: ProgressMap;
  setCategory: (id: string, c: Category) => void;
  toggleSolved: (id: string) => void;
  toggleHint: (id: string) => void;
  setNotes: (id: string, notes: string) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const solvedCount = problems.filter((p) => progress[p.id]?.solved).length;
  const pct = problems.length ? Math.round((solvedCount / problems.length) * 100) : 0;

  return (
    <div className="rounded-lg border border-line bg-panel">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className={`font-mono text-xs text-dim transition-transform ${open ? "rotate-90" : ""}`}>
          ▸
        </span>
        <span className="text-sm font-medium text-ink">{topic}</span>
        <span className="ml-auto font-mono text-xs text-dim">
          {solvedCount}/{problems.length}
        </span>
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-line">
          <div className="h-full bg-catA transition-all" style={{ width: `${pct}%` }} />
        </div>
      </button>

      {open && (
        <div className="border-t border-line px-3">
          {problems.map((p) => (
            <ProblemRow
              key={p.id}
              problem={p}
              state={
                progress[p.id] ?? { category: null, solved: false, withHint: false, notes: "", lastTouched: null }
              }
              onSetCategory={(c) => setCategory(p.id, c)}
              onToggleSolved={() => toggleSolved(p.id)}
              onToggleHint={() => toggleHint(p.id)}
              onSetNotes={(n) => setNotes(p.id, n)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
