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

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
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
    <section id="video-demo" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 hairline-b pb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-subtle-ash block mb-2">
            Instructional Video Archive
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl uppercase tracking-[0.03em] text-charcoal-ink">
            WORKSHOP VIDEO DEMONSTRATION
          </h2>
        </div>
        <div className="mt-4 sm:mt-0 text-[11px] uppercase tracking-[0.18em] text-muted-charcoal">
          Duration: 04:48 Min · Full Color HD · Rev 04
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Video Player Card */}
        <div className="lg:col-span-8 hairline-all bg-[#FAF9F5] p-3 sm:p-4">
          <div className="relative aspect-video overflow-hidden bg-charcoal-ink group flex items-center justify-center">
            
            {/* Visual Thumbnail / Video Simulation Still */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoBa8cpAMTI6uStkbL3XpbeV8i5Hb3GsE1NEHAGNhmvhV3d-MyN4dpfjeABp6nnAPCpL-_ktFnXs2dUskWwmyS-1nwDyB1GqzvrSehIp4E47MKUEmjyHoDH_WNb48kHpUSrfNSk7UM0_BF8JkOrMQ-E9SWN2VRX1CexLju7vfLIMeM88SZNDSISMhWHyXTa3V6zIQC17h0pjtRGrSso3FgIgNR-CR54gavUwcsEO_IFuIWhAAy5uG7EQ"
              alt="Workshop demonstration of pneumatic connection procedure"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isPlaying ? 'opacity-95' : 'opacity-85'
              }`}
            />

            {/* Simulated Live Scanline Watermark */}
            {isPlaying && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-wider text-emerald-400 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>REC PLAYBACK · {playbackSpeed}X</span>
              </div>
            )}

            {/* Big Center Play / Pause Trigger */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute w-16 h-16 rounded-full border border-white/80 bg-black/50 text-white flex items-center justify-center hover:scale-110 transition-transform backdrop-blur-xs"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              <span className="font-editorial text-xl ml-0.5">
                {isPlaying ? '⏸' : '▶'}
              </span>
            </button>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col gap-2">
              
              {/* Progress Scrubber */}
              <input
                type="range"
                min="0"
                max={TOTAL_DURATION_SECONDS}
                value={currentTime}
                onChange={(e) => setCurrentTime(parseInt(e.target.value, 10))}
                className="w-full accent-white h-1 cursor-pointer"
              />

              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/90">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-emerald-400 font-bold"
                  >
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </button>
                  <span>
                    {formatTime(currentTime)} / 04:48 · {activeChapter.stepRef}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
                    className="hover:text-emerald-400 border border-white/30 px-1.5 py-0.5"
                  >
                    {playbackSpeed}x
                  </button>
                  <span className="hidden sm:inline text-white/70">TUP-T Demo #04</span>
                </div>
              </div>

            </div>

          </div>

          {/* Sequence Description */}
          <div className="p-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-subtle-ash block mb-1">
              Active Demonstration Sequence
            </span>
            <h4 className="font-editorial text-lg text-charcoal-ink uppercase tracking-wide mb-2">
              {activeChapter.title}
            </h4>
            <p className="text-xs text-muted-charcoal font-light leading-relaxed">
              Official practical walkthrough demonstrating visual pre-check at Station 0, gradual quarter-turn valve lever engagement, maintenance of the 100 mm stand-off chip distance, and complete zero-pressure line venting prior to disengagement.
            </p>
          </div>
        </div>

        {/* Video Chapter Index */}
        <div className="lg:col-span-4 hairline-all bg-[#FAF9F5] p-6 sm:p-8">
          <div className="hairline-b pb-4 mb-6 flex justify-between items-baseline">
            <h3 className="font-editorial text-lg uppercase tracking-wider text-charcoal-ink">
              Chapters
            </h3>
            <span className="text-[10px] uppercase tracking-[0.2em] text-subtle-ash">
              Click to Seek
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {chapters.map((ch) => {
              const isActive = activeChapter.id === ch.id;
              return (
                <div
                  key={ch.id}
                  onClick={() => jumpToChapter(ch.seconds)}
                  className={`flex justify-between items-baseline py-2.5 px-3 transition-all cursor-pointer border ${
                    isActive
                      ? 'border-charcoal-ink bg-[#F1EDE5] font-medium text-charcoal-ink'
                      : 'border-transparent hover:border-hairline-divider hover:bg-[#F4F0E8] text-muted-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />}
                    <span className="font-light">{ch.title}</span>
                  </div>
                  <span className="text-[11px] font-editorial font-medium ml-2 text-charcoal-ink">
                    {ch.timeStr}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 hairline-t text-[10px] uppercase tracking-[0.16em] text-subtle-ash">
            <span>Video format: H.264 / AAC 1080p · TUP Machining Lab</span>
          </div>
        </div>

      </div>
    </section>
  );
};
