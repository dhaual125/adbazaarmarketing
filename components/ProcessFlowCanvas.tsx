"use client";

import React, { useEffect, useRef } from "react";

export const ProcessFlowCanvas: React.FC = () => {
  const cvRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    const CELL = 8;
    let W = 0;
    let H = 0;
    let animId: number;
    let clk = 0;

    // Palette matching user screenshot:
    // Purple -> Light Blue -> Royal Blue -> Green -> Orange
    const PURPLE = "#a855f7";
    const LIGHT_BLUE = "#60a5fa";
    const ROYAL_BLUE = "#2563eb";
    const GREEN = "#22c55e";
    const ORANGE = "#f97316";

    const resize = () => {
      const parent = cv.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.width < 2) return;
      W = rect.width;
      H = Math.max(220, Math.min(300, rect.width * 0.26));
      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      clk++;
      ctx.clearRect(0, 0, W, H);

      const cy = H * 0.5;
      const R = H * 0.42;
      const totalTurns = 4.2;
      const M = 320;

      for (let s = 0; s < 2; s++) {
        const ph0 = s * Math.PI;

        for (let i = 0; i < M; i++) {
          const u = i / M;
          const motionU = (u + clk * 0.001) % 1;

          // Envelope: taper at ends, open tail at right (u > 0.88)
          let rk = R * Math.sin(u * Math.PI * 0.95);
          if (u > 0.88) {
            // Open horizontal tail
            rk = R * 0.28;
          }

          const ang = u > 0.88 ? (s === 0 ? 0 : Math.PI) : (u * totalTurns * Math.PI * 2 + ph0 + clk * 0.02);
          const ya = u > 0.88 ? (s === 0 ? -rk : rk) : Math.sin(ang) * rk;
          const sx = u * W;
          const sy = cy + ya;

          // Color stages across 5 loops:
          // 0.0 - 0.22: Purple
          // 0.22 - 0.42: Light Blue
          // 0.42 - 0.62: Royal Blue
          // 0.62 - 0.82: Green
          // 0.82 - 1.00: Orange
          let col = PURPLE;
          if (u < 0.22) {
            col = PURPLE;
          } else if (u < 0.42) {
            col = LIGHT_BLUE;
          } else if (u < 0.62) {
            col = ROYAL_BLUE;
          } else if (u < 0.82) {
            col = GREEN;
          } else {
            col = ORANGE;
          }

          const c = Math.floor(sx / CELL);
          const r = Math.floor(sy / CELL);

          ctx.fillStyle = col;
          ctx.fillRect(c * CELL, r * CELL, CELL - 1, CELL - 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="procflow w-full mb-10 relative">
      <canvas ref={cvRef} id="procflow" className="w-full block" aria-hidden="true" />
    </div>
  );
};
