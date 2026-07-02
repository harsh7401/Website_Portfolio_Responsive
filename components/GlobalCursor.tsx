"use client";

import TargetCursor from "@/components/TargetCursor";

export default function GlobalCursor() {
  return (
    <TargetCursor
      spinDuration={2}
      hideDefaultCursor
      parallaxOn
      hoverDuration={0.2}
    />
  );
}