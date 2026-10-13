import React, { useState } from 'react';
import { circuitStages } from '../../data/circuitStages';
import { CircuitStage } from '../../types/pneumatic';
import { CircuitDetailDrawer } from '../modals/CircuitDetailDrawer';

export const CircuitSection: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<CircuitStage | null>(null);

  return (
    <section id="pipeline" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 hairline-b pb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-subtle-ash block mb-2">
            Fluid Engineering &amp; Filtration Hierarchy
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl uppercase tracking-[0.03em] text-charcoal-ink">
            THE 8-STAGE AIR DISTRIBUTION CIRCUIT
          </h2>
        </div>
        <div className="mt-4 sm:mt-0 text-[11px] uppercase tracking-[0.18em] text-muted-charcoal">
          Main Ring Loop · ISO 8573 Purity Standards
        </div>
      </div>

      {/* 8 Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 hairline-t hairline-l border-[#DCD7CD]">
        {circuitStages.map((stage) => (
          <div
            key={stage.id}
            onClick={() => setSelectedStage(stage)}
            className="hairline-r hairline-b p-6 sm:p-7 flex flex-col justify-between hover:bg-[#FAF9F5] transition-all group cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedStage(stage);
            }}
          >
            <div>
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden hairline-all bg-[#ECE8DF] mb-5">
                <img
                  src={stage.image}
                  alt={stage.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-charcoal-ink/80 text-[#FAF9F5] text-[9px] uppercase tracking-[0.2em] px-2 py-0.5">
                  Stage 0{stage.stageNumber}
                </div>
                <div className="absolute inset-0 bg-charcoal-ink/0 group-hover:bg-charcoal-ink/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-[#FAF9F5] text-charcoal-ink text-[10px] uppercase tracking-wider px-3 py-1 transition-opacity border border-charcoal-ink shadow-sm">
                    View Specs
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <span className="font-editorial text-xl sm:text-2xl text-charcoal-ink block mb-1">
                {stage.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-subtle-ash block mb-3">
                {stage.subtitle}
              </span>
              <p className="text-xs text-muted-charcoal font-light leading-relaxed">
                {stage.description}
              </p>
            </div>

            {/* Metric Footer */}
            <div className="mt-6 pt-4 hairline-t text-[10px] uppercase tracking-[0.16em] text-subtle-ash flex justify-between items-center">
              <span>{stage.metricLabel}</span>
              <span className="text-charcoal-ink font-medium">{stage.metricValue}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-out Technical Drawer */}
      <CircuitDetailDrawer
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
      />
    </section>
  );
};
