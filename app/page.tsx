"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { Loader } from "./components/Loader";

const Hero = dynamic(() => import("./components/Hero"), { ssr: false });
const About = dynamic(() => import("./components/About"), { ssr: false });
const Skills = dynamic(() => import("./components/Skills").then(m => ({ default: m.Skills })), { ssr: false });
const Projects = dynamic(() => import("./components/Projects").then(m => ({ default: m.Projects })), { ssr: false });
const Education = dynamic(() => import("./components/Education").then(m => ({ default: m.Education })), { ssr: false });
const Contact = dynamic(() => import("./components/Contact").then(m => ({ default: m.Contact })), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const duration = window.innerWidth < 768 ? 800 : 2500;
  const timer = setTimeout(() => {
    setLoading(false);
  }, duration);

  return () => clearTimeout(timer);
}, []);

if (loading) {
  return <Loader />;
}
  return (
      <main>
        <Navbar />
        <Hero />
        <About/>
        <Skills/>
        <Projects/>
        <Education/>
        <Contact/>
      </main>
  );
}
