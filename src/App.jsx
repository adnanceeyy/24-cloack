import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // Get Kolkata time in 12-hour without AM/PM
      let kolkataTime = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      });

      // Remove AM/PM
      kolkataTime = kolkataTime.replace(/ AM| PM/gi, "");

      setTime(kolkataTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-screen h-screen bg-black text-white flex items-center justify-center"
      style={{
        overflow: "hidden",
      }}
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
      <button
  onClick={() => document.documentElement.requestFullscreen()}
  className="text-[#ffffff38] fixed top-5 right-5 hover:text-cyan-400"
>
  .
</button>
    </div>
  );
}
