# Pattern Log — DSA Tracker

A small Next.js app for tracking Striver's A2Z sheet with a 4-category revision
system (the sheet itself doesn't support this) and one-click links to
LeetCode / GeeksforGeeks for each problem.

Currently seeded with the **Graph** and **DP** sections (97 problems) from your
sheet screenshot, since that's this week's focus. Extending it to the rest of
the sheet is a data-entry job, not a code job — see "Adding more problems"
below.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. That's it — no database, no accounts.
Progress is stored in your browser's `localStorage`, under the key
`dsa-tracker:progress:v1`. It stays on your machine; nothing is sent anywhere.

To deploy it somewhere you can hit from your phone too (e.g. Vercel's free
tier): `npx vercel` from this folder, or push it to a GitHub repo and import
it on vercel.com. Since there's no backend, any static/Node host works.

## How the categories work

Same system you designed in the planning conversation:

| Category | Meaning                        | Comes back due |
|----------|---------------------------------|-----------------|
| A        | Solved in <10 min, no help      | Never — skipped |
| B        | Solved after real thinking      | 30 days later   |
| C        | Needed a hint                   | 7 days later    |
| D        | Couldn't solve it               | 2 days later    |

Clicking a category button both tags the problem **and** marks it solved
(since you had to solve it, with or without help, to categorize it). The
"hint" toggle is separate — use it to flag that you peeked at the editorial
even on a problem you'd still call Category A/B, so your hint-rate stat stays
honest.

The countdown ("revisit in 7d" / "revision due") is calculated from
`lastTouched`, which updates every time you change that problem's state — so
re-marking a problem resets its clock, which is what you want when you
actually revisit and resolve it.

Filter by **Due for revision** in the toolbar to pull up exactly what's owed
today — that's your daily revision queue.

## Links

Each problem gets a LeetCode and a GFG button. Most problems on the sheet
don't have a stable public URL I can verify without checking each one by
hand, so by default both buttons open a **search** for the problem name on
that site — one click still gets you to the right page in practically every
case.

If you want an exact link locked in for a specific problem (skips the search
step), open `lib/data.ts` and add `leetcodeUrl` / `gfgUrl` to that row's
object, e.g.:

```ts
{
  id: "...",
  section: "Graph",
  topic: "Shortest Path",
  name: "Dijkstra's Algorithm",
  difficulty: "Hard",
  leetcodeUrl: "https://leetcode.com/problems/network-delay-time/", // example
},
```

(Rows are currently built from plain `[topic, name, difficulty]` tuples for
brevity — for a one-off override, add the `leetcodeUrl`/`gfgUrl` fields to
the generated object in `buildSection`, or convert that one row to an object
literal.)

## Adding more problems (rest of the A2Z sheet)

`lib/data.ts` has two arrays, `GRAPH` and `DP`, each a list of
`[topic, name, difficulty]` rows. To add another section (Arrays, Strings,
Trees, etc.):

1. Add a new `Row[]` array, e.g. `const ARRAYS: Row[] = [...]`.
2. Add `...buildSection("Arrays", ARRAYS)` to the `PROBLEMS` export.

No other code changes needed — filters, stats, and the tracker UI all read
from `PROBLEMS` directly.

## Notes / mistakes field

Each problem has a small notes field (the "note" button on its row) for
jotting things like "forgot path compression" — this maps to the
`Mistakes` line from your daily-review habit, just attached to the specific
problem instead of a separate notebook.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind. No backend, no external
dependencies beyond React/Next — intentionally minimal so it's easy to read
and modify yourself.
