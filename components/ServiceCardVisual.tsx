"use client";

import React, { useEffect, useRef, useState } from "react";

export type ServiceVisualType =
  | "meta-ads"
  | "google-ads"
  | "ad-videos"
  | "social-media"
  | "leads-management"
  | "growth-scaling";

interface ServiceCardVisualProps {
  type: ServiceVisualType;
  title: string;
}

export const ServiceCardVisual: React.FC<ServiceCardVisualProps> = ({ type, title }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    // Helper: Draw crisp platform logo bubble
    const drawPlatformBubble = (
      x: number,
      y: number,
      radius: number,
      platform: "meta" | "instagram" | "google" | "youtube" | "pinterest" | "tiktok" | "linkedin",
      isActive: boolean = false
    ) => {
      ctx.save();
      ctx.shadowColor = isActive ? "rgba(0, 129, 251, 0.3)" : "rgba(0, 0, 0, 0.08)";
      ctx.shadowBlur = isActive ? 14 : 6;
      ctx.shadowOffsetY = 2;

      // Clean white bubble background
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Bubble rim
      ctx.strokeStyle = isActive ? "#0081FB" : "rgba(0, 0, 0, 0.08)";
      ctx.lineWidth = isActive ? 2 : 1;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      const s = radius * 0.55;
      if (platform === "meta") {
        ctx.strokeStyle = "#0081FB";
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.ellipse(x - s * 0.45, y, s * 0.45, s * 0.7, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(x + s * 0.45, y, s * 0.45, s * 0.7, 0, 0, Math.PI * 2);
        ctx.stroke();

      } else if (platform === "instagram") {
        const iconSize = s * 1.3;
        const ix = x - iconSize / 2;
        const iy = y - iconSize / 2;
        const iGrad = ctx.createLinearGradient(ix, iy, ix + iconSize, iy + iconSize);
        iGrad.addColorStop(0, "#833AB4");
        iGrad.addColorStop(0.5, "#FD1D1D");
        iGrad.addColorStop(1, "#FCAF45");
        ctx.strokeStyle = iGrad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.roundRect(ix, iy, iconSize, iconSize, 4);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, iconSize * 0.28, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = iGrad;
        ctx.beginPath();
        ctx.arc(x + iconSize * 0.28, y - iconSize * 0.28, 1.2, 0, Math.PI * 2);
        ctx.fill();

      } else if (platform === "google") {
        const r = s * 0.75;
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#EA4335";
        ctx.beginPath();
        ctx.arc(x, y, r, -Math.PI * 0.8, -Math.PI * 0.2);
        ctx.stroke();
        ctx.strokeStyle = "#FBBC05";
        ctx.beginPath();
        ctx.arc(x, y, r, Math.PI * 0.7, Math.PI * 1.2);
        ctx.stroke();
        ctx.strokeStyle = "#34A853";
        ctx.beginPath();
        ctx.arc(x, y, r, Math.PI * 0.2, Math.PI * 0.7);
        ctx.stroke();
        ctx.strokeStyle = "#4285F4";
        ctx.beginPath();
        ctx.arc(x, y, r, -Math.PI * 0.2, Math.PI * 0.2);
        ctx.moveTo(x, y);
        ctx.lineTo(x + r, y);
        ctx.stroke();

      } else if (platform === "youtube") {
        const bw = s * 1.45;
        const bh = s * 1.05;
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.roundRect(x - bw / 2, y - bh / 2, bw, bh, 4);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(x - s * 0.2, y - s * 0.3);
        ctx.lineTo(x + s * 0.35, y);
        ctx.lineTo(x - s * 0.2, y + s * 0.3);
        ctx.closePath();
        ctx.fill();

      } else if (platform === "pinterest") {
        ctx.fillStyle = "#E60023";
        ctx.beginPath();
        ctx.arc(x, y, s * 0.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = `bold ${Math.round(s * 1.2)}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("P", x, y + 1);

      } else if (platform === "tiktok") {
        ctx.fillStyle = "#0A0A0A";
        ctx.beginPath();
        ctx.arc(x, y, s * 0.85, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#25F4EE";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(x - 2, y + 3, 2.5, 0, Math.PI * 2);
        ctx.moveTo(x + 0.5, y + 3);
        ctx.lineTo(x + 0.5, y - 4);
        ctx.arc(x + 4.5, y - 4, 4, Math.PI, Math.PI * 1.5, false);
        ctx.stroke();
        ctx.strokeStyle = "#FE2C55";
        ctx.beginPath();
        ctx.arc(x - 1, y + 4, 2.5, 0, Math.PI * 2);
        ctx.moveTo(x + 1.5, y + 4);
        ctx.lineTo(x + 1.5, y - 3);
        ctx.arc(x + 5.5, y - 3, 4, Math.PI, Math.PI * 1.5, false);
        ctx.stroke();

      } else if (platform === "linkedin") {
        const bw = s * 1.3;
        ctx.fillStyle = "#0A66C2";
        ctx.beginPath();
        ctx.roundRect(x - bw / 2, y - bw / 2, bw, bw, 3);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = `bold ${Math.round(s * 0.85)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("in", x, y);
      }
      ctx.restore();
    };

    const render = () => {
      t += 0.022;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Clean Light Background
      ctx.fillStyle = "#F8F9FA";
      ctx.fillRect(0, 0, w, h);

      // Subtle modern grid
      ctx.strokeStyle = "rgba(0, 0, 0, 0.035)";
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const cx = w / 2;
      const cy = h / 2 - 12;

      // =========================================================================
      // CARD 1: META ADS — Orbiting Meta/IG/TikTok/YouTube Bubbles + AD BAZAAR Core
      // =========================================================================
      if (type === "meta-ads") {
        // Orbit Track
        const orbitR = 98;
        ctx.strokeStyle = "rgba(0, 129, 251, 0.15)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Central AD BAZAAR Hub Badge
        const coreR = 34;
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 3;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#0081FB";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // AD BAZAAR Brand Text
        ctx.fillStyle = "#0A0A0A";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("AD", cx, cy - 5);
        ctx.fillStyle = "#0081FB";
        ctx.font = "bold 8px monospace";
        ctx.fillText("BAZAAR", cx, cy + 6);

        // Orbiting Meta ecosystem bubbles
        const platforms: Array<"meta" | "instagram" | "youtube" | "tiktok"> = ["meta", "instagram", "youtube", "tiktok"];
        platforms.forEach((plat, i) => {
          const ang = t * 0.85 + (i * Math.PI * 2) / platforms.length;
          const bx = cx + Math.cos(ang) * orbitR;
          const by = cy + Math.sin(ang) * orbitR;

          // Connection beam
          ctx.strokeStyle = "rgba(0, 129, 251, 0.22)";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(bx, by);
          ctx.stroke();

          // Traveling energy packet
          const packetProgress = (t * 1.5 + i * 0.5) % 1;
          const ppx = cx + (bx - cx) * packetProgress;
          const ppy = cy + (by - cy) * packetProgress;
          ctx.fillStyle = "#0081FB";
          ctx.beginPath();
          ctx.arc(ppx, ppy, 2.5, 0, Math.PI * 2);
          ctx.fill();

          drawPlatformBubble(bx, by, 22, plat, i === 0);
        });

      // =========================================================================
      // CARD 2: GOOGLE ADS — Interactive Search Engine & Top #1 Ad Matrix
      // =========================================================================
      } else if (type === "google-ads") {
        // Top Search Bar
        const barW = 340;
        const barH = 44;
        const bx = cx - barW / 2;
        const by = cy - 80;

        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 3;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.roundRect(bx, by, barW, barH, 22);
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // Google 'G' 4-color dot on left
        drawPlatformBubble(bx + 24, by + barH / 2, 13, "google", true);

        // Typing query text
        ctx.fillStyle = "#1F2937";
        ctx.font = "500 11.5px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        const query = "Best High ROI Marketing Agency";
        const chars = Math.min(query.length, Math.floor((t * 7) % (query.length + 8)));
        ctx.fillText(query.substring(0, chars) + (Math.sin(t * 8) > 0 ? "│" : ""), bx + 48, by + barH / 2);

        // Search icon on right
        ctx.fillStyle = "#4285F4";
        ctx.beginPath();
        ctx.arc(bx + barW - 24, by + barH / 2, 7, 0, Math.PI * 2);
        ctx.fill();

        // Top #1 Ranked Sponsored Ad Card (Clean White)
        const cardW = 340;
        const cardH = 105;
        const cxPos = cx - cardW / 2;
        const cyPos = cy - 20;

        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.06)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 3;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.roundRect(cxPos, cyPos, cardW, cardH, 8);
        ctx.fill();
        ctx.strokeStyle = "#4285F4";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // Sponsored Badge
        ctx.fillStyle = "#1A73E8";
        ctx.beginPath();
        ctx.roundRect(cxPos + 14, cyPos + 12, 72, 18, 4);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 8.5px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("SPONSORED #1", cxPos + 50, cyPos + 21);

        // AD BAZAAR Brand Title
        ctx.fillStyle = "#1A0DAB";
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText("AD BAZAAR &bull; Intent-Driven Growth", cxPos + 94, cyPos + 21);

        // Ad Description & URL
        ctx.fillStyle = "#006621";
        ctx.font = "10px sans-serif";
        ctx.fillText("https://adbazaar.com/google-ads &bull; Official Partner", cxPos + 14, cyPos + 44);

        ctx.fillStyle = "#4B5563";
        ctx.font = "10.5px sans-serif";
        ctx.fillText("Capture high-intent buyers searching now. Performance Max & Search.", cxPos + 14, cyPos + 64);

        // Metric pill: CTR 9.4%
        ctx.fillStyle = "#ECFDF5";
        ctx.beginPath();
        ctx.roundRect(cxPos + 14, cyPos + 78, 140, 18, 4);
        ctx.fill();
        ctx.fillStyle = "#059669";
        ctx.font = "bold 8.5px monospace";
        ctx.fillText("● 9.4% CONVERSION CTR", cxPos + 22, cyPos + 89);

      // =========================================================================
      // CARD 3: ADVERTISING CONTENT VIDEOS — 9:16 Studio Camera Viewfinder
      // =========================================================================
      } else if (type === "ad-videos") {
        // 9:16 Studio Phone Viewfinder
        const frameW = 160;
        const frameH = 210;
        const fx = cx - frameW / 2;
        const fy = cy - frameH / 2;

        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
        ctx.shadowBlur = 16;
        ctx.shadowOffsetY = 4;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.roundRect(fx, fy, frameW, frameH, 16);
        ctx.fill();
        ctx.strokeStyle = "#0A0A0A";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // Inner Video Viewport Screen
        ctx.fillStyle = "#F3F4F6";
        ctx.beginPath();
        ctx.roundRect(fx + 6, fy + 6, frameW - 12, frameH - 12, 12);
        ctx.fill();

        // Crop brackets on 4 corners
        ctx.strokeStyle = "#EA580C";
        ctx.lineWidth = 2;
        const bLen = 10;
        // Top-left
        ctx.beginPath();
        ctx.moveTo(fx + 16, fy + 16 + bLen); ctx.lineTo(fx + 16, fy + 16); ctx.lineTo(fx + 16 + bLen, fy + 16); ctx.stroke();
        // Top-right
        ctx.beginPath();
        ctx.moveTo(fx + frameW - 16 - bLen, fy + 16); ctx.lineTo(fx + frameW - 16, fy + 16); ctx.lineTo(fx + frameW - 16, fy + 16 + bLen); ctx.stroke();
        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(fx + 16, fy + frameH - 16 - bLen); ctx.lineTo(fx + 16, fy + frameH - 16); ctx.lineTo(fx + 16 + bLen, fy + frameH - 16); ctx.stroke();
        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(fx + frameW - 16 - bLen, fy + frameH - 16); ctx.lineTo(fx + frameW - 16, fy + frameH - 16); ctx.lineTo(fx + frameW - 16, fy + frameH - 16 - bLen); ctx.stroke();

        // Top Status: REC 4K 60FPS
        ctx.fillStyle = "#DC2626";
        ctx.beginPath();
        ctx.arc(fx + 22, fy + 24, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#0A0A0A";
        ctx.font = "bold 8.5px monospace";
        ctx.textAlign = "left";
        ctx.fillText("REC 4K UGC", fx + 30, fy + 25);

        // Center: Realtime Dancing Audio Spectrum Equalizer
        const bars = 10;
        const barW = 5;
        const startX = fx + (frameW - bars * 9) / 2;
        for (let b = 0; b < bars; b++) {
          const bh = Math.abs(Math.sin(t * 4 + b * 0.7)) * 48 + 8;
          const bx = startX + b * 9;
          const by = cy - bh / 2;
          ctx.fillStyle = b % 2 === 0 ? "#F97316" : "#7C3AED";
          ctx.beginPath();
          ctx.roundRect(bx, by, barW, bh, 2);
          ctx.fill();
        }

        // AD BAZAAR PRODUCTIONS Watermark
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.roundRect(fx + 18, fy + frameH - 38, frameW - 36, 22, 4);
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
        ctx.stroke();

        ctx.fillStyle = "#0A0A0A";
        ctx.font = "bold 8px monospace";
        ctx.textAlign = "center";
        ctx.fillText("AD BAZAAR STUDIOS", fx + frameW / 2, fy + frameH - 26);

        // Floating Social Engagement Pill on right
        drawPlatformBubble(fx + frameW + 18, cy - 30, 18, "youtube", true);
        drawPlatformBubble(fx + frameW + 18, cy + 30, 18, "instagram", true);

      // =========================================================================
      // CARD 4: SOCIAL MEDIA MANAGEMENT — Multi-Channel Feed Symphony
      // =========================================================================
      } else if (type === "social-media") {
        // Central AD BAZAAR Brand Hub
        const hubW = 120;
        const hubH = 46;
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
        ctx.shadowBlur = 14;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.roundRect(cx - hubW / 2, cy - hubH / 2, hubW, hubH, 8);
        ctx.fill();
        ctx.strokeStyle = "#0A0A0A";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = "#0A0A0A";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillText("AD BAZAAR", cx, cy - 4);
        ctx.fillStyle = "#059669";
        ctx.font = "bold 8px monospace";
        ctx.fillText("SOCIAL ENGINE", cx, cy + 8);

        // 4 Surrounding Staggered Feed Tiles
        const tiles = [
          { x: cx - 115, y: cy - 50, plat: "instagram" as const, label: "DAILY REELS", sub: "+84k Reach" },
          { x: cx + 115, y: cy - 50, plat: "tiktok" as const, label: "VIRAL HOOKS", sub: "1.2M Views" },
          { x: cx - 115, y: cy + 50, plat: "pinterest" as const, label: "BRAND PINS", sub: "High Save %" },
          { x: cx + 115, y: cy + 50, plat: "linkedin" as const, label: "AUTHORITY", sub: "B2B Leads" },
        ];

        tiles.forEach((tl, idx) => {
          // Connecting beam
          ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(tl.x, tl.y);
          ctx.stroke();

          // Tile card
          const tw = 86;
          const th = 46;
          ctx.save();
          ctx.shadowColor = "rgba(0, 0, 0, 0.06)";
          ctx.shadowBlur = 8;
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.roundRect(tl.x - tw / 2, tl.y - th / 2, tw, th, 6);
          ctx.fill();
          ctx.strokeStyle = idx === Math.floor(t * 0.8) % 4 ? "#0081FB" : "rgba(0, 0, 0, 0.08)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();

          // Icon Bubble
          drawPlatformBubble(tl.x - tw / 2 + 14, tl.y, 11, tl.plat, true);

          // Text
          ctx.fillStyle = "#0A0A0A";
          ctx.font = "bold 7.5px sans-serif";
          ctx.textAlign = "left";
          ctx.fillText(tl.label, tl.x - tw / 2 + 30, tl.y - 3);

          ctx.fillStyle = "#059669";
          ctx.font = "7px monospace";
          ctx.fillText(tl.sub, tl.x - tw / 2 + 30, tl.y + 7);
        });

      // =========================================================================
      // CARD 5: LEADS MANAGEMENT — Automated CRM & Real-Time WhatsApp Pipeline
      // =========================================================================
      } else if (type === "leads-management") {
        // Step-by-Step Interactive Pipeline Flow
        const nodes = [
          { x: cx - 125, y: cy, label: "AD CLICK", tag: "Meta / Google", icon: "meta" as const },
          { x: cx - 40, y: cy, label: "AI QUAL", tag: "Score 98/100", icon: "google" as const },
          { x: cx + 45, y: cy, label: "WHATSAPP", tag: "Instant 0.2s", icon: "instagram" as const },
          { x: cx + 130, y: cy, label: "WON DEAL", tag: "$18,500 Val", icon: "linkedin" as const },
        ];

        // Connection line
        ctx.strokeStyle = "rgba(0, 129, 251, 0.35)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[3].x, nodes[3].y);
        ctx.stroke();

        // Traveling lead packet
        const progress = (t * 0.8) % 1;
        const totalW = nodes[3].x - nodes[0].x;
        const px = nodes[0].x + totalW * progress;
        ctx.fillStyle = "#16A34A";
        ctx.shadowColor = "#16A34A";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, cy, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw Pipeline Step Cards
        nodes.forEach((nd, i) => {
          const nw = 70;
          const nh = 56;
          ctx.save();
          ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
          ctx.shadowBlur = 10;
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.roundRect(nd.x - nw / 2, nd.y - nh / 2, nw, nh, 6);
          ctx.fill();
          ctx.strokeStyle = i === 3 ? "#16A34A" : "#0A0A0A";
          ctx.lineWidth = i === 3 ? 1.8 : 1;
          ctx.stroke();
          ctx.restore();

          // Step index circle
          ctx.fillStyle = i === 3 ? "#16A34A" : "#0081FB";
          ctx.beginPath();
          ctx.arc(nd.x, nd.y - 14, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 8px monospace";
          ctx.textAlign = "center";
          ctx.fillText(`0${i + 1}`, nd.x, nd.y - 11);

          ctx.fillStyle = "#0A0A0A";
          ctx.font = "bold 8px sans-serif";
          ctx.fillText(nd.label, nd.x, nd.y + 7);

          ctx.fillStyle = "#6B7280";
          ctx.font = "6.5px monospace";
          ctx.fillText(nd.tag, nd.x, nd.y + 18);
        });

        // AD BAZAAR CRM Guarantee Stamp Top
        ctx.fillStyle = "#EFF6FF";
        ctx.beginPath();
        ctx.roundRect(cx - 100, cy - 65, 200, 22, 4);
        ctx.fill();
        ctx.fillStyle = "#1D4ED8";
        ctx.font = "bold 8.5px monospace";
        ctx.textAlign = "center";
        ctx.fillText("AD BAZAAR CRM &bull; ZERO LEAD LEAKAGE", cx, cy - 53);

      // =========================================================================
      // CARD 6: BUSINESS GROWTH & SCALING — Exponential Revenue Curve & Telemetry
      // =========================================================================
      } else if (type === "growth-scaling") {
        const startX = cx - 140;
        const startY = cy + 55;
        const endX = cx + 140;
        const endY = cy - 60;

        // Ascending exponential curve area
        const grad = ctx.createLinearGradient(0, endY, 0, startY);
        grad.addColorStop(0, "rgba(22, 163, 74, 0.25)");
        grad.addColorStop(0.7, "rgba(0, 129, 251, 0.08)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cx - 40, startY, cx + 40, cy + 20, endX, endY);
        ctx.lineTo(endX, startY);
        ctx.lineTo(startX, startY);
        ctx.closePath();
        ctx.fill();

        // Main Stroke
        ctx.strokeStyle = "#16A34A";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cx - 40, startY, cx + 40, cy + 20, endX, endY);
        ctx.stroke();

        // Moving peak pulse
        ctx.fillStyle = "#16A34A";
        ctx.shadowColor = "#16A34A";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(endX, endY, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Telemetry Metrics Grid on Left & Right
        const metrics = [
          { label: "MRR GROWTH", val: "+480%", color: "#16A34A" },
          { label: "CAC DROP", val: "-42%", color: "#0081FB" },
          { label: "LTV / CAC", val: "4.2x", color: "#7C3AED" },
        ];

        metrics.forEach((m, idx) => {
          const mx = cx - 130 + idx * 90;
          const my = cy - 45;
          ctx.save();
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowColor = "rgba(0, 0, 0, 0.05)";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.roundRect(mx - 38, my - 16, 76, 32, 6);
          ctx.fill();
          ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
          ctx.stroke();
          ctx.restore();

          ctx.fillStyle = "#6B7280";
          ctx.font = "6.5px monospace";
          ctx.textAlign = "center";
          ctx.fillText(m.label, mx, my - 4);

          ctx.fillStyle = m.color;
          ctx.font = "bold 11px sans-serif";
          ctx.fillText(m.val, mx, my + 8);
        });

        // AD BAZAAR SCALING SYSTEM Emblem Bottom
        ctx.fillStyle = "#0A0A0A";
        ctx.beginPath();
        ctx.roundRect(cx - 90, cy + 68, 180, 20, 4);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 8px monospace";
        ctx.textAlign = "center";
        ctx.fillText("AD BAZAAR SCALING ENGINE", cx, cy + 80);
      }

      // =========================================================================
      // Bottom Humanized Metrics Banner (Across all cards)
      // =========================================================================
      const bW = w - 40;
      const bH = 34;
      const bX = 20;
      const bY = h - 48;

      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.06)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.roundRect(bX, bY, bW, bH, 6);
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Live Green Active Status Dot
      ctx.fillStyle = "#16A34A";
      ctx.beginPath();
      ctx.arc(bX + 16, bY + bH / 2, 4, 0, Math.PI * 2);
      ctx.fill();

      // Dynamic Humanized Text per card
      ctx.fillStyle = "#0A0A0A";
      ctx.font = "600 10.5px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      let statusMsg = "Active Campaign Dashboard";
      let rightBadge = "4.8x ROAS";

      if (type === "meta-ads") {
        statusMsg = "Meta Ad Account &bull; Scaling Active";
        rightBadge = "+420% ROI";
      } else if (type === "google-ads") {
        statusMsg = "Google Search & P-Max &bull; 1st Page Rank";
        rightBadge = "9.4% CTR";
      } else if (type === "ad-videos") {
        statusMsg = "4K UGC Ad Creatives &bull; Thumb Stopping";
        rightBadge = "Hook 82%";
      } else if (type === "social-media") {
        statusMsg = "Daily Brand Distribution &bull; Active";
        rightBadge = "+140k Reach";
      } else if (type === "leads-management") {
        statusMsg = "Real-Time CRM & WhatsApp Nurture";
        rightBadge = "0% Lost Leads";
      } else if (type === "growth-scaling") {
        statusMsg = "Full-Funnel Growth Operating System";
        rightBadge = "Scale MRR";
      }

      ctx.fillText(statusMsg, bX + 28, bY + bH / 2);

      // Right Metric Pill
      ctx.fillStyle = "#F3F4F6";
      ctx.beginPath();
      ctx.roundRect(bX + bW - 78, bY + 6, 70, bH - 12, 4);
      ctx.fill();

      ctx.fillStyle = "#0081FB";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.fillText(rightBadge, bX + bW - 43, bY + bH / 2);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [type, hovered]);

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[#FFFFFF] border border-black/8 rounded-none group shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <canvas
        ref={canvasRef}
        width={420}
        height={350}
        className="w-full h-full object-cover block"
      />

      {/* Top Left Live Tech Badge */}
      <div className="absolute top-4 left-4 z-[3] flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 border border-black/10 shadow-sm pixel-clip-sm">
        <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
        <span className="font-mono text-[10px] font-semibold text-[#0A0A0A] uppercase tracking-wider">
          AD BAZAAR &bull; {type.toUpperCase().replace("-", " ")}
        </span>
      </div>

      {/* Hover Case Study Drawer */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/30 to-transparent translate-y-full group-hover/card:translate-y-0 transition-transform duration-500 ease-out pointer-events-none flex items-end justify-center pb-5">
        <span className="text-white text-xs font-mono font-medium uppercase tracking-widest bg-black/80 backdrop-blur-md px-5 py-2.5 border border-white/20 pixel-clip-sm shadow-xl">
          Launch Campaign &rarr;
        </span>
      </div>
    </div>
  );
};
