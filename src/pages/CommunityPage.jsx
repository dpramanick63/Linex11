import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Lock, X, Share2, LogIn, Sparkles, Bell, Heart, LayoutGrid, Binoculars, Shield, Trash2, Edit3 } from 'lucide-react';
import { FORMATIONS } from '../lib/builderFormations';
import { useNavigate } from 'react-router-dom';

const JERSEY_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' stroke='%23111' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z'/%3E%3C/svg%3E";

// --- LOGIN REQUIRED MODAL ---
const LoginRequiredModal = ({ onClose, onLogin }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-[#0f172a] border border-white/10 w-full max-w-xs rounded-3xl p-6 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-pitch/20 blur-[50px] rounded-full pointer-events-none"></div>
            <button onClick={onClose} className="absolute top-4 right-4 bg-white/5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"><X className="w-4 h-4" /></button>
            <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-2xl flex items-center justify-center mb-5 shadow-lg transform rotate-3"><Lock className="w-6 h-6 text-pitch" /></div>
                <h3 className="text-xl font-teko font-bold text-white mb-2 uppercase tracking-wide">Manager Access</h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed px-2">Join the locker room to like tactics and build your reputation.</p>
                <button onClick={onLogin} className="w-full py-3.5 bg-gradient-to-r from-pitch to-emerald-400 text-slate-900 font-bold uppercase text-xs rounded-xl hover:brightness-110 tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all active:scale-95">Log In / Sign Up</button>
            </div>
        </motion.div>
    </motion.div>
);

// --- MINI PREVIEW ---
const MiniPitchPreview = ({ formation, teamSize = 11 }) => {
  const positions = FORMATIONS[teamSize]?.[formation] || [];
  return (
    <div className="w-full h-32 md:h-44 bg-[#020617] relative overflow-hidden group-hover:bg-[#0f172a] transition-colors duration-500">
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.1)_75%,rgba(255,255,255,.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.1)_75%,rgba(255,255,255,.1)_76%,transparent_77%,transparent)] bg-[length:20px_20px]"></div>
      <div className="absolute top-1/2 w-full h-[1px] bg-white/5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/5 rounded-full"></div>
      {positions.map((pos, i) => (
        <div key={i} className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)] transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${pos.x}%`, top: `${pos.y}%` }} />
      ))}
    </div>
  );
};

// --- FEED CARD ---
const LineupCard = ({ lineup, onClick, rank, isTop, onLike, userLiked, onShare }) => (
    <div className={`bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-pitch/40 transition-all duration-300 group relative hover:-translate-y-1 hover:shadow-2xl ${isTop ? 'shadow-[0_0_20px_rgba(34,197,94,0.05)]' : ''}`}>
        
        {rank && <div className={`absolute top-0 right-0 text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-lg ${rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black' : 'bg-slate-800/90 text-white border-l border-b border-white/10'}`}>#{rank}</div>}
        
        {/* TOP: Information */}
        <div className="px-4 py-3 bg-[#0f172a]/50 flex justify-between items-start border-b border-white/5" onClick={onClick}>
            <div>
                <h4 className="font-teko font-bold text-white text-xl leading-none uppercase tracking-wide group-hover:text-pitch transition-colors truncate w-48 drop-shadow-sm">{lineup.title}</h4>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wide flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> @{lineup.profiles?.username || 'user'}
                </span>
            </div>
            <div className="bg-white/5 px-2 py-1 rounded text-[10px] text-white/90 font-mono border border-white/10 shadow-sm">
                {lineup.formation}
            </div>
        </div>

        {/* MIDDLE: Visual */}
        <div className="relative overflow-hidden cursor-pointer" onClick={onClick}>
            <MiniPitchPreview formation={lineup.formation} teamSize={lineup.team_size} />
        </div>

        {/* BOTTOM: Actions */}
        <div className="px-3 py-2 flex items-center justify-between bg-[#0f172a]/80 border-t border-white/5">
            <button onClick={(e) => { e.stopPropagation(); onLike(lineup.id); }} className="flex items-center gap-1.5 group/btn hover:bg-white/5 px-3 py-1.5 rounded-full transition-colors">
                <Heart className={`w-4 h-4 transition-all duration-300 ${userLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400 group-hover/btn:text-white'}`} />
                <span className={`text-[10px] font-bold ${userLiked ? 'text-rose-500' : 'text-slate-500'}`}>{lineup.likes?.count || 0}</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); onShare(lineup.share_code); }} className="text-slate-400 hover:text-pitch transition-colors p-2 hover:bg-pitch/10 rounded-full"><Share2 className="w-4 h-4" /></button>
        </div>
    </div>
);

const CommunityPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('feed');
  const [loading, setLoading] = useState(true);
  
  // Data
  const [feedItems, setFeedItems] = useState([]);
  const [topLineups, setTopLineups] = useState([]);
  const [myLineups, setMyLineups] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  
  // UI States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); 
  const [lineupCodeSearch, setLineupCodeSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  // Modals & Active Items
  const [selectedLineup, setSelectedLineup] = useState(null); 
  const [postingLineup, setPostingLineup] = useState(null); 
  const [postCaption, setPostCaption] = useState('');

  useEffect(() => {
    const init = async () => {
        setLoading(true);
        await checkUser();
        await fetchTopLineups();
        await fetchFeed();
        setLoading(false);
    };
    init();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
        fetchMyLineups(user.id);
    }
  };

  const fetchTopLineups = async () => {
    const { data } = await supabase.from('lineups').select('*, profiles(username, avatar_url), likes(count)').eq('is_posted', true).order('view_count', { ascending: false }).limit(6); 
    if (data) setTopLineups(data);
  };

  const fetchFeed = async () => {
    const { data } = await supabase.from('lineups').select('*, profiles(username, avatar_url), likes(count)').eq('is_posted', true).order('created_at', { ascending: false }).limit(20);
    if (data) setFeedItems(data);
  };

  const fetchMyLineups = async (userId) => {
    const { data } = await supabase.from('lineups').select('*').eq('user_id', userId).order('updated_at', { ascending: false });
    if (data) setMyLineups(data);
  };

  // --- INTERACTION HANDLERS ---
  const handleAuthAction = (action) => {
      if (!user) {
          setShowLoginModal(true);
          return;
      }
      action();
  };

  const handleLike = async (lineupId) => {
      handleAuthAction(() => {
          setLikedPosts(prev => {
              const newSet = new Set(prev);
              const isLiking = !newSet.has(lineupId);
              isLiking ? newSet.add(lineupId) : newSet.delete(lineupId);
              // Optimistic update
              setFeedItems(prevFeed => prevFeed.map(item => item.id === lineupId ? {...item, likes: { count: (item.likes?.count || 0) + (isLiking ? 1 : -1) }} : item));
              
              // Also update selected lineup if it's open
              if (selectedLineup && selectedLineup.id === lineupId) {
                 setSelectedLineup(prev => ({...prev, likes: { count: (prev.likes?.count || 0) + (isLiking ? 1 : -1) }}));
              }
              
              return newSet;
          });
      });
  };

  const handleShare = (code) => { if(!code) return; navigator.clipboard.writeText(code); alert("Code copied!"); };

  const handleSearchLineup = async (e) => {
    e.preventDefault(); if (!lineupCodeSearch) return; setLoading(true);
    const { data } = await supabase.from('lineups').select('*, profiles(username, avatar_url)').eq('share_code', lineupCodeSearch.toUpperCase()).maybeSingle();
    setSearchResults(data ? [data] : []); setLoading(false);
  };

  const handleSearchUser = async (e) => {
    e.preventDefault(); if (!userSearch) return; setLoading(true);
    const { data: profiles } = await supabase.from('profiles').select('*').ilike('username', `%${userSearch}%`);
    if (profiles && profiles.length > 0) {
        const userIds = profiles.map(u => u.id);
        const { data: userPosts } = await supabase.from('lineups').select('user_id').in('user_id', userIds).eq('is_posted', true);
        const results = profiles.map(profile => ({ ...profile, type: 'user', post_count: userPosts ? userPosts.filter(p => p.user_id === profile.id).length : 0 }));
        setSearchResults(results);
    } else { setSearchResults([]); }
    setLoading(false);
  };

  const initiatePost = (lineup) => { if(!lineup.share_code) return alert("Generate code first."); setPostingLineup(lineup); setPostCaption(''); };
  const submitPost = async () => { if(!postingLineup) return; const { error } = await supabase.from('lineups').update({ is_posted: true, caption: postCaption }).eq('id', postingLineup.id); if(!error) { setPostingLineup(null); fetchMyLineups(user.id); fetchFeed(); fetchTopLineups(); } };
  const deletePost = async (id) => { if(!confirm("Unpublish?")) return; await supabase.from('lineups').update({ is_posted: false, caption: null }).eq('id', id); fetchMyLineups(user.id); fetchFeed(); fetchTopLineups(); };
  const deleteLineup = async (id) => { if(!confirm("Delete?")) return; await supabase.from('lineups').delete().eq('id', id); fetchMyLineups(user.id); };

  const openLineup = async (lineup, isCodeSearch = false) => {
    const isCreator = user && user.id === lineup.user_id;
    if (lineup.is_posted && !isCodeSearch && !isCreator) {
        await supabase.rpc('increment_view_count', { row_id: lineup.id });
        lineup.view_count = (lineup.view_count || 0) + 1;
        fetchTopLineups(); 
    }
    // No comments fetch needed
    setSelectedLineup(lineup);
  };

  // --- TAB CONFIG ---
  const TABS = [
      { id: 'feed', label: 'Hub', icon: LayoutGrid },
      { id: 'search', label: 'Scout', icon: Binoculars },
      { id: 'dashboard', label: 'Club', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white font-sans pb-24 selection:bg-pitch selection:text-black">
      <Navbar />

      {/* --- NAV TABS (Normal Flow + Centered + Below Navbar) --- */}
      {/* Added pt-24 to push it down below the fixed Navbar and removed 'fixed' */}
      <div className="pt-24 pb-4 w-full z-30 flex justify-center relative pointer-events-none">
        <div className="pointer-events-auto bg-[#0f172a]/70 backdrop-blur-xl border border-white/10 rounded-full px-1.5 py-1.5 flex items-center gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transform scale-90 md:scale-100 ring-1 ring-white/5 mx-4 max-w-full overflow-hidden">
            {TABS.map(tab => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                    <button key={tab.id} onClick={() => { setActiveTab(tab.id); setShowNotifications(false); }} className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 group ${isActive ? 'text-slate-900' : 'text-slate-400 hover:text-white'}`}>
                        {isActive && <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-pitch to-emerald-400 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                        <span className="relative z-10 flex items-center gap-2"><Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'group-hover:scale-110 transition-transform'}`} /><span className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? 'text-slate-900' : ''}`}>{tab.label}</span></span>
                    </button>
                );
            })}
            <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
            <button onClick={() => setShowNotifications(!showNotifications)} className={`relative p-2.5 rounded-full transition-all hover:bg-white/10 ${showNotifications ? 'bg-white/10 text-white' : 'text-slate-400'}`}>
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.6)] border border-black"></span>}
            </button>
        </div>

        <AnimatePresence>
            {showNotifications && (
                <motion.div initial={{opacity:0, y:10, scale:0.95}} animate={{opacity:1, y:0, scale:1}} exit={{opacity:0, y:10, scale:0.95}} className="absolute top-full mt-2 right-4 md:right-auto md:ml-64 w-80 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden z-[60] pointer-events-auto">
                    <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Activity</span><span className="text-[10px] text-pitch font-bold">{notifications.length} New</span></div>
                    <div className="max-h-72 overflow-y-auto custom-scrollbar">
                        {notifications.length > 0 ? notifications.map(n => (
                            <div key={n.id} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors flex gap-3 items-center group cursor-pointer">
                                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-[11px] font-bold text-pitch border border-white/5 group-hover:border-pitch/50 transition-colors shadow-inner">{n.user[0]}</div>
                                <div><p className="text-[11px] text-white leading-tight"><span className="font-bold text-pitch">{n.user}</span> {n.text}</p><p className="text-[9px] text-slate-500 mt-1 flex items-center gap-1"><Sparkles className="w-2 h-2" /> {n.time}</p></div>
                            </div>
                        )) : <div className="p-8 text-center text-[11px] text-slate-500 italic">It's quiet... too quiet.</div>}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* --- MAIN CONTENT (Padding removed since tabs are in flow) --- */}
      <div className="px-4 max-w-5xl mx-auto mt-4">
        {activeTab === 'feed' && (
            <div className="animate-fade-in space-y-8">
                <div className="flex items-center justify-center gap-2 mb-6 opacity-80"><div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/20"></div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Community Feed</span><div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/20"></div></div>
                {loading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse ring-1 ring-white/5"></div>)}</div> : 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">{feedItems.map(item => <LineupCard key={item.id} lineup={item} onClick={() => openLineup(item, false)} onLike={handleLike} userLiked={likedPosts.has(item.id)} onShare={handleShare} />)}</div>}
            </div>
        )}

        {activeTab === 'search' && (
            <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
                <div className="grid gap-4">
                    <form onSubmit={handleSearchLineup} className="bg-[#0f172a]/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl group hover:border-white/20 transition-all">
                        <label className="text-[10px] uppercase font-bold text-pitch mb-3 flex items-center gap-2"><Lock className="w-3 h-3"/> Secret Access</label>
                        <div className="flex gap-2"><input type="text" placeholder="ENTER CODE" className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 font-mono uppercase text-sm focus:border-pitch focus:bg-black/60 outline-none transition-all placeholder:text-slate-600 text-white tracking-widest" value={lineupCodeSearch} onChange={e => setLineupCodeSearch(e.target.value)} maxLength={6} /><button className="bg-pitch text-slate-900 px-5 rounded-xl hover:brightness-110 font-bold transition-transform active:scale-95"><Search className="w-5 h-5" /></button></div>
                    </form>
                    <form onSubmit={handleSearchUser} className="bg-[#0f172a]/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl group hover:border-white/20 transition-all">
                        <label className="text-[10px] uppercase font-bold text-sky-400 mb-3 flex items-center gap-2"><Binoculars className="w-3 h-3"/> Head Scout</label>
                        <div className="flex gap-2"><input type="text" placeholder="Manager Name..." className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-sky-400 focus:bg-black/60 outline-none transition-all placeholder:text-slate-600 text-white" value={userSearch} onChange={e => setUserSearch(e.target.value)} /><button className="bg-sky-500 text-white px-5 rounded-xl hover:brightness-110 font-bold transition-transform active:scale-95"><Search className="w-5 h-5" /></button></div>
                    </form>
                </div>
                <div>
                    {searchResults.length > 0 && <h3 className="text-[11px] text-slate-400 uppercase font-bold mb-4 tracking-widest text-center">Found {searchResults.length} Results</h3>}
                    <div className="grid grid-cols-1 gap-3">
                        {searchResults.map(item => item.type === 'user' ? (
                            <div key={item.id} className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-slate-800 transition-colors">
                                <div className="flex items-center gap-4"><div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-inner">{item.username?.[0]}</div><div><h4 className="font-bold text-white text-base">{item.username}</h4><p className="text-[10px] text-slate-500 uppercase tracking-wider">Manager</p></div></div><span className="text-[10px] text-pitch border border-pitch/20 bg-pitch/5 px-3 py-1 rounded-full font-bold">{item.post_count} Posts</span>
                            </div>
                        ) : <LineupCard key={item.id} lineup={item} onClick={() => openLineup(item, !!lineupCodeSearch)} onLike={handleLike} userLiked={likedPosts.has(item.id)} onShare={handleShare} />)}
                    </div>
                    {searchResults.length === 0 && !loading && <div className="text-center text-slate-500 text-xs italic py-8">Scout reports will appear here.</div>}
                </div>
            </div>
        )}

        {activeTab === 'dashboard' && (
            <div className="animate-fade-in max-w-4xl mx-auto">
                {!user ? (
                    <div className="text-center py-16 bg-[#0f172a]/50 backdrop-blur-md rounded-3xl border border-dashed border-white/10">
                        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4"><Lock className="w-8 h-8 text-slate-500" /></div><h3 className="text-lg font-bold text-white mb-2 font-teko uppercase tracking-widest">Restricted Area</h3><p className="text-slate-400 text-xs mb-6">Manager credentials required for entry.</p><button onClick={() => navigate('/auth')} className="bg-white text-black text-xs font-bold px-8 py-3 rounded-xl hover:bg-slate-200 transition-colors shadow-lg">Authenticate</button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-6 mb-8 p-6 bg-[#0f172a]/60 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl">
                            <div className="w-20 h-20 bg-gradient-to-br from-pitch to-emerald-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_30px_rgba(34,197,94,0.2)] transform -rotate-3 border-2 border-white/10">{user.user_metadata.username?.[0]}</div>
                            <div className="flex-1"><h2 className="text-2xl font-bold text-white font-teko uppercase tracking-wide">{user.user_metadata.username}</h2><p className="text-[10px] text-emerald-400 uppercase tracking-[0.2em] font-bold mb-2">Club Director</p><div className="flex gap-2"><span className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-300">{myLineups.length} Tactics</span><span className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-300">Level 1</span></div></div>
                            <button onClick={() => navigate('/builder')} className="bg-pitch text-slate-900 text-xs font-bold px-5 py-3 rounded-xl hover:brightness-110 shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-transform active:scale-95 flex items-center gap-2"><Edit3 className="w-4 h-4"/> New Tactic</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {myLineups.map(lineup => (
                                <div key={lineup.id} className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex flex-col justify-between h-40 relative group hover:border-white/10 transition-all hover:-translate-y-1">
                                    <div><h4 className="font-bold text-base text-white truncate mb-1">{lineup.title}</h4><span className="text-[9px] bg-black/40 px-2 py-0.5 rounded text-slate-400 border border-white/5">{lineup.formation}</span></div>
                                    <div className="flex gap-2 mt-2"><button onClick={() => navigate('/builder')} className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-lg text-[10px] font-bold text-slate-300 transition-colors">Edit</button>{lineup.is_posted ? <button onClick={() => deletePost(lineup.id)} className="flex-1 border border-rose-500/20 text-rose-400 py-2 rounded-lg text-[10px] hover:bg-rose-500/10 transition-colors">Unpost</button> : <button onClick={() => initiatePost(lineup)} className="flex-1 bg-pitch/90 text-slate-900 py-2 rounded-lg text-[10px] font-bold hover:bg-pitch transition-colors">Post</button>}</div><button onClick={() => deleteLineup(lineup.id)} className="absolute top-3 right-3 text-slate-600 hover:text-rose-500 transition-colors bg-black/20 p-1.5 rounded-full"><Trash2 className="w-3.5 h-3.5"/></button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        )}
      </div>

      <AnimatePresence>
        {showLoginModal && <LoginRequiredModal onClose={() => setShowLoginModal(false)} onLogin={() => navigate('/auth')} />}

        {postingLineup && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-lg">
                <div className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-3xl p-6 shadow-2xl relative">
                    <div className="flex justify-between items-center mb-6"><h2 className="text-sm font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2"><Share2 className="w-4 h-4 text-pitch"/> Share Tactic</h2><button onClick={() => setPostingLineup(null)} className="bg-white/5 p-2 rounded-full hover:bg-white/10"><X className="w-4 h-4 text-slate-400"/></button></div>
                    <div className="bg-black/40 rounded-xl p-3 mb-4 flex gap-3 items-center border border-white/5"><div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center"><Shield className="w-5 h-5 text-slate-500"/></div><div><p className="text-xs font-bold text-white">{postingLineup.title}</p><p className="text-[9px] text-slate-500">{postingLineup.formation}</p></div></div>
                    <textarea value={postCaption} onChange={e => setPostCaption(e.target.value)} placeholder="Add your tactical analysis..." className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs text-white focus:border-pitch outline-none resize-none h-32 mb-6 placeholder:text-slate-600 leading-relaxed" />
                    <button onClick={submitPost} className="w-full py-3.5 bg-pitch text-slate-900 font-bold uppercase text-xs rounded-xl hover:brightness-110 shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-transform active:scale-95">Publish to Hub</button>
                </div>
            </motion.div>
        )}

        {/* --- CENTRALIZED VIEWER MODAL (NO COMMENTS) --- */}
        {selectedLineup && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
                
                {/* Main Card Container - Centered */}
                <div className="w-full max-w-4xl bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative flex flex-col">
                    
                    {/* Visualizer Area */}
                    <div className="w-full bg-slate-950/50 relative flex items-center justify-center p-6 md:p-10">
                        <div className="relative aspect-[1.6/1] w-full max-w-2xl bg-slate-900/80 border border-white/5 shadow-2xl overflow-hidden rounded-xl">
                            {/* Pitch Graphics */}
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.3)_25%,rgba(255,255,255,.3)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.3)_75%,rgba(255,255,255,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.3)_25%,rgba(255,255,255,.3)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.3)_75%,rgba(255,255,255,.3)_76%,transparent_77%,transparent)] bg-[length:40px_40px]"></div>
                            <div className="absolute top-0 left-[20%] right-[20%] h-[15%] border-b border-x border-white/20"></div>
                            <div className="absolute bottom-0 left-[20%] right-[20%] h-[15%] border-t border-x border-white/20"></div>
                            <div className="absolute top-1/2 w-full h-[1px] bg-white/20"></div>

                            {/* Players */}
                            {FORMATIONS[selectedLineup.team_size]?.[selectedLineup.formation]?.map(pos => {
                                const player = selectedLineup.placed_players[pos.id];
                                if(!player) return null;
                                const tPos = selectedLineup.tactical_data?.[player.id];
                                return (
                                    <div key={pos.id} className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2" style={{ left: `${tPos?.x ?? pos.x}%`, top: `${tPos?.y ?? pos.y}%` }}>
                                        <div className="relative transform scale-[0.7] md:scale-125 origin-center transition-transform hover:scale-[0.9] md:hover:scale-150 cursor-pointer">
                                            <img src={JERSEY_IMG} className="w-6 h-6 md:w-8 md:h-8 drop-shadow-lg" alt="kit" />
                                            <div className="absolute -top-1 -right-1 bg-white text-black text-[8px] font-bold px-0.5 rounded shadow-sm">{player.number}</div>
                                        </div>
                                        <div className="bg-black/60 backdrop-blur-sm text-[6px] md:text-[9px] text-white px-1.5 rounded border border-white/10 font-bold truncate max-w-[50px] md:max-w-[70px] text-center mt-1">{player.name}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="bg-[#0f172a] border-t border-white/10 p-4 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs font-bold text-white border border-white/10 shadow-inner">{selectedLineup.profiles?.username?.[0]}</div>
                             <div>
                                 <h3 className="text-sm font-bold text-white uppercase tracking-wide">{selectedLineup.title}</h3>
                                 <p className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
                                     {selectedLineup.formation}
                                     <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                     By {selectedLineup.profiles?.username}
                                 </p>
                             </div>
                         </div>

                         <div className="flex items-center gap-3">
                             {selectedLineup.caption && <div className="hidden md:block text-[10px] text-slate-400 mr-4 max-w-xs truncate border-l border-white/10 pl-4">{selectedLineup.caption}</div>}
                             <button onClick={() => handleLike(selectedLineup.id)} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-colors group">
                                <Heart className={`w-4 h-4 transition-all ${likedPosts.has(selectedLineup.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400 group-hover:text-white'}`} />
                                <span className={`text-xs font-bold ${likedPosts.has(selectedLineup.id) ? 'text-rose-500' : 'text-slate-400 group-hover:text-white'}`}>{selectedLineup.likes?.count || 0}</span>
                             </button>
                         </div>
                    </div>

                    {/* Close Button - Moved to end of container for proper z-indexing */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedLineup(null); }} 
                        className="absolute top-4 right-4 z-[90] bg-black/60 hover:bg-white/20 p-2 rounded-full text-white transition-all border border-white/10 shadow-lg"
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommunityPage;