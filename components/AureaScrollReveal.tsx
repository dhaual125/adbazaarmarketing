"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export const AureaScrollReveal: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Number count-up helper with easing
    const animateValue = (
      el: HTMLElement,
      start: number,
      end: number,
      duration: number,
      prefix = "",
      suffix = ""
    ) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(start + (end - start) * ease);
        el.textContent = `${prefix}${current}${suffix}`;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = `${prefix}${end}${suffix}`;
        }
      };
      window.requestAnimationFrame(step);
    };

    // High-performance AUREA-Style IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("in-view");

            // Number Counter Trigger if dataset has count value
            if (target.hasAttribute("data-count-to")) {
              const endVal = parseFloat(target.getAttribute("data-count-to") || "0");
              const prefix = target.getAttribute("data-prefix") || "";
              const suffix = target.getAttribute("data-suffix") || "";
              animateValue(target, 0, endVal, 1400, prefix, suffix);
            }

            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const initAureaAnimations = () => {
      // 1. Headings — Signature Aurea deep slide-up reveal
      const headings = document.querySelectorAll(
        "section:not(#hero) h1, section:not(#hero) h2, section:not(#hero) h3, section:not(#hero) h4"
      );

      headings.forEach((heading) => {
        if (
          heading.closest("#hero") ||
          heading.closest(".no-aurea") ||
          heading.classList.contains("aurea-processed")
        ) {
          return;
        }

        heading.classList.add("aurea-processed", "aurea-reveal-heading");
        observer.observe(heading);
      });

      // 2. Number Badges & Metrics (01, 02, 03, 04, stats)
      const numberElements = document.querySelectorAll(
        ".dn, [data-number], .stat-number, .number-badge, .step .dn"
      );

      numberElements.forEach((numEl, idx) => {
        if (numEl.classList.contains("aurea-processed")) return;
        numEl.classList.add("aurea-processed", "aurea-number", `aurea-delay-${Math.min(idx + 1, 5)}`);
        observer.observe(numEl);
      });

      // 3. Paragraphs, Subtitles, Cards, Buttons & Elements
      const elements = document.querySelectorAll(
        "section:not(#hero) p, .pillar-card, .studio-card, .feed-card, .bento-card, .service-card, .stat-item, .testimonial-card, .accordion-item, .btn-site, .btn-site-outline"
      );

      elements.forEach((el) => {
        if (
          el.closest("#hero") ||
          el.closest(".no-aurea") ||
          el.classList.contains("aurea-processed")
        ) {
          return;
        }

        el.classList.add("aurea-processed", "aurea-reveal");

        // Stagger sibling items dynamically
        const parent = el.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(
            (c) => c.tagName === el.tagName || c.classList.contains("aurea-reveal")
          );
          const idx = siblings.indexOf(el);
          if (idx > 0 && idx <= 5) {
            el.classList.add(`aurea-delay-${idx}`);
          }
        }

        observer.observe(el);
      });
    };

    const timer = setTimeout(initAureaAnimations, 60);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
};
