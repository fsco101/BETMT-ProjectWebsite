import { SafetyProtocolItem } from '../types/pneumatic';

export interface RequiredPpeItem {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const requiredPpeList: RequiredPpeItem[] = [
  {
    id: 'ppe-1',
    name: 'Safety Glasses',
    description: 'ANSI Z87.1 certified eye protection with side shields to guard against flying metal chips and high-velocity debris.',
    icon: 'visibility'
  },
  {
    id: 'ppe-2',
    name: 'Safety Footwear',
    description: 'Closed-toe steel-toe or reinforced safety shoes to protect against heavy tools, workpieces, and tripping hazards.',
    icon: 'footwear'
  },
  {
    id: 'ppe-3',
    name: 'Close-Fitting Work Clothing',
    description: 'Properly fitting workshop attire without loose fabric, ties, or unbuttoned sleeves that could snag on machinery.',
    icon: 'checkroom'
  },
  {
    id: 'ppe-4',
    name: 'No Accessories',
    description: 'Remove all rings, bracelets, watches, necklaces, and jewelry prior to operating pneumatic tools or machine tools.',
    icon: 'block'
  },
  {
    id: 'ppe-5',
    name: 'Clean Bun (for girls)',
    description: 'Tie long hair securely in a neat, clean bun or cap to keep hair completely away from rotating spindles and hoses.',
    icon: 'face'
  }
];

export const mandatoryPractices: SafetyProtocolItem[] = [
  {
    id: 'do-1',
    number: '01',
    title: 'Wear the required PPE',
    summary: 'Always wear safety goggles and other required protective equipment to protect yourself from flying metal chips and debris during cleaning.',
    badge: 'Mandatory PPE',
    protocolRef: 'Directive 01',
    detailTitle: 'Eye & Body Protection Against Swarf',
    detailBody: 'High-speed air causes metal particles, swarf, and coolant mist to ricochet unpredictably. Proper PPE ensures complete physical defense for eyes, face, and skin.',
    tags: [
      { label: 'PPE Compliance' },
      { label: 'Status: Mandatory', highlight: true }
    ],
    isProhibition: false
  },
  {
    id: 'do-2',
    number: '02',
    title: 'Inspect the hose & fittings before use',
    summary: 'Inspect the pipes, hoses, and connections to make sure they are properly secured and free from visible damage or air leaks.',
    badge: 'Inspection',
    protocolRef: 'Directive 02',
    detailTitle: 'Integrity Check Before Pressurization',
    detailBody: 'Check all hose lengths and couplings for cracks, fraying, loose clamp bolts, or acoustic hissing. Never operate a damaged pneumatic line.',
    tags: [
      { label: 'Pre-Check' },
      { label: 'Zero Leakage' }
    ],
    isProhibition: false
  },
  {
    id: 'do-3',
    number: '03',
    title: 'Connect the tool securely',
    summary: 'Make sure the air blow gun is properly connected to the hose before use to prevent accidental disconnection and air leaks.',
    badge: 'Secure Lock',
    protocolRef: 'Directive 03',
    detailTitle: 'Quick-Disconnect Sleeve Verification',
    detailBody: 'Pull back the coupler sleeve, firmly insert the male tool plug until it seats with an audible click, and return the sleeve to locked position.',
    tags: [
      { label: 'Coupling: Positive Snap' },
      { label: 'Sleeve Engaged' }
    ],
    isProhibition: false
  },
  {
    id: 'do-4',
    number: '04',
    title: 'Use the compressed air only for approved tasks',
    summary: 'Use the compressed air system only for its intended purpose, such as removing metal chips from machine surfaces, and follow the laboratory\'s safety procedures.',
    badge: 'Approved Use',
    protocolRef: 'Directive 04',
    detailTitle: 'Operational Scope Adherence',
    detailBody: 'Pneumatic line pressure is calibrated solely for machining surface clearance and authorized pneumatic tooling in the mechanical laboratory.',
    tags: [
      { label: 'Machine Cleaning' },
      { label: 'Pneumatic Tooling' }
    ],
    isProhibition: false
  },
  {
    id: 'do-5',
    number: '05',
    title: 'Direct airflow away from people',
    summary: 'Always point the air blow gun toward the intended cleaning area and away from yourself and other people to prevent injuries from compressed air and flying debris.',
    badge: 'Directional Safety',
    protocolRef: 'Directive 05',
    detailTitle: 'Trajectory Control',
    detailBody: 'Always angle the nozzle downward toward machine chip catchers. Ensure no students, technicians, or observers stand within the airflow projection cone.',
    tags: [
      { label: 'Downward Angle' },
      { label: 'Personnel Clearance', highlight: true }
    ],
    isProhibition: false
  },
  {
    id: 'do-6',
    number: '06',
    title: 'Follow the approved pressure setting',
    summary: 'Check that the pressure reducing valve (PRV) is set to 30 PSI before using the air blow gun to maintain the required operating pressure.',
    badge: '30 PSI Regulated',
    protocolRef: 'Directive 06',
    detailTitle: 'PRV Calibrated Working Pressure',
    detailBody: 'Check the drop dial gauge to ensure 30 PSI downstream pressure. 30 PSI balances effective metal chip expulsion with operator safety.',
    tags: [
      { label: 'PRV: 30 PSI' },
      { label: 'Regulated Limit' }
    ],
    isProhibition: false
  },
  {
    id: 'do-7',
    number: '07',
    title: 'Keep hoses organized',
    summary: 'Return the hose to the retractable hose reel after use to prevent tangling, tripping hazards, and unnecessary damage.',
    badge: '5S Organization',
    protocolRef: 'Directive 07',
    detailTitle: 'Retraction & Pathway Clearance',
    detailBody: 'Slowly guide the polyurethane hose back onto the automatic reel so that workshop aisles and machine work zones remain clear of tripping obstacles.',
    tags: [
      { label: 'Auto-Reel' },
      { label: 'Walkway Safety' }
    ],
    isProhibition: false
  },
  {
    id: 'do-8',
    number: '08',
    title: 'Close the ball valve and release residual air after use',
    summary: 'Close the ball valve to stop the air supply, then release any remaining air before disconnecting the tool or performing maintenance.',
    badge: 'Depressurization',
    protocolRef: 'Directive 08',
    detailTitle: 'Zero-Pressure Protocol',
    detailBody: 'Turn upper ball valve 90° to isolation, squeeze blow gun trigger until air hissing ceases completely (0 PSI), then decouple tool.',
    tags: [
      { label: 'Valve Shut' },
      { label: 'Zero PSI' }
    ],
    isProhibition: false
  },
  {
    id: 'do-9',
    number: '09',
    title: 'Report leaks, damage, or abnormal operations immediately',
    summary: 'Inform the laboratory instructor or responsible personnel if you notice air leaks, damaged components, unusual noises, or other problems. Stop using the system if it is unsafe until the issue has been checked.',
    badge: 'Incident Reporting',
    protocolRef: 'Directive 09',
    detailTitle: 'Fault Escalation Protocol',
    detailBody: 'Never attempt unapproved repairs or run compromised lines. Immediately inform faculty and tag out any damaged component.',
    tags: [
      { label: 'Report Leaks' },
      { label: 'Tag-Out Unsafe Lines', highlight: true }
    ],
    isProhibition: false
  }
];

export const strictProhibitions: SafetyProtocolItem[] = [
  {
    id: 'dont-1',
    number: '01',
    title: 'Don’t Use the System Without PPE',
    summary: 'Operating without proper protective equipment may expose you to injuries from flying metal chips and debris.',
    badge: 'Critical Prohibition',
    protocolRef: 'Prohibition 01',
    detailTitle: 'Unprotected Operator Hazard',
    detailBody: 'Eye and body injuries occur instantaneously when compressed air strikes sharp machining chips without protective eyewear and gear.',
    tags: [
      { label: 'No PPE = No Entry', highlight: true },
      { label: 'Eye Hazard' }
    ],
    isProhibition: true
  },
  {
    id: 'dont-2',
    number: '02',
    title: 'Do not point compressed air toward yourself or another person',
    summary: 'Never direct the air blow gun toward yourself or other people. The high-speed airflow can cause injuries, while flying metal chips and debris may hit the eyes or skin.',
    badge: 'Lethal Hazard',
    protocolRef: 'Prohibition 02',
    detailTitle: 'Embolism & Acoustic Trauma Risk',
    detailBody: 'Air pressure directed at the body can force air bubbles through pores into bloodstream vessels (fatal arterial gas embolism) and rupture eardrums.',
    tags: [
      { label: 'Embolism Hazard', highlight: true },
      { label: 'Zero Tolerance' }
    ],
    isProhibition: true
  },
  {
    id: 'dont-3',
    number: '03',
    title: 'Do not extend the limit of the retractable hose',
    summary: 'Avoid pulling the hose beyond its maximum extension. Doing so may damage the hose, affect the retractable mechanism, or cause the hose reel to malfunction.',
    badge: 'Equipment Protection',
    protocolRef: 'Prohibition 03',
    detailTitle: 'Internal Spring & Fitting Strain',
    detailBody: 'Over-extending past the yellow/red indicator stripe strips internal tension springs and risks cracking the swivel manifold connection.',
    tags: [
      { label: 'Max Extension Limit' },
      { label: 'Spring Integrity' }
    ],
    isProhibition: true
  },
  {
    id: 'dont-4',
    number: '04',
    title: 'Do not step & leave the hose across walkways',
    summary: 'Avoid leaving the hose across pathways or areas where people walk. It can create a tripping hazard and may also cause damage to the hose if someone steps on it.',
    badge: 'Trip Hazard',
    protocolRef: 'Prohibition 04',
    detailTitle: 'Walkway Obstruction & Hose Crushing',
    detailBody: 'Hoses on the floor lead to dangerous falls in machine workshops and suffer internal wall pinching when stepped on or rolled over by material carts.',
    tags: [
      { label: 'Clear Walkways' },
      { label: 'Tripping Risk', highlight: true }
    ],
    isProhibition: true
  },
  {
    id: 'dont-5',
    number: '05',
    title: 'Do not exceed the designated operating pressure',
    summary: 'Never increase the pressure beyond the approved setting. Keep the pressure reducing valve (PRV) set to 30 PSI to maintain the required operating pressure and reduce potential safety risks.',
    badge: 'Pressure Violation',
    protocolRef: 'Prohibition 05',
    detailTitle: 'Overpressure Hazard',
    detailBody: 'Pressures exceeding 30 PSI for chip removal dramatically multiply chip ricochet velocity and breach workshop safety mandates.',
    tags: [
      { label: 'Max 30 PSI' },
      { label: 'Do Not Tamper PRV', highlight: true }
    ],
    isProhibition: true
  },
  {
    id: 'dont-6',
    number: '06',
    title: 'Do not use the system for other purposes than intended',
    summary: 'Use the centralized compressed air system only for its intended applications, such as removing metal chips from machine surfaces and operating compatible pneumatic tools.',
    badge: 'Improper Application',
    protocolRef: 'Prohibition 06',
    detailTitle: 'Unauthorized Usage',
    detailBody: 'Never use shop air for dusting clothes, personal cooling, blowing practical jokes, or unapproved pressurization experiments.',
    tags: [
      { label: 'No Clothing Dusting' },
      { label: 'Machining Only' }
    ],
    isProhibition: true
  },
  {
    id: 'dont-7',
    number: '07',
    title: 'Do not operate or adjust compressor without authorization',
    summary: 'Only operate the air compressor if you are authorized or have permission from the laboratory instructor or responsible personnel. Do not make adjustments without approval, as improper operation may damage the equipment or create unsafe conditions.',
    badge: 'Authorization Required',
    protocolRef: 'Prohibition 07',
    detailTitle: 'Central Plant Lockout',
    detailBody: 'The Sullair screw compressor and refrigerated air dryer are managed exclusively by qualified instructors and assigned lab personnel.',
    tags: [
      { label: 'Staff Clearance Only', highlight: true },
      { label: 'No Tampering' }
    ],
    isProhibition: true
  },
  {
    id: 'dont-8',
    number: '08',
    title: 'Do not leave the hose & air tool unorganized',
    summary: 'Never leave the hose stretched out or the air blow gun in an improper location after use. Return the hose to the retractable reel and store the tool properly to prevent tangling, tripping hazards, and equipment damage.',
    badge: 'Storage Violation',
    protocolRef: 'Prohibition 08',
    detailTitle: 'Workshop Disorder Hazard',
    detailBody: 'Unsecured tools fall, get kicked, or sustain nozzle deformations. Re-spool hose and place blow gun in its cradle immediately after finishing.',
    tags: [
      { label: 'Tool Cradle Storage' },
      { label: 'Clean Workstation' }
    ],
    isProhibition: true
  },
  {
    id: 'dont-9',
    number: '09',
    title: 'Don\'t disconnect components while system is pressurized',
    summary: 'Never remove the tool while they contain compressed air. Shut off the air supply and release the trapped pressure according to the proper procedure before disconnecting them.',
    badge: 'Projectile Hazard',
    protocolRef: 'Prohibition 09',
    detailTitle: 'Uncontrolled Kinetic Release',
    detailBody: 'Pulling quick-connect sleeves under pressure fires fittings like bullets and causes aggressive hose whipping that can fracture bones.',
    tags: [
      { label: 'Shut Valve First' },
      { label: 'Vent to 0 PSI First', highlight: true }
    ],
    isProhibition: true
  }
];
