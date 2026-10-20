import React, { useState } from 'react';
import { circuitStages } from '../../data/circuitStages';
import { CircuitStage } from '../../types/pneumatic';
import { CircuitDetailDrawer } from '../modals/CircuitDetailDrawer';
import { useLightbox } from '../../context/LightboxContext';

export const CircuitSection: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<CircuitStage | null>(null);
  const { openLightbox } = useLightbox();

  return (
    <section id="system-components" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 hairline-b pb-6 sm:pb-8">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-2 font-semibold">
            SYSTEM COMPONENTS &amp; GENERATION
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#16324F] dark:text-white">
            HOW THE SYSTEM WORKS
          </h2>
        </div>
        <div className="mt-3 sm:mt-0 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          7 Essential Pneumatic Stages · Click to inspect technical parameters
        </div>
      </div>

      {/* 7 Components Grid - Proportional Cards with BrewedOps Micro-Interactions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {circuitStages.map((stage) => {
          const slideImgs = stage.images && stage.images.length > 0 ? stage.images : [stage.image];
          const slideCaps = stage.imageCaptions || [];

          return (
            <div
              key={stage.id}
              onClick={() => setSelectedStage(stage)}
              className="motion-card rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E2135] p-5 flex flex-col justify-between group cursor-pointer shadow-xs hover:border-[#16324F] dark:hover:border-sky-400"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedStage(stage);
              }}
            >
              <div>
                {/* Image Frame - Aspect-Ratio Controlled Proportional View */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(
                      slideImgs.map((src, i) => ({
                        src,
                        title: `${stage.name} — Photo 0${i + 1}`,
                        caption: slideCaps[i] || stage.description,
                      })),
                      0
                    );
                  }}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 mb-4 group/img cursor-zoom-in flex items-center justify-center"
                  title="Click to view full uncropped photos"
                >
                  <img
                    src={stage.image}
                    alt={stage.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  />
                  
                  {/* Stage Number Badge */}
                  <div className="absolute top-2 left-2 bg-[#16324F]/90 dark:bg-black/90 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold backdrop-blur-xs">
                    Stage 0{stage.stageNumber}
                  </div>

                  {/* Multi-photo indicator */}
                  {slideImgs.length > 1 && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-slate-950 text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-xs font-bold shadow-2xs">
                      {slideImgs.length} Photos
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#16324F]/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-black/80 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xs flex items-center gap-1.5 shadow-sm">
                      <span className="material-symbols-outlined text-sm">zoom_in</span>
                      <span>Zoom Photo</span>
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-sans font-bold text-base sm:text-lg text-[#16324F] dark:text-white block mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {stage.name}
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 block font-semibold mb-2">
                  {stage.subtitle}
                </span>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed line-clamp-3">
                  {stage.description}
                </p>
              </div>

              {/* Metric Footer */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 text-[10px] uppercase tracking-wider flex justify-between items-center text-slate-500 dark:text-slate-400 font-mono">
                <span className="truncate pr-2">{stage.metricLabel}:</span>
                <span className="text-[#16324F] dark:text-sky-300 font-bold shrink-0">{stage.metricValue}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Technical Modal */}
      <CircuitDetailDrawer
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
        onSelectStage={(stage) => setSelectedStage(stage)}
      />
    </section>
  );
};
