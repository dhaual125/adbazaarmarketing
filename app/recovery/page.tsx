"use client";

import React from "react";
import Link from "next/link";

const services = [
  {
    title: "Meta Business Manager & Portfolio Recovery",
    headline: "Regain Admin Access and Ownership",
    desc: "Lost access to your Business Manager because an admin left or was removed? We help you regain ownership through Meta's verification and support channels.",
    what: ["Business verification & documentation", "Admin access restoration", "Business Manager ownership transfer", "Asset recovery (ad accounts, pages, pixels)"],
  },
  {
    title: "Restricted Ad Account Appeals",
    headline: "Overturn Ad Account Restrictions and Bans",
    desc: "Your ad account was disabled or restricted due to policy violations, payment issues, or suspicious activity. We craft compelling appeals that address the root cause and maximize your chances of reinstatement.",
    what: ["Root cause analysis", "Appeal letter preparation", "Policy compliance guidance", "Escalation to Meta support"],
  },
  {
    title: "Hacked or Disabled Instagram & Facebook Pages",
    headline: "Restore Compromised Accounts",
    desc: "Your page was hacked, impersonated, or disabled. We work through Meta's official channels to verify your ownership and restore access to your page and followers.",
    what: ["Account verification & ownership proof", "Hacked account recovery", "Disabled page appeals", "Prevention & security advice"],
  },
  {
    title: "E-commerce & Payment Issues",
    headline: "Fix Instagram/Facebook Shop and Monetization Problems",
    desc: "Your Instagram Shop is disabled. Your payment processing is blocked. Your monetization features are restricted. We help resolve these issues so you can start selling again.",
    what: ["Shop & catalog restoration", "Payment processing resolution", "Monetization feature appeals", "E-commerce compliance guidance"],
  },
];

const steps = [
  { n: "01", title: "Free Consultation & Audit", desc: "Tell us what happened. We'll diagnose the issue, assess your chances of recovery, and give you an honest assessment." },
  { n: "02", title: "Documentation Preparation", desc: "We'll help you gather all required documents — business license, tax ID, government ID, proof of business ownership, and any other supporting evidence." },
  { n: "03", title: "Case Building & Submission", desc: "We craft a professional, compelling appeal that addresses the root cause. We ensure every form is filled out correctly and every box is checked." },
  { n: "04", title: "Follow-up & Support", desc: "We guide you through the process until your access is restored. We also provide advice on how to prevent future blocks." },
];

export default function RecoveryPage() {
  return (
    <main className="page-main">

      {/* Urgent Banner */}
      <div className="urgent-banner">
        <strong>Urgent:</strong> If your ad account is restricted or your Business Manager is disabled, every day without access means lost revenue. <Link href="/contact">Contact us immediately →</Link>
      </div>

      {/* Hero */}
      <section className="page-hero">
        <div className="page-container">
          <p className="page-eyebrow">Crisis & Account Recovery</p>
          <h1 className="page-title">
            Locked out? Restricted?<br />Hacked? We can help.
          </h1>
          <p className="page-lead">
            Don&apos;t let a sudden account restriction, hack, or lockout stop your business. Our specialized team navigates Meta&apos;s complex appeals process to restore your accounts fast — often within 72 hours.
          </p>
          <Link href="/contact" className="btn-site pixel-clip" style={{ display: "inline-flex", marginTop: "2rem" }}>
            Get Emergency Help Now
          </Link>
        </div>
      </section>

      {/* The Problem */}
      <section className="about-values">
        <div className="page-container">
          <h2 className="section-label">The nightmare scenario</h2>
          <div className="value-row">
            <h3 className="value-heading">Your business grinds to a halt.</h3>
            <p className="value-body">
              Your Meta Business Manager is suddenly restricted. Your ad account is disabled. Your Instagram page is hacked. You can&apos;t access leads, you can&apos;t run ads, and you can&apos;t reach customers.
            </p>
          </div>
          <div className="value-row">
            <h3 className="value-heading">Meta&apos;s support isn&apos;t helping.</h3>
            <p className="value-body">
              You try Meta&apos;s support forms — but you get generic responses, no real help, and endless waiting. Days turn into weeks. Your revenue drops. Your competitors take advantage. That&apos;s where we come in.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-list">
        <div className="page-container">
          <h2 className="section-label">What we recover</h2>
          {services.map((s, i) => (
            <div key={i} className="rcv-row">
              {/* Left: number + title */}
              <div className="rcv-row__left">
                <span className="rcv-row__num">0{i + 1}</span>
                <h2 className="rcv-row__title">{s.title}</h2>
              </div>
              {/* Right: headline, desc, list */}
              <div className="rcv-row__right">
                <p className="rcv-row__headline">{s.headline}</p>
                <p className="rcv-row__desc">{s.desc}</p>
                <ul className="service-list" style={{ marginTop: "1rem" }}>
                  {s.what.map((w, wi) => <li key={wi}>{w}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="about-numbers">
        <div className="page-container">
          <h2 className="section-label">We get results</h2>
          <div className="numbers-grid">
            {[
              { num: "95%", label: "Recovery Success Rate" },
              { num: "72hrs", label: "Average Recovery Time" },
              { num: "500+", label: "Accounts Recovered" },
              { num: "100%", label: "Confidential & Secure" },
            ].map((n, i) => (
              <div key={i} className="number-item">
                <div className="number-val">{n.num}</div>
                <div className="number-label">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="about-values">
        <div className="page-container">
          <h2 className="section-label">A clear, structured path to recovery</h2>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} className="step-card">
                <span className="step-card__num">{s.n}</span>
                <h3 className="step-card__title">{s.title}</h3>
                <p className="step-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="about-values">
        <div className="page-container">
          <h2 className="section-label">How we saved a business $10K/day</h2>
          <div className="case-study-block">
            <div className="case-study-col">
              <p className="service-col-label">The Challenge</p>
              <p className="value-body">An e-commerce business had their ad account permanently restricted with no warning. They were losing $10,000 per day in revenue and had exhausted all self-service appeal options.</p>
              <p className="service-col-label" style={{ marginTop: "1.5rem" }}>Our Solution</p>
              <p className="value-body">We conducted a deep audit to understand the root cause, gathered all necessary documentation, and crafted a comprehensive appeal. We followed up persistently and escalated the case to a higher tier.</p>
            </div>
            <div className="case-study-col">
              <p className="service-col-label">The Results</p>
              <div className="results-grid">
                {[
                  { num: "72hrs", label: "To account restoration" },
                  { num: "$30K", label: "In saved revenue" },
                  { num: "Full", label: "Ad account access restored" },
                  { num: "Ongoing", label: "Compliance strategy" },
                ].map((r, i) => (
                  <div key={i} className="number-item">
                    <div className="number-val">{r.num}</div>
                    <div className="number-label">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Pathways */}
      <section className="about-values">
        <div className="page-container">
          <h2 className="section-label">What if standard appeals don&apos;t work?</h2>
          <div className="value-row">
            <h3 className="value-heading">Independent appeals bodies.</h3>
            <p className="value-body">In certain regions (like Europe), there are independent appeals bodies like the Appeals Centre Europe. These organizations can review Meta&apos;s decisions and potentially overturn them. Recent reports show they overturned Meta&apos;s decision in 59% of eligible cases.</p>
          </div>
          <div className="value-row">
            <h3 className="value-heading">Legal & strategic support.</h3>
            <p className="value-body">For complex disputes, some law firms and specialized agencies offer legal or strategic support. While we may not offer these directly, we can guide you on what makes sense for your situation.</p>
          </div>
          <div className="urgent-banner" style={{ marginTop: "2rem" }}>
            <em>Recovery is not guaranteed and depends on the final decision of Meta. Our service fee covers our professional time and expertise. We will always be honest about your chances and advise accordingly.</em>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-cta">
        <div className="page-container page-cta__inner">
          <h2 className="page-cta__title">Don&apos;t wait. Every minute counts.</h2>
          <Link href="/contact" className="btn-site pixel-clip page-cta__btn">
            Get Emergency Help Now
          </Link>
        </div>
      </section>
    </main>
  );
}
