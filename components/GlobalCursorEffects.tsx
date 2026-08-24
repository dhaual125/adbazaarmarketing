"use client";

import React, { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  time: number;
  phase: number;
}

interface ExplosionShockwave {
  x: number;
  y: number;
  startTime: number;
  duration: number;
  maxRadius: number;
}

export const GlobalCursorEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseRef = useRef({ x: -300, y: -300 });
  const trailRef = useRef({ x: -300, y: -300 });
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const explosionsRef = useRef<ExplosionShockwave[]>([]);
  const scrollYRef = useRef(0);
  const smoothPhaseRef = useRef(0);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;
    const CELL = 7;
    let animId: number;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY || 0;
    };

    resize();
    handleScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const BRAND_COLORS = ["#7c3aed", "#2563eb", "#16a34a", "#f97316"]; // Purple, Blue, Green, Orange

    // Trigger Full-Screen Geometric Expanding Circle & Shattering Field across ALL screens
    const triggerExplosion = (ex: number, ey: number) => {
      const now = performance.now() / 1000;
      // Dynamic hypotenuse guarantees 100% full screen coverage on any device/resolution
      const fullScreenRadius = Math.hypot(window.innerWidth, window.innerHeight) * 1.45;

      explosionsRef.current.push({
        x: ex,
        y: ey,
        startTime: now,
        duration: 1.65, // Full lifecycle duration
        maxRadius: fullScreenRadius,
      });

      // Haptic vibration on supported mobile devices
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        try {
          navigator.vibrate([35, 30, 45]);
        } catch {
          // Ignore if restricted
        }
      }

      if (explosionsRef.current.length > 5) {
        explosionsRef.current.shift();
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now() / 1000;
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const pts = trailPointsRef.current;
      const last = pts[pts.length - 1];
      if (!last || Math.hypot(e.clientX - last.x, e.clientY - last.y) > 5) {
        pts.push({
          x: e.clientX,
          y: e.clientY,
          time: now,
          phase: smoothPhaseRef.current,
        });
        if (pts.length > 10) pts.shift();
      }

      const target = (e.target as HTMLElement)?.closest(
        "[data-cursor-arrow], a, button, .cs, .step, h1, h2, input, select, textarea"
      );
      if (target) {
        setIsHoveringClickable(true);
        const customLabel = target.getAttribute("data-cursor-label");
        if (customLabel) {
          setHoverLabel(customLabel);
        } else if (["a", "button"].includes(target.tagName.toLowerCase())) {
          setHoverLabel("↗");
        } else if (target.classList.contains("step")) {
          setHoverLabel("✦");
        } else if (["input", "select", "textarea"].includes(target.tagName.toLowerCase())) {
          setHoverLabel(null);
        } else {
          setHoverLabel("→");
        }
      } else {
        setIsHoveringClickable(false);
        setHoverLabel(null);
      }
    };

    const handlePointerDown = () => setIsClicking(true);
    const handlePointerUp = () => setIsClicking(false);

    // Global Double-Click Explosion Trigger across Whole Page
    const handleDblClick = (e: MouseEvent) => {
      triggerExplosion(e.clientX, e.clientY);
    };

    // Mobile double-tap & touch support for all screen sizes
    let lastTap = 0;
    let tapX = 0;
    let tapY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t0 = e.touches[0];
        const now = performance.now();
        const dist = Math.hypot(t0.clientX - tapX, t0.clientY - tapY);
        
        mouseRef.current = { x: t0.clientX, y: t0.clientY };
        setIsVisible(true);

        if (now - lastTap < 350 && dist < 45) {
          triggerExplosion(t0.clientX, t0.clientY);
          lastTap = 0;
        } else {
          lastTap = now;
          tapX = t0.clientX;
          tapY = t0.clientY;
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t0 = e.touches[0];
        const now = performance.now() / 1000;
        mouseRef.current = { x: t0.clientX, y: t0.clientY };
        setIsVisible(true);

        const pts = trailPointsRef.current;
        const last = pts[pts.length - 1];
        if (!last || Math.hypot(t0.clientX - last.x, t0.clientY - last.y) > 5) {
          pts.push({
            x: t0.clientX,
            y: t0.clientY,
            time: now,
            phase: smoothPhaseRef.current,
          });
          if (pts.length > 10) pts.shift();
        }
      }
    };

    const handleTouchEnd = () => {
      setIsClicking(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("dblclick", handleDblClick);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    document.addEventListener("mouseleave", () => {
      setIsVisible(false);
      trailPointsRef.current = [];
    });

    const distToSegment = (px: number, py: number, ax: number, ay: number, bx: number, by: number) => {
      const dx = bx - ax;
      const dy = by - ay;
      const lenSq = dx * dx + dy * dy;
      if (lenSq === 0) return Math.hypot(px - ax, py - ay);
      let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
      t = Math.max(0, Math.min(1, t));
      const projX = ax + t * dx;
      const projY = ay + t * dy;
      return Math.hypot(px - projX, py - projY);
    };

    const render = (ts: number) => {
      ctx.clearRect(0, 0, W, H);
      const now = performance.now() / 1000;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Ultra-smooth lag follow for seamless cohesion between cursor and ribbon
      trailRef.current.x += (mx - trailRef.current.x) * 0.28;
      trailRef.current.y += (my - trailRef.current.y) * 0.28;
      const tx = trailRef.current.x;
      const ty = trailRef.current.y;

      const targetPhase = scrollYRef.current / 280.0;
      smoothPhaseRef.current += (targetPhase - smoothPhaseRef.current) * 0.085;
      const curPhase = smoothPhaseRef.current;

      const maxAge = 0.22;
      const pts = trailPointsRef.current;
      while (pts.length > 0 && now - pts[0].time > maxAge) {
        pts.shift();
      }

      // ==========================================
      // 1. RENDER GLOBAL DOUBLE-CLICK EXPLOSIONS
      // ==========================================
      const activeExplosions = explosionsRef.current;
      for (let eIdx = activeExplosions.length - 1; eIdx >= 0; eIdx--) {
        const exp = activeExplosions[eIdx];
        const age = now - exp.startTime;
        const progress = age / exp.duration;

        if (progress >= 1.0) {
          activeExplosions.splice(eIdx, 1);
          continue;
        }

        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic out
        const currentRadius = exp.maxRadius * easeProgress;
        const shockAlpha = Math.max(0, 1 - progress);

        // High-frequency mini-second vibration screen shake during initial expansion
        const shakeAmp = Math.max(0, 1 - progress / 0.26) * 6.5;
        const shakeX = shakeAmp > 0.01 ? (Math.sin(ts * 0.15) * 0.6 + (Math.random() - 0.5) * 0.4) * shakeAmp : 0;
        const shakeY = shakeAmp > 0.01 ? (Math.cos(ts * 0.17) * 0.6 + (Math.random() - 0.5) * 0.4) * shakeAmp : 0;

        ctx.save();
        if (shakeAmp > 0.01) {
          ctx.translate(shakeX, shakeY);
        }

        // =========================================================================
        // FULL-SCREEN GEOMETRIC CIRCLE EXPANSION (media_1787599006211.png)
        // FOLLOWED BY ENDING SCATTERED PIXEL FIELD (media_1787598977876.png)
        // BRAND COLORS ONLY: Purple, Blue, Green, Orange
        // =========================================================================
        const maxR = currentRadius + CELL;
        const boxMinX = Math.max(0, Math.floor((exp.x - maxR) / CELL) * CELL);
        const boxMaxX = Math.min(W, Math.ceil((exp.x + maxR) / CELL) * CELL);
        const boxMinY = Math.max(0, Math.floor((exp.y - maxR) / CELL) * CELL);
        const boxMaxY = Math.min(H, Math.ceil((exp.y + maxR) / CELL) * CELL);

        const isShattering = progress >= 0.45;
        const shatterProgress = isShattering ? (progress - 0.45) / 0.55 : 0;

        for (let py = boxMinY; py <= boxMaxY; py += CELL) {
          for (let px = boxMinX; px <= boxMaxX; px += CELL) {
            const cx = px + CELL / 2;
            const cy = py + CELL / 2;
            const dx = cx - exp.x;
            const dy = cy - exp.y;
            const dist = Math.hypot(dx, dy);

            if (dist <= maxR) {
              const normDist = dist / currentRadius;
              const pHash = Math.abs(Math.sin((px * 12.9898 + py * 78.233) * 0.13 + exp.startTime));

              // --- 1. ENDING SCATTERED PARTICLE FIELD (Brand Colors Only) ---
              if (isShattering) {
                const keepProb = (1 - shatterProgress * 0.85) * (0.85 - pHash * 0.25);
                if (pHash > keepProb) continue;

                let col = "#F97316"; // Orange
                if (pHash < 0.25) {
                  col = "#7C3AED"; // Purple
                } else if (pHash < 0.50) {
                  col = "#2563EB"; // Blue
                } else if (pHash < 0.75) {
                  col = "#16A34A"; // Green
                } else {
                  col = "#F97316"; // Orange
                }

                ctx.save();
                ctx.globalAlpha = Math.max(0, 1 - shatterProgress) * 0.92;
                ctx.fillStyle = col;
                ctx.fillRect(px, py, CELL - 1, CELL - 1);
                ctx.restore();
                continue;
              }

              // --- 2. CLEAN GEOMETRIC CONCENTRIC CIRCLE (Purple, Blue, Green, Orange) ---
              if (normDist > 1.0) continue;

              // Pixel Smiley Face at upper right quadrant
              const smileyRelX = (dx - currentRadius * 0.55) / CELL;
              const smileyRelY = (dy + currentRadius * 0.55) / CELL;
              const isEyeL = Math.abs(smileyRelX + 2) < 0.6 && Math.abs(smileyRelY) < 0.6;
              const isEyeR = Math.abs(smileyRelX - 2) < 0.6 && Math.abs(smileyRelY) < 0.6;
              const isMouth = Math.abs(smileyRelY - 2) < 0.6 && Math.abs(smileyRelX) <= 2;
              const isSmileyPixel = isEyeL || isEyeR || isMouth;

              let col = "#F97316"; // Orange main body

              if (isSmileyPixel && normDist < 0.85) {
                col = "#0A0A0A"; // Black smiley features
              } else if (normDist > 0.93) {
                // Outermost Ring: Purple
                col = "#7C3AED";
              } else if (normDist > 0.85) {
                // Secondary Ring: Blue
                col = "#2563EB";
              } else if (normDist > 0.77) {
                // Third Ring: Green
                col = "#16A34A";
              } else if (normDist <= 0.06) {
                // Center Core Dot: Green
                col = "#16A34A";
              } else {
                // Inner Disc: Orange
                col = "#F97316";
              }

              ctx.save();
              ctx.globalAlpha = shockAlpha * 0.96;
              ctx.fillStyle = col;
              ctx.fillRect(px, py, CELL - 1, CELL - 1);
              ctx.restore();
            }
          }
        }

        ctx.restore();
      }

      // ==========================================
      // 2. RENDER CONCENTRIC DISK CURSOR & RIBBON
      // ==========================================
      if (isVisible && mx > -100 && my > -100) {
        // Responsive disk sizing
        const isMobile = W < 640;
        const baseRadius = isHoveringClickable ? (isMobile ? 26 : 32) : (isMobile ? 20 : 25);
        const pulse = 1 + Math.sin(curPhase * Math.PI) * 0.10;
        const headRadius = baseRadius * pulse;

        let minX = tx - headRadius - 10;
        let maxX = tx + headRadius + 10;
        let minY = ty - headRadius - 10;
        let maxY = ty + headRadius + 10;

        for (let i = 0; i < pts.length; i++) {
          minX = Math.min(minX, pts[i].x - headRadius - 8);
          maxX = Math.max(maxX, pts[i].x + headRadius + 8);
          minY = Math.min(minY, pts[i].y - headRadius - 8);
          maxY = Math.max(maxY, pts[i].y + headRadius + 8);
        }

        const gridMinX = Math.max(0, Math.floor(minX / CELL) * CELL);
        const gridMaxX = Math.min(W, Math.ceil(maxX / CELL) * CELL);
        const gridMinY = Math.max(0, Math.floor(minY / CELL) * CELL);
        const gridMaxY = Math.min(H, Math.ceil(maxY / CELL) * CELL);

        ctx.save();

        for (let py = gridMinY; py <= gridMaxY; py += CELL) {
          for (let px = gridMinX; px <= gridMaxX; px += CELL) {
            const cx = px + CELL / 2;
            const cy = py + CELL / 2;

            const dx = cx - tx;
            const dy = cy - ty;

            const dCircle = Math.hypot(dx, dy);
            const dOctagon = Math.max(
              dCircle * 0.72,
              Math.max(Math.abs(dx), Math.abs(dy)),
              (Math.abs(dx) + Math.abs(dy)) * 0.71
            ) * 1.05;
            const dDiamond = (Math.abs(dx) + Math.abs(dy)) * 0.73;
            const dSquare = Math.max(Math.abs(dx), Math.abs(dy)) * 1.05;
            const dHexagon = Math.max(
              Math.abs(dy),
              Math.abs(dx) * 0.866 + Math.abs(dy) * 0.5
            ) * 1.06;
            const dArrow = Math.max(
              Math.abs(dx) * 1.1 + (dy > 0 ? dy * 0.45 : -dy * 1.25),
              Math.abs(dx) * 0.8
            );
            const dStar = Math.min(
              Math.hypot(dx * 2.1, dy),
              Math.hypot(dx, dy * 2.1)
            ) * 1.12;
            const dTriangle = Math.max(
              dy * 1.2,
              Math.abs(dx) * 1.15 - dy * 0.6
            ) * 1.14;

            const shapes = [
              dCircle,
              dOctagon,
              dDiamond,
              dSquare,
              dHexagon,
              dArrow,
              dStar,
              dTriangle,
            ];
            const totalShapes = shapes.length;
            const normPhase = ((curPhase % totalShapes) + totalShapes) % totalShapes;
            const idx1 = Math.floor(normPhase);
            const idx2 = (idx1 + 1) % totalShapes;
            const frac = normPhase - idx1;
            const easeFrac = 0.5 - 0.5 * Math.cos(frac * Math.PI);
            const headDist = shapes[idx1] * (1 - easeFrac) + shapes[idx2] * easeFrac;

            let minTrailDist = Infinity;
            let trailFactor = 0;

            if (pts.length > 1) {
              for (let i = 0; i < pts.length - 1; i++) {
                const p1 = pts[i];
                const p2 = pts[i + 1];
                const segDist = distToSegment(cx, cy, p1.x, p1.y, p2.x, p2.y);
                const segProgress = (i + 1) / pts.length;
                const segRadius = headRadius * (0.45 + 0.35 * segProgress);

                if (segDist < segRadius && segDist < minTrailDist) {
                  minTrailDist = segDist;
                  trailFactor = segProgress;
                }
              }
              const lastPt = pts[pts.length - 1];
              const leadDist = distToSegment(cx, cy, lastPt.x, lastPt.y, tx, ty);
              if (leadDist < headRadius * 0.7 && leadDist < minTrailDist) {
                minTrailDist = leadDist;
                trailFactor = 1.0;
              }
            }

            if (headDist <= headRadius) {
              const normDist = headDist / headRadius;
              const angle = Math.atan2(dy, dx);
              let col = "#16A34A";

              if (normDist > 0.82) {
                col = "#7C3AED"; // Purple outer
              } else if (normDist > 0.66) {
                col = "#2563EB"; // Blue ring
              } else if (normDist > 0.30) {
                const angleMod = Math.abs(Math.sin(angle * 4));
                const isCardinal = angleMod < 0.32;
                const isDiagonal = angleMod > 0.88;

                if (normDist > 0.40 && normDist < 0.62 && (isCardinal || isDiagonal)) {
                  col = "#F97316"; // Orange accents
                } else {
                  col = "#16A34A"; // Green
                }
              } else if (normDist > 0.16) {
                const innerPattern = Math.cos(angle * 4 + ts * 0.003);
                col = innerPattern > 0 ? "#7C3AED" : "#2563EB";
              } else {
                col = "#16A34A";
              }

              ctx.fillStyle = col;
              ctx.fillRect(px, py, CELL - 1, CELL - 1);

            } else if (minTrailDist < headRadius * (0.45 + 0.35 * trailFactor)) {
              const trailRadius = headRadius * (0.45 + 0.35 * trailFactor);
              const trailNorm = minTrailDist / trailRadius;

              let col = "#2563EB";
              if (trailNorm > 0.72) {
                col = "#7C3AED";
              } else if (trailFactor > 0.85 && trailNorm < 0.4) {
                col = "#16A34A";
              }

              ctx.fillStyle = col;
              ctx.fillRect(px, py, CELL - 1, CELL - 1);
            }
          }
        }
        ctx.restore();

        // Rotating 4-Segment Gradient Cursor Ring
        ctx.save();
        const ringR = (isHoveringClickable ? 10 : 8) * Math.min(1.15, pulse);
        const ringW = 1.8;
        ctx.translate(tx, ty);
        ctx.rotate(ts * 0.003 + curPhase * 0.6);

        for (let i = 0; i < 4; i++) {
          const startA = (Math.PI * 2 * i) / 4 + 0.14;
          const endA = (Math.PI * 2 * (i + 1)) / 4 - 0.14;
          ctx.strokeStyle = BRAND_COLORS[i];
          ctx.lineWidth = ringW;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.arc(0, 0, ringR, startA, endA);
          ctx.stroke();
        }
        ctx.restore();

        // Center Dark Cursor Dot
        ctx.save();
        ctx.fillStyle = "#0A0A0A";
        ctx.beginPath();
        ctx.arc(mx, my, isClicking ? 1.8 : 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("dblclick", handleDblClick);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isHoveringClickable, isClicking]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9998]"
        aria-hidden="true"
      />

      {isVisible && hoverLabel && (
        <div
          className={`fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out ${
            isClicking ? "scale-90" : "scale-100"
          }`}
          style={{
            left: `${mouseRef.current.x + 18}px`,
            top: `${mouseRef.current.y + 18}px`,
          }}
        >
          <div className="bg-[#0A0A0A] text-white px-2.5 py-1 text-[11px] font-mono tracking-wider pixel-clip-sm shadow-xl flex items-center gap-1.5 border border-white/10 animate-arrow-pulse">
            <span className="text-[#7c3aed] font-bold">▶</span>
            <span>{hoverLabel}</span>
          </div>
        </div>
      )}
    </>
  );
};
