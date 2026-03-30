import { FaBolt, FaChartLine, FaFilePdf, FaGraduationCap, FaShieldAlt } from "react-icons/fa";

const ICONS = {
  bolt: FaBolt,
  chart: FaChartLine,
  pdf: FaFilePdf,
  graduation: FaGraduationCap,
  shield: FaShieldAlt,
};

const FEATURES = [
  {
    title: "Generate notes in seconds",
    description:
      "Create structured notes by topic, class details, or exam type with a clean, study-ready format.",
    icon: "bolt",
  },
  {
    title: "Graphs when you need them",
    description:
      "Include graphs and visuals when required, so complex concepts become easier to understand.",
    icon: "chart",
  },
  {
    title: "Download as PDF",
    description: "Export the complete notes as a PDF so you can revise offline anytime.",
    icon: "pdf",
  },
  {
    title: "100 credits after signup",
    description:
      "Start creating right away with 100 free credits added to your account after signup.",
    icon: "graduation",
  },
  {
    title: "Secure sign-in",
    description:
      "Email/password or Google OAuth-choose what is easiest and keep your account protected.",
    icon: "shield",
  },
];

export default function LandingFeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = ICONS[feature.icon] ?? FaBolt;

          return (
            <div
              key={feature.title}
              className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur hover:bg-white/7"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold">{feature.title}</div>
              </div>
              <p className="mt-3 text-sm text-zinc-300">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
