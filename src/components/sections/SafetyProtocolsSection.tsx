import React, { useState, useMemo } from 'react';
import { mandatoryPractices, strictProhibitions } from '../../data/safetyProtocols';
import { SafetyProtocolItem } from '../../types/pneumatic';

export const SafetyProtocolsSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'do-1': true,
    'dont-1': true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    [...mandatoryPractices, ...strictProhibitions].forEach(item => {
      allOpen[item.id] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
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

  const renderCard = (item: SafetyProtocolItem, isProhibition: boolean) => {
    const isOpen = openItems[item.id];
    const borderColor = isProhibition ? 'border-l-accent-crimson' : 'border-l-emerald-700';
    const numColor = isProhibition ? 'text-accent-crimson' : 'text-emerald-800';
    const badgeClass = isProhibition
      ? 'bg-red-100/80 text-accent-crimson border-red-300'
      : 'bg-emerald-50 text-emerald-800 border-emerald-200';
    const contentBg = isProhibition ? 'bg-[#FDF7F5]' : 'bg-[#F4F0E8]/70';

    return (
      <div
        key={item.id}
        className={`hairline-all bg-[#FAF9F5] border-l-4 ${borderColor} transition-all duration-300`}
      >
        <button
          type="button"
          onClick={() => toggleItem(item.id)}
          className="w-full text-left p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer select-none group"
        >
          <div className="flex items-start sm:items-center gap-6">
            <span className={`font-editorial text-2xl sm:text-3xl ${numColor} w-8`}>
              {item.number}
            </span>
            <div>
              <h4 className={`font-editorial text-lg sm:text-xl uppercase tracking-wider ${isProhibition ? 'text-accent-crimson group-hover:text-red-950' : 'text-charcoal-ink group-hover:text-emerald-900'} transition-colors`}>
                {item.title}
              </h4>
              <p className="text-xs text-muted-charcoal font-light mt-1 max-w-2xl leading-relaxed">
                {item.summary}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 self-end md:self-center">
            <span className={`text-[10px] uppercase tracking-[0.18em] px-3 py-1 border font-medium whitespace-nowrap ${badgeClass}`}>
              {item.badge}
            </span>
            <span className={`w-7 h-7 rounded-full border border-charcoal-ink/20 flex items-center justify-center text-charcoal-ink transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </span>
          </div>
        </button>

        {isOpen && (
          <div className={`hairline-t border-hairline-divider ${contentBg} px-6 sm:px-8 py-7 animate-fadeIn`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative overflow-hidden hairline-all bg-[#ECE8DF] aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute bottom-3 left-3 text-white text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 ${isProhibition ? 'bg-accent-crimson' : 'bg-charcoal-ink/85'}`}>
                  {item.badge}
                </div>
              </div>
              <div className="lg:col-span-7">
                <span className={`text-[10px] uppercase tracking-[0.22em] font-medium block mb-1 ${numColor}`}>
                  {item.protocolRef}
                </span>
                <h5 className="font-editorial text-xl uppercase tracking-wider text-charcoal-ink mb-3">
                  {item.detailTitle}
                </h5>
                <p className="text-xs text-muted-charcoal font-light leading-relaxed mb-4">
                  {item.detailBody}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[9px] uppercase tracking-[0.16em] px-2.5 py-1 font-medium ${
                        tag.highlight
                          ? isProhibition
                            ? 'bg-red-100 text-accent-crimson'
                            : 'bg-emerald-100/70 text-emerald-800'
                          : 'bg-[#EAE5D9] text-charcoal-ink'
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
    <section id="protocoles" className="py-24 sm:py-32 px-6 sm:px-12 bg-[#FAF9F5] hairline-t hairline-b">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 hairline-b pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-subtle-ash block mb-2">
              DOLE Compliance &amp; ANSI Z87.1 Safety Charter
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl uppercase tracking-[0.03em] text-charcoal-ink">
              SAFETY STANDARDS &amp; OPERATING PROTOCOLS
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 text-[11px] uppercase tracking-[0.18em] text-muted-charcoal">
            Interactive Operational Cards · Select any item to view media
          </div>
        </div>

        {/* Search Bar & Expand/Collapse Controls */}
        <div className="mb-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword (e.g. PPE, hose, eye, embolism, PSI)..."
              className="w-full bg-[#FAF9F5] border border-hairline-divider px-4 py-2 text-xs text-charcoal-ink placeholder-subtle-ash focus:outline-none focus:border-charcoal-ink transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-subtle-ash hover:text-charcoal-ink"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em]">
            <button
              type="button"
              onClick={expandAll}
              className="px-3 py-1.5 border border-hairline-divider hover:border-charcoal-ink transition-colors"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-3 py-1.5 border border-hairline-divider hover:border-charcoal-ink transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Groups */}
        <div className="space-y-16">
          
          {/* Mandatory Practices (DO) */}
          <div>
            <div className="flex items-center justify-between hairline-b pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 inline-block" />
                <h3 className="font-editorial text-xl sm:text-2xl uppercase tracking-wider text-charcoal-ink">
                  MANDATORY PRACTICES (DO)
                </h3>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-800 font-medium">
                {filteredDo.length} Active Directives
              </span>
            </div>

            <div className="space-y-4">
              {filteredDo.length > 0 ? (
                filteredDo.map((item) => renderCard(item, false))
              ) : (
                <div className="p-8 text-center text-xs text-subtle-ash border border-hairline-divider">
                  No matching mandatory practices found for "{searchQuery}".
                </div>
              )}
            </div>
          </div>

          {/* Strict Prohibitions (DON'T) */}
          <div>
            <div className="flex items-center justify-between hairline-b pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-crimson inline-block" />
                <h3 className="font-editorial text-xl sm:text-2xl uppercase tracking-wider text-accent-crimson">
                  STRICT PROHIBITIONS (DON'T)
                </h3>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent-crimson font-medium">
                {filteredDont.length} Zero Tolerance Violations
              </span>
            </div>

            <div className="space-y-4">
              {filteredDont.length > 0 ? (
                filteredDont.map((item) => renderCard(item, true))
              ) : (
                <div className="p-8 text-center text-xs text-subtle-ash border border-hairline-divider">
                  No matching prohibitions found for "{searchQuery}".
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
