"use client";

import { CATEGORY_META, Category } from "@/lib/types";

const ORDER: Exclude<Category, null>[] = ["A", "B", "C", "D"];

const RING: Record<Exclude<Category, null>, string> = {
  A: "border-catA text-catA bg-catA/10",
  B: "border-catB text-catB bg-catB/10",
  C: "border-catC text-catC bg-catC/10",
  D: "border-catD text-catD bg-catD/10",
};

export function CategoryPicker({
  value,
  onChange,
}: {
  value: Category;
  onChange: (c: Category) => void;
}) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Revision category">
      {ORDER.map((c) => {
        const active = value === c;
        return (
          <button
            key={c}
            type="button"
            title={`${CATEGORY_META[c].description} — ${CATEGORY_META[c].revisit}`}
            onClick={() => onChange(active ? null : c)}
            className={`h-7 w-7 shrink-0 rounded-md border text-xs font-mono font-semibold transition-colors ${
              active ? RING[c] : "border-line text-dim hover:border-dim hover:text-ink"
            }`}
            aria-pressed={active}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
