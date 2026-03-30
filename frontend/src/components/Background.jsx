export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -top-40 left-1/2 h-136 w-136 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute -bottom-44 left-1/4 h-112 w-md rounded-full bg-cyan-500/15 blur-3xl" />
    </div>
  );
}
