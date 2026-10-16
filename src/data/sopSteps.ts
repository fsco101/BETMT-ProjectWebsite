import { SopStep } from '../types/pneumatic';

export const sopSteps: SopStep[] = [
  // A. COMPRESSOR START UP
  {
    id: 'step-01',
    stepNumber: 1,
    category: 'A. COMPRESSOR START UP',
    title: 'Starting the Air Compressor',
    description: 'Make sure the air compressor is ready for operation. Release the emergency stop button by twisting it, then press the green start button to turn on the compressor.',
    image: '/images/image40.png',
    images: ['/images/image40.png', '/images/image35.png'],
    imageCaptions: [
      '01 Figure 1 — Release Emergency Stop by Twisting & Press Green Start Button',
      '01 Figure 2 — Sullair Compressor Control Console in Operational Ready State'
    ],
    badgePrimary: 'Twist E-Stop',
    badgeSecondary: 'Green Start Button',
    verificationCriteria: 'Emergency stop released, green start button pressed, compressor motor running.',
    keySafetyRule: 'Inspect compressor perimeter and confirm absence of foreign items before starting.'
  },
  {
    id: 'step-02',
    stepNumber: 2,
    category: 'A. COMPRESSOR START UP',
    title: 'Starting the Refrigerant Air Dryer',
    description: 'Locate the refrigerant air dryer beside the compressor and press the green start button. The dryer removes moisture from the compressed air before it enters the distribution system.',
    image: '/images/image7.png',
    images: ['/images/image7.png'],
    imageCaptions: [
      '02 Figure — Locate Refrigerant Dryer Beside Compressor & Press Green Start Button'
    ],
    badgePrimary: 'Dryer Unit Active',
    badgeSecondary: 'Moisture Removal Online',
    verificationCriteria: 'Refrigerant dryer power indicator illuminated, cooling system engaged.',
    keySafetyRule: 'Dryer must be started with compressor to prevent moisture condensation in pipeline.'
  },
  {
    id: 'step-03',
    stepNumber: 3,
    category: 'A. COMPRESSOR START UP',
    title: 'Opening the Air Receiver Tank Ball Valve',
    description: 'Open the ball valve beside the air receiver tank to allow compressed air to flow into the tank. Wait until the system reaches the required operating pressure before using it.',
    image: '/images/image19.png',
    images: ['/images/image19.png', '/images/image5.png'],
    imageCaptions: [
      '03 Figure 1 — Open the Ball Valve Beside the Air Receiver Tank',
      '03 Figure 2 — Verify Air Receiver Pressure Stabilizes at Operating Level'
    ],
    badgePrimary: 'Ball Valve Open',
    badgeSecondary: 'Pressure Stabilization',
    verificationCriteria: 'Ball valve opened smoothly; pressure gauge verifies system operating pressure.',
    keySafetyRule: 'Open tank valve gradually to avoid violent initial pressure wave in pipe network.'
  },

  // B. OPERATING PROCEDURE
  {
    id: 'step-04',
    stepNumber: 4,
    category: 'B. OPERATING PROCEDURE',
    title: 'Checking the Upper Ball Valve',
    description: 'Before connecting the pneumatic tool, check that the upper ball valve is closed.',
    image: '/images/image2.png',
    images: ['/images/image2.png'],
    imageCaptions: [
      '04 Figure 1 — Verify Upper Ball Valve is in Closed (Perpendicular) Position'
    ],
    badgePrimary: 'Check Valve Shut',
    badgeSecondary: 'Isolation Verified',
    verificationCriteria: 'Upper valve handle is perpendicular to the pipe line prior to fitting insertion.',
    keySafetyRule: 'Never attempt to attach pneumatic tools while the drop station ball valve is open.'
  },
  {
    id: 'step-05',
    stepNumber: 5,
    category: 'B. OPERATING PROCEDURE',
    title: 'Connecting the Tool to the Quick-Connect Fitting',
    description: 'Connect the air blow gun to the hose reel\'s quick-connect fitting. Pull back the quick-connect, insert the air blow gun fitting, and put back the black sleeve to secure the connection.',
    image: '/images/image50.png',
    images: ['/images/image50.png', '/images/image29.png', '/images/image30.png', '/images/image41.png'],
    imageCaptions: [
      '05 Figure 01 — Retract Quick-Connect Collar Sleeve',
      '05 Figure 02 — Push Air Blow Gun Fitting Firmly into Coupler',
      '05 Figure 03 — Release Sleeve Back to Secure Forward Position',
      '05 Figure 04 — Perform Pull-Check to Confirm Audible Positive Snap Lock'
    ],
    badgePrimary: 'Retract Sleeve',
    badgeSecondary: 'Audible Snap Lock',
    verificationCriteria: 'Male tool fitting seated firmly; locking sleeve clicked back into forward locked position.',
    keySafetyRule: 'Always perform a physical tug test to confirm the quick-connect fitting cannot dislodge.'
  },
  {
    id: 'step-06',
    stepNumber: 6,
    category: 'B. OPERATING PROCEDURE',
    title: 'Open the Ball Valve',
    description: 'Turn the upper ball valve handle 90 degrees into parallel alignment with the drop pipe to supply compressed air to the hose reel and air blow gun.',
    image: '/images/image45.png',
    images: ['/images/image45.png'],
    imageCaptions: [
      '06 Figure 01 — Rotate Upper Ball Valve Handle to Open (Parallel) Position'
    ],
    badgePrimary: 'Quarter-Turn Open',
    badgeSecondary: 'Line Charged',
    verificationCriteria: 'Valve handle parallel to flow; hose reel line pressurized smoothly.',
    keySafetyRule: 'Turn the handle smoothly over 2 seconds rather than snapping it open abruptly.'
  },
  {
    id: 'step-07',
    stepNumber: 7,
    category: 'B. OPERATING PROCEDURE',
    title: 'Extending the Retractable Hose Reel',
    description: 'Carefully pull the hose reel to extend the hose to the required working area. Avoid pulling the hose abruptly or allowing it to become tangled. Make sure the hose is positioned properly and does not block walkways.',
    image: '/images/image31.png',
    images: ['/images/image31.png', '/images/image22.png'],
    imageCaptions: [
      '07 Figure 01 — Smoothly Extend Hose from Spring-Loaded Reel to Desired Length',
      '07 Figure 02 — Route Hose Safely Along Machine Beds Clear of Walkway Tripping Hazards'
    ],
    badgePrimary: 'Smooth Extension',
    badgeSecondary: 'Keep Walkways Clear',
    verificationCriteria: 'Hose locked at ratchet position; route does not obstruct student walk paths.',
    keySafetyRule: 'Never pull beyond maximum reel travel limit or leave hose stretched across walkways.'
  },
  {
    id: 'step-08',
    stepNumber: 8,
    category: 'B. OPERATING PROCEDURE',
    title: 'Positioning and Operating the Air Blow Gun',
    description: 'Hold the air blow gun firmly and position its nozzle approximately 2 inches from the worktable surface. Maintain a stable position and direct the nozzle away from yourself and other people. Squeeze the air blow gun trigger to release compressed air and clean the worktable or designated work area. Direct the airflow away from yourself and other people.',
    image: '/images/image38.png',
    images: ['/images/image38.png'],
    imageCaptions: [
      '08 Figure 01 — Hold Blow Gun Firmly ~2" from Surface & Direct Airflow Away from People'
    ],
    badgePrimary: '2-Inch Standoff',
    badgeSecondary: 'Directional Safety',
    verificationCriteria: 'Nozzle held ~2 inches (50 mm) from workpiece; chips deflected away from operator.',
    keySafetyRule: 'Never aim compressed air stream toward yourself or others under any circumstance.'
  },

  // D. SHUTTING DOWN AND STORING THE EQUIPMENT
  {
    id: 'step-09',
    stepNumber: 9,
    category: 'D. SHUTTING DOWN AND STORING',
    title: 'Closing the Upper Ball Valve',
    description: 'Close the upper ball valve to stop the compressed air supply to the hose reel before disconnecting or storing the equipment.',
    image: '/images/image2.png',
    images: ['/images/image2.png'],
    imageCaptions: [
      '09 Figure 01 — Rotate Upper Ball Valve Handle 90° Perpendicular (Closed Position)'
    ],
    badgePrimary: 'Supply Closed',
    badgeSecondary: 'Handle Perpendicular',
    verificationCriteria: 'Upper valve handle perpendicular to line; supply to drop station fully isolated.',
    keySafetyRule: 'Never decouple a tool before closing the upstream supply ball valve.'
  },
  {
    id: 'step-10',
    stepNumber: 10,
    category: 'D. SHUTTING DOWN AND STORING',
    title: 'Releasing the Remaining Compressed Air',
    description: 'After closing the valve, squeeze the air blow gun trigger to release the remaining air in the hose. Make sure that the tool is facing downward & the system is depressurized before disconnecting the tool.',
    image: '/images/image52.png',
    images: ['/images/image52.png'],
    imageCaptions: [
      '10 Figure 01 — Point Nozzle Downward & Squeeze Trigger to Vent Residual Pressure to 0 PSI'
    ],
    badgePrimary: 'Vent Residual Air',
    badgeSecondary: '0 PSI Zero Energy',
    verificationCriteria: 'Trigger held until air hissing completely stops; hose line confirmed at 0 PSI.',
    keySafetyRule: 'Disconnecting under pressure turns fittings into ballistic projectiles.'
  },
  {
    id: 'step-11',
    stepNumber: 11,
    category: 'D. SHUTTING DOWN AND STORING',
    title: 'Retracting the Hose Safely',
    description: 'Guide the hose back into the reel slowly and carefully. Do not release it suddenly, as the hose may retract quickly and cause injury or damage.',
    image: '/images/image26.png',
    images: ['/images/image26.png'],
    imageCaptions: [
      '11 Figure 01 — Walk Hose Slowly Toward Reel to Ensure Controlled Spring Rewind'
    ],
    badgePrimary: 'Guide Hose Hand-Over-Hand',
    badgeSecondary: 'Prevent Snapback',
    verificationCriteria: 'Hose smoothly spooled into reel; stopper ball seated gently against fairlead.',
    keySafetyRule: 'Never let go of an extended hose; rapid uncontrolled retraction causes severe whip injury.'
  },
  {
    id: 'step-12',
    stepNumber: 12,
    category: 'D. SHUTTING DOWN AND STORING',
    title: 'Storing the Air Blow Gun and Organizing Work Area',
    description: 'Return the air blow gun to its designated holder or storage location, if available, and ensure that the work area is clean and organized.',
    image: '/images/image25.png',
    images: ['/images/image25.png'],
    imageCaptions: [
      '12 Figure 01 — Store Air Blow Gun in Cradle Hook & Organize Workstation'
    ],
    badgePrimary: 'Tool in Cradle',
    badgeSecondary: '5S Workshop Clean',
    verificationCriteria: 'Tool secured in mounting bracket; work surface clear and orderly.',
    keySafetyRule: 'Prevent accidental drops by storing tool in designated cradle immediately after use.'
  },
  {
    id: 'step-13',
    stepNumber: 13,
    category: 'D. SHUTTING DOWN AND STORING',
    title: 'Close the Air Receiver Tank Ball Valve',
    description: 'Locate the ball valve on the air receiver tank and slowly turn it to the closed position. This stops the flow of compressed air from entering the distribution system and helps prevent air from continuing to flow through the connected pipes and outlets.',
    image: '/images/image53.png',
    images: ['/images/image53.png'],
    imageCaptions: [
      '13 Figure 01 — Rotate Air Receiver Tank Ball Valve to Closed Position'
    ],
    badgePrimary: 'Tank Valve Closed',
    badgeSecondary: 'Piping Isolated',
    verificationCriteria: 'Air receiver ball valve handle turned perpendicular to pipe.',
    keySafetyRule: 'Closing tank valve locks air reserve in tank and relieves continuous stress on pipe joints.'
  },
  {
    id: 'step-14',
    stepNumber: 14,
    category: 'D. SHUTTING DOWN AND STORING',
    title: 'Turn Off the Air Compressor',
    description: 'Locate the control panel of the air compressor and press the emergency stop button first, followed by the OFF button. Ensure that the motor is no longer running and that the system shows no signs of continued operation before proceeding to the next step.',
    image: '/images/image36.png',
    images: ['/images/image36.png', '/images/image23.png'],
    imageCaptions: [
      '14 Figure 01 — Press Emergency Stop Button on Sullair Compressor Panel',
      '14 Figure 02 — Press OFF Button & Verify Motor and Main Drive Have Stopped'
    ],
    badgePrimary: 'Press E-Stop',
    badgeSecondary: 'Press OFF Button',
    verificationCriteria: 'Compressor drive motor stopped; control console powered down.',
    keySafetyRule: 'Verify motor has come to a complete standstill before leaving compressor area.'
  },
  {
    id: 'step-15',
    stepNumber: 15,
    category: 'D. SHUTTING DOWN AND STORING',
    title: 'Turn Off the Refrigerant Air Dryer',
    description: 'Locate the refrigerant air dryer beside the air compressor and switch it off according to the manufacturer\'s shutdown instructions.',
    image: '/images/image34.png',
    images: ['/images/image34.png'],
    imageCaptions: [
      '15 Figure 01 — Switch Off Refrigerant Air Dryer Beside Compressor'
    ],
    badgePrimary: 'Switch Power OFF',
    badgeSecondary: 'System Fully Secured',
    verificationCriteria: 'Refrigerant dryer compressor and condenser fan powered off.',
    keySafetyRule: 'Final walk-through verification that all pneumatic machinery is powered down.'
  }
];
