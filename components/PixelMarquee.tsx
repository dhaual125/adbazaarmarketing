"use client";

import React, { useEffect, useRef } from "react";

// Bold, High-Readability Pixel Bitmap Font (Matching media_1787608097217.png)
// 8-Row height font with solid 2-pixel stems and crossbars
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
    width: 9,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 }, { r: 2, c: 6 }, { r: 2, c: 7 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 7 }, { r: 3, c: 8 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 7 }, { r: 4, c: 8 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 }, { r: 5, c: 7 }, { r: 5, c: 8 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 4 }, { r: 6, c: 7 }, { r: 6, c: 8 },
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 4 }, { r: 7, c: 7 }, { r: 7, c: 8 },
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
  v: {
    width: 6,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 5 },
      { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 },
      { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 },
      { r: 6, c: 2 }, { r: 6, c: 3 },
      { r: 7, c: 2 }, { r: 7, c: 3 },
    ],
  },
  w: {
    width: 9,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 4 }, { r: 2, c: 7 }, { r: 2, c: 8 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 }, { r: 3, c: 7 }, { r: 3, c: 8 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 }, { r: 4, c: 7 }, { r: 4, c: 8 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 3 }, { r: 5, c: 4 }, { r: 5, c: 5 }, { r: 5, c: 7 }, { r: 5, c: 8 },
      { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 5 }, { r: 6, c: 6 }, { r: 6, c: 7 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 6 }, { r: 7, c: 7 },
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

    // Bold large pixel sizing matching media_1787608097217.png
    let PIXEL = isMobile ? 8.5 : 12;
    let GAP = isMobile ? 1.5 : 2;
    let STEP = PIXEL + GAP;
    const GRID_ROWS = 10;
    let H_PX = Math.round(GRID_ROWS * STEP + (isMobile ? 24 : 36));

    const { dots: phraseDots, totalCols: phraseCols } = buildPhraseDots(PHRASE_TEXT);
    let phraseWidthPx = phraseCols * STEP;

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

    let offsetX = 0;
    let animId: number;
    let t = 0;
    let lastTime = performance.now();

    // Strictly Brand 4-Color Palette: Purple, Green, Blue, Orange
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

    const getPixelColor = (c: number, r: number, time: number) => {
      const v =
        Math.sin(c * 0.35 - time * 2.0) * 0.5 +
        Math.cos(r * 0.6 + c * 0.2 + time * 1.4) * 0.5 +
        Math.sin((c + r) * 0.25 - time * 1.0) * 0.35;

      const idx = Math.floor((Math.abs(v * 10) + Math.sin(c * 17.1 + r * 31.3) * 4)) % BRAND_PALETTE.length;
      return BRAND_PALETTE[Math.abs(idx)];
    };

    const draw = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      t += dt * 1.8;

      ctx.clearRect(0, 0, W, H_PX);

      // Subtle Background Grid
      ctx.strokeStyle = "rgba(10, 10, 10, 0.03)";
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

      // Render bold pixel dots tiled seamlessly across the entire screen
      for (let rIdx = -1; rIdx < numRepeats; rIdx++) {
        const repeatOffset = rIdx * phraseWidthPx - offsetX;

        if (repeatOffset + phraseWidthPx < -50 || repeatOffset > W + 50) continue;

        for (let i = 0; i < phraseDots.length; i++) {
          const dot = phraseDots[i];
          const px = Math.round(repeatOffset + dot.col * STEP);
          const py = Math.round(paddingY + dot.row * STEP);

          if (px < -PIXEL || px > W) continue;

          ctx.fillStyle = getPixelColor(dot.col + rIdx * phraseCols, dot.row, t);
          ctx.fillRect(px, py, PIXEL, PIXEL);
        }
      }

      // Smooth constant marquee sliding motion across all devices
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
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative select-none"
      style={{ height: "130px", minHeight: "110px" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block bg-transparent"
        aria-label="your brand, our strategy, real growth."
      />
    </div>
  );
};
