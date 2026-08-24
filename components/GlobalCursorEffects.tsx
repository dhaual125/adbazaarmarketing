"use client";

import React, { useEffect, useRef, useState } from "react";

interface Wave {
  x: number;
  y: number;
  t0: number;
  pow: number;
}

export const GlobalCursorEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseRef = useRef({ x: -200, y: -200 });
  const trailRef = useRef({ x: -200, y: -200 });
  const lastTapRef = useRef<{ time: number; x: number; y: number }>({ time: 0, x: 0, y: 0 });

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;
    const cell = 8; // Dense pixel grid size
    const BRUSH = 10;
    let cols = Math.ceil(W / cell) + 1;
    let rows = Math.ceil(H / cell) + 1;
    let heat = new Float32Array(cols * rows);
    let dis = new Float32Array(cols * rows);
    let t = 0;
    let shake = 0;
    const SEED = Math.random() * 1000;

    // Palette: Purple -> Blue -> Green -> Orange + Neon
    const BANDS: [number, string][] = [
      [0.30, "#7c3aed"],
      [0.46, "#2563eb"],
      [0.62, "#16a34a"],
      [0.78, "#f97316"],
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
    const waves: Wave[] = [];

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
          heat[id] = vv > 1 ? 1 : vv;
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
        dep(pmx + dx * f, pmy + dy * f, 0.16, sig);
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
      DPR = Math.min(window.devicePixelRatio || 1, 2);
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
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const target = (e.target as HTMLElement)?.closest(
        "[data-cursor-arrow], a, button, .cs, .step, h1, h2, input, select, textarea"
      );
      if (target) {
        setIsHoveringClickable(true);
        const customLabel = target.getAttribute("data-cursor-label");
        if (customLabel) {
          setHoverLabel(customLabel);
        } else if (target.tagName.toLowerCase() === "a" || target.tagName.toLowerCase() === "button") {
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

    const handlePointerDown = (e: PointerEvent) => {
      charging = true;
      chT0 = performance.now() / 1000;
      chx = e.clientX;
      chy = e.clientY;
      setIsClicking(true);
    };

    const release = () => {
      setIsClicking(false);
      if (!charging) return;
      charging = false;
      const ns = performance.now() / 1000;
      const ch = Math.min((ns - chT0) / 2.2, 1);
      waves.push({
        x: chx,
        y: chy,
        t0: ns,
        pow: 0.35 + ch * 2.5,
      });
      dep(chx, chy, 1, BRUSH * (2.5 + ch * 18));
      shake = 0.45 + ch * 2.2;
    };

    const handleDblClick = (e: MouseEvent) => {
      waves.push({
        x: e.clientX,
        y: e.clientY,
        t0: performance.now() / 1000,
        pow: 3.2,
      });
      dep(e.clientX, e.clientY, 1, BRUSH * 24);
      shake = 2.8;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const now = performance.now();
        const dist = Math.hypot(touch.clientX - lastTapRef.current.x, touch.clientY - lastTapRef.current.y);

        if (now - lastTapRef.current.time < 350 && dist < 45) {
          waves.push({
            x: touch.clientX,
            y: touch.clientY,
            t0: performance.now() / 1000,
            pow: 3.2,
          });
          dep(touch.clientX, touch.clientY, 1, BRUSH * 24);
          shake = 2.8;
          lastTapRef.current = { time: 0, x: 0, y: 0 };
        } else {
          lastTapRef.current = { time: now, x: touch.clientX, y: touch.clientY };
        }

        mx = touch.clientX;
        my = touch.clientY;
        hov = true;
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
        setIsVisible(true);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("dblclick", handleDblClick);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("mouseleave", () => {
      hov = false;
      setIsVisible(false);
    });

    let lastTs = performance.now();

    const render = (ts: number) => {
      const dt = Math.min(32, ts - lastTs);
      lastTs = ts;
      t += dt;
      const tt = t * 0.001;
      const ns = performance.now() / 1000;

      if (!heat || !dis) return;

      for (let i = 0; i < heat.length; i++) {
        heat[i] *= 0.885;
        if (heat[i] < 0.003) heat[i] = 0;
      }

      if (hov && mx > 0) {
        const idle = ns - lastMove;
        if (idle > 1.5) {
          wander(mx, my);
          pmx = mx;
          pmy = my;
        } else {
          follow(mx, my, BRUSH);
        }
      }

      if (charging) {
        const chg = Math.min((ns - chT0) / 2.2, 1);
        dep(chx, chy, 0.45 + chg * 0.5, BRUSH * (2 + chg * 8));
        if (shake < 0.12 + chg * 0.35) shake = 0.12 + chg * 0.35;
      }

      const maxDist = Math.hypot(W, H);
      for (let wi = waves.length - 1; wi >= 0; wi--) {
        const wv = waves[wi];
        const age = ns - wv.t0;
        if (age > 2.2) {
          waves.splice(wi, 1);
          continue;
        }
        const pw = wv.pow || 1;
        const R = age * maxDist * 1.8;
        const sig = cell * 7.5 * pw;
        const amp = Math.max(0, 1 - age / 2.2) * 1.4 * pw;
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
            }
          }
        }
      }

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

      const s = cell - 1;

      for (let r = 0; r < rows; r++) {
        const vy = r * cell;
        for (let c = 0; c < cols; c++) {
          const id = r * cols + c;
          let v = heat[id] * 0.95;

          if (v < 0.28 && !(v >= 0.86 && v < 1.02)) continue;

          let col = BANDS[0][1];
          if (v >= BANDS[1][0]) col = BANDS[1][1];
          if (v >= BANDS[2][0]) col = BANDS[2][1];
          if (v >= BANDS[3][0]) col = BANDS[3][1];
          if (v >= 0.86 && v < 1.02) col = "#22c55e";

          ctx.fillStyle = col;
          ctx.fillRect(c * cell, vy, s, s);
        }
      }

      ctx.restore();

      trailRef.current.x += (mouseRef.current.x - trailRef.current.x) * 0.18;
      trailRef.current.y += (mouseRef.current.y - trailRef.current.y) * 0.18;

      const tx = trailRef.current.x;
      const ty = trailRef.current.y;

      // Draw Rotating 4-Segment Gradient Cursor Ring at the Center
      if (isVisible && mx > 0 && my > 0) {
        ctx.save();
        const ringR = isHoveringClickable ? 16 : 12;
        const ringW = 2.4;

        ctx.translate(tx, ty);
        ctx.rotate(t * 0.003);

        const COLORS = ["#7c3aed", "#2563eb", "#16a34a", "#f97316"];
        for (let c = 0; c < 4; c++) {
          const startA = (Math.PI * 2 * c) / 4 + 0.12;
          const endA = (Math.PI * 2 * (c + 1)) / 4 - 0.12;
          ctx.strokeStyle = COLORS[c];
          ctx.lineWidth = ringW;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.arc(0, 0, ringR, startA, endA);
          ctx.stroke();
        }

        ctx.restore();

        // Center dark cursor dot
        ctx.save();
        ctx.fillStyle = "#0A0A0A";
        ctx.beginPath();
        ctx.arc(mx, my, isClicking ? 2.5 : 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(render);
    };

    const animIdFinal = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animIdFinal);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("dblclick", handleDblClick);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [isVisible, isHoveringClickable, isClicking]);

  return (
    <>
      {/* Full-Page Fixed Canvas with Authentic craft.wild.as Physics & Giant Explosion */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9998]"
        aria-hidden="true"
      />

      {/* Floating Interactive Badge (Next to Cursor) */}
      {isVisible && hoverLabel && (
        <div
          className={`fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out ${
            isClicking ? "scale-90" : "scale-100"
          }`}
          style={{
            left: `${mouseRef.current.x + 22}px`,
            top: `${mouseRef.current.y + 22}px`,
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
