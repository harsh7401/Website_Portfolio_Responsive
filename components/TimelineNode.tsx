"use client";

import { motion } from "framer-motion";

export default function TimelineNode() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover="hover"
      className="group relative flex h-12 w-12 items-center justify-center"
    >
      {/* Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          h-12
          w-12
          rounded-full
          bg-teal-400
          blur-xl
        "
      />

      {/* Ripple */}
      <motion.div
        animate={{
          scale: [1, 2],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="
          absolute
          h-8
          w-8
          rounded-full
          border
          border-cyan-400/50
        "
      />

      {/* Outer Ring */}
      <motion.div
        variants={{
          hover: {
            rotate: 720,
          },
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          rotate: {
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="
          absolute
          h-12
          w-12
          rounded-full
          border-[3px]
          border-transparent
          border-t-white
          border-r-teal-300
        "
      />

      {/* Inner Ring */}
      <motion.div
        variants={{
          hover: {
            rotate: -720,
          },
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="
          absolute
          h-8
          w-8
          rounded-full
          border-[2px]
          border-transparent
          border-b-teal-400
          border-l-white
        "
      />

      {/* Center Ring */}
      <div
        className="
          absolute
          h-5
          w-5
          rounded-full
          border
          border-teal-300/50
        "
      />

      {/* Core */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          h-3
          w-3
          rounded-full
          bg-teal-100
          shadow-[0_0_25px_rgba(34,211,238,0.9)]
        "
      />

      {/* Tiny Orbit Dot */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-12
          w-12
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-1.5
            w-1.5
            -translate-x-1/2
            rounded-full
            bg-white
            shadow-[0_0_10px_rgba(255,255,255,0.8)]
          "
        />
      </motion.div>
    </motion.div>
  );
}