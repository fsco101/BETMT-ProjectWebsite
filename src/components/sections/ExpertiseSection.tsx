import React from 'react';
import { useLightbox } from '../../context/LightboxContext';

export const ExpertiseSection: React.FC = () => {
  const { openLightbox } = useLightbox();

  return (
    <section id="system-overview" className="py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="mb-10 sm:mb-14">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-subtle-ash dark:text-[#8E8B85] block mb-2 font-medium">
          Mechanical And Allied Department
        </span>
        <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-tight text-charcoal-ink dark:text-[#F4F4F6]">
          SYSTEM OVERVIEW
        </h2>
        <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-muted-charcoal dark:text-[#A1A1AA] max-w-3xl font-light leading-relaxed">
          An overview of the centralized compressed air distribution system, highlighting its major components, functions, and operating principles. It explains how compressed air is generated, treated, stored, and distributed through the piping network to six machining stations for efficient metal chip removal and other improved workshop operations.
        </p>
      </div>

      <div className="hairline-all bg-[#FAF9F5] dark:bg-[#1E1E22] p-3 sm:p-6 shadow-xs transition-colors duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Main Visual: image49.jpg */}
          <div
            onClick={() =>
              openLightbox(
                '/images/image49.jpg',
                0,
                'Primary Central Pneumatic Facility',
                'Group 1 - Batch 2023-2027 Mechanical and Allied Department: Compressor, air receiver tank, refrigerated dryer, and distribution line components.'
              )
            }
            className="lg:col-span-8 relative overflow-hidden bg-[#ECE8DF] dark:bg-[#2A2930] aspect-[4/3] sm:aspect-[16/10] hairline-all cursor-zoom-in group"
            title="Click to view full image"
          >
            <img
              src="/images/image49.jpg"
              alt="Centralized Compressed Air Distribution System Components by Group 1 - Batch 2023-2027"
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-charcoal-ink/85 dark:bg-black/85 text-[#F7F5F0] text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-medium">
              Primary Central Facility
            </div>
            <div className="absolute bottom-3 right-3 bg-black/75 hover:bg-black text-white text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 py-1 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span>Click to View Full Image</span>
            </div>
          </div>

          {/* Sidebar Metadata */}
          <div className="lg:col-span-4 flex flex-col justify-between py-2 sm:py-4 px-2 sm:px-4">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-charcoal-ink dark:text-[#F4F4F6] font-bold block mb-2 sm:mb-3">
                SYSTEM COMPONENTS
              </span>
              <p className="text-xs sm:text-sm text-muted-charcoal dark:text-[#A1A1AA] leading-relaxed font-normal">
                The system consists of an air compressor, air filter, refrigerant air dryer, and air receiver tank. Each component serves a specific function in generating, treating, and storing compressed air before it is distributed through the piping network to support efficient and reliable operation across the machining stations.
              </p>
            </div>

            <div className="mt-8 pt-6 hairline-t flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em]">
              <span className="text-subtle-ash dark:text-[#8E8B85] font-medium">Central Supply</span>
              <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Operational</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
