"use client";

import React, { useRef } from "react";

interface CampaignCard {
  title: string;
  service: string;
  client: string;
  widthClass: string;
  tag: string;
  gradient: string;
}

const campaigns: CampaignCard[] = [
  {
    title: "THE MONOLITH LAUNCH",
    service: "META ADS & 3D MOTION",
    client: "VELOCE AUTOMOTIVE",
    widthClass: "w-[340px] md:w-[460px]",
    tag: "PAID SOCIAL",
    gradient: "from-[#1c1a14] via-[#0f0e0a] to-[#050505]",
  },
  {
    title: "INTENT ACCELERATOR",
    service: "GOOGLE SEARCH & P-MAX",
    client: "VERTEX REAL ESTATE",
    widthClass: "w-[280px] md:w-[360px]",
    tag: "PAID SEARCH",
    gradient: "from-[#181818] via-[#101010] to-[#050505]",
  },
  {
    title: "EDITORIAL ATELIER",
    service: "CONTENT & SOCIAL ECOSYSTEM",
    client: "MAISON D'OR JEWELLERY",
    widthClass: "w-[360px] md:w-[500px]",
    tag: "CREATIVE PRODUCTION",
    gradient: "from-[#221e16] via-[#12100b] to-[#050505]",
  },
  {
    title: "SCALING FUNNEL ENGINE",
    service: "LEADS MANAGEMENT & CRM",
    client: "NOVA CLINICAL GROUP",
    widthClass: "w-[300px] md:w-[400px]",
    tag: "GROWTH ARCHITECTURE",
    gradient: "from-[#1a1a1a] via-[#0d0d0d] to-[#050505]",
  },
  {
    title: "VIRAL PRODUCT REVEAL",
    service: "SHORT-FORM AD VIDEOS",
    client: "SOLIS APPAREL",
    widthClass: "w-[340px] md:w-[440px]",
    tag: "VIDEO CREATIVE",
    gradient: "from-[#242016] via-[#14120c] to-[#050505]",
  },
];

export const CampaignCreativeSlider: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const delta = direction === "left" ? -400 : 400;
    trackRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="relative w-full py-8">
      {/* Navigation Controls */}
      <div className="flex justify-end gap-3 px-7 md:px-14 mb-6">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="w-11 h-11 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-white flex items-center justify-center bg-black/60 hover:bg-[#D4AF37] hover:text-black transition-all font-mono text-sm"
          aria-label="Scroll left"
        >
          &larr;
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          className="w-11 h-11 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-white flex items-center justify-center bg-black/60 hover:bg-[#D4AF37] hover:text-black transition-all font-mono text-sm"
          aria-label="Scroll right"
        >
          &rarr;
        </button>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scrollbar-none px-7 md:px-14 pb-8 select-none"
      >
        {campaigns.map((card, idx) => (
          <div
            key={idx}
            className={`group/card ${card.widthClass} flex-none aspect-[16/11] bg-[#0A0A0A] border border-white/10 hover:border-[#D4AF37] transition-all duration-500 flex flex-col justify-between p-7 relative overflow-hidden`}
          >
            {/* Background luxury gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90 group-hover/card:scale-105 transition-transform duration-700 pointer-events-none`} />

            {/* Corner metallic accent */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/40 pointer-events-none group-hover/card:border-[#D4AF37] transition-colors" />

            {/* Top Tag & Client */}
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] px-2.5 py-1 bg-black/70 border border-[#D4AF37]/30">
                  {card.tag}
                </span>
                <p className="font-mono text-[11px] text-[#C0C0C0] uppercase tracking-wider mt-3 mb-0">
                  {card.client}
                </p>
              </div>
              <span className="font-mono text-xs text-white/40">0{idx + 1}</span>
            </div>

            {/* Center / Bottom Title & Service */}
            <div className="relative z-10 border-t border-white/10 pt-5">
              <h3 className="font-sans font-bold text-white text-[22px] md:text-[28px] tracking-tight leading-tight m-0 group-hover/card:text-[#D4AF37] transition-colors">
                {card.title}
              </h3>
              <p className="font-mono text-[11px] text-[#C0C0C0] uppercase tracking-widest mt-2 mb-4">
                {card.service}
              </p>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/60 group-hover/card:text-white transition-colors">
                  VIEW CAMPAIGN &rarr;
                </span>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs text-white group-hover/card:border-[#D4AF37] group-hover/card:text-[#D4AF37] transition-colors">
                  ↗
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
