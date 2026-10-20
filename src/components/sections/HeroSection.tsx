import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-12 pb-14 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
      

      {/* Main Title - Clean, bold, industrial typeface */}
      <h1 className="font-sans font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight uppercase max-w-5xl text-[#16324F] dark:text-white break-words">
        CENTRALIZED COMPRESSED AIR DISTRIBUTION SYSTEM
      </h1>

      {/* Institutional Byline */}
      <div className="mt-3 text-xs sm:text-sm uppercase tracking-widest text-[#F59E0B] font-semibold">
        Mechanical &amp; Allied Department (MAAD) · TUP Taguig Campus
      </div>

      {/* Subtitle */}
      <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl font-normal leading-relaxed px-2">
        A centralized pneumatic network delivering regulated compressed air across three machine shop laboratory areas. Explore equipment specifications, safety protocols, standard operating procedures, and 6 active workstation outlets.
      </p>

      {/* Quick Jump Action Pills (BrewedOps Inspired) */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full max-w-3xl px-4">
        <a
          href="#system-overview"
          className="motion-press inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-md bg-[#16324F] hover:bg-[#0E2135] text-white text-xs uppercase tracking-wider font-semibold shadow-sm transition-all"
        >
          <span>System Overview &amp; Layout</span>
          <span className="text-amber-400">→</span>
        </a>
        <a
          href="#system-components"
          className="motion-press inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-md bg-[#F1F5F9] dark:bg-[#162238] hover:bg-[#E2E8F0] dark:hover:bg-[#1E293B] text-[#16324F] dark:text-white border border-slate-300 dark:border-slate-700 text-xs uppercase tracking-wider font-semibold transition-all"
        >
          <span>How the System Works (7 Components)</span>
        </a>
        <a
          href="#safety-protocols"
          className="motion-press inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-md bg-[#FEF3C7] dark:bg-amber-950/40 hover:bg-amber-200 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 text-xs uppercase tracking-wider font-semibold transition-all"
        >
          <span>Safety Protocols (DO &amp; DON'T)</span>
        </a>
        <a
          href="#air-outlets"
          className="motion-press inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-md bg-[#F1F5F9] dark:bg-[#162238] hover:bg-[#E2E8F0] dark:hover:bg-[#1E293B] text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs uppercase tracking-wider font-semibold transition-all"
        >
          <span>6 Air Outlets (1/2" Drops)</span>
        </a>
      </div>
    </section>
  );
};
