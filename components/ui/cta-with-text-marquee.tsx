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

      <div className="w-full max-w-[1320px] mx-auto animate-fade-in-up">
        
        {/* Top Eyebrow (Matching Image with Light Yellow Icon) */}
        <div className="flex items-center gap-2.5 mb-5 sm:mb-8">
          <div className="w-6 h-6 rounded-full bg-[#F6EE74] flex items-center justify-center text-black shadow-sm">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 19h4V9H4v10zm6 0h4V5h-4v14zm6 0h4v-7h-4v7z" />
            </svg>
          </div>
          <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.22em] text-[#0A0A0A] uppercase">
            MARKETING
          </span>
        </div>

        {/* Main Grid Layout (Enlarged right image side) */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Big Bold Typography with Italic Accent & Subtitle */}
          <div className="space-y-4 sm:space-y-7 text-left">
            
            {/* Headline Matching Exact Typography from Screenshot (Thin GROW & YOUR + Thin Italic BUSINESS without underline) */}
            <h1 className="text-[clamp(44px,8.5vw,98px)] leading-[0.86] tracking-[-0.03em] text-[#0A0A0A] uppercase m-0 select-none">
              <span className="font-normal block tracking-[-0.02em]">GROW</span>
              <span className="font-normal block tracking-[-0.02em]">YOUR</span>
              <span className="relative inline-block font-light italic tracking-tight text-[#0A0A0A]">
                BUSINESS
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-[clamp(14.5px,1.25vw,19px)] font-medium leading-[1.6] text-[#2a2a2a] max-w-[42ch] m-0">
              Ads that drive revenue. Influencers that build reach. AI, software &amp; creative that power your growth.
            </p>
          </div>

          {/* Right Column: Hero Studio Photo (Enlarged Size) with Top Shelf Marquee Ticker & Stepped Corner Notch Frame */}
          <div className="relative flex items-center justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[560px] sm:max-w-[680px] lg:max-w-[780px] xl:max-w-[840px] aspect-[4/3.2] sm:aspect-[4/3.1] lg:aspect-[4/3.0]">
              
              {/* Top-Left Shelf Vertical Scrolling Marquee Ticker */}
              <div className="absolute top-0 sm:top-0.5 left-0 w-[46%] sm:w-[42%] h-[20px] sm:h-[26px] md:h-[30px] overflow-hidden z-10 pointer-events-none flex items-center">
                <div className="animate-marquee-vertical w-full text-[9px] sm:text-[11px] font-mono font-bold tracking-[0.16em] sm:tracking-[0.18em] text-[#0A0A0A] uppercase">
                  {marqueeItems.concat(marqueeItems).map((item, idx) => (
                    <div key={idx} className="h-[20px] sm:h-[26px] md:h-[30px] flex items-center gap-2 shrink-0">
                      <span className="text-[6px] sm:text-[7px] text-[#F6EE74]">●</span>
                      <span>{item}</span>
                    </div>
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 840px"
                  priority
                />

                {/* Ambient Soft Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5 pointer-events-none" />
              </div>

              {/* Rotating Circular Button with White Strip Halo (Matching Image: GROW TODAY ✦ AD BAZAAR with Light Yellowish #F6EE74) */}
              <div className="absolute -left-3 sm:-left-6 md:-left-8 top-[30%] sm:top-[36%] z-20 p-1.5 sm:p-2.5 rounded-full bg-[#e7e7e9] flex items-center justify-center pointer-events-auto shadow-none">
                <Link 
                  href="/contact"
                  aria-label="Book a strategy call - Grow Today"
                  className="w-16 h-16 sm:w-20 md:w-[88px] sm:h-20 md:h-[88px] rounded-full bg-[#F6EE74] text-black flex items-center justify-center hover:scale-105 transition-transform duration-300 group/circle relative overflow-hidden shrink-0"
                >
                  <svg className="w-full h-full animate-spin-slow pointer-events-none" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id="circlePathHero"
                        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                      />
                    </defs>
                    <text fontSize="9" fontWeight="900" letterSpacing="2.8" fill="#000000">
                      <textPath href="#circlePathHero" startOffset="0%">
                        GROW TODAY ✦ AD BAZAAR ✦
                      </textPath>
                    </text>
                  </svg>
                  {/* Center Solid Black Circle with Diagonal Arrow */}
                  <div className="absolute w-6 h-6 sm:w-7 md:w-8 sm:h-7 md:h-8 rounded-full bg-black text-[#F6EE74] flex items-center justify-center shadow-sm">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover/circle:translate-x-0.5 group-hover/circle:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </Link>
              </div>

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
