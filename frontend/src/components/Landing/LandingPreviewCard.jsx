const PREVIEW = {
  title: "Your next notes",
  label: "preview",
  topic: "Photosynthesis (Class 10)",
  output: [
    {
      text: "Definitions + step-by-step process",
      dotClass: "bg-violet-400",
    },
    {
      text: "Diagram-ready graph suggestions",
      dotClass: "bg-cyan-400",
    },
    {
      text: "PDF export with headings and formulas",
      dotClass: "bg-emerald-400",
    },
  ],
  stats: [
    { label: "Credits", value: "100" },
    { label: "Graphs", value: "Optional" },
    { label: "PDF", value: "Ready" },
  ],
};

export default function LandingPreviewCard() {
  return (
    <div className="relative">
      <div className="rounded-2xl bg-linear-to-b from-white/10 to-white/5 p-1 ring-1 ring-white/10">
        <div className="rounded-2xl bg-zinc-950/60 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">{PREVIEW.title}</div>
            <div className="text-xs text-zinc-400">{PREVIEW.label}</div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-xs text-zinc-400">Topic</div>
              <div className="mt-1 text-sm font-medium">{PREVIEW.topic}</div>
            </div>

            <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-xs text-zinc-400">Output</div>
              <ul className="mt-2 space-y-2 text-sm text-zinc-200">
                {PREVIEW.output.map((item) => (
                  <li key={item.text} className="flex items-start gap-2">
                    <span className={`mt-1 h-1.5 w-1.5 rounded-full ${item.dotClass}`} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {PREVIEW.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/5 p-3 text-center ring-1 ring-white/10">
                  <div className="text-xs text-zinc-400">{stat.label}</div>
                  <div className="mt-1 text-sm font-semibold">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
