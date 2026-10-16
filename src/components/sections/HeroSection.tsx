import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-16 pb-12 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
      
      {/* Eyebrow - OPERATIONAL MANUAL */}
      <div className="mb-4 sm:mb-8">
        <span className="text-[10px] sm:text-[12px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-subtle-ash font-medium block max-w-md sm:max-w-none mx-auto border-b border-hairline-divider pb-1">
          OPERATIONAL MANUAL
        </span>
      </div>

      {/* Main Title - Updated to clean, bold, modern, industrial typeface */}
      <h1 className="font-sans font-extrabold text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[82px] leading-[1.08] tracking-[-0.02em] uppercase max-w-5xl text-charcoal-ink break-words">
        CENTRALIZED COMPRESSED AIR DISTRIBUTION SYSTEM
      </h1>

      {/* Subtitle */}
      <p className="mt-6 sm:mt-8 text-xs sm:text-sm md:text-base text-muted-charcoal max-w-2xl font-normal leading-relaxed tracking-normal px-2">
        Explore the system overview, safety guidelines, operational procedures, and video demonstrations of our centralized compressed air system.
      </p>

      {/* Video Call-to-Action */}
      <div className="mt-8 sm:mt-12 flex items-center justify-center w-full px-4">
        <a
          href="#video-demo"
          className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full border border-charcoal-ink text-charcoal-ink hover:bg-charcoal-ink hover:text-[#F7F5F0] transition-all duration-300 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium shadow-xs"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block animate-pulse shrink-0" />
          <span className="truncate">CONSULT COMPLETE SAFETY VIDEO (04:48 MIN)</span>
        </a>
      </div>

      {/* Architectural Hairline Crosshair */}
      <div className="w-full max-w-4xl mt-12 sm:mt-20 px-4">
        <div className="w-full h-px bg-hairline-divider" />
        <div className="py-6 sm:py-10 flex justify-center">
          <div className="w-px h-8 sm:h-12 bg-hairline-divider" />
        </div>
        <div className="w-full h-px bg-hairline-divider" />
      </div>
    </section>
  );
};
