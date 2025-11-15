import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Load local audio files from /public
  const tickSound = new Audio("/assets/audio/aaa.mp3");
  const minuteSound = new Audio("/assets/audio/aaa.mp3");

  tickSound.volume = 0.4;
  minuteSound.volume = 0.8;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      let kolkataTime = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      });

      // Remove AM / PM
      kolkataTime = kolkataTime.replace(/ AM| PM/gi, "");
      setTime(kolkataTime);

      // Play tick sound every second
      tickSound.currentTime = 0;
      tickSound.play();

      // Play minute change sound (when seconds === 0)
      if (now.getSeconds() === 0) {
        minuteSound.currentTime = 0;
        minuteSound.play();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // PWA install handler
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
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative overflow-hidden">

      {/* Fullscreen Button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-5 right-5 bg-[#ffffff10] text-black px-2 py-1 rounded hover:bg-[#ffffff25] z-50"
      >
        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      </button>

      {/* Clock */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="text-white select-none rotate-90 md:rotate-0 text-[40vw] md:text-[20vw]"
          style={{
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

      {/* Install PWA button */}
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
