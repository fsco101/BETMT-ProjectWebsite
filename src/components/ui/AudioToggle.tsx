import React from 'react';
import { usePneumatics } from '../../context/PneumaticContext';

export const AudioToggle: React.FC = () => {
  const { state, toggleAudio } = usePneumatics();

  return (
    <button
      type="button"
      onClick={toggleAudio}
      title={state.audioEnabled ? 'Mute pneumatic sound effects' : 'Enable pneumatic sound effects'}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] border border-charcoal-ink/30 hover:border-charcoal-ink transition-colors bg-[#F7F5F0]"
    >
      <span className="material-symbols-outlined text-[14px]">
        {state.audioEnabled ? 'volume_up' : 'volume_off'}
      </span>
      <span className="hidden sm:inline">
        {state.audioEnabled ? 'Audio On' : 'Audio Muted'}
      </span>
    </button>
  );
};
