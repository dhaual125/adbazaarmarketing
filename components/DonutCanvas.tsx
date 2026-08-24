"use client";

import React, { useEffect, useRef, useState } from "react";

interface DonutCanvasProps {
  kind: "explore" | "generate" | "refine" | "scale" | "truth" | "skills" | "output" | "check";
  numberLabel: string;
  title: string;
  desc: string;
  badgeBg?: string;
}

export const DonutCanvas: React.FC<DonutCanvasProps> = ({
  kind,
  numberLabel,
  title,
  desc,
  badgeBg = "bg-[#7c3aed]",
}) => {
  const cvRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const cv = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let animId: number;
    let t = Math.random() * 1000;

    const PX = 6;
    const COLORS = {
      purple: "#a855f7",
      green: "#22c55e",
      orange: "#f97316",
      blue: "#2563eb",
      navy: "#1e293b",
    };

    const resize = () => {
      const parent = cv.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.width < 2) return;
      W = rect.width;
      H = rect.width;
      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handlePointerLeave = () => {
      mousePosRef.current = { x: -1000, y: -1000 };
    };

    cv.addEventListener("pointermove", handlePointerMove);
    cv.addEventListener("pointerleave", handlePointerLeave);

    // Initial 3D points for Explore
    const explorePoints: Array<{ x: number; y: number; z: number; color: string }> = [];
    const colorList = [COLORS.purple, COLORS.green, COLORS.orange, COLORS.blue];
    for (let i = 0; i < 36; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 0.25 + Math.random() * 0.65;
      explorePoints.push({
        x: Math.sin(phi) * Math.cos(theta) * rad,
        y: Math.sin(phi) * Math.sin(theta) * rad,
        z: Math.cos(phi) * rad,
        color: colorList[i % colorList.length],
      });
    }

    // Refine points
    const refinePoints: Array<{ ox: number; oy: number; tx: number; ty: number; color: string }> = [];
    for (let i = 0; i < 20; i++) {
      refinePoints.push({
        ox: (Math.random() - 0.5) * 1.5,
        oy: (Math.random() - 0.5) * 1.5,
        tx: ((i % 4) - 1.5) * 0.45,
        ty: (Math.floor(i / 4) - 2) * 0.45,
        color: colorList[i % colorList.length],
      });
    }

    const render = () => {
      t += 16;
      ctx.clearRect(0, 0, W, H);
      const tt = t * 0.0014;
      const cx = W / 2;
      const cy = H / 2;
      const R = W * 0.38;

      if (kind === "explore") {
        // 01 Explore: 3D orbiting multicolored particle constellation
        const cosY = Math.cos(tt * 0.9);
        const sinY = Math.sin(tt * 0.9);
        const cosX = Math.cos(tt * 0.45);
        const sinX = Math.sin(tt * 0.45);

        for (const pt of explorePoints) {
          const x1 = pt.x * cosY + pt.z * sinY;
          const z1 = -pt.x * sinY + pt.z * cosY;
          const y1 = pt.y * cosX - z1 * sinX;

          const scale = (z1 + 2) / 2.5;
          const px = cx + x1 * R * scale;
          const py = cy + y1 * R * scale;

          ctx.fillStyle = pt.color;
          const sz = Math.max(3, Math.round(PX * scale));
          ctx.fillRect(Math.round(px / PX) * PX, Math.round(py / PX) * PX, sz - 1, sz - 1);
        }
      } else if (kind === "generate") {
        // 02 Generate: Matrix dots + Diagonal Heatmap Pill on hover (as shown in user screenshot!)
        const rowsCount = 3;
        const colsCount = 4;
        const spacingX = W * 0.18;
        const spacingY = H * 0.2;

        // Draw background grid pairs
        for (let r = 0; r < rowsCount; r++) {
          for (let c = 0; c < colsCount; c++) {
            const px1 = cx + (c - (colsCount - 1) / 2) * spacingX;
            const py1 = cy + (r - (rowsCount - 1) / 2) * spacingY;

            ctx.fillStyle = COLORS.navy;
            ctx.fillRect(Math.round(px1 / PX) * PX, Math.round(py1 / PX) * PX, PX - 1, PX - 1);

            const px2 = px1 + PX * 1.5;
            ctx.fillStyle = COLORS.orange;
            ctx.fillRect(Math.round(px2 / PX) * PX, Math.round(py1 / PX) * PX, PX - 1, PX - 1);
          }
        }

        // Draw diagonal heatmap capsule aura matching user screenshot!
        const hoverX = mousePosRef.current.x > 0 ? mousePosRef.current.x : cx - 10;
        const hoverY = mousePosRef.current.y > 0 ? mousePosRef.current.y : cy;

        const capsuleAngle = Math.PI / 4 + Math.sin(tt * 0.5) * 0.1;
        const capLength = W * 0.35;
        const capRadius = W * 0.16;

        for (let dy = -capRadius * 1.5; dy <= capRadius * 1.5; dy += PX) {
          for (let dx = -capLength; dx <= capLength; dx += PX) {
            // Rotate coordinates into capsule frame
            const rx = dx * Math.cos(capsuleAngle) - dy * Math.sin(capsuleAngle);
            const ry = dx * Math.sin(capsuleAngle) + dy * Math.cos(capsuleAngle);

            const distFromAxis = Math.abs(dy);
            const distFromCenter = Math.abs(dx);

            if (distFromAxis <= capRadius && distFromCenter <= capLength) {
              const normDist = Math.max(distFromAxis / capRadius, distFromCenter / capLength);
              const px = hoverX + rx;
              const py = hoverY + ry;

              if (px >= 0 && px <= W && py >= 0 && py <= H) {
                let col = COLORS.purple;
                if (normDist < 0.28) {
                  col = COLORS.orange;
                } else if (normDist < 0.55) {
                  col = COLORS.green;
                } else if (normDist < 0.78) {
                  col = COLORS.blue;
                } else {
                  col = COLORS.purple;
                }

                ctx.fillStyle = col;
                ctx.fillRect(Math.round(px / PX) * PX, Math.round(py / PX) * PX, PX - 1, PX - 1);
              }
            }
          }
        }
      } else if (kind === "refine") {
        // 03 Refine: Oscillating ordered-to-disordered dot matrix
        const cycle = Math.sin(tt * 1.6) * 0.5 + 0.5;

        for (const pt of refinePoints) {
          const curX = pt.ox + (pt.tx - pt.ox) * cycle;
          const curY = pt.oy + (pt.ty - pt.oy) * cycle;
          const px = cx + curX * R;
          const py = cy + curY * R;

          ctx.fillStyle = pt.color;
          ctx.fillRect(Math.round(px / PX) * PX, Math.round(py / PX) * PX, PX - 1, PX - 1);
        }
      } else if (kind === "scale") {
        // 04 Scale: 3D Pixel Donut / Torus matching screenshot
        const donutCell = 8;
        const radiusOuter = Math.floor(R / donutCell);
        const radiusInner = Math.floor(radiusOuter * 0.56);
        const radiusMid = Math.floor((radiusOuter + radiusInner) / 2);

        for (let dy = -radiusOuter; dy <= radiusOuter; dy++) {
          for (let dx = -radiusOuter; dx <= radiusOuter; dx++) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= radiusOuter && dist >= radiusInner) {
              const px = cx + dx * donutCell;
              const py = cy + dy * donutCell;

              let col = COLORS.blue;
              if (dist <= radiusInner + 0.9) {
                col = COLORS.orange;
              } else if (dist <= radiusMid + 0.9) {
                col = COLORS.green;
              } else {
                col = COLORS.blue;
              }

              // 3D dynamic shading
              const angle = Math.atan2(dy, dx) + tt * 1.2;
              if (Math.sin(angle * 2) > 0.4 && (dx + dy) % 3 === 0) {
                col = COLORS.orange;
              }

              ctx.fillStyle = col;
              ctx.fillRect(Math.round(px / donutCell) * donutCell, Math.round(py / donutCell) * donutCell, donutCell - 1, donutCell - 1);
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      cv.removeEventListener("pointermove", handlePointerMove);
      cv.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [kind]);

  return (
    <div
      className="step flex flex-col gap-3 group relative transition-opacity duration-300 hover:opacity-100 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="donut relative aspect-square overflow-hidden bg-transparent mb-2">
        <canvas ref={cvRef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />
      </div>
      <div className="dl flex items-center gap-2">
        <span className={`dn inline-flex items-center justify-center px-2 py-0.5 rounded-full ${badgeBg} text-white font-mono text-[11px] font-medium tracking-wide`}>
          {numberLabel}
        </span>
        <span className="dt text-[16px] font-bold text-[#0A0A0A] tracking-tight">{title}</span>
      </div>
      <p className="dd m-0 text-[14px] leading-[1.55] text-[#2a2a2a]">{desc}</p>
    </div>
  );
};
