import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useUserAuth } from "../hooks/useUserAuth";
import Loader from "../components/Loader";

export default function Home() {
  const { isLoading } = useUserAuth();
  const { user,clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
  };

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-zinc-950 text-zinc-100">
        <div className="mx-auto min-h-dvh max-w-5xl px-4 py-10">
          <Loader centered text="Loading your profile..." className="min-h-dvh" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-semibold">Home</h2>
        {user ? (
          <div className="mt-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
            <p className="text-sm text-zinc-300">Signed in as</p>
            <p className="mt-1 text-lg font-medium text-zinc-100">{user.name || "User"}</p>
            <p className="text-sm text-zinc-400">{user.email}</p>
            <p className="mt-2 text-sm font-semibold text-emerald-400">Credits : {user.credits}</p>
            <pre className="mt-4 max-h-60 overflow-auto rounded-md bg-white/5 p-3 text-sm text-zinc-200">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        ) : null}
        <p className="mt-2 text-zinc-300">
          Hook this page up to your notes generator flow after authentication.

          <button
            onClick={handleLogout}
            className="ml-4 rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-400"
          >
            Logout
          </button>
        </p>
      </div>
    </div>
  );
}
