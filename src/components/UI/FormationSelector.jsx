import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, LayoutTemplate } from 'lucide-react';
import { FORMATIONS } from '../../lib/builderFormations';

const FormationSelector = ({ isOpen, onClose, teamSizeId, currentFormation, onSelect }) => {
  // 1. Group Formations by Category (Simple heuristic based on name)
  const groupedFormations = useMemo(() => {
    const all = Object.keys(FORMATIONS[teamSizeId] || {});
    const groups = {};

    all.forEach(fmt => {
      let key = 'Other';
      if (fmt.startsWith('4-')) key = 'Back 4';
      else if (fmt.startsWith('3-')) key = 'Back 3';
      else if (fmt.startsWith('5-')) key = 'Back 5';
      else if (fmt.startsWith('2-')) key = 'Back 2';
      else if (fmt.startsWith('1-')) key = 'Back 1';
      
      if (!groups[key]) groups[key] = [];
      groups[key].push(fmt);
    });

    // Sort keys to ensure specific order
    return Object.keys(groups).sort().reduce((acc, key) => {
        acc[key] = groups[key];
        return acc;
    }, {});
  }, [teamSizeId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-950">
              <div className="flex items-center gap-3">
                <LayoutTemplate className="w-5 h-5 text-pitch" />
                <h2 className="text-xl font-teko font-bold text-white uppercase tracking-wider">Select Formation</h2>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {Object.entries(groupedFormations).map(([category, formations]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-1">{category} Systems</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {formations.map(fmt => (
                      <button 
                        key={fmt}
                        onClick={() => { onSelect(fmt); onClose(); }}
                        className={`group flex items-center justify-between px-4 py-3 rounded-xl border transition-all
                        ${currentFormation === fmt 
                          ? 'bg-pitch/10 border-pitch text-white' 
                          : 'bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-800 hover:border-white/20'}`}
                      >
                        <span className={`font-bold ${currentFormation === fmt ? 'text-pitch' : 'group-hover:text-white'}`}>{fmt}</span>
                        {currentFormation === fmt && <div className="w-2 h-2 rounded-full bg-pitch shadow-[0_0_10px_#22c55e]"></div>}
                        {currentFormation !== fmt && <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {Object.keys(groupedFormations).length === 0 && (
                <div className="text-center py-10 text-slate-500">
                  No formations found for {teamSizeId}-a-side.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FormationSelector;