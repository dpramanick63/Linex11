import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full min-h-[200px]">
      <div className="relative w-32 h-10">
        {/* The Ball */}
        <motion.div
          className="absolute left-0 top-1/2 w-6 h-6 bg-white rounded-full border-2 border-slate-800 z-10"
          animate={{
            x: [0, 100, 100],
            scale: [1, 0.8, 1],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* The Motion Trail */}
        <motion.div 
          className="absolute left-0 top-1/2 h-6 bg-pitch/50 rounded-full"
          animate={{ width: [0, 100, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ translateY: '-50%' }}
        />
      </div>
      <p className="mt-4 text-pitch font-mono text-sm tracking-widest animate-pulse">LOADING TACTICS...</p>
    </div>
  );
};

export default Loader;