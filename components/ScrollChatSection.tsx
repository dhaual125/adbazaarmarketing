"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ChatMessage {
  id: number;
  sender: "brand" | "client";
  text: string;
  time: string;
  actionCTA?: boolean;
}

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "client",
    text: "Hii",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "brand",
    text: "Is Your Business Stuck in Neutral?",
    time: "10:30 AM",
  },
  {
    id: 3,
    sender: "client",
    text: "Yes",
    time: "10:30 AM",
  },
  {
    id: 4,
    sender: "brand",
    text: "We Fix It All.",
    time: "10:31 AM",
  },
  {
    id: 5,
    sender: "client",
    text: "How much you will grow our business",
    time: "10:31 AM",
  },
  {
    id: 6,
    sender: "brand",
    text: "Scale Your Revenue with the 3 Levels of Growth Marketing.",
    time: "10:31 AM",
  },
  {
    id: 7,
    sender: "client",
    text: "Cool lets connect !",
    time: "10:32 AM",
  },
  {
    id: 8,
    sender: "brand",
    text: "Great! Our team will connect with you shortly.",
    time: "10:32 AM",
    actionCTA: true,
  },
];

const typingPhrases = [
  "Type your message...",
  "How can we scale your revenue?",
  "Book a free strategy session...",
  "Scale Meta & Google Ads with 4x ROAS...",
  "Let's build your growth engine...",
];

export const ScrollChatSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Typewriter effect state for bottom input
  const [currentText, setCurrentText] = useState<string>("");
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Intersection Observer to start conversation when scrolled into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Automated Chat progression timer
  useEffect(() => {
    if (!hasStarted) return;
    if (visibleCount >= chatMessages.length) return;

    const isNextBrand = chatMessages[visibleCount]?.sender === "brand";

    let timer: NodeJS.Timeout;

    if (isNextBrand) {
      setIsTyping(true);
      timer = setTimeout(() => {
        setIsTyping(false);
        setVisibleCount((prev) => prev + 1);
      }, 950);
    } else {
      timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 650);
    }

    return () => clearTimeout(timer);
  }, [hasStarted, visibleCount]);

  // Auto-scroll to latest message inside the fixed chat box
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleCount, isTyping]);

  // Bottom Input Typewriter Effect Loop
  useEffect(() => {
    const targetPhrase = typingPhrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < targetPhrase.length) {
      timeout = setTimeout(() => {
        setCurrentText(targetPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 75);
    } else if (!isDeleting && charIndex === targetPhrase.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCurrentText(targetPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev + 1);
      }, 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative z-2 py-8 sm:py-14 md:py-16 px-3.5 sm:px-6 md:px-10 bg-transparent overflow-hidden"
      id="chat-experience"
    >
      {/* Expanded Wide Responsive Container */}
      <div className="w-full max-w-[760px] sm:max-w-[880px] lg:max-w-[960px] mx-auto">
        
        {/* Chat Interface Box matching Website BG Color with No Outer Border & No Shadow */}
        <div className="relative rounded-3xl sm:rounded-[32px] bg-[#e7e7e9] border-0 shadow-none overflow-hidden h-[400px] min-[420px]:h-[430px] sm:h-[460px] flex flex-col transition-all">
          
          {/* Header Bar matching exact website bg */}
          <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 bg-[#e7e7e9] border-0 z-10">
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* AD Bazaar Logo Avatar */}
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white p-0.5 border border-black/10 flex items-center justify-center shrink-0 overflow-hidden shadow-none">
                <Image
                  src="/favicon.png"
                  alt="AD BAZAAR Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="text-[12px] sm:text-[13px] font-bold text-[#0A0A0A] tracking-tight m-0 leading-tight">
                  AD BAZAAR
                </h3>
                <p className="text-[9px] sm:text-[10px] font-mono text-[#666666] m-0 leading-tight">
                  Growth Strategy Team
                </p>
              </div>
            </div>
          </div>

          {/* INNER SCROLLABLE MESSAGES AREA (Website Matching BG) */}
          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-3.5 sm:p-5 sm:py-6 space-y-2.5 sm:space-y-3 bg-[#e7e7e9] scroll-smooth"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0,0,0,0.12) transparent",
            }}
          >
            {chatMessages.map((msg, idx) => {
              const isVisible = idx < visibleCount;
              if (!isVisible) return null;

              const isBrand = msg.sender === "brand";

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 sm:gap-2.5 transition-all duration-300 ease-out ${
                    isBrand ? "flex-row-reverse" : "flex-row"
                  } animate-fade-in-up`}
                >
                  {/* Small Avatar */}
                  {isBrand ? (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-black/10 flex flex-col items-center justify-center shrink-0 p-0.5 shadow-none">
                      <span className="text-[8.5px] sm:text-[9.5px] font-black text-[#C69C28] leading-none tracking-tighter">AD</span>
                      <span className="text-[4.5px] sm:text-[5px] font-bold text-[#333333] leading-none tracking-widest uppercase">SYS</span>
                    </div>
                  ) : (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#888888] text-white flex items-center justify-center shrink-0 shadow-none">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}

                  {/* Small Compact Message Bubble */}
                  <div
                    className={`max-w-[78%] sm:max-w-[66%] md:max-w-[56%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-none transition-all ${
                      isBrand
                        ? "bg-[#FEF7D9] text-[#0A0A0A] rounded-tr-xs border border-[#F6E8B6]"
                        : "bg-white text-[#0A0A0A] rounded-tl-xs border border-black/5"
                    }`}
                  >
                    {/* Compact Message Text */}
                    <p className="text-[12px] sm:text-[13px] font-normal leading-relaxed m-0 text-[#0A0A0A]">
                      {msg.text}
                    </p>

                    {/* Timestamp */}
                    <div className="text-[8.5px] sm:text-[9.5px] text-[#777777] font-sans text-right mt-1 leading-none">
                      {msg.time}
                    </div>

                    {/* Action CTA for Final Message */}
                    {msg.actionCTA && (
                      <div className="mt-2 pt-1.5 border-t border-black/10 flex flex-wrap items-center gap-1.5">
                        <Link
                          href="/contact"
                          className="btn-site text-[9.5px] sm:text-[10.5px] py-1 px-3 flex items-center gap-1 shadow-none"
                        >
                          <span>Schedule Strategy Call</span>
                          <span>→</span>
                        </Link>
                        <a
                          href="https://wa.me/918949678859"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[9.5px] sm:text-[10.5px] font-mono font-semibold transition-colors shadow-none"
                        >
                          <span>WhatsApp</span>
                          <span>↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator inside inner scroll */}
            {isTyping && (
              <div className="flex items-center gap-1 text-[10px] sm:text-[10.5px] font-mono text-gray-600 animate-pulse px-1.5 py-0.5">
                <span className="w-1 h-1 rounded-full bg-[#0A0A0A]" />
                <span className="w-1 h-1 rounded-full bg-[#0A0A0A]" />
                <span className="w-1 h-1 rounded-full bg-[#0A0A0A]" />
                <span className="ml-1 text-[9.5px] sm:text-[10px] text-gray-700 font-semibold">AD BAZAAR is typing...</span>
              </div>
            )}
          </div>

          {/* Bottom Chat Input Bar Matching Exact Website BG */}
          <div className="shrink-0 p-2.5 sm:p-3.5 bg-[#e7e7e9] border-0 z-10">
            <Link
              href="/contact"
              className="flex items-center justify-between gap-2 px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-full bg-white border border-black/10 shadow-none group hover:border-black/25 transition-all"
            >
              <div className="flex items-center gap-1 overflow-hidden min-w-0">
                <span className="text-[11.5px] sm:text-[13px] text-gray-800 font-sans truncate select-none">
                  {currentText}
                </span>
                <span className="w-0.5 h-3 sm:h-3.5 bg-[#0A0A0A] animate-pulse shrink-0" />
              </div>

              {/* Send Button */}
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-none">
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="m2.01 21 20.99-9L2.01 3 2 10l15 2-15 2z" />
                </svg>
              </div>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
