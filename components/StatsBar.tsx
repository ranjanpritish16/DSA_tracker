"use client";

import { Problem, CATEGORY_META, Category } from "@/lib/types";
import { ProgressMap } from "@/lib/useProgress";
import { getRevisitInfo } from "@/lib/revisit";

const CAT_ORDER: Exclude<Category, null>[] = ["A", "B", "C", "D"];
const CAT_TEXT: Record<Exclude<Category, null>, string> = {
  A: "text-catA",
  B: "text-catB",
  C: "text-catC",
  D: "text-catD",
};

export function StatsBar({ problems, progress }: { problems: Problem[]; progress: ProgressMap }) {
  const total = problems.length;
  const solved = problems.filter((p) => progress[p.id]?.solved).length;
  const pct = total ? Math.round((solved / total) * 100) : 0;

  const dueCount = problems.filter((p) => {
    const s = progress[p.id];
    if (!s) return false;
    return getRevisitInfo(s.category, s.lastTouched).isDue;
  }).length;

  const catCounts = CAT_ORDER.reduce<Record<string, number>>((acc, c) => {
    acc[c] = problems.filter((p) => progress[p.id]?.category === c).length;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-2 gap-3 rounded-lg border border-line bg-panel p-4 sm:grid-cols-4 lg:grid-cols-7">
      <div className="col-span-2 sm:col-span-2 lg:col-span-2">
        <p className="font-mono text-[11px] uppercase tracking-wide text-dim">Overall</p>
        <p className="mt-1 text-2xl font-semibold text-ink">
          {solved}
          <span className="text-sm font-normal text-dim">/{total}</span>
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div className="h-full bg-catA transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {CAT_ORDER.map((c) => (
        <div key={c}>
          <p className={`font-mono text-[11px] uppercase tracking-wide ${CAT_TEXT[c]}`}>
            Cat {c}
          </p>
          <p className="mt-1 text-2xl font-semibold text-ink">{catCounts[c]}</p>
          <p className="text-[11px] text-dim">{CATEGORY_META[c].revisit}</p>
        </div>
      ))}

      <div>
        <p className="font-mono text-[11px] uppercase tracking-wide text-catD">Due now</p>
        <p className="mt-1 text-2xl font-semibold text-ink">{dueCount}</p>
        <p className="text-[11px] text-dim">needs revision</p>
      </div>
    </div>
  );
}
