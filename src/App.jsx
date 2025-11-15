import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // Get Kolkata time in 12-hour format without AM/PM
      let kolkataTime = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      });

      kolkataTime = kolkataTime.replace(/ AM| PM/gi, "");

      setTime(kolkataTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Optional: Request fullscreen on load for mobile
  const goFullscreen = () => {
    if (document.fullscreenEnabled) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log("Fullscreen failed:", err);
      });
    }
  };

  return (
    <div
      className="w-screen h-screen bg-black text-white flex items-center justify-center relative"
      style={{ overflow: "hidden" }}
      onClick={goFullscreen} // Tap anywhere to go fullscreen
    >
      <h1
        className="text-[#ffffffcc] rotate-90 md:rotate-0 text-[50vw] md:text-[25vw]"
        style={{
          fontWeight: 600,
          letterSpacing: "-0.5vw",
          transformOrigin: "center",
          lineHeight: "1",
        }}
      >
        {time}
      </h1>

      {/* Optional small fullscreen button */}
      <button
        onClick={goFullscreen}
        className="text-[#ffffff38] fixed top-5 right-5 md:top-10 md:right-10 hover:text-cyan-400 text-2xl"
        aria-label="Fullscreen"
      >
        ⬜
      </button>
    </div>
  );
}
