import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Layout/Navbar';
import { downloadLineupPDF } from '../utils/pdfGenerator';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, ChevronDown, Wand2, Save, Share2, FileDown, Lock, RotateCcw, X, Plus, Trash2, Hexagon, Crosshair, Zap, Copy, RefreshCw, Check, Loader2, LayoutGrid, ScanEye, Shield, Users, LogIn, Settings, Activity, Move } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { 
  DndContext, 
  useDraggable, 
  useDroppable, 
  DragOverlay,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { FORMATIONS } from '../lib/builderFormations';
import FormationSelector from '../components/UI/FormationSelector';
import SaveLoader from '../components/UI/SaveLoader';
import SquadSettingsModal, { JerseyIcon } from '../components/UI/SquadSettingsModal';

// --- NEW INITIAL LOADER COMPONENT ---
const InitialSquadLoader = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
           }}>
      </div>

      <div className="relative w-64 h-80 md:w-80 md:h-96 flex flex-col items-center justify-center">
        
        {/* Spinning Outer Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-dashed border-white/10 rounded-full"
        />
        
        {/* Tactical Blueprint Board */}
        <div className="relative w-48 h-64 border-2 border-pitch/40 rounded-lg bg-slate-900/80 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.15)] flex items-center justify-center">
            
            {/* Pitch Markings */}
            <div className="absolute inset-4 border border-white/10 rounded-sm"></div>
            <div className="absolute top-1/2 w-full h-px bg-white/10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10"></div>

            {/* Scanning Laser */}
            <motion.div 
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pitch to-transparent shadow-[0_0_15px_#22c55e] z-20 opacity-80"
            />

            {/* Nodes Connecting (Simulating Formation Build) */}
            <div className="absolute inset-0 z-10">
               {[
                 {x: '50%', y: '80%'}, {x: '20%', y: '60%'}, {x: '50%', y: '60%'}, {x: '80%', y: '60%'}, 
                 {x: '30%', y: '40%'}, {x: '70%', y: '40%'}, {x: '50%', y: '20%'}
               ].map((pos, i) => (
                 <motion.div
                   key={i}
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ delay: i * 0.2, duration: 0.3 }}
                   className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
                   style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                 />
               ))}
               {/* Connection Lines (SVG) */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                 <motion.path 
                   d="M 120 200 L 50 150 L 120 150 L 190 150 L 75 100 L 170 100 L 120 50"
                   fill="none"
                   stroke="#22c55e"
                   strokeWidth="2"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 1.5, ease: "easeInOut" }}
                 />
               </svg>
            </div>
        </div>
      </div>

      {/* Text Loading Sequence */}
      <div className="mt-8 flex flex-col items-center gap-2 z-50">
         <h2 className="text-3xl font-teko font-bold text-white tracking-[0.2em] uppercase flex items-center gap-2">
            <Activity className="w-5 h-5 text-pitch animate-pulse" />
            Squad<span className="text-pitch">Builder</span>
         </h2>
         <div className="flex items-center gap-3">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 2.5 }}
              className="h-0.5 bg-slate-700 overflow-hidden rounded-full"
            >
               <div className="h-full bg-pitch w-full origin-left" />
            </motion.div>
         </div>
         <motion.div className="h-4 overflow-hidden relative">
            <motion.div 
               animate={{ y: -60 }} 
               transition={{ duration: 3, times: [0, 0.3, 0.6, 1] }} 
               className="flex flex-col items-center text-[10px] text-pitch/80 font-mono uppercase tracking-widest"
            >
               <span className="h-5 flex items-center">Initializing Assets...</span>
               <span className="h-5 flex items-center">Calibrating Pitch...</span>
               <span className="h-5 flex items-center">Loading Formations...</span>
               <span className="h-5 flex items-center text-white font-bold">System Ready</span>
            </motion.div>
         </motion.div>
      </div>
    </motion.div>
  );
};

// --- VISUAL FORMATION SELECTOR COMPONENT ---
const VisualFormationSelector = ({ isOpen, onClose, teamSizeId, currentFormation, onSelect }) => {
  if (!isOpen) return null;
  const formations = FORMATIONS[teamSizeId] || {};

  return (
    <div className="fixed inset-0 z-[300] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-5xl max-h-[80vh] flex flex-col shadow-2xl"
        >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center bg-slate-950/50 rounded-t-2xl">
                <div>
                    <h2 className="text-2xl md:text-3xl font-teko font-bold text-white uppercase tracking-wider">Select Formation</h2>
                    <p className="text-slate-400 text-xs md:text-sm">{teamSizeId}-a-side Tactics</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Scrollable Grid */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Object.entries(formations).map(([name, positions]) => (
                        <button
                            key={name}
                            onClick={() => { onSelect(name); onClose(); }}
                            className={`relative group flex flex-col items-center gap-3 p-3 rounded-xl border transition-all duration-200 
                            ${currentFormation === name 
                                ? 'bg-pitch/10 border-pitch shadow-[0_0_15px_rgba(34,197,94,0.3)] ring-1 ring-pitch' 
                                : 'bg-slate-800/40 border-white/5 hover:bg-slate-800 hover:border-white/20'}`}
                        >
                            {/* Mini Pitch Visualization */}
                            <div className="relative w-full aspect-[2/3] bg-emerald-900/30 rounded-lg border border-white/5 overflow-hidden group-hover:border-white/10 transition-colors">
                                {/* Pitch Markings */}
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute top-0 left-1/4 right-1/4 h-[15%] border-b border-x border-white"></div>
                                    <div className="absolute bottom-0 left-1/4 right-1/4 h-[15%] border-t border-x border-white"></div>
                                    <div className="absolute top-1/2 w-full h-px bg-white"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white"></div>
                                </div>

                                {/* Player Dots */}
                                {positions.map((pos, i) => (
                                    <div 
                                        key={i}
                                        className={`absolute w-2 h-2 md:w-2.5 md:h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm
                                        ${currentFormation === name ? 'bg-pitch shadow-[0_0_5px_#22c55e]' : 'bg-white group-hover:bg-pitch transition-colors'}`}
                                        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                                    />
                                ))}
                            </div>

                            <span className={`text-xs md:text-sm font-bold uppercase tracking-wider font-teko 
                                ${currentFormation === name ? 'text-pitch' : 'text-slate-300 group-hover:text-white'}`}>
                                {name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    </div>
  );
};

// --- PROFESSIONAL TACTICAL LOADER ---
const TacticalLoader = () => (
  <div className="absolute inset-0 z-[150] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
    <div className="absolute inset-0 opacity-20" 
         style={{ 
             backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', 
             backgroundSize: '30px 30px',
             maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
         }}>
    </div>

    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-white/10 border-t-pitch/50 border-r-pitch/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
        />
        <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-8 rounded-full border border-dashed border-white/20"
        />
        <div className="absolute w-32 h-40 md:w-40 md:h-52 border-2 border-pitch/30 rounded bg-slate-900/50 backdrop-blur-sm overflow-hidden" 
             style={{ transform: 'perspective(600px) rotateX(40deg)' }}>
            <div className="absolute inset-0 border-x border-white/10 left-1/4 right-1/4"></div>
            <div className="absolute top-1/2 w-full h-px bg-white/10"></div>
            <div className="absolute top-0 w-full h-1/4 border-b border-white/10"></div>
            <div className="absolute bottom-0 w-full h-1/4 border-t border-white/10"></div>
            <motion.div 
                animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-1 bg-pitch shadow-[0_0_15px_#22c55e]"
            />
        </div>
        <div className="absolute z-20 bg-slate-900 p-3 rounded-xl border border-pitch shadow-[0_0_20px_rgba(34,197,94,0.4)]">
             <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Shirt className="w-8 h-8 md:w-10 md:h-10 text-white fill-white/10" />
             </motion.div>
        </div>
    </div>

    <div className="mt-8 relative z-20 text-center">
        <h3 className="text-3xl md:text-5xl font-teko font-bold text-white uppercase tracking-widest leading-none drop-shadow-lg">
            Tactical<span className="text-pitch">Board</span>
        </h3>
        <div className="flex flex-col items-center gap-2 mt-2">
            <div className="h-0.5 w-32 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-full w-full bg-pitch"
                />
            </div>
            <span className="font-mono text-[10px] md:text-xs text-pitch uppercase tracking-[0.3em] animate-pulse">
                Calibrating Physics Engine...
            </span>
        </div>
    </div>
  </div>
);

// --- 1. ROSTER PLAYER ---
const DraggablePlayer = ({ player, onUpdate, onDelete, isOverlay = false, disabled = false, jerseyConfig, onClick, isSelected }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: player.id,
    data: { player, origin: 'roster' },
    disabled: disabled
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.3 : 1, 
  };

  if (isOverlay) {
    return (
      <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-900/90 border-2 border-pitch rounded-lg flex flex-col items-center justify-center shadow-2xl scale-105 pointer-events-none z-[999]">
        <span className="text-pitch font-teko text-lg md:text-xl font-bold leading-none">{player.number}</span>
        <JerseyIcon styleId={jerseyConfig?.style} color={jerseyConfig?.color} className="w-4 h-4 md:w-6 md:h-6" />
        <span className="text-[6px] md:text-[8px] text-white font-bold uppercase truncate max-w-full px-1">{player.name}</span>
      </div>
    );
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes} 
      onClick={(e) => {
        if (onClick) onClick(player);
      }}
      className={`relative group w-full aspect-square border rounded-lg flex flex-col items-center justify-between p-0.5 md:p-1 transition-all bg-slate-900/40
      ${disabled ? 'opacity-50 cursor-not-allowed border-white/20' : 'cursor-grab active:cursor-grabbing'}
      ${isSelected ? 'border-pitch bg-pitch/20 shadow-[0_0_10px_rgba(34,197,94,0.5)] ring-1 ring-pitch' : 'border-white/20 hover:border-pitch hover:bg-white/5'}
      `}
    >
       <input 
         className="w-full text-center bg-transparent text-pitch font-teko text-sm md:text-lg font-bold outline-none p-0 focus:text-white pointer-events-auto"
         value={player.number}
         onChange={(e) => !disabled && onUpdate(player.id, 'number', e.target.value)}
         readOnly={disabled}
         onPointerDown={(e) => e.stopPropagation()} 
       />
       
       <JerseyIcon styleId={jerseyConfig?.style} color={jerseyConfig?.color} className="w-3.5 h-3.5 md:w-5 md:h-5 drop-shadow-sm transition-transform group-hover:scale-110" />
       
       <input 
         className="w-full bg-transparent text-center text-slate-400 group-hover:text-white font-sans text-[7px] md:text-[9px] font-semibold outline-none truncate focus:bg-black/40 rounded px-1 pointer-events-auto"
         value={player.name}
         onChange={(e) => !disabled && onUpdate(player.id, 'name', e.target.value)}
         readOnly={disabled}
         onPointerDown={(e) => e.stopPropagation()}
       />
       {!disabled && (
         <button 
            onClick={(e) => { e.stopPropagation(); onDelete(player.id); }}
            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
         >
            <X className="w-2.5 h-2.5" />
         </button>
       )}
    </div>
  );
};

// --- 2. PITCH PLAYER ---
const PitchPlayer = ({ player, x, y, onRemove, isTactical, isOverlay = false, jerseyConfig, onClick, isSelected }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: player.id,
    data: { player, origin: 'pitch', currentX: x, currentY: y }
  });
  
  const style = {
    transform: CSS.Translate.toString(transform),
    left: `${x}%`, 
    top: `${y}%`,
    position: 'absolute',
    opacity: isDragging ? 0.5 : 1, 
    zIndex: isDragging || isSelected ? 50 : 10, 
    touchAction: 'none'
  };

  if(isOverlay) {
      return (
        <div className="flex flex-col items-center cursor-grabbing z-[999] pointer-events-none transform -translate-x-1/2 -translate-y-1/2" style={{opacity: 1}}>
            <JerseyIcon styleId={jerseyConfig?.style} color={jerseyConfig?.color} className="w-10 h-10 md:w-16 md:h-16 drop-shadow-2xl" />
            <div className="bg-black/90 px-2 py-0.5 rounded text-[10px] text-white font-bold mt-[-5px] border border-white/20 whitespace-nowrap shadow-xl">
                {player.name}
            </div>
        </div>
      )
  }

  return (
    <div 
        ref={setNodeRef} 
        style={style} 
        {...listeners} 
        {...attributes}
        onClick={(e) => {
            if (onClick) {
                onClick(player);
            }
        }}
        className={`flex flex-col items-center group -translate-x-1/2 -translate-y-1/2 
        ${isTactical ? 'cursor-move' : 'cursor-grab active:cursor-grabbing'}
        ${isSelected ? 'brightness-125 scale-110 drop-shadow-[0_0_10px_#22c55e]' : ''}`}
    >
        <JerseyIcon 
            styleId={jerseyConfig?.style} 
            color={jerseyConfig?.color} 
            className={`${isTactical ? 'w-8 h-8 md:w-20 md:h-20' : 'w-5 h-5 md:w-12 md:h-12'} drop-shadow-md transition-transform group-hover:scale-110`} 
        />
        
        {!isTactical && (
            <div className="absolute -top-1 -right-1 bg-pitch text-slate-900 text-[6px] md:text-[8px] font-bold px-0.5 md:px-1 rounded-sm border border-slate-900 min-w-[10px] md:min-w-[14px] text-center">{player.number}</div>
        )}
        
        <div className={`bg-black/70 backdrop-blur-sm px-1 py-px rounded text-[6px] md:text-[10px] text-white font-bold mt-[-2px] z-10 w-[45px] md:w-[80px] text-center truncate border border-white/20 
        ${isSelected ? 'border-pitch text-pitch' : ''}`}>
            {player.name}
        </div>

        {/* Delete Button on Selection */}
        {!isTactical && isSelected && (
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1 bg-slate-900 border border-pitch/50 rounded-sm p-0.5 z-50 shadow-xl animate-in fade-in zoom-in duration-200">
                <button 
                    onPointerDown={(e) => { 
                        e.stopPropagation(); 
                        onRemove(player.id); 
                    }} 
                    className="p-0.5 hover:bg-red-500/20 bg-red-500/10 text-red-400 rounded-sm transition-colors flex items-center justify-center"
                >
                    <Trash2 className="w-2.5 h-2.5" />
                </button>
            </div>
        )}
    </div>
  );
};

// --- 3. DROPPABLE SLOT ---
const DroppableSlot = ({ id, x, y, occupied, onClick, highlight }) => {
  const { setNodeRef, isOver } = useDroppable({ id: id });
   
  if (occupied) return null; 

  return (
    <div 
      ref={setNodeRef}
      onClick={() => onClick && onClick(id)}
      className={`absolute w-8 h-8 md:w-14 md:h-14 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all cursor-pointer
      ${isOver ? 'scale-125 drop-shadow-[0_0_15px_rgba(34,197,94,1)]' : ''}
      ${highlight ? 'scale-110' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
        <div className={`flex flex-col items-center transition-opacity duration-300 ${highlight ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}>
           <div className={`w-5 h-5 md:w-8 md:h-8 rounded-full border border-dashed flex items-center justify-center transition-colors
               ${highlight ? 'border-pitch bg-pitch/20 shadow-[0_0_10px_#22c55e] animate-pulse' : 'border-white/50 bg-black/20'}`}>
              <span className={`text-[6px] md:text-[7px] font-bold uppercase ${highlight ? 'text-pitch' : 'text-white/80'}`}>
                {highlight ? <Plus className="w-3 h-3 md:w-4 md:h-4"/> : id.replace(/[0-9]/g, '')}
              </span>
           </div>
        </div>
    </div>
  );
};

// --- NEW NAV TAB COMPONENT ---
const NavTab = ({ id, icon: Icon, label, activeTab, setActiveTab }) => (
    <button
        onClick={() => setActiveTab(id)}
        className={`relative group flex flex-col items-center gap-1 px-4 md:px-8 py-2 transition-all duration-300 ${activeTab === id ? 'text-pitch' : 'text-slate-400 hover:text-white'}`}
    >
        {activeTab === id && (
            <motion.div
                layoutId="nav-glow"
                className="absolute inset-0 bg-pitch/10 blur-xl rounded-full"
                transition={{ duration: 0.5 }}
            />
        )}
        
        <Icon className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ${activeTab === id ? 'scale-110 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'group-hover:scale-110'}`} />
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{label}</span>
        
        {activeTab === id && (
            <motion.div
                layoutId="nav-line"
                className="absolute -bottom-1 w-8 md:w-12 h-0.5 bg-pitch shadow-[0_0_10px_#22c55e]"
            />
        )}
    </button>
);

const TEAM_SIZES = [
  { id: '11', label: '11-a-side', maxSquad: 25 },
  { id: '9', label: '9-a-side', maxSquad: 20 },
  { id: '7', label: '7-a-side', maxSquad: 16 },
  { id: '5', label: '5-a-side', maxSquad: 12 },
];

const BuilderPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
   
  // --- INITIAL LOADING STATE ---
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // --- SETTINGS STATE ---
  const loadState = (key, fallback) => {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
        return fallback;
    }
  };

  const [showSettings, setShowSettings] = useState(false);
  const [jerseyConfig, setJerseyConfig] = useState(() => loadState('jerseyConfig', { color: '#ffffff', style: 'classic' }));

  const builderPitchRef = useRef(null);
  const tacticalPitchRef = useRef(null);
   
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { 
        activationConstraint: { 
            delay: 250, 
            tolerance: 5 
        } 
    })
  );

  const [teamSize, setTeamSize] = useState(() => loadState('teamSize', TEAM_SIZES[0]));
  const [formationName, setFormationName] = useState(() => loadState('formationName', '4-3-3 Attack'));
  const [roster, setRoster] = useState(() => loadState('roster', Array.from({ length: 25 }, (_, i) => ({ id: `p${i+1}`, name: `Player ${i+1}`, number: i+1 }))));
  const [placedPlayers, setPlacedPlayers] = useState(() => loadState('placedPlayers', {}));
  const [teamName, setTeamName] = useState(() => loadState('teamName', 'My Dream Squad'));
   
  const [isTacticalMode, setIsTacticalMode] = useState(false);
  const [loadingTactical, setLoadingTactical] = useState(false);
  const [tacticalPositions, setTacticalPositions] = useState({});
  const [activeTab, setActiveTab] = useState('HUB'); 
   
  const [activeId, setActiveId] = useState(null);
  const [showFormationSelector, setShowFormationSelector] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // --- PERSISTENT SAVING & SHARING STATE ---
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [showSaveDropdown, setShowSaveDropdown] = useState(false);
  const [savedLineups, setSavedLineups] = useState([]); 
   
  const [currentLineupId, setCurrentLineupId] = useState(() => loadState('currentLineupId', null));
  const [shareCode, setShareCode] = useState(() => loadState('shareCode', null));

  // --- SELECTED PLAYER STATE FOR TAP-TO-PLACE ---
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  
  // --- CLEAR CONFIRMATION DIALOG STATE ---
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // --- NEW: DELETE LINEUP STATE ---
  const [lineupToDelete, setLineupToDelete] = useState(null);

  // --- SIMULATE INITIAL LOAD ---
  useEffect(() => {
    const timer = setTimeout(() => {
        setIsInitialLoading(false);
    }, 2800); 
    return () => clearTimeout(timer);
  }, []);

  // --- EFFECT: PERSIST ALL STATE TO LOCAL STORAGE ---
  useEffect(() => {
    localStorage.setItem('teamSize', JSON.stringify(teamSize));
    localStorage.setItem('formationName', JSON.stringify(formationName));
    localStorage.setItem('roster', JSON.stringify(roster));
    localStorage.setItem('placedPlayers', JSON.stringify(placedPlayers));
    localStorage.setItem('teamName', JSON.stringify(teamName));
    localStorage.setItem('currentLineupId', JSON.stringify(currentLineupId));
    localStorage.setItem('shareCode', JSON.stringify(shareCode));
    localStorage.setItem('jerseyConfig', JSON.stringify(jerseyConfig)); 
  }, [teamSize, formationName, roster, placedPlayers, teamName, currentLineupId, shareCode, jerseyConfig]);

  useEffect(() => {
    const init = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if(user) fetchSavedLineups(user.id);
    };
    init();
  }, []);

  const fetchSavedLineups = async (userId) => {
      const { data } = await supabase.from('lineups').select('id, title, formation, team_size').eq('user_id', userId).order('updated_at', { ascending: false });
      if(data) setSavedLineups(data);
  }

  const formationPositions = FORMATIONS[teamSize.id]?.[formationName] || [];

  // --- CORE SAVE LOGIC ---
  const saveToDatabase = async (silent = false) => {
      if (!user) { if(!silent) setShowLoginModal(true); return null; }
      
      const existingInSize = savedLineups.filter(l => l.team_size === teamSize.id);
      if (!currentLineupId && existingInSize.length >= 4) {
          if(!silent) {
              alert(`Limit Reached! You have 4 saved squads for ${teamSize.label}. Please overwrite an existing one.`);
              setShowSaveDropdown(true);
          }
          return null;
      }

      if(!silent) setIsSaving(true);
      else setAutoSaving(true);

      const payload = {
          user_id: user.id,
          team_size: teamSize.id,
          formation: formationName,
          squad_data: roster,
          placed_players: placedPlayers,
          tactical_data: tacticalPositions,
          title: teamName,
          updated_at: new Date()
      };

      let returnId = currentLineupId;

      if (currentLineupId) {
          await supabase.from('lineups').update(payload).eq('id', currentLineupId);
      } else {
          const { data } = await supabase.from('lineups').insert([payload]).select();
          if(data && data.length > 0) {
              returnId = data[0].id;
              setCurrentLineupId(returnId);
          }
      }

      if(!silent) {
          await fetchSavedLineups(user.id);
          setTimeout(() => { setIsSaving(false); setShowSaveDropdown(false); }, 1000);
      } else {
          setTimeout(() => setAutoSaving(false), 500);
      }

      return returnId;
  };

  // --- AUTO-SAVE EFFECT ---
  useEffect(() => {
    if (!currentLineupId || !user) return; 
    
    const timeoutId = setTimeout(() => {
        saveToDatabase(true); 
    }, 2000); 

    return () => clearTimeout(timeoutId);
  }, [placedPlayers, roster, tacticalPositions, teamName, formationName]);


  const loadLineup = async (id) => {
      const { data } = await supabase.from('lineups').select('*').eq('id', id).single();
      if(data) {
          const size = TEAM_SIZES.find(t => t.id === data.team_size) || TEAM_SIZES[0];
          setTeamSize(size);
          setFormationName(data.formation);
          setRoster(data.squad_data);
          setPlacedPlayers(data.placed_players);
          setTacticalPositions(data.tactical_data);
          setTeamName(data.title);
          setCurrentLineupId(data.id);
          setShareCode(data.share_code); 
          setShowSaveDropdown(false);
      }
  };

  // --- DELETE HANDLER ---
  const confirmDeleteLineup = async () => {
      if (!lineupToDelete) return;
      
      const { error } = await supabase.from('lineups').delete().eq('id', lineupToDelete.id);
      
      if (!error) {
          setSavedLineups(prev => prev.filter(l => l.id !== lineupToDelete.id));
          
          if (currentLineupId === lineupToDelete.id) {
              setCurrentLineupId(null);
              setShareCode(null);
              setTeamName(teamName + " (Unsaved)"); // Visual cue
          }
      }
      setLineupToDelete(null);
  };

  const handleGenerateCode = async () => {
      if (!user) { setShowLoginModal(true); return; }

      let targetId = await saveToDatabase(false);
      if(!targetId) return;

      const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      setShareCode(newCode);

      await supabase.from('lineups').update({ share_code: newCode }).eq('id', targetId);
  };

  const handleCopyCode = () => {
      if(shareCode) {
          navigator.clipboard.writeText(shareCode);
          alert("Code copied!");
      }
  };

  const handleRegenerateCode = async () => {
      if(confirm("Regenerate code? Old code will stop working.")) handleGenerateCode();
  }

  const handleTacticalModeToggle = () => {
      if (!isTacticalMode) {
          setLoadingTactical(true);
          setTimeout(() => {
              setLoadingTactical(false);
              setIsTacticalMode(true);
          }, 1500);
      } else {
          setIsTacticalMode(false);
      }
  };

  const updatePlayer = (id, field, value) => {
    if (field === 'number') {
        const existingPlayer = roster.find(p => p.number == value && p.id !== id);
        if (existingPlayer) {
            const currentPlayer = roster.find(p => p.id === id);
            const oldNum = currentPlayer.number;
            setRoster(prev => prev.map(p => {
                if (p.id === id) return { ...p, number: value };
                if (p.id === existingPlayer.id) return { ...p, number: oldNum };
                return p;
            }));
            return;
        }
    }
    setRoster(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const deletePlayer = (id) => {
    setRoster(prev => prev.filter(p => p.id !== id));
    removeFromPitch(id);
    if (selectedPlayerId === id) setSelectedPlayerId(null);
  };

  const removeFromPitch = (id) => {
    setPlacedPlayers(prev => {
        const newPlaced = { ...prev };
        const pos = Object.keys(newPlaced).find(k => newPlaced[k].id === id);
        if (pos) delete newPlaced[pos];
        return newPlaced;
    });
    setTacticalPositions(prev => { const newPos = { ...prev }; delete newPos[id]; return newPos; });
  };

  // --- TAP-TO-PLACE LOGIC ---

  // Handle clicking a player (Roster or Pitch)
  const handlePlayerClick = (player) => {
      if (selectedPlayerId === player.id) {
          // Deselect if already selected
          setSelectedPlayerId(null);
      } else if (selectedPlayerId) {
          // If another player is selected and we click this one, consider it a Swap/Replace
          const targetSlotEntry = Object.entries(placedPlayers).find(([_, p]) => p.id === player.id);
          if (targetSlotEntry) {
              const targetSlotId = targetSlotEntry[0];
              const selectedPlayer = roster.find(p => p.id === selectedPlayerId) || Object.values(placedPlayers).find(p => p.id === selectedPlayerId);
              if (selectedPlayer) {
                  movePlayerToSlot(selectedPlayer, targetSlotId);
                  setSelectedPlayerId(null);
              }
          } else {
              setSelectedPlayerId(player.id);
          }
      } else {
          setSelectedPlayerId(player.id);
      }
  };

  const handleSlotClick = (slotId) => {
      if (selectedPlayerId) {
          const player = roster.find(p => p.id === selectedPlayerId) || Object.values(placedPlayers).find(p => p.id === selectedPlayerId);
          if (player) {
              movePlayerToSlot(player, slotId);
              setSelectedPlayerId(null);
          }
      }
  };

  const movePlayerToSlot = (player, targetSlotId) => {
      setPlacedPlayers(prev => {
          const newPlaced = { ...prev };
          const sourceSlot = Object.keys(newPlaced).find(k => newPlaced[k].id === player.id);
          if (sourceSlot) delete newPlaced[sourceSlot]; 
          
          const targetPlayer = newPlaced[targetSlotId];

          if (targetPlayer) {
              if (sourceSlot) { 
                  newPlaced[sourceSlot] = targetPlayer; 
                  newPlaced[targetSlotId] = player; 
              } else { 
                  newPlaced[targetSlotId] = player; 
              }
          } else {
              newPlaced[targetSlotId] = player;
          }
          return newPlaced;
      });
  };

  const handleDragStart = (event) => setActiveId(event.active.id);
   
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    const player = active.data.current.player;
    
    if (isTacticalMode && tacticalPitchRef.current) {
        const pitchRect = tacticalPitchRef.current.getBoundingClientRect();
        const droppedRect = active.rect.current.translated; 
        if (droppedRect) {
            const dropCenterX = (droppedRect.left + droppedRect.width / 2) - pitchRect.left;
            const dropCenterY = (droppedRect.top + droppedRect.height / 2) - pitchRect.top;
            let newX = Math.max(0, Math.min(100, (dropCenterX / pitchRect.width) * 100));
            let newY = Math.max(0, Math.min(100, (dropCenterY / pitchRect.height) * 100));
            setTacticalPositions(prev => ({ ...prev, [player.id]: { x: newX, y: newY } }));
        }
        return;
    }

    if (!over) return;
    const dropId = over.id;

    if (dropId === 'roster-zone') { removeFromPitch(player.id); return; }

    let targetSlotId = dropId;
    const playerOccupyingDropTarget = Object.entries(placedPlayers).find(([slot, p]) => p.id === dropId);
    if (playerOccupyingDropTarget) targetSlotId = playerOccupyingDropTarget[0]; 

    const isValidSlot = formationPositions.some(pos => pos.id === targetSlotId);
    if (!isValidSlot) return; 

    movePlayerToSlot(player, targetSlotId);
  };

  const handleAutoBuild = () => {
    const newPlaced = {};
    const currentlyPlacedIds = Object.values(placedPlayers).map(p => p.id);
    const availablePlayers = roster.filter(p => !currentlyPlacedIds.includes(p.id));
    formationPositions.forEach((pos) => {
        if (placedPlayers[pos.id]) newPlaced[pos.id] = placedPlayers[pos.id];
        else if (availablePlayers.length > 0) newPlaced[pos.id] = availablePlayers.shift();
    });
    setPlacedPlayers(newPlaced);
  };
  
  // --- NEW: CLEAR LINEUP FUNCTION ---
  const handleClearLineup = () => {
    if (Object.keys(placedPlayers).length === 0) return;
    setShowClearConfirm(true);
  };

  const confirmClear = () => {
    setPlacedPlayers({});
    setTacticalPositions({});
    setSelectedPlayerId(null);
    setShowClearConfirm(false);
  };

  const handleTeamSizeChange = (newSizeId) => {
      const newSize = TEAM_SIZES.find(ts => ts.id === newSizeId);
      setTeamSize(newSize);
      setRoster(Array.from({ length: newSize.maxSquad }, (_, i) => ({ id: `p${i+1}`, name: `Player ${i+1}`, number: i+1 })));
      setPlacedPlayers({});
      setTacticalPositions({});
      setFormationName(Object.keys(FORMATIONS[newSize.id])[0]);
      
      // FIX: Reset Lineup ID and Name when changing size to avoid confusion
      setCurrentLineupId(null);
      setTeamName(`My ${newSize.label} Squad`); // Default name for new size
      setShareCode(null);
      setSelectedPlayerId(null);
  };

  const visibleRoster = roster.filter(p => !Object.values(placedPlayers).some(placed => placed.id === p.id));

  const getSelectedPlayerName = () => {
      if(!selectedPlayerId) return '';
      const p = roster.find(x => x.id === selectedPlayerId) || Object.values(placedPlayers).find(x => x.id === selectedPlayerId);
      return p ? p.name : '';
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Navbar />
      
      {/* --- INITIAL LOADER --- */}
      <AnimatePresence>
          {isInitialLoading && <InitialSquadLoader />}
      </AnimatePresence>
      
      <AnimatePresence>
        {loadingTactical && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200]">
                <TacticalLoader />
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{isSaving && <SaveLoader />}</AnimatePresence>

      <AnimatePresence>
        {isTacticalMode && !loadingTactical && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-900 flex flex-col">
                <div className="p-3 md:p-4 bg-black/40 border-b border-white/10 flex justify-between items-center z-50">
                    <div>
                        <h2 className="text-lg md:text-2xl text-white font-teko uppercase tracking-wider">Tactical Board</h2>
                        <p className="text-[10px] md:text-xs text-slate-400">Drag freely to simulate</p>
                    </div>
                    <div className="flex gap-2 md:gap-4">
                        <button onClick={() => setTacticalPositions({})} className="flex items-center gap-1 md:gap-2 text-slate-300 hover:text-white px-2 py-1 md:px-4 md:py-2 rounded border border-white/10 hover:bg-white/5 transition-all text-xs md:text-sm">
                            <RotateCcw className="w-3 h-3 md:w-4 md:h-4" /> Reset
                        </button>
                        <button onClick={() => setIsTacticalMode(false)} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 md:px-6 md:py-2 rounded font-bold uppercase tracking-wider shadow-lg transition-all text-xs md:text-sm">
                            Exit
                        </button>
                    </div>
                </div>
                <div className="flex-1 relative overflow-hidden bg-slate-900 p-2 md:p-8 flex items-center justify-center">
                    <div ref={tacticalPitchRef} className="relative w-full h-full md:w-auto md:aspect-[1.6/1] bg-pitch-dark border-4 border-white/20 rounded-xl shadow-2xl" style={{ backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent)`, backgroundSize: '50px 50px' }}>
                        <div className="absolute top-0 left-[20%] right-[20%] h-[15%] border-b-2 border-x-2 border-white/20"></div>
                        <div className="absolute bottom-0 left-[20%] right-[20%] h-[15%] border-t-2 border-x-2 border-white/20"></div>
                        <div className="absolute top-1/2 w-full h-0.5 bg-white/10"></div>
                        {formationPositions.map(pos => {
                            const player = placedPlayers[pos.id];
                            if (player) {
                                const tacticalPos = tacticalPositions[player.id];
                                return <PitchPlayer key={player.id} player={player} x={tacticalPos ? tacticalPos.x : pos.x} y={tacticalPos ? tacticalPos.y : pos.y} isTactical={true} jerseyConfig={jerseyConfig} />;
                            }
                            return null;
                        })}
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.9, opacity:0}} className="bg-slate-900 border border-pitch rounded-2xl p-6 w-full max-w-xs text-center relative">
               <button onClick={() => setShowLoginModal(false)} className="absolute top-2 right-2 text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
               <h2 className="text-xl font-teko text-white uppercase mb-2">Login Required</h2>
               <button onClick={() => navigate('/auth')} className="w-full bg-pitch text-slate-900 font-bold uppercase py-2 rounded-lg">Go to Login</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADDED: CLEAR CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {showClearConfirm && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
                initial={{scale:0.9, opacity:0}} 
                animate={{scale:1, opacity:1}} 
                exit={{scale:0.9, opacity:0}} 
                className="bg-slate-900 border border-red-500/50 rounded-xl p-4 w-full max-w-xs text-center shadow-[0_0_30px_rgba(239,68,68,0.2)]"
            >
               <h3 className="text-white font-bold text-lg mb-2 font-teko tracking-wide uppercase">Clear Lineup?</h3>
               <p className="text-slate-400 text-xs mb-4 leading-relaxed">All players will be removed from the pitch and returned to the squad list.</p>
               <div className="flex gap-2 justify-center">
                  <button 
                    onClick={() => setShowClearConfirm(false)} 
                    className="flex-1 py-2 rounded bg-slate-800 text-slate-300 text-xs font-bold uppercase hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmClear} 
                    className="flex-1 py-2 rounded bg-red-600 text-white text-xs font-bold uppercase hover:bg-red-500 shadow-lg transition-colors"
                  >
                    Confirm
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- NEW: DELETE CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {lineupToDelete && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
                initial={{scale:0.9, opacity:0}} 
                animate={{scale:1, opacity:1}} 
                exit={{scale:0.9, opacity:0}} 
                className="bg-slate-900 border border-red-500/50 rounded-xl p-4 w-full max-w-xs text-center shadow-[0_0_30px_rgba(239,68,68,0.2)]"
            >
               <h3 className="text-white font-bold text-lg mb-2 font-teko tracking-wide uppercase">Delete Saved Lineup?</h3>
               <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                   Are you sure you want to delete <span className="text-white font-bold">"{lineupToDelete.title}"</span>? This action cannot be undone.
               </p>
               <div className="flex gap-2 justify-center">
                  <button 
                    onClick={() => setLineupToDelete(null)} 
                    className="flex-1 py-2 rounded bg-slate-800 text-slate-300 text-xs font-bold uppercase hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDeleteLineup} 
                    className="flex-1 py-2 rounded bg-red-600 text-white text-xs font-bold uppercase hover:bg-red-500 shadow-lg transition-colors"
                  >
                    Delete
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- VISUAL FORMATION SELECTOR --- */}
      <VisualFormationSelector 
        isOpen={showFormationSelector} 
        onClose={() => setShowFormationSelector(false)}
        teamSizeId={teamSize.id}
        currentFormation={formationName}
        onSelect={(fmt) => { 
            // 1. Update formation
            setFormationName(fmt); 
            // 2. Reset tactical adjustments
            setTacticalPositions({}); 
            
            // 3. FIX: Redistribute players sequentially to new slots so they don't disappear
            const currentPlayers = Object.values(placedPlayers);
            const newFormationSlots = FORMATIONS[teamSize.id][fmt] || [];
            const newPlaced = {};
            
            currentPlayers.forEach((player, index) => {
                if (index < newFormationSlots.length) {
                    newPlaced[newFormationSlots[index].id] = player;
                }
            });
            setPlacedPlayers(newPlaced);
        }}
      />

      <div className="pt-20 md:pt-24 h-[100dvh] w-full bg-slate-900/20 backdrop-blur-sm overflow-hidden font-sans flex flex-col relative">
          
          {/* HEADER */}
          <div className="shrink-0 flex flex-col items-center bg-black/20 border-b border-white/5 pb-2 pt-2 gap-1">
             <div className="flex items-center justify-center gap-2 relative z-20">
                 
                 {/* Name Group */}
                 <div className="relative flex items-center gap-1">
                     {/* CHANGED: Smaller text size for mobile (text-base) */}
                     <input 
                       type="text"
                       value={teamName}
                       onChange={(e) => setTeamName(e.target.value)}
                       className="bg-transparent text-center text-white text-base md:text-2xl font-bold uppercase italic font-teko outline-none focus:border-b border-pitch/50 transition-all placeholder:text-white/20 max-w-[150px] md:max-w-[300px]"
                       placeholder="TEAM NAME"
                     />
                     <button onClick={() => { if(!user) setShowLoginModal(true); else setShowSaveDropdown(!showSaveDropdown) }} className="p-1 text-slate-400 hover:text-white">
                        <ChevronDown className="w-4 h-4" />
                     </button>
                     <AnimatePresence>
                        {showSaveDropdown && user && (
                            // FIX: Changed right-0 to centered positioning to prevent overflow on mobile
                            <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="absolute top-10 -right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto w-64 max-w-[90vw] bg-slate-900 border border-white/20 rounded-xl shadow-2xl p-2 z-[60]">
                                <div className="flex justify-between items-center mb-2 px-2">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold">Saved {teamSize.label} ({savedLineups.filter(l => l.team_size === teamSize.id).length}/4)</span>
                                    <button onClick={() => setShowSaveDropdown(false)}><X className="w-3 h-3 text-slate-500 hover:text-white"/></button>
                                </div>
                                {savedLineups.filter(l => l.team_size === teamSize.id).map(l => (
                                    <div key={l.id} className="flex items-center gap-1 group w-full mb-1">
                                        <button onClick={() => loadLineup(l.id)} className="flex-1 text-left p-2 hover:bg-white/5 rounded-lg flex justify-between items-center">
                                            <span className="text-xs text-white font-bold truncate max-w-[100px]">{l.title}</span>
                                            {l.id === currentLineupId && <Check className="w-3 h-3 text-pitch"/>}
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setLineupToDelete(l); }}
                                            className="p-2 hover:bg-red-500/20 rounded-lg text-slate-500 hover:text-red-500 transition-colors"
                                            title="Delete Lineup"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                                {savedLineups.filter(l => l.team_size === teamSize.id).length === 0 && <div className="text-center py-4 text-xs text-slate-600">No saves yet</div>}
                                <div className="border-t border-white/5 mt-1 pt-1">
                                    <button onClick={() => { setCurrentLineupId(null); setTeamName('New Squad'); setRoster(Array.from({ length: 25 }, (_, i) => ({ id: `p${i+1}`, name: `Player ${i+1}`, number: i+1 }))); setPlacedPlayers({}); setShowSaveDropdown(false); }} className="w-full py-2 bg-pitch/10 hover:bg-pitch/20 text-pitch text-xs font-bold uppercase rounded-lg flex items-center justify-center gap-1">
                                            <Plus className="w-3 h-3" /> New Slot
                                    </button>
                                </div>
                            </motion.div>
                        )}
                     </AnimatePresence>
                 </div>

                 {/* Share Code Group */}
                 <AnimatePresence>
                    {shareCode && (
                        <motion.div 
                            initial={{opacity:0, scale:0.8}} 
                            animate={{opacity:1, scale:1}} 
                            exit={{opacity:0, scale:0.8}} 
                            className="bg-slate-900 border border-pitch/50 rounded-full px-2 py-0.5 flex items-center gap-2 shadow-sm"
                        >
                            {autoSaving && <Loader2 className="w-2.5 h-2.5 text-pitch animate-spin"/>}
                            <span className="text-[10px] md:text-xs font-mono font-bold text-white tracking-widest">{shareCode}</span>
                            <div className="w-px h-3 bg-white/20"></div>
                            <button onClick={handleCopyCode} className="text-slate-400 hover:text-white" title="Copy"><Copy className="w-3 h-3"/></button>
                            <button onClick={handleRegenerateCode} className="text-slate-400 hover:text-pitch" title="New Code"><RefreshCw className="w-3 h-3"/></button>
                        </motion.div>
                    )}
                 </AnimatePresence>
             </div>
             
             {/* CHANGED: Made buttons smaller on mobile (text-[8px] and px-1) */}
             <div className="flex flex-wrap justify-center gap-1 md:gap-2 px-2">
                <select className="bg-slate-800 text-white border border-white/20 rounded px-1 py-0.5 md:px-2 md:py-1 text-[8px] md:text-xs font-bold uppercase hover:border-pitch cursor-pointer" value={teamSize.id} onChange={(e) => handleTeamSizeChange(e.target.value)}>
                   {TEAM_SIZES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
                <button onClick={() => setShowFormationSelector(true)} className="bg-slate-800 text-white border border-white/20 rounded px-1 py-0.5 md:px-2 md:py-1 text-[8px] md:text-xs font-bold uppercase hover:border-pitch flex items-center gap-1">
                   {formationName} <ChevronDown className="w-3 h-3"/>
                </button>
                <button onClick={handleAutoBuild} className="bg-pitch/10 text-pitch border border-pitch/30 rounded px-1 py-0.5 md:px-2 md:py-1 text-[8px] md:text-xs font-bold uppercase hover:bg-pitch/20 flex items-center gap-1">
                   <Wand2 className="w-3 h-3"/> Auto
                </button>
                
                {/* Clear Lineup Button */}
                <button 
                  onClick={handleClearLineup} 
                  className="bg-slate-800 text-slate-300 border border-slate-600 rounded px-1 py-0.5 md:px-2 md:py-1 text-[8px] md:text-xs font-bold uppercase hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 flex items-center gap-1 transition-all"
                  title="Clear Lineup"
                >
                   <RotateCcw className="w-3 h-3"/> <span className="hidden md:inline">Clear</span>
                </button>

                <button onClick={handleTacticalModeToggle} className="flex items-center gap-1 px-1 py-0.5 md:px-3 md:py-1 rounded text-[8px] md:text-xs font-bold uppercase bg-transparent text-slate-400 border border-slate-600 hover:text-white hover:border-pitch transition-all">
                   <Lock className="w-3 h-3"/> Tactical Board
                </button>
             </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
             {/* PITCH */}
             <div className="h-[42vh] lg:h-full lg:flex-1 relative order-1 lg:order-2 bg-gradient-to-b from-slate-900/50 to-transparent">
                <div className="w-full h-full relative overflow-hidden flex items-center justify-center perspective-[1200px]">
                    
                    {/* Visual Notification Banner for Tap-to-Place */}
                    <AnimatePresence>
                        {selectedPlayerId && (
                            <motion.div 
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                className="absolute top-1 md:top-4 z-50 bg-slate-900/60 md:bg-slate-900/90 backdrop-blur-sm border border-pitch/50 md:border-pitch text-white px-2 py-1 md:px-4 md:py-2 rounded-full shadow-lg flex items-center gap-1 md:gap-2"
                            >
                                <Move className="w-3 h-3 md:w-4 md:h-4 text-pitch animate-pulse" />
                                <span className="text-[9px] md:text-xs font-bold uppercase whitespace-nowrap">
                                    Tap to place <span className="text-pitch">{getSelectedPlayerName()}</span>
                                </span>
                                <button onClick={() => setSelectedPlayerId(null)} className="ml-1 md:ml-2 hover:bg-white/10 rounded-full p-0.5 md:p-1"><X className="w-3 h-3"/></button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div id="pitch-container" ref={builderPitchRef} className="relative w-[85%] h-[85%] md:w-[85%] md:h-[85%] bg-pitch-dark border-4 border-white/20 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform rotate-x-[15deg] origin-center" style={{ backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent)`, backgroundSize: '50px 50px' }}>
                        <div className="absolute top-0 left-[20%] right-[20%] h-[15%] border-b-2 border-x-2 border-white/20"></div>
                        <div className="absolute bottom-0 left-[20%] right-[20%] h-[15%] border-t-2 border-x-2 border-white/20"></div>
                        <div className="absolute top-1/2 w-full h-0.5 bg-white/10"></div>
                        {formationPositions.map(pos => {
                           const player = placedPlayers[pos.id];
                           if(player) return null; 
                           return <DroppableSlot key={pos.id} id={pos.id} x={pos.x} y={pos.y} occupied={false} onClick={handleSlotClick} highlight={!!selectedPlayerId} />;
                        })}
                        {Object.entries(placedPlayers).map(([slotId, player]) => {
                           const pos = formationPositions.find(p => p.id === slotId);
                           return pos ? <PitchPlayer key={player.id} player={player} x={pos.x} y={pos.y} onRemove={removeFromPitch} isTactical={false} jerseyConfig={jerseyConfig} onClick={handlePlayerClick} isSelected={selectedPlayerId === player.id} /> : null;
                        })}
                    </div>
                </div>
             </div>

             {/* SQUAD LIST */}
             <div className="flex-1 lg:flex-none lg:w-[320px] bg-slate-900/30 backdrop-blur-md border-t lg:border-t-0 lg:border-r border-white/10 flex flex-col min-h-0 order-2 lg:order-1 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div className="p-3 bg-black/20 border-b border-white/5 flex flex-col gap-2">
                   <div className="flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <span className="text-white font-teko text-lg uppercase tracking-wide">Squad List</span>
                        <button 
                            onClick={() => setShowSettings(true)} 
                            className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-pitch transition-colors"
                            title="Kit Settings"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                     </div>
                     <span className="text-pitch text-sm font-bold">{roster.length}/{teamSize.maxSquad}</span>
                   </div>
                </div>

                <RosterDroppableArea>
                   <div id="roster-container" className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                      <DroppableSlot id="roster-zone" x={-100} y={-100} occupied={true} />
                      {/* grid-cols-5 for mobile */}
                      <div className="grid grid-cols-5 lg:grid-cols-4 gap-1 md:gap-2">
                         {visibleRoster.map((player) => (
                            <DraggablePlayer 
                                key={player.id} 
                                player={player} 
                                onUpdate={updatePlayer} 
                                onDelete={deletePlayer} 
                                disabled={false} 
                                jerseyConfig={jerseyConfig}
                                onClick={handlePlayerClick}
                                isSelected={selectedPlayerId === player.id}
                            />
                         ))}
                         {roster.length < 50 && (
                            <button onClick={() => { const newId = roster.length + 1; const nextNum = roster.length > 0 ? Math.max(...roster.map(p => parseInt(p.number) || 0)) + 1 : 1; setRoster([...roster, { id: `p${Date.now()}`, name: `Player ${newId}`, number: nextNum }]); }} className="w-full aspect-square border border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center text-slate-500 hover:text-white hover:border-pitch/50 transition-all bg-slate-800/20">
                               <Plus className="w-4 h-4"/>
                            </button>
                         )}
                      </div>
                   </div>
                </RosterDroppableArea>

                {/* BUTTONS */}
                <div className="p-2 border-t border-white/10 bg-black/40 shrink-0 grid grid-cols-3 gap-2">
                    <ActionBtn 
                        icon={<Save className="w-4 h-4" />} 
                        label="Save" 
                        onClick={() => saveToDatabase(false)} 
                        gradient="from-blue-600 to-cyan-500" 
                    />
                    
                    <ActionBtn 
                        icon={user ? (shareCode ? <Copy className="w-4 h-4" /> : <Zap className="w-4 h-4" />) : <LogIn className="w-4 h-4" />} 
                        label={user ? (shareCode ? "Copy Code" : "Gen Code") : "Login to Share"} 
                        onClick={() => { 
                            if(!user) { setShowLoginModal(true); return; }
                            if(shareCode) handleCopyCode();
                            else handleGenerateCode();
                        }} 
                        gradient={user ? "from-purple-600 to-pink-500" : "from-slate-600 to-slate-500"} 
                    />

                    <ActionBtn 
                        icon={<FileDown className="w-4 h-4" />} 
                        label="PDF" 
                        onClick={() => {
                            if (!user) { setShowLoginModal(true); return; }
                            downloadLineupPDF(teamName, formationName)
                        }} 
                        gradient="from-orange-600 to-red-500" 
                    />
                </div>
             </div>
          </div>

          <DragOverlay>
             {activeId ? (
                <DraggablePlayer player={roster.find(p => p.id === activeId) || Object.values(placedPlayers).find(p => p.id === activeId)} isOverlay jerseyConfig={jerseyConfig} /> || 
                <PitchPlayer player={Object.values(placedPlayers).find(p => p.id === activeId)} isOverlay jerseyConfig={jerseyConfig} />
             ) : null}
          </DragOverlay>

          <SquadSettingsModal 
            isOpen={showSettings} 
            onClose={() => setShowSettings(false)} 
            currentConfig={jerseyConfig} 
            onUpdate={setJerseyConfig} 
          />
      </div>
    </DndContext>
  );
};

const RosterDroppableArea = ({ children }) => {
   const { setNodeRef, isOver } = useDroppable({ id: 'roster-zone' });
   return <div ref={setNodeRef} className={`flex-1 flex flex-col min-h-0 transition-colors ${isOver ? 'bg-pitch/5' : ''}`}>{children}</div>;
};

const ActionBtn = ({ icon, label, onClick, gradient }) => (
  <button onClick={onClick} className={`h-9 rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 bg-gradient-to-r ${gradient} shadow-lg hover:brightness-110`}>
    <div className="text-white">{icon}</div>
    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white">{label}</span>
  </button>
);

export default BuilderPage;
