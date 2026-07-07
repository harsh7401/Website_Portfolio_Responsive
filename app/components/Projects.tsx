
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import Ferrofluid from "@/components/Ferrofluid";
import GlareHover from "@/components/GlareHover";

const projects = [
  {
    title: "Novus",
    description:
      "This app offers a suite of advanced features, including resize, crop, seamless background replacement.",
    image: "/project4.png",
    source: "https://github.com/harsh7401/Novus",
    live: "https://novussss.vercel.app/",
  },

  {
    title: "Divvy",
    description:
      "Track shared expenses, split bills effortlessly, and settle up quickly. Never worry about who owes who again.",
    image: "/project2.png",
    source: "https://github.com/harsh7401/Divvy",
    live: "https://divvy-omega.vercel.app/",
  },

  
  {
    title: "Xartech",
    description:
      "An Agency website which helps to design sleek platforms, software, and immersive journeys for scaling brands.",
    image: "/project1.png",
    source: "page",
    live: "https://www.xartech.io/",
  },
   {
    title: "Portfolio",
    description:
      "A personal portfolio website built with Next.js, showcasing projects, skills, and experience with a sleek design and smooth animations.",
    image: "/project6.png",
    source: "https://github.com/harsh7401/My-portfolio",
    live: "https://novussss.vercel.app/",
  },
  {
    title: "SpendWise",
    description:
      "An AI-powered financial management platform that helps you track, analyze, and optimize your spending with real-time insights.",
    image: "/project5.png",
    source: "https://github.com/harsh7401/_SpendWise_",
    live: "https://spend-wise-puce.vercel.app/",
  },
  

  {
    title: "Axiom Hire",
    description:
      "It presents opportunities for job seekers and employers to connect and grow.",
    image: "/project3.png",
    source: "https://github.com/harsh7401/Job_Portal",
    live: "https://axiomhire.vercel.app/",
  },

  

 
];

export function Projects() {
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
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
      id="projects"
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20 scroll-mt-12"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {inView && (
        <Ferrofluid
          dpr={isMobile ? 0.35 : 1}
          colors={["#4F46E5", "#06B6D4", "#E0F2FE"]}
          speed={isMobile ? 0.1 : 0.2}
          scale={isMobile ? 1.0 : 1.6}
          turbulence={isMobile ? 0.5 : 1}
          fluidity={isMobile ? 0.2 : 0.1}
          rimWidth={isMobile ? 0.25 : 0.2}
          sharpness={isMobile ? 2.0 : 3.6}
          shimmer={isMobile ? 0.4 : 1.1}
          glow={isMobile ? 0.6 : 1.6}
          flowDirection="down"
          opacity={1}
          mouseInteraction={!isMobile}
          mouseStrength={1}
          mouseRadius={0.35}
          paused={!inView}
        />
      )}
    </div>

      {/* Content */}
      <div className="relative z-10" >
        <h2 className="mb-4 sm:mb-6 text-3xl sm:text-5xl md:text-7xl font-bold text-white" data-aos="fade-right" data-aos-duration="800">
          Projects
        </h2>

        <p className="mb-8 sm:mb-10 text-sm sm:text-base text-teal-300"  data-aos="fade-right" data-aos-duration="1000">
          Here are some of the projects I'd like to share
        </p>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <GlareHover
              key={p.title}
              glareColor="#22d3ee"
              glareOpacity={0.18}
              glareAngle={-25}
              transitionDuration={900}
              className="rounded-lg"
      
            >
              <article className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-b from-neutral-900 to-neutral-800" data-aos="zoom-in" data-aos-duration="800">
                
                {/* Project Image */}
                <div className="h-40 sm:h-56 md:h-72 bg-neutral-900 relative">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Project Content */}
                <div className="p-3 sm:p-4 bg-neutral-900">
                  <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="text-xl sm:text-2xl text-teal-300"></div>

                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {p.title}
                    </h3>
                  </div>

                  <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-300">
                    {p.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300">
                      
                      <a
                        href={p.source}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-target flex items-center gap-1 sm:gap-2 hover:text-white"
                      >
                        <FaGithub size={16} className="sm:w-5 sm:h-5" />
                        <span className="hidden xs:inline">Source code</span>
                      </a>

                      {p.live !== "#" && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor-target flex items-center gap-1 sm:gap-2 hover:text-white"
                        >
                          <HiOutlineExternalLink size={16} className="sm:w-5 sm:h-5" />
                          <span className="hidden xs:inline">Live</span>
                        </a>
                      )}
                    </div>

                    <div className="text-xs sm:text-sm text-gray-500">
                      &nbsp;
                    </div>
                  </div>
                </div>
              </article>
            </GlareHover>
          ))}
        </div>
      </div>
    </section>
  );
}

