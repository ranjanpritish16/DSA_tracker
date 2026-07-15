import Link from "next/link";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Problem Tracker", href: "/tracker" },
  { label: "Mock Interviews", href: "/mock" },
  { label: "Public Profile", href: "/u/alex_rivera" },
];

const STAT_CARDS = [
  { label: "Problems Solved", value: "232", accent: "+16% vs last mo" },
  { label: "Daily Streak", value: "18 Days", accent: "Personal best" },
  { label: "Success Rate", value: "78.5%", accent: "-2% vs last mo" },
  { label: "Study Time", value: "142.5 hrs", accent: "+12 hrs this week" },
];

const ACHIEVEMENTS = [
  { title: "Binary Search Specialist", detail: "Solved 10 hard Binary Search problems." },
  { title: "Consistency King", detail: "Maintained a 14-day solving streak." },
  { title: "Recursion Master", detail: "Completed the entire Dynamic Programming module." },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-base">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden rounded-3xl border border-line bg-panel p-5 lg:block">
            <div className="mb-8 flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-catB text-lg font-semibold text-white">
                {'</>'}
              </div>
              <div>
                <p className="font-semibold text-ink">DSA Pattern</p>
                <p className="text-xs uppercase tracking-[0.24em] text-dim">Workspace</p>
              </div>
            </div>
            <nav className="space-y-2">
              {SIDEBAR_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    item.active ? "bg-catB/10 text-catB" : "text-dim hover:bg-panel2 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <section className="space-y-6">
            <div className="rounded-3xl border border-line bg-panel p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-catB">Analytics Hub</p>
                  <h1 className="mt-3 text-2xl font-semibold text-ink">Visualize your path to technical mastery.</h1>
                  <p className="mt-2 text-sm text-dim">
                    Track daily consistency, problem complexity, and pattern proficiency through real-time engineering metrics.
                  </p>
                </div>
                <button className="rounded-2xl bg-catB px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500">
                  Resume Session
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {STAT_CARDS.map((card) => (
                <div key={card.label} className="rounded-3xl border border-line bg-panel p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-dim">{card.label}</p>
                  <p className="mt-4 text-3xl font-semibold text-ink">{card.value}</p>
                  <p className="mt-2 text-sm text-dim">{card.accent}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
              <div className="rounded-3xl border border-line bg-panel p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-catB">Consistency Map</p>
                    <p className="mt-2 text-sm text-dim">Year-to-date problem solving activity</p>
                  </div>
                  <span className="rounded-full bg-panel2 px-3 py-1 text-xs uppercase tracking-[0.2em] text-dim">Less → More</span>
                </div>
                <div className="mt-6 grid gap-[6px] bg-panel2 p-4">
                  {Array.from({ length: 5 }).map((_, row) => (
                    <div key={row} className="flex gap-[6px]">
                      {Array.from({ length: 24 }).map((_, col) => (
                        <span
                          key={col}
                          className={`h-3 w-3 rounded-sm ${Math.random() > 0.7 ? "bg-catB" : "bg-line"}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-line bg-panel p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.24em] text-catB">Difficulty Breakdown</p>
                      <p className="mt-2 text-sm text-dim">Global rank and difficulty mix.</p>
                    </div>
                    <span className="rounded-full bg-catB/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-catB">Top 2.4%</span>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-ink">Easy</span>
                      <span className="text-sm text-dim">124 / 150</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-line">
                      <div className="h-full w-3/4 bg-catA" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-ink">Medium</span>
                      <span className="text-sm text-dim">86 / 200</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-line">
                      <div className="h-full w-1/2 bg-catC" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-ink">Hard</span>
                      <span className="text-sm text-dim">22 / 100</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-line">
                      <div className="h-full w-1/4 bg-catD" />
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-line bg-panel p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.24em] text-catB">Pattern Mastery</p>
                      <p className="mt-2 text-sm text-dim">Track the categories you've mastered.</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    {[
                      { label: "Arrays", value: "Mastered" },
                      { label: "Graphs", value: "Mastered" },
                      { label: "Trees", value: "Mastered" },
                      { label: "Dynamic P", value: "Mastered" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-3xl border border-line bg-panel2 p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.label}</span>
                          <span className="text-xs uppercase tracking-[0.2em] text-dim">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-line bg-panel p-6">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-catB">Recent Achievements</p>
                <div className="mt-5 space-y-4">
                  {ACHIEVEMENTS.map((item) => (
                    <div key={item.title} className="rounded-3xl border border-line bg-panel2 p-4">
                      <p className="font-semibold text-ink">{item.title}</p>
                      <p className="mt-1 text-sm text-dim">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-panel p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-catB">Smart Recommendations</p>
                    <p className="mt-2 text-sm text-dim">Focus on your current priority.</p>
                  </div>
                  <span className="rounded-full bg-catC/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-catC">Medium Priority</span>
                </div>
                <div className="mt-6 space-y-4 text-sm text-dim">
                  <p>Based on your recent activity, your performance in Graph traversal has dipped. We recommend tackling 3 medium-level Graph problems this week.</p>
                  <p className="rounded-3xl border border-line bg-panel2 p-4">Review cycle: Spaced Repetition — It’s time for a quick review to reinforce memory.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
