import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { 
  Menu, X, LogOut, Star, Settings, 
  Shield, ClipboardList, Users, Home, ChevronRight, User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if(session?.user) fetchProfile(session.user.id);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if(session?.user) fetchProfile(session.user.id);
      else setProfile(null);
    });

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Lock body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const fetchProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if(data) setProfile(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  // Enhanced Links with Icons
  const NAV_LINKS = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> }, 
    { name: 'Squad Builder', path: '/builder', icon: <Shield className="w-5 h-5" /> }, // Fixed Icon
    { name: 'Tactics Info', path: '/tactics', icon: <ClipboardList className="w-5 h-5" /> },
    { name: 'Community', path: '/community', icon: <Users className="w-5 h-5" /> },
  ];

  // --- ANIMATION VARIANTS ---
  const ringRotate = {
    animate: { rotate: 360, transition: { duration: 12, ease: "linear", repeat: Infinity } }
  };

  const ringRotateReverse = {
    animate: { rotate: -360, transition: { duration: 18, ease: "linear", repeat: Infinity } }
  };

  const corePulse = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      filter: ["drop-shadow(0 0 2px rgba(34, 197, 94, 0.3))", "drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))", "drop-shadow(0 0 2px rgba(34, 197, 94, 0.3))"],
      transition: { duration: 4, ease: "easeInOut", repeat: Infinity }
    }
  };

  // Mobile Menu Variants (Staggered Entrance)
  const menuContainerVars = {
    initial: { opacity: 0, x: '100%' },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.33, 1, 0.68, 1], // Cubic bezier for smooth slide
        staggerChildren: 0.1 
      }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const menuItemVars = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
      
      {/* Reused Styles */}
      <style>{`
        @keyframes shine-sweep {
          0% { transform: translateX(-200%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        .shine-container::after {
          content: ""; position: absolute; top: 0; left: 0; width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shine-sweep 3s infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-50">
        
        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-3 group select-none relative z-50">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <motion.div variants={ringRotate} animate="animate" className="absolute w-full h-full rounded-full border border-white/10 border-t-pitch/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]" />
            <motion.div variants={ringRotateReverse} animate="animate" className="absolute w-[70%] h-[70%] rounded-full border border-white/5 border-b-pitch/80" />
            <motion.div variants={corePulse} animate="animate" className="relative z-10">
              <Star className="w-4 h-4 text-pitch fill-pitch" strokeWidth={0} />
            </motion.div>
          </div>
          <div className="flex flex-col justify-center h-10">
            <h1 className="text-3xl font-teko font-bold text-white leading-none tracking-wide flex items-baseline">
              {/* ANIMATED LINEX TEXT */}
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                className="overflow-hidden flex"
              >
                <span className="mr-1">LINEX</span>
              </motion.div>
              
              {/* NUMBER 11 */}
              <span className="relative shine-container bg-gradient-to-tr from-pitch to-emerald-200 bg-clip-text text-transparent drop-shadow-sm">
                11
              </span>
            </h1>
            <div className="flex items-center gap-1.5 overflow-hidden">
               <div className="h-[1px] w-3 bg-pitch/50"></div>
               <span className="text-[0.55rem] font-bold text-slate-500 uppercase tracking-[0.3em] group-hover:text-slate-300 transition-colors">TACTICS</span>
            </div>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.filter(l => l.name !== 'Home').map(link => (
            <Link key={link.path} to={link.path} className={`text-sm font-bold uppercase tracking-widest transition-all relative group font-teko text-lg ${location.pathname === link.path ? 'text-pitch' : 'text-slate-400 hover:text-white'}`}>
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-pitch transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          ))}
        </div>

        {/* DESKTOP PROFILE */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 border border-white/5 rounded-full pl-1 pr-4 py-1 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden relative">
                   {profile?.avatar_url ? <img src={profile.avatar_url} alt="User" className="w-full h-full object-contain" /> : <span className="text-pitch font-bold text-xs">{profile?.username?.[0] || 'U'}</span>}
                </div>
                <span className="text-sm font-bold text-slate-200 font-teko uppercase tracking-wider pt-0.5 group-hover:text-white transition-colors">{profile?.username || 'MANAGER'}</span>
              </div>
              <div className="flex items-center gap-1">
                  <Link to="/settings" className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-full transition-all"><Settings className="w-5 h-5" /></Link>
                  <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all"><LogOut className="w-5 h-5" /></button>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="relative px-6 py-2 bg-pitch text-slate-900 font-bold uppercase text-xs tracking-widest rounded skew-x-[-10deg] hover:bg-emerald-400 transition-colors group">
              <span className="inline-block skew-x-[10deg]">Login</span>
            </Link>
          )}
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden relative z-50 p-2 text-slate-200 hover:text-white transition-colors"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* ============================================== */}
      {/* MODERN MOBILE MENU OVERLAY          */}
      {/* ============================================== */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            variants={menuContainerVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl md:hidden flex flex-col pt-24 px-6 pb-10"
          >
            {/* 1. USER PROFILE SECTION (MOBILE) */}
            <motion.div variants={menuItemVars} className="mb-8">
              {user ? (
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Welcome back</p>
                      <p className="text-white font-teko text-xl tracking-wide">{profile?.username || 'Manager'}</p>
                    </div>
                  </div>
                  <Link to="/settings" onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-900 rounded-full border border-white/5 text-slate-400 hover:text-pitch">
                    <Settings className="w-5 h-5" />
                  </Link>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="w-full flex items-center justify-center gap-2 p-4 bg-pitch rounded-xl text-slate-900 font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                >
                  Sign In / Register
                </Link>
              )}
            </motion.div>

            {/* 2. NAVIGATION LINKS */}
            <div className="flex flex-col gap-3 flex-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div variants={menuItemVars} key={link.path}>
                    <Link 
                      to={link.path} 
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        group flex items-center justify-between p-4 rounded-xl border transition-all duration-300
                        ${isActive 
                          ? 'bg-pitch/10 border-pitch/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                          : 'bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`${isActive ? 'text-pitch' : 'text-slate-400 group-hover:text-white'} transition-colors`}>
                          {link.icon}
                        </span>
                        <span className={`text-lg font-teko uppercase tracking-widest pt-1 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                          {link.name}
                        </span>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-pitch translate-x-0' : 'text-slate-600 -translate-x-2 group-hover:translate-x-0 group-hover:text-slate-400'}`} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* 3. MOBILE FOOTER / LOGOUT */}
            <motion.div variants={menuItemVars} className="mt-auto pt-6 border-t border-white/10">
              {user && (
                 <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors w-full p-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-wider text-sm">Log Out</span>
                </button>
              )}
              <div className="mt-6 flex justify-center">
                 <p className="text-[10px] text-slate-600 uppercase tracking-widest">Linex Football Intelligence v1.0</p>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
