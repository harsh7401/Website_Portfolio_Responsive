"use client";
import Ferrofluid from "@/components/Ferrofluid";
import TiltedCard from "@/components/TiltedCard";
import { useEffect, useRef, useState } from "react";
import VariableProximity from "@/components/VariableProximity";
import ScrambledText from "@/components/ScrambledText";

export default function About() {
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
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black scroll-mt-6"
    >
      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center">
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
      </div>

      <div className="pointer-events-none absolute top-0 left-0 z-10 h-32 sm:h-40 md:h-60 w-full bg-linear-to-b from-black to-transparent" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-4 xs:px-5 sm:px-6 py-16 sm:py-20 md:py-24 lg:px-10 xl:px-6 pointer-events-auto">
        <div className="grid w-full grid-cols-1 items-center gap-8 xs:gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT SIDE - PROFILE CARD */}
          <div
            className="order-1 flex justify-center lg:justify-start"
            data-aos="zoom-in"
            data-aos-duration="1200"
          >
            <div className="w-full max-w-[220px] xs:max-w-[250px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-none">
              <TiltedCard
                imageSrc="/harsh_profile5.jpg"
                altText="Harsh Shrivastava"
                captionText="Hey, I'm Harsh"
                containerHeight={isMobile ? "280px" : "540px"}
                containerWidth={isMobile ? "220px" : "380px"}
                imageHeight={isMobile ? "280px" : "540px"}
                imageWidth={isMobile ? "220px" : "380px"}
                rotateAmplitude={isMobile ? 0 : 12}
                scaleOnHover={isMobile ? 1 : 1.05}
                showMobileWarning={false}
                showTooltip={!isMobile}
                displayOverlayContent
              />
            </div>
          </div>

          {/* RIGHT SIDE - INFORMATION */}
          <div className="order-2 text-white text-center lg:text-left">
            <p
              className="mb-2 xs:mb-2.5 sm:mb-4 text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-teal-300 uppercase tracking-[0.2em] xs:tracking-[0.25em] sm:tracking-[0.3em]"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              About Me
            </p>

            <h2
              className="mb-4 xs:mb-5 sm:mb-8 text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight"
              data-aos="fade-left"
              data-aos-duration="1200"
            >
              Turning Ideas Into
              <span
                className="block text-teal-300"
                data-aos="fade-left"
                data-aos-duration="1400"
              >
                Digital Experiences
              </span>
            </h2>

            <div
              className="space-y-3 xs:space-y-4 sm:space-y-6 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300 max-w-2xl mx-auto lg:mx-0"
              data-aos="fade-left"
              data-aos-duration="1600"
            >
              <ScrambledText
                data-aos="fade-left"
                radius={isMobile ? 70 : 100}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
              >
                I build modern web applications, scalable software, and
                AI-powered solutions. Passionate about Next.js, React, Machine
                Learning, and creating high-performance user experiences.
              </ScrambledText>

              <ScrambledText
                radius={isMobile ? 70 : 100}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
                data-aos="fade-left"
              >
                My expertise includes JavaScript, TypeScript, React, Next.js,
                Tailwind CSS, Three.js, Node.js, databases, and creating
                interactive user experiences.
              </ScrambledText>

              <ScrambledText
                radius={isMobile ? 70 : 100}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
                data-aos="fade-left"
              >
                I enjoy solving real-world problems through technology,
                continuously learning new tools, and collaborating on projects
                that create meaningful impact.
              </ScrambledText>
            </div>

            <div className="mt-6 xs:mt-7 sm:mt-10 flex flex-col xs:flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-2.5 xs:gap-3 sm:gap-4">
              <button
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="rounded-full bg-teal-500 px-5 xs:px-6 py-2.5 xs:py-3 font-semibold text-black transition hover:bg-teal-400 cursor-target text-xs xs:text-sm sm:text-base"
                data-aos="zoom-in"
                data-aos-duration="1200"
              >
                View Projects
              </button>

              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="rounded-full border border-teal-300 px-5 xs:px-6 py-2.5 xs:py-3 font-semibold text-teal-300 transition hover:bg-teal-300 hover:text-black cursor-target text-xs xs:text-sm sm:text-base"
                data-aos="zoom-in"
                data-aos-duration="1200"
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-32 sm:h-40 md:h-60 w-full bg-linear-to-t from-black to-transparent" />
    </section>
  );
}