"use client";

import React, { useEffect, useRef } from "react";

export const ServicesHeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking for subtle interactive parallax
    let mx = width / 2;
    let my = height / 2;
    let targetMx = mx;
    let targetMy = my;

    const handleMouseMove = (e: MouseEvent) => {
      targetMx = e.clientX;
      targetMy = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particle system (Metallic Gold and Brushed Silver)
    const particleCount = 85;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 800 + 100, // 3D depth
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3 - 0.15,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.45 ? "#D4AF37" : "#C0C0C0", // Gold or Silver
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const render = () => {
      t += 0.015;
      mx += (targetMx - mx) * 0.04;
      my += (targetMy - my) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Deep Black Backdrop with subtle luxury vignetting
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // Radial Gold/Amber ambient glow centered on mouse
      const ambient = ctx.createRadialGradient(
        mx,
        my,
        10,
        mx,
        my,
        Math.max(width, height) * 0.75
      );
      ambient.addColorStop(0, "rgba(212, 175, 55, 0.08)");
      ambient.addColorStop(0.35, "rgba(197, 160, 89, 0.03)");
      ambient.addColorStop(0.7, "rgba(10, 10, 10, 0.01)");
      ambient.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, width, height);

      // 3D Perspective Ground Grid (Architectural Luxury Feel)
      const horizonY = height * 0.65;
      const fov = 400;
      ctx.strokeStyle = "rgba(212, 175, 55, 0.06)";
      ctx.lineWidth = 1;

      // Longitudinal lines converging to vanishing point
      const vpX = width / 2 + (mx - width / 2) * 0.1;
      const vpY = horizonY - 40;
      for (let gx = -width * 0.5; gx <= width * 1.5; gx += 80) {
        ctx.beginPath();
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }

      // Latitudinal depth lines
      for (let d = 1; d <= 12; d++) {
        const depthFactor = Math.pow(d / 12, 2.2);
        const y = horizonY + depthFactor * (height - horizonY);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Metallic Light Streaks (Attention -> Action -> Growth)
      for (let s = 0; s < 3; s++) {
        const streakT = (t * 0.7 + s * 2.1) % (Math.PI * 2);
        const sx = width * 0.15 + (Math.sin(streakT) * 0.5 + 0.5) * (width * 0.7);
        const sy = height * 0.3 + Math.cos(streakT * 1.3) * 120;
        const streakGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 180);
        streakGrad.addColorStop(0, s === 0 ? "rgba(212, 175, 55, 0.18)" : "rgba(192, 192, 192, 0.12)");
        streakGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = streakGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render 3D Gold & Silver Floating Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // 3D Parallax offset from mouse
        const pOffsetX = ((p.x - mx) / p.z) * 20;
        const pOffsetY = ((p.y - my) / p.z) * 20;
        const drawX = p.x + pOffsetX;
        const drawY = p.y + pOffsetY;

        const currentAlpha =
          p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.color === "#D4AF37" ? 10 : 6;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
