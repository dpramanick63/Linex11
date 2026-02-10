// src/lib/builderFormations.js

// Coordinate Logic:
// x: 0 (Left) -> 100 (Right), 50 is Center
// y: 0 (Top/Attack) -> 100 (Bottom/GK)
// GK is standard at {x: 50, y: 92}

export const FORMATIONS = {
  // =================================================================
  // 11-A-SIDE (34 VARIATIONS)
  // =================================================================
  '11': {
    // --- 4 AT THE BACK ---
    '4-3-3 Attack': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LCM', x: 35, y: 55 }, { id: 'RCM', x: 65, y: 55 }, { id: 'CAM', x: 50, y: 40 },
      { id: 'LW', x: 15, y: 20 }, { id: 'ST', x: 50, y: 12 }, { id: 'RW', x: 85, y: 20 }
    ],
    '4-3-3 Holding': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'CDM', x: 50, y: 60 }, { id: 'LCM', x: 35, y: 50 }, { id: 'RCM', x: 65, y: 50 },
      { id: 'LW', x: 15, y: 20 }, { id: 'ST', x: 50, y: 12 }, { id: 'RW', x: 85, y: 20 }
    ],
    '4-3-3 Flat': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LCM', x: 30, y: 55 }, { id: 'CM', x: 50, y: 55 }, { id: 'RCM', x: 70, y: 55 },
      { id: 'LW', x: 15, y: 20 }, { id: 'ST', x: 50, y: 12 }, { id: 'RW', x: 85, y: 20 }
    ],
    '4-3-3 False 9': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'CDM', x: 50, y: 60 }, { id: 'LCM', x: 35, y: 50 }, { id: 'RCM', x: 65, y: 50 },
      { id: 'LW', x: 15, y: 20 }, { id: 'CF', x: 50, y: 25 }, { id: 'RW', x: 85, y: 20 }
    ],
    '4-3-3 Defend': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LDM', x: 35, y: 58 }, { id: 'RDM', x: 65, y: 58 }, { id: 'CM', x: 50, y: 50 },
      { id: 'LW', x: 15, y: 20 }, { id: 'ST', x: 50, y: 12 }, { id: 'RW', x: 85, y: 20 }
    ],
    '4-4-2 Flat': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LM', x: 10, y: 50 }, { id: 'LCM', x: 40, y: 55 }, { id: 'RCM', x: 60, y: 55 }, { id: 'RM', x: 90, y: 50 },
      { id: 'LST', x: 35, y: 15 }, { id: 'RST', x: 65, y: 15 }
    ],
    '4-4-2 Holding': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LM', x: 10, y: 45 }, { id: 'LDM', x: 40, y: 60 }, { id: 'RDM', x: 60, y: 60 }, { id: 'RM', x: 90, y: 45 },
      { id: 'LST', x: 35, y: 15 }, { id: 'RST', x: 65, y: 15 }
    ],
    '4-4-1-1 Midfield': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LM', x: 10, y: 50 }, { id: 'LCM', x: 40, y: 55 }, { id: 'RCM', x: 60, y: 55 }, { id: 'RM', x: 90, y: 50 },
      { id: 'CAM', x: 50, y: 30 }, { id: 'ST', x: 50, y: 12 }
    ],
    '4-4-1-1 Attack': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LM', x: 10, y: 50 }, { id: 'LCM', x: 40, y: 55 }, { id: 'RCM', x: 60, y: 55 }, { id: 'RM', x: 90, y: 50 },
      { id: 'CF', x: 50, y: 25 }, { id: 'ST', x: 50, y: 10 }
    ],
    '4-2-3-1 Wide': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LDM', x: 35, y: 60 }, { id: 'RDM', x: 65, y: 60 },
      { id: 'LM', x: 12, y: 40 }, { id: 'CAM', x: 50, y: 40 }, { id: 'RM', x: 88, y: 40 },
      { id: 'ST', x: 50, y: 12 }
    ],
    '4-2-3-1 Narrow': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LDM', x: 35, y: 60 }, { id: 'RDM', x: 65, y: 60 },
      { id: 'LCAM', x: 30, y: 40 }, { id: 'CAM', x: 50, y: 40 }, { id: 'RCAM', x: 70, y: 40 },
      { id: 'ST', x: 50, y: 12 }
    ],
    '4-2-2-2': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LDM', x: 35, y: 58 }, { id: 'RDM', x: 65, y: 58 },
      { id: 'LCAM', x: 25, y: 40 }, { id: 'RCAM', x: 75, y: 40 },
      { id: 'LST', x: 35, y: 15 }, { id: 'RST', x: 65, y: 15 }
    ],
    '4-1-2-1-2 Narrow': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 12, y: 68 }, { id: 'LCB', x: 36, y: 73 }, { id: 'RCB', x: 64, y: 73 }, { id: 'RB', x: 88, y: 68 },
      { id: 'CDM', x: 50, y: 60 },
      { id: 'LCM', x: 30, y: 48 }, { id: 'RCM', x: 70, y: 48 },
      { id: 'CAM', x: 50, y: 32 },
      { id: 'LST', x: 35, y: 15 }, { id: 'RST', x: 65, y: 15 }
    ],
    '4-1-2-1-2 Wide': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 12, y: 68 }, { id: 'LCB', x: 36, y: 73 }, { id: 'RCB', x: 64, y: 73 }, { id: 'RB', x: 88, y: 68 },
      { id: 'CDM', x: 50, y: 60 },
      { id: 'LM', x: 10, y: 50 }, { id: 'RM', x: 90, y: 50 },
      { id: 'CAM', x: 50, y: 35 },
      { id: 'LST', x: 35, y: 15 }, { id: 'RST', x: 65, y: 15 }
    ],
    '4-1-4-1': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'CDM', x: 50, y: 60 },
      { id: 'LM', x: 10, y: 45 }, { id: 'LCM', x: 35, y: 50 }, { id: 'RCM', x: 65, y: 50 }, { id: 'RM', x: 90, y: 45 },
      { id: 'ST', x: 50, y: 12 }
    ],
    '4-5-1 Flat': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LM', x: 10, y: 50 }, { id: 'LCM', x: 32, y: 55 }, { id: 'CM', x: 50, y: 55 }, { id: 'RCM', x: 68, y: 55 }, { id: 'RM', x: 90, y: 50 },
      { id: 'ST', x: 50, y: 15 }
    ],
    '4-5-1 Attack': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'CM', x: 50, y: 60 },
      { id: 'LM', x: 10, y: 45 }, { id: 'LCAM', x: 35, y: 40 }, { id: 'RCAM', x: 65, y: 40 }, { id: 'RM', x: 90, y: 45 },
      { id: 'ST', x: 50, y: 15 }
    ],
    '4-3-2-1 Xmas Tree': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LCM', x: 30, y: 60 }, { id: 'CM', x: 50, y: 60 }, { id: 'RCM', x: 70, y: 60 },
      { id: 'LF', x: 35, y: 35 }, { id: 'RF', x: 65, y: 35 },
      { id: 'ST', x: 50, y: 12 }
    ],
    '4-3-1-2': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LCM', x: 30, y: 55 }, { id: 'CM', x: 50, y: 55 }, { id: 'RCM', x: 70, y: 55 },
      { id: 'CAM', x: 50, y: 35 },
      { id: 'LST', x: 35, y: 15 }, { id: 'RST', x: 65, y: 15 }
    ],
    '4-2-4': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LB', x: 10, y: 68 }, { id: 'LCB', x: 35, y: 73 }, { id: 'RCB', x: 65, y: 73 }, { id: 'RB', x: 90, y: 68 },
      { id: 'LCM', x: 38, y: 55 }, { id: 'RCM', x: 62, y: 55 },
      { id: 'LW', x: 15, y: 25 }, { id: 'RW', x: 85, y: 25 },
      { id: 'LST', x: 35, y: 15 }, { id: 'RST', x: 65, y: 15 }
    ],

    // --- 3 AT THE BACK ---
    '3-5-2': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LCB', x: 25, y: 72 }, { id: 'CB', x: 50, y: 75 }, { id: 'RCB', x: 75, y: 72 },
      { id: 'LDM', x: 38, y: 58 }, { id: 'RDM', x: 62, y: 58 },
      { id: 'LM', x: 10, y: 45 }, { id: 'RM', x: 90, y: 45 }, { id: 'CAM', x: 50, y: 40 },
      { id: 'LST', x: 35, y: 15 }, { id: 'RST', x: 65, y: 15 }
    ],
    '3-4-1-2': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LCB', x: 25, y: 72 }, { id: 'CB', x: 50, y: 75 }, { id: 'RCB', x: 75, y: 72 },
      { id: 'LM', x: 10, y: 50 }, { id: 'LCM', x: 40, y: 60 }, { id: 'RCM', x: 60, y: 60 }, { id: 'RM', x: 90, y: 50 },
      { id: 'CAM', x: 50, y: 35 },
      { id: 'LST', x: 35, y: 15 }, { id: 'RST', x: 65, y: 15 }
    ],
    '3-4-2-1': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LCB', x: 25, y: 72 }, { id: 'CB', x: 50, y: 75 }, { id: 'RCB', x: 75, y: 72 },
      { id: 'LM', x: 10, y: 50 }, { id: 'LCM', x: 40, y: 60 }, { id: 'RCM', x: 60, y: 60 }, { id: 'RM', x: 90, y: 50 },
      { id: 'LF', x: 35, y: 25 }, { id: 'RF', x: 65, y: 25 },
      { id: 'ST', x: 50, y: 10 }
    ],
    '3-4-3 Flat': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LCB', x: 25, y: 72 }, { id: 'CB', x: 50, y: 75 }, { id: 'RCB', x: 75, y: 72 },
      { id: 'LM', x: 10, y: 50 }, { id: 'LCM', x: 40, y: 60 }, { id: 'RCM', x: 60, y: 60 }, { id: 'RM', x: 90, y: 50 },
      { id: 'LW', x: 15, y: 20 }, { id: 'ST', x: 50, y: 12 }, { id: 'RW', x: 85, y: 20 }
    ],
    '3-4-3 Diamond': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LCB', x: 25, y: 72 }, { id: 'CB', x: 50, y: 75 }, { id: 'RCB', x: 75, y: 72 },
      { id: 'CDM', x: 50, y: 60 }, { id: 'LM', x: 10, y: 50 }, { id: 'RM', x: 90, y: 50 }, { id: 'CAM', x: 50, y: 35 },
      { id: 'LW', x: 15, y: 20 }, { id: 'ST', x: 50, y: 12 }, { id: 'RW', x: 85, y: 20 }
    ],
    '3-1-4-2': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LCB', x: 25, y: 72 }, { id: 'CB', x: 50, y: 75 }, { id: 'RCB', x: 75, y: 72 },
      { id: 'CDM', x: 50, y: 60 },
      { id: 'LM', x: 10, y: 45 }, { id: 'LCM', x: 35, y: 50 }, { id: 'RCM', x: 65, y: 50 }, { id: 'RM', x: 90, y: 45 },
      { id: 'LST', x: 35, y: 15 }, { id: 'RST', x: 65, y: 15 }
    ],

    // --- 5 AT THE BACK (Moved up significantly) ---
    '5-3-2': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LWB', x: 10, y: 60 }, { id: 'LCB', x: 30, y: 72 }, { id: 'CB', x: 50, y: 74 }, { id: 'RCB', x: 70, y: 72 }, { id: 'RWB', x: 90, y: 60 },
      { id: 'LCM', x: 32, y: 45 }, { id: 'CM', x: 50, y: 45 }, { id: 'RCM', x: 68, y: 45 },
      { id: 'LST', x: 35, y: 15 }, { id: 'RST', x: 65, y: 15 }
    ],
    '5-2-1-2': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LWB', x: 10, y: 60 }, { id: 'LCB', x: 30, y: 72 }, { id: 'CB', x: 50, y: 74 }, { id: 'RCB', x: 70, y: 72 }, { id: 'RWB', x: 90, y: 60 },
      { id: 'LCM', x: 35, y: 50 }, { id: 'RCM', x: 65, y: 50 },
      { id: 'CAM', x: 50, y: 35 },
      { id: 'LST', x: 35, y: 15 }, { id: 'RST', x: 65, y: 15 }
    ],
    '5-2-2-1': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LWB', x: 10, y: 60 }, { id: 'LCB', x: 30, y: 72 }, { id: 'CB', x: 50, y: 74 }, { id: 'RCB', x: 70, y: 72 }, { id: 'RWB', x: 90, y: 60 },
      { id: 'LCM', x: 35, y: 50 }, { id: 'RCM', x: 65, y: 50 },
      { id: 'LF', x: 35, y: 25 }, { id: 'RF', x: 65, y: 25 },
      { id: 'ST', x: 50, y: 10 }
    ],
    '5-4-1 Flat': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LWB', x: 10, y: 60 }, { id: 'LCB', x: 30, y: 72 }, { id: 'CB', x: 50, y: 74 }, { id: 'RCB', x: 70, y: 72 }, { id: 'RWB', x: 90, y: 60 },
      { id: 'LM', x: 15, y: 45 }, { id: 'LCM', x: 38, y: 50 }, { id: 'RCM', x: 62, y: 50 }, { id: 'RM', x: 85, y: 45 },
      { id: 'ST', x: 50, y: 15 }
    ],
    '5-4-1 Diamond': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LWB', x: 10, y: 60 }, { id: 'LCB', x: 30, y: 72 }, { id: 'CB', x: 50, y: 74 }, { id: 'RCB', x: 70, y: 72 }, { id: 'RWB', x: 90, y: 60 },
      { id: 'CDM', x: 50, y: 52 }, { id: 'LM', x: 20, y: 40 }, { id: 'RM', x: 80, y: 40 }, { id: 'CAM', x: 50, y: 25 },
      { id: 'ST', x: 50, y: 10 }
    ],
    '5-2-3': [
      { id: 'GK', x: 50, y: 92 },
      { id: 'LWB', x: 10, y: 60 }, { id: 'LCB', x: 30, y: 72 }, { id: 'CB', x: 50, y: 74 }, { id: 'RCB', x: 70, y: 72 }, { id: 'RWB', x: 90, y: 60 },
      { id: 'LCM', x: 38, y: 50 }, { id: 'RCM', x: 62, y: 50 },
      { id: 'LW', x: 15, y: 20 }, { id: 'ST', x: 50, y: 10 }, { id: 'RW', x: 85, y: 20 }
    ],
  },

  // =================================================================
  // 9-A-SIDE
  // =================================================================
  '9': {
    // --- Back 3 Systems ---
    '3-2-3': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:20,y:72}, {id:'CB',x:50,y:75}, {id:'RCB',x:80,y:72},
      {id:'LDM',x:35,y:55}, {id:'RDM',x:65,y:55},
      {id:'LW',x:15,y:30}, {id:'CAM',x:50,y:35}, {id:'RW',x:85,y:30}
    ],
    '3-3-2': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:20,y:72}, {id:'CB',x:50,y:75}, {id:'RCB',x:80,y:72},
      {id:'LM',x:15,y:50}, {id:'CM',x:50,y:50}, {id:'RM',x:85,y:50},
      {id:'LST',x:35,y:20}, {id:'RST',x:65,y:20}
    ],
    '3-4-1': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:20,y:72}, {id:'CB',x:50,y:75}, {id:'RCB',x:80,y:72},
      {id:'LM',x:10,y:45}, {id:'LCM',x:35,y:50}, {id:'RCM',x:65,y:50}, {id:'RM',x:90,y:45},
      {id:'ST',x:50,y:20}
    ],
    '3-1-3-1': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:20,y:72}, {id:'CB',x:50,y:75}, {id:'RCB',x:80,y:72},
      {id:'CDM',x:50,y:60},
      {id:'LM',x:15,y:45}, {id:'CAM',x:50,y:40}, {id:'RM',x:85,y:45},
      {id:'ST',x:50,y:15}
    ],
    '3-1-2-2': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:20,y:72}, {id:'CB',x:50,y:75}, {id:'RCB',x:80,y:72},
      {id:'CDM',x:50,y:60},
      {id:'LCM',x:35,y:50}, {id:'RCM',x:65,y:50},
      {id:'LST',x:35,y:20}, {id:'RST',x:65,y:20}
    ],
    '3-2-1-2': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:20,y:72}, {id:'CB',x:50,y:75}, {id:'RCB',x:80,y:72},
      {id:'LDM',x:35,y:55}, {id:'RDM',x:65,y:55},
      {id:'CAM',x:50,y:40},
      {id:'LST',x:35,y:20}, {id:'RST',x:65,y:20}
    ],

    // --- Back 4 Systems ---
    '4-3-1': [
      {id:'GK',x:50,y:92}, {id:'LB',x:10,y:68}, {id:'LCB',x:35,y:73}, {id:'RCB',x:65,y:73}, {id:'RB',x:90,y:68},
      {id:'LCM',x:30,y:50}, {id:'CM',x:50,y:50}, {id:'RCM',x:70,y:50},
      {id:'ST',x:50,y:20}
    ],
    '4-2-2': [
      {id:'GK',x:50,y:92}, {id:'LB',x:10,y:68}, {id:'LCB',x:35,y:73}, {id:'RCB',x:65,y:73}, {id:'RB',x:90,y:68},
      {id:'LCM',x:35,y:55}, {id:'RCM',x:65,y:55},
      {id:'LST',x:35,y:20}, {id:'RST',x:65,y:20}
    ],
    '4-1-2-1': [
      {id:'GK',x:50,y:92}, {id:'LB',x:10,y:68}, {id:'LCB',x:35,y:73}, {id:'RCB',x:65,y:73}, {id:'RB',x:90,y:68},
      {id:'CDM',x:50,y:58},
      {id:'LM',x:20,y:45}, {id:'RM',x:80,y:45},
      {id:'ST',x:50,y:20}
    ],
    '4-1-3': [
      {id:'GK',x:50,y:92}, {id:'LB',x:10,y:68}, {id:'LCB',x:35,y:73}, {id:'RCB',x:65,y:73}, {id:'RB',x:90,y:68},
      {id:'CDM',x:50,y:58},
      {id:'LW',x:20,y:40}, {id:'ST',x:50,y:35}, {id:'RW',x:80,y:40}
    ],

    // --- Back 2 Systems ---
    '2-4-2': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:30,y:73}, {id:'RCB',x:70,y:73},
      {id:'LM',x:10,y:50}, {id:'LCM',x:35,y:55}, {id:'RCM',x:65,y:55}, {id:'RM',x:90,y:50},
      {id:'LST',x:35,y:20}, {id:'RST',x:65,y:20}
    ],
    '2-3-3': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:30,y:73}, {id:'RCB',x:70,y:73},
      {id:'LCM',x:30,y:55}, {id:'CM',x:50,y:55}, {id:'RCM',x:70,y:55},
      {id:'LW',x:15,y:25}, {id:'ST',x:50,y:20}, {id:'RW',x:85,y:25}
    ],
    '2-1-3-2': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:30,y:73}, {id:'RCB',x:70,y:73},
      {id:'CDM',x:50,y:60},
      {id:'LM',x:15,y:45}, {id:'CM',x:50,y:45}, {id:'RM',x:85,y:45},
      {id:'LST',x:35,y:20}, {id:'RST',x:65,y:20}
    ],
    '2-3-2-1': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:30,y:73}, {id:'RCB',x:70,y:73},
      {id:'LWB',x:15,y:55}, {id:'CM',x:50,y:60}, {id:'RWB',x:85,y:55},
      {id:'LAM',x:35,y:35}, {id:'RAM',x:65,y:35},
      {id:'ST',x:50,y:15}
    ],
  },

  // =================================================================
  // 7-A-SIDE
  // =================================================================
  '7': {
    // --- Back 2 Systems (Balanced) ---
    '2-3-1': [
      {id:'GK',x:50,y:92}, {id:'LB',x:25,y:68}, {id:'RB',x:75,y:68},
      {id:'LM',x:15,y:48}, {id:'CM',x:50,y:48}, {id:'RM',x:85,y:48},
      {id:'ST',x:50,y:20}
    ],
    '2-2-2': [
      {id:'GK',x:50,y:92}, {id:'LB',x:25,y:68}, {id:'RB',x:75,y:68},
      {id:'LCM',x:35,y:48}, {id:'RCM',x:65,y:48},
      {id:'LST',x:35,y:25}, {id:'RST',x:65,y:25}
    ],
    '2-1-2-1 Diamond': [
      {id:'GK',x:50,y:92}, {id:'LB',x:25,y:68}, {id:'RB',x:75,y:68},
      {id:'CDM',x:50,y:55},
      {id:'LM',x:20,y:40}, {id:'RM',x:80,y:40},
      {id:'ST',x:50,y:15}
    ],
    '2-1-3': [
      {id:'GK',x:50,y:92}, {id:'LB',x:25,y:68}, {id:'RB',x:75,y:68},
      {id:'CM',x:50,y:50},
      {id:'LW',x:15,y:30}, {id:'ST',x:50,y:25}, {id:'RW',x:85,y:30}
    ],
    '2-4-0': [
      {id:'GK',x:50,y:92}, {id:'LB',x:25,y:68}, {id:'RB',x:75,y:68},
      {id:'LM',x:10,y:45}, {id:'LCM',x:35,y:50}, {id:'RCM',x:65,y:50}, {id:'RM',x:90,y:45}
    ],

    // --- Back 3 Systems (Defensive) ---
    '3-2-1': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:20,y:70}, {id:'CB',x:50,y:73}, {id:'RCB',x:80,y:70},
      {id:'LCM',x:35,y:50}, {id:'RCM',x:65,y:50},
      {id:'ST',x:50,y:20}
    ],
    '3-1-2': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:20,y:70}, {id:'CB',x:50,y:73}, {id:'RCB',x:80,y:70},
      {id:'CM',x:50,y:55},
      {id:'LF',x:35,y:30}, {id:'RF',x:65,y:30}
    ],
    '3-1-1-1': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:20,y:70}, {id:'CB',x:50,y:73}, {id:'RCB',x:80,y:70},
      {id:'CDM',x:50,y:58},
      {id:'CAM',x:50,y:40},
      {id:'ST',x:50,y:20}
    ],
    '3-3-0': [
      {id:'GK',x:50,y:92}, {id:'LCB',x:20,y:70}, {id:'CB',x:50,y:73}, {id:'RCB',x:80,y:70},
      {id:'LCM',x:30,y:50}, {id:'CM',x:50,y:50}, {id:'RCM',x:70,y:50}
    ],

    // --- Back 1 Systems (Aggressive) ---
    '1-4-1': [
      {id:'GK',x:50,y:92}, {id:'CB',x:50,y:73},
      {id:'LM',x:10,y:50}, {id:'LCM',x:35,y:55}, {id:'RCM',x:65,y:55}, {id:'RM',x:90,y:50},
      {id:'ST',x:50,y:20}
    ],
    '1-3-2': [
      {id:'GK',x:50,y:92}, {id:'CB',x:50,y:73},
      {id:'LM',x:20,y:55}, {id:'CM',x:50,y:60}, {id:'RM',x:80,y:55},
      {id:'LST',x:35,y:25}, {id:'RST',x:65,y:25}
    ],
    '1-2-3': [
      {id:'GK',x:50,y:92}, {id:'CB',x:50,y:73},
      {id:'LCM',x:30,y:60}, {id:'RCM',x:70,y:60},
      {id:'LW',x:15,y:30}, {id:'ST',x:50,y:20}, {id:'RW',x:85,y:30}
    ],
    '1-2-1-2': [
      {id:'GK',x:50,y:92}, {id:'CB',x:50,y:73},
      {id:'LDM',x:35,y:65}, {id:'RDM',x:65,y:65},
      {id:'CAM',x:50,y:45},
      {id:'LST',x:35,y:20}, {id:'RST',x:65,y:20}
    ],

    // --- Back 4 Systems (Ultra Defensive) ---
    '4-1-1': [
      {id:'GK',x:50,y:92},
      {id:'LB',x:10,y:68}, {id:'LCB',x:35,y:73}, {id:'RCB',x:65,y:73}, {id:'RB',x:90,y:68},
      {id:'CM',x:50,y:55},
      {id:'ST',x:50,y:30}
    ],
    '4-2-0': [
      {id:'GK',x:50,y:92},
      {id:'LB',x:10,y:68}, {id:'LCB',x:35,y:73}, {id:'RCB',x:65,y:73}, {id:'RB',x:90,y:68},
      {id:'LCM',x:40,y:55}, {id:'RCM',x:60,y:55}
    ],
  },

  // =================================================================
  // 5-A-SIDE
  // =================================================================
  '5': {
    // --- Balanced Systems ---
    '1-2-1 Diamond': [
      {id:'GK',x:50,y:92},
      {id:'CB',x:50,y:70},
      {id:'LM',x:20,y:45}, {id:'RM',x:80,y:45},
      {id:'ST',x:50,y:20}
    ],
    '2-2 Square': [
      {id:'GK',x:50,y:92},
      {id:'LB',x:25,y:68}, {id:'RB',x:75,y:68},
      {id:'LF',x:25,y:30}, {id:'RF',x:75,y:30}
    ],
    '1-1-1-1 Line': [
      {id:'GK',x:50,y:92},
      {id:'CB',x:50,y:70},
      {id:'CM',x:50,y:50},
      {id:'CAM',x:50,y:35},
      {id:'ST',x:50,y:15}
    ],

    // --- Defensive Systems ---
    '2-1-1 Pyramid': [
      {id:'GK',x:50,y:92},
      {id:'LB',x:25,y:70}, {id:'RB',x:75,y:70},
      {id:'CM',x:50,y:50},
      {id:'ST',x:50,y:20}
    ],
    '3-1 Wall': [
      {id:'GK',x:50,y:92},
      {id:'LCB',x:20,y:70}, {id:'CB',x:50,y:73}, {id:'RCB',x:80,y:70},
      {id:'ST',x:50,y:30}
    ],
    '3-0-1': [
      {id:'GK',x:50,y:92},
      {id:'LCB',x:20,y:70}, {id:'CB',x:50,y:73}, {id:'RCB',x:80,y:70},
      {id:'ST',x:50,y:25}
    ],
    '4-0 Park Bus': [
      {id:'GK',x:50,y:92},
      {id:'LB',x:15,y:70}, {id:'LCB',x:35,y:73}, {id:'RCB',x:65,y:73}, {id:'RB',x:85,y:70}
    ],

    // --- Attacking Systems ---
    '1-1-2 Y': [
      {id:'GK',x:50,y:92},
      {id:'CB',x:50,y:70},
      {id:'CM',x:50,y:50},
      {id:'LF',x:25,y:20}, {id:'RF',x:75,y:20}
    ],
    '1-3 All Out': [
      {id:'GK',x:50,y:92},
      {id:'CB',x:50,y:73},
      {id:'LW',x:15,y:30}, {id:'ST',x:50,y:25}, {id:'RW',x:85,y:30}
    ],
    '2-0-2 Split': [
      {id:'GK',x:50,y:92},
      {id:'LB',x:20,y:70}, {id:'RB',x:80,y:70},
      {id:'LF',x:20,y:20}, {id:'RF',x:80,y:20}
    ],
    '0-4 Total Attack': [
      {id:'GK',x:50,y:92},
      {id:'LW',x:15,y:30}, {id:'LST',x:35,y:25}, {id:'RST',x:65,y:25}, {id:'RW',x:85,y:30}
    ],
  }
};