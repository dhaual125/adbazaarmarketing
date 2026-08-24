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
    bio: "15+ years in digital marketing and technology. Passionate about helping businesses scale. Believes the best growth comes from combining great technology with great marketing.",
    color: "var(--purple)",
  },
  {
    name: "Chirag Nath",
    role: "Co-Founder",
    image: "/chirag nath.png",
    bio: "Google & Meta certified expert. Managed $50M+ in ad spend. Specializes in full-funnel growth strategies that turn ad budgets into compounding revenue engines.",
    color: "var(--blue)",
  },
  {
    name: "Kuldeep",
    role: "COO & Partner",
    image: "/kuldeep.jpeg",
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
  "Google Partner", "Meta Business Partner", "Microsoft Solutions Partner", "AWS Partner", "Shopify Partner",
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
                <div className="team-card__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.image} alt={m.name} className="team-card__img" />
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
              <div key={i} className="capability-card" style={{ "--accent": "var(--purple)" } as React.CSSProperties}>
                <div className="capability-dot" />
                <h3 className="capability-name">{p}</h3>
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
