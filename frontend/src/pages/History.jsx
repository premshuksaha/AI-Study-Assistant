import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useUserAuth } from "../hooks/useUserAuth";
import Loader from "../components/Loader";
import Navbar from "../components/Home/Navbar";
import { LuArrowLeft} from 'react-icons/lu';

export default function History() {
  const navigate = useNavigate();
  const { isLoading } = useUserAuth();
  const { user, clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  if (isLoading || !user) {
    return (
      <div className="relative min-h-dvh overflow-hidden bg-zinc-950 text-zinc-100">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-linear-to-br from-fuchsia-500/15 to-sky-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-linear-to-br from-cyan-500/15 to-emerald-500/10 blur-3xl" />
        </div>
        <div className="relative z-10">
          <Navbar onLogout={handleLogout} isLoading={isLoading} />
        </div>
        <div className="relative z-10 mx-auto min-h-dvh max-w-5xl px-4 py-10">
          <Loader centered text="Loading your history..." className="min-h-dvh" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-linear-to-br from-fuchsia-500/15 to-sky-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-linear-to-br from-cyan-500/15 to-emerald-500/10 blur-3xl" />
      </div>
      <div className="relative z-10">
        <Navbar onLogout={handleLogout} isLoading={isLoading} />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8">
          <button
            onClick={() => navigate("/home")}
            className="group mb-4 inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-linear-to-r from-sky-500/20 to-cyan-400/20 px-5 py-2.5 text-sm font-semibold text-sky-100 backdrop-blur-md shadow-lg shadow-sky-900/25 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200/50 hover:from-sky-500/30 hover:to-cyan-400/30 hover:text-white hover:shadow-sky-700/30 active:translate-y-0"
          >
            <LuArrowLeft className="text-base transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold mb-2">History</h1>
          <p className="text-zinc-400">View your previous notes and study sessions</p>
        </div>

        {/* Empty State */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-12 text-center">
          <div className="mb-4 text-4xl">📚</div>
          <h2 className="text-xl font-semibold mb-2">No history yet</h2>
          <p className="text-zinc-400 mb-6">Start creating notes to see your history here</p>
        </div>

        {/* Placeholder for future history items */}
        <div className="mt-8 space-y-4">
          {/* History items will be populated here */}
        </div>
      </div>
    </div>
  );
}
