import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useUserAuth } from "../hooks/useUserAuth";
import Loader from "../components/Loader";
import Navbar from "../components/Home/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const { isLoading } = useUserAuth();
  const { user,clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="relative min-h-dvh overflow-hidden bg-zinc-950 text-zinc-100">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-36 left-1/4 h-80 w-80 rounded-full bg-linear-to-br from-indigo-500/20 to-sky-400/10 blur-3xl" />
          <div className="absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-linear-to-br from-cyan-400/20 to-emerald-400/10 blur-3xl" />
        </div>
        <div className="relative z-10">
          <Navbar onLogout={handleLogout} isLoading={isLoading} />
        </div>
        <div className="relative z-10 mx-auto min-h-dvh max-w-5xl px-4 py-10">
          <Loader centered text="Loading your profile..." className="min-h-dvh" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-36 left-1/4 h-80 w-80 rounded-full bg-linear-to-br from-indigo-500/20 to-sky-400/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-linear-to-br from-cyan-400/20 to-emerald-400/10 blur-3xl" />
      </div>
      <div className="relative z-10">
        <Navbar onLogout={handleLogout} isLoading={isLoading} />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Welcome back, {user.name || 'User'}!</h1>
      </div>
    </div>
  );
}
