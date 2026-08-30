"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const PodcastStudioSection: React.FC = () => {
  return (
    <section className="relative z-2 py-10 sm:py-16 md:py-20 px-4 sm:px-7 md:px-14 bg-transparent" id="podcast-studio">
      {/* Embedded SVG Definition for Theme Stepped Frame (Matching Image 2) */}
      <svg width="0" height="0" className="absolute pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          <clipPath id="theme-stepped-frame" clipPathUnits="objectBoundingBox">
            <path d="
              M 0, 0.05
              Q 0, 0, 0.05, 0
              L 0.95, 0
              Q 1, 0, 1, 0.05
              L 1, 0.95
              Q 1, 1, 0.95, 1
              L 0.54, 1
              Q 0.48, 1, 0.48, 0.94
              L 0.48, 0.88
              Q 0.48, 0.82, 0.42, 0.82
              L 0.05, 0.82
              Q 0, 0.82, 0, 0.77
              Z
            " />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-[1176px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Podcast Studio Image with Theme Stepped Shape (Flipped) */}
          <div className="relative flex items-center justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-full max-w-[480px] sm:max-w-[520px] aspect-[4/5]">
              {/* Stepped Frame Image Wrapper */}
              <div 
                className="theme-stepped-mask relative w-full h-full overflow-hidden group drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                style={{
                  clipPath: "url(#theme-stepped-frame)",
                  WebkitClipPath: "url(#theme-stepped-frame)",
                }}
              >
                <Image
                  src="/podcast.png"
                  alt="AD BAZAAR Professional Podcast & Visual Studio"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 520px"
                  priority
                />

                {/* Ambient Soft Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Value Proposition (Flipped) */}
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-[clamp(28px,3.8vw,50px)] leading-[1.06] tracking-[-0.025em] font-normal m-0 text-[#0A0A0A]">
              Where High-Impact<br />
              <span className="font-semibold text-black">Content Comes to Life.</span>
            </h2>

            <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.62] text-[#333333] max-w-[52ch]">
              We don&apos;t just run ads — we build full-scale content engines. Our professional in-house podcast and video studio is equipped with multi-cam 4K cinema cameras, acoustic engineering, and studio-grade Godox softbox lighting to position your brand as the undisputed authority in your niche.
            </p>

            {/* Studio Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 py-1">
                <div className="shrink-0 mt-0.5 text-[#0A0A0A]">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#0A0A0A] m-0">4K Multi-Cam Podcasts</h4>
                  <p className="text-xs text-[#666666] m-0 mt-1 leading-normal">
                    Multi-angle cinematic interviews and founder episodes with broadcast audio.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 py-1">
                <div className="shrink-0 mt-0.5 text-[#0A0A0A]">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#0A0A0A] m-0">Viral Reels & Shorts</h4>
                  <p className="text-xs text-[#666666] m-0 mt-1 leading-normal">
                    Every session is repurposed into 10–15 high-converting vertical video hooks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 py-1">
                <div className="shrink-0 mt-0.5 text-[#0A0A0A]">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#0A0A0A] m-0">Studio Lighting & Sound</h4>
                  <p className="text-xs text-[#666666] m-0 mt-1 leading-normal">
                    Godox softboxes, acoustic baffling, and studio microphones for flawless output.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 py-1">
                <div className="shrink-0 mt-0.5 text-[#0A0A0A]">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#0A0A0A] m-0">Full-Funnel Distribution</h4>
                  <p className="text-xs text-[#666666] m-0 mt-1 leading-normal">
                    Synced with YouTube, Instagram, Spotify & paid ad campaigns for maximum ROI.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link href="/contact" className="btn-site text-sm py-3.5 px-8">
                Book a Studio Session →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
