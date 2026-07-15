import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata({ params }: { params: { username: string } }): Metadata {
  return { title: `${params.username} — Public Profile` };
}

export default function UserProfile({ params }: { params: { username: string } }) {
  const username = params.username;

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
              <Link
                href="/dashboard"
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-dim hover:bg-panel2 hover:text-ink"
              >
                Dashboard
              </Link>
              <Link
                href="/tracker"
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-dim hover:bg-panel2 hover:text-ink"
              >
                Problem Tracker
              </Link>
              <Link
                href="/mock"
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-dim hover:bg-panel2 hover:text-ink"
              >
                Mock Interviews
              </Link>
              <Link
                href={`/u/${username}`}
                className="block rounded-2xl bg-catB/10 px-4 py-3 text-sm font-medium text-catB"
              >
                Public Profile
              </Link>
            </nav>
          </aside>

          <section className="space-y-6">
            <div className="rounded-3xl border border-line bg-panel p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-catB">Public Profile</p>
                  <h1 className="mt-3 text-2xl font-semibold text-ink">Alex Rivera</h1>
                  <p className="mt-2 text-sm text-dim">Senior Software Engineer @ TechCorp. Passionate about systems design and competitive programming.</p>
                </div>
                <div className="flex gap-3">
                  <button className="rounded-2xl border border-line bg-panel2 px-4 py-3 text-sm font-semibold text-ink transition hover:border-dim">
                    Follow
                  </button>
                  <button className="rounded-2xl border border-line bg-panel2 px-4 py-3 text-sm font-semibold text-ink transition hover:border-dim">
                    Message
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-3xl border border-line bg-panel p-6">
                <div className="flex flex-col items-center gap-4 rounded-3xl border border-line bg-panel2 p-6 text-center">
                  <div className="h-40 w-40 overflow-hidden rounded-full border border-line bg-panel">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" alt="Alex Rivera" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-ink">Alex Rivera</p>
                    <p className="text-sm text-dim">@rivera_dev</p>
                  </div>
                  <div className="space-y-2 text-sm text-dim">
                    <p>Senior Software Engineer @ TechCorp</p>
                    <p>San Francisco, CA</p>
                    <p>Joined March 2023</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 rounded-3xl border border-line bg-panel2 p-5">
                  <div className="flex justify-between text-sm text-dim">
                    <span>Problems solved</span>
                    <span className="font-semibold text-ink">432</span>
                  </div>
                  <div className="flex justify-between text-sm text-dim">
                    <span>Current streak</span>
                    <span className="font-semibold text-ink">18 Days</span>
                  </div>
                  <div className="flex justify-between text-sm text-dim">
                    <span>Global rank</span>
                    <span className="font-semibold text-ink">#1,245</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-line bg-panel p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-catB">Contribution Activity</p>
                  <div className="mt-5 grid gap-2 rounded-3xl border border-line bg-panel2 p-4">
                    {Array.from({ length: 6 }).map((_, row) => (
                      <div key={row} className="flex gap-2">
                        {Array.from({ length: 20 }).map((_, col) => (
                          <span key={col} className={`h-4 w-4 rounded-sm ${Math.random() > 0.7 ? "bg-catB" : "bg-line"}`} />
                        ))}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-dim">1,432 contributions in the last year</p>
                </div>

                <div className="rounded-3xl border border-line bg-panel p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-catB">Category Mastery</p>
                  <div className="mt-5 space-y-4 text-sm text-dim">
                    {[
                      { name: "Arrays & Hashing", value: "84/120" },
                      { name: "Graphs & Network", value: "42/95" },
                      { name: "Binary Trees", value: "68/80" },
                      { name: "Dynamic Programming", value: "31/110" },
                    ].map((item) => (
                      <div key={item.name} className="rounded-3xl border border-line bg-panel2 p-4">
                        <div className="flex items-center justify-between">
                          <span>{item.name}</span>
                          <span className="text-sm text-dim">{item.value}</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
                          <div className="h-full w-[70%] bg-catB" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-line bg-panel p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-catB">Recent Solutions</p>
                  <div className="mt-5 space-y-3 text-sm">
                    {[
                      { title: "Network Delay Time", tag: "Graphs", age: "2h ago" },
                      { title: "Serialize and Deserialize Binary Tree", tag: "Trees", age: "5h ago" },
                      { title: "Two Sum", tag: "Arrays", age: "1d ago" },
                    ].map((item) => (
                      <div key={item.title} className="rounded-3xl border border-line bg-panel2 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-ink">{item.title}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-dim">{item.tag}</p>
                          </div>
                          <p className="text-xs text-dim">{item.age}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
