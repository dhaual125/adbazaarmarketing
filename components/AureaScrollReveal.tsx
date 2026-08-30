"use client";

import React, { useEffect } from "react";

export const AureaScrollReveal: React.FC = () => {
  useEffect(() => {
    // Aurea-style lightweight IntersectionObserver for text & section reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    // Target elements to smoothly reveal on scroll
    const targets = document.querySelectorAll(
      ".aurea-reveal, .aurea-mask-text, section h2, section p, .pillar-card, .studio-card, .feed-card"
    );

    targets.forEach((target) => {
      // Don't hide hero elements initially
      if (!target.closest("header") && !target.closest("#hero") && !target.classList.contains("no-scroll-hide")) {
        target.classList.add("aurea-reveal");
      }
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return null;
};
