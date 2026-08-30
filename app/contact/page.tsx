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
    a: "We can't guarantee specific outcomes, but we guarantee we'll work tirelessly to deliver results. Our track record speaks for itself — 98% client retention and hundreds of successful campaigns.",
  },
  {
    q: "How do you track campaign performance?",
    a: "We set up comprehensive tracking using Meta Pixel, Google Analytics 4, and server-side tracking so you get transparent weekly reports on CAC, ROAS, and qualified leads.",
  },
  {
    q: "Can you help if I'm not in India or the US?",
    a: "Absolutely. We work with clients globally and have experience navigating different regional policies and cross-border marketing requirements.",
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

    // Send to AD BAZAAR WhatsApp number
    window.open(`https://wa.me/918949678859?text=${encodeURIComponent(msg)}`, "_blank");

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
            Let&apos;s Build Something<br />
            <span className="text-grad">Extraordinary.</span>
          </h1>
          <p className="page-lead">
            Ready to scale your brand? Tell us about your goals and we&apos;ll schedule a free strategy call within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section">
        <div className="page-container contact-grid">
          {/* Form */}
          <div className="contact-form-wrap">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="form-input"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Business Name *</label>
                  <input
                    type="text"
                    name="business"
                    required
                    value={form.business}
                    onChange={handleChange}
                    placeholder="Your business name"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hello@yourbusiness.com"
                    className="form-input"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 89496 78859"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Service Interested In</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    <option value="">Select a service...</option>
                    <option value="growth-marketing">Growth Marketing (Ads, Social, Influencer)</option>
                    <option value="software-ai">IT & Consulting (Website, App, Software)</option>
                    <option value="creative-production">Creative Production & Video</option>
                    <option value="leads-pipeline">Leads & CRM Pipeline Setup</option>
                    <option value="full-transformation">Full Digital Transformation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">Monthly Budget</label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    <option value="">Select your budget range...</option>
                    <option value="15k-25k">₹15K – ₹25K / month</option>
                    <option value="25k-40k">₹25K – ₹40K / month</option>
                    <option value="40k-60k">₹40K – ₹60K / month</option>
                    <option value="60k-80k">₹60K – ₹80K / month</option>
                    <option value="80k-plus">₹80K+ / month</option>
                    <option value="custom">Custom / Enterprise Project</option>
                    <option value="undecided">Not sure yet</option>
                  </select>
                </div>
              </div>

              <div className="form-field form-field--full">
                <label className="form-label">What&apos;s your biggest business challenge right now? *</label>
                <textarea
                  name="challenge"
                  required
                  rows={4}
                  value={form.challenge}
                  onChange={handleChange}
                  placeholder="What are your current growth bottlenecks? What are your revenue/lead goals for the next 3-6 months?"
                  className="form-input form-textarea"
                />
              </div>

              <div className="form-field form-field--full">
                <label className="form-label">How did you hear about us?</label>
                <select
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  className="form-input form-select"
                >
                  <option value="">Select an option...</option>
                  <option value="instagram">Instagram</option>
                  <option value="referral">Client Referral / Word of Mouth</option>
                  <option value="google">Google Search</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="other">Other</option>
                </select>
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
              <a href="tel:+918949678859" className="contact-info__link block font-mono text-base font-semibold">
                +91 89496 78859
              </a>
              <a
                href="https://wa.me/918949678859"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-emerald-600 hover:underline inline-block mt-1"
              >
                Chat on WhatsApp ↗
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__label">Email us directly</h3>
              <a href="mailto:adbazaar9@gmail.com" className="contact-info__link">
                adbazaar9@gmail.com
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__label">Office Address</h3>
              <a href="https://www.google.com/maps/search/?api=1&query=Amba+Mira+Kunj+Building+Akhalia+Circle+D-8+Jodhpur+Rajasthan+342001" target="_blank" rel="noopener noreferrer" className="contact-info__text font-medium text-black leading-relaxed underline underline-offset-2 hover:text-blue-600 transition-colors">
                Amba Mira Kunj Building,<br />
                Akhalia Circle, D-8,<br />
                Jodhpur, Rajasthan 342001
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Amba+Mira+kunj+building+Akhalia+circle+D-8+Jodhpur+Rajasthan+342001"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-blue-600 hover:underline inline-block mt-1.5"
              >
                View on Google Maps ↗
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__label">Business hours</h3>
              <p className="contact-info__text font-bold text-[#0A0A0A]">10 AM – 7 PM</p>
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
