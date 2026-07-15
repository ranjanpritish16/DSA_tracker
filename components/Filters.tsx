"use client";

import { Category } from "@/lib/types";

export interface FilterState {
  query: string;
  section: string; // "All" or a section name
  category: Category | "Any" | "Unmarked";
  dueOnly: boolean;
  unsolvedOnly: boolean;
}

export function Filters({
  sections,
  value,
  onChange,
}: {
  sections: string[];
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const set = (patch: Partial<FilterState>) => onChange({ ...value, ...patch });

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-line bg-panel p-3">
      <input
        type="text"
        value={value.query}
        onChange={(e) => set({ query: e.target.value })}
        placeholder="Search a problem…"
        className="min-w-[180px] flex-1 rounded-md border border-line bg-panel2 px-3 py-1.5 text-sm text-ink placeholder:text-dim/60 focus:border-catB"
      />

      <select
        value={value.section}
        onChange={(e) => set({ section: e.target.value })}
        className="rounded-md border border-line bg-panel2 px-2 py-1.5 text-sm text-ink"
      >
        <option value="All">All sections</option>
        {sections.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={value.category ?? "Any"}
        onChange={(e) => set({ category: e.target.value as FilterState["category"] })}
        className="rounded-md border border-line bg-panel2 px-2 py-1.5 text-sm text-ink"
      >
        <option value="Any">Any category</option>
        <option value="Unmarked">Unmarked</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
        <option value="C">Category C</option>
        <option value="D">Category D</option>
      </select>

      <label className="flex items-center gap-1.5 text-sm text-dim">
        <input
          type="checkbox"
          checked={value.dueOnly}
          onChange={(e) => set({ dueOnly: e.target.checked })}
          className="accent-catD"
        />
        Due for revision
      </label>

      <label className="flex items-center gap-1.5 text-sm text-dim">
        <input
          type="checkbox"
          checked={value.unsolvedOnly}
          onChange={(e) => set({ unsolvedOnly: e.target.checked })}
          className="accent-catB"
        />
        Unsolved only
      </label>
    </div>
  );
}
