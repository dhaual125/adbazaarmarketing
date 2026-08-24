"use client";

import React, { useRef, useEffect, useState } from "react";
import { ServiceCardVisual, ServiceVisualType } from "./ServiceCardVisual";

export interface CarouselSlide {
  title: string;
  desc: string;
  href?: string;
  videoSrc?: string;
  imgSrc?: string;
  visualType?: ServiceVisualType;
  reelsVideo?: boolean;
  tags?: Array<{ label: string; className: string }>;
}

interface CarouselProps {
  id: string;
  title?: string;
  description?: string;
  slides: CarouselSlide[];
  isLab?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  id,
  title,
  description,
  slides,
  isLab = false,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = (pos: number) => {
    if (!trackRef.current) return;
    const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
    setCanPrev(pos > 5);
    setCanNext(pos < maxScroll - 5);
  };

  const handleScroll = () => {
    if (!trackRef.current) return;
    updateArrows(trackRef.current.scrollLeft);
  };

  // Convert vertical wheel to horizontal scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Only hijack purely horizontal intent or explicit horizontal scroll
      if (e.deltaX !== 0) {
        el.scrollLeft += e.deltaX;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="caro relative z-[10] bg-white py-14" id={id}>

      {title && (
        <div className="ch max-w-[1176px] mx-auto mb-7 px-7 md:px-14 flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4">
          <h2 className="text-[clamp(26px,3.4vw,46px)] leading-[1.06] font-normal tracking-[-0.02em] m-0">
            {title}
          </h2>
          {description && (
            <p className="max-w-[62ch] m-0 text-[#2a2a2a] text-[clamp(15px,1.15vw,18px)] leading-[1.62]">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="sl-wrap">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="overflow-x-auto scrollbar-none py-6 select-none"
        >
          <div className="flex gap-7 w-max px-7 md:px-14">
            {slides.map((slide, idx) => (
              <a
                key={idx}
                href={slide.href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/card flex flex-col text-center gap-0 pb-6 text-inherit no-underline ${slide.reelsVideo ? "w-[min(85vw,240px)]" : "w-[min(85vw,420px)]"}`}
              >
                <div className={`relative w-full overflow-hidden bg-[#0A0A0A] ${slide.reelsVideo ? "aspect-[9/16]" : slide.videoSrc && !slide.visualType ? "" : "h-[350px]"}`}>
                  {slide.visualType ? (
                    <ServiceCardVisual type={slide.visualType} title={slide.title} />
                  ) : slide.videoSrc ? (
                    <video
                      src={slide.videoSrc}
                      autoPlay loop muted playsInline
                      className={slide.reelsVideo ? "w-full h-full object-cover block pointer-events-none" : "w-full h-auto block pointer-events-none"}
                    />
                  ) : slide.imgSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slide.imgSrc}
                      alt={slide.title}
                      className="w-full h-full object-cover block pointer-events-none scale-[1.14] transition-transform duration-500 group-hover/card:scale-[1.05]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#1c2541] text-white">
                      <span className="font-mono text-sm tracking-widest uppercase">{slide.title}</span>
                    </div>
                  )}
                  {!slide.visualType && (
                    <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover/card:translate-y-0 transition-transform duration-500 ease-out pointer-events-none flex items-end justify-center pb-4">
                      <span className="text-white text-xs font-mono uppercase tracking-widest">
                        {isLab ? "View Experiment" : "View Case Study"}
                      </span>
                    </div>
                  )}
                </div>

                <p className="font-medium text-[clamp(22px,2.2vw,30px)] tracking-[-0.02em] mt-5 mb-0">
                  {slide.title}
                </p>
                <p className="text-[#2a2a2a] text-[14.5px] leading-[1.5] mt-2 px-6 mx-auto max-w-[32ch]">
                  {slide.desc}
                </p>

                {slide.tags && (
                  <div className="flex flex-wrap justify-center gap-2 mt-3 px-5">
                    {slide.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-3 py-1 text-white pixel-clip-sm ${tag.className}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
