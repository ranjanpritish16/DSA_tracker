"use client";

import { signIn } from "next-auth/react";

export default function GithubSignInButton() {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/tracker" })}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
    >
      <span>🐙</span>
      Continue with GitHub
    </button>
  );
}