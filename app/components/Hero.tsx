"use client";
import {useEffect, useState} from "react";
import Lanyard from "@/components/Lanyard";
import Ferrofluid from "@/components/Ferrofluid";
import Shuffle from "@/components/Shuffle";
import RotatingText from "@/components/RotatingText";
export default function Hero() {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroOffset, setHeroOffset] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Compute a dynamic bottom offset (client-only) so the text sits nicely above viewport bottom.
  useEffect(() => {
    const compute = () => {
      if (window.innerWidth >= 768) {
        setHeroOffset(null);
        return;
      }
      // prefer a minimum of 48px, otherwise 10-14% of viewport height
      const calc = Math.round(Math.max(48, window.innerHeight * 0.12));
      setHeroOffset(calc);
    };
    compute();
    let tid = 0 as any;
    const onResize = () => {
      clearTimeout(tid);
      tid = setTimeout(compute, 120);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(tid);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-black scroll-mt-36"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {ready && (
          <Ferrofluid
            dpr={isMobile ? 0.35 : 1}
            colors={["#4F46E5", "#06B6D4", "#E0F2FE"]}
            speed={isMobile ? 0.12 : 0.2}
            scale={isMobile ? 1.0 : 1.6}
            turbulence={isMobile ? 0.5 : 1}
            fluidity={isMobile ? 0.2 : 0.1}
            rimWidth={isMobile ? 0.3 : 0.2}
            sharpness={isMobile ? 2.0 : 3.6}
            shimmer={isMobile ? 0.4 : 1.1}
            glow={isMobile ? 0.6 : 1.6}
            flowDirection="down"
            opacity={1}
            mouseInteraction={!isMobile}
            mouseStrength={1}
            mouseRadius={0.35}
          />
        )}
      </div>
      {/* <div className="absolute inset-0 z-40">
  <SideRays
    speed={2.5}
    rayColor1="#EAB308"
    rayColor2="#96c8ff"
    intensity={2}
    spread={2}
    origin="top-right"
    tilt={0}
    saturation={1.5}
    blend={0.75}
    falloff={1.6}
    opacity={1}
  />
</div> */}

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className=" h-screen max-w-7xl px-4 sm:px-8 lg:px-16">
          <div className="grid h-full grid-cols-1 lg:grid-cols-[60%_40%] gap-4 sm:gap-6 lg:gap-0">

            {/* LEFT SIDE */}
              <div
                className="z-30 flex flex-col justify-end items-start pb-12 xs:pb-16 sm:pb-20 md:pb-24 pl-4 sm:pl-6 lg:pl-0 md:relative md:left-auto md:bottom-auto md:w-auto"
                style={
                  heroOffset === null
                    ? undefined
                    : {
                        position: 'absolute',
                        left: '1rem',
                        bottom: `${heroOffset}px`,
                        width: 'calc(100% - 2rem)',
                      }
                }
              >

<Shuffle 
 className="
  tracking-[-0.01em]
   mx-0!
   style={{ textAlign: 'left' }}
   text-4xl!
   xs:text-5xl!
   sm:text-6xl!
   md:text-[100px]!
   lg:text-[150px]!
   xl:text-[140px]!
  font-black
 text-white"
 
  text="Harsh"
  shuffleDirection="right"
  duration={0.35}
  animationMode="evenodd"
  shuffleTimes={1}
  ease="power3.out"
  stagger={0.03}
  threshold={0.1}
  triggerOnce={true}
  triggerOnHover
  respectReducedMotion={true}
  loop={false}
  loopDelay={0}
/>
 <div className="mt-1 sm:mt-0 leading-none"></div>
<Shuffle
 className="
  tracking-[-0.02em]
   mx-0!
   text-left!
   style={{ textAlign: 'left' }}
   xs:text-3xl!
   sm:text-5xl!
   md:text-[100px]!
   lg:text-[150px]!
   xl:text-[140px]!
  font-black
 text-teal-300"
  text="Shrivastava"
  shuffleDirection="right"
  duration={0.55}
  animationMode="evenodd"
  shuffleTimes={1}
  ease="power3.out"
  stagger={0.03}
  threshold={0.1}
  triggerOnce={true}
  triggerOnHover
  respectReducedMotion={true}
  loop={false}
  loopDelay={0}
/>

              {/* First Name
              <div className="leading-none">
                <GlitchText
                  speed={0.6}
                  enableShadows
                  enableOnHover={false}
                  className="
                    mx-0!
                    text-left!
                    text-6xl!
                    sm:text-7xl!
                    md:text-[150px]!
                    lg:text-[180px]!
                    xl:text-[170px]!
                    font-black
                    text-teal-300
                  "
                >
                  Harsh
                </GlitchText>
              </div>

              {/* Last Name */}
              {/* <div className="-mt-3 leading-none">
                <GlitchText
                  speed={0.8}
                  enableShadows={true}
                  enableOnHover={false}
                  className="
                    mx-0!
                    text-left!
                    text-6xl!
                    sm:text-7xl!
                    md:text-[150px]!
                    lg:text-[180px]!
                    xl:text-[170px]!
                    font-black
                    text-teal-300
                  "
                >
                  Shrivastava
                </GlitchText>
              </div>  */}
{/* data-aos="fade-right" data-aos-duration="800" */}
<div className="flex flex-wrap items-center gap-2 xs:gap-2.5 sm:gap-3 pt-3 xs:pt-4 text-base xs:text-lg sm:text-2xl font-bold md:text-4xl" data-aos="fade-right" data-aos-duration="600" data-aos-delay="800">  <span className="text-white whitespace-nowrap text-base xs:text-lg sm:text-2xl md:text-4xl">
    I'm a
  </span>

  <RotatingText
    texts={[
"ML Enthusiast",
"Frontend Pro",
"Problem Solver",
    ]}
    mainClassName="
    min-w-0
  xs:min-w-[160px]
  sm:min-w-[220px]
  px-2
  xs:px-3
  sm:px-4
  py-1
  xs:py-1.5
  sm:py-2
  rounded-lg
  xs:rounded-xl
  bg-teal-300
  text-black
  font-black
  overflow-hidden
  text-center
  shadow-[0_0_25px_rgba(45,212,191,0.35)]

    "
    staggerFrom="last"
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "-120%" }}
    staggerDuration={0.025}
    splitLevelClassName="overflow-hidden"
    transition={{
      type: "spring",
      damping: 30,
      stiffness: 400,
    }}
    rotationInterval={2200}
    splitBy="characters"
    auto
    loop
    data-aos="fade-right" data-aos-duration="800" data-aos-delay="600"
  />
</div>
              <div className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-gray-400" >
            

              <p className="" data-aos="fade-right" data-aos-duration="1000"  data-aos-delay="600">
                I build modern web applications, scalable software,
                and AI-powered solutions. Passionate about Next.js,
                React, Machine Learning, and creating high-performance
                user experiences.
              </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex justify-center items-center lg:h-full max-lg:py-6 max-lg:pb-10 lg:pl-5">
              <div className="w-full lg:h-200 lg:translate-x-56 ">
                {ready && <Lanyard position={[0, 2, 32]} fov={30} gravity={[0, -40, 0]} size={1.1} />}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-60 bg-linear-to-t from-black to-transparent z-10" />
    </section>
  );
}