import { CircuitStage } from '../types/pneumatic';

export const circuitStages: CircuitStage[] = [
  {
    id: 'stage-01',
    stageNumber: 1,
    name: '01. Central Compressor',
    subtitle: 'Primary Atmospheric Induction',
    description: 'Industrial dual-stage reciprocating compressor drawing ambient air, pressurizing it to baseline workshop pressure inside a vibration-isolated and acoustically dampened enclosure.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjKSZw4hvaidBnUxhWnkqFE3NP9RqovULVG4XW6U6NvKx4UZia88b_XSQQRsiDeqdoSsI5-0Nsmi7dLUVXAUCNPAuIpJyN9LOP_1PrDgY4bqrzndTLGkfnmPAHqygyzwtC3E12tlW3KRG15VgDXzlJwyQolf3A3C181dZcaKynkf6JI3CjoKNaueHDnmxsBkdCsuu7stFtVa-r8lVjb8KuiJ_ayWxudntYmqPKlNR4pHehQB8EnLhBOg',
    metricLabel: 'Capacity / Motor',
    metricValue: '15 kW / 20 HP',
    isoStandard: 'ISO 1217 Annex C',
    maintenanceInterval: '500 Operating Hours',
    detailedSpecs: [
      { label: 'Displacement', value: '2,400 L/min (85 CFM)' },
      { label: 'Operating Pressure', value: '8.5 - 10.0 Bar Max' },
      { label: 'Cooling Method', value: 'Forced Air with Intercooler' },
      { label: 'Lubrication', value: 'Synthetic PAG Fluid' }
    ]
  },
  {
    id: 'stage-02',
    stageNumber: 2,
    name: '02. Particulate Filter 1',
    subtitle: 'Mechanical Coarse Separation',
    description: 'Cyclonic and sintered bronze filter element capturing gross solid debris, rust scale, and heavy liquid water droplets before raw air enters the refrigeration cycle.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlc1N9T0-J7Or28cvXzolZsQAaFK-sg1l5ti_IVzQ5Z0ZpyVVH3ZAO1groCs9VLpA9hoXljfBuvG3BrcGHPpz8d41K5uGkkndFQmKweLkLhW54vlyCxq-myBDm8VluBQWEo_0Nwac9olr8YhHX-lMUxVpJOkpeXPt4sNZTurCg-YmS4yf86DD9l1bJBYfDzixPAP-ri8P8xTRk7l5uhj2zXh7MNl16E7iMh7pxqf4OMdu_Puraz4Ct0g',
    metricLabel: 'Threshold',
    metricValue: '5.0 Microns',
    isoStandard: 'ISO 8573-1:2010 Class 3',
    maintenanceInterval: 'Monthly Differential Pressure Check',
    detailedSpecs: [
      { label: 'Element Type', value: 'Sintered Bronze Matrix' },
      { label: 'Drain System', value: 'Float-Operated Auto Drain' },
      { label: 'Differential DP', value: '< 0.15 Bar Clean' },
      { label: 'Bowl Material', value: 'Die-cast Aluminum Guard' }
    ]
  },
  {
    id: 'stage-03',
    stageNumber: 3,
    name: '03. Refrigerant Air Dryer',
    subtitle: 'Vapor Condensation Loop',
    description: 'Thermodynamically cools the compressed airstream to force moisture vapor to condense and exhaust through timed automatic solenoids, preventing corrosion in distribution pipes.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNkp_tWB02De15s5jEWLTAQ7Gfwy8r2ViWEFkrOp1qfwytOhW1cPzJHMvVMEu16xmF9aMGEQAD0Fb_z0de0sK1Kjfxex6gNdwIC2-UY8SwafPcbb2i3CDq-rtnZ-w-ymNTCStMmSxGMdHs4CFXa34h7ObZOJVmHfcaFkeU_TfM84TkS99OZX5dMeh-H50iNQ8iFZyQyRjUUWFv0kw2y6Mb1wafvU4yqLTqZLsGg2paR4vrYwiooug6_g',
    metricLabel: 'Pressure Dew Point',
    metricValue: '+3°C (37°F)',
    isoStandard: 'ISO 8573-1 Class 4 Water Vapor',
    maintenanceInterval: 'Quarterly Condenser Fin Cleaning',
    detailedSpecs: [
      { label: 'Refrigerant', value: 'R134a Eco Ozone Safe' },
      { label: 'Heat Exchanger', value: 'Stainless Plate Counter-flow' },
      { label: 'Exhaust Solenoid', value: 'Timed Zero-Loss Electronic' },
      { label: 'Nominal Flow', value: '3,000 L/min Rating' }
    ]
  },
  {
    id: 'stage-04',
    stageNumber: 4,
    name: '04. Coalescing Filter 2',
    subtitle: 'Sub-Micron Aerosol Scrub',
    description: 'High-efficiency borosilicate microfiber matrix capturing residual sub-micron lubricating oil mists and fine particulates, purifying the stream to Class 1/2 standards.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMKZLBP4TbjuYO6VNR5MY4wbtPk9YuCWt36LpXkF3gDAYJC-YKQLbmZhYn1q63Dp966X3pxgOSAOEUtoLEkcsQICS0rmmjKvMsTvlKMfzIEQ4mqy9zd4aqDZ09i-GAk6RGvb9vQBRYBp5SDrWG9rqYPz6AfH1giAJ_0CH6YUg8f7UOGjNJx1CGJI7wcjfl9ghC9Fe_6zfaduwH6kUmFH46k7g6KikflWdq4kQSBBsMXHZ1WFjCvOiidA',
    metricLabel: 'Purity Class',
    metricValue: '0.01 Micron',
    isoStandard: 'ISO 8573-1:2010 Class 1:2:1',
    maintenanceInterval: 'Bi-annual Element Core Replacement',
    detailedSpecs: [
      { label: 'Oil Carryover', value: '< 0.01 mg/m³ (0.01 ppm)' },
      { label: 'Matrix', value: 'Pleated Borosilicate Glass' },
      { label: 'DP Indicator', value: 'Color-Coded Dial Calibrated' },
      { label: 'Efficiency', value: '99.999% Aerosol Arrestance' }
    ]
  },
  {
    id: 'stage-05',
    stageNumber: 5,
    name: '05. Air Receiver Tank',
    subtitle: 'Pressure Dampening & Storage',
    description: 'Vertical ASME pressure vessel equipped with calibrated relief valve, absorbing pneumatic pulse surges, dampening compressor cycles, and storing buffer capacity.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvmsEnCue6Pw3MdH5lwPbyLz-JrA856qbAo5F1lAokqxsWctBJ_cZNOzAnluJPLhg9s1rPs7X9OjkxWZK75AX4O7N4r2ckBzR5odf6T5Ns8YDs9Bd-NkUAhLWXzGCPIvT-ECKwlBewNt5EokFBiZ4rIbTEvoclusgF7YyYK3bOETBJtH51p35My2M4J6WCh-gCW-3wbaKVpLmQKQFe0Fm_fuZkxlhwymOaqriia4ygriZcH7Cyr4C0xQ',
    metricLabel: 'ASME Volume',
    metricValue: '500 L / 132 Gal',
    isoStandard: 'ASME BPVC Section VIII Div 1',
    maintenanceInterval: 'Annual Ultrasonic Thickness & Hydro Test',
    detailedSpecs: [
      { label: 'Design Pressure', value: '11.0 Bar (160 PSI)' },
      { label: 'Safety Relief Valve', value: 'Set at 9.5 Bar Certified' },
      { label: 'Bottom Drain', value: 'Automatic Motorized Ball Valve' },
      { label: 'Manhole Inspection', value: 'Standard Handhole Aperture' }
    ]
  },
  {
    id: 'stage-06',
    stageNumber: 6,
    name: '06. Main Header Loop',
    subtitle: 'Closed-Circuit Conduits',
    description: 'Overhead powder-coated ISO blue ring manifold pitched at 1:100 slope to ensure balanced flow velocity without dead-ends or stagnant moisture pockets.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVtSg7VIRo9xczlgjZ9e6VOmfexqntrLiYRDDclgMXdADYGKa45XVtkYRHogtoqHZNUGNqmmal_ZECZl_4STILLQuvFizaeiIdl1A2yDzdjJBketPmVc89qllGQ_9Vo1AEzuouy8bw5ksOzC0tn2Lmn5sdw901T1VpIdgBm-Jmc-NFUiGZ_AR4Xs2lDIPqaChxro4TaiZ_jTTfrnb3FC2pIPmYv_Q5c1rQWUXnXUCclMq7v2yTqZVgJw',
    metricLabel: 'Bore / Diameter',
    metricValue: '1.0 Inch ISO Blue',
    isoStandard: 'ISO 5024 Aluminum Alloy Pipe',
    maintenanceInterval: 'Quarterly Ultrasonic Acoustic Leak Audit',
    detailedSpecs: [
      { label: 'Topology', value: 'Closed-Loop Ring Geometry' },
      { label: 'Slope Ratio', value: '1:100 toward Drainage Legs' },
      { label: 'Material', value: 'Anodized Marine Alloy 6063' },
      { label: 'Velocity', value: '< 6.0 m/s Flow Velocity' }
    ]
  },
  {
    id: 'stage-07',
    stageNumber: 7,
    name: '07. Drop Leg Assemblies',
    subtitle: 'Gooseneck Takeoffs & Regulators',
    description: 'Overhead top takeoffs curving downward with sediment drip legs, individual quarter-turn brass ball shutoff valves, and calibrated station dial regulators.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlv1QDaFofI2oJ7Y6xZ-oIL9_jUJNGqgPzEHkd4ETQ_KOheu-Z9imACNNh5gyGdSm-qyaQ0VyCWLONZy0z1j5sLqUaPxz4EWxUfaHhCMgO49RHVSb4tS0Oer9DkNvWjdRNNLw2ojExVDrwbWcbOSjMhgwxfuXZGP6utSmkui_yF3p3H_KnC6XH3uePyoOSZFB-dEnS2L5SzWDgz4YmbpPYYcZ7x43af7155oYSns5hNgQg-1uy-X7TVg',
    metricLabel: 'Network Drops',
    metricValue: '6 Station Drops',
    isoStandard: 'ASME B31.3 Process Piping',
    maintenanceInterval: 'Monthly Valve Seal & Seat Inspection',
    detailedSpecs: [
      { label: 'Takeoff Style', value: '180° Gooseneck Overhead Saddle' },
      { label: 'Isolation', value: '1/2" Full-Port Lockout Valve' },
      { label: 'Moisture Trap', value: 'Bottom Reservoir Drip Leg' },
      { label: 'Regulator', value: 'Lockable Tamper-Resistant Knob' }
    ]
  },
  {
    id: 'stage-08',
    stageNumber: 8,
    name: '08. Bench Couplers & Tools',
    subtitle: 'Safety Disconnects & Blowguns',
    description: 'Quick-release safety push-lock couplers delivering dry regulated air directly into tamper-proof OSHA safety chip-clearing blowguns and certified shop air tools.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoBa8cpAMTI6uStkbL3XpbeV8i5Hb3GsE1NEHAGNhmvhV3d-MyN4dpfjeABp6nnAPCpL-_ktFnXs2dUskWwmyS-1nwDyB1GqzvrSehIp4E47MKUEmjyHoDH_WNb48kHpUSrfNSk7UM0_BF8JkOrMQ-E9SWN2VRX1CexLju7vfLIMeM88SZNDSISMhWHyXTa3V6zIQC17h0pjtRGrSso3FgIgNR-CR54gavUwcsEO_IFuIWhAAy5uG7EQ',
    metricLabel: 'Operating Range',
    metricValue: '6.0 - 7.0 Bar',
    isoStandard: 'OSHA 1910.242(b) & ISO 4414',
    maintenanceInterval: 'Weekly Whip-Check & Sleeve Spring Check',
    detailedSpecs: [
      { label: 'Coupler Profile', value: 'ISO 6150-B Safety Venting' },
      { label: 'Nozzle Standoff', value: '≥ 100 mm Minimum Clearance' },
      { label: 'Venturi Venting', value: '< 30 PSI Deadhead Relief' },
      { label: 'Whip-Check', value: 'Galvanized Steel Tether Cable' }
    ]
  }
];
