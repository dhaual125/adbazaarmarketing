"use client";

import React, { useEffect, useRef } from "react";

export const ProtocolFlowCanvas: React.FC = () => {
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
    let DPR = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2);
    let CELL = isMobile ? 5.5 : 7;
    let W = 0;
    let H = 0;
    let animId: number;
    let t = 0;
    let lastTime = performance.now();

    // Brand colors only
    const PURPLE = "#7c3aed";
    const PURPLE_LIGHT = "#a78bfa";
    const BLUE = "#2563eb";
    const BLUE_LIGHT = "#60a5fa";
    const GREEN = "#16a34a";
    const GREEN_LIGHT = "#22c55e";
    const ORANGE = "#f97316";
    const ORANGE_LIGHT = "#fb923c";

    // Pointer & Touch interaction
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
      CELL = isMobile ? 5.5 : 7;
      H = Math.max(180, Math.min(380, isMobile ? rect.width * 0.42 : rect.width * 0.30));
      DPR = isMobile ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pause when offscreen to eliminate mobile background lag
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleOnScreen = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovered = mouseX >= -10 && mouseX <= W + 10 && mouseY >= -10 && mouseY <= H + 10;
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
        isHovered = mouseX >= -10 && mouseX <= W + 10 && mouseY >= -10 && mouseY <= H + 10;
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

    // Adaptive particles: 360 on mobile (ultra-smooth 60/120fps), 1500 on desktop
    const MAX_NUM = 1500;
    interface Particle {
      baseU: number;
      seed: number;
      speed: number;
      yOff: number;
      drift: number;
      curX: number;
      curY: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < MAX_NUM; i++) {
      particles.push({
        baseU: hash(i * 5.31 + 9.17),
        seed: hash(i * 3.71 + 1.49),
        speed: 0.65 + hash(i * 2.13) * 0.70,
        yOff: (hash(i * 11.73) - 0.5) * 2,
        drift: hash(i * 7.91) * 2 - 1,
        curX: 0,
        curY: 0,
      });
    }

    const render = () => {
      if (!isVisibleOnScreen) {
        animId = requestAnimationFrame(render);
        return;
      }

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      t += dt * 0.75;

      ctx.clearRect(0, 0, W, H);

      const cy = H * 0.48;
      const activeCount = isMobile ? 360 : MAX_NUM;

      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];

        // Continuous leftward-to-rightward flow
        p.baseU = (p.baseU + dt * 0.024 * p.speed) % 1;
        const u = p.baseU;

        let targetX = u * W;
        let targetY = cy;
        let verticalSpread = 0;

        if (u < 0.28) {
          const prog = u / 0.28;
          verticalSpread = (1 - prog * 0.5) * H * 0.42;
          const wobble = Math.sin(t * 1.2 + p.seed * 20 + u * 8) * 6 * (1 - prog * 0.5);
          targetY = cy + p.yOff * verticalSpread + wobble;
          targetX += (p.drift * 5) * (1 - prog);

        } else if (u < 0.42) {
          const prog = (u - 0.28) / 0.14;
          const startSpread = H * 0.28;
          const endSpread = H * 0.10;
          verticalSpread = startSpread + (endSpread - startSpread) * prog;
          const wobble = Math.sin(t * 1.8 + p.seed * 15 + u * 12) * 4 * (1 - prog * 0.6);
          targetY = cy + p.yOff * verticalSpread + wobble;

        } else if (u < 0.58) {
          const prog = (u - 0.42) / 0.16;
          verticalSpread = H * 0.10 + Math.sin(prog * Math.PI) * H * 0.02;
          const wobble = Math.sin(t * 2.0 + p.seed * 12) * 2.5;
          targetY = cy + p.yOff * verticalSpread + wobble;

        } else if (u < 0.72) {
          const prog = (u - 0.58) / 0.14;
          const startSpread = H * 0.10;
          const endSpread = H * 0.30;
          verticalSpread = startSpread + (endSpread - startSpread) * prog;
          const wobble = Math.sin(t * 1.4 + p.seed * 18 + u * 10) * 5 * prog;
          targetY = cy + p.yOff * verticalSpread + wobble;
          targetY -= prog * H * 0.08 * (p.yOff < 0 ? 1 : 0.3);

        } else {
          const prog = (u - 0.72) / 0.28;
          verticalSpread = H * 0.30 + prog * H * 0.16;
          const wobble = Math.sin(t * 1.0 + p.seed * 22 + u * 6) * 8 * prog;
          targetY = cy + p.yOff * verticalSpread + wobble;
          targetY -= prog * H * 0.18 * (p.yOff < -0.2 ? 1.2 : 0.4);
          targetX += p.drift * 6 * prog;
        }

        // --- COLOR: Purple → Blue → Green → Orange ---
        let col: string;
        if (u < 0.28) {
          col = p.seed < 0.4 ? PURPLE : PURPLE_LIGHT;
        } else if (u < 0.42) {
          const blend = (u - 0.28) / 0.14;
          if (blend < 0.5) {
            col = p.seed < 0.6 ? PURPLE : BLUE_LIGHT;
          } else {
            col = p.seed < 0.3 ? PURPLE : p.seed < 0.8 ? BLUE : BLUE_LIGHT;
          }
        } else if (u < 0.58) {
          col = p.seed < 0.7 ? BLUE : BLUE_LIGHT;
        } else if (u < 0.72) {
          const blend = (u - 0.58) / 0.14;
          if (blend < 0.5) {
            col = p.seed < 0.5 ? BLUE : GREEN;
          } else {
            col = p.seed < 0.3 ? BLUE : p.seed < 0.8 ? GREEN : GREEN_LIGHT;
          }
        } else if (u < 0.88) {
          const blend = (u - 0.72) / 0.16;
          if (blend < 0.5) {
            col = p.seed < 0.6 ? GREEN : GREEN_LIGHT;
          } else {
            col = p.seed < 0.3 ? GREEN : p.seed < 0.75 ? ORANGE : ORANGE_LIGHT;
          }
        } else {
          col = p.seed < 0.6 ? ORANGE : ORANGE_LIGHT;
        }

        // --- CURSOR / TOUCH REPULSION ---
        if (isHovered && mouseX > 0) {
          const dx = targetX - mouseX;
          const dy = targetY - mouseY;
          const dist = Math.hypot(dx, dy);
          const repulsionRadius = isMobile ? 65 : 100;

          if (dist < repulsionRadius && dist > 0.5) {
            const force = Math.pow(1 - dist / repulsionRadius, 1.8) * (isMobile ? 38 : 70);
            const angle = Math.atan2(dy, dx);
            const swirl = (p.seed > 0.5 ? 1 : -1) * (1 - dist / repulsionRadius) * 12;

            targetX += Math.cos(angle) * force + Math.sin(angle) * swirl;
            targetY += Math.sin(angle) * force - Math.cos(angle) * swirl;
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

        // Snap to pixel grid
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
    <div ref={containerRef} className="procflow w-full mb-8 relative group touch-pan-y">
      <canvas
        ref={cvRef}
        id="bcp-flowviz"
        className="w-full block bg-transparent"
        aria-hidden="true"
      />
    </div>
  );
};
