import { StudyOverview, TeamMember } from '../types/pneumatic';

export const studyOverviewData: StudyOverview = {
  title: 'Design, Fabrication, and Operational Standardization of the Centralized Compressed Air Distribution System',
  eyebrow: 'Undergraduate Engineering Technology Research & Laboratory Development',
  subtitle: 'A centralized pneumatic network engineered for energy efficiency, moisture control, and student safety compliance at TUP Taguig.',
  institution: 'Technological University of the Philippines — Taguig Campus',
  department: 'Mechanical and Allied Department (MAAD)',
  academicYear: 'Academic Year 2025 – 2026',
  abstract:
    'The Centralized Compressed Air Distribution System at the Technological University of the Philippines — Taguig Campus was developed to address critical laboratory operational challenges in the Mechanical Machining, CNC, and Advanced Machining laboratories. Prior to this implementation, dispersed portable compressors and trailing floor hoses posed significant tripping hazards, inconsistent air delivery pressures, and moisture accumulation that degraded sensitive machining tools. This study presents the design, fabrication, and experimental commissioning of a centralized compressed-air network featuring a high-efficiency rotary screw compressor, refrigerated air drying, dedicated air receiver buffering, and a closed-loop overhead distribution manifold supplying six regulated workstation drops. Rigorous 15-step standard operating procedures (SOP) and DOLE/OSHA compliant 30 PSI chip-cleaning standards were established to safeguard student operators and extend laboratory equipment lifespan.',
  backgroundRationale:
    'In modern mechanical workshop environments, compressed air is often termed the "fourth utility." However, uncontrolled air delivery can result in high thermodynamic losses, pneumatic tool corrosion from moisture condensation, and grave mechanical hazards if high-pressure air (above 30 PSI) is improperly used for debris cleaning. By centralizing air generation, incorporating active refrigeration drying, and decentralizing pressure regulation at specific workshop drops, this study bridges theoretical fluid power engineering with practical laboratory health and safety.',
  significance: [
    'Centralized infrastructure eliminates redundant compressor cycling and reduces workshop electrical peak loads.',
    'Integrated refrigerant drying lowers pressure dew point, preventing corrosion in CNC pneumatic actuators and air blow guns.',
    'Dedicated pressure reducing valves (PRV) guarantee strict compliance with 30 PSI safety limits during chip-cleaning operations.',
    'Overhead retractable hose reels eliminate ground tripping hazards across busy student walkways.',
    'A standardized 15-step illustrated procedural manual and digital twin provide continuous pedagogical training for students and instructors.'
  ],
  objectives: [
    {
      id: 'obj-1',
      title: 'Centralized Generation & Treatment',
      description:
        'To design and install a centralized compressor and refrigerant air dryer unit capable of delivering consistent, clean, and dry compressed air throughout the mechanical laboratories.'
    },
    {
      id: 'obj-2',
      title: 'Piping Manifold & Drop Distribution',
      description:
        'To fabricate an overhead distribution network serving six dedicated workstation drops across the Workshop, CNC, and Advance Machining areas with zero line pressure sag.'
    },
    {
      id: 'obj-3',
      title: 'Safety Standardization & Pressure Regulation',
      description:
        'To enforce strict operating pressures (30 PSI for cleaning operations, 90–120 PSI for heavy pneumatic tools) and provide spring-loaded retractable hose reels for safe floor housekeeping.'
    },
    {
      id: 'obj-4',
      title: 'Standard Operating Procedures & Digital Documentation',
      description:
        'To establish a 15-step illustrated operational protocol, safety DOs and DONTs, and an interactive digital operational twin accessible to students and faculty.'
    }
  ],
  methodology: [
    {
      step: '01',
      title: 'Laboratory Assessment & CFM Load Calculation',
      description:
        'Conducted spatial mapping and air consumption audits across all conventional lathes, milling stations, CNC machinery, and cleaning benches to size compressor capacity and receiver volume.'
    },
    {
      step: '02',
      title: 'Piping Network & FRL Station CAD Design',
      description:
        'Engineered overhead distribution pipe sizing, pitch angles for condensate drainage, and drop leg configurations featuring Filter-Regulator-Lubricator (FRL) assemblies.'
    },
    {
      step: '03',
      title: 'System Fabrication & Pneumatic Assembly',
      description:
        'Mounted primary generation units, welded and routed structural pipe supports, installed dual-valve isolation points, and integrated industrial retractable hose reels.'
    },
    {
      step: '04',
      title: 'Pressure Testing & Flow Commissioning',
      description:
        'Performed hydrostatic and pneumatic hold tests at 1.5x operating pressure to verify zero joint leakage and validate pressure regulation at all six workstation drops.'
    },
    {
      step: '05',
      title: 'Protocol Formulation & Digital Twin Deployment',
      description:
        'Drafted safety compliance checklists, 15-step startup/shutdown SOPs, and developed this web-based interactive operational manual.'
    }
  ],
  advisers: [
    {
      name: 'Engr. Manuel De Leon',
      title: 'Research Adviser & Laboratory Supervisor',
      department: 'Mechanical and Allied Department — TUP Taguig',
      role: 'Project Guidance & Fluid Power Technical Advising'
    },
    {
      name: 'Prof. Roberto Santos',
      title: 'Department Head',
      department: 'Mechanical and Allied Department — TUP Taguig',
      role: 'Administrative Support & Laboratory Resource Coordination'
    }
  ]
};

export const researchTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Lead Student Researcher',
    role: 'Project Lead & Systems Architect',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP Taguig Campus',
    contributions: [
      'Pneumatic circuit sizing, compressor demand calculations, and receiver tank capacity modeling.',
      'Oversaw overall project coordination, laboratory installation timeline, and safety testing.',
      'Authored the study synthesis and experimental validation reports.'
    ]
  },
  {
    id: 'team-2',
    name: 'Mechanical Design Specialist',
    role: 'CAD Modeling & Piping Engineer',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP Taguig Campus',
    contributions: [
      'Developed 3D CAD schematics and overhead pipe routing layouts across the three machine shop zones.',
      'Designed ceiling support brackets, pipe drop geometry, and moisture trap drainage slopes.',
      'Managed structural mounting and mechanical pipe fitting fabrication.'
    ]
  },
  {
    id: 'team-3',
    name: 'Pneumatics & Controls Specialist',
    role: 'Instrumentation & FRL Engineer',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP Taguig Campus',
    contributions: [
      'Configured pressure reducing valves (PRV) for 30 PSI cleaning and 90-120 PSI tooling specs.',
      'Selected and installed quick-connect couplers, isolation ball valves, and refrigerant dryer connections.',
      'Conducted line pressure drop measurements and pneumatic seal integrity testing.'
    ]
  },
  {
    id: 'team-4',
    name: 'Safety & Compliance Analyst',
    role: 'OSHA/DOLE Safety & Quality Lead',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP Taguig Campus',
    contributions: [
      'Formulated DOLE-BOSH and OSHA compliant workshop safety protocols and PPE requirements.',
      'Established the 9 DOs and 9 DONTs safety framework for air blow gun operation.',
      'Conducted workshop hazard identification and student emergency response drills.'
    ]
  },
  {
    id: 'team-5',
    name: 'Technical Documentation Lead',
    role: 'SOP Author & Digital Systems Specialist',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP Taguig Campus',
    contributions: [
      'Authored the 15-step illustrated Standard Operating Procedure (SOP) with step-by-step imagery.',
      'Developed and structured content for the interactive digital operational manual and web twin.',
      'Coordinated photographic documentation of all laboratory stages, valves, and workstation drops.'
    ]
  }
];
