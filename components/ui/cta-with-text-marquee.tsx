"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CTAWithVerticalMarquee() {
  const marqueeItems = [
    "AI & Custom Tech",
    "Google & Meta Ads",
    "Creative Production",
    "Leads & CRM Pipeline",
    "High-Converting Video",
    "Full Brand Scaling",
  ];

  return (
    <section className="relative z-2 bg-transparent text-[#0A0A0A] px-4 sm:px-7 md:px-14 pt-24 sm:pt-14 md:pt-20 pb-10 sm:pb-16 overflow-x-clip">
      
      {/* Embedded SVG Definition for Header Dual-Stepped Frame (Matching Screenshot) */}
      <svg width="0" height="0" className="absolute pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          <clipPath id="hero-header-stepped-frame" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.44, 0.16
              L 0.06, 0.16
              Q 0, 0.16, 0, 0.22
              L 0, 0.94
              Q 0, 1, 0.06, 1
              L 0.68, 1
              Q 0.74, 1, 0.74, 0.94
              L 0.74, 0.82
              Q 0.74, 0.76, 0.80, 0.76
              L 0.94, 0.76
              Q 1, 0.76, 1, 0.70
              L 1, 0.06
              Q 1, 0, 0.94, 0
              L 0.50, 0
              Q 0.44, 0, 0.44, 0.06
              Z
            " />
          </clipPath>
        </defs>
      </svg>

      <div className="w-full max-w-[1240px] mx-auto animate-fade-in-up">
        
        {/* Top Eyebrow (Matching Background Theme) */}
        <div className="flex items-center justify-end sm:justify-start gap-2 mb-5 sm:mb-8">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-[#0A0A0A]">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 19h4V9H4v10zm6 0h4V5h-4v14zm6 0h4v-7h-4v7z" />
            </svg>
          </div>
          <span className="text-[10px] sm:text-[12px] font-mono font-bold tracking-[0.2em] sm:tracking-[0.22em] text-[#0A0A0A] uppercase">
            MARKETING
          </span>
        </div>

        {/* Main Grid Layout (Matching Reference Design with larger image) */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 sm:gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Big Bold Typography & Subtitle */}
          <div className="space-y-4 sm:space-y-7 text-left">
            
            {/* Giant Bold Headline */}
            <h1 className="text-[clamp(38px,8.5vw,92px)] font-extrabold leading-[0.90] tracking-[-0.04em] text-[#0A0A0A] uppercase m-0 select-none">
              GROW<br />
              YOUR<br />
              BUSINESS
            </h1>

            {/* Subtitle Description */}
            <p className="text-[clamp(14.5px,1.25vw,19px)] font-medium leading-[1.6] text-[#2a2a2a] max-w-[42ch] m-0">
              Ads that drive revenue. Influencers that build reach. AI, software &amp; creative that power your growth.
            </p>
          </div>

          {/* Right Column: Hero Studio Photo with Top Shelf Marquee Ticker & Stepped Corner Notch Frame */}
          <div className="relative flex items-center justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[520px] sm:max-w-[620px] lg:max-w-[700px] aspect-[4/3.3] sm:aspect-[4/3.2] lg:aspect-[4/3.1]">
              
              {/* Top-Left Shelf Slow-Motion Marquee Ticker (Matching Screenshot) */}
              <div className="absolute top-0.5 sm:top-1 left-0 w-[46%] sm:w-[42%] overflow-hidden py-0.5 sm:py-1 z-10 pointer-events-none">
                <div className="animate-marquee-slow text-[9px] sm:text-[11px] font-mono font-bold tracking-[0.16em] sm:tracking-[0.18em] text-[#0A0A0A] uppercase whitespace-nowrap">
                  {marqueeItems.concat(marqueeItems).map((item, idx) => (
                    <span key={idx} className="inline-flex items-center gap-2 sm:gap-2.5 mr-2 sm:mr-3 shrink-0">
                      <span>{item}</span>
                      <span className="text-[6px] sm:text-[7px] opacity-60">●</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Stepped Frame Image Wrapper with Corner Cutout */}
              <div 
                className="relative w-full h-full overflow-hidden shadow-2xl group"
                style={{
                  clipPath: "url(#hero-header-stepped-frame)",
                  WebkitClipPath: "url(#hero-header-stepped-frame)",
                }}
              >
                <Image
                  src="/header.png"
                  alt="AD BAZAAR Studio & Office"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 700px"
                  priority
                />

                {/* Ambient Soft Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5 pointer-events-none" />
              </div>

              {/* Rotating Circular Badge on Left Edge of Image (Pure Light Yellow, No Green) */}
              <Link 
                href="/contact"
                aria-label="Book a strategy call"
                className="absolute -left-3 sm:-left-6 top-[34%] sm:top-[38%] z-20 w-16 h-16 sm:w-20 md:w-24 sm:h-20 md:h-24 rounded-full bg-[#F6EE74] text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 group/circle"
              >
                <svg className="w-full h-full animate-spin-slow pointer-events-none" viewBox="0 0 100 100">
                  <defs>
                    <path
                      id="circlePathHero"
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    />
                  </defs>
                  <text fontSize="10" fontWeight="800" letterSpacing="2.5" fill="#000">
                    <textPath href="#circlePathHero" startOffset="0%">
                      ✦ AD BAZAAR ✦ GROW TODAY
                    </textPath>
                  </text>
                </svg>
                <div className="absolute w-6 h-6 sm:w-7 md:w-8 sm:h-7 md:h-8 rounded-full bg-black text-[#F6EE74] flex items-center justify-center shadow-inner">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform -rotate-45 group-hover/circle:rotate-0 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              {/* Bottom-Right Nested Circular Arrow Button (Clean & Borderless with White Arrow ↗) */}
              <Link
                href="/contact"
                aria-label="Contact Us"
                className="absolute bottom-0 right-0 z-20 w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 rounded-full bg-black text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 group/arrow"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
