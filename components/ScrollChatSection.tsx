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

  // Progressive sequential reveal of chat messages
  useEffect(() => {
    if (!hasStarted) return;

    if (visibleCount < chatMessages.length) {
      setIsTyping(true);
      const typingDelay = visibleCount === 0 ? 300 : 600;
      const timer = setTimeout(() => {
        setIsTyping(false);
        setVisibleCount((prev) => prev + 1);
      }, typingDelay);

      return () => clearTimeout(timer);
    }
  }, [hasStarted, visibleCount]);

  // Smooth auto-scroll inside fixed chatbox as new messages appear
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleCount, isTyping]);

  // Typewriter effect logic for bottom input placeholder
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
        setCharIndex((prev) => prev - 1);
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
      className="relative z-2 py-8 sm:py-12 md:py-16 px-3.5 sm:px-6 bg-transparent overflow-hidden"
      id="chat-experience"
    >
      {/* Responsive Compact Container */}
      <div className="w-full max-w-[560px] sm:max-w-[620px] mx-auto">
        
        {/* Big Bold "Hii" Header */}
        <div className="text-center mb-5 sm:mb-8">
          <h2 className="text-[clamp(40px,7.5vw,78px)] font-black tracking-[-0.04em] text-[#0A0A0A] leading-none select-none m-0">
            Hii<span className="text-[#F6EE74]">.</span>
          </h2>
        </div>

        {/* Chat Interface Box with Responsive Fixed Height */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#FAF9F5] border border-black/10 overflow-hidden h-[390px] min-[420px]:h-[420px] sm:h-[450px] flex flex-col transition-all">
          
          {/* Header Bar */}
          <div className="shrink-0 flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 bg-[#F2F1EB] border-b border-black/10 z-10">
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* AD Bazaar Logo Avatar */}
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white p-1 border border-black/10 flex items-center justify-center shrink-0 overflow-hidden">
                <Image
                  src="/favicon.png"
                  alt="AD BAZAAR Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="text-[12.5px] sm:text-[13.5px] font-bold text-[#0A0A0A] tracking-tight m-0 leading-tight">
                  AD BAZAAR
                </h3>
                <p className="text-[9.5px] sm:text-[10.5px] font-mono text-[#666666] m-0 leading-tight">
                  Growth Strategy Team
                </p>
              </div>
            </div>
          </div>

          {/* INNER SCROLLABLE MESSAGES AREA */}
          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-3 sm:p-5 sm:py-6 space-y-3.5 sm:space-y-4 bg-[#FAF9F5] scroll-smooth"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0,0,0,0.15) transparent",
            }}
          >
            {chatMessages.map((msg, idx) => {
              const isVisible = idx < visibleCount;
              if (!isVisible) return null;

              const isBrand = msg.sender === "brand";

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 sm:gap-3 transition-all duration-300 ease-out ${
                    isBrand ? "flex-row-reverse" : "flex-row"
                  } animate-fade-in-up`}
                >
                  {/* Avatar Matching Reference Image */}
                  {isBrand ? (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white border border-black/10 flex flex-col items-center justify-center shrink-0 p-0.5 shadow-xs">
                      <span className="text-[10px] sm:text-[11px] font-black text-[#C69C28] leading-none tracking-tighter">AD</span>
                      <span className="text-[5.5px] sm:text-[6px] font-bold text-[#333333] leading-none tracking-widest uppercase">SYSTEMS</span>
                    </div>
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-[#9E9E9E] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[84%] sm:max-w-[78%] md:max-w-[72%] rounded-2xl p-3 sm:p-4 shadow-xs ${
                      isBrand
                        ? "bg-[#FEF7D9] text-[#0A0A0A] rounded-tr-xs border border-[#F6E8B6]"
                        : "bg-white text-[#0A0A0A] rounded-tl-xs border border-black/5"
                    }`}
                  >
                    {/* Main Message Text */}
                    <p className="text-[13px] sm:text-[14.5px] font-medium leading-snug m-0 text-[#0A0A0A]">
                      {msg.text}
                    </p>

                    {/* Timestamp aligned to bottom right */}
                    <div className="text-[9.5px] sm:text-[10px] text-[#888888] font-sans text-right mt-1.5 leading-none">
                      {msg.time}
                    </div>

                    {/* Action CTA for Final Message */}
                    {msg.actionCTA && (
                      <div className="mt-2.5 pt-2 border-t border-black/10 flex flex-wrap items-center gap-1.5">
                        <Link
                          href="/contact"
                          className="btn-site text-[10px] sm:text-[10.5px] py-1.5 px-3 flex items-center gap-1 shadow-xs"
                        >
                          <span>Schedule Strategy Call</span>
                          <span>→</span>
                        </Link>
                        <a
                          href="https://wa.me/918949678859"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] sm:text-[10.5px] font-mono font-semibold transition-colors shadow-xs"
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
              <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono text-gray-500 animate-pulse px-1.5 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                <span className="ml-1 text-[10px] sm:text-[10.5px] text-gray-600 font-semibold">AD BAZAAR is typing...</span>
              </div>
            )}
          </div>

          {/* Bottom Chat Input Bar with Live Typewriter Animation */}
          <div className="shrink-0 p-2.5 sm:p-4 bg-[#F2F1EB] border-t border-black/10 z-10">
            <Link
              href="/contact"
              className="flex items-center justify-between gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white border border-black/10 shadow-xs group hover:border-black/30 transition-colors"
            >
              <div className="flex items-center gap-1 overflow-hidden min-w-0">
                <span className="text-[12px] sm:text-[13.5px] text-gray-700 font-sans truncate select-none">
                  {currentText}
                </span>
                <span className="w-0.5 h-3.5 sm:h-4 bg-[#0A0A0A] animate-pulse shrink-0" />
              </div>

              {/* Send Button */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transform translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
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
