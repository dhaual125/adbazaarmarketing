"use client";

import React from "react";
import Image from "next/image";
import { Carousel, CarouselSlide } from "@/components/Carousel";
import { PodcastStudioSection } from "@/components/PodcastStudioSection";
import { YoungAndBoldSection } from "@/components/YoungAndBoldSection";
import { PixelMarquee } from "@/components/PixelMarquee";
import { MarketingEcosystemVisual } from "@/components/MarketingEcosystemVisual";
import { ScrollChatSection } from "@/components/ScrollChatSection";
import CTAWithVerticalMarquee from "@/components/ui/cta-with-text-marquee";

export default function Home() {

  const workSlides: CarouselSlide[] = [
    {
      title: "Meta Ads Scaling",
      desc: "Turn social attention into qualified leads.",
      visualType: "meta-ads",
    },
    {
      title: "Google Search & P-Max",
      desc: "Capture high-intent searches and drive conversions.",
      visualType: "google-ads",
    },
    {
      title: "Advertising Content Videos",
      desc: "Scroll-stopping content built for conversions.",
      visualType: "ad-videos",
    },
    {
      title: "Social Media Distribution",
      desc: "Turn consistent content into brand authority.",
      visualType: "social-media",
    },
    {
      title: "Leads Management & CRM",
      desc: "Capture, manage and convert leads efficiently",
      visualType: "leads-management",
    },
    {
      title: "Business Growth & Scaling",
      desc: "Connect marketing efforts to predictable growth.",
      visualType: "growth-scaling",
    },
  ];

  const labSlides: CarouselSlide[] = [
    {
      title: "Heritage, Crafted Beautifully",
      desc: "A timeless jewellery creation by Toran, bringing together heritage, craftsmanship, and contemporary elegance.",
      thumbSrc: "/2.jpg",
      instagramUrl: "https://www.instagram.com/reel/DQwz4vrE5uv/?igsh=bmF6eXJ6cTRxbnJz",
      reelsVideo: true,
    },
    {
      title: "From Traditional to Modern",
      desc: "Timeless classics and contemporary designs, crafted for every occasion, story, and style.",
      thumbSrc: "/7.jpg",
      instagramUrl: "https://www.instagram.com/reel/DZSFf7Tvxtr/?igsh=MTRvMjgzcnFhcG81cg==",
      reelsVideo: true,
    },
    {
      title: "Unisex salon",
      desc: "Super Star Unisex Salon, ",
      thumbSrc: "/3.jpg",
      instagramUrl: "https://www.instagram.com/reel/DZcWXbNi5EI/?igsh=ZTBxdWpmaGszMGZw",
      reelsVideo: true,
    },
    {
      title: "Matarani laptopwala",
      desc: "minerwa centar Jodhpur,Shop no 404,",
      thumbSrc: "/8.jpg",
      instagramUrl: "https://www.instagram.com/reel/DSCuWkXk29F/?igsh=cm8ycGphZjVpZ3E3",
      reelsVideo: true,
    },
    {
      title: "Gold Jewellery, Better Value",
      desc: "Explore beautiful gold jewellery at Shree Krishna Jewellers with value-focused making charges..",
      thumbSrc: "/1.jpg",
      instagramUrl: "https://www.instagram.com/reel/DLg4pIgyOVn/?igsh=enVzeXptdnVzNGlt",
      reelsVideo: true,
    },
    {
      title: "Tech Essentials, All in One Place",
      desc: "Discover branded accessories, audio gear, smart devices and more — with mobile finance options available at Krishna Mobile Shopee.",
      thumbSrc: "/6.jpg",
      instagramUrl: "https://www.instagram.com/reel/Db8Ne6Uvyb0/?igsh=cjY5Y3lmYTdhMTg4",
      reelsVideo: true,
    },
    {
      title: "Designed for a Premium Home",
      desc: "Elevate your everyday space with refined bathroom solutions crafted to bring comfort, elegance and a premium feel.",
      thumbSrc: "/9.jpg",
      instagramUrl: "https://www.instagram.com/reel/DZU6ZichWGC/?igsh=MXVuMmJ4eXpzNjJuaA==",
      reelsVideo: true,
    },
    {
      title: "Tradition in Every Drape",
      desc: "Graceful sarees that celebrate Indian tradition with colours, textures and designs made for every special occasion.",
      thumbSrc: "/5.jpg",
      instagramUrl: "https://www.instagram.com/reel/DcGodu9v_7X/?igsh=MWMzdGgxZTA4bWQxeg==",
      reelsVideo: true,
    },
  ];

  return (
    <main className="relative min-h-screen bg-transparent text-[#0A0A0A] font-sans selection:bg-[#F6EE74] selection:text-black">
      {/* Global SVG Definition for Theme Stepped Frame */}
      <svg width="0" height="0" className="absolute pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          <clipPath id="theme-stepped-frame" clipPathUnits="objectBoundingBox">
            <path d="
              M 0, 0.05
              Q 0, 0, 0.05, 0
              L 0.95, 0
              Q 1, 0, 1, 0.05
              L 1, 0.95
              Q 1, 1, 0.95, 1
              L 0.54, 1
              Q 0.48, 1, 0.48, 0.94
              L 0.48, 0.88
              Q 0.48, 0.82, 0.42, 0.82
              L 0.05, 0.82
              Q 0, 0.82, 0, 0.77
              Z
            " />
          </clipPath>
        </defs>
      </svg>

      {/* Hero Section with Live Vertical Offerings Marquee */}
      <CTAWithVerticalMarquee />

      {/* Interactive Scroll-Animated Chat System (Matching User Blueprint & Theme) */}
      <ScrollChatSection />

      {/* Main Work Showcase Carousel */}
      <Carousel id="work" slides={workSlides} />

      {/* Process Section - Matches Image 2 & Image 3 */}
      <section className="proc relative z-2 py-12 sm:py-16 px-4 sm:px-7 md:px-14 bg-transparent" id="process">
        <div className="wrap max-w-[1176px] mx-auto">
          {/* Header & Marketing Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-14 items-center mb-10 sm:mb-12">
            <div>
              <h2 className="text-[clamp(28px,3.6vw,48px)] leading-[1.04] tracking-[-0.025em] font-normal m-0 text-black">
                Plan. Create.
                <br />
                Launch. Scale.
              </h2>
              <p className="pd text-[#2a2a2a] text-[clamp(15px,1.15vw,18px)] leading-[1.62] max-w-[48ch] mt-4">
                Every campaign starts with deep understanding and ends with compounding growth. We don&apos;t guess — we build, test and scale what works.
              </p>
              <p className="text-[clamp(14px,1vw,16px)] leading-[1.6] text-[#555555] max-w-[48ch] mt-3">
                We focus on the metrics that actually matter: Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), and real money in the bank.
              </p>
            </div>

            {/* Right Side: Marketing Mockup Showcase with Theme Stepped Shape */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-[4/5]">
                {/* Stepped Frame Image Wrapper without border */}
                <div
                  className="theme-stepped-mask relative w-full h-full overflow-hidden group drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center justify-center"
                  style={{
                    clipPath: "url(#theme-stepped-frame)",
                    WebkitClipPath: "url(#theme-stepped-frame)",
                  }}
                >
                  <Image
                    src="/marketing.png"
                    alt="Live Marketing Performance & Insights"
                    fill
                    className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 440px"
                    priority
                  />

                  {/* Ambient Soft Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-House Podcast & Video Studio Section with Theme Stepped Frame (Image 2) */}
      <PodcastStudioSection />

      {/* 360° Service Pillars Section */}
      <section className="ed-protocol relative z-2 py-12 sm:py-16 md:py-24 px-4 sm:px-7 md:px-14 bg-transparent" id="protocol">
        <div className="wrap max-w-[1176px] mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-[0.82fr_1.18fr] gap-8 md:gap-14 items-start mb-12">
            <div className="head">
              <h2 className="text-[clamp(28px,3.6vw,48px)] leading-[1.06] tracking-[-0.025em] font-normal m-0 text-black">
                One partner.
                <br />
                End-to-end.
              </h2>
              <p className="kick mono text-[#8b8b8b] text-[10px] mt-3.5 mb-0 tracking-widest uppercase">
                Your growth, our strategy
              </p>
            </div>
            <div>
              <p className="text-[clamp(15px,1.15vw,18px)] leading-[1.62] max-w-[48ch] mb-6 text-[#2a2a2a] text-justify">
                <b className="font-medium text-[#0A0A0A]">Not just another marketing agency.</b> We&apos;re a full-service growth partner. Whether you need a complete digital transformation, a rescue mission for your restricted ad accounts, or a high-impact marketing campaign — we have the expertise to deliver real results.
              </p>
              <a href="/services" className="btn-site text-sm py-3 px-6">
                View all services
              </a>
            </div>
          </div>

          {/* Marketing Ecosystem Interactive Visual */}
          <MarketingEcosystemVisual />

          {/* Service Pillar Highlights Under Visual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-black/10">
            <div className="step flex flex-col gap-3 group relative">
              <div className="dl flex items-center gap-2">
                <span className="dn inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#7c3aed] text-white font-mono text-[11px] font-medium tracking-wide">
                  01
                </span>
                <span className="dt text-[16px] font-bold text-[#0A0A0A] tracking-tight">Growth Marketing</span>
              </div>
              <p className="dd m-0 text-[14px] leading-[1.55] text-[#2a2a2a]">
                Google, Meta, YouTube & TikTok ads optimized for lowest CAC and maximum ROAS.
              </p>
            </div>

            <div className="step flex flex-col gap-3 group relative">
              <div className="dl flex items-center gap-2">
                <span className="dn inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#2563eb] text-white font-mono text-[11px] font-medium tracking-wide">
                  02
                </span>
                <span className="dt text-[16px] font-bold text-[#0A0A0A] tracking-tight">IT & Consulting</span>
              </div>
              <p className="dd m-0 text-[14px] leading-[1.55] text-[#2a2a2a]">
                Custom websites, apps, software, cloud infrastructure, AI integration and digital transformation.
              </p>
            </div>

            <div className="step flex flex-col gap-3 group relative">
              <div className="dl flex items-center gap-2">
                <span className="dn inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#16a34a] text-white font-mono text-[11px] font-medium tracking-wide">
                  03
                </span>
                <span className="dt text-[16px] font-bold text-[#0A0A0A] tracking-tight">Creative Production</span>
              </div>
              <p className="dd m-0 text-[14px] leading-[1.55] text-[#2a2a2a]">
                High-converting video ads, cinematic reels, product shoots and viral creative assets tailored to scale.
              </p>
            </div>

            <div className="step flex flex-col gap-3 group relative">
              <div className="dl flex items-center gap-2">
                <span className="dn inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#f97316] text-white font-mono text-[11px] font-medium tracking-wide">
                  04
                </span>
                <span className="dt text-[16px] font-bold text-[#0A0A0A] tracking-tight">Leads & CRM</span>
              </div>
              <p className="dd m-0 text-[14px] leading-[1.55] text-[#2a2a2a]">
                Automated qualification, instant WhatsApp nurture, CRM routing and pipeline management — zero lead leakage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content & Campaign Showcase Carousel */}
      <Carousel
        id="lab"
        title="Real campaigns. Real results."
        description="From high-converting ad creatives and influencer campaigns to full brand rollouts — here's a snapshot of what we produce for our clients. Every piece is engineered for performance, not just aesthetics."
        slides={labSlides}
        isLab
      />

      {/* "We are young but bold" 3-Pillar Section (Image 1) */}
      <YoungAndBoldSection />

      {/* Merged Seamless Pixel Marquee & Contact CTA Section */}
      <section className="cta relative z-2 pt-10 sm:pt-12 pb-20 sm:pb-24 md:pb-36 px-4 sm:px-7 md:px-14 text-center bg-transparent overflow-hidden" id="contact">
        {/* Pixel Marquee seamlessly integrated above CTA */}
        <div className="mb-14 cursor-pointer" data-cursor-label="✦">
          <PixelMarquee />
        </div>

        <div className="wrap max-w-[1176px] mx-auto flex flex-col items-center">
          <a
            href="/contact"
            className="btn-site text-base md:text-lg py-3.5 px-9 mb-8"
          >
            Book your free strategy call
          </a>
          <p className="meta text-[clamp(15px,1.2vw,19px)] leading-[1.6] max-w-[46ch] text-[#8b8b8b] text-center mb-4">
            From ads and influencer campaigns to IT builds and creative production — one partner, end-to-end. Let&apos;s talk about your goals and build a plan to achieve them.
          </p>
          <p className="meta text-[clamp(15px,1.2vw,19px)] leading-[1.6] text-[#0A0A0A] flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:adbazaar9@gmail.com"
              className="text-[#0A0A0A] no-underline border-b border-black/50 hover:border-black transition-colors"
            >
              adbazaar9@gmail.com
            </a>
            <span>&bull;</span>
            <a
              href="tel:+918949678859"
              className="text-[#0A0A0A] no-underline border-b border-black/50 hover:border-black transition-colors font-mono"
            >
              +91 89496 78859
            </a>
            <span>&bull;</span>
            <span className="font-bold text-[#0A0A0A]">10 AM – 7 PM</span>
          </p>
          <p className="text-xs text-[#555555] mt-3 text-center max-w-[54ch] leading-relaxed">
            <a href="https://www.google.com/maps/search/?api=1&query=Amba+Mira+Kunj+Building+Akhalia+Circle+D-8+Jodhpur+Rajasthan+342001" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-blue-600 transition-colors"> Amba Mira Kunj Building, Akhalia Circle, D-8, Jodhpur, Rajasthan 342001</a>
          </p>
        </div>
      </section>
    </main>
  );
}
