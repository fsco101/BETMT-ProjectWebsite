import React, { useState } from 'react';
import { circuitStages } from '../../data/circuitStages';
import { CircuitStage } from '../../types/pneumatic';
import { CircuitDetailDrawer } from '../modals/CircuitDetailDrawer';
import { useLightbox } from '../../context/LightboxContext';

export const CircuitSection: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<CircuitStage | null>(null);
  const { openLightbox } = useLightbox();

  return (
    <section id="system-components" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 hairline-b pb-6 sm:pb-8">
        <div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-subtle-ash dark:text-[#8E8B85] block mb-2 font-medium">
            SYSTEM COMPONENTS
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-charcoal-ink dark:text-[#F4F4F6]">
            HOW THE SYSTEM WORKS
          </h2>
        </div>
        <div className="mt-3 sm:mt-0 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-subtle-ash dark:text-[#8E8B85]">
          Click any component to inspect detailed specifications
        </div>
      </div>

      {/* 7 Components Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-hairline-divider dark:border-[#2B2A2F]">
        {circuitStages.map((stage) => (
          <div
            key={stage.id}
            onClick={() => setSelectedStage(stage)}
            className="border-r border-b border-hairline-divider dark:border-[#2B2A2F] p-5 sm:p-6 lg:p-7 flex flex-col justify-between hover:bg-[#FAF9F5] dark:hover:bg-[#1E1E22] transition-all group cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedStage(stage);
            }}
          >
            <div>
              {/* Image Frame */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  const slideImgs = stage.images && stage.images.length > 0 ? stage.images : [stage.image];
                  const slideCaps = stage.imageCaptions || [];
                  openLightbox(
                    slideImgs.map((src, i) => ({
                      src,
                      title: `${stage.name} — Photo 0${i + 1}`,
                      caption: slideCaps[i] || stage.description,
                    })),
                    0
                  );
                }}
                className="relative aspect-[4/3] w-full overflow-hidden hairline-all bg-[#ECE8DF] dark:bg-[#2A2930] mb-4 sm:mb-5 group/img cursor-zoom-in"
                title="Click to view full uncropped photos"
              >
                <img
                  src={stage.image}
                  alt={stage.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                />
                <div className="absolute top-2 left-2 bg-charcoal-ink/80 dark:bg-black/80 text-[#FAF9F5] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5">
                  Stage 0{stage.stageNumber}
                </div>
                {stage.images && stage.images.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black/60 text-[#FAF9F5] text-[8px] uppercase tracking-wider px-1.5 py-0.5">
                    {stage.images.length} Photos
                  </div>
                )}
                <div className="absolute inset-0 bg-charcoal-ink/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover/img:opacity-100 bg-black/80 text-white text-[9px] uppercase tracking-wider px-2.5 py-1 transition-opacity border border-white/20 shadow-xs flex items-center gap-1">
                    <span>🔍</span>
                    <span>View Full Photo</span>
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <span className="font-editorial text-base sm:text-lg lg:text-xl text-charcoal-ink dark:text-[#F4F4F6] block mb-1">
                {stage.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-subtle-ash dark:text-[#8E8B85] block mb-2 sm:mb-3">
                {stage.subtitle}
              </span>
              <p className="text-xs text-muted-charcoal dark:text-[#A1A1AA] font-light leading-relaxed">
                {stage.description}
              </p>
            </div>

            {/* Metric Footer */}
            <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 hairline-t text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-subtle-ash dark:text-[#8E8B85] flex justify-between items-center">
              <span>{stage.metricLabel}</span>
              <span className="text-charcoal-ink dark:text-[#F4F4F6] font-medium">{stage.metricValue}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Centered Technical Specification Modal */}
      <CircuitDetailDrawer
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
        onSelectStage={(stage) => setSelectedStage(stage)}
      />
    </section>
  );
};
