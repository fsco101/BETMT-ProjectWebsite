import React, { useState } from 'react';

interface ToolPreset {
  name: string;
  baseScfm: number;
  recommendedBar: number;
  description: string;
}

const toolPresets: ToolPreset[] = [
  { name: 'OSHA Safety Blowgun (Chip Clearing)', baseScfm: 12, recommendedBar: 6.2, description: 'Standard machining lathe/mill cleaning' },
  { name: 'CNC Vertical Spindle Purge', baseScfm: 22, recommendedBar: 6.5, description: 'Continuous labyrinth seal & tool taper air purge' },
  { name: 'Pneumatic Die Grinder (Turbine)', baseScfm: 18, recommendedBar: 6.0, description: 'Abrasive wheel finishing at 20,000 RPM' },
  { name: 'CMM Precision Air Bearing', baseScfm: 8.5, recommendedBar: 4.5, description: 'Frictionless granite plate metrology slide' },
  { name: 'Pneumatic Assembly Screwdriver', baseScfm: 15, recommendedBar: 6.0, description: 'Torque-limiting rapid assembly cycle' },
];

export const CalculatorSection: React.FC = () => {
  const [selectedToolIdx, setSelectedToolIdx] = useState(0);
  const [simultaneousUnits, setSimultaneousUnits] = useState(2);
  const [dutyCyclePercent, setDutyCyclePercent] = useState(60);
  const [pipeLengthMeters, setPipeLengthMeters] = useState(35);

  const tool = toolPresets[selectedToolIdx];

  const effectiveScfm = Number((tool.baseScfm * simultaneousUnits * (dutyCyclePercent / 100)).toFixed(1));
  const effectiveLpm = Math.round(effectiveScfm * 28.3168);

  const pressureDropBar = Number(((0.00045 * Math.pow(effectiveScfm, 1.85) * (pipeLengthMeters / 30)) / 10).toFixed(2));
  const pressureDropPsi = Number((pressureDropBar * 14.5038).toFixed(1));

  const requiredHp = Number((effectiveScfm / 4.5).toFixed(1));
  const requiredKw = Number((requiredHp * 0.7457).toFixed(1));

  const isWithinCompressorCapacity = effectiveScfm <= 85;

  return (
    <section id="calculator" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 bg-[#FAF9F5] hairline-t hairline-b">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 hairline-b pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-subtle-ash block mb-2">
              Fluid Dynamics &amp; Station Sizing
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl uppercase tracking-[0.03em] text-charcoal-ink">
              PNEUMATIC LAB SIZING CALCULATOR
            </h2>
          </div>
          <div className="mt-3 sm:mt-0 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-charcoal">
            ISO 1217 / ASME Fluid Power Formulas
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Controls Input Box */}
          <div className="lg:col-span-7 hairline-all bg-[#FAF9F5] p-4 sm:p-8 space-y-5 sm:space-y-6">
            
            {/* Tool Preset Selector */}
            <div>
              <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash block mb-1.5 sm:mb-2 font-medium">
                1. Select Connected Workshop Equipment
              </label>
              <select
                value={selectedToolIdx}
                onChange={(e) => setSelectedToolIdx(parseInt(e.target.value, 10))}
                className="w-full bg-[#FAF9F5] border border-hairline-divider p-2.5 sm:p-3 text-xs text-charcoal-ink focus:outline-none focus:border-charcoal-ink"
              >
                {toolPresets.map((p, idx) => (
                  <option key={idx} value={idx}>
                    {p.name} ({p.baseScfm} SCFM @ {p.recommendedBar} Bar)
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-muted-charcoal font-light block mt-1.5 leading-relaxed">
                {tool.description}
              </span>
            </div>

            {/* Simultaneous Units */}
            <div>
              <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash font-medium">
                  2. Concurrently Operating Drops
                </label>
                <span className="font-editorial text-base sm:text-lg text-charcoal-ink">
                  {simultaneousUnits} {simultaneousUnits === 1 ? 'Station' : 'Stations'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={simultaneousUnits}
                onChange={(e) => setSimultaneousUnits(parseInt(e.target.value, 10))}
                className="w-full accent-charcoal-ink cursor-pointer"
              />
            </div>

            {/* Duty Cycle Percentage */}
            <div>
              <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash font-medium">
                  3. Duty Cycle (Trigger Time)
                </label>
                <span className="font-editorial text-base sm:text-lg text-charcoal-ink">
                  {dutyCyclePercent}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={dutyCyclePercent}
                onChange={(e) => setDutyCyclePercent(parseInt(e.target.value, 10))}
                className="w-full accent-charcoal-ink cursor-pointer"
              />
            </div>

            {/* Pipe Run Length */}
            <div>
              <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash font-medium">
                  4. Distance from Buffer Receiver Tank
                </label>
                <span className="font-editorial text-base sm:text-lg text-charcoal-ink">
                  {pipeLengthMeters} Meters
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={pipeLengthMeters}
                onChange={(e) => setPipeLengthMeters(parseInt(e.target.value, 10))}
                className="w-full accent-charcoal-ink cursor-pointer"
              />
            </div>

          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-5 hairline-all bg-[#FAF9F5] p-4 sm:p-8 space-y-5 sm:space-y-6">
            <div className="hairline-b pb-3 sm:pb-4">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-subtle-ash block mb-1">
                Engineering Output
              </span>
              <h3 className="font-editorial text-lg sm:text-xl uppercase tracking-wider text-charcoal-ink">
                Computed Fluid Parameters
              </h3>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 bg-[#F4F0E8] hairline-all">
                <span className="text-[9px] uppercase tracking-[0.16em] text-subtle-ash block">Total Demand</span>
                <span className="font-editorial text-xl sm:text-2xl text-charcoal-ink mt-1 block">
                  {effectiveScfm} <small className="text-xs font-sans">SCFM</small>
                </span>
                <span className="text-[10px] text-muted-charcoal">({effectiveLpm} L/min)</span>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#F4F0E8] hairline-all">
                <span className="text-[9px] uppercase tracking-[0.16em] text-subtle-ash block">Friction Loss (ΔP)</span>
                <span className="font-editorial text-xl sm:text-2xl text-charcoal-ink mt-1 block">
                  {pressureDropBar} <small className="text-xs font-sans">Bar</small>
                </span>
                <span className="text-[10px] text-muted-charcoal">({pressureDropPsi} PSI drop)</span>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 bg-[#FAF9F5] hairline-all space-y-2 text-xs">
              <div className="flex justify-between items-center text-muted-charcoal">
                <span>Equivalent Compressor Power:</span>
                <strong className="font-medium text-charcoal-ink">{requiredHp} HP / {requiredKw} kW</strong>
              </div>
              <div className="flex justify-between items-center text-muted-charcoal">
                <span>Distribution Manifold Bore:</span>
                <strong className="font-medium text-charcoal-ink">1.0 Inch ISO Blue Ring</strong>
              </div>
              <div className="flex justify-between items-center text-muted-charcoal">
                <span>Recommended Drop Pressure:</span>
                <strong className="font-medium text-charcoal-ink">{tool.recommendedBar} Bar</strong>
              </div>
            </div>

            {/* Compressor Capacity Indicator */}
            <div className={`p-3.5 sm:p-4 border text-xs flex items-start gap-2.5 sm:gap-3 ${
              isWithinCompressorCapacity
                ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                : 'border-red-300 bg-red-50 text-red-950'
            }`}>
              <span className="material-symbols-outlined text-base mt-0.5 shrink-0">
                {isWithinCompressorCapacity ? 'check_circle' : 'warning'}
              </span>
              <div>
                <strong className="block text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold">
                  {isWithinCompressorCapacity ? 'Within Central Compressor Rating' : 'Exceeds Single Compressor Limit'}
                </strong>
                <span className="font-light leading-relaxed block mt-0.5">
                  {isWithinCompressorCapacity
                    ? 'The 15 kW central compressor (85 SCFM baseline) can continuously support this workload with standard duty cycles.'
                    : 'Workload exceeds the 85 SCFM rating of the primary 15 kW compressor. Stagger drop operations or verify receiver buffer volume.'}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
