import { CircuitStage } from '../types/pneumatic';

export const circuitStages: CircuitStage[] = [
  {
    id: 'stage-01',
    stageNumber: 1,
    name: '01. SULLAIR SCREW AIR COMPRESSOR',
    subtitle: 'Primary Air Generation',
    description: 'The air compressor draws in air from the surroundings and compresses it to provide the air supply needed by the system. It serves as the main source of compressed air.',
    image: '/images/image9.png',
    images: ['/images/image9.png', '/images/image16.png'],
    imageCaptions: [
      'Figure 1 — Sullair WS1100 Industrial Screw Air Compressor',
      'Figure 2 — Sullair Compressor Specification Nameplate (WS1109 AC)'
    ],
    metricLabel: 'Capacity / Motor',
    metricValue: '125 PSIG / 8.6 BAR',
    isoStandard: 'ISO 1217 Standard',
    maintenanceInterval: 'Routine Operating Inspection',
    detailedSpecs: [
      { label: 'Model No.', value: 'WS1109 AC' },
      { label: 'Serial No.', value: '37218060003' },
      { label: 'EBOM No.', value: '88291005-011' },
      { label: 'Rated Air Pressure', value: '125 PSIG / 8.6 BAR' }
    ]
  },
  {
    id: 'stage-02',
    stageNumber: 2,
    name: '02. Air Filter',
    subtitle: 'Solid Particle Filtration',
    description: 'The air filter removes dirt, dust, and other solid particles from the compressed air to help protect the downstream components.',
    image: '/images/image12.png',
    images: ['/images/image12.png'],
    imageCaptions: [
      'Figure 1 — In-Line Sullair Air Filtration & Moisture Trap System'
    ],
    metricLabel: 'Filtration Type',
    metricValue: 'Particulate Separation',
    isoStandard: 'ISO 8573 Filtration',
    maintenanceInterval: 'Periodic Filter Inspection',
    detailedSpecs: [
      { label: 'Primary Function', value: 'Removes dirt, dust, and solid particles' },
      { label: 'System Role', value: 'Protects downstream pneumatic components' },
      { label: 'Configuration', value: 'Dual-Stage Series Filtration' }
    ]
  },
  {
    id: 'stage-03',
    stageNumber: 3,
    name: '03. Refrigerant Dryer',
    subtitle: 'Moisture Condensation & Separation',
    description: 'The refrigerant air dryer removes moisture from the compressed air by cooling it and collecting the water that forms. This helps prevent moisture buildup inside the pipes and protects the system components.',
    image: '/images/image39.png',
    images: ['/images/image39.png', '/images/image37.png'],
    imageCaptions: [
      'Figure 1 — Sullair SRC Industrial Refrigerant Air Dryer',
      'Figure 2 — Refrigerant Dryer Nameplate & Operating Parameters'
    ],
    metricLabel: 'Power Input',
    metricValue: '0.92 kW / 6.2 A',
    isoStandard: 'Class 4 Water Vapor',
    maintenanceInterval: 'Condenser Cleaning & Auto Drain Verification',
    detailedSpecs: [
      { label: 'Refrig. Circuit Design Press.', value: '1.3 MPag / 2.2 MPag (13 / 22 barg, 189 / 319 psig)' },
      { label: 'Max Compressed Air Pressure', value: '1.6 MPag (16 barg, 232 psig)' },
      { label: 'Max Compressed Air In Temp', value: '65 °C' },
      { label: 'Ambient Temperature Range', value: '5 °C – 50 °C' },
      { label: 'Power Input & Current', value: '0.92 kW / 6.2 A' },
      { label: 'Refrig. Compressor Oil', value: 'ISO VG22 Ester' },
      { label: 'Refrigerant Charge', value: 'R134a, 0.35 KG' },
      { label: 'Protection Class', value: 'IP20' }
    ]
  },
  {
    id: 'stage-04',
    stageNumber: 4,
    name: '04. Air Receiver Tank',
    subtitle: 'Pressure Buffer & Air Storage',
    description: 'The air receiver tank stores compressed air and helps maintain a stable air supply when the system is in use. It also helps manage changes in air demand.',
    image: '/images/image46.png',
    images: ['/images/image46.png', '/images/image17.png'],
    imageCaptions: [
      'Figure 1 — 300L Vertical Pressure Air Receiver Tank',
      'Figure 2 — Vessel Identification & Certification Plate'
    ],
    metricLabel: 'Capacity',
    metricValue: '300 Liters',
    isoStandard: 'Pressure Vessel Certification',
    maintenanceInterval: 'Daily Bottom Condensate Drain',
    detailedSpecs: [
      { label: 'Serial No.', value: '19043 AR' },
      { label: 'Vessel Capacity', value: '300 Liters' },
      { label: 'Working Pressure', value: '10 BARS' },
      { label: 'Test Pressure', value: '15 BARS' }
    ]
  },
  {
    id: 'stage-05',
    stageNumber: 5,
    name: '05. Pressure Reducing Valve (PRV)',
    subtitle: 'Overhead Pressure Regulation',
    description: 'The pressure reducing valve (PRV) lowers and controls the air pressure before it enters the retractable hose reel and air blow gun. In our system, the PRV is set to 30 PSI to provide the needed air pressure for removing metal chips from machine surfaces.',
    image: '/images/image28.png',
    images: ['/images/image28.png'],
    imageCaptions: [
      'Figure 1 — Overhead Pressure Reducing Valve (PRV) & Dual Bypass Line'
    ],
    metricLabel: 'Set Pressure',
    metricValue: '30 PSI',
    isoStandard: 'OSHA 30 PSI Cleaning Guideline',
    maintenanceInterval: 'Gauge Calibration & Pressure Verification',
    detailedSpecs: [
      { label: 'Operating Set Point', value: '30 PSI (Calibrated Safe Working Pressure)' },
      { label: 'Application', value: 'Metal chip removal from machine surfaces' },
      { label: 'Installation', value: 'Overhead drop line before retractable hose reel' }
    ]
  },
  {
    id: 'stage-06',
    stageNumber: 6,
    name: '06. Retractable Hose Reel',
    subtitle: 'Pneumatic Hose Management',
    description: 'The retractable hose reel holds the air hose and allows users to pull it out when needed. After use, the hose can be pulled back into the reel, keeping the work area neat and organized.',
    image: '/images/image24.png',
    images: ['/images/image24.png'],
    imageCaptions: [
      'Figure 1 — Blue Spring-Loaded Auto Retractable Hose Reel'
    ],
    metricLabel: 'Mechanism',
    metricValue: 'Spring Auto-Rewind',
    isoStandard: 'Workshop 5S Organization',
    maintenanceInterval: 'Hose Tension & Stopper Ball Check',
    detailedSpecs: [
      { label: 'Retraction Type', value: 'Automatic Spring Rewind with Ratchet Lock' },
      { label: 'Hose Color / Material', value: 'High-Visibility Polyurethane Air Hose' },
      { label: 'Safety Benefit', value: 'Prevents tripping hazards and floor damage' }
    ]
  },
  {
    id: 'stage-07',
    stageNumber: 7,
    name: '07. Air Blow Gun',
    subtitle: 'Targeted Surface Cleaning Tool',
    description: 'The air blow gun directs compressed air toward machine surfaces to remove metal chips and debris after machining. It allows users to clean the machines more easily, while proper handling helps prevent chips from flying toward people.',
    image: '/images/image8.png',
    images: ['/images/image8.png'],
    imageCaptions: [
      'Figure 1 — Precision Aluminum Pneumatic Air Blow Gun'
    ],
    metricLabel: 'Operating Pressure',
    metricValue: '30 PSI',
    isoStandard: 'Shop Safety Standard',
    maintenanceInterval: 'Nozzle Clearance & Trigger Seal Inspection',
    detailedSpecs: [
      { label: 'Working Pressure', value: '30 PSI regulated by upstream PRV' },
      { label: 'Recommended Standoff', value: 'Approximately 2 inches from surface' },
      { label: 'Directional Protocol', value: 'Point nozzle away from self and others' }
    ]
  }
];
