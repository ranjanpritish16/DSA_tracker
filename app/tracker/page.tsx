import Link from "next/link";
import Tracker from "@/components/Tracker";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Problem Tracker", href: "/tracker", active: true },
  { label: "Mock Interviews", href: "/mock" },
  { label: "Public Profile", href: "/u/alex_rivera" },
];

export default function TrackerPage() {
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
                  <h1 className="mt-3 text-2xl font-semibold text-ink">Problem Tracker</h1>
                  <p className="mt-2 max-w-2xl text-sm text-dim">
                    Systematically master patterns and maintain your revision streak.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative w-full sm:w-[320px]">
                    <input
                      type="text"
                      placeholder="Quick find problem..."
                      className="w-full rounded-2xl border border-line bg-panel2 px-4 py-3 text-sm text-ink placeholder:text-dim focus:border-catB focus:outline-none"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-dim">🔍</span>
                  </div>
                  <button className="rounded-2xl bg-catB px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500">
                    Add Manual
                  </button>
                </div>
              </div>
            </div>

            <Tracker />
          </section>
        </div>
      </div>
    </main>
  );
}
