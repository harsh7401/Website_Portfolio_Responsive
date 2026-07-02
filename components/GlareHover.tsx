"use client";

import React, { useState } from "react";

interface GlareHoverProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  transitionDuration?: number;
}

const GlareHover: React.FC<GlareHoverProps> = ({
  children,
  className = "",
  glareColor = "#ffffff",
  glareOpacity = 0.25,
  glareAngle = -25,
  transitionDuration = 800,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const hexToRGBA = (hex: string, opacity: number) => {
    const cleanHex = hex.replace("#", "");

    if (cleanHex.length !== 6) {
      return `rgba(255,255,255,${opacity})`;
    }

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const glareRGBA = hexToRGBA(glareColor, glareOpacity);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {/* Sweep Glare */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute top-0 h-[250%] w-[40%]"
          style={{
            background: `linear-gradient(
              ${glareAngle}deg,
              transparent 0%,
              transparent 35%,
              ${glareRGBA} 50%,
              transparent 65%,
              transparent 100%
            )`,
            left: isHovered ? "130%" : "-70%",
            transition: `left ${transitionDuration}ms ease`,
            filter: "blur(12px)",
            transform: "translateY(-30%)",
          }}
        />
      </div>
    </div>
  );
};

export default GlareHover;