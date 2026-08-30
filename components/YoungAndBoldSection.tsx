"use client";

import React from "react";

export const YoungAndBoldSection: React.FC = () => {
  const items = [
    {
      title: "Brand Identity",
      description:
        "We create unique brand identities that make a lasting impression and help your business stand out from the rest.",
      blobSvg: (
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-[#0A0A0A]">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3h12l4 6-10 12L2 9z" />
            <path d="M2 9h20M10 3l2 6 2-6M7 9l5 12 5-12" />
          </svg>
        </div>
      ),
    },
    {
      title: "Online Marketing",
      description:
        "We design smart marketing strategies that drive traffic, generate qualified leads, and sustainably grow your revenue online.",
      blobSvg: (
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-[#0A0A0A]">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 7l-8.5 8.5-5-5L2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
        </div>
      ),
    },
    {
      title: "Social Media",
      description:
        "We create engaging social media content and strategies that build brand authority and deeply connect with your target audience.",
      blobSvg: (
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-[#0A0A0A]">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section className="relative z-2 py-10 sm:py-16 md:py-24 px-4 sm:px-7 md:px-14 bg-transparent" id="features">
      <div className="max-w-[1176px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          {/* Main Title */}
          <h2 className="text-[clamp(26px,5vw,54px)] font-bold tracking-[-0.03em] text-[#0A0A0A] m-0">
            Built for Growth. Engineered for Results.
          </h2>
        </div>

        {/* 3 Floating Elements (No boxes/cards, clean floating design matching image) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group"
            >
              {/* Floating Organic Pastel Shape with Icon */}
              <div className="mb-6 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                {item.blobSvg}
              </div>

              {/* Title */}
              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#0A0A0A] tracking-tight mb-3">
                {item.title}
              </h3>

              {/* Description (clean centered 3-line format) */}
              <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[#64748B] max-w-[34ch] m-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
