"use client";

import React, { useState, useEffect, useRef } from "react";

export const InteractiveSmileys: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 });
  const [happyJumping, setHappyJumping] = useState(false);
  const [sadShy, setSadShy] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; top: number }>>([]);
  const happyRef = useRef<HTMLDivElement>(null);
  const sadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    let frameId: number | null = null;
    const handlePointerMove = (e: PointerEvent) => {
      if (frameId !== null) return;
      frameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        frameId = null;
      });
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  // Idle Blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 120);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const triggerHappy = () => {
    if (happyJumping) return;
    setHappyJumping(true);
    setTimeout(() => setHappyJumping(false), 620);

    // Spawn 4 hearts in Purple & Orange
    const newHearts = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      left: 38 + Math.random() * 52,
      top: 6,
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
    }, 1000);
  };

  const getOffset = (ref: React.RefObject<HTMLDivElement | null>, isShy: boolean) => {
    if (!ref.current || mousePos.x < 0) return { x: 0, y: 0 };
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mousePos.x - cx;
    const dy = mousePos.y - cy;
    const d = Math.hypot(dx, dy) || 1;

    if (isShy) {
      return { x: (-dx / d) * 7, y: (-dy / d) * 7 + 2.5 };
    }
    const m = Math.min(1, d / 420) * 5.5;
    return { x: (dx / d) * m, y: (dy / d) * m };
  };

  const happyOffset = getOffset(happyRef, false);
  const sadOffset = getOffset(sadRef, sadShy);

  return (
    <div className="two grid grid-cols-1 md:grid-cols-2 gap-8 my-10 max-w-none">
      {/* Happy Smiley (Green with Purple hearts) */}
      <div className="c relative text-center" ref={happyRef}>
        <div className="relative inline-block">
          <svg
            className={`smiley w-32 h-32 mx-auto mb-4 cursor-pointer transition-transform duration-300 ${
              happyJumping ? "sm-jump" : ""
            }`}
            viewBox="0 0 156 156"
            onMouseEnter={triggerHappy}
          >
            {/* Background Blob Disk (Green) */}
            <circle cx="78" cy="78" r="72" fill="#16a34a" />

            {/* Ink Face Features */}
            <g transform={`translate(${happyOffset.x.toFixed(2)}, ${happyOffset.y.toFixed(2)})`}>
              {/* Left Eye */}
              <rect
                x="48"
                y={blinking ? 65 : 60}
                width="12"
                height={blinking ? 2 : 12}
                fill="#0a0a0a"
              />
              {/* Right Eye */}
              <rect
                x="96"
                y={blinking ? 65 : 60}
                width="12"
                height={blinking ? 2 : 12}
                fill="#0a0a0a"
              />
              {/* Happy Smile Mouth */}
              <rect x="48" y="84" width="12" height="12" fill="#0a0a0a" />
              <rect x="96" y="84" width="12" height="12" fill="#0a0a0a" />
              <rect x="60" y="96" width="12" height="12" fill="#0a0a0a" />
              <rect x="72" y="96" width="12" height="12" fill="#0a0a0a" />
              <rect x="84" y="96" width="12" height="12" fill="#0a0a0a" />
            </g>
          </svg>

          {/* Floating Hearts (Orange/Purple) */}
          {hearts.map((h) => (
            <span
              key={h.id}
              className="sm-heart"
              style={{ left: `${h.left}%`, top: `${h.top}px` }}
            >
              <svg width="24" height="19" viewBox="0 0 9 7" fill="#7c3aed">
                <rect x="2" y="1" width="1.04" height="1.04" />
                <rect x="3" y="1" width="1.04" height="1.04" />
                <rect x="5" y="1" width="1.04" height="1.04" />
                <rect x="6" y="1" width="1.04" height="1.04" />
                <rect x="1" y="2" width="1.04" height="1.04" />
                <rect x="2" y="2" width="1.04" height="1.04" />
                <rect x="3" y="2" width="1.04" height="1.04" />
                <rect x="4" y="2" width="1.04" height="1.04" />
                <rect x="5" y="2" width="1.04" height="1.04" />
                <rect x="6" y="2" width="1.04" height="1.04" />
                <rect x="7" y="2" width="1.04" height="1.04" />
                <rect x="4" y="6" width="1.04" height="1.04" />
              </svg>
            </span>
          ))}
        </div>
        <div className="l mono text-muted-foreground mb-1 text-[11px] uppercase tracking-widest text-[#7c3aed] font-medium">Brilliant at</div>
        <p className="text-sm m-0 text-center text-[#2a2a2a]">
          Producing a lot of work quickly, and getting a rough first version of almost anything in front of you.
        </p>
      </div>

      {/* Sad / Shy Smiley (Purple with Orange blush) */}
      <div className="c relative text-center" ref={sadRef}>
        <svg
          className={`smiley w-32 h-32 mx-auto mb-4 cursor-pointer transition-transform duration-300 ${
            sadShy ? "scale-95 translate-y-1" : ""
          }`}
          viewBox="0 0 156 156"
          onMouseEnter={() => setSadShy(true)}
          onMouseLeave={() => setSadShy(false)}
        >
          {/* Background Blob Disk (Purple) */}
          <circle cx="78" cy="78" r="72" fill="#7c3aed" />

          {/* Ink Face Features */}
          <g transform={`translate(${sadOffset.x.toFixed(2)}, ${sadOffset.y.toFixed(2)})`}>
            {/* Blushing Cheeks (Orange) */}
            <rect x="36" y="84" width="12" height="12" fill="#f97316" fillOpacity={sadShy ? 0.8 : 0} />
            <rect x="108" y="84" width="12" height="12" fill="#f97316" fillOpacity={sadShy ? 0.8 : 0} />

            {/* Left Eye */}
            <rect
              x="48"
              y={blinking ? 65 : 60}
              width="12"
              height={blinking ? 2 : 12}
              fill="#0a0a0a"
            />
            {/* Right Eye */}
            <rect
              x="96"
              y={blinking ? 65 : 60}
              width="12"
              height={blinking ? 2 : 12}
              fill="#0a0a0a"
            />
            {/* Sad Frown Mouth */}
            <rect x="60" y="84" width="12" height="12" fill="#0a0a0a" />
            <rect x="72" y="84" width="12" height="12" fill="#0a0a0a" />
            <rect x="84" y="84" width="12" height="12" fill="#0a0a0a" />
            <rect x="48" y="96" width="12" height="12" fill="#0a0a0a" />
            <rect x="96" y="96" width="12" height="12" fill="#0a0a0a" />
          </g>
        </svg>
        <div className="l mono text-muted-foreground mb-1 text-[11px] uppercase tracking-widest text-[#f97316] font-medium">Hopeless at</div>
        <p className="text-sm m-0 text-center text-[#2a2a2a]">
          Knowing which of those versions is actually any good, and having the nerve to throw the rest away.
        </p>
      </div>
    </div>
  );
};
