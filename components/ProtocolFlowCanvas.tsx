"use client";

import React, { useEffect, useRef } from "react";

export const ProtocolFlowCanvas: React.FC = () => {
  const cvRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    const PX = 8;
    let W = 0;
    let H = 0;
    let animId: number;
    let t = Math.random() * 4000;

    // Palette: Purple, Blue, Green, Orange
    const PURPLE = "#7c3aed";
    const BLUE = "#2563eb";
    const GREEN = "#16a34a";
    const ORANGE = "#f97316";
    const NEON_GREEN = "#22c55e";

    // Mouse interaction state
    let mouseX = -1000;
    let mouseY = -1000;
    let isHovered = false;
    let mouseClickShockwave = 0;
    let clickX = 0;
    let clickY = 0;

    const hash = (n: number) => {
      const s = Math.sin(n * 12.9898) * 43758.5453;
      return s - Math.floor(s);
    };

    const resize = () => {
      const parent = cv.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.width < 2) return;
      W = rect.width;
      H = Math.max(280, Math.min(400, rect.width * 0.34));
      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovered = mouseX >= 0 && mouseX <= W && mouseY >= 0 && mouseY <= H;
    };

    const handlePointerLeave = () => {
      isHovered = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      clickX = e.clientX - rect.left;
      clickY = e.clientY - rect.top;
      mouseClickShockwave = 1.0;
    };

    window.addEventListener("pointermove", handlePointerMove);
    cv.addEventListener("pointerleave", handlePointerLeave);
    cv.addEventListener("pointerdown", handlePointerDown);

    // Create 1800 particles
    const NUM_PARTICLES = 1800;
    const particles: Array<{
      u: number;
      s: number;
      speed: number;
      branch: "main" | "upper_plume" | "lower_sparks";
      yOffset: number;
      vx: number;
      vy: number;
    }> = [];

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const s = hash(i * 3.7 + 1.2);
      const branchRand = hash(i * 7.1 + 4.9);
      const branch = branchRand < 0.65 ? "main" : branchRand < 0.88 ? "upper_plume" : "lower_sparks";

      particles.push({
        u: hash(i * 5.3 + 9.1),
        s,
        speed: 0.75 + hash(i * 2.3) * 0.85,
        branch,
        yOffset: (hash(i * 11.7) - 0.5) * 2,
        vx: 0,
        vy: 0,
      });
    }

    const render = () => {
      t += 16;
      ctx.clearRect(0, 0, W, H);

      const cy = H * 0.52;

      // Update shockwave
      if (mouseClickShockwave > 0.01) {
        mouseClickShockwave *= 0.94;
      } else {
        mouseClickShockwave = 0;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.u = (p.u + 0.0008 * p.speed) % 1;
        const u = p.u;
        let x = u * W;

        let y = cy;
        let col = PURPLE;

        if (u < 0.28) {
          // Left Zone: Purple scattered particles
          const scatter = Math.pow(1 - u / 0.28, 1.2) * H * 0.38;
          y = cy + (hash(p.s * 13.1 + Math.floor(t * 0.01)) - 0.5) * scatter * 2;
          col = PURPLE;
        } else if (u < 0.58) {
          // Mid-Left Zone: Dense Blue Stream
          const beamWidth = (0.18 + (u - 0.28) * 0.25) * H;
          y = cy + p.yOffset * beamWidth * 0.5 + Math.sin(u * 8 + t * 0.002) * 8;
          col = p.s < 0.15 ? PURPLE : BLUE;
        } else if (u < 0.78) {
          // Mid-Right Zone: Green Flow
          const beamWidth = (0.26 + (u - 0.58) * 0.5) * H;
          y = cy + p.yOffset * beamWidth * 0.5 + Math.sin(u * 6 + t * 0.002) * 12;
          col = p.s < 0.15 ? BLUE : p.s < 0.85 ? GREEN : NEON_GREEN;
        } else {
          // Right Zone: Expanding Neon Green (top) & Orange Sparks (bottom)
          const prog = (u - 0.78) / 0.22;
          if (p.branch === "upper_plume") {
            const plumeY = cy - H * 0.22 - prog * H * 0.24 + (hash(p.s * 7) - 0.5) * H * 0.22;
            y = plumeY;
            col = NEON_GREEN;
          } else if (p.branch === "lower_sparks") {
            const sparkY = cy + H * 0.18 + prog * H * 0.26 + (hash(p.s * 9) - 0.5) * H * 0.24;
            y = sparkY;
            col = p.s < 0.7 ? ORANGE : GREEN;
          } else {
            const beamWidth = (0.36 + prog * 0.4) * H;
            y = cy + p.yOffset * beamWidth * 0.45;
            col = p.s < 0.5 ? GREEN : ORANGE;
          }
        }

        // --- Interactive Mouse Reaction Physics ---
        if (isHovered && mouseX > 0) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.hypot(dx, dy);
          const maxDist = 140;

          if (dist < maxDist && dist > 1) {
            const force = Math.pow(1 - dist / maxDist, 1.8) * 45;
            const angle = Math.atan2(dy, dx);
            const swirl = (p.s > 0.5 ? 1 : -1) * 20 * (1 - dist / maxDist);

            x += Math.cos(angle) * force + Math.sin(angle) * swirl;
            y += Math.sin(angle) * force - Math.cos(angle) * swirl;

            // Highlight color on hover interaction
            col = p.s < 0.33 ? PURPLE : p.s < 0.66 ? BLUE : ORANGE;
          }
        }

        // --- Click Shockwave Physics ---
        if (mouseClickShockwave > 0.05) {
          const dx = x - clickX;
          const dy = y - clickY;
          const dist = Math.hypot(dx, dy);
          const waveRadius = (1 - mouseClickShockwave) * Math.max(W, H) * 0.8;
          const diff = Math.abs(dist - waveRadius);

          if (diff < 40) {
            const waveForce = Math.max(0, 1 - diff / 40) * mouseClickShockwave * 35;
            const angle = Math.atan2(dy, dx);
            x += Math.cos(angle) * waveForce;
            y += Math.sin(angle) * waveForce;
            col = ORANGE;
          }
        }

        // Snap to grid
        const gridX = Math.round(x / PX) * PX;
        const gridY = Math.round(y / PX) * PX;

        ctx.fillStyle = col;
        ctx.fillRect(gridX, gridY, PX - 1, PX - 1);
      }

      // Draw subtle interactive crosshair / target ring when mouse is over canvas
      if (isHovered && mouseX > 0) {
        ctx.strokeStyle = "rgba(124, 58, 237, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 28, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      cv.removeEventListener("pointerleave", handlePointerLeave);
      cv.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div className="procflow w-full mb-8 relative group cursor-crosshair">
      <canvas ref={cvRef} id="bcp-flowviz" className="w-full block" aria-hidden="true" />
    </div>
  );
};
