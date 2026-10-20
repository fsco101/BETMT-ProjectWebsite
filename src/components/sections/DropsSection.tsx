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
    <section id="air-outlets" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 bg-[#F1F5F9] dark:bg-[#0B132B] hairline-t hairline-b transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-6 border-b border-slate-300 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-xs bg-[#FEF3C7] dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-300 text-[10px] uppercase tracking-wider font-bold mb-2">
              <span>Branch Distribution Architecture: 1/2" Pipe Drops</span>
            </div>
            <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#16324F] dark:text-white">
              AIR OUTLETS
            </h2>
          </div>
          <div className="mt-3 sm:mt-0 text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-medium">
            Note: All branch lines are <strong>1/2-inch</strong> connected in parallel to the 1-inch main line
          </div>
        </div>

        {/* Filter Network Tabs (BrewedOps Motion Pill Style) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mr-1">
            Filter Stations:
          </span>
          {zones.map((zone) => (
            <button
              key={zone}
              type="button"
              onClick={() => setSelectedZone(zone)}
              className={`motion-press px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all border cursor-pointer ${
                selectedZone === zone
                  ? 'bg-[#16324F] text-white border-[#16324F] dark:bg-sky-500 dark:border-sky-400 shadow-2xs'
                  : 'bg-white dark:bg-[#162238] text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-[#16324F]'
              }`}
            >
              {zone === 'All' ? 'ALL OUTLETS (6)' : zone}
            </button>
          ))}
        </div>

        {/* 6 Outlets Grid - Strict 1:1 Aspect Ratio Proportional Frames */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
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
                className="motion-card rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E2135] p-5 sm:p-6 flex flex-col justify-between group shadow-xs hover:border-[#16324F] dark:hover:border-sky-400 transition-all relative"
              >
                <div>
                  {/* Photo Frame - Exact 1:1 Square Proportional Aspect Ratio matching source photos */}
                  <div
                    onClick={() =>
                      openLightbox(
                        station.image,
                        0,
                        `${station.name} (${station.area})`,
                        `Branch Pipe: 1/2". Required Pressure: ${station.requiredPsi} (${station.nominalPressureBar} Bar nominal). Designated use: ${station.use}. Fitted with ${station.valveType}.`
                      )
                    }
                    className="relative aspect-square overflow-hidden rounded-sm bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 mb-4 group/img cursor-zoom-in"
                    title="Click to view full uncropped lab photo"
                  >
                    <img
                      src={station.image}
                      alt={station.name}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-2 left-2 bg-[#16324F]/90 text-white text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-xs font-semibold backdrop-blur-xs">
                      {station.name}
                    </div>

                    <div className="absolute bottom-2 left-2 bg-amber-500 text-slate-950 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-bold">
                      1/2" Branch Line
                    </div>

                    {liveState.isOpen && (
                      <div className="absolute top-2 right-2 bg-emerald-700 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold animate-pulse">
                        Active ({liveState.scfmDemand} SCFM)
                      </div>
                    )}

                    <div className="absolute inset-0 bg-[#16324F]/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-black/80 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xs flex items-center gap-1 shadow-sm">
                        <span>🔍</span>
                        <span>Zoom Photo</span>
                      </span>
                    </div>
                  </div>

                  {/* Station Title */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-sans font-bold text-lg uppercase tracking-tight text-[#16324F] dark:text-white">
                      {station.name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                      Station 0{station.stationNumber}
                    </span>
                  </div>

                  {/* Specification Table Box matching docx requirements */}
                  <div className="bg-[#F8FAFC] dark:bg-[#162238] p-3.5 rounded-sm border border-slate-200 dark:border-slate-800 space-y-2 mb-4 font-normal">
                    <div className="flex justify-between items-baseline text-xs pb-1 border-b border-slate-200 dark:border-slate-700/60">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">AREA:</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-semibold">{station.area}</strong>
                    </div>
                    <div className="flex justify-between items-baseline text-xs pb-1 border-b border-slate-200 dark:border-slate-700/60">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">PIPE SPEC:</span>
                      <strong className="text-amber-600 dark:text-amber-400 font-bold">1/2" Branch Line</strong>
                    </div>
                    <div className="flex justify-between items-baseline text-xs pb-1 border-b border-slate-200 dark:border-slate-700/60">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">REQUIRED PSI:</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-semibold font-mono">{station.requiredPsi}</strong>
                    </div>
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">USE:</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-semibold">{station.use}</strong>
                    </div>
                  </div>

                  {/* Warning Banner when value exceeds recommended */}
                  {isOverPressure && (
                    <div className="mb-4 px-3 py-2 bg-amber-500/15 dark:bg-amber-950/40 border border-amber-500/50 rounded-xs flex items-center justify-between gap-2 animate-pulse">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[10px] font-mono font-bold text-amber-900 dark:text-amber-300 truncate">
                          EXCEEDS NOMINAL ({station.nominalPressureBar.toFixed(1)} Bar)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStationPressure(station.id, station.nominalPressureBar)}
                        className="px-2 py-0.5 bg-amber-600 hover:bg-amber-700 text-white text-[9px] font-bold uppercase rounded-xs cursor-pointer shrink-0 transition-colors"
                        title="Reset pressure to recommended nominal setting"
                      >
                        Reset
                      </button>
                    </div>
                  )}

                  {/* Interactive Controls & Gauges */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4 items-center mb-4">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-semibold">
                        Supply Valve
                      </span>
                      <ValveLever
                        isOpen={liveState.isOpen}
                        warning={isOverPressure}
                        onToggle={() => toggleValve(station.id)}
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-semibold">
                        Regulated Pressure
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
                  {liveState.isOpen && (
                    <div className="mt-2 p-3 rounded-sm border bg-[#F8FAFC] dark:bg-[#162238] border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-wider mb-1.5">
                        <span className="text-slate-500 dark:text-slate-400 font-semibold">Regulator Setting:</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold font-mono ${isOverPressure ? 'text-amber-600 dark:text-amber-400' : 'text-[#16324F] dark:text-white'}`}>
                            {liveState.regulatorBar.toFixed(1)} Bar ({(liveState.regulatorBar * 14.5).toFixed(0)} PSI)
                          </span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max={station.maxPressureBar}
                        step="0.1"
                        value={liveState.regulatorBar}
                        onChange={(e) => setStationPressure(station.id, parseFloat(e.target.value))}
                        className="w-full accent-[#16324F] dark:accent-sky-400 h-1.5 cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                        <span>Min 1.0</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">Nominal {station.nominalPressureBar.toFixed(1)} Bar</span>
                        <span>Max {station.maxPressureBar.toFixed(1)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Connection Specs Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 flex justify-between items-center font-mono">
                  <span className="truncate pr-2">{station.valveType}</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">1/2" Line Ready</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
