import React, { useState, useEffect } from 'react';

interface Chapter {
  id: number;
  title: string;
  timeStr: string;
  seconds: number;
  stepRef: string;
}

const chapters: Chapter[] = [
  { id: 1, title: '01. Visual Pre-Check & Manifold', timeStr: '00:00', seconds: 0, stepRef: 'Step 01: Pre-Operational Check' },
  { id: 2, title: '02. Coupler Lock & Whip-Check', timeStr: '00:46', seconds: 46, stepRef: 'Step 02: Hose Connection' },
  { id: 3, title: '03. Nominal Pressure Verification', timeStr: '01:26', seconds: 86, stepRef: 'Step 03: Gauge Check' },
  { id: 4, title: '04. Smooth Ball Valve Opening', timeStr: '02:06', seconds: 126, stepRef: 'Step 04: Smooth Valve Opening' },
  { id: 5, title: '05. Safe Blowing Distance ≥100mm', timeStr: '02:51', seconds: 171, stepRef: 'Step 05: Chip Clearing' },
  { id: 6, title: '06. Valve Shutoff & Complete Purge', timeStr: '03:45', seconds: 225, stepRef: 'Step 06: Zero PSI Depressurize' },
  { id: 7, title: '07. 5S Loop Hose Storage', timeStr: '04:16', seconds: 256, stepRef: 'Step 07: 5S Storage' },
];

const TOTAL_DURATION_SECONDS = 288; // 04:48

export const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(96); // initial 01:36 (Step 03)
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION_SECONDS) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed]);

  const activeChapter = [...chapters]
    .reverse()
    .find((c) => currentTime >= c.seconds) || chapters[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const jumpToChapter = (seconds: number) => {
    setCurrentTime(seconds);
    setIsPlaying(true);
  };

  return (
    <section id="video-demo" className="py-20 sm:py-28 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 hairline-b pb-6 sm:pb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-subtle-ash dark:text-gray-400 block mb-2">
            Instructional Video Archive
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-charcoal-ink dark:text-gray-100">
            WORKSHOP VIDEO DEMONSTRATION
          </h2>
        </div>
        <div className="mt-3 sm:mt-0 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-charcoal dark:text-gray-400">
          Duration: 04:48 Min · Full Color HD · Rev 04
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Main Video Player Card */}
        <div className="lg:col-span-8 hairline-all bg-[#FAF9F5] dark:bg-[#18181B] p-2.5 sm:p-4">
          <div className="relative aspect-video overflow-hidden bg-charcoal-ink group flex items-center justify-center">
            
            {/* Visual Thumbnail */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoBa8cpAMTI6uStkbL3XpbeV8i5Hb3GsE1NEHAGNhmvhV3d-MyN4dpfjeABp6nnAPCpL-_ktFnXs2dUskWwmyS-1nwDyB1GqzvrSehIp4E47MKUEmjyHoDH_WNb48kHpUSrfNSk7UM0_BF8JkOrMQ-E9SWN2VRX1CexLju7vfLIMeM88SZNDSISMhWHyXTa3V6zIQC17h0pjtRGrSso3FgIgNR-CR54gavUwcsEO_IFuIWhAAy5uG7EQ"
              alt="Workshop demonstration of pneumatic connection procedure"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isPlaying ? 'opacity-95' : 'opacity-85'
              }`}
            />

            {/* Live Playback Indicator */}
            {isPlaying && (
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 bg-black/70 px-2 sm:px-2.5 py-1 text-[8px] sm:text-[9px] uppercase tracking-wider text-emerald-400 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>REC · {playbackSpeed}X</span>
              </div>
            )}

            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/80 bg-black/50 text-white flex items-center justify-center hover:scale-110 transition-transform backdrop-blur-xs cursor-pointer"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              <span className="text-base sm:text-xl ml-0.5">
                {isPlaying ? '⏸' : '▶'}
              </span>
            </button>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-2.5 sm:p-4 flex flex-col gap-1.5 sm:gap-2">
              
              {/* Progress Scrubber */}
              <input
                type="range"
                min="0"
                max={TOTAL_DURATION_SECONDS}
                value={currentTime}
                onChange={(e) => setCurrentTime(parseInt(e.target.value, 10))}
                className="w-full accent-white h-1 cursor-pointer"
              />

              <div className="flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-white/90">
                <div className="flex items-center gap-2 sm:gap-3 truncate">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-emerald-400 font-bold shrink-0 cursor-pointer"
                  >
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </button>
                  <span className="truncate">
                    {formatTime(currentTime)} / 04:48
                    <span className="hidden md:inline"> · {activeChapter.stepRef}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
                    className="hover:text-emerald-400 border border-white/30 px-1 py-0.5 cursor-pointer"
                  >
                    {playbackSpeed}x
                  </button>
                  <span className="hidden sm:inline text-white/70">Group 1 Demo</span>
                </div>
              </div>

            </div>

          </div>

          {/* Sequence Description */}
          <div className="p-4 sm:p-6">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-subtle-ash dark:text-gray-400 block mb-1">
              Active Demonstration Sequence
            </span>
            <h4 className="font-sans font-bold text-base sm:text-lg text-charcoal-ink dark:text-gray-100 uppercase tracking-tight mb-1.5 sm:mb-2">
              {activeChapter.title}
            </h4>
            <p className="text-xs text-muted-charcoal dark:text-gray-300 font-light leading-relaxed">
              Official practical walkthrough demonstrating visual pre-check at Station 0, gradual quarter-turn valve lever engagement, maintenance of the 100 mm stand-off chip distance, and complete zero-pressure line venting prior to disengagement.
            </p>
          </div>
        </div>

        {/* Video Chapter Index */}
        <div className="lg:col-span-4 hairline-all bg-[#FAF9F5] dark:bg-[#18181B] p-5 sm:p-8">
          <div className="hairline-b pb-3 sm:pb-4 mb-4 sm:mb-6 flex justify-between items-baseline">
            <h3 className="font-sans font-bold text-base sm:text-lg uppercase tracking-tight text-charcoal-ink dark:text-gray-100">
              Chapters
            </h3>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-subtle-ash dark:text-gray-400">
              Click to Seek
            </span>
          </div>

          <div className="space-y-2.5 sm:space-y-3 text-xs">
            {chapters.map((ch) => {
              const isActive = activeChapter.id === ch.id;
              return (
                <div
                  key={ch.id}
                  onClick={() => jumpToChapter(ch.seconds)}
                  className={`flex justify-between items-baseline py-2 sm:py-2.5 px-2.5 sm:px-3 transition-all cursor-pointer border ${
                    isActive
                      ? 'border-charcoal-ink dark:border-emerald-500 bg-[#F1EDE5] dark:bg-[#27272A] font-medium text-charcoal-ink dark:text-gray-100'
                      : 'border-transparent hover:border-hairline-divider hover:bg-[#F4F0E8] dark:hover:bg-[#202024] text-muted-charcoal dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400 shrink-0" />}
                    <span className="font-light truncate">{ch.title}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono font-medium ml-2 text-charcoal-ink dark:text-gray-200 shrink-0">
                    {ch.timeStr}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 hairline-t text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-subtle-ash dark:text-gray-400">
            <span>Video format: H.264 / AAC 1080p · Group 1 - Batch 2023 Machining Lab</span>
          </div>
        </div>

      </div>
    </section>
  );
};
