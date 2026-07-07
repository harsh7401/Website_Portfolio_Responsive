'use client';
import { useRef, useState, useEffect } from "react";
import Ferrofluid from "@/components/Ferrofluid";
import LogoLoop from "@/components/LogoLoop";
import { FaJava } from "react-icons/fa";

const images = [
  "/react.png",
  "/node.png",
  "/js.png",
  "/css.png",
  "/redux.png",
  "/ts.png",
  "/tailwind.png",
];


import {
  SiHtml5,
  SiCss,
  SiSass,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiSolid,
  SiReactrouter,
  SiRedux,
  SiTailwindcss,
  SiMui,
  SiFramer,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,//   SiFlask,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiDocker,
//   SiAmazon,
  SiPostman,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
} from "react-icons/si";

const skillCategories = [
  {
    title: "Languages",
    items: [
      { icon: <SiHtml5 />, label: "HTML" },
      { icon: <SiCss />, label: "CSS" },
      { icon: <FaJava />, label: "Java" },
      { icon: <SiJavascript />, label: "Javascript" },
      { icon: <SiTypescript />, label: "Typescript" },
      { icon: <SiPython />, label: "Python" },
    ],
  },
  {
    title: "Libraries and Frameworks",
    items: [
      { icon: <SiReact />, label: "Reactjs" },
      { icon: <SiNextdotjs />, label: "Nextjs" },
      { icon: <SiSolid />, label: "Solidjs" },
      { icon: <SiReactrouter />, label: "React Router Dom" },
      { icon: <SiRedux />, label: "Redux" },
      { icon: <SiTailwindcss />, label: "Tailwindcss" },
    //   { icon: <SiMui />, label: "MUI" },
      { icon: <SiFramer />, label: "Framer motion" },
      { icon: <SiVite />, label: "Vite" },
    ],
  },
  {
    title: "Backend and Databases",
    items: [
      { icon: <SiNodedotjs />, label: "Nodejs" },
      { icon: <SiExpress />, label: "Express" },
      { icon: <SiSocketdotio />, label: "Socket.io" },
    { icon: <SiMongodb />, label: "MongoDB" },
      { icon: <SiPostgresql />, label: "Postgress" },
      { icon: <SiPrisma />, label: "Prisma" },
    //   { icon: <SiFlask />, label: "Flask" },
    ],
  },
   {
    title: "AI/ML",
    items: [
      { icon: <SiPytorch />, label: "PyTorch" },
      { icon: <SiTensorflow />, label: "TensorFlow" },
      { icon: <SiScikitlearn />, label: "Scikit-learn" },
      { icon: <SiNumpy />, label: "NumPy" },
      { icon: <SiPandas />, label: "Pandas" },
    ],
  },
  {
    title: "Tools and Technologies",
    items: [
      { icon: <SiGit />, label: "Git" },
      // { icon: <SiDocker />, label: "Docker" },
        // { icon: <SiAws />, label: "AWS" },
      { icon: <SiPostman />, label: "Postman" },
    ],
  },
  
];

const loopLogos = skillCategories.flatMap((cat) =>
  cat.items.map((item) => ({ node: item.icon, title: item.label }))
);

export function Skills() {
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
      id="skills"
      ref={sectionRef}
      className="relative flex h-screen min-h-screen flex-col overflow-hidden bg-black px-4 xs:px-5 sm:px-6 pb-5 pt-20 xs:pt-24 sm:pt-24 md:pt-24 text-white lg:px-16"
    >
      <div className="absolute inset-0 z-0">
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

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col">
        <h2 className="mb-4 shrink-0 text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-white"data-aos="fade-right" data-aos-duration="500">
          Skills
        </h2>

       <div className="flex-1 overflow-y-auto">
  <div className="grid gap-4 xs:gap-5 sm:gap-6 lg:grid-cols-3">

    {/* COLUMN 1 */}
    <div className="flex flex-col gap-6">

      {/* Languages */}
      <div>
        <h3
  className="mb-2 text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-400"
  data-aos="zoom-in"
  data-aos-duration="400"
>
  <div></div>
  {skillCategories[0].title}
</h3>

       <div className="flex flex-col gap-1 xs:gap-1.5 sm:gap-1.5">
  {skillCategories[0].items.map((it, index) => (
    <div
      key={it.label}
      className="
        cursor-target
        flex
        items-center
        gap-1.5
        xs:gap-2
        rounded-md
        border
        border-neutral-700/80
        bg-neutral-800/50
        px-1
        xs:px-1.5
        py-1
        text-gray-100
      "
      data-aos="flip-up"
      data-aos-duration="400"
      data-aos-delay={index * 20}
    >
      <div className="text-sm xs:text-base text-teal-200 shrink-0">
        {it.icon}
      </div>

      <div className="text-xs xs:text-sm font-medium truncate">
        {it.label}
      </div>
    </div>
  ))}
</div>
      </div>

      {/* Libraries */}
      <div>
  <h3 className="mb-2 text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-400 " data-aos="zoom-in" data-aos-duration="400" data-aos-delay="200">
    {skillCategories[1].title}
  </h3>

  <div className="flex flex-col gap-1 xs:gap-1.5 sm:gap-1.5">
    {skillCategories[1].items.map((it, index) => (
      <div
        key={it.label}
        className="cursor-target flex items-center gap-1.5 xs:gap-2 rounded-md border border-neutral-700/80 bg-neutral-800/50 px-1 xs:px-1.5 py-1 text-gray-100"
        data-aos="flip-up"
        data-aos-duration="400"
        data-aos-delay={200 + index * 100}
      >
        <div className="text-sm xs:text-base text-teal-200 shrink-0">
          {it.icon}
        </div>

        <div className="text-xs xs:text-sm font-medium truncate">
          {it.label}
        </div>
      </div>
    ))}
  </div>
</div>

    </div>

    {/* COLUMN 2 */}
    <div className="flex flex-col gap-6">

     {/* Backend */}
<div>
  <h3 className="mb-2 text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-400"  data-aos="zoom-in" data-aos-duration="400" data-aos-delay="1200">
    {skillCategories[2].title}
  </h3>

  <div className="flex flex-col gap-1 xs:gap-1.5 sm:gap-1.5">
    {skillCategories[2].items.map((it, index) => (
      <div
        key={it.label}
        className="cursor-target flex items-center gap-1.5 xs:gap-2 rounded-md border border-neutral-700/80 bg-neutral-800/50 px-1 xs:px-1.5 py-1 text-gray-100"
        data-aos="flip-up"
        data-aos-duration="400"
        data-aos-delay={1400 + index * 100}
      >
        <div className="text-sm xs:text-base text-teal-200 shrink-0">
          {it.icon}
        </div>

        <div className="text-xs xs:text-sm font-medium truncate">
          {it.label}
        </div>
      </div>
    ))}
  </div>
</div>

     {/* AI / ML */}
<div>
  <h3 className="mb-2 text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-400" data-aos="zoom-in" data-aos-duration="400" data-aos-delay="1700">
    {skillCategories[3].title}
  </h3>

  <div className="flex flex-col gap-1 xs:gap-1.5 sm:gap-1.5">
    {skillCategories[3].items.map((it, index) => (
      <div
        key={it.label}
        className="cursor-target flex items-center gap-1.5 xs:gap-2 rounded-md border border-neutral-700/80 bg-neutral-800/50 px-1 xs:px-1.5 py-1 text-gray-100"
        data-aos="flip-up"
        data-aos-duration="400"
        data-aos-delay={2000 + index * 100}
      >
        <div className="text-sm xs:text-base text-teal-200 shrink-0">
          {it.icon}
        </div>

        <div className="text-xs xs:text-sm font-medium truncate">
          {it.label}
        </div>
      </div>
    ))}
  </div>
</div>
     
     {/* Tools */}
<div>
  <h3 className="mb-2 text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-400 "data-aos="zoom-in" data-aos-duration="400" data-aos-delay="1700">
    {skillCategories[4].title}
  </h3>

  <div className="flex flex-col gap-1 xs:gap-1.5 sm:gap-1.5">
    {skillCategories[4].items.map((it, index) => (
      <div
        key={it.label}
        className="cursor-target flex items-center gap-1.5 xs:gap-2 rounded-md border border-neutral-700/80 bg-neutral-800/50 px-1 xs:px-1.5 py-1 text-gray-100"
        data-aos="flip-up"
        data-aos-duration="400"
        data-aos-delay={2000 + index * 100}
      >
        <div className="text-sm xs:text-base text-teal-200 shrink-0">
          {it.icon}
        </div>

        <div className="text-xs xs:text-sm font-medium truncate">
          {it.label}
        </div>
      </div>
    ))}
  </div>
</div>
    </div>

    {/* COLUMN 3 */}
    <div className="flex h-full items-center justify-center">

     {/* <StickerPeel
  imageSrc="/TrailLogo.png"
  width={200}
  rotate={0}
  peelBackHoverPct={30}
  peelBackActivePct={40}
  shadowIntensity={0.5}
  lightingIntensity={0.1}
  initialPosition={{ x: -100, y: 100 }}
  peelDirection={0}
/> */}

{/* <CircularText
  text="THESE*ARE*MY*SKILLS*"
  onHover="speedUp"
  spinDuration={20}
  className="custom-class"
/> */}
 <img className="w-100 l-100" data-aos="zoom-in" data-aos-duration="1000"
src="/chipgif3.svg" alt="" />

{/* <img className="w-100 l-100"
src="/techgif3.svg" alt="" /> */}

{/* <OrbitImages
  images={images}
  shape="ellipse"
  radiusX={2140}
  radiusY={440}
  rotation={-8}
  duration={30}
  itemSize={380}
  responsive={true}
  radius={160}
  direction="normal"
  fill
  showPath
  paused={false}
/> */}


    </div>
    

  </div>
</div>
<div className="mt-3 shrink-0 border-t border-white/10 pt-4"> <LogoLoop logos={loopLogos} speed={80} direction="left" logoHeight={32} gap={32} hoverSpeed={0} scaleOnHover fadeOut fadeOutColor="#000000" ariaLabel="Technology partners" /> </div> </div>

    </section>
  );
}
