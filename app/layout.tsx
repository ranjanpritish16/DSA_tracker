import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DSA Pattern Tracker",
  description: "Master technical interviews with a focused DSA practice tracker and analytics hub.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-base text-ink">
        <header className="border-b border-line bg-panel">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-catB text-lg font-semibold text-white">
                {'</>'}
              </span>
              <div>
                <p className="text-sm font-semibold">DSA Pattern Tracker</p>
                <p className="text-[11px] uppercase tracking-[0.24em] text-dim">Engineer-first workspace</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-4 text-sm font-medium lg:flex">
              <Link href="/tracker" className="text-dim hover:text-ink">
                Problem Tracker
              </Link>
              <Link href="/dashboard" className="text-dim hover:text-ink">
                Dashboard
              </Link>
              <Link href="/mock" className="text-dim hover:text-ink">
                Mock Interviews
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-line bg-panel2 px-4 py-2 text-sm text-ink transition hover:border-dim hover:text-white"
              >
                Sign in
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
