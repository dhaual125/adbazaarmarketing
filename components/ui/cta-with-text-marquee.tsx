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
    <section className="relative z-2 bg-transparent text-[#0A0A0A] px-4 sm:px-7 md:px-14 pt-[88px] sm:pt-20 md:pt-24 pb-10 sm:pb-16 overflow-x-clip">
      
      {/* Embedded SVG Definition: Just a Little More Upper Cutout Depth */}
      <svg width="0" height="0" className="absolute pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          <clipPath id="hero-header-stepped-frame" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.32, 0.13
              Q 0.32, 0.16, 0.28, 0.16
              L 0.05, 0.16
              Q 0, 0.16, 0, 0.22
              L 0, 0.32
              Q 0, 0.35, 0.015, 0.35
              L 0.015, 0.42
              Q 0, 0.42, 0, 0.45
              L 0, 0.92
              Q 0, 1, 0.08, 1
              L 0.82, 1
              Q 0.87, 1, 0.87, 0.95
              L 0.87, 0.85
              Q 0.87, 0.80, 0.92, 0.80
              L 0.95, 0.80
              Q 1, 0.80, 1, 0.75
              L 1, 0.08
              Q 1, 0, 0.92, 0
              L 0.38, 0
              Q 0.32, 0, 0.32, 0.06
              L 0.32, 0.13
              Z
            " />
          </clipPath>
        </defs>
      </svg>

      <div className="w-full max-w-[1320px] mx-auto animate-fade-in-up">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column */}
          <div className="space-y-3 sm:space-y-5 text-left">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F6EE74] flex items-center justify-center text-black shadow-sm shrink-0">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 19h4V9H4v10zm6 0h4V5h-4v14zm6 0h4v-7h-4v7z" />
                </svg>
              </div>
              <span className="text-[13px] sm:text-[15px] font-mono font-bold tracking-[0.22em] text-[#0A0A0A] uppercase">
                MARKETING
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(40px,9vw,98px)] leading-[0.88] tracking-[-0.03em] text-[#0A0A0A] uppercase m-0 select-none">
              <span className="font-normal block">GROW</span>
              <span className="font-normal block">YOUR</span>
              <span className="relative inline-block font-light italic tracking-tight">
                <span className="relative z-10">BUSINESS</span>
                <span
                  className="absolute bottom-1 sm:bottom-2 left-[-2%] w-[104%] h-[4px] sm:h-[6px] md:h-[7px] bg-[#E2F163] -rotate-[1.6deg] origin-bottom-left z-0 pointer-events-none rounded-full"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[clamp(13.5px,1.2vw,18px)] font-medium leading-[1.6] text-[#2a2a2a] max-w-[42ch] m-0">
              Ads that drive revenue. Influencers that build reach. AI, software &amp; creative that power your growth.
            </p>
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative flex items-center justify-center lg:justify-end w-full mt-2 sm:mt-0">
            <div className="relative w-full max-w-[480px] sm:max-w-[620px] lg:max-w-[780px] xl:max-w-[840px] aspect-[4/3.4] sm:aspect-[4/3.2] lg:aspect-[4/3.0]">
              
              {/* Top-Left Marquee Ticker */}
              <div className="absolute top-6 sm:top-8 md:top-10 left-0 w-[38%] sm:w-[30%] h-[22px] sm:h-[30px] md:h-[38px] overflow-hidden z-10 pointer-events-none flex items-center px-1.5 sm:px-2.5">
                <div className="animate-marquee-vertical w-full text-[8px] sm:text-[10px] md:text-[12px] font-mono font-bold tracking-[0.12em] sm:tracking-[0.16em] text-[#0A0A0A] uppercase">
                  {marqueeItems.concat(marqueeItems).map((item, idx) => (
                    <div key={idx} className="h-[22px] sm:h-[30px] md:h-[38px] flex items-center gap-1.5 shrink-0">
                      <span className="text-[4px] sm:text-[5px] text-[#F6EE74]">●</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stepped Frame Image */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5 pointer-events-none" />
              </div>

              {/* Rotating Circular Badge */}
              <div className="absolute -left-2 sm:-left-5 md:-left-8 top-[28%] sm:top-[32%] z-20 p-1 sm:p-2 rounded-full bg-[#e7e7e9] flex items-center justify-center shadow-none">
                <Link
                  href="/contact"
                  aria-label="Book a strategy call"
                  className="w-12 h-12 sm:w-16 md:w-[86px] sm:h-16 md:h-[86px] rounded-full bg-[#F6EE74] text-black flex items-center justify-center hover:scale-105 transition-transform duration-300 group/circle relative overflow-hidden shrink-0"
                >
                  <svg className="w-full h-full animate-spin-slow pointer-events-none" viewBox="0 0 100 100">
                    <defs>
                      <path id="circlePathHero" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                    </defs>
                    <text fontSize="9" fontWeight="900" letterSpacing="2.8" fill="#000000">
                      <textPath href="#circlePathHero" startOffset="0%">GROW TODAY ✦ AD BAZAAR ✦</textPath>
                    </text>
                  </svg>
                  <div className="absolute w-5 h-5 sm:w-6 md:w-8 sm:h-6 md:h-8 rounded-full bg-black text-[#F6EE74] flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 sm:w-3 md:w-4 sm:h-3 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </Link>
              </div>

              {/* Bottom-Right Arrow Button */}
              <div className="absolute bottom-0 right-0 z-20 w-12 h-12 sm:w-16 md:w-20 sm:h-16 md:h-20 flex items-center justify-center">
                <Link
                  href="/contact"
                  aria-label="Contact Us"
                  className="w-9 h-9 sm:w-12 md:w-14 sm:h-12 md:h-14 rounded-full border border-black/15 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-all duration-300 group/arrow"
                >
                  <div className="w-6 h-6 sm:w-8 md:w-10 sm:h-8 md:h-10 rounded-full bg-black text-white flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 md:w-5 sm:h-4 md:h-5 transition-transform group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
