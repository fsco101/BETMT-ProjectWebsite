import { StudyOverview, TeamMember } from '../types/pneumatic';

export const studyOverviewData: StudyOverview = {
  title: 'Design and Development of a Centralized Compressed Air Distribution System for Machine Shop Laboratories',
  eyebrow: 'Undergraduate Engineering Technology Research & Laboratory Development',
  subtitle: 'An organized and accessible compressed air system engineered for machine shop cleaning efficiency, safety, and convenience at TUP - Taguig Campus.',
  institution: 'Technological University of the Philippines - Taguig Campus',
  department: 'Mechanical & Allied Department (MAAD)',
  academicYear: 'Batch 2023–2027',
  abstract:
    'Our study focuses on the Design and Development of a Centralized Compressed Air Distribution System for Machine Shop Laboratories at the Technological University of the Philippines - Taguig Campus. The project aims to provide an organized and accessible compressed air system that helps students and instructors clean metal chips, dust, and debris from machine shop equipment and work areas using a spray blow gun. By providing accessible hose outlets in different workshop areas, the system aims to improve cleaning efficiency, convenience, and safety while supporting proper housekeeping practices in the laboratory.',
  backgroundRationale:
    'Compressed air passes through the main line in series, using a 1-inch pipe, then branches out in parallel through 1/2-inch pipes to the three machining areas, supplying six hose outlets for its intended purpose. Providing dedicated regulated drops at 30 PSI prevents hazards, ensures safety, and improves laboratory housekeeping across all machines.',
  significance: [
    'Centralized infrastructure eliminates scattered portable units and simplifies machine cleaning.',
    'Integrated refrigerant drying eliminates moisture and protects pneumatic tooling and workshop assets.',
    'Dedicated pressure reducing valves (PRV) guarantee safe 30 PSI cleaning limits.',
    'Overhead retractable hose reels eliminate ground tripping hazards across student work aisles.',
    'Accessible hose outlets across three machining areas support consistent workshop housekeeping.'
  ],
  objectives: [
    {
      id: 'obj-1',
      title: 'Problem Identification',
      description: 'Identify the problems encountered in cleaning machine shop laboratories.'
    },
    {
      id: 'obj-2',
      title: 'Design & Development',
      description: 'Design and develop a centralized compressed air distribution system with accessible hose outlets.'
    },
    {
      id: 'obj-3',
      title: 'Performance & Safety Evaluation',
      description: 'Evaluate the system in terms of cleaning efficiency, safety, and convenience.'
    },
    {
      id: 'obj-4',
      title: 'Housekeeping & Practice Promotion',
      description: 'Promote proper cleaning practices and a more organized workshop environment.'
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
      department: 'Mechanical and Allied Department — Group 1 - Batch 2023-2027',
      role: 'Project Guidance & Fluid Power Technical Advising'
    },
    {
      name: 'Prof. Roberto Santos',
      title: 'Department Head',
      department: 'Mechanical and Allied Department — Group 1 - Batch 2023-2027',
      role: 'Administrative Support & Laboratory Resource Coordination'
    }
  ]
};

export const teamDriveFolderUrl = 'https://drive.google.com/drive/folders/1-K9g-Qe83-VOHRCIA5gtDtutlIDzIMQJ';

export const teamIntro = {
  heading: 'Meet the Team',
  description:
    'We are 4th year Bachelor of Engineering Technology majoring in Mechanical Technology students at the Technological University of the Philippines - Taguig Campus, Batch 2023-27. This project represents our collaborative effort to design, develop, and evaluate a centralized compressed air distribution system for our machine shop laboratories.',
  department: 'Mechanical & Allied Department (MAAD)',
  program: 'Bachelor of Engineering Technology Major in Mechanical Technology',
  institution: 'Technological University of the Philippines - Taguig Campus'
};

export const researchTeamMembers: TeamMember[] = [
  {
    id: 'team-bayonito',
    name: 'Bayonito, Dexter O.',
    role: 'Project Lead & Systems Architect',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP - Taguig Campus (Batch 2023-27)',
    image: '/images/team/bayonito_dexter.jpg',
    contributions: [
      'Project planning, engineering calculations, and system sizing for the centralized compressed air distribution.',
      'Coordinated laboratory installation timeline, milestone scheduling, and inter-team technical synchronization.',
      'Lead author for study synthesis, technical documentation, and operational manual guidelines.'
    ]
  },
  {
    id: 'team-borromeo',
    name: 'Borromeo, Rj S.',
    role: 'Fabrication & Mechanical Piping Specialist',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP - Taguig Campus (Batch 2023-27)',
    image: '/images/team/borromeo_rj.jpg',
    contributions: [
      'Overhead main line (1-inch) and branch line (1/2-inch) pipe alignment, cutting, and threading.',
      'Rigid mounting of structural brackets, drop pipes, and isolation valves across the workshop bays.',
      'Performed pneumatic joint sealing and anti-vibration clamp installations.'
    ]
  },
  {
    id: 'team-bustamante',
    name: 'Bustamante, Eughentheo',
    role: 'CAD Design & 3D Modeling Specialist',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP - Taguig Campus (Batch 2023-27)',
    image: '/images/team/bustamante_eughentheo.jpg',
    contributions: [
      '2D and 3D CAD modeling of the machine shop laboratory layout and pipe network distribution.',
      'Detailed isometric drawings and schematic representations of drop stations and FRL connections.',
      'Verified spatial clearances around lathes, mills, and CNC equipment.'
    ]
  },
  {
    id: 'team-doming',
    name: 'Doming, Jeiel O.',
    role: 'Fluid Power & Pneumatics Lead',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP - Taguig Campus (Batch 2023-27)',
    image: '/images/team/doming_jeiel.jpg',
    contributions: [
      'Selection and calibration of Filter-Regulator-Lubricator (FRL) units and Pressure Reducing Valves (PRV).',
      'Ensured strict compliance with the 30 PSI cleaning pressure standard across all 6 drop stations.',
      'Configured quick-connect couplers and downstream pressure monitoring gauges.'
    ]
  },
  {
    id: 'team-enriquez',
    name: 'Enriquez, Jayson C.',
    role: 'Safety Compliance & BOSH Protocol Officer',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP - Taguig Campus (Batch 2023-27)',
    image: '/images/team/enriquez_jayson.jpg',
    contributions: [
      'Developed DOs and DON\'Ts safety protocols adhering to DOLE-BOSH and OSHA workshop standards.',
      'Established mandatory PPE requirements and safe air blow gun handling guidelines.',
      'Formulated laboratory hazard assessments and emergency response protocols.'
    ]
  },
  {
    id: 'team-laudenorio',
    name: 'Laudenorio, Louie M.',
    role: 'System Testing & Commissioning Lead',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP - Taguig Campus (Batch 2023-27)',
    image: '/images/team/laudenorio_louie.jpg',
    contributions: [
      'Hydrostatic and pneumatic pressure hold testing across 1.5x working pressure conditions.',
      'Pressure drop monitoring from compressor manifold to the farthest drop station (Outlet 6).',
      'Documented flow rates, line integrity, and zero-leak joint verifications.'
    ]
  },
  {
    id: 'team-meneses',
    name: 'Meneses, Jedrek Elmo D.',
    role: 'Technical Documentation & Manual Specialist',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP - Taguig Campus (Batch 2023-27)',
    image: '/images/team/meneses_jedrek.jpg',
    contributions: [
      'Authored the standard operating procedure (SOP) documentation and visual step-by-step guides.',
      'Digital asset organization and technical photography of physical system components.',
      'Assisted in web application content structuring and component specifications.'
    ]
  },
  {
    id: 'team-recabar',
    name: 'Recabar, Jayrald Ruzzel',
    role: 'Equipment Assembly & Workshop Integration Lead',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP - Taguig Campus (Batch 2023-27)',
    image: '/images/team/recabar_jayrald.jpg',
    contributions: [
      'Physical assembly of air compressor, receiver tank, and refrigerated air dryer connections.',
      'Installation and tension calibration of 6 overhead retractable hose reels.',
      'Routing of air delivery lines to lathe, milling, and bench work zones.'
    ]
  },
  {
    id: 'team-seriosa',
    name: 'Seriosa, Emmanuel Kyle R.',
    role: 'Quality Assurance & Maintenance Analyst',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP - Taguig Campus (Batch 2023-27)',
    image: '/images/team/seriosa_emmanuel.jpg',
    contributions: [
      'Evaluated machine shop cleaning efficiency before and after centralized system deployment.',
      'Analyzed metal chip clearance times and chip containment using chip-guard air nozzles.',
      'Formulated daily, weekly, and monthly preventative maintenance checklists.'
    ]
  },
  {
    id: 'team-tuyay',
    name: 'Tuyay, Charm Nicole C.',
    role: 'Data Analysis & Research Coordinator',
    program: 'Bachelor of Engineering Technology — Mechanical',
    institution: 'TUP - Taguig Campus (Batch 2023-27)',
    image: '/images/team/tuyay_charm.jpg',
    contributions: [
      'Statistical analysis of workshop cleaning time reductions and user satisfaction surveys.',
      'Coordinated data gathering from students, machine shop instructors, and laboratory technicians.',
      'Compilation and editing of academic research manuscripts and defense presentations.'
    ]
  }
];
