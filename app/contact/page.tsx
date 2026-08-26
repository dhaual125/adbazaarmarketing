"use client";

import React, { useState } from "react";

const faqs = [
  {
    q: "What industries do you work with?",
    a: "We work with businesses across industries — e-commerce, SaaS, healthcare, professional services, real estate, beauty, B2B, and more. If you're looking to grow, we can help.",
  },
  {
    q: "How quickly can you start?",
    a: "We can start as soon as you're ready. For marketing campaigns, we typically begin within 48–72 hours. For IT and development projects, we'll discuss timelines during the consultation.",
  },
  {
    q: "What's your pricing model?",
    a: "We offer flexible pricing — monthly retainers for marketing and managed IT, and project-based fees for websites and custom software. We'll provide a custom quote during your free consultation.",
  },
  {
    q: "Do you guarantee results?",
    a: "We can't guarantee specific outcomes, but we guarantee we'll work tirelessly to deliver results. Our track record speaks for itself — 95% client retention and hundreds of successful campaigns.",
  },
  {
    q: "How do you track campaign performance?",
    a: "We set up comprehensive tracking using Meta Pixel, Google Analytics 4, and server-side tracking so you get transparent weekly reports on CAC, ROAS, and qualified leads.",
  },
  {
    q: "Can you help if I'm not in India or the US?",
    a: "Absolutely. We work with clients globally and have experience navigating different regional policies, including European appeals bodies and cross-border compliance requirements.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    service: "",
    challenge: "",
    source: "",
    budget: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = [
      `*New Enquiry — AD BAZAAR*`,
      ``,
      `*Name:* ${form.name}`,
      `*Business:* ${form.business}`,
      `*Email:* ${form.email}`,
      `*Phone:* ${form.phone}`,
      form.service ? `*Service:* ${form.service}` : null,
      form.budget ? `*Budget:* ${form.budget}` : null,
      ``,
      `*Challenge:*`,
      form.challenge,
    ]
      .filter(Boolean)
      .join("\n");

    // Send to Pawan Nath (CEO & Co-Founder) WhatsApp number
    window.open(`https://wa.me/917728840116?text=${encodeURIComponent(msg)}`, "_blank");

    // Also open WhatsApp for the user's own number so they receive a copy
    const userPhone = form.phone.replace(/[^0-9]/g, "");
    const userPhoneWithCode = userPhone.startsWith("91") ? userPhone : `91${userPhone}`;
    setTimeout(() => {
      window.open(`https://wa.me/${userPhoneWithCode}?text=${encodeURIComponent(msg)}`, "_blank");
    }, 800);

    // Reset form
    setForm({ name: "", business: "", email: "", phone: "", service: "", challenge: "", source: "", budget: "" });
  };

  return (
    <main className="page-main">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-container">
          <p className="page-eyebrow">Get in touch</p>
          <h1 className="page-title">
            Let&apos;s build, grow,<br />and scale together.
          </h1>
          <p className="page-lead">
            Fill out the form below, or reach out directly. We respond within 24 hours — usually much faster.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="contact-section">
        <div className="page-container contact-grid">

          {/* Form */}
          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Full name *</label>
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Business name *</label>
                    <input
                      type="text"
                      name="business"
                      className="form-input"
                      placeholder="Your business name"
                      value={form.business}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Email address *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="hello@yourbusiness.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Phone number *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Service interested in</label>
                    <select name="service" className="form-input form-select" value={form.service} onChange={handleChange}>
                      <option value="">Select a service</option>
                      <option value="growth-marketing">Growth Marketing (Ads, Social, Influencer)</option>
                      <option value="it-consulting">IT & Consulting (Website, App, Software)</option>
                      <option value="creative-video">Creative Production & Video</option>
                      <option value="full-transformation">Full Digital Transformation</option>
                      <option value="leads-crm">Leads Management & CRM</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Monthly budget</label>
                    <select name="budget" className="form-input form-select" value={form.budget} onChange={handleChange}>
                      <option value="">Select a range</option>
                      <option value="15k-25k">₹15K–₹25K / month</option>
                      <option value="25k-40k">₹25K–₹40K / month</option>
                      <option value="40k-60k">₹40K–₹60K / month</option>
                      <option value="60k-80k">₹60K–₹80K / month</option>
                      <option value="80k+">₹80K+ / month</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div className="form-field form-field--full">
                  <label className="form-label">What&apos;s your biggest business challenge right now? *</label>
                  <textarea
                    name="challenge"
                    className="form-input form-textarea"
                    placeholder="Tell us what you're working on, what's not working, and what success looks like for you..."
                    rows={5}
                    value={form.challenge}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn-site contact-submit">
                  Send message
                </button>
              </form>
          </div>

          {/* Info Sidebar */}
          <aside className="contact-info">
            <div className="contact-info__block">
              <h3 className="contact-info__label">Call / WhatsApp directly</h3>
              <p className="contact-info__text font-medium text-black mb-1">
                Pawan Nath (CEO & Co-Founder)
              </p>
              <a href="tel:+917728840116" className="contact-info__link block font-mono text-base font-semibold">
                +91 77288 40116
              </a>
              <a
                href="https://wa.me/917728840116"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-emerald-600 hover:underline inline-block mt-1"
              >
                💬 Chat on WhatsApp ↗
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__label">Email us directly</h3>
              <a href="mailto:hello@adbazaar.com" className="contact-info__link">
                hello@adbazaar.com
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__label">Office Address</h3>
              <p className="contact-info__text font-medium text-black leading-relaxed">
                Amba Mira Kunj Building,<br />
                Akhalia Circle, D-8,<br />
                Jodhpur, Rajasthan 342001
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Amba+Mira+kunj+building+Akhalia+circle+D-8+Jodhpur+Rajasthan+342001"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-blue-600 hover:underline inline-block mt-1.5"
              >
                📍 View on Google Maps ↗
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__label">Business hours</h3>
              <p className="contact-info__text font-semibold text-emerald-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Open 24 Hours
              </p>
              <p className="contact-info__text text-xs text-gray-500 mt-1">
                Always available for client growth & support.
              </p>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__label">Response time</h3>
              <p className="contact-info__text">Within 24 hours.<br />Usually much faster.</p>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq">
        <div className="page-container">
          <h2 className="section-label">Frequently asked questions</h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="faq-item">
                <h3 className="faq-q">{f.q}</h3>
                <p className="faq-a">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
