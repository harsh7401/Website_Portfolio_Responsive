"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { gsap } from "gsap";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;

  disableAnimations?: boolean;

  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;

  enableTilt?: boolean;

  clickEffect?: boolean;

  glowColor?: string;

  spotlightRadius?: number;

  particleCount?: number;
}

const DEFAULT_GLOW = "34, 211, 238"; // teal-400
const DEFAULT_RADIUS = 300;
const DEFAULT_PARTICLES = 12;

const createParticle = (
  x: number,
  y: number,
  glowColor: string
) => {
  const el = document.createElement("div");

  el.className = "magic-particle";

  el.style.cssText = `
    position:absolute;
    width:4px;
    height:4px;
    border-radius:9999px;
    left:${x}px;
    top:${y}px;
    background:rgba(${glowColor},1);
    box-shadow:0 0 8px rgba(${glowColor},0.8);
    pointer-events:none;
    z-index:50;
  `;

  return el;
};

export default function MagicCard({
  children,
  className = "",

  disableAnimations = false,

  enableSpotlight = true,
  enableBorderGlow = true,

  enableTilt = true,

  clickEffect = true,

  glowColor = DEFAULT_GLOW,

  spotlightRadius = DEFAULT_RADIUS,

  particleCount = DEFAULT_PARTICLES,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const spotlightRef = useRef<HTMLDivElement>(null);

  const particlesRef = useRef<HTMLDivElement[]>([]);

  const hoverRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    check();

    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  const animationsDisabled =
    disableAnimations || isMobile;

  const clearParticles = useCallback(() => {
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        opacity: 0,
        scale: 0,
        duration: 0.25,

        onComplete: () => {
          particle.remove();
        },
      });
    });

    particlesRef.current = [];
  }, []);

  const spawnParticles = useCallback(() => {
    if (!cardRef.current) return;

    const rect =
      cardRef.current.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle(
        Math.random() * rect.width,
        Math.random() * rect.height,
        glowColor
      );

      cardRef.current.appendChild(particle);

      particlesRef.current.push(particle);

      gsap.fromTo(
        particle,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          delay: i * 0.04,
          ease: "back.out(1.7)",
        }
      );

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 80,

        opacity: 0.25,

        repeat: -1,
        yoyo: true,

        duration:
          1.5 + Math.random(),

        ease: "power1.inOut",
      });
    }
  }, [particleCount, glowColor]);
    useEffect(() => {
    if (animationsDisabled || !cardRef.current) return;

    const card = cardRef.current;

    const handleMouseEnter = () => {
      hoverRef.current = true;

      spawnParticles();
    };

    const handleMouseLeave = () => {
      hoverRef.current = false;

      clearParticles();

      if (enableTilt) {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableSpotlight && spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      /* Spotlight */
      if (
        enableSpotlight &&
        spotlightRef.current
      ) {
        gsap.to(spotlightRef.current, {
          x,
          y,
          opacity: 1,
          duration: 0.15,
          ease: "power2.out",
        });
      }

      /* Subtle Tilt (6°) */
      if (enableTilt) {
        const rotateX =
          ((y - centerY) / centerY) * -6;

        const rotateY =
          ((x - centerX) / centerX) * 6;

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.12,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleClick = (
      e: MouseEvent
    ) => {
      if (!clickEffect) return;

      const rect =
        card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(
          x - rect.width,
          y
        ),
        Math.hypot(
          x,
          y - rect.height
        ),
        Math.hypot(
          x - rect.width,
          y - rect.height
        )
      );

      const ripple =
        document.createElement("div");

      ripple.style.cssText = `
        position:absolute;
        width:${maxDistance * 2}px;
        height:${maxDistance * 2}px;
        border-radius:9999px;
        left:${x - maxDistance}px;
        top:${y - maxDistance}px;
        pointer-events:none;
        z-index:60;
        background:
          radial-gradient(
            circle,
            rgba(${glowColor},0.35) 0%,
            rgba(${glowColor},0.15) 40%,
            transparent 70%
          );
      `;

      card.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",

          onComplete: () =>
            ripple.remove(),
        }
      );
    };

    card.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    card.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    card.addEventListener(
      "mousemove",
      handleMouseMove
    );

    card.addEventListener(
      "click",
      handleClick
    );

    return () => {
      card.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );

      card.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      card.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      card.removeEventListener(
        "click",
        handleClick
      );

      clearParticles();
    };
  }, [
    animationsDisabled,
    enableTilt,
    enableSpotlight,
    clickEffect,
    glowColor,
    spawnParticles,
    clearParticles,
  ]);

  return (
    <>
      <style>{`
        .magic-border::after {
          content:'';
          position:absolute;
          inset:0;
          padding:2px;
          border-radius:inherit;

          background:
            radial-gradient(
              ${spotlightRadius}px circle
              at var(--x,50%)
              var(--y,50%),
              rgba(${glowColor},0.9),
              rgba(${glowColor},0.4) 30%,
              transparent 70%
            );

          -webkit-mask:
            linear-gradient(#fff 0 0)
            content-box,
            linear-gradient(#fff 0 0);

          -webkit-mask-composite: xor;

          mask-composite: exclude;

          pointer-events:none;
        }
      `}</style>

      <div
        ref={cardRef}
        className={`
          relative
          overflow-hidden
          rounded-3xl
          ${enableBorderGlow ? "magic-border" : ""}
          ${className}
        `}
      >
        {enableSpotlight && (
          <div
            ref={spotlightRef}
            className="
              pointer-events-none
              absolute
              z-10
              h-[300px]
              w-[300px]
              rounded-full
              opacity-0
              blur-3xl
            "
            style={{
              background: `radial-gradient(circle, rgba(${glowColor},0.18) 0%, transparent 70%)`,
              transform:
                "translate(-50%, -50%)",
            }}
          />
        )}

        <div className="relative z-20">
          {children}
        </div>
      </div>
    </>
  );
}