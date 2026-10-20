import React, { useEffect, useRef, useState } from 'react';

export const HeroSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const lines = [
    { text: 'CENTRALIZED COMPRESSED', isAccent: false },
    { text: 'AIR DISTRIBUTION', isAccent: false },
    { text: 'SYSTEM', isAccent: true }
  ];

  let globalCharIndex = 0;

  return (
    <section id="hero" className="relative pt-12 pb-14 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
      
      {/* 6. Background Breathing Radial Glow (Interactive.md Item 6) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center">
        {/* Outer Glow Circle: ~130% wide, 12% alpha accent, -3.5s delay */}
        <div
          aria-hidden="true"
          className="absolute w-[130%] max-w-[1100px] aspect-square rounded-full animate-breathing-glow-2 opacity-70 dark:opacity-20"
          style={{
            background: 'radial-gradient(closest-side, rgba(14, 165, 233, 0.14), transparent)'
          }}
        />
        {/* Inner Glow Circle: ~86% wide, 42% -> 14% alpha accent, normal cycle */}
        <div
          aria-hidden="true"
          className="absolute w-[86%] max-w-[750px] aspect-square rounded-full animate-breathing-glow-1 opacity-75 dark:opacity-25"
          style={{
            background: 'radial-gradient(closest-side, rgba(79, 163, 255, 0.38), rgba(79, 163, 255, 0.14) 55%, transparent)'
          }}
        />
      </div>

      {/* 1. Main Title with Character Split Entrance Reveal (Interactive.md Item 1) */}
      <h1
        ref={headingRef}
        aria-label="CENTRALIZED COMPRESSED AIR DISTRIBUTION SYSTEM"
        className="relative z-10 font-sans font-extrabold hero-fluid-headline uppercase max-w-5xl text-[#16324F] dark:text-white break-words px-2 w-full"
      >
        {lines.map((lineObj, lineIdx) => {
          return (
            <span
              key={lineIdx}
              className={`block overflow-hidden pb-1 sm:pb-1.5 ${lineObj.isAccent ? 'text-amber-500 dark:text-amber-400' : ''}`}
              aria-hidden="true"
            >
              {lineObj.text.split('').map((char, charIdx) => {
                const charNumber = globalCharIndex++;
                if (char === ' ') {
                  return (
                    <span key={charIdx} className="inline-block">
                      &nbsp;
                    </span>
                  );
                }
                return (
                  <span
                    key={charIdx}
                    data-char-span
                    className={`inline-block ${isRevealed ? 'char-rise' : 'translate-y-[118%]'}`}
                    style={{ '--i': charNumber } as React.CSSProperties}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </h1>

      {/* Institutional Byline */}
      <div className="relative z-10 mt-3 sm:mt-4 text-[11px] sm:text-xs md:text-sm uppercase tracking-widest text-[#F59E0B] font-semibold px-2">
        Mechanical &amp; Allied Department (MAAD) · TUP Taguig Campus
      </div>

      {/* Subtitle */}
      <p className="relative z-10 mt-3 sm:mt-5 text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl font-normal leading-relaxed px-2">
        A centralized pneumatic network delivering regulated compressed air across three machine shop laboratory areas. Explore equipment specifications, safety protocols, standard operating procedures, and 6 active workstation outlets.
      </p>

      {/* Quick Jump Action Pills (BrewedOps Inspired) */}
      <div className="relative z-10 mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full max-w-3xl px-2 sm:px-4">
        <a
          href="#system-overview"
          className="motion-press inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md bg-[#16324F] hover:bg-[#0E2135] text-white text-[11px] sm:text-xs uppercase tracking-wider font-semibold shadow-sm transition-all"
        >
          <span>System Overview &amp; Layout</span>
          <span className="text-amber-400">→</span>
        </a>
        <a
          href="#system-components"
          className="motion-press inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md bg-[#F1F5F9] dark:bg-[#162238] hover:bg-[#E2E8F0] dark:hover:bg-[#1E293B] text-[#16324F] dark:text-white border border-slate-300 dark:border-slate-700 text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all"
        >
          <span>How the System Works (7 Components)</span>
        </a>
        <a
          href="#safety-protocols"
          className="motion-press inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md bg-[#FEF3C7] dark:bg-amber-950/40 hover:bg-amber-200 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all"
        >
          <span>Safety Protocols (DO &amp; DON'T)</span>
        </a>
        <a
          href="#air-outlets"
          className="motion-press inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md bg-[#F1F5F9] dark:bg-[#162238] hover:bg-[#E2E8F0] dark:hover:bg-[#1E293B] text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all"
        >
          <span>6 Air Outlets (1/2" Drops)</span>
        </a>
      </div>
    </section>
  );
};
