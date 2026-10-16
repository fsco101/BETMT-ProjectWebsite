import React, { useState, useMemo } from 'react';
import { mandatoryPractices, strictProhibitions, requiredPpeList } from '../../data/safetyProtocols';
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
          className="w-full text-left p-4 sm:p-6 lg:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 cursor-pointer select-none group"
        >
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-6">
            <span className={`font-editorial text-xl sm:text-3xl ${numColor} shrink-0 w-6 sm:w-8`}>
              {item.number}
            </span>
            <div>
              <h4 className={`font-editorial text-base sm:text-lg lg:text-xl uppercase tracking-wider ${isProhibition ? 'text-accent-crimson group-hover:text-red-950' : 'text-charcoal-ink group-hover:text-emerald-900'} transition-colors leading-snug`}>
                {item.title}
              </h4>
              <p className="text-xs text-muted-charcoal font-light mt-1 max-w-2xl leading-relaxed">
                {item.summary}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-end md:self-center pt-2 sm:pt-0 border-t sm:border-t-0 hairline-t sm:border-none">
            <span className={`text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] px-2.5 sm:px-3 py-1 border font-medium whitespace-nowrap ${badgeClass}`}>
              {item.badge}
            </span>
            <span className={`w-7 h-7 rounded-full border border-charcoal-ink/20 flex items-center justify-center text-charcoal-ink transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </span>
          </div>
        </button>

        {isOpen && (
          <div className={`hairline-t border-hairline-divider ${contentBg} px-4 sm:px-8 py-5 sm:py-7 animate-fadeIn`}>
            <div className="flex flex-col gap-3">
              <span className={`text-[10px] uppercase tracking-[0.2em] font-medium block ${numColor}`}>
                {item.protocolRef}
              </span>
              <h5 className="font-editorial text-base sm:text-lg text-charcoal-ink uppercase">
                {item.detailTitle}
              </h5>
              <p className="text-xs sm:text-sm text-muted-charcoal font-light leading-relaxed max-w-3xl">
                {item.detailBody}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-[9px] uppercase tracking-[0.14em] px-2.5 py-0.5 border ${
                      tag.highlight
                        ? isProhibition
                          ? 'border-accent-crimson text-accent-crimson bg-red-50'
                          : 'border-emerald-700 text-emerald-800 bg-emerald-50'
                        : 'border-hairline-divider text-subtle-ash bg-white/60'
                    }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="safety-protocols" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 hairline-b pb-6 sm:pb-8">
        <div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-subtle-ash block mb-2 font-medium">
            WORKSHOP PROTOCOL &amp; MANDATES
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl uppercase tracking-[0.03em] text-charcoal-ink">
            Safety Standards &amp; Operating Protocols
          </h2>
        </div>
        <div className="mt-4 sm:mt-0 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-subtle-ash">
          Interactive Operational Cards · Select any item to view media
        </div>
      </div>

      {/* Required Personal Protective Equipment (PPE) */}
      <div className="mb-14 sm:mb-18 hairline-all bg-[#FAF9F5] p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 hairline-b mb-6 gap-2">
          <div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-accent-crimson font-semibold block mb-1">
              MANDATORY WORKSHOP REQUIREMENT
            </span>
            <h3 className="font-editorial text-lg sm:text-2xl uppercase tracking-wider text-charcoal-ink">
              Required Personal Protective Equipment (PPE)
            </h3>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-subtle-ash">
            5 Essential Standards
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {requiredPpeList.map((ppe, idx) => (
            <div
              key={ppe.id}
              className="p-4 border border-hairline-divider bg-white hover:border-charcoal-ink transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-[#F4F0E8] flex items-center justify-center text-charcoal-ink mb-3 text-xs font-bold font-editorial">
                  0{idx + 1}
                </div>
                <h4 className="font-editorial text-sm uppercase tracking-wide text-charcoal-ink font-bold mb-1.5">
                  {ppe.name}
                </h4>
                <p className="text-[11px] text-muted-charcoal font-light leading-relaxed">
                  {ppe.description}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-hairline-divider/50 flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-emerald-800 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Mandatory</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 sm:mb-12">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by keyword (e.g. PPE, hose, pressure, valve)..."
            className="w-full bg-[#FAF9F5] border border-hairline-divider px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs text-charcoal-ink placeholder-subtle-ash focus:outline-hidden focus:border-charcoal-ink transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-subtle-ash hover:text-charcoal-ink"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em]">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1.5 border border-hairline-divider bg-[#FAF9F5] hover:border-charcoal-ink transition-colors text-muted-charcoal hover:text-charcoal-ink"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1.5 border border-hairline-divider bg-[#FAF9F5] hover:border-charcoal-ink transition-colors text-muted-charcoal hover:text-charcoal-ink"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Dual Column Protocol Flow: DO vs DON'T */}
      <div className="space-y-12 sm:space-y-16">
        
        {/* DO's */}
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-6 pb-2 sm:pb-3 hairline-b">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
              <h3 className="font-editorial text-lg sm:text-2xl uppercase tracking-wider text-charcoal-ink">
                DO's — Mandatory Practices
              </h3>
            </div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-subtle-ash">
              {filteredDo.length} Active Directives
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {filteredDo.map((item) => renderCard(item, false))}
            {filteredDo.length === 0 && (
              <p className="text-xs text-subtle-ash italic py-4">No matching directives found.</p>
            )}
          </div>
        </div>

        {/* DON'Ts */}
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-6 pb-2 sm:pb-3 hairline-b">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-crimson" />
              <h3 className="font-editorial text-lg sm:text-2xl uppercase tracking-wider text-charcoal-ink">
                DON'TS — Strict Prohibitions
              </h3>
            </div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-subtle-ash">
              {filteredDont.length} Critical Prohibitions
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {filteredDont.map((item) => renderCard(item, true))}
            {filteredDont.length === 0 && (
              <p className="text-xs text-subtle-ash italic py-4">No matching prohibitions found.</p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
