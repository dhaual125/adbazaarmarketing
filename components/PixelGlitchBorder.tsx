"use client";

import React, { useEffect, useRef } from "react";

export type GlitchThemeType =
  | "meta-ads"
  | "google-ads"
  | "ad-videos"
  | "social-media"
  | "leads-management"
  | "growth-scaling"
  | "default";

interface PixelGlitchBorderProps {
  isHovered: boolean;
  type?: string;
  cellSize?: number;
}

const THEME_PALETTES: Record<string, string[]> = {
  "meta-ads": [
    "rgba(0, 129, 251, 0.90)",   // Meta Electric Blue
    "rgba(24, 119, 242, 0.80)",  // Meta Royal Blue
    "rgba(66, 103, 178, 0.75)",  // Classic Facebook Blue
    "rgba(147, 197, 253, 0.85)", // Soft Ice Blue highlight
    "rgba(10, 10, 10, 0.85)",    // Deep Black
    "rgba(255, 255, 255, 0.95)", // Pure White glint
  ],
  "google-ads": [
    "rgba(66, 133, 244, 0.90)",  // Google Blue
    "rgba(234, 67, 53, 0.85)",   // Google Red
    "rgba(251, 188, 5, 0.85)",   // Google Yellow
    "rgba(52, 168, 83, 0.85)",   // Google Green
    "rgba(10, 10, 10, 0.85)",    // Deep Black
    "rgba(255, 255, 255, 0.95)", // White highlight
  ],
  "ad-videos": [
    "rgba(124, 58, 237, 0.90)",  // Brand Purple
    "rgba(168, 85, 247, 0.80)",  // Bright Violet
    "rgba(236, 72, 153, 0.80)",  // Neon Pink
    "rgba(216, 180, 254, 0.85)", // Lavender glow
    "rgba(10, 10, 10, 0.85)",    // Deep Black
    "rgba(255, 255, 255, 0.95)", // White glint
  ],
  "social-media": [
    "rgba(225, 48, 108, 0.90)",  // Instagram Magenta
    "rgba(253, 29, 29, 0.85)",   // Sunset Red
    "rgba(247, 119, 55, 0.85)",  // Sunset Orange
    "rgba(131, 58, 180, 0.80)",  // Sunset Purple
    "rgba(10, 10, 10, 0.85)",    // Deep Black
    "rgba(255, 255, 255, 0.95)", // White
  ],
  "leads-management": [
    "rgba(22, 163, 74, 0.90)",   // Emerald Green
    "rgba(34, 197, 94, 0.80)",   // Bright Neon Green
    "rgba(13, 148, 136, 0.80)",  // Teal Matrix
    "rgba(187, 247, 208, 0.85)", // Mint highlight
    "rgba(10, 10, 10, 0.85)",    // Deep Black
    "rgba(255, 255, 255, 0.95)", // White
  ],
  "growth-scaling": [
    "rgba(249, 115, 22, 0.90)",  // Bright Orange
    "rgba(234, 88, 12, 0.85)",   // Deep Copper
    "rgba(245, 158, 11, 0.85)",  // Warm Amber
    "rgba(254, 215, 170, 0.85)", // Peach highlight
    "rgba(10, 10, 10, 0.85)",    // Deep Black
    "rgba(255, 255, 255, 0.95)", // White
  ],
  "default": [
    "rgba(10, 10, 10, 0.85)",
    "rgba(249, 115, 22, 0.75)",
    "rgba(37, 99, 235, 0.70)",
    "rgba(124, 58, 237, 0.65)",
    "rgba(255, 255, 255, 0.85)",
  ],
};

export const PixelGlitchBorder: React.FC<PixelGlitchBorderProps> = ({
  isHovered,
  type = "default",
  cellSize = 8,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoverFactorRef = useRef(0);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let animId: number;
    let frame = 0;

    const resize = () => {
      const parent = cv.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Select color palette specifically matched to this card's theme
    const PALETTE = THEME_PALETTES[type] || THEME_PALETTES["default"];
    const CELL = cellSize;

    const render = () => {
      frame++;
      // Smooth liquid hover transition
      const targetHover = isHovered ? 1.0 : 0.0;
      hoverFactorRef.current += (targetHover - hoverFactorRef.current) * 0.12;
      const hov = hoverFactorRef.current;

      ctx.clearRect(0, 0, W, H);

      if (hov > 0.01 && W > 0 && H > 0) {
        const cols = Math.ceil(W / CELL);
        const rows = Math.ceil(H / CELL);

        // Controlled rhythmic digital pulse (craft.wild.as tempo)
        const pulseCycle = Math.floor(frame / 4);
        const timeSeed = pulseCycle * 13.37;

        // Subtle 1-2 cell border depth (16px max)
        const maxEdgeDepth = 3;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const distLeft = c;
            const distRight = cols - 1 - c;
            const distTop = r;
            const distBottom = rows - 1 - r;
            const edgeDist = Math.min(distLeft, distRight, distTop, distBottom);

            if (edgeDist < maxEdgeDepth) {
              const isCorner =
                (distLeft < 4 || distRight < 4) && (distTop < 4 || distBottom < 4);
              const depthWeight = Math.pow(1 - edgeDist / maxEdgeDepth, 1.6);

              const hash = Math.abs(
                Math.sin((c * 37.19 + r * 91.73 + timeSeed) * 43758.5453)
              );
              const hashFrac = hash - Math.floor(hash);

              const threshold = (isCorner ? 0.65 : 0.28) * depthWeight * hov;

              if (hashFrac < threshold) {
                const colIdx = Math.floor((hashFrac * 100) % PALETTE.length);
                const col = PALETTE[colIdx];
                const alpha = Math.min(1, (0.6 + hashFrac * 0.4) * hov);

                const px = c * CELL;
                const py = r * CELL;

                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.fillStyle = col;
                ctx.fillRect(px, py, CELL - 1, CELL - 1);
                ctx.restore();
              }
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isHovered, type, cellSize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[4] block"
      aria-hidden="true"
    />
  );
};
