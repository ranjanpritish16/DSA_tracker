import Link from "next/link";

const FEATURE_CARDS = [
  {
    title: "Arrays",
    description: "Master indexing, sliding windows, and segment patterns.",
  },
  {
    title: "Graphs",
    description: "Track traversal, shortest paths, and connectivity patterns.",
  },
  {
    title: "Trees",
    description: "Build recursive intuition for DFS, BFS, and balanced structures.",
  },
  {
    title: "Dynamic Programming",
    description: "Use state compression, memoization, and recurrence mastery.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-base">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-catB/10 px-4 py-1 text-[11px] uppercase tracking-[0.3em] text-catB">
              DSA Pattern Tracker
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Master technical interviews with precision.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-dim sm:text-lg">
                Stop grinding aimlessly. Track patterns, visualize progress, and rehearse timed interview sessions with an engineer-first workspace built for serious problem solvers.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tracker"
                className="inline-flex items-center justify-center rounded-full bg-catB px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
              >
                Start Tracking Now
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-line bg-panel2 px-6 py-3 text-sm font-semibold text-ink transition hover:border-dim"
              >
                View Demo
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-dim">
              <span>Trusted by engineering teams globally</span>
              <span className="h-px flex-1 bg-line" />
              <span className="font-mono uppercase tracking-[0.3em] text-catB">Real-time insights already leveling up</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-panel p-8 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(78,143,240,0.15),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(63,178,127,0.12),_transparent_30%)]" />
            <div className="relative grid gap-4">
              <div className="flex items-center justify-between rounded-3xl border border-line bg-base/70 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-dim">Workspace summary</p>
                  <p className="mt-2 text-xl font-semibold text-ink">Pattern mastery in one place</p>
                </div>
                <div className="rounded-2xl bg-catB/10 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-catB">Live</div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-line bg-panel2 p-4">
                  <p className="text-sm font-medium text-dim">Problems tracked</p>
                  <p className="mt-3 text-3xl font-semibold text-ink">432</p>
                </div>
                <div className="rounded-3xl border border-line bg-panel2 p-4">
                  <p className="text-sm font-medium text-dim">Weekly streak</p>
                  <p className="mt-3 text-3xl font-semibold text-ink">18 Days</p>
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-panel2 p-4">
                <div className="mb-3 flex items-center justify-between text-sm text-dim">
                  <span>Projected IQ uplift</span>
                  <span className="text-catB">+45</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-line">
                  <div className="h-full w-4/5 bg-catB" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-4 lg:grid-cols-4">
          {FEATURE_CARDS.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-line bg-panel p-6">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-dim">{feature.title}</p>
              <p className="mt-3 text-sm leading-6 text-dim">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-[2rem] border border-line bg-panel p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-catB">Insight into every byte.</p>
              <h2 className="mt-4 text-3xl font-semibold text-ink">Analyze progress and sharpen every revision cycle.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-dim">
                Our analytics dashboard transforms your raw submissions into actionable insight, helping you identify weak patterns, track streaks, and rise above benchmark performance.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-line bg-base/70 p-4">
                <p className="text-sm text-dim">Performance tracking across sessions</p>
                <p className="mt-2 text-lg font-semibold text-ink">Dedicated charts, goals, and impact metrics for every milestone.</p>
              </div>
              <div className="rounded-3xl border border-line bg-base/70 p-4">
                <p className="text-sm text-dim">Secure cloud sync</p>
                <p className="mt-2 text-lg font-semibold text-ink">Keep your progress safe and accessible from every device.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full border border-line bg-panel2 px-5 py-3 text-sm font-semibold text-ink transition hover:border-dim">
              View Analytics Demo
            </button>
          </div>
        </section>

        <section className="mt-16 rounded-[2rem] border border-line bg-panel p-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-dim">Ready to level up your engineering career?</p>
          <h2 className="mt-4 text-3xl font-semibold text-ink">Join thousands of developers using DSA Pattern Tracker.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-dim">
            Sign in with GitHub to start your journey and unlock world-class interview preparation tools.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-catB px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Sign in with GitHub
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
