"use client";

import React from "react";

interface CaseStudy {
  client: string;
  challenge: string;
  approach: string;
  outcome: string;
  services: string[];
  tag: string;
}

const caseStudies: CaseStudy[] = [
  {
    client: "VELOCE AUTOMOTIVE",
    tag: "HIGH-TICKET ACQUISITION",
    challenge: "Low digital brand authority in high-ticket segments and high cost per qualified buyer inquiry.",
    approach: "Produced cinematic 3D video ad creative paired with high-intent Meta and Google Search campaigns targeting luxury vehicle buyers.",
    outcome: "Generated consistent high-net-worth inquiries while reducing cost per qualified acquisition.",
    services: ["Meta Ads", "Google Ads", "Advertising Content Videos", "Leads Management"],
  },
  {
    client: "MAISON D'OR",
    tag: "FINE JEWELLERY & D2C",
    challenge: "High reliance on organic walk-ins and plateauing online conversions for high-ticket pieces.",
    approach: "Engineered an editorial social ecosystem and high-converting retargeting funnels with verified lead follow-up protocols.",
    outcome: "Doubled inbound appointment bookings and established a scalable digital customer acquisition pipeline.",
    services: ["Advertising Content Videos", "Social Media Management", "Meta Ads"],
  },
  {
    client: "NOVA CLINICAL GROUP",
    tag: "HEALTHCARE & AESTHETICS",
    challenge: "Unqualified leads overwhelming internal front-desk staff with zero automated qualification.",
    approach: "Designed a multi-stage lead intake pipeline with automated qualification sequences and instant consultation routing.",
    outcome: "Filtered out non-serious inquiries and scaled monthly booked patient consultations with zero staff overhead.",
    services: ["Google Ads", "Leads Management", "Business Growth & Scaling"],
  },
];

export const CaseStudySection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-[1176px] mx-auto">
      {caseStudies.map((cs, idx) => (
        <div
          key={cs.client}
          className="group relative p-8 md:p-12 bg-[#0A0A0A] border border-white/10 hover:border-[#D4AF37] transition-all duration-500 overflow-hidden"
        >
          {/* Subtle gold corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] px-2.5 py-1 bg-black/60 border border-[#D4AF37]/30">
                {cs.tag}
              </span>
              <h3 className="font-sans font-bold text-white text-[28px] md:text-[36px] tracking-tight mt-3 mb-0">
                {cs.client}
              </h3>
            </div>
            <span className="font-mono text-sm text-[#C0C0C0] opacity-60">CASE STUDY 0{idx + 1}</span>
          </div>

          {/* 3-Column Content Breakdown: Challenge / Approach / Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] mb-2">
                THE CHALLENGE
              </h4>
              <p className="font-sans text-sm text-[#C0C0C0] leading-relaxed m-0">
                {cs.challenge}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#C0C0C0] mb-2">
                THE APPROACH
              </h4>
              <p className="font-sans text-sm text-[#C0C0C0] leading-relaxed m-0">
                {cs.approach}
              </p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] mb-2">
                THE OUTCOME
              </h4>
              <p className="font-sans text-sm text-white font-medium leading-relaxed m-0">
                {cs.outcome}
              </p>
            </div>
          </div>

          {/* Footer Services & CTA */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {cs.services.map((svc) => (
                <span
                  key={svc}
                  className="font-mono text-[10px] uppercase tracking-wider text-white/70 px-2.5 py-1 bg-white/5 border border-white/10"
                >
                  {svc}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#D4AF37] uppercase tracking-widest hover:text-white transition-colors group/link"
            >
              <span>VIEW CASE STUDY</span>
              <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
