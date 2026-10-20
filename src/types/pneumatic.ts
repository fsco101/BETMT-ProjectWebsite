export interface CircuitStage {
  id: string;
  stageNumber: number;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  images?: string[];
  imageCaptions?: string[];
  metricLabel: string;
  metricValue: string;
  isoStandard?: string;
  maintenanceInterval?: string;
  detailedSpecs: { label: string; value: string }[];
}

export interface DropStation {
  id: string;
  stationNumber: number;
  name: string;
  zone: string;
  zoneLabel?: string;
  area: string;
  requiredPsi: string;
  use: string;
  description?: string;
  image: string;
  valveType: string;
  couplingType: string;
  regulatorSpec: string;
  isolationManifold: string;
  nominalPressureBar: number;
  maxPressureBar: number;
  defaultScfm: number;
  connectedEquipment: string;
}

export interface SafetyProtocolItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  image?: string;
  images?: string[];
  videoUrl?: string;
  badge: string;
  protocolRef: string;
  detailTitle: string;
  detailBody: string;
  tags: { label: string; highlight?: boolean }[];
  isProhibition: boolean;
}

export interface SopStep {
  id: string;
  stepNumber: number;
  category: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  imageCaptions?: string[];
  badgePrimary: string;
  badgeSecondary: string;
  verificationCriteria: string;
  keySafetyRule: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  image: string;
  department: string;
  credentials: string;
}

export interface StationLiveState {
  isOpen: boolean;
  regulatorBar: number;
  actualPressureBar: number;
  scfmDemand: number;
  whipCheckEngaged: boolean;
  toolConnected: boolean;
}

export interface PneumaticState {
  mainHeaderPressure: number; // 6.8 nominal
  compressorStatus: 'running' | 'idling' | 'depressurized';
  stations: Record<string, StationLiveState>;
  totalScfm: number;
  dewPointCelsius: number;
  isEmergencyDepressurized: boolean;
  purgeProgress: number; // 0 to 100
  audioEnabled: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  program: string;
  institution: string;
  email?: string;
  contributions: string[];
  image?: string;
}

export interface StudyObjective {
  id: string;
  title: string;
  description: string;
}

export interface StudyMethodologyStage {
  step: string;
  title: string;
  description: string;
}

export interface StudyOverview {
  title: string;
  eyebrow: string;
  subtitle: string;
  department: string;
  institution: string;
  academicYear: string;
  abstract: string;
  backgroundRationale: string;
  significance: string[];
  objectives: StudyObjective[];
  methodology: StudyMethodologyStage[];
  advisers: {
    name: string;
    title: string;
    department: string;
    role: string;
  }[];
}

