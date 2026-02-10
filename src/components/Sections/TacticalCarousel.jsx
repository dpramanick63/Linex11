import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Info, AlertTriangle } from 'lucide-react';
import { formationsData } from '../../lib/formationsData';
import MiniPitch from '../UI/MiniPitch';

const TacticalCarousel = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;
    if (!isPaused) interval = setInterval(() => nextSlide(), 8000);
    return () => clearInterval(interval);
  }, [index, isPaused]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % formationsData.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + formationsData.length) % formationsData.length);
  const currentFmt = formationsData[index];

  return (
    <div className="w-full max-w-[320px] md:max-w-5xl mx-auto flex flex-col items-center gap-2">
      
      {/* MAIN CARD CONTAINER */}
      <div className="relative w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[auto] md:min-h-[450px]">
        
        {/* PITCH SECTION (Left Panel) */}
        <div className="w-full flex justify-center bg-transparent md:w-1/2 md:block border-b md:border-b-0 md:border-r border-white/10 pt-3 md:pt-0 relative">
            
           <div className="w-[260px] h-[240px] md:w-full md:h-full relative shadow-2xl md:shadow-none rounded-lg md:rounded-none overflow-hidden mx-auto md:mx-0">
              <MiniPitch formation={currentFmt.title} />
           </div>
        </div>

        {/* DETAILS SECTION (Right Panel) */}
        <div className="w-full md:w-1/2 p-3 md:p-6 flex flex-col justify-center relative bg-transparent">
          
          <div className="flex flex-col items-start gap-1 md:gap-2 mb-2 md:mb-4">
            <span className={`text-xs md:text-sm px-2 py-0.5 rounded border uppercase font-extrabold tracking-wider ${
               currentFmt.category === 'Total Offense' ? 'border-red-500 text-red-400 bg-red-900/20' :
               currentFmt.category === 'Iron Fortresses' ? 'border-blue-500 text-blue-400 bg-blue-900/20' :
               'border-yellow-500 text-yellow-400 bg-yellow-900/20'
            }`}>
              {currentFmt.category}
            </span>
            {/* UPDATED: Title size decreased slightly (4xl/6xl -> 3xl/5xl) */}
            <motion.h2 
              key={currentFmt.title} 
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl font-extrabold text-white leading-tight uppercase italic drop-shadow-lg"
              style={{ fontFamily: "'Teko', sans-serif" }}
            >
              {currentFmt.title}
            </motion.h2>
          </div>
          
          <motion.div 
            key={currentFmt.desc}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-3 md:mb-4 min-h-[40px] md:min-h-[70px]"
          >
            <p className="text-slate-200 text-sm md:text-xl leading-relaxed border-l-4 border-pitch pl-3 font-medium shadow-black drop-shadow-md">
              {currentFmt.desc}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-4">
            <div className="bg-black/20 p-2 md:p-3 rounded-lg border border-white/10 flex flex-col justify-start h-full backdrop-blur-sm">
              {/* UPDATED: Label size decreased (xs/sm -> [10px]/xs) */}
              <p className="text-[10px] md:text-xs text-slate-300 uppercase font-extrabold mb-0.5 md:mb-1 flex items-center gap-1">
                <Info className="w-3 h-3 md:w-4 md:h-4" /> Key Role
              </p>
              {/* UPDATED: Value size decreased (sm/base -> xs/sm) */}
              <p className="text-xs md:text-sm leading-tight text-pitch font-extrabold uppercase tracking-wide">
                {currentFmt.roles}
              </p>
            </div>

            <div className="bg-black/20 p-2 md:p-3 rounded-lg border border-white/10 flex flex-col justify-start h-full backdrop-blur-sm">
              {/* UPDATED: Label size decreased (xs/sm -> [10px]/xs) */}
              <p className="text-[10px] md:text-xs text-slate-300 uppercase font-extrabold mb-0.5 md:mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" /> Risk
              </p>
              {/* UPDATED: Value size decreased (sm/base -> xs/sm) */}
              <p className="text-xs md:text-sm leading-tight text-red-400 font-extrabold uppercase tracking-wide">
                {currentFmt.weakness}
              </p>
            </div>
          </div>

          {!isPaused && (
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pitch to-emerald-600"
              initial={{ width: "0%" }} animate={{ width: "100%" }}
              transition={{ duration: 8, ease: "linear" }}
              key={index}
            />
          )}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center gap-3">
        <button onClick={prevSlide} className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition-all border border-slate-600 shadow-lg active:scale-95 backdrop-blur-md">
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button onClick={() => setIsPaused(!isPaused)} className="p-3 rounded-full bg-pitch/90 hover:bg-pitch text-slate-900 shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all active:scale-95 backdrop-blur-md">
          {isPaused ? <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" /> : <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" />}
        </button>
        <button onClick={nextSlide} className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition-all border border-slate-600 shadow-lg active:scale-95 backdrop-blur-md">
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>

    </div>
  );
};

export default TacticalCarousel;