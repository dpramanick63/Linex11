import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

const MiniPitch = ({ formation }) => {
  const [phase, setPhase] = useState('shape'); 
  const [simPaused, setSimPaused] = useState(false);

  // --- COORDINATE ENGINE (Vertical Orientation: 0,0 is Top-Left) ---
  const getFormationCoords = (fmt) => {
    const GK = { l: 'GK', x: 50, y: 92 };
    // Slightly widened mobile boundaries (12-88 range) to prevent overlapping circles
    const B4 = [ { l: 'LB', x: 12, y: 75 }, { l: 'CB', x: 36, y: 82 }, { l: 'CB', x: 64, y: 82 }, { l: 'RB', x: 88, y: 75 } ];
    const B3 = [ { l: 'CB', x: 22, y: 82 }, { l: 'CB', x: 50, y: 85 }, { l: 'CB', x: 78, y: 82 } ];
    const B5 = [ { l: 'LWB', x: 10, y: 65 }, { l: 'CB', x: 28, y: 82 }, { l: 'CB', x: 50, y: 85 }, { l: 'CB', x: 72, y: 82 }, { l: 'RWB', x: 90, y: 65 } ];

    switch (fmt) {
      case "4-2-4": return [GK, ...B4, {l:'CM',x:38,y:58}, {l:'CM',x:62,y:58}, {l:'LW',x:15,y:25}, {l:'ST',x:35,y:15}, {l:'ST',x:65,y:15}, {l:'RW',x:85,y:25}];
      case "4-3-3 Attack": return [GK, ...B4, {l:'CM',x:30,y:60}, {l:'CAM',x:50,y:40}, {l:'CM',x:70,y:60}, {l:'LW',x:15,y:25}, {l:'ST',x:50,y:15}, {l:'RW',x:85,y:25}];
      case "4-2-1-3": return [GK, ...B4, {l:'CDM',x:38,y:65}, {l:'CDM',x:62,y:65}, {l:'CAM',x:50,y:42}, {l:'LW',x:15,y:20}, {l:'ST',x:50,y:12}, {l:'RW',x:85,y:20}];
      case "3-4-3 Flat": return [GK, ...B3, {l:'LM',x:10,y:48}, {l:'CM',x:38,y:58}, {l:'CM',x:62,y:58}, {l:'RM',x:90,y:48}, {l:'LW',x:20,y:22}, {l:'ST',x:50,y:14}, {l:'RW',x:80,y:22}];
      case "3-4-3 Diamond": return [GK, ...B3, {l:'CDM',x:50,y:68}, {l:'LM',x:15,y:48}, {l:'RM',x:85,y:48}, {l:'CAM',x:50,y:32}, {l:'LW',x:20,y:18}, {l:'ST',x:50,y:8}, {l:'RW',x:80,y:18}];
      case "3-4-1-2": return [GK, ...B3, {l:'LM',x:10,y:48}, {l:'CM',x:38,y:62}, {l:'CM',x:62,y:62}, {l:'RM',x:90,y:48}, {l:'CAM',x:50,y:35}, {l:'ST',x:35,y:15}, {l:'ST',x:65,y:15}];
      case "3-4-2-1": return [GK, ...B3, {l:'LM',x:10,y:52}, {l:'CM',x:38,y:68}, {l:'CM',x:62,y:68}, {l:'RM',x:90,y:52}, {l:'LF',x:32,y:35}, {l:'RF',x:68,y:35}, {l:'ST',x:50,y:15}];
      case "4-4-1-1 Attack": return [GK, ...B4, {l:'LM',x:12,y:48}, {l:'CM',x:38,y:62}, {l:'CM',x:62,y:62}, {l:'RM',x:88,y:48}, {l:'CF',x:50,y:32}, {l:'ST',x:50,y:15}];
      case "4-3-3 Standard": return [GK, ...B4, {l:'CM',x:28,y:58}, {l:'CM',x:50,y:58}, {l:'CM',x:72,y:58}, {l:'LW',x:15,y:25}, {l:'ST',x:50,y:15}, {l:'RW',x:85,y:25}];
      case "4-3-3 Holding": return [GK, ...B4, {l:'CDM',x:50,y:68}, {l:'CM',x:32,y:52}, {l:'CM',x:68,y:52}, {l:'LW',x:15,y:25}, {l:'ST',x:50,y:15}, {l:'RW',x:85,y:25}];
      case "4-3-3 False 9": return [GK, ...B4, {l:'CDM',x:50,y:68}, {l:'CM',x:28,y:52}, {l:'CM',x:72,y:52}, {l:'LW',x:15,y:25}, {l:'F9',x:50,y:38}, {l:'RW',x:85,y:25}];
      case "4-2-3-1 Narrow": return [GK, ...B4, {l:'CDM',x:35,y:68}, {l:'CDM',x:65,y:68}, {l:'CAM',x:25,y:45}, {l:'CAM',x:50,y:40}, {l:'CAM',x:75,y:45}, {l:'ST',x:50,y:18}];
      case "4-2-3-1 Wide": return [GK, ...B4, {l:'CDM',x:35,y:68}, {l:'CDM',x:65,y:68}, {l:'LM',x:12,y:42}, {l:'CAM',x:50,y:42}, {l:'RM',x:88,y:42}, {l:'ST',x:50,y:18}];
      case "4-1-2-1-2 Narrow": return [GK, ...B4, {l:'CDM',x:50,y:72}, {l:'CM',x:32,y:55}, {l:'CM',x:68,y:55}, {l:'CAM',x:50,y:38}, {l:'ST',x:35,y:18}, {l:'ST',x:65,y:18}];
      case "4-1-2-1-2 Wide": return [GK, ...B4, {l:'CDM',x:50,y:72}, {l:'LM',x:12,y:48}, {l:'RM',x:88,y:48}, {l:'CAM',x:50,y:32}, {l:'ST',x:35,y:15}, {l:'ST',x:65,y:15}];
      case "4-1-4-1": return [GK, ...B4, {l:'CDM',x:50,y:68}, {l:'LM',x:12,y:48}, {l:'CM',x:35,y:52}, {l:'CM',x:65,y:52}, {l:'RM',x:88,y:48}, {l:'ST',x:50,y:22}];
      case "4-4-1-1 Flat": return [GK, ...B4, {l:'LM',x:12,y:52}, {l:'CM',x:38,y:62}, {l:'CM',x:62,y:62}, {l:'RM',x:88,y:52}, {l:'CF',x:50,y:38}, {l:'ST',x:50,y:22}];
      case "3-5-2": return [GK, ...B3, {l:'CDM',x:50,y:68}, {l:'LM',x:10,y:48}, {l:'RM',x:90,y:48}, {l:'CM',x:32,y:58}, {l:'CM',x:68,y:58}, {l:'ST',x:38,y:18}, {l:'ST',x:62,y:18}];
      case "3-5-1-1": return [GK, ...B3, {l:'CDM',x:50,y:68}, {l:'LM',x:10,y:48}, {l:'RM',x:90,y:48}, {l:'CM',x:32,y:58}, {l:'CM',x:68,y:58}, {l:'CF',x:50,y:32}, {l:'ST',x:50,y:15}];
      case "3-1-4-2": return [GK, ...B3, {l:'CDM',x:50,y:72}, {l:'LM',x:10,y:42}, {l:'RM',x:90,y:42}, {l:'CM',x:32,y:52}, {l:'CM',x:68,y:52}, {l:'ST',x:38,y:18}, {l:'ST',x:62,y:18}];
      case "4-3-1-2": return [GK, ...B4, {l:'CM',x:28,y:62}, {l:'CM',x:50,y:62}, {l:'CM',x:72,y:62}, {l:'CAM',x:50,y:42}, {l:'ST',x:35,y:18}, {l:'ST',x:65,y:18}];
      case "4-3-2-1": return [GK, ...B4, {l:'CM',x:28,y:68}, {l:'CM',x:50,y:68}, {l:'CM',x:72,y:68}, {l:'CAM',x:38,y:45}, {l:'CAM',x:62,y:45}, {l:'ST',x:50,y:22}];
      case "4-4-2 Flat": return [GK, ...B4, {l:'LM',x:12,y:52}, {l:'CM',x:38,y:62}, {l:'CM',x:62,y:62}, {l:'RM',x:88,y:52}, {l:'ST',x:35,y:22}, {l:'ST',x:65,y:22}];
      case "4-4-2 Holding": return [GK, ...B4, {l:'LM',x:12,y:48}, {l:'CDM',x:38,y:68}, {l:'CDM',x:62,y:68}, {l:'RM',x:88,y:48}, {l:'ST',x:35,y:22}, {l:'ST',x:65,y:22}];
      case "4-3-3 Defend": return [GK, ...B4, {l:'CDM',x:32,y:68}, {l:'CM',x:50,y:62}, {l:'CDM',x:68,y:68}, {l:'LW',x:15,y:32}, {l:'ST',x:50,y:22}, {l:'RW',x:85,y:32}];
      case "4-2-2-2": return [GK, ...B4, {l:'CDM',x:38,y:68}, {l:'CDM',x:62,y:68}, {l:'CAM',x:28,y:42}, {l:'CAM',x:72,y:42}, {l:'ST',x:38,y:18}, {l:'ST',x:62,y:18}];
      case "4-5-1 Flat": return [GK, ...B4, {l:'LM',x:10,y:52}, {l:'CM',x:28,y:62}, {l:'CM',x:50,y:62}, {l:'CM',x:72,y:62}, {l:'RM',x:90,y:52}, {l:'ST',x:50,y:28}];
      case "4-5-1 Attack": return [GK, ...B4, {l:'LM',x:10,y:48}, {l:'CM',x:28,y:58}, {l:'CM',x:50,y:58}, {l:'CM',x:72,y:58}, {l:'RM',x:90,y:48}, {l:'ST',x:50,y:22}];
      case "5-3-2": return [GK, ...B5, {l:'CM',x:30,y:58}, {l:'CDM',x:50,y:68}, {l:'CM',x:70,y:58}, {l:'ST',x:38,y:22}, {l:'ST',x:62,y:22}];
      case "5-2-1-2": return [GK, ...B5, {l:'CM',x:38,y:62}, {l:'CM',x:62,y:62}, {l:'CAM',x:50,y:42}, {l:'ST',x:38,y:22}, {l:'ST',x:62,y:22}];
      case "5-2-2-1": return [GK, ...B5, {l:'CM',x:38,y:62}, {l:'CM',x:62,y:62}, {l:'LF',x:30,y:38}, {l:'RF',x:70,y:38}, {l:'ST',x:50,y:22}];
      case "5-4-1 Flat": return [GK, ...B5, {l:'LM',x:15,y:58}, {l:'CM',x:38,y:68}, {l:'CM',x:62,y:68}, {l:'RM',x:85,y:58}, {l:'ST',x:50,y:32}];
      case "5-4-1 Diamond": return [GK, ...B5, {l:'CDM',x:50,y:68}, {l:'LM',x:20,y:52}, {l:'RM',x:80,y:52}, {l:'CAM',x:50,y:42}, {l:'ST',x:50,y:22}];
      case "4-1-3-2": return [GK, ...B4, {l:'CDM',x:50,y:68}, {l:'CM',x:28,y:52}, {l:'CM',x:50,y:52}, {l:'CM',x:72,y:52}, {l:'ST',x:38,y:22}, {l:'ST',x:62,y:22}];
      default: return [GK, ...B4, {l:'LM',x:15,y:52}, {l:'CM',x:38,y:62}, {l:'CM',x:62,y:62}, {l:'RM',x:85,y:52}, {l:'ST',x:35,y:22}, {l:'ST',x:65,y:22}];
    }
  };

  const getTacticalTargets = (fmt) => {
    let builder = 'CM';
    if (fmt.includes('Diamond') || fmt.includes('Narrow') || fmt.includes('Attack') || fmt.includes('4-2-3-1')) builder = 'CAM';
    if (fmt.includes('Holding') || fmt.includes('Defend') || fmt.includes('4-2-2-2')) builder = 'CDM';
    if (fmt.includes('False 9')) builder = 'F9';
    
    let finisher = 'ST';
    if (fmt.includes('4-3-3') || fmt.includes('False 9')) finisher = 'LW'; 
    return { builder, finisher };
  };

  const initialPositions = getFormationCoords(formation);
  const targets = getTacticalTargets(formation);

  const getActivePositions = (currentPhase) => {
    let moves = JSON.parse(JSON.stringify(initialPositions));
    if (currentPhase === 'shape') return initialPositions;

    moves.forEach(p => {
      if (['LWB', 'LB'].includes(p.l) && currentPhase === 'attack') { p.y = 35; p.x = 8; }
      if (['RWB', 'RB'].includes(p.l) && currentPhase === 'attack') { p.y = 35; p.x = 92; }
      if (p.l === 'F9') {
        if (currentPhase === 'build') p.y = 50; 
        if (currentPhase === 'attack') p.y = 30; 
      }
      if (['LW', 'RW'].includes(p.l) && currentPhase === 'attack') {
        p.y = 10;
        p.x = p.l === 'LW' ? 35 : 65; 
      }
      if (p.l === 'CAM' && currentPhase === 'attack') p.y = 25;
      if (p.l === 'CDM' && currentPhase === 'attack') p.y = 60; 
    });
    return moves;
  };

  const currentPositions = getActivePositions(phase);

  const getBallPos = () => {
    if (phase === 'shape') return { x: 50, y: 88 }; 
    if (phase === 'build') {
      const target = currentPositions.find(p => p.l === targets.builder) || currentPositions.find(p => p.l.includes('M')) || currentPositions[6];
      // Ball offset so it doesn't overlap circle: y + 4 on mobile is a bit much, adjusted to 3
      return { x: target.x, y: target.y + 3.5 };
    }
    if (phase === 'attack') {
      const target = currentPositions.find(p => p.l === targets.finisher) || currentPositions.find(p => p.l === 'ST') || currentPositions[9];
      return { x: target.x, y: target.y + 3.5 };
    }
    return { x: 50, y: 88 };
  };

  const ballPos = getBallPos();

  useEffect(() => {
    setPhase('shape');
    setSimPaused(false);
  }, [formation]);

  useEffect(() => {
    let interval;
    if (!simPaused) {
      interval = setInterval(() => {
        setPhase(curr => curr === 'shape' ? 'build' : curr === 'build' ? 'attack' : 'shape');
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [formation, simPaused]);

  return (
    <div className="w-full h-full bg-pitch-dark relative overflow-hidden flex flex-col select-none rounded-t-2xl md:rounded-l-3xl md:rounded-tr-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
      
      {/* 3D Grid */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.1)_75%,rgba(255,255,255,.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.1)_75%,rgba(255,255,255,.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
      
      {/* Pitch Lines */}
      <div className="absolute top-0 left-[20%] right-[20%] h-16 border-b-2 border-x-2 border-white/20"></div>
      <div className="absolute bottom-0 left-[20%] right-[20%] h-16 border-t-2 border-x-2 border-white/20"></div>
      <div className="absolute top-1/2 w-full h-0.5 bg-white/10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white/10 rounded-full"></div>

      {/* Players */}
      <AnimatePresence>
        {currentPositions.map((p, i) => (
          <motion.div
            key={i}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${p.l === 'GK' ? 'z-10' : 'z-20'}`}
            initial={false}
            animate={{ left: `${p.x}%`, top: `${p.y}%` }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className="w-2 h-0.5 bg-black/40 blur-[1px] rounded-full mb-[-1px]"></div>
            
            <div className={`w-2 h-2 md:w-5 md:h-5 rounded-full border md:border-2 shadow-lg ${
              p.l === 'GK' ? 'bg-yellow-400 border-yellow-600' : 'bg-white border-slate-300'
            }`} />
            
            <span className="text-[7px] md:text-xs font-bold text-white mt-0.5 bg-black/50 px-1 rounded shadow-sm scale-90 backdrop-blur-sm border border-white/10 pointer-events-none">
              {p.l}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Ball - Increased Z-index to z-30 to stay above players */}
      <motion.div
        className="absolute w-1.5 h-1.5 md:w-3 md:h-3 bg-orange-500 rounded-full border border-white z-30 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
        animate={{ left: `${ballPos.x}%`, top: `${ballPos.y}%` }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ marginLeft: '-3px', marginTop: '-3px' }}
      />
      
      {/* Play/Pause Overlay */}
      <button 
        onClick={() => setSimPaused(!simPaused)}
        className="absolute inset-0 z-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[1px]"
      >
        <div className="w-8 h-8 md:w-12 md:h-12 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
          {simPaused ? <Play className="w-3 h-3 md:w-5 md:h-5 text-white fill-current ml-0.5" /> : <Pause className="w-3 h-3 md:w-5 md:h-5 text-white fill-current" />}
        </div>
      </button>

      {/* Phase Indicator */}
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-full border border-white/10 backdrop-blur-sm z-50">
        <span className="text-[6px] md:text-[8px] text-white/70 font-mono mr-1 uppercase">{phase}</span>
        <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-colors ${phase === 'shape' ? 'bg-white' : 'bg-white/20'}`}></div>
        <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-colors ${phase === 'build' ? 'bg-blue-400' : 'bg-white/20'}`}></div>
        <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-colors ${phase === 'attack' ? 'bg-pitch' : 'bg-white/20'}`}></div>
      </div>
    </div>
  );
};

export default MiniPitch;