# Master Prompt: DSA Pattern Tracker (full-stack resume project)

Paste this whole document as context when starting a build session (Claude Code,
Cursor, etc.). It's self-contained — architecture, data model, feature specs,
design direction, and the seed data I already have are all in here.

---

## 1. Project summary

Build a full-stack web app that replaces Striver's A2Z DSA sheet (the
TakeUForward site) with a personal version that adds three things the
original sheet doesn't have:

1. A 4-category spaced-revision system (A/B/C/D) instead of a flat
   solved/unsolved checkbox.
2. Direct, exact navigation links to the LeetCode and GeeksforGeeks page for
   each problem (not a search page).
3. Analytics on top of solve history: a contribution heatmap, category/
   difficulty breakdown, streaks.

This is being built as a genuine resume project — a live, deployed,
full-stack app with auth and a database, not a local single-page tool. The
person building/using it is prepping for SDE interviews (DSA-heavy) and
wants this to be something they can link to and speak about in an
interview.

## 2. Tech stack (decided)

- **Next.js 14+ (App Router), TypeScript**
- **PostgreSQL + Prisma ORM**
- **NextAuth.js, GitHub OAuth provider** (no email/password flow needed)
- **Tailwind CSS**
- **Recharts** for the dashboard charts
- **cmdk** for the command palette
- **Deploy target:** Vercel (app) + Neon (Postgres) — both have free tiers
  sufficient for this scale. End goal is one live URL, not "clone and run."

## 3. The revision category system (exact spec)

This is the core mechanic — implement it precisely:

| Category | Meaning | Comes back due |
|---|---|---|
| A | Solved in under 10 minutes, no help | Never (skipped permanently) |
| B | Solved, but took real thinking | 30 days after last touched |
| C | Needed a hint / peeked at editorial | 7 days after last touched |
| D | Couldn't solve it | 2 days after last touched |

Rules:
- Setting a category on a problem also marks it `solved = true` (you had to
  attempt/solve it, with or without help, to categorize it).
- A separate `withHint` boolean toggle exists independently of category —
  used to flag "I peeked at the editorial" even on an A/B problem, so hint
  rate stays an honest, separate metric from category.
- Every time a problem's category changes, log a `SolveEvent` (see schema)
  — this is what powers the heatmap and trend charts later, so don't only
  store current state.
- "Due for revision" = `now >= lastTouched + revisitDays[category]`.
- A `notes` free-text field per problem (per user) for mistakes/approach —
  maps to the person's habit of writing "forgot path compression" style
  notes after solving.

## 4. Data model (Prisma schema draft)

```prisma
model User {
  id              String   @id @default(cuid())
  githubId        String   @unique
  username        String   @unique   // used in public profile URL
  name            String?
  image           String?
  profileIsPublic Boolean  @default(false)
  progress        ProgressEntry[]
  events          SolveEvent[]
  createdAt       DateTime @default(now())
}

model Problem {
  id            String   @id @default(cuid())
  section       String   // e.g. "Graph", "Dynamic Programming", "Arrays"
  topic         String   // e.g. "Shortest Path", "DP on Strings"
  name          String
  difficulty    String   // "Easy" | "Medium" | "Hard"
  leetcodeSlug  String?  // resolved via LeetCode API, nullable if not found
  gfgUrl        String?  // curated manually, nullable until filled in
  orderIndex    Int      // preserves sheet ordering
}

model ProgressEntry {
  id          String    @id @default(cuid())
  userId      String
  problemId   String
  category    String?   // "A" | "B" | "C" | "D" | null
  solved      Boolean   @default(false)
  withHint    Boolean   @default(false)
  notes       String?
  lastTouched DateTime?
  user        User      @relation(fields: [userId], references: [id])
  problem     Problem   @relation(fields: [problemId], references: [id])

  @@unique([userId, problemId])
}

model SolveEvent {
  id        String   @id @default(cuid())
  userId    String
  problemId String
  category  String?
  timestamp DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}
```

## 5. Pages and features

### `/` — Landing page
Public marketing/front-door page. Explains the 4-category system briefly,
shows a sample of the heatmap visual, has a "Sign in with GitHub" CTA. This
page exists specifically so there's a real first impression for a resume
link, not just a login wall.

### `/login`
GitHub OAuth via NextAuth. Redirects to `/tracker` on success.

### `/tracker` — Main sheet view
- All problems from the full A2Z sheet (474), grouped by section → topic,
  matching the structure in section 7 below.
- Each problem row: name, difficulty badge, solved checkbox, A/B/C/D
  category picker, hint toggle, notes (expandable), exact LeetCode button,
  exact GFG button, "revisit in Nd" / "revision due" indicator.
- Filters: search by name, filter by section, filter by category
  (including "unmarked"), "due for revision only" toggle, "unsolved only"
  toggle.
- Stats bar at top: overall solved/total, count per category, count due now.
- Cmd+K command palette (see below) available from anywhere on this page.

### Command palette (Cmd+K, global on `/tracker` and `/dashboard`)
Fuzzy-search across all 474 problem names, jump straight to that problem's
row (scroll + highlight). Built with `cmdk`.

### `/dashboard` — Analytics
- **Contribution heatmap** (GitHub-style): one cell per day, intensity =
  number of `SolveEvent`s that day. This is the signature visual — make it
  the hero element of this page.
- Category distribution (donut/pie: A/B/C/D counts).
- Difficulty distribution (Easy/Medium/Hard, solved vs total).
- Weekly trend line: problems solved per week over the last N weeks.
- Current streak (consecutive days with at least one `SolveEvent`).

### `/mock` — Mock interview mode
- Picks a random problem the user hasn't marked solved (optionally
  filterable by section/difficulty).
- Shows a countdown timer (e.g. 30/45/60 min, user-selectable).
- On finish, prompts the user to categorize it (A–D) same as normal flow —
  this logs a `SolveEvent` same as any other solve, so mock sessions show
  up in the heatmap too.

### `/u/[username]` — Public profile
- Opt-in via `profileIsPublic` toggle in settings.
- Shows: overall progress, category breakdown, heatmap. Does **not** show
  private notes.
- This is the link meant to go on a resume/portfolio.

## 6. Design direction

Aesthetic: **developer tool**, not SaaS-dashboard-template. Dark theme by
default. The person using this wants it to feel like something they'd keep
open next to LeetCode while working, not a marketing product.

- **Color:** dark slate background (~`#0F1115`), panel surfaces a shade up
  (~`#161920`/`#1D212B`), hairline borders (~`#272C38`), off-white text
  (~`#E7E9EE`), dim secondary text (~`#8B92A4`). Category colors used
  functionally (not decoratively): A = green, B = blue, C = amber, D = red.
- **Type:** a monospace face (e.g. JetBrains Mono) for data — problem
  names, stats, category labels, timestamps — paired with a clean sans
  (e.g. Inter) for prose/UI chrome. The monospace-for-data choice reinforces
  the "dev tool" feel and is a deliberate pairing, not the default.
- **Signature element:** the contribution heatmap on `/dashboard`. Make it
  the thing this app is remembered by.
- Keyboard focus must be visible everywhere; respect
  `prefers-reduced-motion`; responsive down to mobile width.

## 7. Full sheet structure (all 474 problems, section-level)

I already have exact problem-level detail (topic, name, difficulty) for
**Graph (53)** and **Dynamic Programming (55)** from a screenshot of the
sheet — reuse that data as-is when seeding those two sections (it was
already built out in a prior version of this project's `lib/data.ts`; regenerate the same rows here).

The remaining sections need their problem lists sourced (via web research
against the public TakeUForward A2Z sheet) before seeding. Here's the full
section breakdown with known counts, so nothing is missed:

| Section | Problem count |
|---|---|
| Learn the basics | 54 |
| Learn Important Sorting Techniques | 7 |
| Arrays (Easy → Medium → Hard) | 40 |
| Binary Search (1D, 2D, Search Space) | 32 |
| Strings (Basic and Medium) | 15 |
| LinkedList (Single, Double, Medium, Hard) | 31 |
| Recursion (PatternWise) | 25 |
| Bit Manipulation | 18 |
| Stack and Queues | 30 |
| Sliding Window & Two Pointer | 12 |
| Heaps | 17 |
| Greedy Algorithms | 15 |
| Binary Trees | 38 |
| Binary Search Trees | 16 |
| **Graphs** (already sourced) | 53 |
| **Dynamic Programming** (already sourced) | 55 |
| Tries | 7 |
| Strings (advanced) | 9 |
| **Total** | **474** |

## 8. Link resolution strategy

- **LeetCode:** resolve the exact problem URL programmatically via
  LeetCode's public GraphQL endpoint (`https://leetcode.com/graphql`),
  querying by title to get the problem's slug, then building
  `https://leetcode.com/problems/{slug}/`. Do this once at seed time (or
  lazily, caching the resolved slug back into the `leetcodeSlug` column) —
  not on every page load.
- **GFG:** no equivalent public search API exists, so exact links need to
  be curated by hand over time. Until curated, fall back to a GFG site
  search link for that problem name, but track which ones are still
  unresolved (e.g. `gfgUrl IS NULL`) so it's visible how much curation
  debt remains.
- Not every sheet problem exists on both platforms (some are GFG-only or
  LeetCode-only) — handle a missing link gracefully (hide that button
  rather than showing a broken/irrelevant one).

## 9. Build order

Ship something working at each stage rather than one large drop:

1. Prisma schema + GitHub OAuth + full 474-problem seed (with Graph/DP
   fully detailed, other sections sourced) → basic `/tracker` works,
   deployed to Vercel + Neon.
2. Command palette on `/tracker`.
3. `/dashboard` (heatmap + charts) — this is the visual centerpiece, worth
   real design effort.
4. `/u/[username]` public profile.
5. `/mock` interview mode.

## 10. Non-functional requirements

- Real deployment (Vercel + Neon), not just local dev instructions.
- Accessible: visible focus states, reduced-motion respected, usable
  keyboard-only.
- Mobile-responsive — this should be checkable from a phone, not just
  desktop.
- No secrets committed; GitHub OAuth client ID/secret and DB connection
  string via environment variables.

## 11. Open decisions for whoever builds this

- Exact revisit-day thresholds (30/7/2) are fixed by the person's own
  study system — don't change them without asking.
- Whether private notes should ever be exportable (e.g. JSON export) isn't
  decided yet — ask before building it.
- Company-tag filtering was floated as a stretch feature but isn't in
  scope for the initial build — confirm before adding.