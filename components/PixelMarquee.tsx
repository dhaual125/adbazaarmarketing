"use client";

import React, { useEffect, useRef } from "react";

// Bold, High-Readability Pixel Bitmap Font (Matching media_1787689269397.png)
type GlyphMap = Array<{ r: number; c: number }>;

const BOLD_GLYPHS: Record<string, { width: number; dots: GlyphMap }> = {
  a: {
    width: 6,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 4 }, { r: 6, c: 5 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 },
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
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 4 }, { r: 6, c: 5 },
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 },
    ],
  },
  c: {
    width: 6,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 0 }, { r: 3, c: 1 },
      { r: 4, c: 0 }, { r: 4, c: 1 },
      { r: 5, c: 0 }, { r: 5, c: 1 },
      { r: 6, c: 0 }, { r: 6, c: 1 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 },
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
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 4 }, { r: 6, c: 5 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 },
    ],
  },
  e: {
    width: 6,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 },
      { r: 6, c: 0 }, { r: 6, c: 1 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 },
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
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 4 }, { r: 7, c: 5 },
    ],
  },
  i: {
    width: 3,
    dots: [
      { r: 0, c: 0 }, { r: 0, c: 1 },
      { r: 1, c: 0 }, { r: 1, c: 1 },
      { r: 3, c: 0 }, { r: 3, c: 1 },
      { r: 4, c: 0 }, { r: 4, c: 1 },
      { r: 5, c: 0 }, { r: 5, c: 1 },
      { r: 6, c: 0 }, { r: 6, c: 1 },
      { r: 7, c: 0 }, { r: 7, c: 1 },
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
      { r: 6, c: 0 }, { r: 6, c: 1 },
      { r: 7, c: 0 }, { r: 7, c: 1 },
    ],
  },
  m: {
    width: 8,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 }, { r: 2, c: 6 }, { r: 2, c: 7 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 3 }, { r: 3, c: 4 }, { r: 3, c: 6 }, { r: 3, c: 7 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 6 }, { r: 4, c: 7 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 6 }, { r: 5, c: 7 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 6 }, { r: 6, c: 7 },
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 6 }, { r: 7, c: 7 },
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
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 4 }, { r: 7, c: 5 },
    ],
  },
  o: {
    width: 6,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 4 }, { r: 6, c: 5 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 },
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
      { r: 7, c: 0 }, { r: 7, c: 1 },
    ],
  },
  s: {
    width: 6,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 0 }, { r: 3, c: 1 },
      { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 },
      { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 4 }, { r: 6, c: 5 },
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 },
    ],
  },
  t: {
    width: 5,
    dots: [
      { r: 0, c: 1 }, { r: 0, c: 2 },
      { r: 1, c: 1 }, { r: 1, c: 2 },
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 1 }, { r: 3, c: 2 },
      { r: 4, c: 1 }, { r: 4, c: 2 },
      { r: 5, c: 1 }, { r: 5, c: 2 },
      { r: 6, c: 1 }, { r: 6, c: 2 },
      { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 },
    ],
  },
  u: {
    width: 6,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 5 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 }, { r: 5, c: 5 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 4 }, { r: 6, c: 5 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 },
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
      { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 },
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
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 4 }, { r: 7, c: 5 },
      { r: 8, c: 1 }, { r: 8, c: 2 }, { r: 8, c: 3 }, { r: 8, c: 4 },
    ],
  },
  " ": {
    width: 4,
    dots: [],
  },
  ".": {
    width: 3,
    dots: [
      { r: 6, c: 0 }, { r: 6, c: 1 },
      { r: 7, c: 0 }, { r: 7, c: 1 },
    ],
  },
  ",": {
    width: 3,
    dots: [
      { r: 6, c: 0 }, { r: 6, c: 1 },
      { r: 7, c: 0 }, { r: 7, c: 1 },
      { r: 8, c: 0 },
    ],
  },
};

const PHRASE_TEXT = "your brand, our strategy, real growth. ";

// Strictly Brand 4-Color Palette: Purple, Green, Blue, Orange (Matching Image media_1787689269397.png)
const BRAND_PALETTE = [
  "#7C3AED", // Royal Purple
  "#A855F7", // Bright Violet
  "#2563EB", // Electric Blue
  "#60A5FA", // Sky Blue
  "#16A34A", // Emerald Green
  "#22C55E", // Bright Green
  "#F97316", // Vibrant Orange
  "#FB923C", // Bright Orange
];

interface ParticleDot {
  row: number;
  col: number;
  rIdx: number;
  colorIdx: number;
  dispX: number;
  dispY: number;
  vx: number;
  vy: number;
}

function buildPhraseDots(text: string): { dots: Array<{ row: number; col: number }>; totalCols: number } {
  const dots: Array<{ row: number; col: number }> = [];
  let cursor = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i].toLowerCase();
    const glyph = BOLD_GLYPHS[ch] || BOLD_GLYPHS[" "];
    for (const d of glyph.dots) {
      dots.push({
        row: d.r,
        col: cursor + d.c,
      });
    }
    cursor += glyph.width + 2; // Spacing between letters
  }

  return { dots, totalCols: cursor };
}

export const PixelMarquee: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const container = containerRef.current;
    if (!cv || !container) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = container.clientWidth || window.innerWidth;
    let isMobile = W < 640;

    // Bold large pixel sizing matching media_1787689269397.png
    let PIXEL = isMobile ? 8.5 : 12;
    let GAP = isMobile ? 1.5 : 2;
    let STEP = PIXEL + GAP;
    const GRID_ROWS = 10;
    let H_PX = Math.round(GRID_ROWS * STEP + (isMobile ? 24 : 36));

    const { dots: phraseDots, totalCols: phraseCols } = buildPhraseDots(PHRASE_TEXT);
    let phraseWidthPx = phraseCols * STEP;

    // Cursor position tracking for particle dispersion
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      if (!container) return;
      W = container.clientWidth || window.innerWidth;
      isMobile = W < 640;
      PIXEL = isMobile ? 8.5 : 12;
      GAP = isMobile ? 1.5 : 2;
      STEP = PIXEL + GAP;
      H_PX = Math.round(GRID_ROWS * STEP + (isMobile ? 24 : 36));
      phraseWidthPx = phraseCols * STEP;

      DPR = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H_PX * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cv.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = cv.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    cv.addEventListener("mousemove", handleMouseMove);
    cv.addEventListener("mouseleave", handleMouseLeave);
    cv.addEventListener("touchmove", handleTouchMove, { passive: true });
    cv.addEventListener("touchstart", handleTouchMove, { passive: true });
    cv.addEventListener("touchend", handleTouchEnd, { passive: true });

    let offsetX = 0;
    let animId: number;
    let t = 0;
    let lastTime = performance.now();

    // Map of persistent particle dispersion states
    const particleMap = new Map<string, { dispX: number; dispY: number; vx: number; vy: number }>();

    const getPixelColor = (c: number, r: number, time: number) => {
      const v =
        Math.sin(c * 0.35 - time * 2.0) * 0.5 +
        Math.cos(r * 0.6 + c * 0.2 + time * 1.4) * 0.5 +
        Math.sin((c + r) * 0.25 - time * 1.0) * 0.35;

      const idx = Math.floor((Math.abs(v * 10) + Math.sin(c * 17.1 + r * 31.3) * 4)) % BRAND_PALETTE.length;
      return BRAND_PALETTE[Math.abs(idx)];
    };

    let isVisibleOnScreen = true;

    // Pause offscreen to eliminate background CPU/GPU lag
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisibleOnScreen;
          isVisibleOnScreen = entry.isIntersecting;
          if (!wasVisible && isVisibleOnScreen) {
            lastTime = performance.now();
            cancelAnimationFrame(animId);
            animId = requestAnimationFrame(draw);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const draw = () => {
      if (!isVisibleOnScreen) {
        return;
      }

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      t += dt * 1.8;

      ctx.clearRect(0, 0, W, H_PX);

      // Subtle Background Pixel Grid (Matching Image 1)
      ctx.strokeStyle = "rgba(10, 10, 10, 0.035)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= W; x += STEP) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, H_PX);
      }
      for (let y = 0; y <= H_PX; y += STEP) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(W, y + 0.5);
      }
      ctx.stroke();

      const paddingY = isMobile ? 12 : 18;
      const numRepeats = Math.ceil(W / phraseWidthPx) + 2;
      const interactionRadius = isMobile ? 90 : 120;
      const dispersionStrength = isMobile ? 12 : 18;
      const returnSpeed = 0.085;

      // Render colorful pixel dots with cursor dispersion physics
      for (let rIdx = -1; rIdx < numRepeats; rIdx++) {
        const repeatOffset = rIdx * phraseWidthPx - offsetX;

        if (repeatOffset + phraseWidthPx < -80 || repeatOffset > W + 80) continue;

        for (let i = 0; i < phraseDots.length; i++) {
          const dot = phraseDots[i];
          const originX = repeatOffset + dot.col * STEP;
          const originY = paddingY + dot.row * STEP;

          const key = `${rIdx}-${i}`;
          let pState = particleMap.get(key);
          if (!pState) {
            pState = { dispX: 0, dispY: 0, vx: 0, vy: 0 };
            particleMap.set(key, pState);
          }

          const currentX = originX + pState.dispX;
          const currentY = originY + pState.dispY;

          // Compute cursor repulsion physics
          if (mouseX > -500 && mouseY > -500) {
            const dx = mouseX - currentX;
            const dy = mouseY - currentY;
            const dist = Math.hypot(dx, dy);

            if (dist < interactionRadius && dist > 0.001) {
              const force = (interactionRadius - dist) / interactionRadius;
              const forceDirX = dx / dist;
              const forceDirY = dy / dist;

              pState.vx -= forceDirX * force * dispersionStrength;
              pState.vy -= forceDirY * force * dispersionStrength;
            }
          }

          // Spring force back to origin position (0,0 offset)
          pState.vx += -pState.dispX * returnSpeed;
          pState.vy += -pState.dispY * returnSpeed;

          // Friction damping
          pState.vx *= 0.85;
          pState.vy *= 0.85;

          // Update animated displacement
          pState.dispX += pState.vx;
          pState.dispY += pState.vy;

          const drawX = Math.round(originX + pState.dispX);
          const drawY = Math.round(originY + pState.dispY);

          if (drawX < -PIXEL || drawX > W + PIXEL) continue;

          ctx.fillStyle = "#0A0A0A";
          ctx.fillRect(drawX, drawY, PIXEL, PIXEL);
        }
      }

      // Smooth constant marquee sliding motion
      const speedPxPerSec = isMobile ? 65 : 85;
      offsetX += speedPxPerSec * dt;
      if (offsetX >= phraseWidthPx) {
        offsetX %= phraseWidthPx;
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cv.removeEventListener("mousemove", handleMouseMove);
      cv.removeEventListener("mouseleave", handleMouseLeave);
      cv.removeEventListener("touchmove", handleTouchMove);
      cv.removeEventListener("touchstart", handleTouchMove);
      cv.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative select-none cursor-pointer"
      style={{ height: "135px", minHeight: "115px" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block bg-transparent"
        aria-label="your brand, our strategy, real growth."
      />
    </div>
  );
};
