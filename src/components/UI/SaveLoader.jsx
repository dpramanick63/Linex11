import React from 'react';
import { motion } from 'framer-motion';
import { Check, Database } from 'lucide-react';

const SaveLoader = () => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-slate-900 border border-pitch/50 rounded-2xl p-8 flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(34,197,94,0.2)]"
    >
      <div className="relative">
        {/* Spinning Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 rounded-full border-2 border-slate-700 border-t-pitch"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 m-auto w-10 h-10 rounded-full border-2 border-slate-700 border-b-cyan-400"
        />
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
           <Database className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-teko font-bold text-white uppercase tracking-widest">
          Saving Tactics...
        </h3>
        <p className="text-xs text-pitch font-mono mt-1">Syncing to Cloud Database</p>
      </div>
    </motion.div>
  </div>
);

export default SaveLoader;