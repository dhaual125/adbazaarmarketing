"use client";

import React, { useEffect, useRef } from "react";

const PIXEL = 9.5;
const GAP = 1.5;
const STEP = PIXEL + GAP;
const GRID_ROWS = 10;

// Bold Lowercase Pixel Bitmaps with 2-Pixel Solid Stems & Bars
type GlyphMap = Array<{ r: number; c: number }>;

const BOLD_LOWER_GLYPHS: Record<string, { width: number; dots: GlyphMap }> = {
  a: {
    width: 6,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 },
    ],
  },
  b: {
    width: 6,
    dots: [
      { r: 0, c: 0 }, { r: 0, c: 1 },
      { r: 1, c: 0 }, { r: 1, c: 1 },
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 },
    ],
  },
  c: {
    width: 6,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 0 }, { r: 3, c: 1 },
      { r: 4, c: 0 }, { r: 4, c: 1 },
      { r: 5, c: 0 }, { r: 5, c: 1 },
      { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 },
    ],
  },
  d: {
    width: 6,
    dots: [
      { r: 0, c: 4 }, { r: 0, c: 5 },
      { r: 1, c: 4 }, { r: 1, c: 5 },
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 },
    ],
  },
  e: {
    width: 6,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 },
      { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 },
    ],
  },
  g: {
    width: 6,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 4 }, { r: 6, c: 5 },
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 4 }, { r: 7, c: 5 },
      { r: 8, c: 1 }, { r: 8, c: 2 }, { r: 8, c: 3 }, { r: 8, c: 4 },
    ],
  },
  h: {
    width: 6,
    dots: [
      { r: 0, c: 0 }, { r: 0, c: 1 },
      { r: 1, c: 0 }, { r: 1, c: 1 },
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 4 }, { r: 6, c: 5 },
    ],
  },
  i: {
    width: 3,
    dots: [
      { r: 0, c: 0 }, { r: 0, c: 1 },
      { r: 2, c: 0 }, { r: 2, c: 1 },
      { r: 3, c: 0 }, { r: 3, c: 1 },
      { r: 4, c: 0 }, { r: 4, c: 1 },
      { r: 5, c: 0 }, { r: 5, c: 1 },
      { r: 6, c: 0 }, { r: 6, c: 1 },
    ],
  },
  l: {
    width: 3,
    dots: [
      { r: 0, c: 0 }, { r: 0, c: 1 },
      { r: 1, c: 0 }, { r: 1, c: 1 },
      { r: 2, c: 0 }, { r: 2, c: 1 },
      { r: 3, c: 0 }, { r: 3, c: 1 },
      { r: 4, c: 0 }, { r: 4, c: 1 },
      { r: 5, c: 0 }, { r: 5, c: 1 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 2 },
    ],
  },
  n: {
    width: 6,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 4 }, { r: 6, c: 5 },
    ],
  },
  o: {
    width: 6,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 },
    ],
  },
  p: {
    width: 6,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 },
      { r: 6, c: 0 }, { r: 6, c: 1 },
      { r: 7, c: 0 }, { r: 7, c: 1 },
      { r: 8, c: 0 }, { r: 8, c: 1 },
    ],
  },
  r: {
    width: 5,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 3 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 1 },
      { r: 5, c: 0 }, { r: 5, c: 1 },
      { r: 6, c: 0 }, { r: 6, c: 1 },
    ],
  },
  s: {
    width: 6,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 0 }, { r: 3, c: 1 },
      { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 },
      { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 },
    ],
  },
  t: {
    width: 5,
    dots: [
      { r: 1, c: 1 }, { r: 1, c: 2 },
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 1 }, { r: 3, c: 2 },
      { r: 4, c: 1 }, { r: 4, c: 2 },
      { r: 5, c: 1 }, { r: 5, c: 2 },
      { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 },
    ],
  },
  u: {
    width: 6,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 },
    ],
  },
  w: {
    width: 8,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 6 }, { r: 2, c: 7 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 6 }, { r: 3, c: 7 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 6 }, { r: 4, c: 7 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 6 }, { r: 5, c: 7 },
      { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 5 }, { r: 6, c: 6 },
    ],
  },
  y: {
    width: 6,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 4 }, { r: 6, c: 5 },
      { r: 7, c: 3 }, { r: 7, c: 4 },
      { r: 8, c: 1 }, { r: 8, c: 2 }, { r: 8, c: 3 },
    ],
  },
  ".": {
    width: 3,
    dots: [
      { r: 5, c: 0 }, { r: 5, c: 1 },
      { r: 6, c: 0 }, { r: 6, c: 1 },
    ],
  },
  " ": {
    width: 4,
    dots: [],
  },
};

interface CharDot {
  col: number;
  row: number;
}

const PHRASE_TEXT = "your brand. our strategy. real growth.   your brand. our strategy. real growth.   ";

function buildExactDots(text: string): { dots: CharDot[]; totalCols: number } {
  const dots: CharDot[] = [];
  let cursor = 0;

  for (const char of text.toLowerCase()) {
    const glyph = BOLD_LOWER_GLYPHS[char] ?? BOLD_LOWER_GLYPHS[" "];
    for (const d of glyph.dots) {
      dots.push({
        col: cursor + d.c,
        row: d.r,
      });
    }
    cursor += glyph.width + 2; // Spacing between letters
  }

  return { dots, totalCols: cursor };
}

export const PixelMarquee: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const BASE_H = GRID_ROWS * STEP;
    const PADDING_Y = 18;
    const H_PX = BASE_H + PADDING_Y * 2;

    const { dots, totalCols } = buildExactDots(PHRASE_TEXT);
    const totalW = totalCols * STEP;

    cv.width = Math.round(totalW * DPR);
    cv.height = Math.round(H_PX * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    let offsetX = 0;
    let animId: number;
    let t = 0;

    // Exact 4-color palette requested: Purple, Blue, Green, Orange
    const getFourColor = (c: number, r: number, time: number) => {
      const v =
        Math.sin(c * 0.32 - time * 1.6) * 0.5 +
        Math.cos(r * 0.55 + c * 0.18 + time * 1.2) * 0.5 +
        Math.sin((c + r) * 0.22 - time * 0.9) * 0.3;

      if (v > 0.45) return "#7C3AED"; // Royal Purple
      if (v > 0.12) return "#2563EB"; // Electric Blue
      if (v > -0.22) return "#16A34A"; // Emerald Green
      return "#F97316"; // Vivid Orange
    };

    const draw = () => {
      t += 0.03;

      ctx.clearRect(0, 0, totalW, H_PX);

      // Subtle background grid
      ctx.strokeStyle = "rgba(0, 0, 0, 0.025)";
      ctx.lineWidth = 1;
      for (let x = 0; x < totalW; x += STEP) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, H_PX);
        ctx.stroke();
      }
      for (let y = 0; y < H_PX; y += STEP) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(totalW, y + 0.5);
        ctx.stroke();
      }

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const x = (dot.col * STEP + totalW - offsetX) % totalW;
        // Flat, clean vertical alignment (no wave/dance bounce)
        const y = PADDING_Y + dot.row * STEP;

        // Dynamic 4-color fill: Purple, Blue, Green, Orange
        ctx.fillStyle = getFourColor(dot.col, dot.row, t);

        // Solid, bold pixel dot square
        ctx.fillRect(x, y, PIXEL, PIXEL);
      }

      // Fast, smooth horizontal marquee slider speed
      const speed = 2.4;
      offsetX = (offsetX + speed) % totalW;

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const H_PX = GRID_ROWS * STEP + 36;

  return (
    <div className="w-full overflow-hidden" style={{ height: `${H_PX}px`, position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          height: `${H_PX}px`,
          imageRendering: "pixelated",
        }}
        aria-label="your brand. our strategy. real growth."
      />
    </div>
  );
};
