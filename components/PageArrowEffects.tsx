"use client";

import React, { useEffect, useState } from "react";

export const PageArrowEffects: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = (e.target as HTMLElement)?.closest("[data-cursor-arrow], a, button, .cs, .step, h1, h2");
      if (target) {
        const customLabel = target.getAttribute("data-cursor-label");
        if (customLabel) {
          setHoverLabel(customLabel);
        } else if (target.tagName.toLowerCase() === "a" || target.tagName.toLowerCase() === "button") {
          setHoverLabel("↗");
        } else if (target.classList.contains("step")) {
          setHoverLabel("✦");
        } else {
          setHoverLabel("→");
        }
      } else {
        setHoverLabel(null);
      }
    };

    const handlePointerDown = () => setIsClicking(true);
    const handlePointerUp = () => setIsClicking(false);
    const handlePointerLeave = () => setIsVisible(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-transform duration-75 ease-out ${
        isClicking ? "scale-90" : "scale-100"
      }`}
      style={{
        left: `${mousePos.x + 14}px`,
        top: `${mousePos.y + 14}px`,
      }}
    >
      {hoverLabel && (
        <div className="bg-[#0A0A0A] text-white px-2.5 py-1 text-[11px] font-mono tracking-wider pixel-clip-sm shadow-lg flex items-center gap-1 animate-arrow-pulse">
          <span className="text-[#7c3aed] font-bold">▶</span>
          <span>{hoverLabel}</span>
        </div>
      )}
    </div>
  );
};
