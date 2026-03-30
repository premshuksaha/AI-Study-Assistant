const BADGE_TEXT = "100 credits free after signup";
const HERO_TITLE = "Generate smart notes for your next class or exam.";
const HERO_DESCRIPTION =
  "Enter your topic, class information, or exam type-get clean notes with optional graphs, then download the full result as a PDF.";
const FLOW_ITEMS = [
  "Topic -> Notes",
  "Class info -> Notes",
  "Exam type -> Notes",
  "PDF export",
];

export default function LandingHero() {
  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {BADGE_TEXT}
      </div>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
        {HERO_TITLE}
      </h1>
      <p className="mt-4 max-w-prose text-pretty text-zinc-300">{HERO_DESCRIPTION}</p>
      <div className="mt-7 flex flex-wrap gap-3 text-xs text-zinc-400">
        {FLOW_ITEMS.map((item) => (
          <span key={item} className="rounded-lg bg-white/5 px-2 py-1 ring-1 ring-white/10">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
