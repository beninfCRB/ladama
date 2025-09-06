import { ShinyButton } from "@/components/magicui/shiny-button";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

export function ProtectedRoute() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  useEffect(() => {
    const timeOut = 3600000;
    let timer: number | undefined;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        setLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/login");
      }, timeOut);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "touchstart",
      "scroll",
    ];
    events.forEach((e) => window.addEventListener(e, resetTimer, true));

    resetTimer();
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer, true));
      clearTimeout(timer);
    };
  }, [navigate]);

  if (!loggedIn) {
    return (
      <h2 className="flex flex-col justify-center items-center h-screen gap-8 p-4 lg:p-0 text-center">
        <TypingAnimation className="text-4xl text-gray-500 text-wrap">
          Sesi Anda Habis, Mohon Login Kembali
        </TypingAnimation>
        <ShinyButton
          className="h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg text-2xl font-extrabold flex items-center justify-center"
          onClick={() => navigate("/auth/login")}
        >
          Log In
        </ShinyButton>
      </h2>
    );
  }

  return <Outlet />;
}
