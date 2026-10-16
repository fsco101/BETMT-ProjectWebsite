import React, { useState } from 'react';
import { dropStations } from '../../data/dropStations';
import { usePneumatics } from '../../context/PneumaticContext';
import { useLightbox } from '../../context/LightboxContext';
import { GaugeDial } from '../ui/GaugeDial';
import { ValveLever } from '../ui/ValveLever';

export const DropsSection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const { state, toggleValve, setStationPressure } = usePneumatics();
  const { openLightbox } = useLightbox();

  const zones = ['All', 'Workshop Area', 'CNC Area', 'Advance Machining Area'];

  const filteredStations = selectedZone === 'All'
    ? dropStations
    : dropStations.filter(s => s.zone === selectedZone);

  return (
    <section id="air-outlets" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 bg-[#F1EDE5] dark:bg-[#121214] hairline-t hairline-b transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - AIR OUTLETS with standardized industrial sans font */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 pb-6 hairline-b">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-subtle-ash dark:text-gray-400 block mb-2 font-medium">
              DISTRIBUTION OUTLETS
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-charcoal-ink dark:text-gray-100">
              AIR OUTLETS
            </h2>
          </div>
          <div className="mt-3 sm:mt-0 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-charcoal dark:text-gray-400">
            Mechanical &amp; Allied Workshop Drops (6 Stations)
          </div>
        </div>

        {/* Filter Network Tabs: ALL OUTLET (6) | WORKSHOP AREA | CNC AREA | ADVANCE MACHINING AREA */}
        <div className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10 pb-4">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-subtle-ash dark:text-gray-400 mr-1 sm:mr-2">Filter Network:</span>
          {zones.map((zone) => (
            <button
              key={zone}
              type="button"
              onClick={() => setSelectedZone(zone)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-all border font-medium cursor-pointer ${
                selectedZone === zone
                  ? 'bg-charcoal-ink text-[#FAF9F5] border-charcoal-ink dark:bg-emerald-600 dark:border-emerald-500 dark:text-white'
                  : 'bg-[#FAF9F5] dark:bg-[#1E1E22] text-muted-charcoal dark:text-gray-300 border-hairline-divider hover:border-charcoal-ink dark:hover:border-gray-500'
              }`}
            >
              {zone === 'All' ? 'ALL OUTLET (6)' : zone}
            </button>
          ))}
        </div>

        {/* 6 Outlets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredStations.map((station) => {
            const liveState = state.stations[station.id] || {
              isOpen: false,
              regulatorBar: station.nominalPressureBar,
              actualPressureBar: 0,
              scfmDemand: 0,
              whipCheckEngaged: true,
              toolConnected: true,
            };

            const isOverPressure = liveState.regulatorBar > station.nominalPressureBar;

            return (
              <div
                key={station.id}
                className="hairline-all bg-[#FAF9F5] dark:bg-[#18181B] p-5 sm:p-7 flex flex-col justify-between group hover:shadow-md transition-all relative"
              >
                <div>
                  {/* Photo Frame with Actual Lab Photos */}
                  <div
                    onClick={() =>
                      openLightbox(
                        station.image,
                        0,
                        `${station.name} (${station.area})`,
                        `Required Pressure: ${station.requiredPsi} (${station.nominalPressureBar} Bar nominal). Designated use: ${station.use}. Fitted with ${station.valveType}.`
                      )
                    }
                    className="relative aspect-[4/3] overflow-hidden hairline-all bg-[#ECE8DF] dark:bg-[#27272A] mb-4 sm:mb-5 group/img cursor-zoom-in"
                    title="Click to view full uncropped lab photo"
                  >
                    <img
                      src={station.image}
                      alt={station.name}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-charcoal-ink/85 dark:bg-black/80 text-white text-[9px] uppercase tracking-wider px-2.5 py-0.5 font-medium">
                      {station.name}
                    </div>
                    {liveState.isOpen && (
                      <div className="absolute top-2 right-2 bg-emerald-800 dark:bg-emerald-600 text-white text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 animate-pulse">
                        Active ({liveState.scfmDemand} SCFM)
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/25 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover/img:opacity-100 bg-black/80 text-white text-[9px] uppercase tracking-wider px-2.5 py-1 transition-opacity border border-white/20 shadow-xs flex items-center gap-1.5">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                        <span>View Photo</span>
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-lg sm:text-xl uppercase tracking-tight text-charcoal-ink dark:text-gray-100 mb-3">
                    {station.name}
                  </h3>

                  {/* Box Content matching docx requirements */}
                  <div className="bg-[#F4F0E8] dark:bg-[#202024] p-4 border border-hairline-divider space-y-2 mb-4">
                    <div className="flex justify-between items-baseline text-xs pb-1.5 border-b border-hairline-divider/60">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-subtle-ash dark:text-gray-400 font-medium">AREA:</span>
                      <strong className="text-charcoal-ink dark:text-gray-200 font-semibold">{station.area}</strong>
                    </div>
                    <div className="flex justify-between items-baseline text-xs pb-1.5 border-b border-hairline-divider/60">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-subtle-ash dark:text-gray-400 font-medium">REQUIRED PSI:</span>
                      <strong className="text-charcoal-ink dark:text-gray-200 font-semibold">{station.requiredPsi}</strong>
                    </div>
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-subtle-ash dark:text-gray-400 font-medium">USE:</span>
                      <strong className="text-charcoal-ink dark:text-gray-200 font-semibold">{station.use}</strong>
                    </div>
                  </div>

                  {/* Warning Banner when value exceeds recommended */}
                  {isOverPressure && (
                    <div className="mb-4 px-3 py-2 bg-amber-500/15 dark:bg-amber-950/40 border border-amber-600/40 dark:border-amber-500/50 rounded-xs flex items-center justify-between gap-2 animate-pulse">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-800 dark:text-amber-300 truncate">
                          EXCEEDS RECOMMENDED ({station.nominalPressureBar.toFixed(1)} Bar)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStationPressure(station.id, station.nominalPressureBar)}
                        className="px-2 py-0.5 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white text-[9px] font-bold uppercase tracking-wider rounded-xs cursor-pointer flex-shrink-0 transition-colors"
                        title="Reset pressure to recommended nominal setting"
                      >
                        Reset
                      </button>
                    </div>
                  )}

                  {/* Interactive Controls & Gauges */}
                  <div className="hairline-t pt-4 grid grid-cols-2 gap-4 items-center mb-4">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] uppercase tracking-[0.18em] text-subtle-ash dark:text-gray-400 mb-1">
                        Supply Valve
                      </span>
                      <ValveLever
                        isOpen={liveState.isOpen}
                        disabled={state.isEmergencyDepressurized}
                        warning={isOverPressure}
                        onToggle={() => toggleValve(station.id)}
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[9px] uppercase tracking-[0.18em] text-subtle-ash dark:text-gray-400 mb-1">
                        Downstream Pressure
                      </span>
                      <GaugeDial
                        pressureBar={liveState.actualPressureBar}
                        maxBar={8.0}
                        nominalBar={station.nominalPressureBar}
                        label="BAR"
                      />
                    </div>
                  </div>

                  {/* Pressure Slider (when valve is open) */}
                  {liveState.isOpen && !state.isEmergencyDepressurized && (
                    <div className={`mt-3 p-3 border transition-colors ${
                      isOverPressure
                        ? 'bg-amber-500/10 dark:bg-amber-950/20 border-amber-500/40'
                        : 'bg-white dark:bg-[#202024] border-hairline-divider'
                    }`}>
                      <div className="flex justify-between items-center text-[9px] uppercase tracking-wider mb-1.5">
                        <span className="text-subtle-ash dark:text-gray-400">Regulator Setting</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${isOverPressure ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-charcoal-ink dark:text-gray-200'}`}>
                            {liveState.regulatorBar.toFixed(1)} Bar
                          </span>
                          {isOverPressure && (
                            <button
                              type="button"
                              onClick={() => setStationPressure(station.id, station.nominalPressureBar)}
                              className="text-[9px] underline text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 uppercase font-semibold cursor-pointer"
                            >
                              ↺ Reset
                            </button>
                          )}
                        </div>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max={station.maxPressureBar}
                        step="0.1"
                        value={liveState.regulatorBar}
                        onChange={(e) => setStationPressure(station.id, parseFloat(e.target.value))}
                        className="w-full accent-charcoal-ink dark:accent-emerald-500 h-1 cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] text-subtle-ash dark:text-gray-400 mt-1 font-mono">
                        <span>Min 1.0</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">Nominal {station.nominalPressureBar.toFixed(1)} Bar</span>
                        <span>Max {station.maxPressureBar.toFixed(1)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Connection Specs Footer */}
                <div className="mt-4 pt-3 hairline-t text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-subtle-ash dark:text-gray-400 flex justify-between items-center">
                  <span>{station.valveType}</span>
                  <span className="text-emerald-800 dark:text-emerald-400 font-medium">Ready</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
