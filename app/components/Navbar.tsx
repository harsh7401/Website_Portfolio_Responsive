"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import GooeyNav from "@/components/GooeyNav";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (href: string) => {
    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex h-16 sm:h-18 lg:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side Logo */}
        <button
          onClick={() => handleNavigation("#home")}
          className="flex items-center gap-3 shrink-0"
          data-aos="zoom-in"
          data-aos-duration="800"
          aria-label="Go to home"
        >
          <Image
            src="/TrailLogo3.png"
            alt="Logo"
            width={100}
            height={100}
            className="h-11 w-11 sm:h-12 sm:w-12 lg:h-[120px] lg:w-[120px] cursor-pointer"
          />
        </button>

        {/* Desktop Navigation */}
        <div
          className="hidden lg:block"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <GooeyNav
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
          {items.map((item, index) => (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className="flex min-h-[48px] items-center rounded-xl px-4 py-3 text-left text-sm sm:text-base font-semibold text-white/90 transition hover:bg-white/10 hover:text-teal-300"
              data-aos="fade-down"
              data-aos-delay={index * 50}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}