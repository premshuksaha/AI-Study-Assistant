import { useEffect, useId, useMemo, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import GoogleGIcon from "./GoogleGIcon";
import { canSubmitLogin } from "../utils/helper";

export default function Login({ open, onClose, onSubmit, onGoogle, onSwitchToSignup }) {
  const titleId = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => canSubmitLogin({ email, password }),
    [email, password],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) return;
    setEmail("");
    setPassword("");
    setSubmitting(false);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        onClick={() => onClose?.()}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close"
      />

      <div className="relative w-full max-w-md rounded-2xl bg-zinc-950 p-5 ring-1 ring-white/15 shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div id={titleId} className="text-lg font-semibold text-zinc-100">
              Welcome back
            </div>
            <div className="mt-1 text-sm text-zinc-400">Log in to continue generating notes.</div>
          </div>
          <button
            type="button"
            onClick={() => onClose?.()}
            className="rounded-lg p-2 text-zinc-300 hover:bg-white/10"
            aria-label="Close login"
          >
            <FaXmark className="h-4 w-4" />
          </button>
        </div>

        <form
          className="mt-5 space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!canSubmit || submitting) return;
            try {
              setSubmitting(true);
              await onSubmit?.({ email: email.trim(), password });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <label className="block">
            <div className="mb-1 text-xs font-medium text-zinc-300">Email</div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-xl bg-white/5 px-3 py-2.5 text-sm text-zinc-100 ring-1 ring-white/10 outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-violet-500/70"
              required
            />
          </label>

          <label className="block">
            <div className="mb-1 text-xs font-medium text-zinc-300">Password</div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl bg-white/5 px-3 py-2.5 text-sm text-zinc-100 ring-1 ring-white/10 outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-violet-500/70"
              required
            />
          </label>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-1 w-full rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Log in"}
          </button>

          <div className="relative py-2">
            <div className="h-px w-full bg-white/10" />
            <div className="absolute inset-x-0 -top-2 mx-auto w-fit bg-zinc-950 px-3 text-xs text-zinc-500">
              or
            </div>
          </div>

          <button
            type="button"
            onClick={() => onGoogle?.()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
          >
            <GoogleGIcon className="h-4 w-4" />
            Continue with Google
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-zinc-400">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => onSwitchToSignup?.()}
            className="font-semibold text-zinc-100 hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
