import React from 'react';

interface GaugeDialProps {
  currentPressureBar: number;
  maxScaleBar?: number;
  nominalPressureBar?: number;
  size?: number;
}

export const GaugeDial: React.FC<GaugeDialProps> = ({
  currentPressureBar,
  maxScaleBar = 10,
  nominalPressureBar = 6.2,
  size = 110,
}) => {
  // Pressure to angle mapping: 0 Bar = -135deg, 10 Bar = +135deg (total 270 degrees)
  const clampedPressure = Math.max(0, Math.min(maxScaleBar, currentPressureBar));
  const angle = -135 + (clampedPressure / maxScaleBar) * 270;
  const psi = Math.round(currentPressureBar * 14.5038);

  const isSafeZone = currentPressureBar >= 5.8 && currentPressureBar <= 7.2;
  const isOverpressure = currentPressureBar > 7.5;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="select-none overflow-visible"
      >
        {/* Gauge Outer Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="#FAF9F5"
          stroke="#1C1B1A"
          strokeWidth="2"
        />
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="#DCD7CD"
          strokeWidth="0.75"
        />

        {/* Safe Operating Arc (6.0 - 7.0 Bar) */}
        {/* 6.0 Bar = -135 + 0.6*270 = +27deg; 7.0 Bar = -135 + 0.7*270 = +54deg */}
        <path
          d="M 68 28 A 38 38 0 0 1 78 45"
          fill="none"
          stroke="#047857"
          strokeWidth="3.5"
          opacity="0.85"
        />

        {/* Overpressure Arc (> 7.5 Bar) */}
        <path
          d="M 80 50 A 38 38 0 0 1 75 66"
          fill="none"
          stroke="#8A2528"
          strokeWidth="3.5"
          opacity="0.8"
        />

        {/* Major Tick Marks & Numbers */}
        {[0, 2, 4, 6, 8, 10].map((val) => {
          const tickAngle = (-135 + (val / maxScaleBar) * 270) * (Math.PI / 180);
          const x1 = 50 + 36 * Math.cos(tickAngle);
          const y1 = 50 + 36 * Math.sin(tickAngle);
          const x2 = 50 + 43 * Math.cos(tickAngle);
          const y2 = 50 + 43 * Math.sin(tickAngle);
          const tx = 50 + 29 * Math.cos(tickAngle);
          const ty = 50 + 29 * Math.sin(tickAngle);

          return (
            <g key={val}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#1C1B1A"
                strokeWidth={val % 4 === 0 ? '1.5' : '1'}
              />
              <text
                x={tx}
                y={ty + 2}
                textAnchor="middle"
                fontSize="6"
                fontFamily="sans-serif"
                fontWeight="500"
                fill="#4A4744"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Center Label: BAR */}
        <text
          x="50"
          y="68"
          textAnchor="middle"
          fontSize="5.5"
          fontFamily="sans-serif"
          fontWeight="600"
          letterSpacing="0.1em"
          fill="#7E7973"
        >
          BAR · PSI
        </text>

        {/* Target Nominal Indicator Dot */}
        {nominalPressureBar && (
          <circle
            cx={50 + 36 * Math.cos((-135 + (nominalPressureBar / maxScaleBar) * 270) * (Math.PI / 180))}
            cy={50 + 36 * Math.sin((-135 + (nominalPressureBar / maxScaleBar) * 270) * (Math.PI / 180))}
            r="1.2"
            fill="#047857"
          />
        )}

        {/* Pivot Center Pin */}
        <circle cx="50" cy="50" r="4" fill="#1C1B1A" />
        <circle cx="50" cy="50" r="1.5" fill="#FAF9F5" />

        {/* Rotating Needle */}
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: '50px 50px', transition: 'transform 0.4s ease-out' }}>
          <polygon
            points="50,14 47.5,50 52.5,50"
            fill={isOverpressure ? '#8A2528' : '#1C1B1A'}
          />
          {/* Counterweight */}
          <polygon
            points="48.5,50 51.5,50 50,58"
            fill="#7E7973"
          />
        </g>
      </svg>

      {/* Digital Readout */}
      <div className="mt-1 flex items-center gap-1.5 text-[10px] tracking-wider">
        <span
          className={`font-semibold ${
            isOverpressure
              ? 'text-accent-crimson'
              : isSafeZone
              ? 'text-emerald-800'
              : currentPressureBar === 0
              ? 'text-subtle-ash'
              : 'text-charcoal-ink'
          }`}
        >
          {currentPressureBar.toFixed(1)} Bar
        </span>
        <span className="text-subtle-ash text-[9px]">({psi} PSI)</span>
      </div>
    </div>
  );
};
