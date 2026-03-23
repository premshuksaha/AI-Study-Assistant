import { useMemo, useState } from "react";
import { FaBolt, FaChartLine, FaFilePdf, FaGraduationCap, FaShieldAlt } from "react-icons/fa";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { APP_NAME, LANDING_FEATURES } from "../utils/data";

export default function Landing() {
  const [authModal, setAuthModal] = useState(null); // "login" | "signup" | null

  const iconMap = useMemo(
    () => ({
      bolt: <FaBolt className="h-5 w-5" />,
      chart: <FaChartLine className="h-5 w-5" />,
      pdf: <FaFilePdf className="h-5 w-5" />,
      graduation: <FaGraduationCap className="h-5 w-5" />,
      shield: <FaShieldAlt className="h-5 w-5" />,
    }),
    [],
  );

  const features = useMemo(() => LANDING_FEATURES, []);

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-130 w-130-translate-x-1/2 rounded-full bg-violet-500/25 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-130 w-130 rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      <header className="relative">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <div className="flex items-center gap-3">
              <img
                src="/favicon.svg"
                alt="AI Study Assistant"
                className="h-8 w-8"
              />
            <div className="leading-tight">
              <div className="text-sm font-semibold">{APP_NAME}</div>
              <div className="text-xs text-zinc-400">Notes. Graphs. PDFs.</div>
            </div>
          </div>

          <div className="flex items-center">
            <button
                type="button"
                onClick={() => setAuthModal("login")}
                className="rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 hover:bg-violet-400"
              >
                Get started
              </button>
          </div>
        </nav>
      </header>

      <main className="relative">
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-10 pt-10 md:grid-cols-2 md:pt-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              100 credits free after signup
            </div>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Generate smart notes for your next class or exam.
            </h1>
            <p className="mt-4 max-w-prose text-pretty text-zinc-300">
              Enter your topic, class information, or exam type—get clean notes with optional graphs, then
              download the full result as a PDF.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-xs text-zinc-400">
              <span className="rounded-lg bg-white/5 px-2 py-1 ring-1 ring-white/10">Topic → Notes</span>
              <span className="rounded-lg bg-white/5 px-2 py-1 ring-1 ring-white/10">Class info → Notes</span>
              <span className="rounded-lg bg-white/5 px-2 py-1 ring-1 ring-white/10">Exam type → Notes</span>
              <span className="rounded-lg bg-white/5 px-2 py-1 ring-1 ring-white/10">PDF export</span>
            </div>
          </div>


          <div className="relative">
            <div className="rounded-2xl bg-linear-to-b from-white/10 to-white/5 p-1 ring-1 ring-white/10">
              <div className="rounded-2xl bg-zinc-950/60 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Your next notes</div>
                  <div className="text-xs text-zinc-400">preview</div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-zinc-400">Topic</div>
                    <div className="mt-1 text-sm font-medium">Photosynthesis (Class 10)</div>
                  </div>
                  <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-zinc-400">Output</div>
                    <ul className="mt-2 space-y-2 text-sm text-zinc-200">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-400" />
                        Definitions + step-by-step process
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        Diagram-ready graph suggestions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        PDF export with headings and formulas
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-white/5 p-3 text-center ring-1 ring-white/10">
                      <div className="text-xs text-zinc-400">Credits</div>
                      <div className="mt-1 text-sm font-semibold">100</div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3 text-center ring-1 ring-white/10">
                      <div className="text-xs text-zinc-400">Graphs</div>
                      <div className="mt-1 text-sm font-semibold">Optional</div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3 text-center ring-1 ring-white/10">
                      <div className="text-xs text-zinc-400">PDF</div>
                      <div className="mt-1 text-sm font-semibold">Ready</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 pt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur hover:bg-white/7"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    {iconMap[f.icon]}
                  </div>
                  <div className="text-sm font-semibold">{f.title}</div>
                </div>
                <p className="mt-3 text-sm text-zinc-300">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mx-auto max-w-6xl px-4 pb-10 text-xs text-zinc-500">
          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <div>© {new Date().getFullYear()} {APP_NAME}</div>
            <div className="text-zinc-600">Built for fast, focused studying.</div>
          </div>
        </footer>
      </main>

      <Login
        open={authModal === "login"}
        onClose={() => setAuthModal(null)}
        onSwitchToSignup={() => setAuthModal("signup")}
      />

      <Signup
        open={authModal === "signup"}
        onClose={() => setAuthModal(null)}
        onSwitchToLogin={() => setAuthModal("login")}
      />
    </div>
  );
}

