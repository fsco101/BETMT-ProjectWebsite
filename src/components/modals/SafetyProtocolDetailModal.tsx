import React, { useEffect } from 'react';
import { SafetyProtocolItem } from '../../types/pneumatic';
import { useLightbox } from '../../context/LightboxContext';

interface SafetyProtocolDetailModalProps {
  item: SafetyProtocolItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export const SafetyProtocolDetailModal: React.FC<SafetyProtocolDetailModalProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
  currentIndex = 0,
  totalCount = 0,
}) => {
  const { openLightbox } = useLightbox();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  const isProhibition = item.isProhibition;
  const numColor = isProhibition ? 'text-[#B42318] dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400';
  const badgeClass = isProhibition
    ? 'bg-red-50 dark:bg-red-950/40 text-[#B42318] dark:text-red-300 border-red-200 dark:border-red-800/60'
    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60';

  const formatAutoPlayLoopUrl = (url: string) => {
    if (!url) return '';
    const match = url.match(/(?:embed\/|v=)([a-zA-Z0-9_-]{11})/);
    const videoId = match ? match[1] : '';
    const base = url.split('?')[0];
    if (videoId) {
      return `${base}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 overflow-y-auto">
      {/* Darkened Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#0E2135] text-slate-800 dark:text-slate-100 shadow-2xl rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] animate-scaleUp transition-colors my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="safety-protocol-modal-title"
      >
        {/* Top Header Bar */}
        <div className="p-3.5 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-[#F8FAFC] dark:bg-[#162238] gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span
              className={`text-[10px] sm:text-xs uppercase tracking-widest px-2.5 py-1 rounded-sm font-bold shrink-0 text-white ${
                isProhibition ? 'bg-red-600' : 'bg-emerald-600'
              }`}
            >
              {isProhibition ? 'DON\'T' : 'DO'} · {item.number}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold truncate">
                  {item.protocolRef}
                </span>
                <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 border rounded-sm font-semibold shrink-0 ${badgeClass}`}>
                  {item.badge}
                </span>
              </div>
              <h3
                id="safety-protocol-modal-title"
                className="font-sans font-bold text-sm sm:text-base md:text-lg text-slate-900 dark:text-white uppercase tracking-tight truncate leading-tight"
              >
                {item.title}
              </h3>
            </div>
          </div>

          {/* Quick Prev / Next Switcher & Close Button */}
          <div className="flex items-center gap-2 shrink-0">
            {onPrev && onNext && totalCount > 1 && (
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold">
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Previous Protocol (Left Arrow)"
                >
                  ← Prev
                </button>
                <span className="text-slate-400 font-mono px-1">
                  {currentIndex + 1} / {totalCount}
                </span>
                <button
                  type="button"
                  onClick={onNext}
                  className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Next Protocol (Right Arrow)"
                >
                  Next →
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
              title="Close (ESC)"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Media Column (Photo or Video Player) */}
            {(item.image || item.videoUrl) && (
              <div className="lg:col-span-6 space-y-3">
                {item.image && (
                  <div
                    onClick={() =>
                      openLightbox(item.image!, 0, `${item.number}. ${item.title}`, item.detailBody)
                    }
                    className="relative rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 aspect-[4/3] cursor-zoom-in group/media shadow-sm"
                    title="Click to view full uncropped photo"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover/media:scale-102"
                    />
                    <div className="absolute bottom-2 left-2 bg-slate-900/85 dark:bg-black/85 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-semibold backdrop-blur-xs">
                      Reference Photo · Click to zoom
                    </div>
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-black/80 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm flex items-center gap-1.5 shadow-md">
                        <span className="material-symbols-outlined text-sm">zoom_in</span>
                        <span>Enlarge Photo</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Embedded Video */}
                {item.videoUrl && (
                  <div className="rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 aspect-video shadow-sm bg-black">
                    <iframe
                      src={formatAutoPlayLoopUrl(item.videoUrl)}
                      title={item.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            )}

            {/* Right Specification Details Column */}
            <div className={`${item.image || item.videoUrl ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-4`}>
              <div>
                <span className={`text-[10px] uppercase tracking-wider font-bold block mb-1 ${numColor}`}>
                  {item.protocolRef}
                </span>
                <h4 className="font-sans font-extrabold text-base sm:text-xl text-slate-900 dark:text-white uppercase tracking-tight leading-snug">
                  {item.detailTitle}
                </h4>
              </div>

              {/* Protocol Summary Card */}
              <div className="p-3.5 bg-slate-50 dark:bg-[#162238]/60 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
                  Safety Mandate Summary
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-light">
                  {item.summary}
                </p>
              </div>

              {/* Full Detailed Body */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
                  Technical Hazard Analysis &amp; Compliance Rule
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                  {item.detailBody}
                </p>
              </div>

              {/* Critical Alert Banner */}
              <div
                className={`p-3.5 rounded-lg border-l-4 flex items-start gap-3 text-xs ${
                  isProhibition
                    ? 'border-l-red-500 bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-slate-800 dark:text-slate-200'
                    : 'border-l-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-base mt-0.5 shrink-0 ${
                    isProhibition ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {isProhibition ? 'block' : 'verified'}
                </span>
                <div>
                  <strong
                    className={`block text-[10px] sm:text-xs uppercase tracking-wider font-bold ${
                      isProhibition ? 'text-red-600 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-300'
                    }`}
                  >
                    {isProhibition ? 'Strict Operating Prohibition' : 'Mandatory Standard Protocol'}
                  </strong>
                  <span className="font-light leading-relaxed">
                    Compliance with {item.protocolRef} is strictly inspected under workshop operating safety standards.
                  </span>
                </div>
              </div>

              {/* Tags Pill Row */}
              <div className="flex flex-wrap gap-2 pt-1">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 py-1 border rounded-md font-semibold ${
                      tag.highlight
                        ? isProhibition
                          ? 'border-red-300 text-red-700 bg-red-100 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800'
                          : 'border-emerald-300 text-emerald-800 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#162238]'
                    }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Controls */}
        <div className="p-3.5 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#162238] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                className="px-3.5 sm:px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ← Prev Protocol
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="px-3.5 sm:px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Next Protocol →
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#16324F] dark:bg-sky-500 text-white dark:text-[#0A192F] hover:bg-[#0E2135] dark:hover:bg-sky-400 transition-colors cursor-pointer shadow-sm"
          >
            Close Protocol
          </button>
        </div>
      </div>
    </div>
  );
};
