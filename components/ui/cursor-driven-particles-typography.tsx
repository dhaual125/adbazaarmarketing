"use client";

import React, { useEffect, useRef } from "react";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface CursorDrivenParticleTypographyProps {
  className?: string;
  text?: string;
  color?: string;
}

type GlyphMap = Array<{ r: number; c: number }>;

// High-readability Pixel Bitmap Font Dictionary (Matching media_1787664742427.png)
const GLYPHS: Record<string, { width: number; dots: GlyphMap }> = {
  a: {
    width: 5,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 },
      { r: 3, c: 0 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 },
      { r: 5, c: 0 }, { r: 5, c: 4 },
      { r: 6, c: 0 }, { r: 6, c: 4 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 },
    ],
  },
  b: {
    width: 5,
    dots: [
      { r: 0, c: 0 }, { r: 0, c: 1 },
      { r: 1, c: 0 }, { r: 1, c: 1 },
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 4 },
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 },
    ],
  },
  c: {
    width: 5,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 1 },
      { r: 4, c: 0 }, { r: 4, c: 1 },
      { r: 5, c: 0 }, { r: 5, c: 1 },
      { r: 6, c: 0 }, { r: 6, c: 1 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 },
    ],
  },
  d: {
    width: 5,
    dots: [
      { r: 0, c: 3 }, { r: 0, c: 4 },
      { r: 1, c: 3 }, { r: 1, c: 4 },
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 3 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 3 }, { r: 4, c: 4 },
      { r: 5, c: 0 }, { r: 5, c: 3 }, { r: 5, c: 4 },
      { r: 6, c: 0 }, { r: 6, c: 3 }, { r: 6, c: 4 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 },
    ],
  },
  e: {
    width: 5,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 },
      { r: 3, c: 0 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 }, { r: 4, c: 4 },
      { r: 5, c: 0 },
      { r: 6, c: 0 }, { r: 6, c: 4 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 },
    ],
  },
  f: {
    width: 4,
    dots: [
      { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 0, c: 3 },
      { r: 1, c: 1 },
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 },
      { r: 3, c: 1 },
      { r: 4, c: 1 },
      { r: 5, c: 1 },
      { r: 6, c: 1 },
      { r: 7, c: 1 },
    ],
  },
  g: {
    width: 5,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 4 },
      { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 },
      { r: 6, c: 4 },
      { r: 7, c: 0 }, { r: 7, c: 4 },
      { r: 8, c: 1 }, { r: 8, c: 2 }, { r: 8, c: 3 },
    ],
  },
  h: {
    width: 5,
    dots: [
      { r: 0, c: 0 }, { r: 0, c: 1 },
      { r: 1, c: 0 }, { r: 1, c: 1 },
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 4 },
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 4 },
    ],
  },
  i: {
    width: 2,
    dots: [
      { r: 0, c: 0 }, { r: 0, c: 1 },
      { r: 2, c: 0 }, { r: 2, c: 1 },
      { r: 3, c: 0 }, { r: 3, c: 1 },
      { r: 4, c: 0 }, { r: 4, c: 1 },
      { r: 5, c: 0 }, { r: 5, c: 1 },
      { r: 6, c: 0 }, { r: 6, c: 1 },
      { r: 7, c: 0 }, { r: 7, c: 1 },
    ],
  },
  l: {
    width: 2,
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
    width: 7,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 }, { r: 2, c: 5 },
      { r: 3, c: 0 }, { r: 3, c: 3 }, { r: 3, c: 6 },
      { r: 4, c: 0 }, { r: 4, c: 3 }, { r: 4, c: 6 },
      { r: 5, c: 0 }, { r: 5, c: 3 }, { r: 5, c: 6 },
      { r: 6, c: 0 }, { r: 6, c: 3 }, { r: 6, c: 6 },
      { r: 7, c: 0 }, { r: 7, c: 3 }, { r: 7, c: 6 },
    ],
  },
  n: {
    width: 5,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 },
      { r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 4 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 4 },
      { r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 4 },
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 4 },
    ],
  },
  o: {
    width: 5,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 },
      { r: 3, c: 0 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 4 },
      { r: 5, c: 0 }, { r: 5, c: 4 },
      { r: 6, c: 0 }, { r: 6, c: 4 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 },
    ],
  },
  p: {
    width: 5,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 },
      { r: 3, c: 0 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 4 },
      { r: 5, c: 0 }, { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 },
      { r: 6, c: 0 },
      { r: 7, c: 0 },
      { r: 8, c: 0 },
    ],
  },
  r: {
    width: 4,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 },
      { r: 3, c: 0 }, { r: 3, c: 3 },
      { r: 4, c: 0 },
      { r: 5, c: 0 },
      { r: 6, c: 0 },
      { r: 7, c: 0 },
    ],
  },
  s: {
    width: 5,
    dots: [
      { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 2, c: 4 },
      { r: 3, c: 0 },
      { r: 4, c: 1 }, { r: 4, c: 2 }, { r: 4, c: 3 },
      { r: 5, c: 4 },
      { r: 6, c: 4 },
      { r: 7, c: 0 }, { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 },
    ],
  },
  t: {
    width: 4,
    dots: [
      { r: 0, c: 1 },
      { r: 1, c: 1 },
      { r: 2, c: 0 }, { r: 2, c: 1 }, { r: 2, c: 2 }, { r: 2, c: 3 },
      { r: 3, c: 1 },
      { r: 4, c: 1 },
      { r: 5, c: 1 },
      { r: 6, c: 1 },
      { r: 7, c: 2 }, { r: 7, c: 3 },
    ],
  },
  u: {
    width: 5,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 4 },
      { r: 5, c: 0 }, { r: 5, c: 4 },
      { r: 6, c: 0 }, { r: 6, c: 4 },
      { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 },
    ],
  },
  v: {
    width: 5,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 4 },
      { r: 5, c: 1 }, { r: 5, c: 3 },
      { r: 6, c: 1 }, { r: 6, c: 3 },
      { r: 7, c: 2 },
    ],
  },
  w: {
    width: 7,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 3 }, { r: 2, c: 6 },
      { r: 3, c: 0 }, { r: 3, c: 3 }, { r: 3, c: 6 },
      { r: 4, c: 0 }, { r: 4, c: 3 }, { r: 4, c: 6 },
      { r: 5, c: 1 }, { r: 5, c: 3 }, { r: 5, c: 5 },
      { r: 6, c: 1 }, { r: 6, c: 3 }, { r: 6, c: 5 },
      { r: 7, c: 2 }, { r: 7, c: 4 },
    ],
  },
  y: {
    width: 5,
    dots: [
      { r: 2, c: 0 }, { r: 2, c: 4 },
      { r: 3, c: 0 }, { r: 3, c: 4 },
      { r: 4, c: 0 }, { r: 4, c: 4 },
      { r: 5, c: 1 }, { r: 5, c: 2 }, { r: 5, c: 3 }, { r: 5, c: 4 },
      { r: 6, c: 4 },
      { r: 7, c: 0 }, { r: 7, c: 4 },
      { r: 8, c: 1 }, { r: 8, c: 2 }, { r: 8, c: 3 },
    ],
  },
  ".": {
    width: 2,
    dots: [
      { r: 6, c: 0 }, { r: 6, c: 1 },
      { r: 7, c: 0 }, { r: 7, c: 1 },
    ],
  },
  " ": {
    width: 3,
    dots: [],
  },
};

// Map uppercase to lowercase glyphs
"abcdefghijklmnopqrstuvwxyz".split("").forEach((c) => {
  if (GLYPHS[c]) {
    GLYPHS[c.toUpperCase()] = GLYPHS[c];
  }
});

// Brand colors for interactive dispersion
const BRAND_COLORS = [
  "#7C3AED", // Royal Purple
  "#2563EB", // Electric Blue
  "#16A34A", // Emerald Green
  "#F97316", // Vibrant Orange
  "#60A5FA", // Sky Blue
  "#A855F7", // Bright Violet
];

class PixelParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseColor: string;
  activeColor: string;
  dispersion: number;
  returnSpd: number;
  activeVal: number;

  constructor(
    x: number,
    y: number,
    size: number,
    baseColor: string,
    activeColor: string
  ) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.vx = 0;
    this.vy = 0;
    this.size = size;
    this.baseColor = baseColor;
    this.activeColor = activeColor;
    this.dispersion = 24;
    this.returnSpd = 0.10;
    this.activeVal = 0;
  }

  update(mouseX: number, mouseY: number) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.hypot(dx, dy);
    const interactionRadius = 90;

    // Disperse when mouse/touch approaches
    if (distance < interactionRadius && mouseX > -500 && mouseY > -500) {
      const forceDirectionX = dx / (distance || 1);
      const forceDirectionY = dy / (distance || 1);
      const force = (interactionRadius - distance) / interactionRadius;

      const repulsionX = forceDirectionX * force * this.dispersion;
      const repulsionY = forceDirectionY * force * this.dispersion;

      this.vx -= repulsionX;
      this.vy -= repulsionY;
      this.activeVal = 1;
    } else {
      this.activeVal *= 0.92;
    }

    // Spring return to exact origin
    const toOriginX = this.originX - this.x;
    const toOriginY = this.originY - this.y;

    this.vx += toOriginX * this.returnSpd;
    this.vy += toOriginY * this.returnSpd;

    this.vx *= 0.78;
    this.vy *= 0.78;

    this.x += this.vx;
    this.y += this.vy;

    // Snap to exact origin when settled so text is 100% normal & razor sharp
    if (Math.abs(toOriginX) < 0.12 && Math.abs(toOriginY) < 0.12 && Math.abs(this.vx) < 0.05 && Math.abs(this.vy) < 0.05) {
      this.x = this.originX;
      this.y = this.originY;
      this.vx = 0;
      this.vy = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Normal state: solid black (#0A0A0A). On hover: lights up in brand color!
    if (this.activeVal > 0.05) {
      ctx.fillStyle = this.activeColor;
    } else {
      ctx.fillStyle = this.baseColor;
    }

    ctx.fillRect(
      Math.round(this.x),
      Math.round(this.y),
      this.size - 1,
      this.size - 1
    );
  }
}

export function CursorDrivenParticleTypography({
  className,
  text = "One team. Every part of growth.",
  color = "#0A0A0A",
}: CursorDrivenParticleTypographyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let isVisibleOnScreen = true;
    let animationFrameId: number;
    let particles: PixelParticle[] = [];

    let mouseX = -1000;
    let mouseY = -1000;

    let containerWidth = 0;
    let containerHeight = 0;
    let CELL = 7;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleOnScreen = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const init = () => {
      if (!container) return;

      containerWidth = container.clientWidth;
      containerHeight = container.clientHeight;
      if (containerWidth < 10 || containerHeight < 10) return;

      const isMobile = containerWidth < 768;
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(containerWidth * dpr);
      canvas.height = Math.round(containerHeight * dpr);
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      particles = [];

      // Determine lines: On mobile/tablet split into 2 punchy lines so text is HUGE & bold
      let lines = [text.toLowerCase()];
      if (isMobile && text.includes(".")) {
        const parts = text.split(".").map((s) => s.trim().toLowerCase()).filter(Boolean);
        if (parts.length >= 2) {
          lines = [parts[0] + ".", parts.slice(1).join(" ")];
        }
      }

      // Compute total columns for each line
      const lineColCounts = lines.map((line) => {
        let cols = 0;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          const glyph = GLYPHS[char] || GLYPHS[" "];
          cols += glyph.width + 1;
        }
        return cols;
      });

      const maxCols = Math.max(...lineColCounts);

      // Auto-scale CELL size so the text spans ~88% to 94% of horizontal area
      const maxAllowedWidth = containerWidth * 0.92;
      CELL = Math.max(4.5, Math.min(isMobile ? 7.5 : 11, maxAllowedWidth / maxCols));

      const lineHeightCells = 12;
      const totalHeightPx = lines.length * (lineHeightCells * CELL);
      const startY = Math.round((containerHeight - totalHeightPx) / 2 / CELL) * CELL;

      lines.forEach((line, lineIdx) => {
        const totalLineWidthPx = lineColCounts[lineIdx] * CELL;
        let curX = Math.round((containerWidth - totalLineWidthPx) / 2 / CELL) * CELL;
        const curY = startY + lineIdx * (lineHeightCells * CELL);

        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          const glyph = GLYPHS[char] || GLYPHS[" "];

          for (let d = 0; d < glyph.dots.length; d++) {
            const dot = glyph.dots[d];
            const px = curX + dot.c * CELL;
            const py = curY + dot.r * CELL;

            // Brand color assigned based on horizontal position
            const colorIdx = Math.floor((px / containerWidth) * BRAND_COLORS.length) % BRAND_COLORS.length;
            const activeColor = BRAND_COLORS[colorIdx];

            particles.push(
              new PixelParticle(
                px,
                py,
                CELL,
                color,
                activeColor
              )
            );
          }

          curX += (glyph.width + 1) * CELL;
        }
      });
    };

    const animate = () => {
      if (isVisibleOnScreen) {
        ctx.clearRect(0, 0, containerWidth, containerHeight);

        // Subtle guide pixel grid
        ctx.strokeStyle = "rgba(10, 10, 10, 0.025)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const gridStep = Math.round(CELL * 2);
        for (let gx = 0; gx <= containerWidth; gx += gridStep) {
          ctx.moveTo(gx + 0.5, 0);
          ctx.lineTo(gx + 0.5, containerHeight);
        }
        for (let gy = 0; gy <= containerHeight; gy += gridStep) {
          ctx.moveTo(0, gy + 0.5);
          ctx.lineTo(containerWidth, gy + 0.5);
        }
        ctx.stroke();

        // Render all pixel particles
        for (let i = 0; i < particles.length; i++) {
          particles[i].update(mouseX, mouseY);
          particles[i].draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      init();
    };

    const timeoutId = setTimeout(() => {
      init();
      animate();
    }, 60);

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    canvas.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, color]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-[180px] sm:h-[220px] md:h-[260px] flex items-center justify-center relative touch-pan-y cursor-pointer select-none",
        className
      )}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
