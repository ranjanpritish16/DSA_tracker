export type Difficulty = "Easy" | "Medium" | "Hard";

export type Category = "A" | "B" | "C" | "D" | null;

export interface Problem {
  id: string;
  section: string;
  topic: string;
  name: string;
  difficulty: Difficulty;
  /** Optional hand-verified links. If absent, the UI falls back to a search link. */
  leetcodeUrl?: string;
  gfgUrl?: string;
}

export interface ProblemState {
  category: Category;
  solved: boolean;
  withHint: boolean;
  notes: string;
  lastTouched: string | null; // ISO date
}

export const CATEGORY_META: Record<
  Exclude<Category, null>,
  { label: string; revisit: string; color: string; description: string }
> = {
  A: {
    label: "A",
    revisit: "Skip forever",
    color: "catA",
    description: "Solved in under 10 min, no help.",
  },
  B: {
    label: "B",
    revisit: "Revisit in 30 days",
    color: "catB",
    description: "Solved after real thinking.",
  },
  C: {
    label: "C",
    revisit: "Revisit in 7 days",
    color: "catC",
    description: "Needed a hint to get there.",
  },
  D: {
    label: "D",
    revisit: "Revisit in 2 days",
    color: "catD",
    description: "Couldn't solve it.",
  },
};

export const REVISIT_DAYS: Record<Exclude<Category, null>, number> = {
  A: Infinity,
  B: 30,
  C: 7,
  D: 2,
};
