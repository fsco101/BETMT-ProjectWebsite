import React from 'react';
import { studyOverviewData, researchTeamMembers } from '../../data/aboutData';

interface AboutPageProps {
  onBackToManual: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToManual }) => {
  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-[#121214] text-[#1C1B1A] dark:text-gray-100 pb-24 transition-colors duration-300">
      
      {/* 1. Page Header Bar & Back Navigation */}
      <section className="hairline-b bg-[#FAF9F5] dark:bg-[#18181B] sticky top-[61px] sm:top-[69px] z-30 px-4 sm:px-8 lg:px-12 py-3 backdrop-blur-md">
        <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-subtle-ash dark:text-gray-400">
            <span>Group 1 - Batch 2023-2027</span>
            <span>/</span>
            <span>MAAD Studies</span>
            <span>/</span>
            <span className="text-charcoal-ink dark:text-gray-200 font-medium">Research Team &amp; Credits</span>
          </div>

          <button
            type="button"
            onClick={onBackToManual}
            className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-medium px-3.5 py-1.5 border border-charcoal-ink/30 dark:border-gray-600 bg-[#F7F5F0] dark:bg-[#202024] text-charcoal-ink dark:text-gray-200 hover:bg-charcoal-ink hover:text-white dark:hover:bg-gray-100 dark:hover:text-black transition-all group cursor-pointer"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            <span>Return to Operational Manual</span>
          </button>
        </div>
      </section>

      {/* 2. Hero Header */}
      <section className="px-4 sm:px-8 lg:px-12 pt-10 sm:pt-16 pb-12 sm:pb-16 hairline-b">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-accent-crimson dark:text-rose-400 font-semibold px-2.5 py-1 border border-accent-crimson/30 dark:border-accent-crimson/50 bg-accent-crimson/5 dark:bg-rose-950/30">
              Academic Study &amp; System Credits
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-subtle-ash dark:text-gray-400 px-2.5 py-1 border border-hairline-divider bg-white/50 dark:bg-[#1E1E22]">
              {studyOverviewData.academicYear}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-subtle-ash dark:text-gray-400 px-2.5 py-1 border border-hairline-divider bg-white/50 dark:bg-[#1E1E22]">
              Group 1 - Batch 2023-2027
            </span>
          </div>

          <h1 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-6xl text-charcoal-ink dark:text-gray-100 uppercase tracking-tight leading-[1.08]">
            {studyOverviewData.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-charcoal dark:text-gray-300 max-w-3xl font-light leading-relaxed">
            {studyOverviewData.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap gap-y-2 gap-x-6 text-xs text-subtle-ash dark:text-gray-400 border-t border-hairline-divider/60 pt-4">
            <div>
              <span className="uppercase tracking-[0.16em] block text-[9px] text-muted-charcoal dark:text-gray-400">Department</span>
              <strong className="text-charcoal-ink dark:text-gray-200 font-medium">{studyOverviewData.department}</strong>
            </div>
            <div>
              <span className="uppercase tracking-[0.16em] block text-[9px] text-muted-charcoal dark:text-gray-400">Institution</span>
              <strong className="text-charcoal-ink dark:text-gray-200 font-medium">{studyOverviewData.institution}</strong>
            </div>
            <div>
              <span className="uppercase tracking-[0.16em] block text-[9px] text-muted-charcoal dark:text-gray-400">Operating Standard</span>
              <strong className="text-charcoal-ink dark:text-gray-200 font-medium">DOLE / OSHA 30 PSI Safe Cleaning Protocol</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Study Abstract & Engineering Rationale */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 sm:py-16 hairline-b bg-white/40 dark:bg-black/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Abstract & Context */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent-crimson dark:text-rose-400 font-medium">
                Research Monograph
              </span>
              <h2 className="font-sans font-bold text-2xl sm:text-3xl text-charcoal-ink dark:text-gray-100 uppercase tracking-tight">
                Executive Abstract &amp; Background
              </h2>
            </div>
            
            <p className="text-sm sm:text-base text-charcoal-ink/80 dark:text-gray-300 leading-relaxed font-light text-justify">
              {studyOverviewData.abstract}
            </p>

            <div className="p-5 border-l-2 border-charcoal-ink dark:border-emerald-500 bg-[#FAF9F5] dark:bg-[#18181B] space-y-2 mt-4">
              <h3 className="text-xs uppercase tracking-[0.18em] font-medium text-charcoal-ink dark:text-gray-200">
                Engineering Rationale
              </h3>
              <p className="text-xs sm:text-sm text-muted-charcoal dark:text-gray-300 leading-relaxed font-light">
                {studyOverviewData.backgroundRationale}
              </p>
            </div>
          </div>

          {/* Right Column: Key Study Innovations */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-subtle-ash dark:text-gray-400 font-medium block">
              Core Study Impacts
            </span>
            <div className="border border-hairline-divider bg-[#FAF9F5] dark:bg-[#18181B] p-5 sm:p-6 space-y-4">
              <h3 className="font-sans font-bold text-base sm:text-lg text-charcoal-ink dark:text-gray-100 uppercase tracking-tight pb-2 border-b border-hairline-divider">
                Laboratory Modernization Benchmarks
              </h3>
              <ul className="space-y-3">
                {studyOverviewData.significance.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-charcoal-ink/85 dark:text-gray-300 leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-charcoal-ink/10 dark:bg-white/10 text-charcoal-ink dark:text-gray-200 text-[9px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
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

      {/* 4. Research Objectives Grid */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 sm:py-16 hairline-b">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="max-w-xl space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-subtle-ash dark:text-gray-400 font-medium">
              Formulation of Scope
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-charcoal-ink dark:text-gray-100 uppercase tracking-tight">
              Specific Study Objectives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {studyOverviewData.objectives.map((obj, i) => (
              <div
                key={obj.id}
                className="p-6 border border-hairline-divider bg-[#FAF9F5] dark:bg-[#18181B] hover:border-charcoal-ink dark:hover:border-gray-500 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl sm:text-2xl text-accent-crimson dark:text-rose-400 font-bold">
                      0{i + 1}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.16em] px-2 py-0.5 border border-hairline-divider text-subtle-ash dark:text-gray-400">
                      Milestone
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-base sm:text-lg text-charcoal-ink dark:text-gray-100 uppercase tracking-tight">
                    {obj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-charcoal dark:text-gray-300 leading-relaxed font-light">
                    {obj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Methodology & Engineering Phases */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 sm:py-16 hairline-b bg-white/40 dark:bg-black/20">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="max-w-xl space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-subtle-ash dark:text-gray-400 font-medium">
              Technical Execution
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-charcoal-ink dark:text-gray-100 uppercase tracking-tight">
              Project Methodology &amp; Development Stages
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {studyOverviewData.methodology.map((m) => (
              <div
                key={m.step}
                className="p-5 border border-hairline-divider bg-[#FAF9F5] dark:bg-[#18181B] flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs font-semibold text-accent-crimson dark:text-rose-400">
                    STAGE {m.step}
                  </span>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-charcoal-ink dark:text-gray-100 leading-snug uppercase tracking-tight">
                    {m.title}
                  </h4>
                </div>
                <p className="text-[11px] sm:text-xs text-muted-charcoal dark:text-gray-300 leading-relaxed font-light">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Research Team & Student Credits */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 sm:py-20 hairline-b" id="research-team">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-hairline-divider">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.22em] text-accent-crimson dark:text-rose-400 font-medium">
                Research Group Acknowledgments
              </span>
              <h2 className="font-sans font-extrabold text-2xl sm:text-4xl text-charcoal-ink dark:text-gray-100 uppercase tracking-tight">
                Project Researchers &amp; Engineering Team
              </h2>
              <p className="text-xs sm:text-sm text-muted-charcoal dark:text-gray-300 max-w-2xl font-light">
                Giving proper attribution and recognition to the student engineering group who conceptualized, fabricated, and documented this centralized air distribution system.
              </p>
            </div>

            <div className="shrink-0">
              <span className="text-[10px] uppercase tracking-[0.16em] px-3 py-1.5 bg-[#FAF9F5] dark:bg-[#18181B] border border-hairline-divider text-charcoal-ink dark:text-gray-200 font-medium">
                5 Active Contributors
              </span>
            </div>
          </div>

          {/* Team Member Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchTeamMembers.map((member) => (
              <div
                key={member.id}
                className="border border-hairline-divider bg-[#FAF9F5] dark:bg-[#18181B] p-6 flex flex-col justify-between space-y-6 hover:border-charcoal-ink/80 dark:hover:border-gray-500 transition-all shadow-sm"
              >
                <div className="space-y-4">
                  
                  {/* Avatar / Profile Graphic */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border border-charcoal-ink/20 dark:border-gray-700 bg-[#F0EBE1] dark:bg-[#27272A] flex items-center justify-center text-charcoal-ink dark:text-gray-100 font-sans font-bold text-lg shrink-0">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base sm:text-lg text-charcoal-ink dark:text-gray-100 leading-tight tracking-tight uppercase">
                        {member.name}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-accent-crimson dark:text-rose-400 font-semibold mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-[10px] text-subtle-ash dark:text-gray-400 mt-0.5">
                        {member.program}
                      </p>
                    </div>
                  </div>

                  {/* Contributions */}
                  <div className="space-y-2 pt-2 border-t border-hairline-divider/60">
                    <span className="text-[9px] uppercase tracking-[0.16em] text-subtle-ash dark:text-gray-400 font-medium block">
                      Core Contributions &amp; Role
                    </span>
                    <ul className="space-y-1.5">
                      {member.contributions.map((c, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-charcoal-ink/80 dark:text-gray-300 font-light leading-relaxed">
                          <span className="text-subtle-ash dark:text-gray-500 text-[10px] mt-0.5">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                <div className="pt-3 border-t border-hairline-divider/40 flex items-center justify-between text-[10px] text-subtle-ash dark:text-gray-400">
                  <span>{member.institution}</span>
                  <span className="font-mono text-[9px] text-muted-charcoal dark:text-gray-400">GRP1-2023-2027</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice Banner for Team Name Personalization */}
          <div className="p-4 border border-dashed border-hairline-divider bg-white/60 dark:bg-[#18181B] dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-charcoal dark:text-gray-300">
            <div className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-accent-crimson dark:text-rose-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>
                Want to update these profile names or photos? Edit <code className="font-mono text-[11px] bg-[#EFECE6] dark:bg-[#27272A] text-charcoal-ink dark:text-gray-200 px-1 py-0.5">src/data/aboutData.ts</code> at any time.
              </span>
            </div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[10px] uppercase tracking-[0.16em] text-charcoal-ink dark:text-gray-200 underline shrink-0 hover:text-accent-crimson dark:hover:text-rose-400 cursor-pointer"
            >
              Back to Top ↑
            </a>
          </div>

        </div>
      </section>

      {/* 7. Institutional Credits & Faculty Advisers */}
      <section className="px-4 sm:px-8 lg:px-12 py-12 sm:py-16 hairline-b bg-white/40 dark:bg-black/20">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-subtle-ash dark:text-gray-400 font-medium">
              Academic Supervision
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-charcoal-ink dark:text-gray-100 uppercase tracking-tight">
              Advisers &amp; Technical Consultants
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyOverviewData.advisers.map((adv, idx) => (
              <div
                key={idx}
                className="p-6 border border-hairline-divider bg-[#FAF9F5] dark:bg-[#18181B] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.16em] text-accent-crimson dark:text-rose-400 font-medium">
                    {adv.role}
                  </span>
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-charcoal-ink dark:text-gray-100 uppercase tracking-tight">
                    {adv.name}
                  </h3>
                  <p className="text-xs text-muted-charcoal dark:text-gray-300 font-light">
                    {adv.title}
                  </p>
                  <p className="text-[11px] text-subtle-ash dark:text-gray-400">
                    {adv.department}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Bottom Action Banner: Back to Operational Manual */}
      <section className="px-4 sm:px-8 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6 p-8 sm:p-12 border border-charcoal-ink dark:border-gray-700 bg-[#FAF9F5] dark:bg-[#18181B]">
          <span className="text-[10px] uppercase tracking-[0.22em] text-accent-crimson dark:text-rose-400 font-medium block">
            System Operations &amp; Interactive Digital Twin
          </span>
          <h2 className="font-sans font-bold text-2xl sm:text-4xl text-charcoal-ink dark:text-gray-100 uppercase tracking-tight">
            Ready to explore the Centralized Air Distribution Manual?
          </h2>
          <p className="text-xs sm:text-sm text-muted-charcoal dark:text-gray-300 max-w-xl mx-auto font-light leading-relaxed">
            Access the complete 7-stage pneumatic circuit, safety DOs and DONTs, 15-step startup/shutdown procedure, 6 workshop drop stations, and video demonstration.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onBackToManual}
              className="px-6 py-3 bg-charcoal-ink hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Access Operational Manual</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
