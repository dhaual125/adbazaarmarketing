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
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z" />
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
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <path d="M248,120a48.05,48.05,0,0,0-48-48H160.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,32,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,159.12,214l11,7.33A16,16,0,0,0,194.5,212l11.77-44.36A48.07,48.07,0,0,0,248,120ZM48,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C134.65,155,90.84,164.07,48,199.93Zm131,8,0,.11-11-7.33V168h21.6ZM200,152H168V88h32a32,32,0,1,1,0,64Z" />
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
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            fill="currentColor"
          >
            <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section className="relative z-2 py-10 sm:py-16 md:py-24 px-4 sm:px-7 md:px-14 bg-transparent" id="features">
      <div className="max-w-[1176px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          {/* Main Title Matching Header GROW YOUR BUSINESS Typography */}
          <h2 className="text-[clamp(28px,4.6vw,56px)] leading-[1.08] tracking-[-0.03em] text-[#0A0A0A] uppercase font-normal m-0 select-none">
            <span className="font-normal">Built for </span>
            <span className="font-light italic tracking-tight text-[#0A0A0A]">Growth</span>
            <span className="font-normal">. Engineered for </span>
            <span className="font-light italic tracking-tight text-[#0A0A0A]">Results</span>
            <span className="font-normal">.</span>
          </h2>
        </div>

        {/* 3 Floating Elements with Exact Custom SVGs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="mb-6 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                {item.blobSvg}
              </div>

              {/* Title */}
              <h3 className="text-[20px] sm:text-[22px] font-bold text-[#0A0A0A] tracking-tight mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[#555555] max-w-[34ch] m-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
