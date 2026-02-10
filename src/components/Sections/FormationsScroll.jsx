import { formationsData } from '../../lib/formationsData';
import MiniPitch from '../UI/MiniPitch';

const FormationsScroll = () => {
  // We duplicate the array 3 times to ensure the loop is smooth
  const infiniteList = [...formationsData, ...formationsData];

  return (
    <div className="w-full py-20 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
          THE TACTICAL LIBRARY
        </h3>
        <p className="text-pitch-light text-sm tracking-widest mt-2 uppercase">34 Master Formations</p>
      </div>
      
      {/* Glass Container for the Track 
         mask-image creates the fade on left and right
      */}
      <div className="relative w-full flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex animate-scroll hover:pause gap-6 pl-6">
          {infiniteList.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="relative flex-none w-[320px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-pitch/50 transition-all duration-500 group"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase border ${
                  item.category === 'Total Offense' ? 'border-red-500/50 text-red-400' :
                  item.category === 'Iron Fortresses' ? 'border-blue-500/50 text-blue-400' :
                  'border-yellow-500/50 text-yellow-400'
                }`}>
                  {item.category}
                </span>
                <span className="text-2xl font-black text-white group-hover:text-pitch transition-colors">{item.title}</span>
              </div>

              {/* The Visual Pitch */}
              <div className="mb-4">
                <MiniPitch formation={item.title} />
              </div>

              {/* Details */}
              <div className="space-y-3">
                <p className="text-slate-300 text-sm leading-relaxed border-b border-white/5 pb-2">
                  {item.desc}
                </p>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Key Role</p>
                  <p className="text-xs text-white">{item.roles}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Weakness</p>
                  <p className="text-xs text-red-300">{item.weakness}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormationsScroll;