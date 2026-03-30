const APP_NAME = "AI Study Assistant";

export default function LandingFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 text-xs text-zinc-500">
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <div>(c) {new Date().getFullYear()} {APP_NAME}</div>
        <div className="text-zinc-600">Built for fast, focused studying.</div>
      </div>
    </footer>
  );
}
