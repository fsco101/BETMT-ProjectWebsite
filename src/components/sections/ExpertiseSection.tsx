import React, { useState } from 'react';
import { useLightbox } from '../../context/LightboxContext';

export const ExpertiseSection: React.FC = () => {
  const { openLightbox } = useLightbox();
  const [activeFigure, setActiveFigure] = useState<number>(0);

  const figures = [
    {
      id: 'fig-1',
      title: 'Figure 1 — Primary Central Pneumatic Facility',
      subtitle: 'Central Plant: Compressor, Filter, Refrigerant Dryer & Receiver Tank',
      src: '/images/image49.jpg',
      aspect: 'aspect-[4/3] sm:aspect-[16/10]',
      caption: 'Figure 1 — Centralized Compressed Air Distribution System primary installation at TUP Taguig Campus (Group 1 - Batch 2027).'
    },
    {
      id: 'fig-2',
      title: 'Figure 2 — System Components Schematic',
      subtitle: 'Technical Component Diagram & Pneumatic Flow Sequence',
      src: '/images/updated/image8.png',
      aspect: 'aspect-[4/3]',
      caption: 'Figure 2 — System Components: Rotary Screw Compressor, Particulate Air Filter, Refrigerant Dryer, and Vertical Air Receiver Tank.'
    },
    {
      id: 'fig-3',
      title: 'Figure 3 — Piping Layout & Workshop Distribution',
      subtitle: '1" Series Main Line to 1/2" Parallel Branches across Machining Stations',
      src: '/images/updated/image6.png',
      aspect: 'aspect-[4/3]',
      caption: 'Figure 3 — Pipe Layout: Overhead 1-inch galvanized distribution header branching into 1/2-inch downcomers to 6 machining drops.'
    }
  ];

  return (
    <section id="system-overview" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
          <span>Mechanical &amp; Allied Department</span>
          <span>·</span>
          <span>TUP Taguig Campus</span>
        </div>
        <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#16324F] dark:text-white">
          SYSTEM OVERVIEW
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl font-normal leading-relaxed">
          An overview of the centralized compressed air distribution system, highlighting its major components, piping architecture, and operating principles across the machining stations.
        </p>
      </div>

      {/* Main Technical Overview Card */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E2135] shadow-xs overflow-hidden transition-colors">
        
        {/* Figure Selector Tabs (BrewedOps Inspired) */}
        <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 bg-[#F1F5F9] dark:bg-[#162238] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mr-1">
              Select Figure:
            </span>
            {figures.map((fig, idx) => (
              <button
                key={fig.id}
                type="button"
                onClick={() => setActiveFigure(idx)}
                className={`motion-press px-3 py-1.5 rounded-sm text-xs font-medium transition-all cursor-pointer ${
                  activeFigure === idx
                    ? 'bg-[#16324F] text-white dark:bg-sky-500 shadow-2xs font-semibold'
                    : 'bg-white dark:bg-[#0E2135] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-[#16324F]'
                }`}
              >
                Figure 0{idx + 1}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              openLightbox(
                figures.map(f => ({ src: f.src, title: f.title, caption: f.caption })),
                activeFigure
              )
            }
            className="inline-flex items-center gap-1.5 text-xs text-[#16324F] dark:text-sky-300 hover:underline font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">zoom_in</span>
            <span>View Fullscreen Lightbox</span>
          </button>
        </div>

        {/* Content Body: Proportional Image Viewer + Technical Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-8 items-center">
          
          {/* Main Visual Display (Proportional Aspect Ratio Container) */}
          <div
            onClick={() =>
              openLightbox(
                figures.map(f => ({ src: f.src, title: f.title, caption: f.caption })),
                activeFigure
              )
            }
            className="lg:col-span-7 relative overflow-hidden rounded-md border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B132B] aspect-[4/3] sm:aspect-[16/10] cursor-zoom-in group shadow-xs"
            title="Click to view full uncropped image"
          >
            <img
              src={figures[activeFigure].src}
              alt={figures[activeFigure].title}
              className="w-full h-full object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-102"
            />
            
            {/* Top Left Badge */}
            <div className="absolute top-3 left-3 bg-[#16324F]/90 dark:bg-black/90 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xs font-semibold backdrop-blur-xs">
              {figures[activeFigure].title.split('—')[0].trim()}
            </div>

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-3 inset-x-3 bg-[#16324F]/90 dark:bg-black/90 text-white p-2.5 rounded-xs flex items-center justify-between text-xs backdrop-blur-xs opacity-95 group-hover:opacity-100 transition-opacity">
              <span className="font-medium truncate pr-2">{figures[activeFigure].subtitle}</span>
              <span className="text-[10px] text-amber-300 shrink-0 font-mono">🔍 Click to zoom</span>
            </div>
          </div>

          {/* Right Column: Technical Specifications & Pipe Layout Documentation */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* System Components Card */}
            <div className="p-4 sm:p-5 rounded-md bg-[#F1F5F9] dark:bg-[#162238] border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="font-sans font-bold text-sm sm:text-base uppercase tracking-tight text-[#16324F] dark:text-white">
                  SYSTEM COMPONENTS &amp; GENERATION
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                The system consists of an <strong>air compressor</strong>, <strong>air filter</strong>, <strong>refrigerant air dryer</strong>, and <strong>air receiver tank</strong>. Each component serves a specific function in generating, treating, and storing compressed air before it is distributed through the piping network to support efficient and reliable operation across the machining stations.
              </p>
            </div>

            {/* Pipe Layout Card */}
            <div className="p-4 sm:p-5 rounded-md bg-[#F1F5F9] dark:bg-[#162238] border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600 dark:bg-sky-400" />
                <h3 className="font-sans font-bold text-sm sm:text-base uppercase tracking-tight text-[#16324F] dark:text-white">
                  PIPE LAYOUT &amp; DISTRIBUTION NETWORK
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Compressed air passes through the main line in series, using a <strong>1-inch pipe</strong>, then branches out in parallel through <strong>1/2-inch pipes</strong> to the three machining areas, supplying <strong>six hose outlets</strong> for its intended purpose.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 block font-medium">Main Header</span>
                <span className="font-bold text-[#16324F] dark:text-white font-mono">1" Series Header</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 block font-medium">Branch Lines</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">1/2" Parallel (6 Drops)</span>
              </div>
            </div>

          </div>

        </div>

        {/* Thumbnail Preview Strip for Quick Navigation */}
        <div className="p-3 sm:p-4 bg-[#F8FAFC] dark:bg-[#0B132B] border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-3">
          {figures.map((fig, idx) => (
            <button
              key={fig.id}
              type="button"
              onClick={() => setActiveFigure(idx)}
              className={`p-2 rounded-md border text-left transition-all cursor-pointer flex items-center gap-3 ${
                activeFigure === idx
                  ? 'border-[#16324F] dark:border-sky-500 bg-white dark:bg-[#162238] shadow-2xs'
                  : 'border-slate-200 dark:border-slate-800 bg-transparent hover:bg-white dark:hover:bg-[#162238]'
              }`}
            >
              <div className="w-12 h-10 rounded-xs overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0 border border-slate-200 dark:border-slate-700">
                <img src={fig.src} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-[#16324F] dark:text-white truncate">
                  {fig.title.split('—')[0]}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {fig.title.split('—')[1]}
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
