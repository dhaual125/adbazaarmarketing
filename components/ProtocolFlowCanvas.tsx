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
    let DPR = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    let CELL = isMobile ? 5.5 : 7;
    let W = 0;
    let H = 0;
    let animId: number;
    let t = Math.random() * 5000;
    let lastTime = performance.now();

    // Strictly 4 Brand Colors in Soft Light / Pastel Shades:
    // Light Purple -> Light Blue -> Light Green -> Light Orange
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
      CELL = isMobile ? 5.5 : 7;
      H = Math.max(200, Math.min(360, isMobile ? rect.width * 0.46 : rect.width * 0.30));
      DPR = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pause when offscreen to save mobile CPU/battery
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

    // Rich, dense particle population: 550 on mobile, 1800 on desktop
    const MAX_NUM = 1800;
    interface Particle {
      u: number;
      seed: number;
      speed: number;
      branch: "top" | "bottom" | "core" | "upperWing" | "spark";
      yNoise: number;
      xNoise: number;
      curX: number;
      curY: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < MAX_NUM; i++) {
      const r = hash(i * 7.13 + 3.41);
      let branch: "top" | "bottom" | "core" | "upperWing" | "spark" = "core";
      if (r < 0.28) {
        branch = "top";
      } else if (r < 0.56) {
        branch = "bottom";
      } else if (r < 0.78) {
        branch = "core";
      } else if (r < 0.92) {
        branch = "upperWing";
      } else {
        branch = "spark";
      }

      particles.push({
        u: hash(i * 5.31 + 7.19),
        seed: hash(i * 3.71 + 1.49),
        speed: 0.75 + hash(i * 2.13) * 0.45,
        branch,
        yNoise: (hash(i * 11.73) - 0.5) * 2,
        xNoise: (hash(i * 13.89) - 0.5) * 2,
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
      t += dt * 0.45; // Calm, steady, soothing flow rate

      ctx.clearRect(0, 0, W, H);

      const cy = H * 0.5;
      const activeCount = isMobile ? 260 : MAX_NUM;

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

      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];

        // Smooth living stream flow from left to right
        p.u = (p.u + dt * 0.016 * p.speed) % 1;
        const u = p.u;

        let targetX = u * W + p.xNoise * (CELL * 0.5);
        let targetY = cy;
        let col = PURPLE_LIGHT;

        // =========================================================================
        // EXACT TOPOLOGY MATCHING media_1787642788360.png:
        // 1. LEFT SCATTERED CLOUD (u < 0.28)
        // 2. MIDDLE SOLID CONVERGING DUAL BANDS (0.28 <= u < 0.52)
        // 3. RIGHT FULL DENSE BODY + UPWARD WING + LOWER EMBERS (u >= 0.52)
        // =========================================================================

        if (u < 0.28) {
          // --- 1. LEFT SCATTERED SPRAY / CONVERGING CLOUD ---
          const prog = u / 0.28; // 0 to 1
          const spread = (1 - prog * 0.70) * H * 0.44;
          const curveY = (p.branch === "top" || p.branch === "upperWing" ? -1 : 1) * (1 - prog * 0.5) * H * 0.20;
          const wobble = Math.sin(u * 10 + t * 1.0 + p.seed * 5) * 4 * (1 - prog);

          targetY = cy + curveY + p.yNoise * spread + wobble;

          // Color: Light Purple / Lavender
          col = p.seed < 0.5 ? PURPLE_LIGHT : PURPLE;

        } else if (u < 0.52) {
          // --- 2. MIDDLE SOLID PARALLEL HORIZONTAL BANDS ---
          const prog = (u - 0.28) / 0.24; // 0 to 1
          const bandThickness = H * 0.12;
          const separation = (0.13 - prog * 0.05) * H;

          let bandCenter = cy;
          if (p.branch === "top" || p.branch === "upperWing") {
            bandCenter = cy - separation;
          } else if (p.branch === "bottom" || p.branch === "spark") {
            bandCenter = cy + separation;
          } else {
            bandCenter = cy;
          }

          const ripple = Math.sin(u * 18 + t * 1.5 + p.seed * 3) * 2.5;
          targetY = bandCenter + p.yNoise * bandThickness * 0.5 + ripple;

          // Color: Sky Blue -> Soft Mint Green
          if (prog < 0.5) {
            col = p.seed < 0.4 ? PURPLE_LIGHT : BLUE_LIGHT;
          } else {
            col = p.seed < 0.4 ? BLUE_LIGHT : GREEN_LIGHT;
          }

        } else {
          // --- 3. RIGHT FULL DENSE BODY + UPWARD WING + LOWER EMBERS (Rich & Prominent) ---
          const prog = (u - 0.52) / 0.48; // 0 to 1

          if (p.branch === "spark") {
            // Lower right trailing scattered embers
            targetY = cy + prog * H * 0.36 + p.yNoise * (H * 0.10);
            col = p.seed < 0.5 ? ORANGE : ORANGE_LIGHT;

          } else if (p.branch === "upperWing") {
            // Upper prominent upward sweeping wing
            const upwardLift = -Math.pow(prog, 1.1) * H * 0.38;
            const wingThickness = (0.08 + prog * 0.14) * H;
            const undulation = Math.sin(u * 12 - t * 1.2 + p.seed * 4) * 3 * prog;
            targetY = cy + upwardLift + p.yNoise * wingThickness * 0.5 + undulation;

            // Color: Light Green -> Light Orange
            if (prog < 0.35) {
              col = p.seed < 0.5 ? GREEN_LIGHT : GREEN;
            } else if (prog < 0.70) {
              col = p.seed < 0.5 ? GREEN_LIGHT : ORANGE_LIGHT;
            } else {
              col = p.seed < 0.5 ? ORANGE_LIGHT : ORANGE;
            }

          } else {
            // Main rich, dense solid core body filling the right side
            const coreThickness = (0.16 + prog * 0.26) * H;
            const centerShift = -prog * H * 0.08;
            const undulation = Math.sin(u * 10 - t * 1.0 + p.seed * 3) * 4 * prog;
            targetY = cy + centerShift + p.yNoise * coreThickness * 0.5 + undulation;

            // Color: Light Green -> Light Orange
            if (prog < 0.30) {
              col = p.seed < 0.5 ? GREEN_LIGHT : GREEN;
            } else if (prog < 0.65) {
              col = p.seed < 0.5 ? GREEN_LIGHT : ORANGE_LIGHT;
            } else {
              col = p.seed < 0.4 ? ORANGE_LIGHT : ORANGE;
            }
          }
        }

        // --- Interactive Repulsion & Wake ---
        if (isHovered && mouseX > 0) {
          const dx = targetX - mouseX;
          const dy = targetY - mouseY;
          const dist = Math.hypot(dx, dy);
          const repulsionRadius = isMobile ? 65 : 105;

          if (dist < repulsionRadius && dist > 0.1) {
            const force = Math.pow(1 - dist / repulsionRadius, 1.6) * (isMobile ? 36 : 60);
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
