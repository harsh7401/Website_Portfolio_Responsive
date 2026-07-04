"use client";

import { useEffect, useState } from "react";
import BlurText from "@/components/BlurText";


export  function Loader() {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  setIsMobile(window.innerWidth < 768);
const interval = setInterval(() => {
setProgress((prev) => {
if (prev >= 100) {
clearInterval(interval);
return 100;
}

  return prev + 2;
});

}, 100);

return () => clearInterval(interval);
}, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[600px] w-[600px] sm:h-[800px] sm:w-[800px] rounded-full bg-teal-400/25 blur-[100px] sm:blur-[140px]" />
      </div>

      {isMobile ? (
        <>
          <h1 className="text-5xl font-black text-white">HARSH</h1>
          <h1 className="text-5xl font-black text-[#4FD1C5]">SHRIVASTAVA</h1>
          <p className="mt-3 text-gray-400">Full Stack Developer</p>
        </>
      ) : (
        <>
          <BlurText
            className="text-5xl sm:text-6xl lg:text-8xl font-black text-white"
            text="HARSH"
            delay={200}
            animateBy="words"
            direction="top"
          />
          <BlurText
            className="text-5xl sm:text-6xl lg:text-8xl font-black text-[#4FD1C5]"
            text="SHRIVASTAVA"
            delay={200}
            animateBy="words"
            direction="top"
          />
          <BlurText
            className="mt-3 text-gray-400"
            text="Full Stack Developer"
            delay={200}
            animateBy="words"
            direction="top"
          />
        </>
      )}

    <div className="relative mt-10 h-2 w-[85%] max-w-xs sm:w-80 overflow-hidden rounded-full bg-white/10">
  <div
    className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-teal-300/20 to-transparent"
  />

  <div
    className="relative h-full rounded-full bg-gradient-to-r from-teal-100 via-teal-200 to-teal-400 transition-all duration-200"
    style={{
      width: `${progress}%`,
      boxShadow:
        "0 0 15px rgba(45,212,191,0.8), 0 0 30px rgba(45,212,191,0.4)",
    }}
  />
</div>

      
      <p className="mt-4 text-2xl text-white">
        {progress}%
      </p>

    </div>
    
  );
}