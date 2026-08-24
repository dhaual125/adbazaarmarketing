"use client";

import React, { useEffect, useRef, useState } from "react";

export type ServiceVisualKind =
  | "meta-ads"
  | "google-ads"
  | "ad-videos"
  | "social-media"
  | "leads-management"
  | "growth-scaling";

interface ServiceSectionVisualProps {
  kind: ServiceVisualKind;
  flowSteps: string[];
}

export const ServiceSectionVisual: React.FC<ServiceSectionVisualProps> = ({
  kind,
  flowSteps,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Deep Black Canvas Background
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, w, h);

      // Brushed Metallic Border Frame
      ctx.strokeStyle = "rgba(212, 175, 55, 0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

      // Subtle background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (kind === "meta-ads") {
        // SERVICE 01: META ADS — Floating 3D Phone + Gold/Silver Light Trails
        const cx = w / 2;
        const cy = h / 2 - 10;
        const floatY = Math.sin(t * 1.5) * 8;

        // Radial gold aura
        const aura = ctx.createRadialGradient(cx, cy + floatY, 20, cx, cy + floatY, 180);
        aura.addColorStop(0, "rgba(212, 175, 55, 0.22)");
        aura.addColorStop(0.6, "rgba(192, 192, 192, 0.08)");
        aura.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, w, h);

        // Orbiting Gold Light Trails
        ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(cx, cy + floatY, 140, 50, -Math.PI / 8, 0, Math.PI * 2);
        ctx.stroke();

        // Traveling gold photon
        const trailAng = t * 2;
        const trailX = cx + Math.cos(trailAng) * 140 * Math.cos(-Math.PI / 8) - Math.sin(trailAng) * 50 * Math.sin(-Math.PI / 8);
        const trailY = cy + floatY + Math.cos(trailAng) * 140 * Math.sin(-Math.PI / 8) + Math.sin(trailAng) * 50 * Math.cos(-Math.PI / 8);
        ctx.fillStyle = "#D4AF37";
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(trailX, trailY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // 3D Phone Chassis
        const phoneW = 150;
        const phoneH = 260;
        const px = cx - phoneW / 2;
        const py = cy + floatY - phoneH / 2;

        // Shadow
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.beginPath();
        ctx.ellipse(cx, cy + phoneH / 2 + 30, 80, 16, 0, 0, Math.PI * 2);
        ctx.fill();

        // Phone Frame
        ctx.fillStyle = "#121212";
        ctx.strokeStyle = "#D4AF37";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(px, py, phoneW, phoneH, 22);
        ctx.fill();
        ctx.stroke();

        // Phone Screen Bezel
        ctx.fillStyle = "#050505";
        ctx.beginPath();
        ctx.roundRect(px + 6, py + 6, phoneW - 12, phoneH - 12, 18);
        ctx.fill();

        // Screen Content: Luxury Meta Campaign Card
        ctx.fillStyle = "rgba(212, 175, 55, 0.15)";
        ctx.fillRect(px + 14, py + 22, phoneW - 28, 110);

        // Mini Ad Image Placeholder
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.strokeRect(px + 14, py + 22, phoneW - 28, 110);

        // Gold Conversion Sparkle
        ctx.fillStyle = "#D4AF37";
        ctx.font = "bold 9px monospace";
        ctx.fillText("META CONVERSION AD", px + 18, py + 40);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "11px sans-serif";
        ctx.fillText("High-ROI Scaling", px + 18, py + 60);

        // Dynamic Live ROAS Bar
        const roasW = (phoneW - 28) * (0.6 + 0.35 * Math.sin(t * 2));
        ctx.fillStyle = "#D4AF37";
        ctx.fillRect(px + 14, py + 105, roasW, 4);

        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.font = "8px monospace";
        ctx.fillText("+420% TARGETED REACH", px + 18, py + 120);

      } else if (kind === "google-ads") {
        // SERVICE 02: GOOGLE ADS — Futuristic Search Spotlight Beam emerging from darkness
        const cx = w / 2;
        const cy = h / 2;

        // Cinematic top spotlight beam
        const spotGrad = ctx.createRadialGradient(cx, 0, 10, cx, cy + 40, 220);
        spotGrad.addColorStop(0, "rgba(212, 175, 55, 0.35)");
        spotGrad.addColorStop(0.5, "rgba(192, 192, 192, 0.1)");
        spotGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.moveTo(cx - 30, 0);
        ctx.lineTo(cx + 30, 0);
        ctx.lineTo(w - 40, h);
        ctx.lineTo(40, h);
        ctx.closePath();
        ctx.fill();

        // Search Bar (Futuristic Glass Bar)
        const barW = 280;
        const barH = 46;
        const bx = cx - barW / 2;
        const by = cy - 65;

        ctx.fillStyle = "rgba(18, 18, 18, 0.9)";
        ctx.strokeStyle = "#D4AF37";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(bx, by, barW, barH, 6);
        ctx.fill();
        ctx.stroke();

        // Search text typing simulation
        ctx.fillStyle = "#D4AF37";
        ctx.font = "bold 11px monospace";
        ctx.fillText("GOOGLE SEARCH >", bx + 16, by + 28);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "12px sans-serif";
        const query = "Luxury Brand Growth Agency";
        const charCount = Math.floor((t * 6) % (query.length + 8));
        ctx.fillText(query.substring(0, charCount) + (Math.sin(t * 8) > 0 ? "│" : ""), bx + 128, by + 28);

        // Highlighted Sponsored Ad #1 Box (Luxury Product Reveal Card)
        const resW = 280;
        const resH = 110;
        const rx = cx - resW / 2;
        const ry = cy + 5;

        ctx.fillStyle = "rgba(24, 24, 24, 0.95)";
        ctx.strokeStyle = "rgba(212, 175, 55, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(rx, ry, resW, resH, 8);
        ctx.fill();
        ctx.stroke();

        // Sponsored Badge
        ctx.fillStyle = "#D4AF37";
        ctx.fillRect(rx + 16, ry + 16, 68, 18);
        ctx.fillStyle = "#000000";
        ctx.font = "bold 9px monospace";
        ctx.fillText("TOP AD #1", rx + 24, ry + 29);

        // Ad Headline
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 13px sans-serif";
        ctx.fillText("AD BAZAAR — Intent-Driven Search", rx + 16, ry + 56);

        // Intent Metric
        ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
        ctx.font = "10px sans-serif";
        ctx.fillText("Performance Max • High-Intent Keywords • 9.4% CTR", rx + 16, ry + 78);

        // Bottom Gold Glow line
        ctx.strokeStyle = "#D4AF37";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(rx + 16, ry + 95);
        ctx.lineTo(rx + 16 + (resW - 32) * (0.5 + 0.5 * Math.sin(t)), ry + 95);
        ctx.stroke();

      } else if (kind === "ad-videos") {
        // SERVICE 03: ADVERTISING CONTENT — Cinematic Studio vertical screens + Audio Waves
        const cx = w / 2;
        const cy = h / 2;

        // 3 Staggered 9:16 Video Monitors
        const screenW = 90;
        const screenH = 160;

        const screens = [
          { x: cx - 110, y: cy - 10, scale: 0.88, offset: 0 },
          { x: cx, y: cy - 25, scale: 1.05, offset: 1 },
          { x: cx + 110, y: cy - 10, scale: 0.88, offset: 2 },
        ];

        screens.forEach((s) => {
          const sw = screenW * s.scale;
          const sh = screenH * s.scale;
          const sx = s.x - sw / 2;
          const sy = s.y - sh / 2 + Math.sin(t * 1.5 + s.offset) * 6;

          // Screen chassis
          ctx.fillStyle = "#141414";
          ctx.strokeStyle = s.offset === 1 ? "#D4AF37" : "rgba(192, 192, 192, 0.4)";
          ctx.lineWidth = s.offset === 1 ? 1.8 : 1;
          ctx.beginPath();
          ctx.roundRect(sx, sy, sw, sh, 10);
          ctx.fill();
          ctx.stroke();

          // Screen Inner
          ctx.fillStyle = "#080808";
          ctx.beginPath();
          ctx.roundRect(sx + 4, sy + 4, sw - 8, sh - 8, 8);
          ctx.fill();

          // Dancing Audio Waveform in Center
          const barCount = 7;
          const barW = 4;
          const bStartX = sx + (sw - barCount * 7) / 2;
          for (let b = 0; b < barCount; b++) {
            const bh = Math.abs(Math.sin(t * 4 + b * 0.8 + s.offset)) * 32 + 6;
            ctx.fillStyle = s.offset === 1 ? "#D4AF37" : "#C0C0C0";
            ctx.fillRect(bStartX + b * 7, sy + sh / 2 - bh / 2, barW, bh);
          }

          // REC Beacon
          if (s.offset === 1 && Math.sin(t * 5) > 0) {
            ctx.fillStyle = "#D4AF37";
            ctx.beginPath();
            ctx.arc(sx + 14, sy + 14, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = "7px monospace";
            ctx.fillText("4K CINEMATIC", sx + 22, sy + 16);
          }
        });

        // Connecting gold light conduit
        ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - 110, cy + 85);
        ctx.bezierCurveTo(cx - 50, cy + 105, cx + 50, cy + 105, cx + 110, cy + 85);
        ctx.stroke();

      } else if (kind === "social-media") {
        // SERVICE 04: SOCIAL MEDIA MANAGEMENT — Curated Luxury Social Constellation
        const cx = w / 2;
        const cy = h / 2;

        // Circular orbital rings
        ctx.strokeStyle = "rgba(212, 175, 55, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 110, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(192, 192, 192, 0.2)";
        ctx.beginPath();
        ctx.arc(cx, cy, 65, 0, Math.PI * 2);
        ctx.stroke();

        // Central Brand Beacon
        const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 45);
        centerGrad.addColorStop(0, "rgba(212, 175, 55, 0.4)");
        centerGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = centerGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 45, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#181818";
        ctx.strokeStyle = "#D4AF37";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#D4AF37";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("AD", cx, cy - 4);
        ctx.fillText("BAZAAR", cx, cy + 6);
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";

        // Orbiting Content Nodes
        const nodes = [
          { label: "REELS", r: 110, speed: 0.8, color: "#D4AF37" },
          { label: "POSTS", r: 110, speed: 0.8, offset: Math.PI * 0.66, color: "#C0C0C0" },
          { label: "STORIES", r: 110, speed: 0.8, offset: Math.PI * 1.33, color: "#D4AF37" },
          { label: "COMMUNITY", r: 65, speed: -1.1, offset: 0, color: "#C0C0C0" },
          { label: "GROWTH", r: 65, speed: -1.1, offset: Math.PI, color: "#D4AF37" },
        ];

        nodes.forEach((n) => {
          const ang = t * n.speed + (n.offset || 0);
          const nx = cx + Math.cos(ang) * n.r;
          const ny = cy + Math.sin(ang) * n.r;

          ctx.fillStyle = "#121212";
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(nx - 24, ny - 12, 48, 24, 4);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#FFFFFF";
          ctx.font = "8px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(n.label, nx, ny);
        });
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";

      } else if (kind === "leads-management") {
        // SERVICE 05: LEADS MANAGEMENT — Luxury Fintech Glowing Node Architecture
        const cx = w / 2;
        const cy = h / 2;

        const nodes = [
          { x: cx - 130, y: cy, label: "AD INGEST", sub: "100%", color: "#C0C0C0" },
          { x: cx - 45, y: cy - 35, label: "ENQUIRY", sub: "Verified", color: "#D4AF37" },
          { x: cx + 45, y: cy + 35, label: "LEAD QUAL", sub: "Instant", color: "#C0C0C0" },
          { x: cx + 130, y: cy, label: "CUSTOMER", sub: "Conversion", color: "#D4AF37" },
        ];

        // Connection Paths
        ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.bezierCurveTo(nodes[0].x + 40, nodes[0].y - 40, nodes[1].x - 30, nodes[1].y, nodes[1].x, nodes[1].y);
        ctx.bezierCurveTo(nodes[1].x + 40, nodes[1].y, nodes[2].x - 30, nodes[2].y, nodes[2].x, nodes[2].y);
        ctx.bezierCurveTo(nodes[2].x + 40, nodes[2].y, nodes[3].x - 30, nodes[3].y + 40, nodes[3].x, nodes[3].y);
        ctx.stroke();

        // Traveling Golden Data Packets
        const pProgress = (t * 0.6) % 1;
        const pIndex = Math.floor(pProgress * 3);
        const pLocalT = (pProgress * 3) % 1;
        const startN = nodes[pIndex];
        const endN = nodes[pIndex + 1];
        if (startN && endN) {
          const px = startN.x + (endN.x - startN.x) * pLocalT;
          const py = startN.y + (endN.y - startN.y) * pLocalT;
          ctx.fillStyle = "#D4AF37";
          ctx.shadowColor = "#D4AF37";
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Draw Nodes
        nodes.forEach((n) => {
          ctx.fillStyle = "#141414";
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(n.x - 34, n.y - 20, 68, 40, 6);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = n.color;
          ctx.font = "bold 8px monospace";
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.x, n.y - 4);

          ctx.fillStyle = "rgba(255,255,255,0.7)";
          ctx.font = "7px sans-serif";
          ctx.fillText(n.sub, n.x, n.y + 9);
        });
        ctx.textAlign = "left";

      } else if (kind === "growth-scaling") {
        // SERVICE 06: BUSINESS GROWTH & SCALING — Monumental Architectural Monolith Rising
        const cx = w / 2;
        const cy = h / 2 + 30;

        // Spotlight from zenith
        const monolithSpot = ctx.createRadialGradient(cx, 10, 0, cx, cy, 240);
        monolithSpot.addColorStop(0, "rgba(212, 175, 55, 0.4)");
        monolithSpot.addColorStop(0.7, "rgba(192, 192, 192, 0.08)");
        monolithSpot.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = monolithSpot;
        ctx.fillRect(0, 0, w, h);

        // 5 Stepped Monumental Towers rising exponentially
        const towerCount = 5;
        const towerW = 38;
        const startX = cx - (towerCount * (towerW + 14)) / 2;

        for (let i = 0; i < towerCount; i++) {
          const towerH = 40 + Math.pow(i + 1, 2.3) * 6.5;
          const tx = startX + i * (towerW + 14);
          const ty = cy + 40 - towerH;

          // Tower Fill
          const tGrad = ctx.createLinearGradient(tx, ty, tx + towerW, ty + towerH);
          tGrad.addColorStop(0, "#D4AF37");
          tGrad.addColorStop(0.4, "#222222");
          tGrad.addColorStop(1, "#0A0A0A");
          ctx.fillStyle = tGrad;
          ctx.strokeStyle = i === towerCount - 1 ? "#D4AF37" : "rgba(212, 175, 55, 0.35)";
          ctx.lineWidth = 1.2;

          ctx.beginPath();
          ctx.roundRect(tx, ty, towerW, towerH, 4);
          ctx.fill();
          ctx.stroke();

          // Top Cap Highlight
          ctx.fillStyle = i === towerCount - 1 ? "#D4AF37" : "#C0C0C0";
          ctx.fillRect(tx, ty, towerW, 3);
        }

        // Exponential Ascending Laser Stream
        ctx.strokeStyle = "#D4AF37";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(startX, cy + 30);
        ctx.bezierCurveTo(cx - 30, cy + 20, cx + 40, cy - 50, startX + 4 * (towerW + 14) + towerW / 2, cy + 40 - (40 + Math.pow(5, 2.3) * 6.5));
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Floating Exponential Formula Badge
        ctx.fillStyle = "#121212";
        ctx.strokeStyle = "#D4AF37";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(cx - 110, cy + 60, 220, 26, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#D4AF37";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillText("ADVERTISING + CONTENT + LEADS = GROWTH", cx, cy + 76);
        ctx.textAlign = "left";
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, [kind, isHovered]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-[#0A0A0A] border border-[#D4AF37]/25 rounded-none group transition-all duration-500 hover:border-[#D4AF37]/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        width={640}
        height={400}
        className="w-full h-full object-cover block"
      />

      {/* Flow step chain indicator at bottom of canvas */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between px-3 py-1.5 bg-[#050505]/80 backdrop-blur-md border border-white/10">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {flowSteps.map((step, sIdx) => (
            <React.Fragment key={sIdx}>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#D4AF37] whitespace-nowrap">
                {step}
              </span>
              {sIdx < flowSteps.length - 1 && (
                <span className="text-[#C0C0C0]/50 text-[9px]">&rarr;</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse flex-none ml-2" />
      </div>
    </div>
  );
};
