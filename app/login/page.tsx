import GithubSignInButton from "@/components/GithubSignInButton";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(78,143,240,0.18),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(63,178,127,0.15),_transparent_18%),#0f1115] text-ink">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full rounded-[2rem] border border-line bg-panel p-10 shadow-2xl sm:p-14">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-panel2 text-2xl text-catB">
              🔒
            </div>
            <p className="text-sm uppercase tracking-[0.3em] text-catB">DSA Pattern Tracker</p>
            <h1 className="text-3xl font-semibold text-ink">Welcome Back</h1>
            <p className="text-xs uppercase tracking-[0.3em] text-dim">AUTH_REQUIRED_V1.0.4</p>
          </div>

          <div className="mt-10 space-y-4">
            <GithubSignInButton />

            <div className="rounded-3xl border border-line bg-panel2 p-4 text-center text-xs uppercase tracking-[0.2em] text-dim">
              Secured access
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-line bg-panel2 p-4 text-sm text-dim">
                <p className="font-medium text-ink">encrypted</p>
              </div>
              <div className="rounded-3xl border border-line bg-panel2 p-4 text-sm text-dim">
                <p className="font-medium text-ink">real-time</p>
              </div>
              <div className="rounded-3xl border border-line bg-panel2 p-4 text-sm text-dim">
                <p className="font-medium text-ink">multi-region</p>
              </div>
              <div className="rounded-3xl border border-line bg-panel2 p-4 text-sm text-dim">
                <p className="font-medium text-ink">open-source</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex w-full max-w-2xl items-center justify-between rounded-3xl border border-line bg-panel2 px-5 py-4 text-[11px] text-dim">
          <div>
            <p>System ID: DSA_TRACKER_PRO</p>
            <p className="mt-1">LOC: US-EAST-1</p>
          </div>
          <div className="text-right">
            <p>Status: Operational</p>
            <p className="mt-1">v2.4.0</p>
          </div>
        </div>
      </div>
    </main>
  );
}
