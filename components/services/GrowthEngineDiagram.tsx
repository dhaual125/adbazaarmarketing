"use client";

import React, { useState } from "react";

const engineStages = [
  {
    step: "01",
    name: "STRATEGY",
    desc: "Market positioning, competitive intelligence, and high-impact growth blueprinting.",
    detail: "We define the exact customer avatar, unit economics, and campaign trajectory before spend begins.",
  },
  {
    step: "02",
    name: "ADVERTISING",
    desc: "Targeted Meta & Google acquisition campaigns engineered to convert cold intent.",
    detail: "Multi-channel media buying optimized around ROAS, CPA thresholds, and revenue velocity.",
  },
  {
    step: "03",
    name: "CONTENT",
    desc: "Cinematic ad videos, UGC hooks, and high-end visual brand storytelling.",
    detail: "Thumb-stopping creative assets produced in-house to combat ad fatigue and lower acquisition costs.",
  },
  {
    step: "04",
    name: "LEADS",
    desc: "Instant capture, intelligent qualification, and high-intent prospect filtering.",
    detail: "Every inbound lead is scored and routed in real time so your pipeline stays filled with real buyers.",
  },
  {
    step: "05",
    name: "MANAGEMENT",
    desc: "Automated nurturing sequences, CRM orchestration, and follow-up loops.",
    detail: "Closing the gap between lead capture and conversion with zero dropped opportunities.",
  },
  {
    step: "06",
    name: "GROWTH",
    desc: "Full-funnel optimization, budget scaling, and sustainable business revenue expansion.",
    detail: "Compounding returns across all digital channels turning momentum into market dominance.",
  },
];

export const GrowthEngineDiagram: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <div className="relative w-full max-w-[1176px] mx-auto py-12">
      {/* Central Core Branding */}
      <div className="relative flex flex-col items-center justify-center text-center mb-14">
        <div className="w-28 h-28 rounded-full border border-[#D4AF37] bg-[#0A0A0A] flex flex-col items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.2)] mb-4 relative">
          <div className="absolute inset-1 rounded-full border border-[#D4AF37]/30 animate-spin [animation-duration:15s]" />
          <span className="font-mono text-[10px] text-[#D4AF37] tracking-widest font-bold">AD</span>
          <span className="font-mono text-[11px] text-white tracking-widest font-bold">BAZAAR</span>
          <span className="font-mono text-[7px] text-[#C0C0C0] tracking-widest uppercase mt-0.5">ENGINE</span>
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] max-w-[42ch]">
          ONE UNIFIED DIGITAL GROWTH OPERATING SYSTEM
        </p>
      </div>

      {/* 6 Connected Engine Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
        {engineStages.map((stage, idx) => {
          const isActive = activeStage === idx;
          return (
            <div
              key={stage.step}
              onClick={() => setActiveStage(idx)}
              onMouseEnter={() => setActiveStage(idx)}
              className={`relative p-6 bg-[#0A0A0A] border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] select-none ${
                isActive
                  ? "border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-[#121212]"
                  : "border-white/10 hover:border-[#D4AF37]/50"
              }`}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#D4AF37] font-bold">
                  {stage.step}
                </span>
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? "bg-[#D4AF37] animate-pulse" : "bg-white/20"
                  }`}
                />
              </div>

              {/* Title */}
              <div className="my-4">
                <h4 className="font-sans font-bold text-white text-lg tracking-tight m-0">
                  {stage.name}
                </h4>
                <p className="font-sans text-xs text-[#C0C0C0] leading-relaxed mt-2 mb-0">
                  {stage.desc}
                </p>
              </div>

              {/* Bottom flow arrow */}
              <div className="border-t border-white/10 pt-3 flex items-center justify-between font-mono text-[9px] text-[#D4AF37] uppercase tracking-wider">
                <span>STAGE {idx + 1}</span>
                <span>&rarr;</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Stage Deep-Dive Banner */}
      <div className="mt-8 p-6 md:p-8 bg-[#0D0D0D] border border-[#D4AF37]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-black bg-[#D4AF37] px-2 py-0.5 font-bold uppercase">
              STAGE {engineStages[activeStage].step}
            </span>
            <h3 className="font-sans font-bold text-white text-xl tracking-tight m-0">
              {engineStages[activeStage].name}
            </h3>
          </div>
          <p className="font-sans text-sm text-[#C0C0C0] max-w-[68ch] m-0">
            {engineStages[activeStage].detail}
          </p>
        </div>

        <div className="flex-none">
          <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest block border border-[#D4AF37]/30 px-4 py-2 bg-black/40">
            CONNECTED TO GROWTH ENGINE &bull; 100% ALIGNED
          </span>
        </div>
      </div>
    </div>
  );
};
