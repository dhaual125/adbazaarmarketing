"use client";

import React from "react";
import Image from "next/image";

export const MarketingEcosystemVisual: React.FC = () => {
  return (
    <div className="relative flex h-[240px] min-[380px]:h-[270px] min-[480px]:h-[310px] sm:h-[350px] md:h-[390px] w-full items-center justify-center overflow-hidden my-3 sm:my-6 select-none">
      {/* Scaled Visual Wrapper for 100% Perfect Mobile, Tablet & Desktop Responsiveness */}
      <div className="relative flex h-[324px] w-[700px] shrink-0 items-center justify-center scale-[0.48] min-[360px]:scale-[0.54] min-[400px]:scale-[0.60] min-[480px]:scale-[0.70] min-[580px]:scale-[0.80] sm:scale-[0.88] md:scale-100 transition-transform origin-center">
        
        {/* Background Dot Cluster (Light Yellow) */}
        <div className="absolute -z-10">
          <svg className="fill-amber-400/80" xmlns="http://www.w3.org/2000/svg" width="164" height="41" viewBox="0 0 164 41" fill="none">
            <circle cx="1" cy="8" r="1" fillOpacity="0.24" />
            <circle cx="1" cy="1" r="1" fillOpacity="0.16" />
            <circle cx="1" cy="15" r="1" />
            <circle cx="1" cy="26" r="1" fillOpacity="0.64" />
            <circle cx="1" cy="33" r="1" fillOpacity="0.24" />
            <circle cx="8" cy="8" r="1" />
            <circle cx="8" cy="15" r="1" />
            <circle cx="8" cy="26" r="1" fillOpacity="0.24" />
            <circle cx="15" cy="15" r="1" fillOpacity="0.64" />
            <circle cx="15" cy="26" r="1" fillOpacity="0.16" />
            <circle cx="8" cy="33" r="1" />
            <circle cx="1" cy="40" r="1" />
            <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 164 7)" fillOpacity="0.24" />
            <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 164 0)" fillOpacity="0.16" />
            <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 164 14)" />
            <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 164 25)" fillOpacity="0.64" />
            <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 164 32)" fillOpacity="0.24" />
            <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 157 7)" />
            <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 157 14)" />
            <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 157 25)" fillOpacity="0.24" />
            <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 150 14)" fillOpacity="0.64" />
            <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 150 25)" fillOpacity="0.16" />
            <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 157 32)" />
            <circle cx="1" cy="1" r="1" transform="matrix(-1 0 0 1 164 39)" />
          </svg>
        </div>

        {/* Ambient Light Yellow Radial Glow Backdrop */}
        <div className="absolute -z-10 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="432" height="160" viewBox="0 0 432 160" fill="none">
            <g opacity="0.65" filter="url(#filter0_f_2044_9)">
              <path
                className="fill-amber-300"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M80 112C62.3269 112 48 97.6731 48 80C48 62.3269 62.3269 48 80 48C97.6731 48 171 62.3269 171 80C171 97.6731 97.6731 112 80 112ZM352 112C369.673 112 384 97.6731 384 80C384 62.3269 369.673 48 352 48C334.327 48 261 62.3269 261 80C261 97.6731 334.327 112 352 112Z"
              />
            </g>
            <defs>
              <filter id="filter0_f_2044_9" x="0" y="0" width="432" height="160" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="32" result="effect1_foregroundBlur_2044_9" />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Ambient Connecting Grid Lines with Animated Light Yellow Beams */}
        <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply" />
        <div className="absolute inset-x-[200px] top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mix-blend-multiply" />
        
        <div className="absolute inset-x-0 top-1/2 -z-10 h-px -translate-y-[82px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply before:absolute before:inset-y-0 before:w-24 before:animate-[line_10s_ease-in-out_infinite_both] before:bg-gradient-to-r before:from-transparent before:via-amber-400 before:to-transparent" />
        <div className="absolute inset-x-0 top-1/2 -z-10 h-px translate-y-[82px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply before:absolute before:inset-y-0 before:w-24 before:animate-[line_10s_ease-in-out_infinite_5s_both] before:bg-gradient-to-r before:from-transparent before:via-amber-400 before:to-transparent" />
        
        <div className="absolute inset-x-[150px] top-1/2 -z-10 h-px rotate-[20deg] bg-gradient-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply" />
        <div className="absolute inset-x-[150px] top-1/2 -z-10 h-px -rotate-[20deg] bg-gradient-to-r from-transparent via-gray-200 to-transparent mix-blend-multiply" />
        
        <div className="absolute inset-y-0 left-1/2 -z-10 w-px -translate-x-[216px] bg-gradient-to-b from-gray-200 to-transparent mix-blend-multiply" />
        <div className="absolute inset-y-0 left-1/2 -z-10 w-px translate-x-[216px] bg-gradient-to-t from-gray-200 to-transparent mix-blend-multiply" />

        {/* Central Core Node (AD Bazaar Hub with Glowing Golden-Yellow Conical Border) */}
        <div className="absolute z-20 before:absolute before:-inset-3 before:animate-[spin_4s_linear_infinite] before:rounded-full before:border before:border-transparent before:[mask-composite:exclude]! before:[background:conic-gradient(from_180deg,transparent,#FBBF24)_border-box] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          <div className="animate-[breath_8s_ease-in-out_infinite_both]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl shadow-amber-400/20 border border-black/5 before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/40 before:[mask-image:linear-gradient(to_bottom,black,transparent)] cursor-pointer transition-transform hover:scale-105">
              <Image
                src="/adblogo-transparent.png"
                alt="AD Bazaar Core"
                width={56}
                height={56}
                className="relative z-10 object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Orbiting Marketing Platform Nodes */}
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          
          {/* Node 01: Instagram (-136px) */}
          <div className="absolute -translate-x-[136px] z-10">
            <div className="animate-[breath_7s_ease-in-out_3s_infinite_both]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.04] border border-black/5 hover:scale-110 transition-transform cursor-pointer" title="Instagram Growth">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <radialGradient id="ig-node-grad" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#fdf497" />
                      <stop offset="5%" stopColor="#fdf497" />
                      <stop offset="45%" stopColor="#fd5949" />
                      <stop offset="60%" stopColor="#d6249f" />
                      <stop offset="90%" stopColor="#285AEB" />
                    </radialGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-node-grad)" />
                  <rect x="6.5" y="6.5" width="11" height="11" rx="3" stroke="#ffffff" strokeWidth="1.6" fill="none" />
                  <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.6" fill="none" />
                  <circle cx="15.8" cy="8.2" r="0.8" fill="#ffffff" />
                </svg>
              </div>
            </div>
          </div>

          {/* Node 02: WhatsApp (+136px) */}
          <div className="absolute translate-x-[136px] z-10">
            <div className="animate-[breath_7s_ease-in-out_3.5s_infinite_both]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.04] border border-black/5 hover:scale-110 transition-transform cursor-pointer" title="WhatsApp Marketing">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.84.498 3.565 1.365 5.051L2 22l5.093-1.336a9.96 9.96 0 004.911 1.34h.004c5.524 0 10.004-4.48 10.004-10.004C22.012 6.48 17.528 2 12.004 2zm5.83 14.288c-.244.686-1.42 1.309-1.968 1.393-.51.077-1.168.11-3.69-.933-2.704-1.118-4.437-3.86-4.573-4.04-.136-.18-1.085-1.442-1.085-2.75 0-1.309.686-1.954.93-2.218.243-.264.53-.33.708-.33.177 0 .354.002.508.01.163.008.383-.062.599.458.22.53.75 1.83.816 1.964.066.133.11.288.022.464-.088.177-.132.288-.265.442-.132.155-.279.346-.398.465-.133.133-.271.277-.117.541.155.265.688 1.134 1.474 1.833 1.011.898 1.862 1.176 2.127 1.308.266.133.42.111.576-.066.155-.177.663-.774.84-1.04.177-.265.354-.221.597-.133.243.089 1.548.73 1.813.863.266.133.443.199.509.31.067.11.067.642-.177 1.328z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Node 03: YouTube (-216px, -82px) */}
          <div className="absolute -translate-x-[216px] -translate-y-[82px] z-10">
            <div className="animate-[breath_6s_ease-in-out_3.5s_infinite_both]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.04] border border-black/5 hover:scale-110 transition-transform cursor-pointer" title="YouTube Ads & Content">
                <div className="w-8 h-5.5 bg-[#FF0000] rounded-[6px] flex items-center justify-center shadow-sm">
                  <svg className="w-3.5 h-3.5 ml-0.5" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Node 04: Navchetna (+216px, -82px) */}
          <div className="absolute translate-x-[216px] -translate-y-[82px] z-10">
            <div className="animate-[breath_6s_ease-in-out_1.5s_infinite_both]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.04] border border-black/5 hover:scale-110 transition-transform cursor-pointer" title="Navchetna">
                <Image
                  src="/navchetnalogo.png"
                  alt="Navchetna Logo"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Node 05: Professional Camera / Photography (+216px, +82px) */}
          <div className="absolute translate-x-[216px] translate-y-[82px] z-10">
            <div className="animate-[breath_6s_ease-in-out_2s_infinite_both]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.04] border border-black/5 hover:scale-110 transition-transform cursor-pointer" title="Professional Photography">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3.5" strokeWidth="2.2" />
                  <circle cx="6.5" cy="10" r="0.8" fill="#000000" />
                </svg>
              </div>
            </div>
          </div>

          {/* Node 06: Facebook (-216px, +82px) */}
          <div className="absolute -translate-x-[216px] translate-y-[82px] z-10">
            <div className="animate-[breath_6s_ease-in-out_2.5s_infinite_both]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.04] border border-black/5 hover:scale-110 transition-transform cursor-pointer" title="Facebook Ads & Campaigns">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Node 07: Pinterest (-292px, opacity 60) */}
          <div className="absolute -translate-x-[292px] opacity-60 z-10 hover:opacity-100 transition-opacity">
            <div className="animate-[breath_6s_ease-in-out_2s_infinite_both]">
              <div className="flex h-13 w-13 items-center justify-center rounded-full border border-gray-200/80 bg-white shadow-md hover:scale-110 transition-transform cursor-pointer" title="Pinterest Ads">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#E60023">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.192-.332 1.357-.052.218-.172.264-.397.159-1.482-.689-2.409-2.854-2.409-4.595 0-3.74 2.718-7.177 7.838-7.177 4.114 0 7.311 2.932 7.311 6.85 0 4.088-2.578 7.38-6.156 7.38-1.202 0-2.333-.625-2.719-1.362l-.74 2.818c-.268 1.031-.994 2.324-1.48 3.119C9.72 23.84 10.844 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Node 08: Video Production & Reels Shooting (+292px, opacity 60) */}
          <div className="absolute translate-x-[292px] opacity-60 z-10 hover:opacity-100 transition-opacity">
            <div className="animate-[breath_6s_ease-in-out_4s_infinite_both]">
              <div className="flex h-13 w-13 items-center justify-center rounded-full border border-gray-200/80 bg-white shadow-md hover:scale-110 transition-transform cursor-pointer" title="Video Production & Reels Shooting">
                <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="#000000">
                  <circle cx="7.5" cy="5.5" r="2.3" />
                  <circle cx="13" cy="4" r="2.8" />
                  <rect x="3" y="9" width="12.5" height="11" rx="2.5" />
                  <circle cx="9.25" cy="14.5" r="1.3" fill="#FFFFFF" />
                  <path d="M15.5 12.5l5.5-3.5v9l-5.5-3.5v-2z" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
