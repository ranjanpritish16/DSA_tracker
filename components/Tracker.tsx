"use client";

import { useMemo, useState } from "react";
import { PROBLEMS } from "@/lib/data";
import { useProgress } from "@/lib/useProgress";
import { getRevisitInfo } from "@/lib/revisit";
import { StatsBar } from "@/components/StatsBar";
import { Filters, FilterState } from "@/components/Filters";
import { TopicGroup } from "@/components/TopicGroup";

const SECTIONS = Array.from(new Set(PROBLEMS.map((p) => p.section)));

const DEFAULT_FILTERS: FilterState = {
  query: "",
  section: "All",
  category: "Any",
  dueOnly: false,
  unsolvedOnly: false,
};

export default function Tracker() {
  const { progress, hydrated, setCategory, toggleSolved, toggleHint, setNotes, resetAll } =
    useProgress();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [confirmReset, setConfirmReset] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    return PROBLEMS.filter((p) => {
      if (filters.section !== "All" && p.section !== filters.section) return false;
      if (filters.query && !p.name.toLowerCase().includes(filters.query.toLowerCase())) return false;

      const state = progress[p.id];

      if (filters.category === "Unmarked" && state?.category) return false;
      if (
        filters.category !== "Any" &&
        filters.category !== "Unmarked" &&
        state?.category !== filters.category
      )
        return false;

      if (filters.unsolvedOnly && state?.solved) return false;

      if (filters.dueOnly) {
        if (!state) return false;
        const revisit = getRevisitInfo(state.category, state.lastTouched);
        if (!revisit.isDue) return false;
      }

      return true;
    });
  }, [filters, progress]);

  const grouped = useMemo(() => {
    const bySection = new Map<string, Map<string, typeof PROBLEMS>>();
    for (const p of filtered) {
      if (!bySection.has(p.section)) bySection.set(p.section, new Map());
      const topics = bySection.get(p.section)!;
      if (!topics.has(p.topic)) topics.set(p.topic, []);
      topics.get(p.topic)!.push(p);
    }
    return bySection;
  }, [filtered]);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-catB">Pattern Log</p>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">Graph + DP Tracker</h1>
          <p className="mt-1 max-w-xl text-sm text-dim">
            Mark each problem A–D on how you solved it. Categories B/C/D come back due for
            revision on their own schedule — B in 30 days, C in 7, D in 2. A is done for good.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (confirmReset) {
              resetAll();
              setConfirmReset(false);
            } else {
              setConfirmReset(true);
              setTimeout(() => setConfirmReset(false), 3000);
            }
          }}
          className={`shrink-0 rounded-md border px-3 py-1.5 font-mono text-[11px] transition-colors ${
            confirmReset
              ? "border-catD text-catD"
              : "border-line text-dim hover:border-dim hover:text-ink"
          }`}
        >
          {confirmReset ? "click again to confirm" : "reset progress"}
        </button>
      </header>

      <div className="space-y-4">
        <StatsBar problems={PROBLEMS} progress={progress} />

        <Filters sections={SECTIONS} value={filters} onChange={setFilters} />

        {!hydrated ? (
          <p className="py-10 text-center text-sm text-dim">Loading your saved progress…</p>
        ) : filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-dim">
            Nothing matches these filters. Try widening them.
          </p>
        ) : (
          Array.from(grouped.entries()).map(([section, topics]) => {
            const sectionOpen = openSections[section] ?? true;
            const sectionProblems = Array.from(topics.values()).flat().length;
            const sectionSolved = Array.from(topics.values())
              .flat()
              .filter((p) => progress[p.id]?.solved).length;
            const sectionPercent = sectionProblems ? Math.round((sectionSolved / sectionProblems) * 100) : 0;

            return (
              <section key={section} className="space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    setOpenSections((prev) => ({ ...prev, [section]: !sectionOpen }))
                  }
                  className="flex w-full items-center gap-3 rounded-2xl border border-line bg-panel2 px-4 py-4 text-left shadow-sm shadow-black/5 text-white"
                  aria-expanded={sectionOpen}
                >
                  <span
                    className={`font-mono text-sm text-dim transition-transform ${
                      sectionOpen ? "rotate-90" : ""
                    }`}
                  >
                    ▸
                  </span>
                  <span
                    style={{
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "15px",
                    }}
                    >{section}</span>
                  <span className="ml-auto font-mono text-xs uppercase tracking-[0.2em] text-dim">
                    {sectionSolved}/{sectionProblems}
                  </span>
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-line">
                    <div className="h-full bg-catA transition-all" style={{ width: `${sectionPercent}%` }} />
                  </div>
                </button>

                {sectionOpen && (
                  <div className="space-y-3 pl-4">
                    {Array.from(topics.entries()).map(([topic, problems]) => (
                      <TopicGroup
                        key={topic}
                        topic={topic}
                        problems={problems}
                        progress={progress}
                        setCategory={setCategory}
                        toggleSolved={toggleSolved}
                        toggleHint={toggleHint}
                        setNotes={setNotes}
                        defaultOpen={problems.length <= 15}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })
        )}
      </div>

      <footer className="mt-10 border-t border-line pt-4 text-[11px] text-dim">
        Progress is saved locally in this browser only (no account, no server). LC/GFG buttons
        open a search for the problem name by default — see the README to hardcode exact links
        per problem in <code>lib/data.ts</code>.
      </footer>
    </main>
  );
}
