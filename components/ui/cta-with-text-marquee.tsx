"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useRef } from "react";

interface VerticalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
  onItemsRef?: (items: HTMLElement[]) => void;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 22,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(containerRef.current.querySelectorAll('.marquee-item')) as HTMLElement[];
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex flex-col overflow-hidden select-none touch-pan-y",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const marqueeItems = [
  "Growth Marketing",
  "AI & Custom Tech",
  "Google & Meta Ads",
  "Account Recovery",
  "Leads & CRM Pipeline",
  "High-Converting Video",
  "Full Brand Scaling",
];

export default function CTAWithVerticalMarquee({
  title = "Build. Grow. Scale.\nOne Partner, End-to-End.",
  description = "From AI-powered websites and custom software to revenue-driving ads, influencer campaigns, and crisis account recovery — we provide the complete technology and marketing stack your business needs to dominate.",
  primaryButtonText = "GET IN TOUCH",
  primaryButtonHref = "/contact",
  secondaryButtonText = "VIEW ALL SERVICES",
  secondaryButtonHref = "/services",
}: {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    let frameId: number;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll('.marquee-item');
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = Math.max(0.08, 1 - normalizedDistance * 0.90);
        (item as HTMLElement).style.opacity = opacity.toString();
      });

      frameId = requestAnimationFrame(updateOpacity);
    };

    frameId = requestAnimationFrame(updateOpacity);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="hero-marquee relative z-2 bg-transparent text-[#0A0A0A] flex items-center justify-center px-4 sm:px-7 md:px-14 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-20 overflow-hidden">
      <div className="w-full max-w-[1176px] mx-auto animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-5 sm:space-y-7 max-w-2xl text-left">
            <h1 className="text-[clamp(28px,6.8vw,60px)] font-normal leading-[1.06] tracking-[-0.03em] text-[#0A0A0A] m-0">
              Build. Grow. Scale.<br />
              <span className="text-[#0A0A0A]">One Partner, End-to-End.</span>
            </h1>
            
            <p className="text-[clamp(14.5px,3.8vw,17.5px)] leading-[1.62] text-[#4a4a4a] max-w-[54ch]">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2 w-full sm:w-auto">
              <a
                href={primaryButtonHref}
                className="btn-site pixel-clip inline-flex justify-center items-center text-sm py-3.5 px-7 font-medium text-center"
              >
                {primaryButtonText}
              </a>
              <a
                href={secondaryButtonHref}
                className="inline-flex justify-center items-center text-sm py-3 px-6 font-medium text-[#0A0A0A] bg-transparent border border-black/15 hover:border-black/50 hover:bg-black/[0.03] transition-all duration-200 rounded-[2px] text-center"
              >
                {secondaryButtonText}
              </a>
            </div>
          </div>

          {/* Right Vertical Marquee */}
          <div
            ref={marqueeRef}
            className="relative h-[240px] sm:h-[320px] lg:h-[480px] flex items-center justify-center overflow-hidden w-full"
          >
            <div className="relative w-full h-full">
              <VerticalMarquee speed={22} className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-[clamp(22px,5.2vw,44px)] font-light leading-tight tracking-[-0.025em] text-[#0A0A0A] py-3.5 sm:py-5 marquee-item transition-opacity duration-75 text-left"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>

              {/* Top gradient vignette */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />

              {/* Bottom gradient vignette */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 sm:h-24 lg:h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
