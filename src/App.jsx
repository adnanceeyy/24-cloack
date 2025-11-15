import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let kolkataTime = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      });
      kolkataTime = kolkataTime.replace(/ AM| PM/gi, "");
      setTime(kolkataTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      // eslint-disable-next-line no-unused-vars
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="text-white select-none rotate-90 md:rotate-0"
          style={{
            fontSize: "clamp(10rem, 50vw, 30rem)",
            fontWeight: 600,
            letterSpacing: "-0.5vw",
            lineHeight: 1,
            transformOrigin: "center",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {time}
        </h1>
      </div>

      {showInstall && (
        <button
          onClick={handleInstall}
          className="absolute top-5 right-5 bg-white text-black px-3 py-1 rounded hover:bg-cyan-400 z-50"
        >
          Install App
        </button>
      )}
    </div>
  );
}
