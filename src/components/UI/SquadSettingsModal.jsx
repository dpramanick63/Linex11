import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Palette, Shirt, Circle, User, Shield, Hexagon, Triangle } from 'lucide-react';

// --- JERSEY PRESETS (The 15 Avatars) ---
export const JERSEY_STYLES = {
  classic: { id: 'classic', label: 'Classic Kit', path: "M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" },
  polo: { id: 'polo', label: 'Polo', path: "M12 2C9 2 7 3.5 7 5v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5c0-1.5-2-3-5-3zm0 2c.5 0 1 .5 1 1v2h-2V5c0-.5.5-1 1-1z" }, // Simplified abstract polo
  dot: { id: 'dot', label: 'Tactical Dot', path: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" },
  ring: { id: 'ring', label: 'Ring', path: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", fill: "none", strokeWidth: 3 },
  user: { id: 'user', label: 'Player Icon', path: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", strokeWidth: 2, fill: "none" },
  shield: { id: 'shield', label: 'Badge', path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  diamond: { id: 'diamond', label: 'Diamond', path: "M12 22L2.5 12 12 2 21.5 12z" },
  triangle: { id: 'triangle', label: 'Arrow', path: "M12 2L2 22h20L12 2z" },
  hexagon: { id: 'hexagon', label: 'Hex', path: "M21 16V8l-9-5-9 5v8l9 5 9-5z" },
  striped: { id: 'striped', label: 'Striped Kit', path: "M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z M10 18V4 M14 18V4" }, // Rough approximation
  hoops: { id: 'hoops', label: 'Hoops', path: "M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z M4 10h16 M4 14h16" },
  half: { id: 'half', label: 'Half Kit', path: "M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z M12 2v18" },
  sash: { id: 'sash', label: 'Sash', path: "M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z M4 4l16 16" },
  star: { id: 'star', label: 'Star', path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
};

// --- PRESET COLORS ---
const COLOR_PRESETS = [
  '#ffffff', '#000000', '#ef4444', '#3b82f6', '#22c55e', '#eab308', 
  '#a855f7', '#ec4899', '#f97316', '#06b6d4', '#6366f1', '#84cc16'
];

// --- COMPONENT TO RENDER THE ICON DYNAMICALLY ---
export const JerseyIcon = ({ styleId = 'classic', color = '#ffffff', className = "w-6 h-6" }) => {
  const style = JERSEY_STYLES[styleId] || JERSEY_STYLES.classic;
  const isStroked = style.strokeWidth ? true : false;

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={className}
      fill={isStroked ? 'none' : color}
      stroke={isStroked ? color : '#111'}
      strokeWidth={isStroked ? style.strokeWidth : '1'}
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d={style.path} />
    </svg>
  );
};

// --- MAIN SETTINGS MODAL ---
const SquadSettingsModal = ({ isOpen, onClose, currentConfig, onUpdate }) => {
  const [localConfig, setLocalConfig] = useState(currentConfig);
  const [activeTab, setActiveTab] = useState('color'); // 'color' or 'style'

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdate(localConfig);
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9 }} animate={{ scale: 1 }}
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-950">
          <h3 className="font-teko text-2xl text-white uppercase tracking-wider flex items-center gap-2">
            <Palette className="w-5 h-5 text-pitch"/> Kit Settings
          </h3>
          <button onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-white"/></button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 gap-2 bg-slate-900">
          <button onClick={() => setActiveTab('color')} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${activeTab === 'color' ? 'bg-pitch text-slate-900' : 'bg-slate-800 text-slate-400'}`}>Colors</button>
          <button onClick={() => setActiveTab('style')} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${activeTab === 'style' ? 'bg-pitch text-slate-900' : 'bg-slate-800 text-slate-400'}`}>Style</button>
        </div>

        {/* Content */}
        <div className="p-6 h-80 overflow-y-auto custom-scrollbar">
          
          {/* COLOR TAB */}
          {activeTab === 'color' && (
            <div className="space-y-6">
              <div>
                <label className="text-xs text-slate-400 uppercase font-bold mb-3 block">Base Color</label>
                <div className="grid grid-cols-6 gap-3">
                  {COLOR_PRESETS.map(c => (
                    <button 
                      key={c} 
                      onClick={() => setLocalConfig({...localConfig, color: c})}
                      className={`w-8 h-8 rounded-full border-2 ${localConfig.color === c ? 'border-white scale-110' : 'border-transparent hover:scale-105'} transition-all shadow-sm`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-xs text-slate-400 uppercase font-bold mb-3 block">Custom Gradient / Hex</label>
                <div className="flex gap-4 items-center bg-slate-800 p-3 rounded-xl border border-white/5">
                  <input 
                    type="color" 
                    value={localConfig.color}
                    onChange={(e) => setLocalConfig({...localConfig, color: e.target.value})}
                    className="w-10 h-10 rounded cursor-pointer bg-transparent border-none p-0"
                  />
                  <div className="flex-1">
                    <p className="text-white font-mono text-sm">{localConfig.color}</p>
                    <p className="text-[10px] text-slate-500">Click circle to edit gradient/hex</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STYLE TAB */}
          {activeTab === 'style' && (
            <div className="grid grid-cols-4 gap-4">
              {Object.values(JERSEY_STYLES).map((style) => (
                <button
                  key={style.id}
                  onClick={() => setLocalConfig({...localConfig, style: style.id})}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${localConfig.style === style.id ? 'bg-pitch/20 border-pitch' : 'bg-slate-800 border-transparent hover:bg-slate-700'}`}
                >
                  <JerseyIcon styleId={style.id} color={localConfig.color} className="w-8 h-8" />
                  <span className="text-[9px] text-slate-300 uppercase font-bold text-center">{style.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950 flex justify-end">
          <button onClick={handleSave} className="bg-pitch text-slate-900 font-bold uppercase py-2 px-6 rounded-lg hover:brightness-110 flex items-center gap-2">
            <Check className="w-4 h-4" /> Apply Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SquadSettingsModal;