import React, { useEffect } from 'react';
import { CircuitStage } from '../../types/pneumatic';

interface CircuitDetailDrawerProps {
  stage: CircuitStage | null;
  onClose: () => void;
}

export const CircuitDetailDrawer: React.FC<CircuitDetailDrawerProps> = ({ stage, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (stage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stage, onClose]);

  if (!stage) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-ink/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <div className="relative w-full max-w-full sm:max-w-xl bg-[#FAF9F5] h-full shadow-2xl flex flex-col z-10 hairline-l overflow-y-auto animate-slideLeft">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 lg:p-8 hairline-b flex items-center justify-between sticky top-0 bg-[#FAF9F5]/95 backdrop-blur-sm z-20">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="bg-charcoal-ink text-[#FAF9F5] text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-2.5 py-1">
              Stage 0{stage.stageNumber}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash">
              Technical Specification
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 border border-charcoal-ink/30 flex items-center justify-center hover:bg-charcoal-ink hover:text-[#FAF9F5] transition-colors cursor-pointer text-sm"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
          
          {/* Main Visual */}
          <div className="relative aspect-[16/10] overflow-hidden hairline-all bg-[#ECE8DF]">
            <img
              src={stage.image}
              alt={stage.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-editorial text-xl sm:text-2xl lg:text-3xl text-charcoal-ink uppercase tracking-wide">
              {stage.name}
            </h3>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-subtle-ash block mt-1">
              {stage.subtitle}
            </span>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-charcoal leading-relaxed font-light">
              {stage.description}
            </p>
          </div>

          {/* Key Metric Badge */}
          <div className="hairline-all bg-[#F4F0E8] p-3.5 sm:p-4 flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash">
              {stage.metricLabel}
            </span>
            <span className="font-editorial text-lg sm:text-2xl text-charcoal-ink">
              {stage.metricValue}
            </span>
          </div>

          {/* Technical Specs Table */}
          <div className="hairline-all bg-[#FAF9F5]">
            <div className="p-3 hairline-b bg-[#F1EDE5] text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-charcoal-ink font-medium">
              Calibrated Laboratory Parameters
            </div>
            <div className="divide-y divide-hairline-divider">
              {stage.detailedSpecs.map((spec, i) => (
                <div key={i} className="p-3 sm:p-3.5 flex items-center justify-between text-xs font-light">
                  <span className="text-muted-charcoal">{spec.label}</span>
                  <span className="font-medium text-charcoal-ink text-right ml-2">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ISO Standard & Maintenance info */}
          <div className="space-y-2.5 sm:space-y-3 pt-1 text-xs">
            {stage.isoStandard && (
              <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 border border-emerald-200 bg-emerald-50/60 text-emerald-950">
                <span className="material-symbols-outlined text-base text-emerald-800 mt-0.5 shrink-0">verified</span>
                <div>
                  <strong className="block text-[10px] uppercase tracking-wider text-emerald-800 font-semibold">Compliance Rating</strong>
                  <span>{stage.isoStandard}</span>
                </div>
              </div>
            )}
            {stage.maintenanceInterval && (
              <div className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 border border-hairline-divider bg-[#F4F0E8] text-charcoal-ink">
                <span className="material-symbols-outlined text-base text-subtle-ash mt-0.5 shrink-0">build</span>
                <div>
                  <strong className="block text-[10px] uppercase tracking-wider text-subtle-ash font-semibold">Preventative Maintenance Interval</strong>
                  <span>{stage.maintenanceInterval}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 sm:p-6 lg:p-8 hairline-t mt-auto bg-[#FAF9F5] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] border border-charcoal-ink bg-charcoal-ink text-[#FAF9F5] hover:bg-transparent hover:text-charcoal-ink transition-colors cursor-pointer text-center"
          >
            Close Specification
          </button>
        </div>

      </div>
    </div>
  );
};
