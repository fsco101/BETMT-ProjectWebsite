import { SafetyProtocolItem } from '../types/pneumatic';

export const mandatoryPractices: SafetyProtocolItem[] = [
  {
    id: 'do-1',
    number: '01',
    title: 'Mandatory Personal Protective Equipment',
    summary: 'Always wear certified ANSI Z87.1 impact-resistant safety glasses with side shields, hearing protection earmuffs, and shop coat prior to touching pneumatic valves or line connections.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjKSZw4hvaidBnUxhWnkqFE3NP9RqovULVG4XW6U6NvKx4UZia88b_XSQQRsiDeqdoSsI5-0Nsmi7dLUVXAUCNPAuIpJyN9LOP_1PrDgY4bqrzndTLGkfnmPAHqygyzwtC3E12tlW3KRG15VgDXzlJwyQolf3A3C181dZcaKynkf6JI3CjoKNaueHDnmxsBkdCsuu7stFtVa-r8lVjb8KuiJ_ayWxudntYmqPKlNR4pHehQB8EnLhBOg',
    badge: 'Mandatory PPE',
    protocolRef: 'Standard Operating Protocol 1.1',
    detailTitle: 'High-Velocity Particle & Acoustic Containment',
    detailBody: 'Operating at 6.0–7.0 Bar generates high-velocity airborne swarf, carbide debris, and localized noise levels exceeding 92 dBA. Polycarbonate eyewear prevents corneal laceration, while dual-earcup acoustic dampers mitigate hearing injury.',
    tags: [
      { label: 'Standard: ANSI Z87.1' },
      { label: 'Acoustic Guard: NRR 28dB' },
      { label: 'Status: Active', highlight: true }
    ],
    isProhibition: false
  },
  {
    id: 'do-2',
    number: '02',
    title: 'Pre-Flight Line & Hose Integrity Check',
    summary: 'Inspect full polyurethane hose length for cuts, abrasions, bubbles, or soft bulges. Confirm the steel safety whip-check cable is properly tethered across connector couplers.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoBa8cpAMTI6uStkbL3XpbeV8i5Hb3GsE1NEHAGNhmvhV3d-MyN4dpfjeABp6nnAPCpL-_ktFnXs2dUskWwmyS-1nwDyB1GqzvrSehIp4E47MKUEmjyHoDH_WNb48kHpUSrfNSk7UM0_BF8JkOrMQ-E9SWN2VRX1CexLju7vfLIMeM88SZNDSISMhWHyXTa3V6zIQC17h0pjtRGrSso3FgIgNR-CR54gavUwcsEO_IFuIWhAAy5uG7EQ',
    badge: 'Pre-Flight Check',
    protocolRef: 'Standard Operating Protocol 1.2',
    detailTitle: 'Mechanical Hose Fatigue & Coupler Locking',
    detailBody: 'Tears or microscopic fatigue pinholes under 100 PSI pressure can propagate into catastrophic burst fractures within milliseconds. The galvanized steel whip-check prevents whip lash injury if a coupling separates.',
    tags: [
      { label: 'Burst Rating: 20 Bar' },
      { label: 'Cable: Galv Steel' }
    ],
    isProhibition: false
  },
  {
    id: 'do-3',
    number: '03',
    title: 'Safe Operating Distance & Chip Deflection',
    summary: 'Maintain a minimum nozzle standoff distance of 100 mm (4 inches) from parts. Position chip shield deflectors downward toward catch trays; never blast shavings across walkways.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlv1QDaFofI2oJ7Y6xZ-oIL9_jUJNGqgPzEHkd4ETQ_KOheu-Z9imACNNh5gyGdSm-qyaQ0VyCWLONZy0z1j5sLqUaPxz4EWxUfaHhCMgO49RHVSb4tS0Oer9DkNvWjdRNNLw2ojExVDrwbWcbOSjMhgwxfuXZGP6utSmkui_yF3p3H_KnC6XH3uePyoOSZFB-dEnS2L5SzWDgz4YmbpPYYcZ7x43af7155oYSns5hNgQg-1uy-X7TVg',
    badge: 'Operating Distance',
    protocolRef: 'Standard Operating Protocol 1.3',
    detailTitle: 'Deflection Physics & Chip Recoil Prevention',
    detailBody: 'Holding nozzles closer than 100 mm creates backpressure that ricochets razor-sharp metal turnings straight back toward the operator\'s face and arms. Shield discs direct airflow downward.',
    tags: [
      { label: 'Standoff: ≥ 100 mm' },
      { label: 'Deflector: Polycarbonate' }
    ],
    isProhibition: false
  },
  {
    id: 'do-4',
    number: '04',
    title: 'Complete Line Depressurization & OSHA Blowguns',
    summary: 'Use only OSHA-compliant safety blowguns (<30 PSI). Always close the drop shutoff valve and squeeze blowgun trigger until line pressure reaches 0 PSI before disconnecting quick fittings.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlc1N9T0-J7Or28cvXzolZsQAaFK-sg1l5ti_IVzQ5Z0ZpyVVH3ZAO1groCs9VLpA9hoXljfBuvG3BrcGHPpz8d41K5uGkkndFQmKweLkLhW54vlyCxq-myBDm8VluBQWEo_0Nwac9olr8YhHX-lMUxVpJOkpeXPt4sNZTurCg-YmS4yf86DD9l1bJBYfDzixPAP-ri8P8xTRk7l5uhj2zXh7MNl16E7iMh7pxqf4OMdu_Puraz4Ct0g',
    badge: 'Depressurization',
    protocolRef: 'Standard Operating Protocol 1.4',
    detailTitle: 'Stored Kinetic Discharge & 5S Coiling',
    detailBody: 'Disconnecting pressurized couplings releases explosive backflow capable of propelling brass plugs like ballistic projectiles. Depressurizing to absolute 0 PSI prior to collar retraction completely neutralizes mechanical hazard.',
    tags: [
      { label: 'OSHA 1910.242(b) Nozzle' },
      { label: 'Residual: 0 PSI' }
    ],
    isProhibition: false
  }
];

export const strictProhibitions: SafetyProtocolItem[] = [
  {
    id: 'dont-1',
    number: '01',
    title: 'DO NOT Direct Compressed Air at Skin, Face, or Clothes',
    summary: 'Zero tolerance violation. Never aim pressurized nozzles at human bodies or clothing. Air forced through pores can cause fatal arterial gas embolism, eardrum rupture, and permanent blindness.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV6zTsb_J32mjILs4u4vvDUenEwEXr_qYp_lJVN4xAORnvtLmP_zxzpSktZKlgZpWzKedEqlaSMMI8jYMU81MRVIojxWh1iUfJf6UOzuBPujzxRH6wkYbydtzZW5I9otI9iaTEuIJKfZLuNL6wL4uh2BuFgaibpdg2dKnS6fA_d0CHAwSALe2Cjv7YBhgRCGlmqBeIxVQZ_Hw7AMS5dz3AIO-fDW_sPfcFTPRdl0yvBQbTczBdJ-Irlg',
    badge: 'Critical Prohibition',
    protocolRef: 'Critical Failure Mode 01',
    detailTitle: 'Arterial Gas Penetration & Acoustic Blast',
    detailBody: 'Even at pressures as low as 15 PSI, air can penetrate the epidermis through microscopic skin pores, entering the vascular bloodstream. The resulting air bubbles travel directly to heart chambers and cerebral arteries, inducing fatal cardiac arrest.',
    tags: [
      { label: 'Violation: Fatal Hazard', highlight: true },
      { label: 'Lethal Entry: > 10 PSI' }
    ],
    isProhibition: true
  },
  {
    id: 'dont-2',
    number: '02',
    title: 'DO NOT Bypass or Tamper with Pressure Relief Valves',
    summary: 'Never override factory calibrated regulator limiters or wire safety relief valves shut. Any unauthorized modification to manifold controls results in immediate laboratory suspension.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvmsEnCue6Pw3MdH5lwPbyLz-JrA856qbAo5F1lAokqxsWctBJ_cZNOzAnluJPLhg9s1rPs7X9OjkxWZK75AX4O7N4r2ckBzR5odf6T5Ns8YDs9Bd-NkUAhLWXzGCPIvT-ECKwlBewNt5EokFBiZ4rIbTEvoclusgF7YyYK3bOETBJtH51p35My2M4J6WCh-gCW-3wbaKVpLmQKQFe0Fm_fuZkxlhwymOaqriia4ygriZcH7Cyr4C0xQ',
    badge: 'Critical Prohibition',
    protocolRef: 'Critical Failure Mode 02',
    detailTitle: 'Pressure Vessel Rupture & Shrapnel Overpressure',
    detailBody: 'The ASME safety relief valve on the 500-liter buffer tank is calibrated to trigger at 9.5 Bar. Defeating this valve risks explosive vessel fragmentation capable of collapsing workshop perimeter walls.',
    tags: [
      { label: 'Set Point: 9.5 Bar Max', highlight: true },
      { label: 'Standard: ASME Sec VIII' }
    ],
    isProhibition: true
  },
  {
    id: 'dont-3',
    number: '03',
    title: 'DO NOT Crimp or Pinch Hose to Stop Air Flow',
    summary: 'Never bend or fold a flexible line to halt airflow; the hose will rupture or tear free violently. Always isolate flow using the quarter-turn ball valve situated on the wall drop leg.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVtSg7VIRo9xczlgjZ9e6VOmfexqntrLiYRDDclgMXdADYGKa45XVtkYRHogtoqHZNUGNqmmal_ZECZl_4STILLQuvFizaeiIdl1A2yDzdjJBketPmVc89qllGQ_9Vo1AEzuouy8bw5ksOzC0tn2Lmn5sdw901T1VpIdgBm-Jmc-NFUiGZ_AR4Xs2lDIPqaChxro4TaiZ_jTTfrnb3FC2pIPmYv_Q5c1rQWUXnXUCclMq7v2yTqZVgJw',
    badge: 'Critical Prohibition',
    protocolRef: 'Critical Failure Mode 03',
    detailTitle: 'Polymer Shearing & Violent Hose Whipping',
    detailBody: 'Crimping concentrates pneumatic hydraulic shock at an acute fold point. When the inner braid shears, the hose separates violently, whipping wildly across machine tables at supersonic speeds.',
    tags: [
      { label: 'Banned: Hose Kinking', highlight: true },
      { label: 'Correct: 1/4 Turn Lever' }
    ],
    isProhibition: true
  },
  {
    id: 'dont-4',
    number: '04',
    title: 'DO NOT Exceed Rated Tool Pressure or Use Unverified Lines',
    summary: 'Never connect pneumatic tools to unregulated lines above their rated operating pressure (typically 90 PSI). Do not use makeshift fittings or uncertified unrated PVC airlines in the workshop.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMKZLBP4TbjuYO6VNR5MY4wbtPk9YuCWt36LpXkF3gDAYJC-YKQLbmZhYn1q63Dp966X3pxgOSAOEUtoLEkcsQICS0rmmjKvMsTvlKMfzIEQ4mqy9zd4aqDZ09i-GAk6RGvb9vQBRYBp5SDrWG9rqYPz6AfH1giAJ_0CH6YUg8f7UOGjNJx1CGJI7wcjfl9ghC9Fe_6zfaduwH6kUmFH46k7g6KikflWdq4kQSBBsMXHZ1WFjCvOiidA',
    badge: 'Critical Prohibition',
    protocolRef: 'Critical Failure Mode 04',
    detailTitle: 'Internal Turbine Over-speed & Shrapnel Ejection',
    detailBody: 'Pneumatic die grinders and turbines are engineered for a maximum 90 PSI. Connecting them to unregulated 120+ PSI lines causes bearing runaway speeds, shattering abrasive discs into high-speed shrapnel.',
    tags: [
      { label: 'Max Limit: 90 PSI (6.2 Bar)', highlight: true },
      { label: 'PVC Air Piping: BANNED' }
    ],
    isProhibition: true
  }
];
