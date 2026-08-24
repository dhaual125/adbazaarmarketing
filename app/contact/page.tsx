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
    a: "We offer flexible pricing — monthly retainers for marketing and managed IT, project-based fees for websites and software, and flat fees for account recovery. We'll provide a custom quote during your free consultation.",
  },
  {
    q: "Do you guarantee results?",
    a: "We can't guarantee specific outcomes, but we guarantee we'll work tirelessly to deliver results. Our track record speaks for itself — 95% client retention and hundreds of successful campaigns.",
  },
  {
    q: "What if my ad account recovery fails?",
    a: "Recovery depends on Meta's final decision. Our service fee covers our professional time and expertise in navigating the process. We'll always be honest about your chances before we begin.",
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

    // Send to AD BAZAAR number
    window.open(`https://wa.me/918849091228?text=${encodeURIComponent(msg)}`, "_blank");

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
            Fill out the form below, or reach out directly. We respond within 24 hours — usually much faster. For urgent account recovery issues, call us immediately.
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
                      <option value="account-recovery">Crisis & Account Recovery</option>
                      <option value="full-transformation">Full Digital Transformation</option>
                      <option value="leads-crm">Leads Management & CRM</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Monthly budget</label>
                    <select name="budget" className="form-input form-select" value={form.budget} onChange={handleChange}>
                      <option value="">Select a range</option>
                      <option value="1k-5k">₹1K–₹5K / month</option>
                      <option value="5k-10k">₹5K–₹10K / month</option>
                      <option value="10k-25k">₹10K–₹25K / month</option>
                      <option value="25k+">₹25K+ / month</option>
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

                <button type="submit" className="btn-site pixel-clip contact-submit">
                  Send message
                </button>
              </form>
          </div>

          {/* Info Sidebar */}
          <aside className="contact-info">
            <div className="contact-info__block">
              <h3 className="contact-info__label">Email us directly</h3>
              <a href="mailto:hello@adbazaar.com" className="contact-info__link">
                hello@adbazaar.com
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__label"> Urgent account recovery?</h3>
              <p className="contact-info__text">
                If your ad account is restricted or your Business Manager is disabled, don&apos;t wait — every hour means lost revenue.
              </p>
              <a href="mailto:recovery@adbazaar.com" className="contact-info__link">
                recovery@adbazaar.com
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__label">Business hours</h3>
              <p className="contact-info__text">
                Mon – Fri: 9:00 AM – 6:00 PM<br />
                Saturday: By appointment<br />
                Sunday: Emergency support only
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
