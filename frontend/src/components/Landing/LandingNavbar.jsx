const APP_NAME = "AI Study Assistant";

export default function LandingNavbar({ onGetStarted }) {
  return (
    <header className="relative">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="AI Study Assistant" className="h-8 w-8" />
          <div className="leading-tight">
            <div className="text-sm font-semibold">{APP_NAME}</div>
            <div className="text-xs text-zinc-400">Notes. Graphs. PDFs.</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onGetStarted}
          className="rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:bg-violet-400"
        >
          Get started
        </button>
      </nav>
    </header>
  );
}
