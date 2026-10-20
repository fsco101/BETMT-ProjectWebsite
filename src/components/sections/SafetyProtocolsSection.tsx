import React, { useState, useMemo } from 'react';
import { mandatoryPractices, strictProhibitions, requiredPpeList, ppeBannerImage } from '../../data/safetyProtocols';
import { SafetyProtocolItem } from '../../types/pneumatic';
import { useLightbox } from '../../context/LightboxContext';
import { useStickyCardStack } from '../../hooks/useStickyCardStack';
import { useAutoCollapseOnScroll } from '../../hooks/useAutoCollapseOnScroll';

export const SafetyProtocolsSection: React.FC = () => {
  const { openLightbox } = useLightbox();
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-collapse on scroll away, auto-re-expand when scrolling back
  const {
    isCardOpen,
    toggleCard,
    expandAll,
    collapseAll
  } = useAutoCollapseOnScroll({
    minCollapseThreshold: 300,
    restoreRatio: 0.8,
  });

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

  const filterItem = (item: SafetyProtocolItem) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.detailTitle.toLowerCase().includes(q) ||
      item.detailBody.toLowerCase().includes(q) ||
      item.badge.toLowerCase().includes(q) ||
      item.tags.some(t => t.label.toLowerCase().includes(q))
    );
  };

  const filteredDo = useMemo(() => mandatoryPractices.filter(filterItem), [searchQuery]);
  const filteredDont = useMemo(() => strictProhibitions.filter(filterItem), [searchQuery]);

  // 4. Sticky Card Stack Hook for DO's and DON'Ts (Interactive.md Item 4)
  const doStack = useStickyCardStack(filteredDo.length, { baseTop: 80, stepOffset: 12, scaleFactor: 0.03 });
  const dontStack = useStickyCardStack(filteredDont.length, { baseTop: 80, stepOffset: 12, scaleFactor: 0.03 });

  const renderCard = (item: SafetyProtocolItem, isProhibition: boolean, idx: number) => {
    const isOpen = isCardOpen(item.id);
    const borderColor = isProhibition ? 'border-l-[#B42318]' : 'border-l-emerald-600';
    const numColor = isProhibition ? 'text-[#B42318] dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400';
    const badgeClass = isProhibition
      ? 'bg-red-50 dark:bg-red-950/40 text-[#B42318] dark:text-red-300 border-red-200 dark:border-red-800/60'
      : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60';
    const contentBg = isProhibition ? 'bg-red-50/40 dark:bg-red-950/20' : 'bg-slate-50 dark:bg-[#162238]';

    return (
      <div
        key={item.id}
        data-sticky-card
        data-card-id={item.id}
        style={{
          position: 'sticky',
          top: `calc(84px + ${idx} * 10px)`,
          zIndex: 10 + idx,
          transformOrigin: '50% 0'
        }}
        className={`rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E2135] border-l-4 ${borderColor} transition-transform duration-200 shadow-md mb-4 overflow-hidden will-change-transform`}
      >
        <button
          type="button"
          onClick={() => toggleCard(item.id)}
          className="w-full text-left p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none group"
        >
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 flex-1 min-w-0">
            <span className={`font-mono font-bold text-xl sm:text-2xl ${numColor} shrink-0 w-8`}>
              {item.number}
            </span>

            {/* Thumbnail Preview if photo available */}
            {item.image && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openLightbox(item.image!, 0, `${item.number}. ${item.title}`, item.summary);
                }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-sm overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shrink-0 relative group/thumb cursor-zoom-in"
                title="Click to zoom image"
              >
                <img src={item.image} alt="" className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px]">
                  🔍
                </div>
              </div>
            )}

            {/* Video Indicator Icon if video available */}
            {item.videoUrl && (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-sm bg-red-600 text-white flex flex-col items-center justify-center shrink-0 shadow-2xs">
                <span className="material-symbols-outlined text-2xl">play_circle</span>
                <span className="text-[8px] uppercase tracking-wider font-bold">Video</span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h4 className={`font-sans font-bold text-sm sm:text-base uppercase tracking-tight ${isProhibition ? 'text-[#B42318] dark:text-red-400' : 'text-[#16324F] dark:text-white'} transition-colors leading-snug`}>
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-normal mt-1 leading-relaxed">
                {item.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-end md:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
            <span className={`text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 py-1 border rounded-xs font-semibold whitespace-nowrap ${badgeClass}`}>
              {item.badge}
            </span>
            <span className={`w-7 h-7 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-slate-100 dark:bg-slate-800' : ''}`}>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </span>
          </div>
        </button>

        {/* Expanded Drawer */}
        {isOpen && (
          <div className={`border-t border-slate-200 dark:border-slate-800 ${contentBg} p-4 sm:p-6 animate-fadeIn`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              
              {/* Media Column (Image or Video) */}
              {(item.image || item.videoUrl) && (
                <div className="lg:col-span-5 space-y-2">
                  {item.image && (
                    <div
                      onClick={() => openLightbox(item.image!, 0, `${item.number}. ${item.title}`, item.detailBody)}
                      className="relative rounded-md overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 aspect-[4/3] cursor-zoom-in group/media shadow-xs"
                      title="Click to view full uncropped photo"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover/media:scale-102"
                      />
                      <div className="absolute bottom-2 left-2 bg-[#16324F]/90 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-medium">
                        Reference Photo · Click to zoom
                      </div>
                    </div>
                  )}

                  {/* Responsive YouTube Video Player Embed */}
                  {item.videoUrl && (
                    <div className="rounded-md overflow-hidden border border-slate-300 dark:border-slate-700 aspect-video shadow-xs bg-black">
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

              {/* Text Specifications Column */}
              <div className={`${item.image || item.videoUrl ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-3`}>
                <span className={`text-[10px] uppercase tracking-wider font-bold block ${numColor}`}>
                  {item.protocolRef}
                </span>
                <h5 className="font-sans font-bold text-sm sm:text-base text-[#16324F] dark:text-white uppercase tracking-tight">
                  {item.detailTitle}
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
                  {item.detailBody}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[9px] uppercase tracking-wider px-2.5 py-0.5 border rounded-xs font-medium ${
                        tag.highlight
                          ? isProhibition
                            ? 'border-red-300 text-[#B42318] bg-red-100 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800'
                            : 'border-emerald-300 text-emerald-800 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                          : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-white dark:bg-[#0E2135]'
                      }`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="safety-protocols" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 hairline-b pb-6 sm:pb-8">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-2 font-semibold">
            WORKSHOP PROTOCOL &amp; MANDATES
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#16324F] dark:text-white">
            Safety Standards &amp; Protocols
          </h2>
        </div>
        <div className="mt-4 sm:mt-0 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          Illustrated Directives &amp; Video Demonstrations
        </div>
      </div>

      {/* Required Personal Protective Equipment (PPE) - Proportional Banner Layout */}
      <div className="mb-12 sm:mb-16 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E2135] p-5 sm:p-8 shadow-xs transition-colors">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#B42318] dark:text-red-400 font-bold block mb-1">
              MANDATORY WORKSHOP REQUIREMENT
            </span>
            <h3 className="font-sans font-bold text-lg sm:text-2xl uppercase tracking-tight text-[#16324F] dark:text-white">
              Required Personal Protective Equipment (PPE)
            </h3>
          </div>
          <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
            5 Essential Safety Gear Items
          </span>
        </div>

        {/* Hero Banner with Actual Laboratory Photo from Document (image26.jpg) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
          <div
            onClick={() =>
              openLightbox(
                ppeBannerImage,
                0,
                'Required Personal Protective Equipment (PPE) — Laboratory Safety Standard',
                'Batch 2027 student researchers demonstrating complete workshop PPE: ANSI eye goggles, steel-toe boots, close-fitting clothing, zero accessories, and tied hair.'
              )
            }
            className="lg:col-span-6 relative aspect-[16/9] rounded-md overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-zoom-in group shadow-xs"
            title="Click to view full uncropped PPE photo"
          >
            <img
              src={ppeBannerImage}
              alt="Mandatory PPE Workshop Attire"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 bg-[#16324F]/90 text-white text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-xs font-semibold backdrop-blur-xs">
              Official PPE Demonstration
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded-xs flex items-center gap-1 opacity-90 group-hover:opacity-100">
              <span>🔍 Click to Zoom</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <h4 className="font-sans font-bold text-base text-[#16324F] dark:text-white uppercase">
              Eye &amp; Body Protection Standard
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              When cleaning machines with compressed air at 30 PSI, high-velocity metal chips and coolant particles ricochet unpredictably. All students, technicians, and observers must strictly wear approved PPE before entering the pneumatic working perimeter.
            </p>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 rounded-sm text-xs text-amber-900 dark:text-amber-300 font-medium">
              ⚠️ Strict Rule: Zero tolerance for operating pneumatic spray blow guns without eye protection.
            </div>
          </div>
        </div>

        {/* 5 PPE Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {requiredPpeList.map((ppe, idx) => (
            <div
              key={ppe.id}
              className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-[#F1F5F9] dark:bg-[#162238] hover:border-[#16324F] dark:hover:border-white transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-7 h-7 rounded-full bg-[#16324F] text-white flex items-center justify-center mb-2.5 text-xs font-bold font-mono">
                  0{idx + 1}
                </div>
                <h4 className="font-sans font-bold text-xs uppercase tracking-tight text-[#16324F] dark:text-white mb-1">
                  {ppe.name}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                  {ppe.description}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-1 text-[9px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Mandatory</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Expand Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search safety directives (e.g. hose, PPE, pressure, snap)..."
            className="w-full rounded-md bg-white dark:bg-[#0E2135] border border-slate-300 dark:border-slate-700 px-3.5 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-[#16324F] dark:focus:border-sky-400 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-[10px] uppercase tracking-wider font-semibold">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1.5 rounded-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0E2135] hover:bg-[#F1F5F9] dark:hover:bg-[#162238] text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0E2135] hover:bg-[#F1F5F9] dark:hover:bg-[#162238] text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Dual Protocol Flow: DO's vs DON'Ts */}
      <div className="space-y-12 sm:space-y-14">
        
        {/* DO's */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-emerald-600">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
              <h3 className="font-sans font-bold text-lg sm:text-2xl uppercase tracking-tight text-[#16324F] dark:text-white">
                DO's — Mandatory Practices
              </h3>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              {filteredDo.length} Active Directives
            </span>
          </div>

          {/* Sticky Stack Container for DO's (Interactive.md Item 4) */}
          <div ref={doStack.containerRef} className="relative">
            {filteredDo.map((item, idx) => renderCard(item, false, idx))}
            {filteredDo.length > 0 && <div className="h-[40vh]" aria-hidden="true" />}
            {filteredDo.length === 0 && (
              <p className="text-xs text-slate-500 italic py-4">No matching directives found.</p>
            )}
          </div>
        </div>

        {/* DON'Ts */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#B42318]">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#B42318]" />
              <h3 className="font-sans font-bold text-lg sm:text-2xl uppercase tracking-tight text-[#B42318] dark:text-red-400">
                DON'TS — Strict Prohibitions
              </h3>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
              {filteredDont.length} Critical Prohibitions
            </span>
          </div>

          {/* Sticky Stack Container for DON'Ts (Interactive.md Item 4) */}
          <div ref={dontStack.containerRef} className="relative">
            {filteredDont.map((item, idx) => renderCard(item, true, idx))}
            {filteredDont.length > 0 && <div className="h-[40vh]" aria-hidden="true" />}
            {filteredDont.length === 0 && (
              <p className="text-xs text-slate-500 italic py-4">No matching prohibitions found.</p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
