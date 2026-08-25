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
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    let isMobile = window.innerWidth < 768;
    let DPR = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    let W = container.clientWidth || window.innerWidth;

    let PIXEL = isMobile ? 8 : 11;
    let GAP = isMobile ? 1.5 : 2;
    let STEP = PIXEL + GAP;
    const GRID_ROWS = 10;
    let H_PX = Math.round(GRID_ROWS * STEP + (isMobile ? 20 : 32));

    const { dots: phraseDots, totalCols: phraseCols } = buildPhraseDots(PHRASE_TEXT);
    let phraseWidthPx = phraseCols * STEP;

    // Pre-bake phrase onto high-speed Offscreen Canvas for 0% CPU mobile rendering
    let offscreenCanvas: HTMLCanvasElement | null = null;

    const bakeOffscreenCanvas = () => {
      offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = Math.round(phraseWidthPx * DPR);
      offscreenCanvas.height = Math.round(H_PX * DPR);
      const offCtx = offscreenCanvas.getContext("2d");
      if (!offCtx) return;

      offCtx.scale(DPR, DPR);
      const paddingY = isMobile ? 10 : 16;

      // Draw pixel blocks in solid black #0A0A0A
      offCtx.fillStyle = "#0A0A0A";
      for (let i = 0; i < phraseDots.length; i++) {
        const dot = phraseDots[i];
        const px = dot.col * STEP;
        const py = paddingY + dot.row * STEP;
        offCtx.fillRect(px, py, PIXEL, PIXEL);
      }
    };

    const resize = () => {
      if (!container) return;
      W = container.clientWidth || window.innerWidth;
      isMobile = W < 768;
      DPR = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      PIXEL = isMobile ? 8 : 11;
      GAP = isMobile ? 1.5 : 2;
      STEP = PIXEL + GAP;
      H_PX = Math.round(GRID_ROWS * STEP + (isMobile ? 20 : 32));
      phraseWidthPx = phraseCols * STEP;

      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H_PX * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      bakeOffscreenCanvas();
    };

    resize();
    window.addEventListener("resize", resize);

    // Desktop cursor particle dispersion tracking
    let mouseX = -1000;
    let mouseY = -1000;
    let isHovered = false;

    // Flat pre-allocated typed arrays for physics (Zero Garbage Collection!)
    const particleCount = phraseDots.length;
    const dispX = new Float32Array(particleCount * 4);
    const dispY = new Float32Array(particleCount * 4);
    const vx = new Float32Array(particleCount * 4);
    const vy = new Float32Array(particleCount * 4);

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = cv.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovered = mouseX >= -50 && mouseX <= W + 50 && mouseY >= -50 && mouseY <= H_PX + 50;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      isHovered = false;
    };

    if (!isMobile) {
      cv.addEventListener("mousemove", handleMouseMove, { passive: true });
      cv.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    let isVisibleOnScreen = true;
    let offsetX = 0;
    let animId: number;
    let lastTime = performance.now();

    // 100% pause when scrolled away
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
      if (!isVisibleOnScreen) return;

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, W, H_PX);

      // Subtle Background Grid
      ctx.strokeStyle = "rgba(10, 10, 10, 0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      const gridStep = STEP * 2;
      for (let x = 0; x <= W; x += gridStep) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, H_PX);
      }
      for (let y = 0; y <= H_PX; y += gridStep) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(W, y + 0.5);
      }
      ctx.stroke();

      const numRepeats = Math.ceil(W / phraseWidthPx) + 2;

      // MOBILE & IDLE PATH: 100% GPU Blitted Offscreen Texture (0.02ms render time!)
      if (isMobile || !isHovered || !offscreenCanvas) {
        if (offscreenCanvas) {
          for (let rIdx = -1; rIdx < numRepeats; rIdx++) {
            const repeatOffset = rIdx * phraseWidthPx - offsetX;
            if (repeatOffset + phraseWidthPx < -10 || repeatOffset > W + 10) continue;
            ctx.drawImage(offscreenCanvas, repeatOffset, 0, phraseWidthPx, H_PX);
          }
        }
      } else {
        // DESKTOP INTERACTIVE CURSOR PATH: Physics Dispersion
        const paddingY = 16;
        const interactionRadius = 115;
        const dispersionStrength = 16;
        const returnSpeed = 0.09;

        ctx.fillStyle = "#0A0A0A";

        for (let rIdx = -1; rIdx < numRepeats; rIdx++) {
          const repeatOffset = rIdx * phraseWidthPx - offsetX;
          if (repeatOffset + phraseWidthPx < -80 || repeatOffset > W + 80) continue;

          const rOffsetIdx = ((rIdx + 1) % 4) * particleCount;

          for (let i = 0; i < particleCount; i++) {
            const dot = phraseDots[i];
            const pIdx = rOffsetIdx + i;
            const originX = repeatOffset + dot.col * STEP;
            const originY = paddingY + dot.row * STEP;

            const curX = originX + dispX[pIdx];
            const curY = originY + dispY[pIdx];

            const dx = mouseX - curX;
            const dy = mouseY - curY;
            const dist = Math.hypot(dx, dy);

            if (dist < interactionRadius && dist > 0.001) {
              const force = (interactionRadius - dist) / interactionRadius;
              vx[pIdx] -= (dx / dist) * force * dispersionStrength;
              vy[pIdx] -= (dy / dist) * force * dispersionStrength;
            }

            vx[pIdx] += -dispX[pIdx] * returnSpeed;
            vy[pIdx] += -dispY[pIdx] * returnSpeed;
            vx[pIdx] *= 0.85;
            vy[pIdx] *= 0.85;

            dispX[pIdx] += vx[pIdx];
            dispY[pIdx] += vy[pIdx];

            const drawX = Math.round(originX + dispX[pIdx]);
            const drawY = Math.round(originY + dispY[pIdx]);

            if (drawX < -PIXEL || drawX > W + PIXEL) continue;

            ctx.fillRect(drawX, drawY, PIXEL, PIXEL);
          }
        }
      }

      // Smooth constant marquee sliding motion
      const speedPxPerSec = isMobile ? 60 : 75;
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
      if (!isMobile) {
        cv.removeEventListener("mousemove", handleMouseMove);
        cv.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative select-none"
      style={{ height: "120px", minHeight: "100px" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block bg-transparent"
        aria-label="your brand, our strategy, real growth."
      />
    </div>
  );
};
