"use client";

import React, { useState } from "react";
import Link from "next/link";

const cases = [
  {
    industry: "Beauty & Fashion",
    service: "Growth Marketing",
    title: "How We Scaled a Beauty Brand to 7-Figures",
    challenge: "A beauty startup had a great product but no brand awareness. Their ad spend was burning cash with zero ROI, and their social media presence was non-existent.",
    solution: "We revamped their Google Ads strategy with precise targeting, launched a high-impact influencer campaign with 20 micro-influencers, and created a content engine that built their social presence from 500 to 50K followers in 6 months.",
    results: [{ num: "300%", label: "ROAS increase" }, { num: "500+", label: "Qualified leads/month" }, { num: "50K+", label: "New social followers" }, { num: "7-fig", label: "Annual revenue" }],
    quote: "They took us from zero to hero. We went from struggling to keep up to being one of the fastest-growing brands in our niche.",
    author: "Jessica L., Beauty Brand Owner",
    color: "var(--purple)",
  },
  {
    industry: "E-commerce",
    service: "Account Recovery",
    title: "How We Saved an E-commerce Business $10K/Day",
    challenge: "An e-commerce business had their ad account permanently restricted with no warning. They were losing $10,000 per day in revenue and had exhausted all self-service appeal options.",
    solution: "We conducted a deep audit to understand the root cause, gathered all necessary documentation, and crafted a comprehensive appeal. We followed up persistently and escalated the case to a higher tier.",
    results: [{ num: "72hrs", label: "To restoration" }, { num: "$30K", label: "Revenue saved" }, { num: "Full", label: "Access restored" }, { num: "0", label: "Future restrictions" }],
    quote: "Our ad account was permanently restricted. We were losing $10K/day. This team got us back in 72 hours. They're not just marketers — they're lifesavers.",
    author: "Sarah K., E-commerce Founder",
    color: "var(--green)",
  },
  {
    industry: "Professional Services",
    service: "IT & Consulting",
    title: "How We Digitally Transformed a Plumbing Business",
    challenge: "A plumbing company with 20 locations was losing leads because their website was slow, outdated, and not mobile-friendly. Their lead management was manual and chaotic.",
    solution: "We built a new, conversion-focused website with location-based landing pages. We integrated a lead routing platform that automatically connected ad clicks to the nearest available plumber and managed their Google Ads.",
    results: [{ num: "40%", label: "Lower cost per lead" }, { num: "3X", label: "Lead conversion rate" }, { num: "50%", label: "Faster response times" }, { num: "200%", label: "ROAS improvement" }],
    quote: "They built our website, set up our CRM, AND launched our Google Ads campaign. One partner did what used to take three agencies. Our revenue doubled in 4 months.",
    author: "Michael R., SaaS CEO",
    color: "var(--blue)",
  },
  {
    industry: "SaaS",
    service: "Full Transformation",
    title: "SaaS Company IT & Marketing Overhaul",
    challenge: "Disconnected CRM, inefficient lead generation, and low conversion rates were costing this SaaS company thousands in wasted ad spend every month.",
    solution: "We integrated their CRM, built lead qualification automation, and launched a full-funnel marketing strategy that aligned their technology and marketing for the first time.",
    results: [{ num: "5X", label: "Qualified leads" }, { num: "50%", label: "Shorter sales cycles" }, { num: "300%", label: "Revenue growth" }, { num: "95%", label: "Lead retention" }],
    quote: "Finally, a team that understands both technology and marketing. They didn't just fix our ads — they fixed our entire growth engine.",
    author: "David M., SaaS Founder",
    color: "var(--orange)",
  },
  {
    industry: "Healthcare",
    service: "Growth Marketing",
    title: "Healthcare Practice Social Growth",
    challenge: "A healthcare practice had no online presence and was struggling to attract new patients in a competitive local market.",
    solution: "We built a complete social media presence, created educational content, and launched hyper-local ad campaigns targeting patients within a 10-mile radius.",
    results: [{ num: "40K", label: "Social followers" }, { num: "200+", label: "New patients" }, { num: "150%", label: "Revenue increase" }, { num: "4.9★", label: "Google rating" }],
    quote: "We went from invisible online to the most-followed healthcare practice in our area. The results speak for themselves.",
    author: "Dr. Priya S., Practice Owner",
    color: "var(--purple)",
  },
  {
    industry: "Real Estate",
    service: "Influencer Marketing",
    title: "Real Estate Agency Influencer Campaign",
    challenge: "A real estate agency had low brand awareness and was struggling to attract new buyers in a saturated market.",
    solution: "We identified 15 local lifestyle influencers, created a video-first content strategy, and ran targeted ads to amplify the influencer content to qualified buyers.",
    results: [{ num: "1M+", label: "Campaign reach" }, { num: "300+", label: "Qualified leads" }, { num: "50%", label: "Increase in sales" }, { num: "12X", label: "Campaign ROI" }],
    quote: "The influencer campaign completely changed how people perceive our brand. We're now the go-to agency in our city.",
    author: "Raj P., Real Estate Director",
    color: "var(--blue)",
  },
];

const filters = ["All", "Growth Marketing", "IT & Consulting", "Account Recovery", "Full Transformation", "Influencer Marketing"];

export default function WorkPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? cases : cases.filter(c => c.service === active);

  return (
    <main className="page-main">

      {/* Hero */}
      <section className="page-hero">
        <div className="page-container">
          <p className="page-eyebrow">Case studies</p>
          <h1 className="page-title">
            Real results.<br />Real businesses.
          </h1>
          <p className="page-lead">
            See how we&apos;ve transformed businesses across industries — from marketing campaigns and technology builds to account recoveries and full digital transformations.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: "0 0 2rem" }}>
        <div className="page-container">
          <div className="filter-bar">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn${active === f ? " filter-btn--active" : ""}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="services-list">
        <div className="page-container">
          {filtered.map((c, i) => (
            <div key={i} className="case-study-row" style={{ "--accent": c.color } as React.CSSProperties}>
              <div className="case-study-meta">
                <span className="service-tag">{c.industry}</span>
                <span className="service-tag">{c.service}</span>
              </div>
              <h2 className="service-title" style={{ marginTop: "1rem" }}>{c.title}</h2>

              <div className="case-study-block" style={{ marginTop: "1.5rem" }}>
                <div className="case-study-col">
                  <p className="service-col-label">The Challenge</p>
                  <p className="value-body">{c.challenge}</p>
                  <p className="service-col-label" style={{ marginTop: "1.25rem" }}>Our Solution</p>
                  <p className="value-body">{c.solution}</p>
                </div>
                <div className="case-study-col">
                  <p className="service-col-label">The Results</p>
                  <div className="results-grid">
                    {c.results.map((r, ri) => (
                      <div key={ri} className="number-item">
                        <div className="number-val">{r.num}</div>
                        <div className="number-label">{r.label}</div>
                      </div>
                    ))}
                  </div>
                  <blockquote className="testimonial-quote" style={{ marginTop: "1.5rem" }}>
                    &ldquo;{c.quote}&rdquo;
                    <cite>— {c.author}</cite>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="page-container page-cta__inner">
          <h2 className="page-cta__title">Ready to be our next success story?</h2>
          <Link href="/contact" className="btn-site pixel-clip page-cta__btn">
            Book a free consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
