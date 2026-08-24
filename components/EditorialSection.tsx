"use client";

import React, { useState } from "react";
import { InteractiveSmileys } from "./InteractiveSmileys";

export const EditorialSection: React.FC = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <div className="space-y-0 relative z-2">
      {/* Section 1: Origin */}
      <div className="relative z-2 bg-transparent">
        <section
          className="ed py-16 md:py-24 px-7 md:px-14 group cursor-pointer"
          id="origin"
          data-cursor-label="✦"
          onMouseEnter={() => setHoveredSection("origin")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="wrap max-w-[1176px] mx-auto grid grid-cols-1 md:grid-cols-[0.82fr_1.18fr] gap-8 md:gap-14 items-start">
            <div className="head relative">
              <div className="flex items-start gap-3">
                <h2 className="text-[clamp(26px,3.4vw,46px)] leading-[1.06] tracking-[-0.02em] font-normal m-0 max-w-[16ch] text-[#0A0A0A]">
                  Is Your Business Stuck in Neutral?
                </h2>
                {/* Moving Animated Pixel Arrow */}
                <span className="inline-flex items-center text-[#7c3aed] animate-arrow-pulse transition-transform duration-300 group-hover:translate-x-2 mt-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="10" width="14" height="4" />
                    <polygon points="14,5 22,12 14,19" />
                  </svg>
                </span>
              </div>
              <p className="kick mono text-[#8b8b8b] text-[10px] mt-3.5 mb-0 tracking-widest uppercase">
                The Challenge
              </p>
            </div>
            <div>
              <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.62] max-w-[48ch] mb-4 text-[#2a2a2a] text-justify">
                You&apos;re spending money on ads but not seeing ROI. Your website is outdated and not converting. Your social media accounts are restricted or hacked.
              </p>
              <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.62] max-w-[48ch] mb-4 text-[#2a2a2a] text-justify">
                You&apos;re juggling multiple vendors who don&apos;t communicate. Your competitors are pulling ahead—and you&apos;re tired of watching.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Section 2: Shift */}
      <div className="relative z-2 bg-transparent">
        <section
          className="ed py-16 md:py-24 px-7 md:px-14 group cursor-pointer"
          id="shift"
          data-cursor-label="✦"
          onMouseEnter={() => setHoveredSection("shift")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="wrap max-w-[1176px] mx-auto grid grid-cols-1 md:grid-cols-[0.82fr_1.18fr] gap-8 md:gap-14 items-start">
            <div className="head relative">
              <div className="flex items-start gap-3">
                <h2 className="text-[clamp(26px,3.4vw,46px)] leading-[1.06] tracking-[-0.02em] font-normal m-0 max-w-[16ch] text-[#0A0A0A]">
                  We Fix It All.
                </h2>
                {/* Moving Animated Pixel Arrow */}
                <span className="inline-flex items-center text-[#2563eb] animate-arrow-pulse transition-transform duration-300 group-hover:translate-x-2 mt-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="10" width="14" height="4" />
                    <polygon points="14,5 22,12 14,19" />
                  </svg>
                </span>
              </div>
              <p className="kick mono text-[#8b8b8b] text-[10px] mt-3.5 mb-0 tracking-widest uppercase">
                The Solution
              </p>
            </div>
            <div>
              <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.62] max-w-[48ch] mb-4 text-[#2a2a2a] text-justify">
                We&apos;re not just another marketing agency. We&apos;re a full-service growth partner.
              </p>
              <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.62] max-w-[48ch] mb-4 text-[#2a2a2a] text-justify">
                Whether you need a complete digital transformation, a rescue mission for your restricted ad accounts, or a high-impact marketing campaign—we have the expertise to deliver results.
              </p>

              <InteractiveSmileys />
            </div>
          </div>
        </section>
      </div>

      {/* Section 3: AI Levels */}
      <div className="relative z-2 bg-transparent">
        <section
          className="ed py-16 md:py-24 px-7 md:px-14 group cursor-pointer"
          id="ai"
          data-cursor-label="✦"
          onMouseEnter={() => setHoveredSection("ai")}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="wrap max-w-[1176px] mx-auto grid grid-cols-1 md:grid-cols-[0.82fr_1.18fr] gap-8 md:gap-14 items-start">
            <div className="head relative">
              <div className="flex items-start gap-3">
                <h2 className="text-[clamp(26px,3.4vw,46px)] leading-[1.06] tracking-[-0.02em] font-normal m-0 max-w-[16ch] text-[#0A0A0A]">
                  Scale Your Revenue with the 3 Levels of Growth Marketing.
                </h2>
                {/* Moving Animated Pixel Arrow */}
                <span className="inline-flex items-center text-[#16a34a] animate-arrow-pulse transition-transform duration-300 group-hover:translate-x-2 mt-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="10" width="14" height="4" />
                    <polygon points="14,5 22,12 14,19" />
                  </svg>
                </span>
              </div>
              <p className="kick mono text-[#8b8b8b] text-[10px] mt-3.5 mb-0 tracking-widest uppercase">
                THE AD BAZAAR REVENUE ENGINE
              </p>
            </div>
            <div>
              <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.62] max-w-[48ch] mb-4 text-[#2a2a2a] text-justify">
                Marketing isn&apos;t just about boosting posts or vanity impressions. It&apos;s about building an automated customer acquisition machine that compounds your return on investment month after month.
              </p>
              <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.62] max-w-[48ch] mb-4 text-[#2a2a2a] text-justify">
                From high-converting ad creative rollouts to automated lead capture and enterprise budget scaling—we eliminate the guesswork so your marketing delivers predictable profit.
              </p>

              <ul className="pts list-none my-6 p-0 border-t border-b border-black/12">
                <li className="grid grid-cols-[auto_1fr] gap-4 items-baseline py-3.5 border-b border-black/12 text-[15px]">
                  <span className="n mono text-[#7c3aed] font-bold">L1</span>
                  <span>
                    <b className="font-medium text-[#0A0A0A]">Traffic & Acquisition.</b> High-ROI Meta & Google Ads, influencer campaigns, and immediate qualified buyer traffic.
                  </span>
                </li>
                <li className="grid grid-cols-[auto_1fr] gap-4 items-baseline py-3.5 border-b border-black/12 text-[15px]">
                  <span className="n mono text-[#2563eb] font-bold">L2</span>
                  <span>
                    <b className="font-medium text-[#0A0A0A]">Funnels & Automation.</b> Conversion-focused landing pages, automated WhatsApp/Email lead nurture, and CRM pipelines that close deals.
                  </span>
                </li>
                <li className="grid grid-cols-[auto_1fr] gap-4 items-baseline py-3.5 text-[15px]">
                  <span className="n mono text-[#16a34a] font-bold">L3</span>
                  <span>
                    <b className="font-medium text-[#0A0A0A]">Scale & Dominance.</b> AI-driven audience expansion, retargeting engines, and data-backed budget scaling to dominate your niche.
                  </span>
                </li>
              </ul>

              <p className="s text-[#2a2a2a] text-[clamp(15px,1.15vw,18px)]">
                We focus on the metrics that actually matter: Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), and real money in the bank.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
