import Link from "next/link";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Problem Tracker", href: "/tracker" },
  { label: "Mock Interviews", href: "/mock", active: true },
  { label: "Public Profile", href: "/u/alex_rivera" },
];

export default function MockPage() {
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
            <div className="rounded-3xl border border-line bg-panel p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-catB">Workspace</p>
                  <h1 className="mt-3 text-2xl font-semibold text-ink">Mock Interview Session</h1>
                  <p className="mt-2 text-sm text-dim">Practice timed interview problems with a focused checklist and weekly performance metrics.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-3xl bg-panel2 px-4 py-3 text-sm text-ink">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-dim">Goal</span>
                    <p className="mt-1 text-lg font-semibold">45:00</p>
                  </div>
                  <button className="rounded-2xl bg-catB px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500">
                    Start Session
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
              <div className="space-y-6">
                <div className="rounded-3xl border border-line bg-panel p-6">
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-3xl bg-panel2 px-3 py-1 text-xs uppercase tracking-[0.2em] text-dim">
                        Trees
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold text-ink">Validate Binary Search Tree</h2>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-panel2 px-3 py-1 text-xs uppercase tracking-[0.2em] text-catC">
                        DSA-482
                      </div>
                    </div>
                    <button className="rounded-2xl border border-line bg-panel2 px-4 py-3 text-sm font-semibold text-ink transition hover:border-dim">
                      Next Random
                    </button>
                  </div>

                  <div className="space-y-4 rounded-3xl border border-line bg-panel2 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-dim">Description</p>
                    <p className="mt-2 text-sm text-dim">Given the root of a binary tree, determine if it is a valid binary search tree (BST).</p>
                  </div>

                  <div className="space-y-4 rounded-3xl border border-line bg-panel2 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-dim">Examples</p>
                    <div className="rounded-2xl bg-base/80 p-4 text-sm text-dim">
                      <p>
                        <span className="font-mono text-sm text-catB">Input:</span> root = [2,1,3]
                      </p>
                      <p className="mt-2">
                        <span className="font-mono text-sm text-catB">Output:</span> true
                      </p>
                      <p className="mt-2 text-sm text-dim italic">
                        The root node&apos;s value is 2, with 1 on the left and 3 on the right. Both satisfy BST properties.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-3xl border border-line bg-panel2 p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-dim">Constraints</p>
                    <ul className="mt-3 space-y-2 text-sm text-dim">
                      <li>• The number of nodes in the tree is in the range [1, 10^4].</li>
                      <li>• -2^31 ≤ Node.val ≤ 2^31 - 1</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-sm text-dim">
                    <span>Mastery in this pattern:</span>
                    <span className="font-semibold text-ink">78%</span>
                  </div>
                </div>
              </div>

              <aside className="space-y-4">
                <div className="rounded-3xl border border-line bg-panel p-5">
                  <p className="text-sm font-semibold text-ink">Interview Checklist</p>
                  <div className="mt-4 space-y-3 text-sm text-dim">
                    {[
                      { label: "Understanding", status: "Done" },
                      { label: "Approach Design", status: "In progress" },
                      { label: "Implementation", status: "Pending" },
                      { label: "Complexity Analysis", status: "Pending" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-2xl border border-line bg-panel2 px-4 py-3">
                        <span>{item.label}</span>
                        <span className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${
                          item.status === "Done"
                            ? "bg-catA/10 text-catA"
                            : item.status === "In progress"
                            ? "bg-catC/10 text-catC"
                            : "bg-panel2 text-dim"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-line bg-panel p-5">
                  <p className="text-sm font-semibold text-ink">Weekly Performance</p>
                  <div className="mt-4 rounded-3xl bg-panel2 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-dim">Solving Consistency</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
                      <div className="h-full w-4/5 bg-catB" />
                    </div>
                    <p className="mt-3 text-3xl font-semibold text-ink">85%</p>
                    <div className="mt-2 flex gap-3 text-sm text-dim">
                      <div>
                        <p className="font-semibold text-ink">12</p>
                        <p>solved</p>
                      </div>
                      <div>
                        <p className="font-semibold text-ink">03</p>
                        <p>avg tries</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-line bg-panel p-5">
                  <p className="text-sm font-semibold text-ink">Hints & Support</p>
                  <div className="mt-4 space-y-3 text-sm text-dim">
                    <div className="rounded-3xl border border-line bg-panel2 px-4 py-3">
                      <p className="font-semibold text-ink">Hint 1: Base Case</p>
                    </div>
                    <div className="rounded-3xl border border-line bg-panel2 px-4 py-3">
                      <p className="font-semibold text-ink">Hint 2: Recursive Bounds</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-line bg-panel p-5">
                  <p className="text-sm font-semibold text-ink">Pattern Masterclass</p>
                  <p className="mt-4 text-sm text-dim">Deepen your BST intuition with guided review and concept notes.</p>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
