import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import LandingFeatureGrid from "../components/Landing/LandingFeatureGrid";
import LandingFooter from "../components/Landing/LandingFooter";
import LandingHero from "../components/Landing/LandingHero";
import LandingNavbar from "../components/Landing/LandingNavbar";
import LandingPreviewCard from "../components/Landing/LandingPreviewCard";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import { UserContext } from "../context/UserContext";

export default function Landing() {
  const [authModal, setAuthModal] = useState(null); // "login" | "signup" | null
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    const hasToken = Boolean(token && token !== "undefined" && token !== "null");

    if (user || hasToken) {
      navigate("/home");
      return;
    }

    setAuthModal("login");
  };

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <Background />

      <LandingNavbar onGetStarted={handleGetStarted} />

      <main className="relative">
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-10 pt-10 md:grid-cols-2 md:pt-16">
          <LandingHero />
          <LandingPreviewCard />
        </section>

        <LandingFeatureGrid />
        <LandingFooter />
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

