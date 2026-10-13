import React, { useState } from 'react';
import { dropStations } from '../../data/dropStations';
import { usePneumatics } from '../../context/PneumaticContext';
import { GaugeDial } from '../ui/GaugeDial';
import { ValveLever } from '../ui/ValveLever';

export const DropsSection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const { state, toggleValve, setStationPressure, toggleWhipCheck, toggleToolConnection } = usePneumatics();

  const zones = ['All', 'Zone A', 'Zone B', 'Zone C'];

  const filteredStations = selectedZone === 'All'
    ? dropStations
    : dropStations.filter(s => s.zone === selectedZone);

  return (
    <section id="sorties" className="py-24 sm:py-32 px-6 sm:px-12 bg-[#F1EDE5] hairline-t hairline-b">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-subtle-ash block mb-2">
              Manifold &amp; Drop Routing Map
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl uppercase tracking-[0.03em] text-charcoal-ink">
              DISTRIBUTION NETWORK (6 DROPS)
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 text-[11px] uppercase tracking-[0.18em] text-subtle-ash">
            CAD Schematic: TUPT-MECH-AIR-DWG-002
          </div>
        </div>

        {/* Zone Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b hairline-b pb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-subtle-ash mr-2">Filter Network:</span>
          {zones.map((zone) => (
            <button
              key={zone}
              type="button"
              onClick={() => setSelectedZone(zone)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all border ${
                selectedZone === zone
                  ? 'bg-charcoal-ink text-[#FAF9F5] border-charcoal-ink'
                  : 'bg-[#FAF9F5] text-muted-charcoal border-hairline-divider hover:border-charcoal-ink'
              }`}
            >
              {zone === 'All' ? 'All Outlets (6)' : zone}
            </button>
          ))}
        </div>

        {/* 6 Drops Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="hairline-all bg-[#FAF9F5] p-6 sm:p-7 flex flex-col justify-between group hover:shadow-md transition-all relative"
              >
                <div>
                  
                  {/* Photo Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden hairline-all bg-[#ECE8DF] mb-5">
                    <img
                      src={station.image}
                      alt={station.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-charcoal-ink/80 text-white text-[9px] uppercase tracking-wider px-2 py-0.5">
                      Outlet #0{station.stationNumber}
                    </div>
                    {liveState.isOpen && (
                      <div className="absolute top-2 right-2 bg-emerald-800 text-white text-[9px] uppercase tracking-wider px-2 py-0.5 animate-pulse">
                        Flow Active ({liveState.scfmDemand} SCFM)
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-subtle-ash block mb-1">
                    {station.zoneLabel}
                  </span>
                  <h3 className="font-editorial text-xl uppercase text-charcoal-ink mb-2">
                    {station.name}
                  </h3>
                  <p className="text-xs text-muted-charcoal font-light leading-relaxed mb-4">
                    {station.description}
                  </p>

                  {/* Machine Tool Specs */}
                  <div className="space-y-1.5 text-[11px] text-muted-charcoal font-light bg-[#F4F0E8] p-3.5 hairline-all mb-4">
                    <div><strong className="font-medium text-charcoal-ink">Valve:</strong> {station.valveType}</div>
                    <div><strong className="font-medium text-charcoal-ink">Coupling:</strong> {station.couplingType}</div>
                    <div><strong className="font-medium text-charcoal-ink">Service:</strong> {station.connectedEquipment}</div>
                  </div>

                  {/* Interactive Digital Twin Controls */}
                  <div className="p-4 bg-[#FAF9F5] border border-hairline-divider space-y-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-subtle-ash font-medium pb-2 border-b hairline-b flex items-center justify-between">
                      <span>Station Telemetry &amp; Controls</span>
                      <span className={liveState.isOpen ? 'text-emerald-800 font-semibold' : 'text-subtle-ash'}>
                        {liveState.isOpen ? 'LIVE STREAMING' : 'ISOLATED'}
                      </span>
                    </div>

                    {/* Gauges & Valve Lever row */}
                    <div className="flex items-center justify-around gap-4 pt-1">
                      <GaugeDial
                        currentPressureBar={liveState.actualPressureBar}
                        nominalPressureBar={station.nominalPressureBar}
                        size={100}
                      />
                      <ValveLever
                        isOpen={liveState.isOpen}
                        onToggle={() => toggleValve(station.id)}
                        disabled={state.isEmergencyDepressurized}
                      />
                    </div>

                    {/* Local Regulator Pressure Slider */}
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-[10px] text-muted-charcoal">
                        <span>Station Dial Regulator:</span>
                        <strong className="font-medium text-charcoal-ink">
                          {liveState.regulatorBar.toFixed(1)} Bar
                        </strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="8"
                        step="0.1"
                        value={liveState.regulatorBar}
                        onChange={(e) => setStationPressure(station.id, parseFloat(e.target.value))}
                        disabled={state.isEmergencyDepressurized}
                        className="w-full accent-charcoal-ink cursor-pointer"
                      />
                    </div>

                    {/* Safety Whip-Check & Quick Coupler Toggles */}
                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => toggleWhipCheck(station.id)}
                        className={`px-2 py-1 border transition-colors ${
                          liveState.whipCheckEngaged
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-red-50 text-accent-crimson border-red-300'
                        }`}
                        title="Toggle safety whip-check cable engagement"
                      >
                        {liveState.whipCheckEngaged ? 'Whip Check ✓' : 'Whip Check OFF ⚠'}
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleToolConnection(station.id)}
                        className={`px-2 py-1 border transition-colors ${
                          liveState.toolConnected
                            ? 'bg-slate-100 text-charcoal-ink border-hairline-divider'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                        title="Toggle tool quick disconnect fitting"
                      >
                        {liveState.toolConnected ? 'Tool Plug Locked' : 'Tool Disconnected'}
                      </button>
                    </div>

                  </div>

                </div>

                {/* Footer Sub-Manifold isolation */}
                <div className="mt-6 pt-4 hairline-t text-[10px] uppercase tracking-[0.16em] text-subtle-ash flex justify-between">
                  <span>Isolation</span>
                  <span className="text-charcoal-ink font-medium">{station.isolationManifold}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
