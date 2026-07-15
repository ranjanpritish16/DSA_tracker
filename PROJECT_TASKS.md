# DSA Tracker — Project Checklist

This file captures the project roadmap and actionable tasks for finishing the DSA Tracker full-stack app.

High-level phases:

1. Project audit & quality checks
2. Backend: schema, auth, seeding, APIs
3. Frontend: tracker, dashboard, mock mode, cmdk
4. Link resolution & curation (LeetCode / GFG)
5. Deployment, tests, accessibility

Checklist (ordered):

- [ ] Audit repo and run linters/typechecks
- [ ] Add Prisma schema and DB migrations (Postgres + Prisma)
- [ ] Implement GitHub OAuth (NextAuth) and session handling
- [ ] Create seed script to import full 474 problems into DB
- [ ] Implement SolveEvent model + progress APIs
- [ ] Build `/tracker` sheet UI with filters, category picker, notes
- [ ] Add command palette (`cmdk`) for fuzzy navigation
- [ ] Build `/dashboard` — heatmap, charts, streaks
- [ ] Implement `/mock` interview mode
- [ ] Implement public profile `/u/[username]` (opt-in)
- [ ] Implement LeetCode slug resolver and caching script
- [ ] Add curated GFG links placeholders and curation workflow
- [ ] Accessibility, keyboard navigation, responsive fixes
- [ ] Vercel + Neon deployment config and environment variables
- [ ] Add tests and CI (lint, typecheck, build)

Notes:
- `lib/data.ts` already contains seeded data for Graph and Dynamic Programming.
- `questionlist.txt` contains the full sheet UI text; use as a reference for sourcing missing items.
- Revisit schedule is defined in `lib/types.ts` (`REVISIT_DAYS`).

Progress: use the repository TODO tracker to record status for each item.
