"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ChatMessage {
  id: number;
  sender: "brand" | "client";
  text: string;
}

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "client",
    text: "Hii",
  },
  {
    id: 2,
    sender: "brand",
    text: "Is Your Business Stuck in Neutral?",
  },
  {
    id: 3,
    sender: "client",
    text: "Yes",
  },
  {
    id: 4,
    sender: "brand",
    text: "We Fix It All.",
  },
  {
    id: 5,
    sender: "client",
    text: "How much you will grow our business",
  },
  {
    id: 6,
    sender: "brand",
    text: "Scale Your Revenue with the 3 Levels of Growth Marketing.",
  },
  {
    id: 7,
    sender: "client",
    text: "Cool lets connect !",
  },
];

const typingPhrases = [
  "@adbazaarmarketing",
  "Scale your revenue with 4x ROAS...",
  "Let's build your growth engine...",
  "Book a free strategy session...",
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

  const isAllDone = visibleCount >= chatMessages.length && !isTyping;

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

  // Video-matched Chat progression timing (Smooth, fluid & rhythmic)
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
      }, 550); // Fluid brand typing pace
    } else {
      timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 420); // Natural response pace
    }

    return () => clearTimeout(timer);
  }, [hasStarted, visibleCount]);

  // Bottom Input Typewriter Effect Loop (Starts once all messages appear)
  useEffect(() => {
    if (!isAllDone) return;

    const targetPhrase = typingPhrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < targetPhrase.length) {
      timeout = setTimeout(() => {
        setCurrentText(targetPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 45);
    } else if (!isDeleting && charIndex === targetPhrase.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1600);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCurrentText(targetPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev + 1);
      }, 22);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, isAllDone]);

  return (
    <section
      ref={sectionRef}
      className="relative z-2 py-8 sm:py-14 md:py-20 px-4 sm:px-8 md:px-12 bg-transparent"
      id="chat-experience"
    >
      {/* Video-Matched Responsive Container */}
      <div className="w-full max-w-[620px] sm:max-w-[700px] md:max-w-[760px] mx-auto">
        
        {/* Chat Stream with Video-Matched Natural Flow */}
        <div className="relative flex flex-col space-y-6 sm:space-y-8 md:space-y-10 transition-all">
          
          {/* Header Bar */}
          <div className="shrink-0 flex items-center justify-between px-0 pb-2 border-0 z-10">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* AD Bazaar Official Logo Avatar */}
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-black/10 flex items-center justify-center p-1.5 shadow-xs shrink-0 overflow-hidden">
                <Image
                  src="/favicon.png"
                  alt="AD BAZAAR Logo"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-[13px] sm:text-[14px] font-bold text-[#0A0A0A] tracking-tight m-0 leading-tight">
                  AD BAZAAR
                </h3>
                <p className="text-[9.5px] sm:text-[10.5px] font-mono text-[#666666] m-0 leading-tight">
                  Growth Strategy Team
                </p>
              </div>
            </div>
          </div>

          {/* MESSAGES AREA — Exact Video-Style Layout & Animation */}
          <div className="space-y-6 sm:space-y-8 md:space-y-9">
            {chatMessages.map((msg, idx) => {
              const isVisible = idx < visibleCount;
              if (!isVisible) return null;

              const isBrand = msg.sender === "brand";

              return (
                <div
                  key={msg.id}
                  className="w-full flex flex-col"
                >
                  {/* Message Row with Avatar and Clean Text */}
                  <div
                    className={`flex items-center gap-3 sm:gap-4 max-w-[85%] sm:max-w-[78%] ${
                      isBrand
                        ? "self-end flex-row-reverse animate-dm-right"
                        : "self-start flex-row animate-dm-left"
                    }`}
                  >
                    {/* Avatars */}
                    {isBrand ? (
                      /* Brand Avatar with Official AD Logo */
                      <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white border border-black/10 flex items-center justify-center p-1.5 shadow-xs shrink-0 overflow-hidden animate-dm-avatar">
                        <Image
                          src="/favicon.png"
                          alt="AD BAZAAR"
                          width={28}
                          height={28}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      /* Client Avatar */
                      <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-xs animate-dm-avatar">
                        <Image
                          src="/chat-avatar-client.jpg"
                          alt="Client"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Pure Clean Text Message (Video typography style) */}
                    <div className={isBrand ? "text-right" : "text-left"}>
                      <p className="text-[13.5px] sm:text-[15px] md:text-[16px] font-normal leading-[1.4] text-[#1a1a1a] m-0">
                        {msg.text}
                      </p>
                    </div>
                  </div>

                  {/* Video-Style "Seen" Indicator — Perfectly Aligned to Opposite Edge */}
                  <div
                    className={`w-full pt-1.5 text-[10.5px] sm:text-[11.5px] text-[#888888] font-sans tracking-wide animate-dm-seen ${
                      isBrand ? "text-left pl-1 sm:pl-2" : "text-right pr-1 sm:pr-2"
                    }`}
                  >
                    Seen
                  </div>
                </div>
              );
            })}

            {/* Fast Video-Style Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-[10.5px] font-mono text-gray-600 animate-pulse px-2 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                <span className="ml-1 text-[10px] text-gray-700 font-semibold">typing...</span>
              </div>
            )}
          </div>

          {/* Bottom Chat Input Bar — Video-Matched Icons (+ / 📷 / input / 😊) */}
          {isAllDone && (
            <div className="shrink-0 pt-4 sm:pt-6 border-0 z-10 animate-fade-in-up">
              <Link
                href="/contact"
                className="flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-xs group hover:border-black/25 transition-all"
              >
                {/* Left Icons (+ and Camera) matching video */}
                <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 text-gray-700">
                  {/* Plus Icon */}
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>

                  {/* Camera Icon */}
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>

                {/* Center Input Placeholder with Typewriter */}
                <div className="flex items-center gap-1 overflow-hidden min-w-0 flex-1 px-1">
                  <span className="text-[12.5px] sm:text-[14px] text-gray-700 font-sans truncate select-none">
                    {currentText}
                  </span>
                  <span className="w-0.5 h-3 sm:h-3.5 bg-[#0A0A0A] animate-pulse shrink-0" />
                </div>

                {/* Right Smiley Emoji Icon matching video */}
                <div className="flex items-center gap-1.5 shrink-0 text-gray-700">
                  <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
                    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
                  </svg>
                </div>
              </Link>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
