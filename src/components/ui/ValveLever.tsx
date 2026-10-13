import React from 'react';

interface ValveLeverProps {
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const ValveLever: React.FC<ValveLeverProps> = ({ isOpen, onToggle, disabled }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        title={isOpen ? 'Click to close ball valve (isolate flow)' : 'Click to open ball valve (90° sweep)'}
        className={`relative w-20 h-10 border border-hairline-divider bg-[#FAF9F5] p-1 flex items-center justify-between transition-all ${
          disabled ? 'opacity-40 cursor-not-allowed' : 'hover:border-charcoal-ink cursor-pointer'
        }`}
      >
        {/* Pipe background conduit representation */}
        <div className="absolute inset-x-2 h-1.5 bg-[#DCD7CD] top-1/2 -translate-y-1/2 z-0" />

        {/* Brass Valve Body Hub */}
        <div className="relative z-10 w-4 h-4 rounded-full bg-[#B8860B] border border-charcoal-ink mx-auto flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-charcoal-ink" />
          
          {/* Yellow/Brass Lever Handle (Rotates 0deg for Open, 90deg for Closed) */}
          <div
            className="absolute w-8 h-2.5 bg-[#E6A100] border border-charcoal-ink rounded-xs origin-left left-2 shadow-xs transition-transform duration-300"
            style={{
              transform: isOpen ? 'rotate(0deg)' : 'rotate(90deg)',
              top: '0.5px'
            }}
          />
        </div>

        {/* Status text badge */}
        <span
          className={`relative z-10 text-[9px] uppercase tracking-wider font-semibold px-1 ${
            isOpen ? 'text-emerald-800' : 'text-subtle-ash'
          }`}
        >
          {isOpen ? 'OPEN' : 'SHUT'}
        </span>
      </button>

      <span className="text-[9px] uppercase tracking-wider text-subtle-ash mt-1">
        1/4 Turn Valve
      </span>
    </div>
  );
};
