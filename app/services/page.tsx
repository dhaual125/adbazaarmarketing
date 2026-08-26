"use client";

import React, { useState } from "react";
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Google & Meta Ads Management",
    headline: "Turn Clicks into Customers",
    desc: "Stop wasting money on ads that don't convert. Our team of certified Google and Meta experts builds targeted campaigns that drive qualified leads and maximize your ROI.",
    what: [
      "Advanced audience targeting & retargeting",
      "A/B testing for continuous optimization",
      "Landing page optimization",
      "Daily performance monitoring & reporting",
      "Budget management & bid strategy",
    ],
    results: ["2–5X ROAS improvement", "30–50% lower cost per lead", "Increased conversion rates"],
    cta: "Start Your Ad Campaign",
    tags: ["Google Ads", "Meta Ads", "P-Max", "YouTube Ads", "ROAS Scaling"],
    color: "var(--purple)",
  },
  {
    number: "02",
    title: "Influencer Marketing Campaigns",
    headline: "Reach Your Audience Through Trusted Voices",
    desc: "Influencer marketing isn't just about big names — it's about authentic connections. We identify, vet, and manage partnerships with influencers who genuinely resonate with your target audience.",
    what: [
      "Influencer identification & vetting",
      "Campaign strategy & creative briefs",
      "Outreach & negotiation",
      "Campaign management & tracking",
      "Performance analytics & reporting",
    ],
    results: ["Authentic brand reach", "Higher engagement rates", "Increased brand trust & loyalty"],
    cta: "Launch Your Influencer Campaign",
    tags: ["Micro-Influencers", "UGC", "Brand Partnerships", "Campaign Tracking"],
    color: "var(--blue)",
  },
  {
    number: "03",
    title: "Social Media Growth & Management",
    headline: "Build a Community, Not Just Followers",
    desc: "Social media isn't just about posting — it's about building relationships. We manage your platforms with a strategic content calendar, community engagement, and data-driven growth tactics.",
    what: [
      "Platform strategy (Instagram, Facebook, LinkedIn, TikTok)",
      "Content calendar creation",
      "Daily community management & engagement",
      "Growth hacking strategies",
      "Analytics & reporting",
    ],
    results: ["20–40% monthly follower growth", "Higher engagement rates", "Increased brand visibility"],
    cta: "Grow Your Social Presence",
    tags: ["Instagram", "Facebook", "LinkedIn", "TikTok", "Community"],
    color: "var(--green)",
  },
  {
    number: "04",
    title: "Advertising Content & Creatives",
    headline: "Content That Captures, Converts, and Inspires",
    desc: "Great content is the backbone of every successful marketing strategy. Our creative team produces high-impact visuals, videos, and copy that tell your brand story and drive action.",
    what: [
      "Video production (ads, testimonials, promos)",
      "Graphic design (social posts, ads, branding)",
      "Copywriting (website, email, ads, blogs)",
      "Content strategy & planning",
    ],
    results: ["Higher engagement & shareability", "Consistent brand messaging", "Improved conversion rates"],
    cta: "Get Creative Content",
    tags: ["Video Production", "UGC Ads", "Graphic Design", "Copywriting"],
    color: "var(--orange)",
  },
  {
    number: "05",
    title: "Full Lead Generation & Funnel Management",
    headline: "From First Click to Closed Deal",
    desc: "We don't just generate leads — we build complete sales funnels that nurture prospects from awareness to conversion. Our data-driven approach ensures every lead is high-quality and ready to buy.",
    what: [
      "Lead magnet creation (eBooks, webinars, checklists)",
      "Landing page & funnel design",
      "Email & SMS automation",
      "Lead scoring & qualification",
      "CRM integration",
    ],
    results: ["3–5X increase in qualified leads", "Shorter sales cycles", "Higher conversion rates"],
    cta: "Build Your Funnel",
    tags: ["Lead Funnels", "Email Automation", "CRM", "WhatsApp Nurture"],
    color: "var(--purple)",
  },
  {
    number: "06",
    title: "Business & IT Consulting",
    headline: "Future-Proof Your Business with Strategic Technology",
    desc: "Technology moves fast. Are you keeping up? We help businesses assess their current tech stack, identify gaps, and build a roadmap for digital transformation that drives efficiency and growth.",
    what: [
      "Technology stack assessment",
      "Custom website & app development (React, Next.js, Shopify)",
      "Custom software & workflow automation",
      "Cloud migration & managed IT (AWS, Azure, GCP)",
      "AI agents, chatbots & predictive analytics",
    ],
    results: ["40% average efficiency improvement", "99.9% uptime guarantee", "100+ websites & apps built"],
    cta: "Start Your Transformation",
    tags: ["Web Dev", "Custom Software", "AI Integration", "Cloud", "Digital Transformation"],
    color: "var(--blue)",
  },
  {
    number: "07",
    title: "Website & App Development — Navchetna Technologies",
    headline: "Custom Digital Products Built to Perform",
    desc: "Powered by Navchetna Technologies, we design and develop high-performance websites, mobile apps, and custom software solutions tailored to your business. From sleek landing pages to full-scale enterprise platforms — we build it all, fast and right.",
    what: [
      "Custom website design & development (React, Next.js, WordPress, Shopify)",
      "Mobile app development (iOS & Android — React Native / Flutter)",
      "E-commerce stores with payment gateway integration",
      "Custom CRM, ERP & business management software",
      "API development, third-party integrations & automation",
      "UI/UX design, prototyping & user testing",
      "Cloud hosting, deployment & ongoing maintenance",
      "AI chatbots, automation workflows & smart dashboards",
    ],
    results: [
      "Fully custom, scalable digital products",
      "3–6 week delivery for standard projects",
      "99.9% uptime with managed cloud hosting",
      "SEO-optimised, mobile-first builds",
    ],
    cta: "Start Your Build",
    tags: ["Next.js", "React Native", "Shopify", "Flutter", "Node.js", "AWS", "UI/UX", "Custom Software"],
    color: "var(--orange)",
  },
];

const steps = [
  { n: "01", title: "Discovery & Digital Audit", desc: "We dive deep into your business goals, current technology, marketing performance, and operational challenges.", color: "var(--blue)" },
  { n: "02", title: "Strategic Roadmap", desc: "We deliver a unified plan covering your technology needs alongside your growth strategy — no silos, no misalignment.", color: "var(--green)" },
  { n: "03", title: "Build & Execute", desc: "Our team develops your technical infrastructure and launches your marketing campaigns simultaneously, ensuring they're fully integrated.", color: "var(--purple)" },
  { n: "04", title: "Scale & Optimize", desc: "We provide ongoing support, optimization, and consulting to continuously improve your business and technology systems.", color: "var(--orange)" },
];

const stats = [
  { num: "$50M+", label: "Ad Spend Managed" },

  { num: "300%", label: "Average ROAS Increase" },

  { num: "10M+", label: "Social Reach Generated" },
];

export default function ServicesPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="page-main">

      {/* Hero */}
      <section className="page-hero">
        <div className="page-container">
          <p className="page-eyebrow">What we do</p>
          <h1 className="page-title">
            Everything you need<br />to grow, under one roof.
          </h1>
          <p className="page-lead">
            Growth marketing, IT consulting, creative production, and leads management — all integrated, all focused on one thing: your business growth.
          </p>
          <Link href="/contact" className="btn-site" style={{ display: "inline-flex", marginTop: "2rem", width: "100%", maxWidth: "320px" }}>
            Get a Free Marketing Audit →
          </Link>
        </div>
      </section>

      {/* Services Accordion */}
      <section className="services-list">
        <div className="page-container">
          {services.map((s, i) => (
            <div
              key={i}
              className="svc-accordion"
              style={{ "--accent": s.color } as React.CSSProperties}
            >
              {/* Toggle row */}
              <button
                className="svc-accordion__toggle"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="svc-accordion__num">{s.number}</span>
                <span className="svc-accordion__title" style={{ minWidth: 0 }}>{s.title}</span>
                <span className="svc-accordion__chevron">{open === i ? "−" : "+"}</span>
              </button>

              {/* Expanded panel: title left, content right */}
              {open === i && (
                <div className="svc-accordion__panel">
                  <div className="svc-accordion__left">
                    <p className="svc-accordion__headline">{s.headline}</p>
                    <div className="service-tags" style={{ marginTop: "1rem" }}>
                      {s.tags.map((t) => (
                        <span key={t} className="service-tag">{t}</span>
                      ))}
                    </div>
                    <Link href="/contact" className="btn-site svc-accordion__cta">
                      {s.cta} →
                    </Link>
                  </div>
                  <div className="svc-accordion__right">
                    <p className="svc-accordion__desc">{s.desc}</p>
                    <div className="svc-accordion__cols">
                      <div>
                        <p className="service-col-label">What we do</p>
                        <ul className="service-list">
                          {s.what.map((w, wi) => <li key={wi}>{w}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="service-col-label">Results you can expect</p>
                        <ul className="service-list service-list--results">
                          {s.results.map((r, ri) => <li key={ri}>{r}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="about-numbers">
        <div className="page-container" style={{ textAlign: "center" }}>
          <h2 className="section-label">Marketing that delivers</h2>
          <div className="numbers-grid" style={{ justifyContent: "center" }}>
            {stats.map((n, i) => (
              <div key={i} className="number-item">
                <div className="number-val">{n.num}</div>
                <div className="number-label">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="about-values">
        <div className="page-container">
          <h2 className="section-label">Your journey to growth starts here</h2>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="step-card" style={{ "--accent": s.color } as React.CSSProperties}>
                <span className="step-card__num">{s.n}</span>
                <h3 className="step-card__title">{s.title}</h3>
                <p className="step-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "3rem" }}>
            <Link href="/contact" className="btn-site">
              Start Your Journey →
            </Link>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="about-values">
        <div className="page-container">
          <h2 className="section-label">How we scaled a beauty brand to 7-figures</h2>
          <div className="case-study-block">
            <div className="case-study-col">
              <p className="service-col-label">The Challenge</p>
              <p className="value-body">A beauty startup had a great product but no brand awareness. Their ad spend was burning cash with zero ROI, and their social media presence was non-existent.</p>
              <p className="service-col-label" style={{ marginTop: "1.5rem" }}>Our Solution</p>
              <p className="value-body">We revamped their Google Ads strategy with precise targeting, launched a high-impact influencer campaign with 20 micro-influencers, and created a content engine that built their social presence from 500 to 50K followers in 6 months.</p>
            </div>
            <div className="case-study-col">
              <p className="service-col-label">The Results</p>
              <div className="results-grid">
                {[
                  { num: "300%", label: "Increase in ROAS" },
                  { num: "500+", label: "Qualified leads/month" },
                  { num: "50K+", label: "New social followers" },
                  { num: "7-fig", label: "Annual revenue achieved" },
                ].map((r, i) => (
                  <div key={i} className="number-item">
                    <div className="number-val">{r.num}</div>
                    <div className="number-label">{r.label}</div>
                  </div>
                ))}
              </div>
              <blockquote className="testimonial-quote" style={{ marginTop: "1.5rem" }}>
                &ldquo;They took us from zero to hero. We went from struggling to keep up to being one of the fastest-growing brands in our niche.&rdquo;
                <cite>— Jessica L., Beauty Brand Owner</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="page-container page-cta__inner">
          <h2 className="page-cta__title">Ready to scale your marketing?</h2>
          <Link href="/contact" className="btn-site page-cta__btn">
            Book your free strategy call
          </Link>
        </div>
      </section>
    </main>
  );
}
