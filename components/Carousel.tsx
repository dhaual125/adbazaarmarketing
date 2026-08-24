"use client";

import React, { useRef, useEffect } from "react";
import { ServiceCardVisual, ServiceVisualType } from "./ServiceCardVisual";

export interface CarouselSlide {
  title: string;
  desc: string;
  href?: string;
  videoSrc?: string;
  imgSrc?: string;
  thumbSrc?: string;
  instagramUrl?: string;
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

  const handleScroll = () => {};

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth && e.deltaY > 0) return;
      if (el.scrollLeft <= 0 && e.deltaY < 0) return;
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="caro relative z-[10] bg-white py-10 sm:py-14" id={id}>
      {title && (
        <div className="ch max-w-[1176px] mx-auto mb-7 px-4 sm:px-7 md:px-14 flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4">
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
          className="overflow-x-auto scrollbar-none py-6 select-none snap-x snap-mandatory"
        >
          <div className="flex gap-3 sm:gap-5 w-max px-4 sm:px-7 md:px-14">
            {slides.map((slide, idx) => (
              <a
                key={idx}
                href={slide.instagramUrl ?? slide.href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/card flex flex-col text-center gap-0 pb-4 text-inherit no-underline snap-center flex-shrink-0 ${
                  slide.reelsVideo
                    ? "w-[calc(55vw-1rem)] sm:w-[200px] md:w-[220px] lg:w-[240px]"
                    : slide.visualType
                    ? "w-[calc(100vw-2rem)] sm:w-[calc((100vw-4rem)/2)] md:w-[calc((min(100vw,1176px)-7rem)/3)]"
                    : "w-[calc(100vw-2rem)] sm:w-[360px] md:w-[380px] lg:w-[420px]"
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden rounded-xl bg-[#0A0A0A] ${
                    slide.reelsVideo
                      ? "aspect-[9/16]"
                      : slide.videoSrc && !slide.visualType
                      ? ""
                      : slide.visualType
                      ? "h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px]"
                      : "h-[220px] sm:h-[300px] md:h-[330px] lg:h-[350px]"
                  }`}
                >
                  {slide.visualType ? (
                    <ServiceCardVisual type={slide.visualType} title={slide.title} />
                  ) : slide.instagramUrl && slide.thumbSrc ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.thumbSrc}
                        alt={slide.title}
                        className="w-full h-full object-cover block"
                      />
                      {/* Instagram icon top-right */}
                      <div className="absolute top-3 right-3 z-[4]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <div className="absolute inset-0 z-[3] bg-black/0 group-hover/card:bg-black/20 transition-colors duration-300" />
                    </>
                  ) : slide.videoSrc ? (
                    <video
                      src={slide.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={
                        slide.reelsVideo
                          ? "w-full h-full object-cover block pointer-events-none"
                          : "w-full h-auto block pointer-events-none"
                      }
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

                <p className="font-medium text-[clamp(14px,1.6vw,20px)] tracking-[-0.02em] mt-3 mb-0 px-1">
                  {slide.title}
                </p>
                <p className="text-[#2a2a2a] text-[11px] sm:text-[13px] leading-[1.5] mt-1 px-2 sm:px-4 mx-auto max-w-[26ch]">
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
