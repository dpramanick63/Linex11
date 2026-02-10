import React from 'react';
import Navbar from '../components/Layout/Navbar';
import TacticalCarousel from '../components/Sections/TacticalCarousel';
import { motion } from 'framer-motion';
import { Layers, Share2, MonitorPlay, Github, Linkedin, Twitter, Instagram, Code2, Cpu, Globe, Mail, Facebook, Youtube, FileDown, Unlock, Layout, ArrowRight } from 'lucide-react';
// Import the JSON file (Adjust path if needed based on where you placed socials.json)
import socials from '../../socials.json'; 

const LandingPage = () => {
  // Mapping icons to keys and specific Brand Colors
  const socialLinks = [
    { Icon: Twitter, url: socials.twitter, color: "hover:text-sky-400" },    // Twitter/X Blue
    { Icon: Instagram, url: socials.instagram, color: "hover:text-pink-500" }, // Instagram Pink
    { Icon: Facebook, url: socials.facebook, color: "hover:text-blue-600" }, // Facebook Blue
    { Icon: Linkedin, url: socials.linkedin, color: "hover:text-blue-400" }, // LinkedIn Blue
    { Icon: Github, url: socials.github, color: "hover:text-white" },        // Github White
    { Icon: Mail, url: socials.mail, color: "hover:text-red-500" }           // Mail Red
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@300;400;500;600;700&display=swap');
        
        /* Smooth scrolling for mobile */
        html {
          scroll-behavior: smooth;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
      
      <div style={{ fontFamily: "'Teko', sans-serif" }} className="overflow-x-hidden">
        
        <Navbar />

        {/* --- TACTICAL ENGINE --- */}
        <div className="pt-20 pb-8 px-3 max-w-7xl mx-auto relative z-10 md:pt-32 md:pb-12 md:px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <TacticalCarousel />
          </motion.div>
        </div>

        {/* --- FEATURES SECTION --- */}
        <section className="py-8 md:py-16 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            
            <div className="bg-slate-900/40 backdrop-blur-md rounded-[2rem] p-6 md:p-12 border border-white/10 shadow-2xl">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-2 uppercase tracking-wide text-white leading-none">
                  Why Linex11?
                </h2>
                <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-light opacity-80">
                  Professional tools without the complexity.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { icon: <Layers className="w-5 h-5 md:w-6 md:h-6 text-pitch" />, title: "34 Pro Formations", desc: "Complete tactical library." },
                  { icon: <MonitorPlay className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />, title: "Live Animation", desc: "Watch players move in real-time." },
                  { icon: <Share2 className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />, title: "One-Click Share", desc: "Share lineups instantly." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileTap={{ scale: 0.98 }} 
                    className="bg-slate-800/40 p-5 md:p-6 rounded-2xl border border-white/5 hover:border-pitch/30 transition-all flex md:flex-col items-center md:items-start gap-4 md:gap-0"
                  >
                    <div className="bg-slate-900/80 w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl flex items-center justify-center md:mb-3 border border-white/10 shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-xl font-bold uppercase tracking-wide text-white">{item.title}</h3>
                      <p className="text-slate-400 text-sm font-light leading-tight">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* --- SQUAD BUILDER SHOWCASE (Restored Text) --- */}
        <section className="py-8 md:py-16 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            {/* Transparent Background */}
            <div className="bg-slate-900/40 backdrop-blur-md rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Decorative Blur */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pitch/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="flex flex-col items-center text-center space-y-10 relative z-10 max-w-5xl mx-auto">
                
                {/* Text Content */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-none mb-4">
                    Build. <span className="text-transparent bg-clip-text bg-gradient-to-r from-pitch to-emerald-600">Plan.</span> Dominate.
                  </h2>
                  <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
                    The Squad Builder is your tactical command center. Designed for modern managers who need precision and speed.
                  </p>
                </div>

                {/* Steps Grid (Restored Detailed Text) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
                  
                  {/* Step 1 */}
                  <div className="flex flex-col items-center md:items-start gap-3 bg-white/5 p-6 rounded-xl border border-white/5 hover:border-pitch/20 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0"><Unlock className="w-5 h-5"/></div>
                    <div className="text-center md:text-left">
                      <h4 className="text-white uppercase font-bold text-lg mb-1">Login & Save</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Create your ID to unlock cloud saves. Never lose a tactic again.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center md:items-start gap-3 bg-white/5 p-6 rounded-xl border border-white/5 hover:border-pitch/20 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0"><Layout className="w-5 h-5"/></div>
                    <div className="text-center md:text-left">
                      <h4 className="text-white uppercase font-bold text-lg mb-1">Drag & Drop Engine</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Seamlessly position players on a responsive, professional pitch.</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center md:items-start gap-3 bg-white/5 p-6 rounded-xl border border-white/5 hover:border-pitch/20 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0"><FileDown className="w-5 h-5"/></div>
                    <div className="text-center md:text-left">
                      <h4 className="text-white uppercase font-bold text-lg mb-1">Export to PDF</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Download match-day ready sheets with your full squad list.</p>
                    </div>
                  </div>

                </div>

                {/* Sleek CTA Button */}
                <div className="pt-2">
                  <motion.a 
                    href="/builder"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center gap-2 bg-transparent hover:bg-pitch text-pitch hover:text-slate-900 border border-pitch/50 font-bold uppercase tracking-widest px-6 py-2.5 rounded-lg text-sm transition-all shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                  >
                    <span>Open Builder</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </motion.a>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* --- ABOUT DEV --- */}
        <section className="py-8 md:py-16 relative">
          <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-12 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-6 md:gap-10">
              
              <div className="flex-shrink-0 relative">
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-pitch to-slate-800 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/dev.jpg" 
                      alt="Deepan" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 bg-pitch text-slate-900 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full border border-slate-900">
                  DEV
                </div>
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-1 uppercase leading-tight">Developed by Deepan</h2>
                <p className="text-pitch font-mono text-[10px] md:text-xs mb-3 md:mb-4 uppercase tracking-[0.2em] font-sans">Full Stack Developer</p>
                <p className="text-slate-200 leading-relaxed mb-6 text-base md:text-xl font-light italic">
                  "I built Linex11 to bridge the gap between complex tactical software and simple user experience."
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 font-sans">
                  {[
                    { icon: <Code2 className="w-3 h-3" />, label: "React" },
                    { icon: <Cpu className="w-3 h-3" />, label: "Framer Motion" },
                    { icon: <Globe className="w-3 h-3" />, label: "Supabase" }
                  ].map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[10px] md:text-xs text-slate-300 flex items-center gap-1.5 whitespace-nowrap">
                      {tech.icon} {tech.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-slate-950/80 backdrop-blur-md py-10 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-black text-white mb-0 md:mb-1 uppercase tracking-tighter">LINEX11</h3>
              <p className="text-slate-500 text-[10px] md:text-sm uppercase tracking-[0.3em]">Dominate The Pitch</p>
            </div>

            <div className="flex gap-6 md:gap-4">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-slate-400 transition-colors duration-300 p-1 ${social.color}`}
                >
                  <social.Icon className="w-6 h-6 md:w-5 md:h-5" />
                </a>
              ))}
            </div>

            <div className="flex flex-col items-center md:items-end gap-1">
              <div className="text-slate-600 text-sm md:text-base font-light uppercase tracking-widest">
                © 2026 Deepan.
              </div>
              
              <a 
                href={socials.credits.backgroundVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-pitch text-xs md:text-sm flex items-center gap-1 transition-colors"
              >
                <Youtube className="w-4 h-4" /> Background by MagicalMessi
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;