"use client";

import Link from "next/link";
import Ferrofluid from "@/components/Ferrofluid";
import FuzzyText from "@/components/FuzzyText";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Ferrofluid
          colors={["#4F46E5", "#06B6D4", "#E0F2FE"]}
          speed={0.2}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={3.6}
          shimmer={1.1}
          glow={1.6}
          flowDirection="down"
          opacity={1}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.35}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center  px-6">
         <div className="text-[240px] font-black leading-none text-teal-300 md:text-[220px] pr-15">

        <FuzzyText 
  baseIntensity={0.2}
  hoverIntensity={0.5}
  enableHover
>
  404
</FuzzyText>

       </div>
          
        

        <div className="mt-4 text-2xl font-bold md:text-2xl">
           <FuzzyText fontSize={40}
  baseIntensity={0.2}
  hoverIntensity={0.5}
  enableHover
>
 Lost in the void
</FuzzyText>
          
        </div>

        <p className="mt-6 max-w-md text-gray-400">
          The page you're looking for doesn't exist,
          or maybe it escaped into another dimension.
        </p>

        <Link
          href="/"
          className="
            cursor-target
            mt-10
            rounded-xl
            border
            border-teal-300
            px-8
            py-4
            font-semibold
            text-teal-300
            transition-all
            duration-300
            hover:bg-teal-300
            hover:text-black
          "
        >
          Return Home
        </Link>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-60 w-full bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}