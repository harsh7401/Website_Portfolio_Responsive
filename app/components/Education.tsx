"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Ferrofluid from "@/components/Ferrofluid";
import EducationTimelineItem from "@/components/EducationTimelineItem";
import BorderGlow from "@/components/BorderGlow";

const educationData = [
  {
    title: "Bachelor of Technology in Computer Science and Engineering",
    institute: "KIET Group of Institutions",
    duration: "2022 – 2026",
    location: "Ghaziabad, India",
  },
  {
    title: "Senior Secondary Education",
    institute: "The Woods Heritage School",
    duration: "2019 – 2021",
    location: "Jhansi, India",
  },
  {
    title: "Secondary Education",
    institute: "Rani Laxmi Bai Public School",
    duration: "2017 – 2019",
    location: "Jhansi, India",
  },
];

export function Education() {
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { setInView(entry.isIntersecting); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:px-20 scroll-mt-6"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {inView && !isMobile && (
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
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-black to-cyan-950/20" />
    </div>

      <div className="relative z-10 mx-auto max-w-6xl px-2 xs:px-0">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <h2 className="text-center text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Education
          </h2>

          <p className="mx-auto mt-2 xs:mt-2.5 sm:mt-3 max-w-2xl px-2 text-center text-xs xs:text-xs sm:text-sm md:text-base leading-relaxed text-gray-400">
            The journey of learning, growth, and experiences that shaped my
            passion for technology.
          </p>
        </motion.div>

        <div className="relative mt-8 xs:mt-10 sm:mt-12 lg:mt-16">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              ease: "easeOut",
            }}
            style={{ originY: 0 }}
            className="
              absolute
              left-2
              xs:left-2.5
              sm:left-4
              top-0
              h-full
              w-[1.5px]
              rounded-full
              bg-gradient-to-b
              from-teal-400
              via-teal-500
              to-teal-700
              lg:left-6
              lg:w-[3px]
            "
          />

          {/* Timeline items wrapper */}
          <div className="space-y-4 xs:space-y-5 sm:space-y-8 lg:space-y-12 pl-6 xs:pl-7 sm:pl-10 lg:pl-0">
            {educationData.map((item, index) => (
              <EducationTimelineItem
                key={index}
                index={index}
                title={item.title}
                institute={item.institute}
                duration={item.duration}
                location={item.location}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.04),transparent_45%)] sm:bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.06),transparent_45%)] md:bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.08),transparent_45%)]" />
    </section>
  );
}