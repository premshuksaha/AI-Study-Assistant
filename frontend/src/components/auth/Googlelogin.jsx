import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

export default function Googlelogin({ onSuccess, onError, className = "" }) {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      onError?.("Google Client ID is missing. Add VITE_GOOGLE_CLIENT_ID in frontend/.env");
      return;
    }

    const initializeGoogleButton = () => {
      if (!window.google?.accounts?.id || !buttonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          try {
            const apiResponse = await axiosInstance.post(API_PATHS.AUTH.GOOGLE, {
              credential: response.credential,
            });
            const { token, user } = apiResponse.data;

            localStorage.setItem("token", token);
            updateUser(user);
            onSuccess?.();
            navigate("/home");
          } catch (err) {
            const message = err?.response?.data?.message || "Google authentication failed.";
            onError?.(message);
          }
        },
      });

      buttonRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "continue_with",
        width: 320,
      });
    };

    if (window.google?.accounts?.id) {
      initializeGoogleButton();
      return;
    }

    const scriptId = "google-identity-services";
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    script.addEventListener("load", initializeGoogleButton);

    return () => {
      script?.removeEventListener("load", initializeGoogleButton);
    };
  }, [navigate, onError, onSuccess, updateUser]);

  return (
    <div className={className}>
      <div ref={buttonRef} className="flex justify-center" />
    </div>
  );
}