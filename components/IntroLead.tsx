"use client";

import React, { useEffect, useRef, useState } from "react";

export const IntroLead: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="intro relative z-[2] px-4 sm:px-7 md:px-14 pt-10 sm:pt-14 pb-4 mt-[-8vh] sm:mt-[-10vh]" ref={ref}>
      <div className="wrap max-w-[1176px] mx-auto">
        <p className={`lead text-[clamp(26px,3.4vw,52px)] leading-[1.08] tracking-[-0.03em] font-normal m-0 will-change-transform transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Build. Grow. Scale.<br />
          One Partner, End-to-End.
        </p>
        <p className={`mt-6 text-[clamp(15px,1.15vw,18px)] leading-[1.65] max-w-[58ch] text-[#4a4a4a] transition-all duration-700 delay-150 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          From AI-powered websites and custom software to revenue-driving ads, influencer campaigns, and creative video production — we provide the complete technology and marketing stack your business needs to dominate.
        </p>
      </div>
    </section>
  );
};
