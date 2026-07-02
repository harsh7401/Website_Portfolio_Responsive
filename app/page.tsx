"use client";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { useEffect, useState } from "react";
import { Loader } from "./components/Loader";
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 5500);

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
