import React, { useState } from 'react';
import { studyOverviewData, researchTeamMembers, teamIntro } from '../../data/aboutData';
import { TeamMember } from '../../types/pneumatic';
import { KineticMarquee } from '../interactive/KineticMarquee';
import { TeamCoverflowGallery } from '../interactive/TeamCoverflowGallery';

interface AboutPageProps {
  onBackToManual: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToManual }) => {
  const [activeModalMember, setActiveModalMember] = useState<TeamMember | null>(null);
  const [viewMode, setViewMode] = useState<'coverflow' | 'grid'>('coverflow');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-100 pb-24 transition-colors duration-200">
      
      {/* 1. Page Header Bar & Back Navigation */}
      <section className="hairline-b bg-[#F1F5F9] dark:bg-[#162238] sticky top-[57px] sm:top-[61px] z-30 px-4 sm:px-8 lg:px-12 py-3 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 font-medium">
            <span>BET-MT BATCH 2027</span>
            <span>/</span>
            <span>MAAD</span>
            <span>/</span>
            <span className="text-[#16324F] dark:text-white font-bold">About the Study &amp; Team</span>
          </div>

          <button
            type="button"
            onClick={onBackToManual}
            className="motion-press inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold px-4 py-1.5 rounded-sm bg-[#16324F] text-white hover:bg-[#0E2135] dark:bg-white dark:text-[#16324F] dark:hover:bg-slate-100 transition-all cursor-pointer shadow-2xs"
          >
            <span>← Return to Operational Manual</span>
          </button>
        </div>
      </section>

      {/* 2. Hero Header */}
      <section className="px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-12 sm:pb-16 hairline-b">
        <div className="max-w-6xl mx-auto space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-300 font-bold px-3 py-1 rounded-sm bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700">
              Undergraduate Engineering Study
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 px-3 py-1 rounded-sm bg-[#F1F5F9] dark:bg-[#162238] border border-slate-300 dark:border-slate-700">
              Batch 2023–2027
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 px-3 py-1 rounded-sm bg-[#F1F5F9] dark:bg-[#162238] border border-slate-300 dark:border-slate-700">
              Group 1
            </span>
          </div>

          <h1 className="font-sans font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#16324F] dark:text-white uppercase tracking-tight leading-tight">
            {studyOverviewData.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-4xl font-normal leading-relaxed">
            {studyOverviewData.subtitle}
          </p>

          <div className="pt-4 flex flex-wrap gap-y-3 gap-x-8 text-xs border-t border-slate-200 dark:border-slate-800">
            <div>
              <span className="uppercase tracking-wider block text-[10px] text-slate-500 dark:text-slate-400 font-bold">Department</span>
              <strong className="text-[#16324F] dark:text-white font-semibold text-sm">{teamIntro.department}</strong>
            </div>
            <div>
              <span className="uppercase tracking-wider block text-[10px] text-slate-500 dark:text-slate-400 font-bold">Program</span>
              <strong className="text-[#16324F] dark:text-white font-semibold text-sm">{teamIntro.program}</strong>
            </div>
            <div>
              <span className="uppercase tracking-wider block text-[10px] text-slate-500 dark:text-slate-400 font-bold">Institution</span>
              <strong className="text-[#16324F] dark:text-white font-semibold text-sm">{teamIntro.institution}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Study Abstract & Engineering Purpose */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 sm:py-16 hairline-b bg-[#F8FAFC] dark:bg-[#0E2135]/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
              About the Study
            </span>
            <h2 className="font-sans font-bold text-xl sm:text-3xl text-[#16324F] dark:text-white uppercase tracking-tight">
              Executive Abstract &amp; Purpose
            </h2>
            
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-justify">
              {studyOverviewData.abstract}
            </p>

            <div className="p-4 sm:p-5 rounded-md border-l-4 border-[#16324F] bg-white dark:bg-[#162238] space-y-2 mt-4 shadow-2xs">
              <h3 className="text-xs uppercase tracking-wider font-bold text-[#16324F] dark:text-white">
                Piping Network &amp; Distribution Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {studyOverviewData.backgroundRationale}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
              Core Study Impacts
            </span>
            <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E2135] p-5 sm:p-6 rounded-md shadow-2xs space-y-3">
              <h3 className="font-sans font-bold text-sm sm:text-base text-[#16324F] dark:text-white uppercase pb-2 border-b border-slate-100 dark:border-slate-800">
                Key Laboratory Improvements
              </h3>
              <ul className="space-y-2.5">
                {studyOverviewData.significance.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-[#16324F] text-white text-[9px] flex items-center justify-center shrink-0 mt-0.5 font-bold font-mono">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Project Objectives Grid */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 sm:py-16 hairline-b">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
              Project Milestones
            </span>
            <h2 className="font-sans font-bold text-xl sm:text-3xl text-[#16324F] dark:text-white uppercase tracking-tight">
              Project Objectives
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {studyOverviewData.objectives.map((obj, i) => (
              <div
                key={obj.id}
                className="motion-card p-5 sm:p-6 rounded-md border border-slate-200 dark:border-slate-800 bg-[#F1F5F9] dark:bg-[#0E2135] flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl sm:text-2xl text-amber-600 dark:text-amber-400 font-extrabold">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-white dark:bg-[#162238] border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold">
                      Objective {i + 1}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-sm sm:text-base text-[#16324F] dark:text-white uppercase tracking-tight">
                    {obj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {obj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5. Introducing the Team Kinetic Marquee Ticker (Interactive.md Item 2) */}
      <KineticMarquee />

      {/* 5. Meet the Team Section with 3D Coverflow Gallery (Interactive.md Item 5) */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 sm:py-16 hairline-b bg-[#F8FAFC] dark:bg-[#0E2135]/40 scroll-mt-28" id="research-team">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                  Student Research Group
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-xs bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-semibold">
                  10 Members
                </span>
              </div>
              <h2 className="font-sans font-extrabold text-2xl sm:text-4xl text-[#16324F] dark:text-white uppercase tracking-tight">
                {teamIntro.heading}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl font-normal leading-relaxed">
                {teamIntro.description}
              </p>
            </div>

            {/* View Mode Toggle: 3D Coverflow vs Grid */}
            <div className="shrink-0 flex items-center gap-1.5 p-1 rounded-md bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('coverflow')}
                className={`px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'coverflow'
                    ? 'bg-[#16324F] text-white shadow-xs dark:bg-white dark:text-[#16324F]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-sm">view_carousel</span>
                <span>3D Coverflow</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-[#16324F] text-white shadow-xs dark:bg-white dark:text-[#16324F]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-sm">grid_view</span>
                <span>Grid View</span>
              </button>
            </div>
          </div>

          {/* 3D Coverflow Gallery Showcase (Interactive.md Item 5) */}
          {viewMode === 'coverflow' ? (
            <TeamCoverflowGallery
              members={researchTeamMembers}
              onSelectMember={(member) => setActiveModalMember(member)}
            />
          ) : (
            /* 10 Team Members Responsive Card Grid with Strict Proportional Aspect Ratios */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {researchTeamMembers.map((member, idx) => {
                const hasImg = member.image && !failedImages[member.id];
                return (
                  <div
                    key={member.id}
                    onClick={() => setActiveModalMember(member)}
                    className="group relative flex flex-col rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E2135] overflow-hidden shadow-2xs hover:shadow-md hover:border-[#16324F] dark:hover:border-sky-400 transition-all duration-200 cursor-pointer"
                  >
                    {/* Photo Container with strict 4:5 Portrait Ratio */}
                    <div className="relative w-full aspect-[4/5] bg-slate-100 dark:bg-[#162238] overflow-hidden border-b border-slate-200 dark:border-slate-800">
                      {hasImg ? (
                        <img
                          src={member.image}
                          alt={`Portrait of ${member.name}`}
                          onError={() => handleImageError(member.id)}
                          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 text-[#16324F] dark:text-white">
                          <span className="material-symbols-outlined text-4xl mb-1 text-slate-400">person</span>
                          <span className="font-mono font-bold text-lg">
                            {member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                          </span>
                        </div>
                      )}

                      {/* Member Index Badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-xs bg-[#16324F]/85 backdrop-blur-xs text-white text-[10px] font-mono font-bold tracking-wider">
                        #{String(idx + 1).padStart(2, '0')}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#16324F]/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/95 text-[#16324F] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          <span className="material-symbols-outlined text-sm">zoom_in</span>
                          <span>View Photo</span>
                        </span>
                      </div>
                    </div>

                    {/* Just the Name - No description under their name */}
                    <div className="p-3 sm:p-4 text-center flex items-center justify-center min-h-[58px]">
                      <h3 className="font-sans font-bold text-xs sm:text-sm text-[#16324F] dark:text-white uppercase leading-snug tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 6. Return to Manual Action */}
      <section className="px-4 sm:px-8 lg:px-12 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-4 p-8 rounded-lg border border-slate-200 dark:border-slate-800 bg-[#F1F5F9] dark:bg-[#162238] shadow-xs">
          <span className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold block">
            Centralized Compressed Air Distribution System
          </span>
          <h2 className="font-sans font-bold text-xl sm:text-3xl text-[#16324F] dark:text-white uppercase tracking-tight">
            Ready to consult the Operational Manual?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto font-normal leading-relaxed">
            Access the complete 7-stage pneumatic circuit, safety DOs and DONTs, 15-step startup/shutdown procedure, and 6 workshop drop stations.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onBackToManual}
              className="motion-press px-6 py-3 rounded-md bg-[#16324F] hover:bg-[#0E2135] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Access Operational Manual</span>
              <span className="text-amber-400">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. Clean Photo Lightbox Modal (Photo & Name Only) */}
      {activeModalMember && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveModalMember(null)}
        >
          <div
            className="relative max-w-md w-full bg-white dark:bg-[#0E2135] rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar with member name and close button */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#162238]">
              <h3 className="font-sans font-bold text-sm text-[#16324F] dark:text-white uppercase tracking-tight">
                {activeModalMember.name}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModalMember(null)}
                className="p-1 rounded-sm text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Close photo preview"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Large Proportional Photo */}
            <div className="w-full aspect-[4/5] bg-slate-100 dark:bg-slate-900 overflow-hidden">
              {activeModalMember.image && !failedImages[activeModalMember.id] ? (
                <img
                  src={activeModalMember.image}
                  alt={activeModalMember.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400">
                  <span className="material-symbols-outlined text-6xl mb-2">person</span>
                  <span className="font-bold text-lg">{activeModalMember.name}</span>
                </div>
              )}
            </div>

            {/* Bottom Bar */}
            <div className="px-4 py-3 bg-[#F8FAFC] dark:bg-[#162238] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                BET-MT Batch 2027 • Group 1
              </span>
              <button
                type="button"
                onClick={() => setActiveModalMember(null)}
                className="px-4 py-1.5 rounded-sm bg-[#16324F] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#0E2135] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
