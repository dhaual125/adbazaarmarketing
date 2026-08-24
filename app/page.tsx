"use client";

import React, { useState } from "react";
import { HeroCanvas } from "@/components/HeroCanvas";
import { HeroSection } from "@/components/HeroSection";
import { IntroLead } from "@/components/IntroLead";
import { Carousel, CarouselSlide } from "@/components/Carousel";
import { EditorialSection } from "@/components/EditorialSection";
import { ProcessFlowCanvas } from "@/components/ProcessFlowCanvas";
import { ProtocolFlowCanvas } from "@/components/ProtocolFlowCanvas";
import { DonutCanvas } from "@/components/DonutCanvas";
import { PixelMarquee } from "@/components/PixelMarquee";


export default function Home() {
  const [cellSize] = useState(9);
  const [brushSize] = useState(10);

  const workSlides: CarouselSlide[] = [
    {
      title: "Meta Ads Scaling",
      desc: "Turn cold social scrolls into qualified buyers. We build, test, and scale high-ROI Facebook & Instagram campaigns with real-time conversion tracking.",
      visualType: "meta-ads",
      tags: [
        { label: "Facebook & IG", className: "bg-[#0081FB]" },
        { label: "4.8x Avg ROAS", className: "bg-[#16A34A]" },
        { label: "Audience AI", className: "bg-[#7C3AED]" },
      ],
    },
    {
      title: "Google Search & P-Max",
      desc: "Be the first answer when customers are actively searching to buy. Precision search ads, YouTube video placements, and high-intent keyword acquisition.",
      visualType: "google-ads",
      tags: [
        { label: "1st Page Rank", className: "bg-[#EA4335]" },
        { label: "High Intent", className: "bg-[#4285F4]" },
        { label: "YouTube Ads", className: "bg-[#FF0000]" },
      ],
    },
    {
      title: "Advertising Content Videos",
      desc: "Creatives that stop the thumb in 2 seconds. High-converting UGC videos, 3D product motion, and brand storytelling engineered for maximum retention.",
      visualType: "ad-videos",
      tags: [
        { label: "Thumb-Stopping", className: "bg-[#F97316]" },
        { label: "4K UGC Creators", className: "bg-[#7C3AED]" },
        { label: "Viral Scaling", className: "bg-[#16A34A]" },
      ],
    },
    {
      title: "Social Media Distribution",
      desc: "Build a brand that commands authority. Consistent daily reels, multi-platform publishing, and genuine community engagement across every touchpoint.",
      visualType: "social-media",
      tags: [
        { label: "Instagram & TikTok", className: "bg-[#E1306C]" },
        { label: "Daily Distribution", className: "bg-[#0A66C2]" },
        { label: "Brand Authority", className: "bg-[#0A0A0A]" },
      ],
    },
    {
      title: "Leads Management & CRM",
      desc: "Never lose a valuable customer. Automated qualification pipelines, instant WhatsApp/SMS follow-up, and real-time CRM lead routing.",
      visualType: "leads-management",
      tags: [
        { label: "Zero Leakage", className: "bg-[#0081FB]" },
        { label: "Instant Nurture", className: "bg-[#16A34A]" },
        { label: "Automated Pipeline", className: "bg-[#F97316]" },
      ],
    },
    {
      title: "Business Growth & Scaling",
      desc: "Connect advertising, content, and conversion into one compounding growth engine. Full-funnel strategy built to expand revenue predictably.",
      visualType: "growth-scaling",
      tags: [
        { label: "Omni-Channel", className: "bg-[#16A34A]" },
        { label: "Revenue Flywheel", className: "bg-[#7C3AED]" },
        { label: "CAC Reduction", className: "bg-[#4285F4]" },
      ],
    },
  ];

  const labSlides: CarouselSlide[] = [
    {
      title: "Heritage, Crafted Beautifully",
      desc: "A timeless jewellery creation by Toran, bringing together heritage, craftsmanship, and contemporary elegance.",
      videoSrc: "/Video-21402.mp4",
      reelsVideo: true,
    },
    {
      title: "From Traditional to Modern",
      desc: "Timeless classics and contemporary designs, crafted for every occasion, story, and style.",
      videoSrc: "/Video-25162.mp4",
      reelsVideo: true,
    },
    {
      title: "Unisex salon",
      desc: "Super Star Unisex Salon, ",
      videoSrc: "/Video-69462.mp4",
      reelsVideo: true,
    },
    {
      title: "Matarani laptopwala",
      desc: "minerwa centar Jodhpur,Shop no 404,",
      videoSrc: "/Video-79834.mp4",
      reelsVideo: true,
    },
    {
      title: "Gold Jewellery, Better Value",
      desc: "Explore beautiful gold jewellery at Shree Krishna Jewellers with value-focused making charges..",
      videoSrc: "/Video-89862.mp4",
      reelsVideo: true,
    },
    {
      title: "Tech Essentials, All in One Place",
      desc: "Discover branded accessories, audio gear, smart devices and more — with mobile finance options available at Krishna Mobile Shopee.",
      videoSrc: "/Video-96172.mp4",
      reelsVideo: true,
    },
    {
      title: "Designed for a Premium Home",
      desc: "Elevate your everyday space with refined bathroom solutions crafted to bring comfort, elegance and a premium feel.",
      videoSrc: "/Video-97086.mp4",
      reelsVideo: true,
    },
    {
      title: "Tradition in Every Drape",
      desc: "Graceful sarees that celebrate Indian tradition with colours, textures and designs made for every special occasion.",
      videoSrc: "/Video-98572.mp4",
      reelsVideo: true,
    },
  ];

  return (
    <main className="relative min-h-screen bg-white text-[#0A0A0A] font-sans selection:bg-[#d8ff00] selection:text-black">
      {/* Background Hero Pixel Canvas */}
      <HeroCanvas cellSize={cellSize} brushSize={brushSize} />

      {/* Hero Section with Solid White Header */}
      <HeroSection />

      {/* Intro Lead Text */}
      <IntroLead />

      {/* Main Work Showcase Carousel */}
      <Carousel id="work" slides={workSlides} />

      {/* Editorial Sections (Origin, Shift with Smileys, AI Levels) */}
      <EditorialSection />

      {/* Process Section - Matches Image 2 & Image 3 */}
      <section className="proc relative z-2 py-16 px-7 md:px-14 bg-transparent" id="process">
        <div className="wrap max-w-[1176px] mx-auto">
          {/* Header */}
          <div className="ph mb-6">
            <h2 className="text-[clamp(28px,3.6vw,48px)] leading-[1.04] tracking-[-0.025em] font-normal m-0 text-black">
              Plan. Create.
              <br />
              Launch. Scale.
            </h2>
            <p className="pd text-[#2a2a2a] text-[clamp(15px,1.15vw,18px)] leading-[1.62] max-w-[48ch] mt-4">
              Every campaign starts with deep understanding and ends with compounding growth. We don&apos;t guess — we build, test and scale what works.
            </p>
          </div>

          {/* Double-Helix Wave Canvas (Image 2) */}
          <ProcessFlowCanvas />

          {/* 4 Interactive Step Animations */}
          <div className="donuts grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <DonutCanvas
              kind="explore"
              numberLabel="01"
              title="Plan"
              desc="Understand the business, audience, offer and objective before the campaign begins."
              badgeBg="bg-[#2563eb]"
            />
            <DonutCanvas
              kind="generate"
              numberLabel="02"
              title="Create"
              desc="Develop the ads, videos, creatives and messaging that give people a reason to pay attention."
              badgeBg="bg-[#7c3aed]"
            />
            <DonutCanvas
              kind="refine"
              numberLabel="03"
              title="Launch"
              desc="Take campaigns live across Meta, Google and social platforms with the right targeting and structure."
              badgeBg="bg-[#16a34a]"
            />
            <DonutCanvas
              kind="scale"
              numberLabel="04"
              title="Scale"
              desc="Learn from performance, improve the campaign and scale the strongest opportunities."
              badgeBg="bg-[#f97316]"
            />
          </div>
        </div>
      </section>

      {/* 360° Service Pillars Section */}
      <section className="ed-protocol relative z-2 py-16 md:py-24 px-7 md:px-14 bg-transparent" id="protocol">
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
              <a
                href="/services"
                className="btn-site pixel-clip inline-flex text-sm py-3.5 px-8"
              >
                View all services
              </a>
            </div>
          </div>

          {/* Dynamic Expanding Particle Stream Canvas */}
          <ProtocolFlowCanvas />

          {/* 4 Service Pillars */}
          <div className="donuts grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="step flex flex-col gap-3 group relative">
              <div className="dl flex items-center gap-2">
                <span className="dn inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#7c3aed] text-white font-mono text-[11px] font-medium tracking-wide">
                  01
                </span>
                <span className="dt text-[16px] font-bold text-[#0A0A0A] tracking-tight">Growth Marketing</span>
              </div>
              <p className="dd m-0 text-[14px] leading-[1.55] text-[#2a2a2a]">
                Google & Meta Ads, influencer campaigns, social media growth, content creation and full lead generation.
              </p>
            </div>

            <div className="step flex flex-col gap-3 group relative">
              <div className="dl flex items-center gap-2">
                <span className="dn inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#2563eb] text-white font-mono text-[11px] font-medium tracking-wide">
                  02
                </span>
                <span className="dt text-[16px] font-bold text-[#0A0A0A] tracking-tight">IT Consulting</span>
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
                <span className="dt text-[16px] font-bold text-[#0A0A0A] tracking-tight">Account Recovery</span>
              </div>
              <p className="dd m-0 text-[14px] leading-[1.55] text-[#2a2a2a]">
                Restricted Meta Business Manager, disabled ad accounts, hacked pages — we get you back in business fast.
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

      {/* Merged Seamless Pixel Marquee & Contact CTA Section */}
      <section className="cta relative z-2 pt-12 pb-24 md:pb-36 px-7 md:px-14 text-center bg-transparent overflow-hidden" id="contact">
        {/* Pixel Marquee seamlessly integrated above CTA */}
        <div className="mb-14 cursor-pointer" data-cursor-label="✦">
          <PixelMarquee />
        </div>

        <div className="wrap max-w-[1176px] mx-auto flex flex-col items-center">
          <a
            href="/contact"
            className="btn-site pixel-clip text-lg md:text-xl py-4 px-10 mb-8"
          >
            Book your free strategy call
          </a>
          <p className="meta text-[clamp(15px,1.2vw,19px)] leading-[1.6] max-w-[46ch] text-[#8b8b8b] text-center mb-4">
            From ads and influencer campaigns to IT builds and account recovery — one partner, end-to-end. Let&apos;s talk about your goals and build a plan to achieve them.
          </p>
          <p className="meta text-[clamp(15px,1.2vw,19px)] leading-[1.6] text-[#0A0A0A]">
            <a
              href="mailto:hello@adbazaar.com"
              className="text-[#0A0A0A] no-underline border-b border-black/50 hover:border-black transition-colors"
            >
              hello@adbazaar.com
            </a>{" "}
            &middot; 🚨{" "}
            <a
              href="mailto:recovery@adbazaar.com"
              className="text-[#0A0A0A] no-underline border-b border-black/50 hover:border-black transition-colors"
            >
              recovery@adbazaar.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
