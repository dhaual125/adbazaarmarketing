"use client";

import React from "react";
import Link from "next/link";

const values = [
  {
    heading: "Client Obsession",
    body: "Your success is our success. We don't rest until we've delivered results that exceed your expectations. 95% of our clients continue working with us after the first project.",
  },
  {
    heading: "Innovation",
    body: "We stay ahead of the curve — whether it's the latest AI tools, marketing trends, or platform policies. We bring tomorrow's solutions to your business today.",
  },
  {
    heading: "Transparency",
    body: "No hidden fees. No jargon. No surprises. We communicate clearly and honestly — including when something isn't working and needs to change.",
  },
  {
    heading: "Excellence",
    body: "Mediocrity isn't in our vocabulary. We strive for excellence in everything we do — from a single ad creative to a full digital transformation.",
  },
  {
    heading: "Partnership",
    body: "We're not a vendor. We're a long-term partner in your growth journey. We scale with you, celebrate your wins, and solve problems before they become crises.",
  },
];

const team = [
  {
    name: "Pawan Nath",
    role: "CEO & Co-Founder",
    image: "/pawan nath.png",
    objectPosition: "50% 10%",
    bio: "15+ years in digital marketing and technology. Passionate about helping businesses scale. Believes the best growth comes from combining great technology with great marketing.",
    color: "var(--purple)",
  },
  {
    name: "Chirag Nath",
    role: "Co-Founder",
    image: "/chirag nath.png",
    objectPosition: "50% 10%",
    bio: "Google & Meta certified expert. Managed $50M+ in ad spend. Specializes in full-funnel growth strategies that turn ad budgets into compounding revenue engines.",
    color: "var(--blue)",
  },
  {
    name: "Kuldeep",
    role: "COO & Partner",
    image: "/kuldeeep.jpeg",
    objectPosition: "50% 15%",
    bio: "Operations leader driving efficiency and growth. Oversees delivery, client success, and strategic partnerships across all service lines.",
    color: "var(--green)",
  },
];

const capabilities = [
  { name: "Growth Marketing", desc: "Google & Meta Ads, influencer campaigns, social media growth, content creation and full lead generation.", color: "var(--purple)" },
  { name: "Business & IT Consulting", desc: "Technology strategy, custom websites and apps, software development, cloud services, managed IT and AI integration.", color: "var(--blue)" },
  { name: "Crisis & Account Recovery", desc: "Restricted ad accounts, disabled Business Managers, hacked pages — our specialist team gets you back fast.", color: "var(--green)" },
  { name: "Leads & CRM Automation", desc: "Automated qualification, instant WhatsApp/SMS nurture, CRM routing and pipeline management.", color: "var(--orange)" },
];

const partners = [
  {
    name: "Google Partner",
    color: "#4285F4",
    logo: (
      <svg className="w-9 h-9" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    ),
  },
  {
    name: "Meta Business Partner",
    color: "#0081FB",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/meta-logo.png"
        alt="Meta Business Partner"
        className="h-10 w-auto object-contain"
      />
    ),
  },
  {
    name: "Microsoft Solutions Partner",
    color: "#00A4EF",
    logo: (
      <svg className="w-9 h-9" viewBox="0 0 24 24">
        <path fill="#F25022" d="M1 1h10v10H1z"/>
        <path fill="#7FBA00" d="M13 1h10v10H13z"/>
        <path fill="#00A4EF" d="M1 13h10v10H1z"/>
        <path fill="#FFB900" d="M13 13h10v10H13z"/>
      </svg>
    ),
  },
  {
    name: "AWS Partner",
    color: "#FF9900",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://download.logo.wine/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.png"
        alt="AWS Partner"
        className="h-11 w-auto object-contain -ml-2"
      />
    ),
  },
  {
    name: "Shopify Partner",
    color: "#95BF47",
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://download.logo.wine/logo/Shopify/Shopify-Logo.wine.png"
        alt="Shopify Partner"
        className="h-12 w-auto object-contain -ml-2"
      />
    ),
  },
];

const testimonials = [
  {
    quote: "Our ad account was permanently restricted. We were losing $10K/day. This team got us back in 72 hours. They're not just marketers — they're lifesavers.",
    author: "Sarah K.",
    role: "E-commerce Founder",
    color: "var(--purple)",
  },
  {
    quote: "They built our website, set up our CRM, AND launched our Google Ads campaign. One partner did what used to take three agencies. Our revenue doubled in 4 months.",
    author: "Michael R.",
    role: "SaaS CEO",
    color: "var(--blue)",
  },
  {
    quote: "Our influencer campaign with their team generated 500+ qualified leads in the first month. They handled everything — strategy, outreach, creative, and reporting.",
    author: "Jessica L.",
    role: "Beauty Brand Owner",
    color: "var(--green)",
  },
];

export default function AboutPage() {
  return (
    <main className="page-main">

      {/* Hero */}
      <section className="page-hero">
        <div className="page-container">
          <p className="page-eyebrow">Who we are</p>
          <h1 className="page-title">
            We&apos;re not just an agency.<br />We&apos;re your growth partner.
          </h1>
          <p className="page-lead">
            A team of marketers, technologists, and problem-solvers dedicated to building and scaling your business — combining growth marketing, IT consulting, creative production, and crisis recovery under one roof.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-values">
        <div className="page-container">
          <h2 className="section-label">Our story</h2>
          <div className="value-row">
            <h3 className="value-heading">Born from a gap in the market.</h3>
            <p className="value-body">
              Our founders saw the same problem everywhere: businesses were juggling multiple agencies — a marketing agency, an IT firm, a web developer. Each operated in a silo. Communication was fragmented. Strategies weren&apos;t aligned. Results suffered.
            </p>
          </div>
          <div className="value-row">
            <h3 className="value-heading">So we built something different.</h3>
            <p className="value-body">
              A full-service growth partner that offers everything under one roof. Marketing. Technology. Consulting. Crisis recovery. All integrated. All focused on one thing: your business growth. Today, we&apos;ve helped 300+ businesses across industries — from startups to established enterprises — build their digital foundation and scale their revenue.
            </p>
          </div>
          <div className="value-row">
            <h3 className="value-heading">Our mission.</h3>
            <p className="value-body">
              We believe that technology and marketing should work together seamlessly. When they do, businesses grow faster. When they don&apos;t, businesses struggle. Our mission is to eliminate the struggle and make growth inevitable.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-values">
        <div className="page-container">
          <h2 className="section-label">Our core values</h2>
          {values.map((v, i) => (
            <div key={i} className="value-row">
              <h3 className="value-heading">{v.heading}</h3>
              <p className="value-body">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="about-capabilities">
        <div className="page-container">
          <h2 className="section-label">What&apos;s in the room</h2>
          <div className="capabilities-grid">
            {capabilities.map((c, i) => (
              <div key={i} className="capability-card" style={{ "--accent": c.color } as React.CSSProperties}>
                <div className="capability-dot" />
                <h3 className="capability-name">{c.name}</h3>
                <p className="capability-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="about-numbers">
        <div className="page-container">
          <div className="numbers-grid">
            {[
              { num: "$50M+", label: "Ad spend managed" },
              { num: "300+", label: "Businesses transformed" },
              { num: "95%", label: "Account recovery success rate" },
              { num: "4.9/5", label: "Client satisfaction score" },
            ].map((n, i) => (
              <div key={i} className="number-item">
                <div className="number-val">{n.num}</div>
                <div className="number-label">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-values">
        <div className="page-container">
          <h2 className="section-label">The people behind your success</h2>
          <div className="team-grid">
            {team.map((m, i) => (
              <div key={i} className="team-card" style={{ "--accent": m.color } as React.CSSProperties}>
                <div className="team-card__photo !aspect-[4/5] overflow-hidden rounded-lg bg-[#f0f0f0]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.image}
                    alt={m.name}
                    className="team-card__img w-full h-full object-cover block"
                    style={{ objectPosition: m.objectPosition || "top center" }}
                  />
                </div>
                <h3 className="team-card__name">{m.name}</h3>
                <p className="team-card__role">{m.role}</p>
                <p className="team-card__bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="about-values">
        <div className="page-container">
          <h2 className="section-label">What our clients say</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card" style={{ "--accent": t.color } as React.CSSProperties}>
                <p className="testimonial-card__quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testimonial-card__author">
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="about-values">
        <div className="page-container">
          <h2 className="section-label">What it&apos;s like to work with us</h2>
          <div className="value-row">
            <h3 className="value-heading">Builders, thinkers, problem-solvers.</h3>
            <p className="value-body">
              We work hard, we collaborate, and we celebrate each other&apos;s wins. We bring that same energy to our client relationships. Fast-paced and results-driven. Creative and innovative. Remote-first and global.
            </p>
          </div>
          <div className="capabilities-grid" style={{ marginTop: "2rem" }}>
            {partners.map((p, i) => (
              <div
                key={i}
                className="capability-card flex flex-col items-start justify-between min-h-[135px] p-6 hover:shadow-md transition-all group"
                style={{ "--accent": p.color } as React.CSSProperties}
              >
                <div className="flex items-center justify-start h-10 w-full mb-4 transition-transform duration-300 group-hover:scale-105">
                  {p.logo}
                </div>
                <h3 className="capability-name text-[15px] font-bold text-[#0A0A0A] m-0 tracking-tight">
                  {p.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="page-container page-cta__inner">
          <h2 className="page-cta__title">Ready to partner with a team that cares?</h2>
          <Link href="/contact" className="btn-site pixel-clip page-cta__btn">
            Start a conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
