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
    const CELL = 7;
    let W = 0;
    let H = 0;
    let animId: number;
    let t = 0;

    // Brand colors only
    const PURPLE = "#7c3aed";
    const PURPLE_LIGHT = "#a78bfa";
    const BLUE = "#2563eb";
    const BLUE_LIGHT = "#60a5fa";
    const GREEN = "#16a34a";
    const GREEN_LIGHT = "#22c55e";
    const ORANGE = "#f97316";
    const ORANGE_LIGHT = "#fb923c";

    // Mouse interaction
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
      H = Math.max(280, Math.min(420, rect.width * 0.35));
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
      isHovered = mouseX >= -10 && mouseX <= W + 10 && mouseY >= -10 && mouseY <= H + 10;
    };

    const handlePointerLeave = () => {
      isHovered = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    cv.addEventListener("pointerleave", handlePointerLeave);

    // --- Particles: Horizontal comet stream matching media_1787596605265.png ---
    const NUM = 2400;
    interface Particle {
      baseU: number;     // base horizontal position 0..1
      seed: number;
      speed: number;
      yOff: number;      // vertical scatter factor -1..1
      drift: number;     // individual drift amplitude
      curX: number;
      curY: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < NUM; i++) {
      particles.push({
        baseU: hash(i * 5.31 + 9.17),
        seed: hash(i * 3.71 + 1.49),
        speed: 0.6 + hash(i * 2.13) * 0.8,
        yOff: (hash(i * 11.73) - 0.5) * 2,
        drift: hash(i * 7.91) * 2 - 1,
        curX: 0,
        curY: 0,
      });
    }

    const render = () => {
      t += 0.018;
      ctx.clearRect(0, 0, W, H);

      const cy = H * 0.48; // Vertical center slightly above middle

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Continuous leftward-to-rightward flow
        p.baseU = (p.baseU + 0.0009 * p.speed) % 1;
        const u = p.baseU;

        // --- Horizontal comet/stream geometry ---
        // Shape: scattered left → converging → dense center block → expanding → scattered right
        //
        // Key zones from media_1787596605265.png:
        //   0.00 - 0.28: LEFT SCATTER — Sparse dispersed particles, wide vertical spread
        //   0.28 - 0.42: LEFT CONVERGENCE — Particles funnel inward, tightening
        //   0.42 - 0.58: DENSE CENTER BLOCK — Tight dense pixel mass, minimal scatter
        //   0.58 - 0.72: RIGHT EXPANSION — Particles fan outward, widening
        //   0.72 - 1.00: RIGHT SCATTER — Sparse expanding plume with trailing sparks

        let targetX = u * W;
        let targetY = cy;
        let verticalSpread = 0;

        if (u < 0.28) {
          // LEFT SCATTER: Wide dispersed cloud, tapering right
          const prog = u / 0.28; // 0..1
          verticalSpread = (1 - prog * 0.5) * H * 0.42;
          // Gentle drift animation
          const wobble = Math.sin(t * 1.2 + p.seed * 20 + u * 8) * 8 * (1 - prog * 0.5);
          targetY = cy + p.yOff * verticalSpread + wobble;
          // Slight horizontal scatter
          targetX += (p.drift * 6) * (1 - prog);

        } else if (u < 0.42) {
          // LEFT CONVERGENCE: Funnel inward
          const prog = (u - 0.28) / 0.14; // 0..1
          const startSpread = H * 0.28;
          const endSpread = H * 0.10;
          verticalSpread = startSpread + (endSpread - startSpread) * prog;
          const wobble = Math.sin(t * 1.8 + p.seed * 15 + u * 12) * 5 * (1 - prog * 0.6);
          targetY = cy + p.yOff * verticalSpread + wobble;

        } else if (u < 0.58) {
          // DENSE CENTER BLOCK: Tight compact mass
          const prog = (u - 0.42) / 0.16; // 0..1
          verticalSpread = H * 0.10 + Math.sin(prog * Math.PI) * H * 0.02;
          const wobble = Math.sin(t * 2.2 + p.seed * 12) * 3;
          targetY = cy + p.yOff * verticalSpread + wobble;

        } else if (u < 0.72) {
          // RIGHT EXPANSION: Fan outward
          const prog = (u - 0.58) / 0.14; // 0..1
          const startSpread = H * 0.10;
          const endSpread = H * 0.30;
          verticalSpread = startSpread + (endSpread - startSpread) * prog;
          const wobble = Math.sin(t * 1.5 + p.seed * 18 + u * 10) * 6 * prog;
          targetY = cy + p.yOff * verticalSpread + wobble;
          // Slight upward tilt for right side (matching image: right side goes up-right)
          targetY -= prog * H * 0.08 * (p.yOff < 0 ? 1 : 0.3);

        } else {
          // RIGHT SCATTER: Sparse expanding plume trailing off
          const prog = (u - 0.72) / 0.28; // 0..1
          verticalSpread = H * 0.30 + prog * H * 0.16;
          const wobble = Math.sin(t * 1.0 + p.seed * 22 + u * 6) * 10 * prog;
          targetY = cy + p.yOff * verticalSpread + wobble;
          // Upward-right tilt matching the image's comet tail going upper-right
          targetY -= prog * H * 0.18 * (p.yOff < -0.2 ? 1.2 : 0.4);
          // Horizontal scatter
          targetX += p.drift * 8 * prog;
        }

        // --- COLOR: Purple → Blue → Green → Orange (left to right) ---
        let col: string;
        if (u < 0.28) {
          // Purple zone (scattered left)
          col = p.seed < 0.4 ? PURPLE : PURPLE_LIGHT;
        } else if (u < 0.42) {
          // Purple → Blue transition
          const blend = (u - 0.28) / 0.14;
          if (blend < 0.5) {
            col = p.seed < 0.6 ? PURPLE : BLUE_LIGHT;
          } else {
            col = p.seed < 0.3 ? PURPLE : p.seed < 0.8 ? BLUE : BLUE_LIGHT;
          }
        } else if (u < 0.58) {
          // Blue zone (dense center)
          col = p.seed < 0.7 ? BLUE : BLUE_LIGHT;
        } else if (u < 0.72) {
          // Blue → Green transition
          const blend = (u - 0.58) / 0.14;
          if (blend < 0.5) {
            col = p.seed < 0.5 ? BLUE : GREEN;
          } else {
            col = p.seed < 0.3 ? BLUE : p.seed < 0.8 ? GREEN : GREEN_LIGHT;
          }
        } else if (u < 0.88) {
          // Green → Orange transition
          const blend = (u - 0.72) / 0.16;
          if (blend < 0.5) {
            col = p.seed < 0.6 ? GREEN : GREEN_LIGHT;
          } else {
            col = p.seed < 0.3 ? GREEN : p.seed < 0.75 ? ORANGE : ORANGE_LIGHT;
          }
        } else {
          // Orange zone (trailing sparks)
          col = p.seed < 0.6 ? ORANGE : ORANGE_LIGHT;
        }

        // --- CURSOR REPULSION: Void/cut when cursor moves through ---
        if (isHovered && mouseX > 0) {
          const dx = targetX - mouseX;
          const dy = targetY - mouseY;
          const dist = Math.hypot(dx, dy);
          const repulsionRadius = 100;

          if (dist < repulsionRadius && dist > 0.5) {
            const force = Math.pow(1 - dist / repulsionRadius, 1.8) * 70;
            const angle = Math.atan2(dy, dx);
            // Swirl around cursor
            const swirl = (p.seed > 0.5 ? 1 : -1) * (1 - dist / repulsionRadius) * 18;

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

        // Skip if out of bounds
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
    };
  }, []);

  return (
    <div className="procflow w-full mb-8 relative group">
      <canvas
        ref={cvRef}
        id="bcp-flowviz"
        className="w-full block bg-transparent"
        aria-hidden="true"
      />
    </div>
  );
};
