import { SopStep } from '../types/pneumatic';

export const sopSteps: SopStep[] = [
  {
    id: 'step-01',
    stepNumber: 1,
    title: 'Pre-Operational Visual Inspection',
    description: 'Examine the wall-mounted drop receiver manifold, column pressure gauge, fittings, and air drain bowl. Confirm absolute absence of audible hissing, physical cracks, or loose mounting hardware before connecting any hose.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjKSZw4hvaidBnUxhWnkqFE3NP9RqovULVG4XW6U6NvKx4UZia88b_XSQQRsiDeqdoSsI5-0Nsmi7dLUVXAUCNPAuIpJyN9LOP_1PrDgY4bqrzndTLGkfnmPAHqygyzwtC3E12tlW3KRG15VgDXzlJwyQolf3A3C181dZcaKynkf6JI3CjoKNaueHDnmxsBkdCsuu7stFtVa-r8lVjb8KuiJ_ayWxudntYmqPKlNR4pHehQB8EnLhBOg',
    badgePrimary: 'Zero Leakage',
    badgeSecondary: 'Visual & Acoustic Baseline Pass',
    verificationCriteria: 'Manifold securely fastened, bowl drained, no cracks or audible hissing.',
    keySafetyRule: 'Never pressurize a line with a visibly fractured polycarbonate filter bowl.'
  },
  {
    id: 'step-02',
    stepNumber: 2,
    title: 'Hose Connection & Whip-Check Engagement',
    description: 'Slide back the quick-connect female sleeve and insert the hardened brass tool plug until hearing an audible snap click. Fasten the steel braided whip-check cable firmly across both joint ends to arrest accidental decouple whip.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoBa8cpAMTI6uStkbL3XpbeV8i5Hb3GsE1NEHAGNhmvhV3d-MyN4dpfjeABp6nnAPCpL-_ktFnXs2dUskWwmyS-1nwDyB1GqzvrSehIp4E47MKUEmjyHoDH_WNb48kHpUSrfNSk7UM0_BF8JkOrMQ-E9SWN2VRX1CexLju7vfLIMeM88SZNDSISMhWHyXTa3V6zIQC17h0pjtRGrSso3FgIgNR-CR54gavUwcsEO_IFuIWhAAy5uG7EQ',
    badgePrimary: 'Coupling: Positive Snap',
    badgeSecondary: 'Tethered Whip Guard Engaged',
    verificationCriteria: 'Audible metallic click upon connection; whip-check looped with taut safety margin.',
    keySafetyRule: 'Operating without a safety whip-check cable is an immediate safety violation.'
  },
  {
    id: 'step-03',
    stepNumber: 3,
    title: 'Operating Pressure Verification',
    description: 'Read the localized analog drop dial gauge. Confirm indicator needle stabilizes strictly inside the calibrated safe zone between 6.0 and 7.0 Bar (87 to 100 PSI). Adjust regulator knob clockwise or counter-clockwise if out of range.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvmsEnCue6Pw3MdH5lwPbyLz-JrA856qbAo5F1lAokqxsWctBJ_cZNOzAnluJPLhg9s1rPs7X9OjkxWZK75AX4O7N4r2ckBzR5odf6T5Ns8YDs9Bd-NkUAhLWXzGCPIvT-ECKwlBewNt5EokFBiZ4rIbTEvoclusgF7YyYK3bOETBJtH51p35My2M4J6WCh-gCW-3wbaKVpLmQKQFe0Fm_fuZkxlhwymOaqriia4ygriZcH7Cyr4C0xQ',
    badgePrimary: 'Tolerance: ±0.2 Bar',
    badgeSecondary: 'Calibrated 6.0 - 7.0 Bar',
    verificationCriteria: 'Needle rest position verified between 6.0 and 7.0 Bar on calibrated face.',
    keySafetyRule: 'Do not adjust regulator past 7.0 Bar without written instructor clearance.'
  },
  {
    id: 'step-04',
    stepNumber: 4,
    title: 'Smooth Ball Valve Opening',
    description: 'Grasp the yellow quarter-turn isolation handle and sweep smoothly 90° into parallel alignment with the downward pipe. Smooth opening prevents hydraulic pressure shock waves from violently stressing the hose core.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVtSg7VIRo9xczlgjZ9e6VOmfexqntrLiYRDDclgMXdADYGKa45XVtkYRHogtoqHZNUGNqmmal_ZECZl_4STILLQuvFizaeiIdl1A2yDzdjJBketPmVc89qllGQ_9Vo1AEzuouy8bw5ksOzC0tn2Lmn5sdw901T1VpIdgBm-Jmc-NFUiGZ_AR4Xs2lDIPqaChxro4TaiZ_jTTfrnb3FC2pIPmYv_Q5c1rQWUXnXUCclMq7v2yTqZVgJw',
    badgePrimary: 'Rotation: 90° Sweep',
    badgeSecondary: 'No Hydraulic Pressure Hammer',
    verificationCriteria: 'Valve lever swung gently over 2 seconds into full-open parallel position.',
    keySafetyRule: 'Never snap a ball valve open instantly; hydraulic pressure surge can cause line ruptures.'
  },
  {
    id: 'step-05',
    stepNumber: 5,
    title: 'Chip Clearing & Tool Operation',
    description: 'Maintain minimum 100 mm (4 in) standoff distance from the workpiece surface. Direct high-speed metal swarf at 45° strictly into machine chip trays and catch guards; never toward personnel aisles.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlv1QDaFofI2oJ7Y6xZ-oIL9_jUJNGqgPzEHkd4ETQ_KOheu-Z9imACNNh5gyGdSm-qyaQ0VyCWLONZy0z1j5sLqUaPxz4EWxUfaHhCMgO49RHVSb4tS0Oer9DkNvWjdRNNLw2ojExVDrwbWcbOSjMhgwxfuXZGP6utSmkui_yF3p3H_KnC6XH3uePyoOSZFB-dEnS2L5SzWDgz4YmbpPYYcZ7x43af7155oYSns5hNgQg-1uy-X7TVg',
    badgePrimary: 'Distance: ≥ 100 mm',
    badgeSecondary: 'Chip Deflector Guard Active',
    verificationCriteria: 'Nozzle held strictly ≥ 100mm from metal turnings; chip guard positioned downward.',
    keySafetyRule: 'Never blast compressed air toward other students or across workshop footpaths.'
  },
  {
    id: 'step-06',
    stepNumber: 6,
    title: 'Valve Isolation & Pressure Depletion',
    description: 'Rotate the wall isolation lever 90° perpendicular (shut position). Point blowgun into machine chip enclosure and press trigger until air hissing entirely ceases, venting internal line pressure to exact 0 PSI.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlc1N9T0-J7Or28cvXzolZsQAaFK-sg1l5ti_IVzQ5Z0ZpyVVH3ZAO1groCs9VLpA9hoXljfBuvG3BrcGHPpz8d41K5uGkkndFQmKweLkLhW54vlyCxq-myBDm8VluBQWEo_0Nwac9olr8YhHX-lMUxVpJOkpeXPt4sNZTurCg-YmS4yf86DD9l1bJBYfDzixPAP-ri8P8xTRk7l5uhj2zXh7MNl16E7iMh7pxqf4OMdu_Puraz4Ct0g',
    badgePrimary: 'Exhaust: 0 PSI',
    badgeSecondary: 'Stored Kinetic Energy Neutralized',
    verificationCriteria: 'Wall lever turned perpendicular; trigger squeezed until zero residual pressure.',
    keySafetyRule: 'Disconnecting a line with stored air pressure turns the brass plug into a projectile.'
  },
  {
    id: 'step-07',
    stepNumber: 7,
    title: 'Disconnection & 5S Coil Storage',
    description: 'With 0 PSI confirmed, retract the coupler sleeve smoothly to release the plug. Neatly wind the pneumatic hose in uniform 300 mm loops and hang upon the dedicated wall saddle bracket, keeping shop walkways clean.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNkp_tWB02De15s5jEWLTAQ7Gfwy8r2ViWEFkrOp1qfwytOhW1cPzJHMvVMEu16xmF9aMGEQAD0Fb_z0de0sK1Kjfxex6gNdwIC2-UY8SwafPcbb2i3CDq-rtnZ-w-ymNTCStMmSxGMdHs4CFXa34h7ObZOJVmHfcaFkeU_TfM84TkS99OZX5dMeh-H50iNQ8iFZyQyRjUUWFv0kw2y6Mb1wafvU4yqLTqZLsGg2paR4vrYwiooug6_g',
    badgePrimary: 'Standard: 5S Workshop',
    badgeSecondary: '300mm Neat Saddle Hanging',
    verificationCriteria: 'Hose coiled cleanly without kinks; secured onto wall hook off walking deck.',
    keySafetyRule: 'Hoses left lying on shop floors are primary tripping hazards and subject to tire crush.'
  }
];
