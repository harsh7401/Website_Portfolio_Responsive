"use client";

import { motion } from "framer-motion";
import TimelineNode from "./TimelineNode";
import BorderGlow from "./BorderGlow";

interface EducationTimelineItemProps {
  index: number;
  title: string;
  institute: string;
  duration: string;
  location: string;
}

export default function EducationTimelineItem({
  index,
  title,
  institute,
  duration,
  location,
}: EducationTimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isEven ? -60 : 60,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.15,
      }}
      className="relative lg:ml-20"
    >
      {/* Futuristic Timeline Node */}
      <div className="absolute -left-19.5 top-1 hidden lg:block">
        <TimelineNode />
      </div>

      {/* Card */}
      <BorderGlow
  edgeSensitivity={30}
  glowColor="40 80 80"
  backgroundColor="#120F17"
  borderRadius={28}
  glowRadius={40}
  glowIntensity={1}
  coneSpread={25}
  animated={false}
  colors={['#c084fc', '#f472b6', '#38bdf8']}
>
      <motion.div
        whileHover={{
          y: -5,
          scale: 1.02,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="
          group
          relative
          overflow-hidden
          rounded-2xl
          xs:rounded-2.5xl
          sm:rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-3
          xs:p-4
          sm:p-5
          backdrop-blur-md
          transition-all
          duration-300
          cursor-target
        "
      >
        {/* Hover Glow */}
        <div
          className="
            absolute
            inset-0
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        >
          <div
            className="
              absolute
              -left-20
              top-1/2
              h-40
              w-40
              -translate-y-1/2
              rounded-full
              bg-cyan-500/10
              blur-3xl
            "
          />
        </div>

        {/* Title */}
        <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white md:text-xl">
          {title}
        </h3>

        {/* Institute */}
        <h4 className="mt-2 text-sm xs:text-base sm:text-lg font-semibold text-white md:text-xl">
          @{institute}
        </h4>

        {/* Duration */}
        <p className="mt-2 text-xs xs:text-xs sm:text-sm uppercase tracking-[0.2em] xs:tracking-[0.25em] text-gray-400">
          {duration} • {location}
        </p>

        
        {/* Bottom Accent Line */}
        {/* <motion.div
          className="
            absolute
            bottom-0
            left-0
            h-[2px]
            bg-teal-300
          "
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
        /> */}
      </motion.div>
      </BorderGlow>
    </motion.div>
    
  );
}