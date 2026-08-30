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
      }, 900);
    } else {
      timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 600);
    }

    return () => clearTimeout(timer);
  }, [hasStarted, visibleCount]);

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
      className="relative z-2 py-6 sm:py-10 md:py-14 px-3.5 sm:px-6 md:px-10 bg-transparent"
      id="chat-experience"
    >
      {/* Expanded Wide Responsive Container */}
      <div className="w-full max-w-[760px] sm:max-w-[880px] lg:max-w-[960px] mx-auto">
        
        {/* Natural Flowing Chat Container — No Inner Scrollbar */}
        <div className="relative flex flex-col transition-all">
          
          {/* Header Bar */}
          <div className="shrink-0 flex items-center justify-between px-0 py-2 sm:py-2.5 border-0 z-10 mb-2">
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* AD Bazaar Brand Avatar */}
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/10 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                <Image
                  src="/chat-avatar-brand.jpg"
                  alt="AD BAZAAR Growth Strategist"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
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

          {/* MESSAGES AREA (Flows Naturally with Main Page Scroll — 0 Inner Scrollbar) */}
          <div className="py-2 space-y-2.5 sm:space-y-3">
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
                  {/* Photo Avatars */}
                  {isBrand ? (
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-xs">
                      <Image
                        src="/chat-avatar-brand.jpg"
                        alt="AD BAZAAR"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-xs">
                      <Image
                        src="/chat-avatar-client.jpg"
                        alt="Client"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Pure Text Message (No background box, no borders) */}
                  <div
                    className={`max-w-[80%] sm:max-w-[70%] md:max-w-[60%] py-0.5 transition-all ${
                      isBrand ? "text-right" : "text-left"
                    }`}
                  >
                    {/* Clean Message Text */}
                    <p className="text-[13px] sm:text-[14.5px] font-medium leading-relaxed m-0 text-[#0A0A0A]">
                      {msg.text}
                    </p>

                    {/* Timestamp */}
                    <div className={`text-[9px] sm:text-[10px] text-[#777777] font-sans mt-0.5 leading-none ${
                      isBrand ? "text-right" : "text-left"
                    }`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1 text-[10px] sm:text-[10.5px] font-mono text-gray-600 animate-pulse px-1.5 py-0.5">
                <span className="w-1 h-1 rounded-full bg-[#0A0A0A]" />
                <span className="w-1 h-1 rounded-full bg-[#0A0A0A]" />
                <span className="w-1 h-1 rounded-full bg-[#0A0A0A]" />
                <span className="ml-1 text-[9.5px] sm:text-[10px] text-gray-700 font-semibold">AD BAZAAR is typing...</span>
              </div>
            )}
          </div>

          {/* Bottom Chat Input Bar with Typewriter Animation */}
          <div className="shrink-0 pt-3 sm:pt-4 border-0 z-10">
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
