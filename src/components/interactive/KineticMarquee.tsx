import React from 'react';

interface KineticMarqueeProps {
  label?: string;
}

export const KineticMarquee: React.FC<KineticMarqueeProps> = () => {
  const items = [
    'INTRODUCING THE TEAM',
    'BET-MT BATCH 2027',
    'MECHANICAL & ALLIED DEPARTMENT',
    'GROUP 1 RESEARCHERS',
    'TUP TAGUIG CAMPUS',
    'CENTRALIZED AIR DISTRIBUTION'
  ];

  // Repeat items 4 times to ensure track is significantly wider than viewport
  const trackItems = [...items, ...items, ...items, ...items];

  const StarSeparator = () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0 mx-2"
      aria-hidden="true"
    >
      <path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" />
    </svg>
  );

  return (
    <div className="w-full py-8 sm:py-12 bg-white dark:bg-[#0B132B] overflow-hidden marquee-mask marquee-pause select-none border-y border-slate-200 dark:border-slate-800">
      <div className="flex flex-col gap-3 sm:gap-4">
        
        {/* Row 1: Solid Text Moving Left */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee-left flex items-center whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#16324F] dark:text-white font-sans">
            {trackItems.map((text, idx) => (
              <React.Fragment key={`r1-${idx}`}>
                <span className="shrink-0">{text}</span>
                <StarSeparator />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Row 2: Outlined Text Moving Right (Reverse) */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee-right flex items-center whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-stroke-accent font-sans">
            {trackItems.map((text, idx) => (
              <React.Fragment key={`r2-${idx}`}>
                <span className="shrink-0">{text}</span>
                <StarSeparator />
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
