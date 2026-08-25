"use client";

import React, { useEffect, useRef } from "react";

export const ProcessFlowCanvas: React.FC = () => {
  const cvRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cv = cvRef.current;
    const container = containerRef.current;
    if (!cv || !container) return;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    let isVisibleOnScreen = true;
    let isMobile = window.innerWidth < 640;
    let DPR = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    let CELL = isMobile ? 5.5 : 7;
    let W = 0;
    let H = 0;
    let animId: number;
    let t = Math.random() * 5000;
    let lastTime = performance.now();

    // Light Pastel Palette across the entire full-width DNA helix:
    // Lavender -> Sky Blue -> Mint Green -> Peach Apricot
    const PURPLE = "#A78BFA";
    const PURPLE_LIGHT = "#C4B5FD";
    const BLUE = "#60A5FA";
    const BLUE_LIGHT = "#93C5FD";
    const GREEN = "#6EE7B7";
    const GREEN_LIGHT = "#86EFAC";
    const ORANGE = "#FDBA74";
    const ORANGE_LIGHT = "#FED7AA";

    let mouseX = -1000;
    let mouseY = -1000;
    let isHovered = false;

    const hash = (n: number) => {
      const s = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
      return s - Math.floor(s);
    };

    const resize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width < 2) return;
      W = rect.width;
      isMobile = W < 640;
      CELL = isMobile ? 4.5 : 7;
      H = Math.max(160, Math.min(320, isMobile ? rect.width * 0.38 : rect.width * 0.28));
      DPR = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pause when off-screen to save 100% mobile CPU/battery
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisibleOnScreen;
          isVisibleOnScreen = entry.isIntersecting;
          if (!wasVisible && isVisibleOnScreen) {
            lastTime = performance.now();
            cancelAnimationFrame(animId);
            animId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

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

    // Adaptive Particles for Full-Width Continuous DNA Double-Helix
    const MAX_NUM = 650;
    interface Particle {
      u: number;
      seed: number;
      speed: number;
      type: "strandA" | "strandB" | "rung" | "aura";
      rungPos: number;
      yNoise: number;
      xNoise: number;
      curX: number;
      curY: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < MAX_NUM; i++) {
      const r = hash(i * 7.13 + 3.41);
      let type: "strandA" | "strandB" | "rung" | "aura" = "strandA";
      if (r < 0.42) {
        type = "strandA"; // Primary helical strand
      } else if (r < 0.84) {
        type = "strandB"; // Opposing helical strand (pi shift)
      } else if (r < 0.94) {
        type = "rung"; // Connecting base-pair ladder rungs
      } else {
        type = "aura"; // Ambient floating energy particles
      }

      particles.push({
        u: hash(i * 5.31 + 7.19),
        seed: hash(i * 3.71 + 1.49),
        speed: 0.75 + hash(i * 2.13) * 0.45,
        type,
        rungPos: hash(i * 11.39), // 0 (strandA) to 1 (strandB)
        yNoise: (hash(i * 11.73) - 0.5) * 2,
        xNoise: (hash(i * 13.89) - 0.5) * 2,
        curX: 0,
        curY: 0,
      });
    }

    const render = () => {
      if (!isVisibleOnScreen) {
        return;
      }

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      t += dt * 0.18; // Ultra-calm, soothing, premium harmonic flow

      ctx.clearRect(0, 0, W, H);

      const cy = H * 0.5;
      const activeCount = isMobile ? 85 : MAX_NUM;

      // Draw subtle background pixel grid
      ctx.strokeStyle = "rgba(10, 10, 10, 0.025)";
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

      // Full-Width Continuous DNA Double-Helix Parameters
      const totalLoops = isMobile ? 4.0 : 5.5;
      const waveFreq = totalLoops * Math.PI * 2;
      const phaseOffset = t * 0.90;

      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];

        // Soothing, calm living stream flow from left to right
        p.u = (p.u + dt * 0.008 * p.speed) % 1;
        const u = p.u;

        // Amplitude envelope: elegant, balanced height with gentle taper at edges
        const envelope = Math.sin(u * Math.PI);
        const amp = (0.20 + Math.pow(envelope, 0.4) * 0.08) * H;
        const strandThickness = (0.016 + Math.pow(envelope, 0.4) * 0.016) * H;

        const theta = u * waveFreq + phaseOffset;
        const yStrandA = cy + Math.sin(theta) * amp;
        const yStrandB = cy + Math.sin(theta + Math.PI) * amp;

        let targetX = u * W + p.xNoise * (CELL * 0.5);
        let targetY = cy;
        let zDepth = 0; // -1 (back) to +1 (front)

        if (p.type === "strandA") {
          targetY = yStrandA + p.yNoise * strandThickness;
          zDepth = Math.cos(theta);
        } else if (p.type === "strandB") {
          targetY = yStrandB + p.yNoise * strandThickness;
          zDepth = Math.cos(theta + Math.PI);
        } else if (p.type === "rung") {
          // Discrete base-pair rungs connecting Strand A and Strand B across the entire length
          const rungQuant = Math.round(theta / (Math.PI / 2.2)) * (Math.PI / 2.2);
          const rY_A = cy + Math.sin(rungQuant) * amp;
          const rY_B = cy + Math.sin(rungQuant + Math.PI) * amp;
          targetY = rY_A + (rY_B - rY_A) * p.rungPos + p.yNoise * (strandThickness * 0.4);
          zDepth = 0;
        } else {
          // Ambient floating particles around the DNA helix
          const auraSpread = amp * 1.30;
          targetY = cy + p.yNoise * auraSpread;
          zDepth = (p.seed - 0.5) * 2;
        }

        // --- Continuous Full-Width Pastel 4-Color Gradient Transition ---
        // Pastel Lavender -> Pastel Sky Blue -> Pastel Mint Green -> Pastel Peach Apricot
        let col = PURPLE_LIGHT;
        if (u < 0.28) {
          col = p.seed < 0.45 ? PURPLE : PURPLE_LIGHT;
        } else if (u < 0.52) {
          const blend = (u - 0.28) / 0.24;
          if (blend < 0.5) {
            col = p.seed < 0.4 ? PURPLE_LIGHT : BLUE_LIGHT;
          } else {
            col = p.seed < 0.3 ? PURPLE_LIGHT : p.seed < 0.8 ? BLUE_LIGHT : BLUE;
          }
        } else if (u < 0.76) {
          const blend = (u - 0.52) / 0.24;
          if (blend < 0.5) {
            col = p.seed < 0.4 ? BLUE_LIGHT : GREEN_LIGHT;
          } else {
            col = p.seed < 0.3 ? BLUE_LIGHT : p.seed < 0.8 ? GREEN_LIGHT : GREEN;
          }
        } else {
          const blend = (u - 0.76) / 0.24;
          if (blend < 0.45) {
            col = p.seed < 0.4 ? GREEN_LIGHT : ORANGE_LIGHT;
          } else {
            col = p.seed < 0.25 ? GREEN_LIGHT : p.seed < 0.72 ? ORANGE_LIGHT : ORANGE;
          }
        }

        // --- Interactive Repulsion & Wake ---
        if (isHovered && mouseX > 0) {
          const dx = targetX - mouseX;
          const dy = targetY - mouseY;
          const dist = Math.hypot(dx, dy);
          const repulsionRadius = isMobile ? 65 : 105;

          if (dist < repulsionRadius && dist > 0.1) {
            const force = Math.pow(1 - dist / repulsionRadius, 1.7) * (isMobile ? 36 : 60);
            const angle = Math.atan2(dy, dx);
            const swirl = (p.seed > 0.5 ? 1 : -1) * (1 - dist / repulsionRadius) * 10;

            targetX += Math.cos(angle) * force - Math.sin(angle) * swirl;
            targetY += Math.sin(angle) * force + Math.cos(angle) * swirl;

            if (dist > repulsionRadius * 0.6) {
              col = p.seed < 0.5 ? BLUE_LIGHT : ORANGE_LIGHT;
            }
          }
        }

        // Smooth position integration
        if (p.curX === 0 && p.curY === 0) {
          p.curX = targetX;
          p.curY = targetY;
        } else {
          p.curX += (targetX - p.curX) * 0.22;
          p.curY += (targetY - p.curY) * 0.22;
        }

        // Snap to strict pixel grid
        const gx = Math.round(p.curX / CELL) * CELL;
        const gy = Math.round(p.curY / CELL) * CELL;

        if (gx < -CELL || gx > W + CELL || gy < -CELL || gy > H + CELL) continue;

        // 3D Depth Opacity: foreground strands solid, background strands softly dimmed
        ctx.save();
        if (zDepth < -0.35) {
          ctx.globalAlpha = 0.70;
        } else {
          ctx.globalAlpha = 1.0;
        }

        ctx.fillStyle = col;
        ctx.fillRect(gx, gy, CELL - 1, CELL - 1);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      cv.removeEventListener("pointerleave", handlePointerLeave);
      cv.removeEventListener("touchmove", handleTouchMove);
      cv.removeEventListener("touchend", handleTouchEnd);
      cv.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className="procflow w-full mb-10 relative group touch-pan-y">
      <canvas
        ref={cvRef}
        id="procflow"
        className="w-full block bg-transparent"
        aria-hidden="true"
      />
    </div>
  );
};
