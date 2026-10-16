import React, { useState } from 'react';
import { dropStations } from '../../data/dropStations';
import { usePneumatics } from '../../context/PneumaticContext';
import { GaugeDial } from '../ui/GaugeDial';
import { ValveLever } from '../ui/ValveLever';

export const DropsSection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const { state, toggleValve, setStationPressure } = usePneumatics();

  const zones = ['All', 'Workshop Area', 'CNC Area', 'Advance Machining Area'];

  const filteredStations = selectedZone === 'All'
    ? dropStations
    : dropStations.filter(s => s.zone === selectedZone);

  return (
    <section id="air-outlets" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 bg-[#F1EDE5] hairline-t hairline-b">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - DISTRIBUTION NETWORK (6 DROPS) Changed to AIR OUTLETS */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 pb-6 hairline-b">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-subtle-ash block mb-2 font-medium">
              DISTRIBUTION OUTLETS
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl uppercase tracking-[0.03em] text-charcoal-ink">
              AIR OUTLETS
            </h2>
          </div>
          <div className="mt-3 sm:mt-0 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-charcoal">
            Mechanical &amp; Allied Workshop Drops (6 Stations)
          </div>
        </div>

        {/* Filter Network Tabs: ALL OUTLET (6) | WORKSHOP AREA | CNC AREA | ADVANCE MACHINING AREA */}
        <div className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10 pb-4">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-subtle-ash mr-1 sm:mr-2">Filter Network:</span>
          {zones.map((zone) => (
            <button
              key={zone}
              type="button"
              onClick={() => setSelectedZone(zone)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-all border font-medium ${
                selectedZone === zone
                  ? 'bg-charcoal-ink text-[#FAF9F5] border-charcoal-ink'
                  : 'bg-[#FAF9F5] text-muted-charcoal border-hairline-divider hover:border-charcoal-ink'
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

            return (
              <div
                key={station.id}
                className="hairline-all bg-[#FAF9F5] p-5 sm:p-7 flex flex-col justify-between group hover:shadow-md transition-all relative"
              >
                <div>
                  {/* Photo Frame with Actual Lab Photos */}
                  <div className="relative aspect-[4/3] overflow-hidden hairline-all bg-[#ECE8DF] mb-4 sm:mb-5">
                    <img
                      src={station.image}
                      alt={station.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-charcoal-ink/85 text-white text-[9px] uppercase tracking-wider px-2.5 py-0.5 font-medium">
                      {station.name}
                    </div>
                    {liveState.isOpen && (
                      <div className="absolute top-2 right-2 bg-emerald-800 text-white text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 animate-pulse">
                        Active ({liveState.scfmDemand} SCFM)
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-editorial text-xl sm:text-2xl uppercase tracking-wider text-charcoal-ink mb-3">
                    {station.name}
                  </h3>

                  {/* Box Content matching docx requirements */}
                  <div className="bg-[#F4F0E8] p-4 border border-hairline-divider space-y-2 mb-5">
                    <div className="flex justify-between items-baseline text-xs pb-1.5 border-b border-hairline-divider/60">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-subtle-ash font-medium">AREA:</span>
                      <strong className="text-charcoal-ink font-semibold">{station.area}</strong>
                    </div>
                    <div className="flex justify-between items-baseline text-xs pb-1.5 border-b border-hairline-divider/60">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-subtle-ash font-medium">REQUIRED PSI:</span>
                      <strong className="text-charcoal-ink font-semibold">{station.requiredPsi}</strong>
                    </div>
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-subtle-ash font-medium">USE:</span>
                      <strong className="text-charcoal-ink font-semibold">{station.use}</strong>
                    </div>
                  </div>

                  {/* Interactive Controls & Gauges */}
                  <div className="hairline-t pt-4 grid grid-cols-2 gap-4 items-center mb-4">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] uppercase tracking-[0.18em] text-subtle-ash mb-1">
                        Supply Valve
                      </span>
                      <ValveLever
                        isOpen={liveState.isOpen}
                        disabled={state.isEmergencyDepressurized}
                        onToggle={() => toggleValve(station.id)}
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[9px] uppercase tracking-[0.18em] text-subtle-ash mb-1">
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
                    <div className="mt-3 p-2.5 bg-white border border-hairline-divider">
                      <div className="flex justify-between text-[9px] uppercase tracking-wider text-subtle-ash mb-1">
                        <span>Regulator Setting</span>
                        <span className="font-semibold text-charcoal-ink">{liveState.regulatorBar.toFixed(1)} Bar</span>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max={station.maxPressureBar}
                        step="0.1"
                        value={liveState.regulatorBar}
                        onChange={(e) => setStationPressure(station.id, parseFloat(e.target.value))}
                        className="w-full accent-charcoal-ink h-1 cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                {/* Connection Specs Footer */}
                <div className="mt-4 pt-3 hairline-t text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-subtle-ash flex justify-between items-center">
                  <span>{station.valveType}</span>
                  <span className="text-emerald-800 font-medium">Ready</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
