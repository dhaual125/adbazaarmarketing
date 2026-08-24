"use client";

import React, { useState } from "react";

interface ReelItem {
  id: string;
  client: string;
  category: string;
  format: string;
  metric: string;
  color: string;
  videoSrc?: string;
}

const reelsRow1: ReelItem[] = [
  {
    id: "r1",
    client: "VELOCE LUXURY",
    category: "META ADS / CONTENT",
    format: "9:16 REEL",
    metric: "4.8x ROAS",
    color: "#D4AF37",
  },
  {
    id: "r2",
    client: "AURA COUTURE",
    category: "FASHION CAMPAIGN",
    format: "9:16 REEL",
    metric: "1.2M VIEWS",
    color: "#C0C0C0",
  },
  {
    id: "r3",
    client: "NOVA WELLNESS",
    category: "UGC / SHORT-FORM",
    format: "9:16 REEL",
    metric: "320+ LEADS",
    color: "#D4AF37",
  },
  {
    id: "r4",
    client: "VERTEX REALTY",
    category: "META CONVERSION",
    format: "9:16 REEL",
    metric: "HIGH-TICKET QUAL",
    color: "#C0C0C0",
  },
  {
    id: "r5",
    client: "SOLIS JEWELLERY",
    category: "3D MOTION / ADS",
    format: "9:16 REEL",
    metric: "5.4x ROAS",
    color: "#D4AF37",
  },
];

const reelsRow2: ReelItem[] = [
  {
    id: "r6",
    client: "KINETIC FITNESS",
    category: "VIRAL HOOK VIDEO",
    format: "9:16 REEL",
    metric: "840K IMPR",
    color: "#C0C0C0",
  },
  {
    id: "r7",
    client: "MAISON D'OR",
    category: "EDITORIAL BRANDING",
    format: "9:16 REEL",
    metric: "+240% REACH",
    color: "#D4AF37",
  },
  {
    id: "r8",
    client: "PRISM TECH",
    category: "PRODUCT LAUNCH AD",
    format: "9:16 REEL",
    metric: "P-MAX + META",
    color: "#C0C0C0",
  },
  {
    id: "r9",
    client: "ELEMENTAL HOME",
    category: "LEAD ACCELERATOR",
    format: "9:16 REEL",
    metric: "48H CONVERSION",
    color: "#D4AF37",
  },
  {
    id: "r10",
    client: "LUMEN HOSPITALITY",
    category: "SOCIAL MANAGEMENT",
    format: "9:16 REEL",
    metric: "VIP ENGAGEMENT",
    color: "#C0C0C0",
  },
];

export const ClientReelsSlider: React.FC = () => {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  return (
    <div className="relative w-full overflow-hidden py-12">
      {/* Row 1 — Moving Left to Right */}
      <div className="relative mb-6 overflow-hidden">
        <div className="flex gap-6 animate-marquee-row-1 hover:[animation-play-state:paused] w-max">
          {[...reelsRow1, ...reelsRow1, ...reelsRow1].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setActiveReel(item)}
              className="group/reel relative w-[220px] md:w-[260px] aspect-[9/16] bg-[#0A0A0A] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between p-5 select-none"
            >
              {/* Subtle background gradient & grid */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#181818] via-[#0D0D0D] to-[#050505] opacity-90 group-hover/reel:scale-105 transition-transform duration-700 pointer-events-none" />

              {/* Decorative 9:16 frame line */}
              <div className="absolute inset-2 border border-white/5 pointer-events-none group-hover/reel:border-[#D4AF37]/30 transition-colors" />

              {/* Top Meta info */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] px-2 py-0.5 bg-black/60 border border-[#D4AF37]/30">
                  {item.format}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              </div>

              {/* Middle Floating Play Icon HUD */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover/reel:scale-110 group-hover/reel:border-[#D4AF37] transition-transform">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#C0C0C0] opacity-80">
                  {item.metric}
                </span>
              </div>

              {/* Bottom Client & Category */}
              <div className="relative z-10 border-t border-white/10 pt-3">
                <h4 className="font-sans font-bold text-white text-[15px] tracking-tight m-0">
                  {item.client}
                </h4>
                <p className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-wider mt-1 mb-0">
                  {item.category}
                </p>
                <div className="mt-2 text-right">
                  <span className="text-[10px] font-mono text-white/50 group-hover/reel:text-[#D4AF37] transition-colors">
                    WATCH REEL &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — Moving Right to Left */}
      <div className="relative overflow-hidden">
        <div className="flex gap-6 animate-marquee-row-2 hover:[animation-play-state:paused] w-max">
          {[...reelsRow2, ...reelsRow2, ...reelsRow2].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setActiveReel(item)}
              className="group/reel relative w-[220px] md:w-[260px] aspect-[9/16] bg-[#0A0A0A] border border-[#C0C0C0]/20 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between p-5 select-none"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#141414] via-[#0B0B0B] to-[#050505] opacity-90 group-hover/reel:scale-105 transition-transform duration-700 pointer-events-none" />
              <div className="absolute inset-2 border border-white/5 pointer-events-none group-hover/reel:border-[#D4AF37]/30 transition-colors" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C0C0C0] px-2 py-0.5 bg-black/60 border border-white/10">
                  {item.format}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#C0C0C0] animate-pulse" />
              </div>

              <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover/reel:scale-110 group-hover/reel:border-[#D4AF37] transition-transform">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] opacity-90">
                  {item.metric}
                </span>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-3">
                <h4 className="font-sans font-bold text-white text-[15px] tracking-tight m-0">
                  {item.client}
                </h4>
                <p className="font-mono text-[10px] text-[#C0C0C0] uppercase tracking-wider mt-1 mb-0">
                  {item.category}
                </p>
                <div className="mt-2 text-right">
                  <span className="text-[10px] font-mono text-white/50 group-hover/reel:text-[#D4AF37] transition-colors">
                    WATCH REEL &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Preview */}
      {activeReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setActiveReel(null)}
        >
          <div
            className="relative w-full max-w-[420px] aspect-[9/16] bg-[#0A0A0A] border border-[#D4AF37] flex flex-col justify-between p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase">
                  {activeReel.category}
                </span>
                <h3 className="font-bold text-white text-lg tracking-tight mt-0.5">
                  {activeReel.client}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveReel(null)}
                className="text-white hover:text-[#D4AF37] font-mono text-xl p-1"
              >
                ✕
              </button>
            </div>

            <div className="my-auto flex flex-col items-center justify-center text-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-black/60 animate-pulse">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <p className="font-sans text-sm text-[#C0C0C0] max-w-[28ch]">
                Editorial 9:16 reel preview for {activeReel.client}. High-impact creative built to stop the scroll.
              </p>
              <div className="px-4 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] font-mono text-xs uppercase tracking-widest">
                Impact: {activeReel.metric}
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-between">
              <span className="font-mono text-[10px] text-white/50">AD BAZAAR PRODUCTION</span>
              <button
                type="button"
                onClick={() => setActiveReel(null)}
                className="px-4 py-2 bg-[#D4AF37] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
