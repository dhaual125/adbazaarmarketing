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
    let W = 0;
    let H = 0;
    let isMobile = false;
    let CELL = 7;
    let animId: number;
    let t = Math.random() * 5000;
    let lastTime = performance.now();

    // Brand Palette: Purple -> Blue -> Green -> Orange
    const PURPLE = "#7c3aed";
    const PURPLE_LIGHT = "#a855f7";
    const BLUE = "#2563eb";
    const BLUE_LIGHT = "#60a5fa";
    const GREEN = "#16a34a";
    const GREEN_LIGHT = "#22c55e";
    const ORANGE = "#f97316";
    const ORANGE_LIGHT = "#fb923c";

    let mouseX = -1000;
    let mouseY = -1000;
    let isHovered = false;

    const hash = (n: number) => {
      const s = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
      return s - Math.floor(s);
    };

    const resize = () => {
      const parent = cv.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.width < 2) return;
      W = rect.width;
      isMobile = W < 640;
      CELL = isMobile ? 5.5 : 7;
      // Responsive height: well-proportioned on small phone screens
      H = Math.max(190, Math.min(360, isMobile ? rect.width * 0.44 : rect.width * 0.30));
      DPR = Math.min(window.devicePixelRatio || 1, 2);
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
      isHovered = mouseX >= -20 && mouseX <= W + 20 && mouseY >= -20 && mouseY <= H + 20;
    };

    const handlePointerLeave = () => {
      isHovered = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = cv.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
        isHovered = mouseX >= -20 && mouseX <= W + 20 && mouseY >= -20 && mouseY <= H + 20;
      }
    };

    const handleTouchEnd = () => {
      isHovered = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    cv.addEventListener("pointerleave", handlePointerLeave);
    cv.addEventListener("touchmove", handleTouchMove, { passive: true });
    cv.addEventListener("touchend", handleTouchEnd, { passive: true });
    cv.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    // 2000 Particles configured for Braided Wave Harmonic Flow (media_1787598097026.jpg)
    const MAX_NUM = 2000;
    interface Particle {
      u: number;
      seed: number;
      speed: number;
      waveBranch: number;
      yNoise: number;
      xNoise: number;
      curX: number;
      curY: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < MAX_NUM; i++) {
      const branchRand = hash(i * 9.17 + 2.43);
      particles.push({
        u: hash(i * 5.31 + 7.19),
        seed: hash(i * 3.71 + 1.49),
        speed: 0.75 + hash(i * 2.13) * 0.55,
        waveBranch: branchRand < 0.38 ? 0 : branchRand < 0.74 ? 1 : 2,
        yNoise: (hash(i * 11.73) - 0.5) * 2,
        xNoise: (hash(i * 13.89) - 0.5) * 2,
        curX: 0,
        curY: 0,
      });
    }

    const render = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      t += dt * 1.35; // Constant silky smooth time progression

      ctx.clearRect(0, 0, W, H);

      const cy = H * 0.5;
      const activeCount = isMobile ? 950 : MAX_NUM;

      // Draw subtle guide grid
      ctx.strokeStyle = "rgba(10, 10, 10, 0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      const gridStep = CELL * 4;
      for (let gx = 0; gx <= W; gx += gridStep) {
        ctx.moveTo(gx + 0.5, 0);
        ctx.lineTo(gx + 0.5, H);
      }
      for (let gy = 0; gy <= H; gy += gridStep) {
        ctx.moveTo(0, gy + 0.5);
        ctx.lineTo(W, gy + 0.5);
      }
      ctx.stroke();

      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];

        // Continuous left-to-right living stream flow
        p.u = (p.u + dt * 0.065 * p.speed) % 1;
        const u = p.u;

        let targetX = u * W + Math.sin(t * 1.6 + p.seed * 10) * 3 + p.xNoise * (CELL * 0.7);
        let targetY = cy;
        let col = PURPLE;

        // --- Exact Geometry matching media_1787598097026.jpg ---
        if (u < 0.36) {
          // 1. LEFT CLOUD: Wide dispersed scattered particle cloud tapering to center neck
          const cloudProgress = u / 0.36; // 0 to 1
          const spreadH = (1 - cloudProgress * 0.75) * H * 0.44;
          const noiseY = (hash(p.seed * 31.7 + Math.floor(t * 0.05)) - 0.5) * 2;
          const undulation = Math.sin(u * 10 + t * 1.8 + p.seed * 6) * 10 * (1 - cloudProgress);
          targetY = cy + p.yNoise * spreadH + noiseY * spreadH * 0.32 + undulation;

          // Color: Purple -> Blue
          if (cloudProgress < 0.5) {
            col = p.seed < 0.4 ? PURPLE_LIGHT : PURPLE;
          } else {
            col = p.seed < 0.45 ? PURPLE : p.seed < 0.85 ? BLUE : BLUE_LIGHT;
          }
        } else if (u < 0.52) {
          // 2. CENTER FUNNEL / INTERTWINED STRANDS: Narrow neck with swirling strands
          const funnelProg = (u - 0.36) / 0.16; // 0 to 1
          const neckWidth = (0.10 + Math.sin(funnelProg * Math.PI) * 0.06) * H;
          const swirl = Math.sin(u * 22 + t * 3.5 + p.seed * 5) * neckWidth * 0.5;
          targetY = cy + p.yNoise * neckWidth * 0.5 + swirl;

          // Color: Blue -> Green
          if (funnelProg < 0.5) {
            col = p.seed < 0.3 ? PURPLE : p.seed < 0.75 ? BLUE : GREEN;
          } else {
            col = p.seed < 0.3 ? BLUE : p.seed < 0.8 ? GREEN : GREEN_LIGHT;
          }
        } else {
          // 3. RIGHT BRAIDED SINE WAVE RIBBONS (media_1787598097026.jpg)
          const waveProg = (u - 0.52) / 0.48; // 0 to 1
          const amp = (0.28 + waveProg * 0.18) * H;
          const waveFreq = isMobile ? 9.5 : 11.2;
          const phaseOffset = t * 2.8;

          let waveOffset = 0;
          if (p.waveBranch === 0) {
            waveOffset = Math.sin(u * waveFreq + phaseOffset) * amp;
          } else if (p.waveBranch === 1) {
            waveOffset = Math.sin(u * waveFreq + phaseOffset + Math.PI * 0.9) * amp * 0.92;
          } else {
            waveOffset = Math.cos(u * (waveFreq * 1.35) - phaseOffset * 1.1) * amp * 0.75;
          }

          const lineThickness = (0.028 + waveProg * 0.045) * H;
          targetY = cy + waveOffset + p.yNoise * lineThickness;

          // Color: Green -> Orange
          if (waveProg < 0.42) {
            col = p.seed < 0.35 ? GREEN : p.seed < 0.75 ? GREEN_LIGHT : ORANGE_LIGHT;
          } else {
            col = p.seed < 0.25 ? GREEN : p.seed < 0.72 ? ORANGE : ORANGE_LIGHT;
          }
        }

        // --- Interactive Repulsion Cut & Wake ---
        if (isHovered && mouseX > 0) {
          const dx = targetX - mouseX;
          const dy = targetY - mouseY;
          const dist = Math.hypot(dx, dy);
          const repulsionRadius = isMobile ? 80 : 110;

          if (dist < repulsionRadius && dist > 0.1) {
            const force = Math.pow(1 - dist / repulsionRadius, 1.7) * (isMobile ? 45 : 65);
            const angle = Math.atan2(dy, dx);
            const swirl = (p.seed > 0.5 ? 1 : -1) * (1 - dist / repulsionRadius) * 14;

            targetX += Math.cos(angle) * force - Math.sin(angle) * swirl;
            targetY += Math.sin(angle) * force + Math.cos(angle) * swirl;

            if (dist > repulsionRadius * 0.65) {
              col = p.seed < 0.5 ? BLUE : ORANGE;
            }
          }
        }

        // Smooth position integration
        if (p.curX === 0 && p.curY === 0) {
          p.curX = targetX;
          p.curY = targetY;
        } else {
          p.curX += (targetX - p.curX) * 0.26;
          p.curY += (targetY - p.curY) * 0.26;
        }

        // Snap to crisp pixel grid
        const gx = Math.round(p.curX / CELL) * CELL;
        const gy = Math.round(p.curY / CELL) * CELL;

        if (gx < -CELL || gx > W + CELL || gy < -CELL || gy > H + CELL) continue;

        ctx.fillStyle = col;
        ctx.fillRect(gx, gy, CELL - 1, CELL - 1);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      cv.removeEventListener("pointerleave", handlePointerLeave);
      cv.removeEventListener("touchmove", handleTouchMove);
      cv.removeEventListener("touchend", handleTouchEnd);
      cv.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return (
    <div className="procflow w-full mb-10 relative group touch-pan-y">
      <canvas
        ref={cvRef}
        id="procflow"
        className="w-full block bg-transparent"
        aria-hidden="true"
      />
    </div>
  );
};
