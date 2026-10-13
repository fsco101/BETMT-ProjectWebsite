import React from 'react';
import { usePneumatics } from '../../context/PneumaticContext';

export const HeroSection: React.FC = () => {
  const { state } = usePneumatics();
  const openDropsCount = Object.values(state.stations).filter(s => s.isOpen).length;

  return (
    <section id="hero" className="relative pt-20 pb-16 sm:pt-32 sm:pb-28 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div className="mb-6 sm:mb-8">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-subtle-ash">
          Technological University of the Philippines — Taguig Campus
        </span>
      </div>

      <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.08] tracking-[0.02em] uppercase max-w-5xl text-charcoal-ink">
        CENTRALIZED COMPRESSED-AIR DISTRIBUTION SYSTEM
      </h1>

      <p className="mt-8 text-xs sm:text-sm md:text-base text-muted-charcoal max-w-2xl font-light leading-relaxed tracking-wide">
        Safety guide, workshop protocol, and pneumatic architecture for the Mechanical &amp; Allied Department. A certified network serving 6 machining stations.
      </p>

      {/* Live SCADA Telemetry Pill */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.18em]">
        <div className="px-3 py-1.5 border border-hairline-divider bg-[#FAF9F5] text-muted-charcoal flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${state.isEmergencyDepressurized ? 'bg-accent-crimson animate-ping' : 'bg-emerald-600'}`} />
          <span>Loop: <strong className="font-medium text-charcoal-ink">{state.mainHeaderPressure.toFixed(1)} Bar</strong></span>
        </div>
        <div className="px-3 py-1.5 border border-hairline-divider bg-[#FAF9F5] text-muted-charcoal">
          <span>Active Outlets: <strong className="font-medium text-charcoal-ink">{openDropsCount} / 6</strong></span>
        </div>
        <div className="px-3 py-1.5 border border-hairline-divider bg-[#FAF9F5] text-muted-charcoal">
          <span>Demand: <strong className="font-medium text-charcoal-ink">{state.totalScfm.toFixed(1)} SCFM</strong></span>
        </div>
        <div className="px-3 py-1.5 border border-hairline-divider bg-[#FAF9F5] text-muted-charcoal">
          <span>Dew Point: <strong className="font-medium text-charcoal-ink">+{state.dewPointCelsius}°C</strong></span>
        </div>
      </div>

      {/* Video Call-to-Action */}
      <div className="mt-10 sm:mt-12 flex items-center justify-center">
        <a
          href="#video-demo"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-charcoal-ink text-charcoal-ink hover:bg-charcoal-ink hover:text-[#F7F5F0] transition-all duration-300 text-[11px] uppercase tracking-[0.18em]"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-charcoal-ink inline-block animate-pulse" />
          <span>CONSULT COMPLETE SAFETY VIDEO (04:48 MIN)</span>
        </a>
      </div>

      {/* Architectural Hairline Crosshair */}
      <div className="w-full max-w-4xl mt-16 sm:mt-24">
        <div className="w-full h-px bg-hairline-divider" />
        <div className="py-10 sm:py-12 flex justify-center">
          <div className="w-px h-12 sm:h-16 bg-hairline-divider" />
        </div>
        <div className="w-full h-px bg-hairline-divider" />
      </div>
    </section>
  );
};
