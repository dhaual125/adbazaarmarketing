"use client";

import React, { useEffect, useRef } from "react";

interface HeroCanvasProps {
  cellSize: number;
  brushSize: number;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({
  cellSize,
  brushSize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let cell = cellSize || 8;
    let BRUSH = brushSize || 10;
    let cols = 0;
    let rows = 0;
    let heat: Float32Array | null = null;
    let dis: Float32Array | null = null;
    let t = 0;
    let animationFrameId: number;
    const SEED = Math.random() * 1000;

    // Palette: Purple -> Blue -> Green -> Orange (4 brand colors only)
    const BANDS: [number, string][] = [
      [0.26, "#7c3aed"], // Purple
      [0.44, "#2563eb"], // Blue
      [0.62, "#16a34a"], // Green
      [0.80, "#f97316"], // Orange
    ];

    let mx = -1;
    let my = -1;
    let pmx = -1;
    let pmy = -1;
    let hov = false;
    let lastMove = -9;
    let charging = false;
    let chT0 = 0;
    let chx = 0;
    let chy = 0;
    let shake = 0;
    const waves: Array<{ x: number; y: number; t0: number; pow: number }> = [];

    let pacOn = false;
    let pacx = 0;
    let pacy = 0;
    let pacDir = 1;
    let pacStart = 0;
    let pacAge = 0;
    let PFOOD = 34;

    const hsh = (c: number, r: number) => {
      const n = Math.sin(c * 127.1 + r * 311.7 + SEED * 0.13) * 43758.5453;
      return n - Math.floor(n);
    };

    // Organic procedural wave generator matching craft.wild.as
    const base = (nx: number, ny: number, tt: number) => {
      const s = SEED;
      nx += Math.sin(ny * 5 + tt * 0.5 + s) * 0.05;
      ny += Math.cos(nx * 5 - tt * 0.4) * 0.05;
      const v =
        Math.sin(nx * 5.6 + s * 1.3 + tt * 0.3) *
          Math.cos(ny * 4.7 - s * 0.7 + tt * 0.22) +
        Math.sin((nx * 1.4 + ny * 1.7) * 4.1 - s + tt * 0.16) +
        Math.sin(ny * 9 + s * 2.1 + nx * 3) * 0.5 +
        Math.sin(nx * 13 - s * 1.7) * 0.28;
      return 0.5 + 0.5 * (v / 2.55);
    };

    const region = (nx: number, ny: number, tt: number) => {
      return (
        0.5 +
        0.5 *
          Math.sin(nx * 2.1 + tt * 0.12 + SEED * 0.7) *
          Math.cos(ny * 1.8 - tt * 0.09 + SEED * 0.3)
      );
    };

    const dep = (x: number, y: number, amt: number, sig: number) => {
      if (!heat) return;
      const cc = x / cell;
      const cr = y / cell;
      const rad = Math.ceil(sig * 1.6);
      const inv = 1 / (2 * sig * sig * 0.18);

      for (let dr = -rad; dr <= rad; dr++) {
        for (let dc = -rad; dc <= rad; dc++) {
          const c = (cc + dc) | 0;
          const r = (cr + dr) | 0;
          if (c < 0 || r < 0 || c >= cols || r >= rows) continue;
          const dx = c + 0.5 - cc;
          const dy = r + 0.5 - cr;
          const w = Math.exp(-(dx * dx + dy * dy) * inv);
          if (w < 0.02) continue;
          const id = r * cols + c;
          const vv = heat[id] + amt * w;
          heat[id] = vv > 1.2 ? 1.2 : vv;
        }
      }
    };

    const follow = (x: number, y: number, sig: number) => {
      if (pmx < 0) {
        pmx = x;
        pmy = y;
      }
      const dx = x - pmx;
      const dy = y - pmy;
      const dl = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.min(48, Math.round(dl / (cell * 0.8))));
      for (let s = 1; s <= steps; s++) {
        const f = s / steps;
        dep(pmx + dx * f, pmy + dy * f, 0.20, sig);
      }
      pmx = x;
      pmy = y;
    };

    const pacman = (
      cx: number,
      cy: number,
      rad: number,
      ang: number,
      mouth: number,
      val: number
    ) => {
      if (!heat) return;
      const c0 = Math.floor((cx - rad) / cell);
      const c1 = Math.ceil((cx + rad) / cell);
      const r0 = Math.floor((cy - rad) / cell);
      const r1 = Math.ceil((cy + rad) / cell);
      const rr = rad * rad;

      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          if (c < 0 || r < 0 || c >= cols || r >= rows) continue;
          const dx = (c + 0.5) * cell - cx;
          const dy = (r + 0.5) * cell - cy;
          if (dx * dx + dy * dy > rr) continue;
          const da = Math.abs(
            (((Math.atan2(dy, dx) - ang) % (2 * Math.PI)) + 3 * Math.PI) %
              (2 * Math.PI) -
              Math.PI
          );
          if (da < mouth) continue;
          const id = r * cols + c;
          const v = val + 0.03 * Math.sin(c * 0.7 + r * 0.7 - t * 0.01);
          if (v > heat[id]) heat[id] = v;
        }
      }
    };

    const wander = (restx: number, resty: number) => {
      if (!pacOn) {
        pacOn = true;
        pacDir = restx < W * 0.5 ? 1 : -1;
        pacx = restx;
        pacy = resty;
        pacStart = restx;
        pacAge = 0;
        PFOOD = BRUSH * 3.4;
      }
      const rad = BRUSH * 3.4;
      pacAge++;
      pacx += pacDir * 2.6;

      if (pacx > W + rad + 12 || pacx < -rad - 12) {
        pacDir = Math.random() < 0.5 ? 1 : -1;
        pacy = 70 + Math.random() * (H - 140);
        pacx = pacDir > 0 ? -rad : W + rad;
        pacStart = pacx;
        pacAge = 0;
      }
      const ang = pacDir > 0 ? 0 : Math.PI;
      const pr = Math.round(pacy / cell);
      for (let k = 1; k <= 80; k++) {
        const pxPos = pacStart + pacDir * PFOOD * k;
        if (pxPos < -20 || pxPos > W + 20) continue;
        if (pacDir * (pxPos - pacx) > rad * 0.7) {
          const pc = Math.round(pxPos / cell);
          if (pc >= 0 && pr >= 0 && pc < cols && pr < rows && heat) {
            const pid = pr * cols + pc;
            if (0.72 > heat[pid]) heat[pid] = 0.72;
          }
        }
      }
      const mouth = 0.05 + 0.6 * Math.abs(Math.sin(pacAge * 0.16));
      pacman(pacx, pacy, rad, ang, mouth, 0.72);
    };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      cell = cellSize || 8;
      BRUSH = brushSize || 10;
      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cols = Math.ceil(W / cell) + 1;
      rows = Math.ceil(H / cell) + 1;
      heat = new Float32Array(cols * rows);
      dis = new Float32Array(cols * rows);
    };

    resize();
    window.addEventListener("resize", resize);

    const handlePointerMove = (e: PointerEvent) => {
      lastMove = performance.now() / 1000;
      pacOn = false;
      mx = e.clientX;
      my = e.clientY;
      hov = true;
    };

    const handlePointerDown = (e: PointerEvent) => {
      charging = true;
      chT0 = performance.now() / 1000;
      chx = e.clientX;
      chy = e.clientY;
    };

    const release = () => {
      if (!charging) return;
      charging = false;
      const ns = performance.now() / 1000;
      const ch = Math.min((ns - chT0) / 2.2, 1);
      waves.push({
        x: chx,
        y: chy,
        t0: ns,
        pow: 0.5 + ch * 2.8,
      });
      dep(chx, chy, 1, BRUSH * (3 + ch * 22));
      shake = 0.5 + ch * 2.4;
    };

    const handleDblClick = (e: MouseEvent) => {
      waves.push({
        x: e.clientX,
        y: e.clientY,
        t0: performance.now() / 1000,
        pow: 3.4,
      });
      dep(e.clientX, e.clientY, 1, BRUSH * 26);
      shake = 2.8;
    };

    let lastTapTime = 0;
    let lastTapX = 0;
    let lastTapY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const now = performance.now();
        const dist = Math.hypot(touch.clientX - lastTapX, touch.clientY - lastTapY);

        if (now - lastTapTime < 350 && dist < 45) {
          waves.push({
            x: touch.clientX,
            y: touch.clientY,
            t0: performance.now() / 1000,
            pow: 3.4,
          });
          dep(touch.clientX, touch.clientY, 1, BRUSH * 26);
          shake = 2.8;
          lastTapTime = 0;
        } else {
          lastTapTime = now;
          lastTapX = touch.clientX;
          lastTapY = touch.clientY;
        }

        mx = touch.clientX;
        my = touch.clientY;
        hov = true;
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("dblclick", handleDblClick);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    let lastTs = performance.now();

    const render = (ts: number) => {
      const dt = Math.min(32, ts - lastTs);
      lastTs = ts;
      t += dt;
      const tt = t * 0.001;
      const ns = performance.now() / 1000;

      if (!heat || !dis) return;

      const sy = window.scrollY || 0;
      const heroEl = document.getElementById("hero");
      const heroHeight = heroEl ? heroEl.offsetHeight : H;
      const heroBottom = heroHeight - sy;
      const heroEnd = heroBottom * 0.65;
      const fadeSpan = Math.max(1, heroBottom * 0.22);
      const hAmp = H * 0.16;

      const headerEl = document.querySelector(".hhead") as HTMLElement | null;
      const headerHeight = headerEl ? headerEl.offsetHeight : 0;
      const headerVisibleBottom = Math.max(0, headerHeight - sy);

      // 1. Decay heat
      for (let i = 0; i < heat.length; i++) {
        if (dis[i] > 0 && Math.floor(i / cols) * cell > heroBottom) {
          dis[i] -= 0.007;
          if (dis[i] <= 0) {
            dis[i] = 0;
            heat[i] = 0;
          } else if (dis[i] < 0.3) {
            heat[i] *= 0.88;
          } else {
            heat[i] = Math.max(heat[i] * 0.95, 0.9);
          }
        } else {
          if (dis[i] > 0) dis[i] = 0;
          heat[i] *= 0.885;
          if (heat[i] < 0.003) heat[i] = 0;
        }
      }

      // 2. Mouse follow / wander
      if (hov && mx > 0 && my > headerVisibleBottom && my <= heroBottom + 20) {
        const idle = ns - lastMove;
        if (idle > 1.5) {
          wander(mx, my);
          pmx = mx;
          pmy = my;
        } else {
          follow(mx, my, BRUSH);
        }
      }

      // 3. Hold-to-charge
      if (charging) {
        const chg = Math.min((ns - chT0) / 2.2, 1);
        dep(chx, chy, 0.45 + chg * 0.5, BRUSH * (2 + chg * 8));
        if (shake < 0.12 + chg * 0.35) shake = 0.12 + chg * 0.35;
      }

      // 4. Shockwaves (Double-click explosion expanding across whole page)
      const maxDist = Math.hypot(W, H);
      for (let wi = waves.length - 1; wi >= 0; wi--) {
        const wv = waves[wi];
        const age = ns - wv.t0;
        if (age > 2.0) {
          waves.splice(wi, 1);
          continue;
        }
        const pw = wv.pow || 1;
        const R = age * maxDist * 1.8;
        const sig = cell * 6.8 * pw;
        const amp = Math.max(0, 1 - age / 2.0) * 1.35 * pw;
        const inv = 1 / (2 * sig * sig);

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const dx = (c + 0.5) * cell - wv.x;
            const dy = (r + 0.5) * cell - wv.y;
            const dd = Math.sqrt(dx * dx + dy * dy);
            const g = amp * Math.exp(-((dd - R) * (dd - R)) * inv);
            if (g > 0.02) {
              const id = r * cols + c;
              if (g > heat[id]) heat[id] = g;
              if ((r + 0.5) * cell > heroBottom && g > 0.25 && dis[id] === 0) {
                dis[id] = 0.45 + hsh(c, r) * 0.7;
              }
            }
          }
        }
      }

      // 5. Screen shake
      ctx.save();
      if (shake > 0.01) {
        shake *= 0.9;
        ctx.translate(
          (Math.random() - 0.5) * shake * 18,
          (Math.random() - 0.5) * shake * 18
        );
      } else {
        shake = 0;
      }

      ctx.clearRect(-40, -40, W + 80, H + 80);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-40, -40, W + 80, H + 80);

      // 6. Draw subtle pixel grid lines (#fafafa)
      const off = sy - Math.floor(sy / cell) * cell;
      const s = cell - 1;

      ctx.strokeStyle = "#f3f4f6";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = 0; gx <= W; gx += cell) {
        ctx.moveTo(gx + 0.5, 0);
        ctx.lineTo(gx + 0.5, H);
      }
      for (let gy = -off; gy <= H; gy += cell) {
        ctx.moveTo(0, gy + 0.5);
        ctx.lineTo(W, gy + 0.5);
      }
      ctx.stroke();

      // 7. Render organic gradient squares flowing below header
      const drStart = Math.floor((sy + headerVisibleBottom + 2) / cell);
      const drEnd = Math.min(Math.floor((sy + H) / cell) + 1, Math.floor((heroHeight + 30) / cell));

      for (let dr = drStart; dr <= drEnd; dr++) {
        const vy = dr * cell - sy;
        if (vy < headerVisibleBottom + 1) continue;

        const ccyView = vy + cell * 0.5;
        const vr = Math.floor(ccyView / cell);
        const inRow = vr >= 0 && vr < rows;
        const dd = dr * cell;

        for (let c2 = 0; c2 < cols; c2++) {
          const nx = (c2 * cell) / W;
          const ny = (dr * cell) / H;
          const co =
            Math.max(
              0,
              (Math.sin(c2 * 0.5 + SEED) + Math.sin(c2 * 0.21 - SEED * 1.3)) *
                0.16 +
                hsh(Math.floor(c2 / 2) + 3.3, Math.floor(dr / 4)) * 0.6 +
                0.15
            );
          const depthN = dd + co * hAmp;
          const regThr =
            depthN <= heroEnd ? 0 : Math.min(1, (depthN - heroEnd) / fadeSpan);

          let v = inRow ? heat[vr * cols + c2] * 0.92 : 0;

          if (
            region(nx, ny, tt) > regThr &&
            hsh(c2 * 1.7 + 11.3, dr * 1.3 + 5.1) < 1.0
          ) {
            v +=
              base(nx, ny, tt) +
              (hsh(c2, dr) - 0.5) * 0.12 +
              Math.sin(c2 * 0.6 + dr * 0.8 + tt * 1.7) * 0.045;
          }

          if (v < 0.26) continue;

          let col = BANDS[0][1];
          for (let b = BANDS.length - 1; b >= 0; b--) {
            if (v >= BANDS[b][0]) {
              col = BANDS[b][1];
              break;
            }
          }

          ctx.fillStyle = col;
          ctx.fillRect(c2 * cell, vy, s, s);
        }
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("dblclick", handleDblClick);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [cellSize, brushSize]);

  return (
    <canvas
      ref={canvasRef}
      id="hero-kv"
      className="fixed w-full h-full block z-0 pointer-events-none"
      style={{ top: "62px", left: 0, right: 0, bottom: 0 }}
      aria-hidden="true"
    />
  );
};
