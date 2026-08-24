"use client";

import React, { useState } from "react";

export const Masthead: React.FC = () => {
  const [spinning, setSpinning] = useState(false);

  const triggerSpin = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 900);
  };

  return (
    <div className="masthead relative z-4 grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6 px-7 md:px-14 py-3.5 bg-transparent font-mono text-[10px] tracking-wider text-[#0A0A0A]">
      <div className="mh-l justify-self-start text-left uppercase">
        wild &middot; craft
      </div>
      <div className="mh-c col-span-2 md:col-span-1 order-first md:order-none justify-self-center flex items-center">
        <button
          type="button"
          onClick={triggerSpin}
          onMouseEnter={triggerSpin}
          className={`wlogo inline-block transition-transform duration-300 cursor-pointer ${
            spinning ? "animate-wspin" : ""
          }`}
          aria-label="wild logo"
        >
          <svg
            width="34"
            height="15"
            viewBox="0 0 280 107.49"
            fill="currentColor"
            className="block text-black"
          >
            <polygon points="85.15 78.09 68.18 34.92 53.04 34.92 36.21 78.09 20.37 34.92 0 34.92 28.71 105.65 42.86 105.65 60.68 63.63 78.36 105.65 92.51 105.65 121.22 34.92 100.86 34.92 85.15 78.09" />
            <rect x="134.41" y="34.92" width="18.67" height="70.73" />
            <rect x="172.69" y="6.63" width="18.81" height="99.02" />
            <path d="M143.69,0a11.18,11.18,0,0,0-11.37,11.5,11.43,11.43,0,0,0,22.87,0A11.38,11.38,0,0,0,143.69,0Z" />
            <path d="M261.33,6.63V43.07a32.25,32.25,0,0,0-23.36-10h-.49l-1.45,0h-.14a22.57,22.57,0,0,0-2.34.21,30.61,30.61,0,0,0-8.29,2.22,29.54,29.54,0,0,0-10.18,7.21,34.45,34.45,0,0,0-6.93,11.67,45.8,45.8,0,0,0-2.54,15.84,45.79,45.79,0,0,0,2.54,15.84,33.82,33.82,0,0,0,7,11.67A30.26,30.26,0,0,0,225.4,105a31.38,31.38,0,0,0,12.45,2.48h.78q.87,0,1.72-.08l.2,0a32.29,32.29,0,0,0,20.77-9.87v8.15H280v-99Zm-4.7,78.15A19.18,19.18,0,0,1,242.8,90.1a20.67,20.67,0,0,1-7.69-1.41,17.83,17.83,0,0,1-6.14-4,18.38,18.38,0,0,1-4.07-6.29,23.12,23.12,0,0,1,0-16.27A18.43,18.43,0,0,1,229,55.86a17.9,17.9,0,0,1,6.14-4,20.71,20.71,0,0,1,7.69-1.41,19.34,19.34,0,0,1,13.83,5.25q5.55,5.25,5.55,14.57T256.63,84.78Z" />
          </svg>
        </button>
      </div>
      <div className="mh-r justify-self-end text-right uppercase">
        vienna &middot; global
      </div>
    </div>
  );
};
