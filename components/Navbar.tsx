"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/services",  label: "Services",  color: "#7c3aed" },
  { href: "/work",      label: "Work",      color: "#f97316" },
  { href: "/recovery", label: "Recovery",  color: "#ef4444" },
  { href: "/about",    label: "About",     color: "#2563eb" },
  { href: "/contact",  label: "Contact",   color: "#16a34a" },
];

export const Navbar: React.FC = () => {
  const [scrolled,   setScrolled]   = useState(false);
  const [scrollPct,  setScrollPct]  = useState(0);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const pathname = usePathname();
  const navRef   = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const sy  = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setScrolled(sy > 40);
      setScrollPct(max > 0 ? (sy / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const activeColor =
    links.find((l) => l.href === pathname)?.color ?? "#0A0A0A";

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${menuOpen ? "navbar--open" : ""}`}
    >
      {/* Scroll progress bar */}
      <div
        className="navbar__progress"
        style={{ width: `${scrollPct}%`, background: activeColor }}
      />

      <div className="navbar__inner">
        {/* Logo */}
        <Link href="/" className="navbar__logo">
          <Image
            src="/ADBMlogo-transparent.png"
            alt="AD Bazaar Marketing"
            width={160}
            height={52}
            className="navbar__logo-img"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="navbar__links">
          {links.map(({ href, label, color }, i) => {
            const isActive  = pathname === href;
            const isHovered = hoveredIdx === i;
            return (
              <li key={href} style={{ "--link-color": color } as React.CSSProperties}>
                <Link
                  href={href}
                  className={`navbar__link ${isActive ? "navbar__link--active" : ""}`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* animated label */}
                  <span className="navbar__link-inner">
                    <span className="navbar__link-label">{label}</span>
                    <span
                      className="navbar__link-bar"
                      style={{
                        background: color,
                        transform: isActive || isHovered ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <Link href="/contact" className="navbar__cta">
          <span>Get in touch</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Burger */}
        <button
          className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="burger-line burger-line--top" />
          <span className="burger-line burger-line--mid" />
          <span className="burger-line burger-line--bot" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        <div className="navbar__mobile-links">
          {links.map(({ href, label, color }, i) => (
            <Link
              key={href}
              href={href}
              className={`navbar__mobile-link ${pathname === href ? "navbar__mobile-link--active" : ""}`}
              style={{ "--link-color": color, "--i": i } as React.CSSProperties}
            >
              <span className="mobile-link-num">0{i + 1}</span>
              <span className="mobile-link-label">{label}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mobile-link-arrow">
                <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </div>
        <Link href="/contact" className="navbar__mobile-cta pixel-clip" onClick={() => setMenuOpen(false)}>
          Get in touch →
        </Link>
      </div>
    </nav>
  );
};
