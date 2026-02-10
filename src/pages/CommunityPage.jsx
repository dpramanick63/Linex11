import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Lock, X, MessageCircle, Share2, LogIn, Sparkles, Bell, Heart, LayoutGrid, Binoculars, Shield, Terminal, ChevronRight, Trash2, Edit3, Send, Copy, User } from 'lucide-react';
import { FORMATIONS } from '../lib/builderFormations';
import { useNavigate } from 'react-router-dom';
import { JerseyIcon } from '../components/UI/SquadSettingsModal';

const JERSEY_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' stroke='%23111' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z'/%3E%3C/svg%3E";

// --- LOGIN REQUIRED MODAL ---
const LoginRequiredModal = ({ onClose, onLogin }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-[#0f172a] border border-white/10 w-full max-w-[280px] rounded-2xl p-5 relative shadow-2xl">
            <button onClick={onClose} className="absolute top-3 right-3 text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
            <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center mb-3 border border-white/5"><Lock className="w-3.5 h-3.5 text-pitch" /></div>
                <h3 className="text-xs font-bold text-white mb-1 uppercase tracking-wider">Manager Access</h3>
                <p className="text-[9px] text-slate-400 mb-4 px-1">Login required to interact.</p>
                <button onClick={onLogin} className="w-full py-2 bg-pitch text-slate-900 font-bold uppercase text-[9px] rounded-lg tracking-widest">Log In / Sign Up</button>
            </div>
        </motion.div>
    </motion.div>
);

// --- MINI PREVIEW ---
const MiniPitchPreview = ({ formation, teamSize = 11 }) => {
  const positions = FORMATIONS[teamSize]?.[formation] || [];
  return (
    <div className="w-full h-full bg-[#020617] relative overflow-hidden group-hover:bg-[#0f172a] transition-colors duration-500">
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
const LineupCard = ({ lineup, onClick, rank, isTop, onLike, userLiked, onShare, onProfileClick }) => (
    <div onClick={onClick} className={`bg-[#0f172a]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col cursor-pointer hover:border-pitch/40 transition-all duration-300 group relative hover:-translate-y-1 ${isTop ? 'shadow-[0_0_20px_rgba(34,197,94,0.05)]' : ''}`}>
        {rank && <div className={`absolute top-0 left-0 text-[9px] font-bold px-2 py-0.5 rounded-br-lg z-10 shadow-lg ${rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-black' : 'bg-slate-800/90 text-white border-r border-b border-white/10'}`}>#{rank}</div>}
        
        <div className="relative overflow-hidden h-28 md:h-40">
            <MiniPitchPreview formation={lineup.formation} teamSize={lineup.team_size} />
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] text-white/90 font-mono border border-white/10">{lineup.formation}</div>
        </div>

        <div className="p-3 flex flex-col gap-2">
            <div>
                <h4 className="font-teko font-bold text-white text-lg leading-none uppercase truncate w-full group-hover:text-pitch transition-colors">{lineup.title}</h4>
                <button onClick={(e) => { e.stopPropagation(); onProfileClick(lineup.user_id); }} className="text-[10px] text-slate-500 font-semibold tracking-wide flex items-center gap-1 mt-0.5 hover:text-white transition-colors">
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span> @{lineup.profiles?.username || 'user'}
                </button>
            </div>
            
            <div className="flex items-center justify-between pt-2 mt-1 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <button onClick={(e) => { e.stopPropagation(); onLike(lineup.id); }} className="flex items-center gap-1 group/btn px-1.5 py-0.5 rounded transition-colors -ml-1.5 hover:bg-white/5">
                        <Heart className={`w-3.5 h-3.5 transition-all duration-300 ${userLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-500 group-hover/btn:text-white'}`} />
                        {/* FIX: Access count correctly from array structure */}
                        <span className={`text-[9px] font-bold ${userLiked ? 'text-rose-500' : 'text-slate-500'}`}>{lineup.likes?.[0]?.count || 0}</span>
                    </button>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-slate-500">
                        <MessageCircle className="w-3.5 h-3.5" />
                    </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); onShare(lineup.share_code); }} className="text-slate-500 hover:text-pitch transition-colors p-1"><Share2 className="w-3 h-3" /></button>
            </div>
        </div>
    </div>
);

const CommunityPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('feed');
  const [loading, setLoading] = useState(true);
  
  const [feedItems, setFeedItems] = useState([]);
  const [topLineups, setTopLineups] = useState([]);
  const [myLineups, setMyLineups] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  
  const [userLogo, setUserLogo] = useState({ color: '#ffffff', style: 'classic' });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); 
  const [lineupCodeSearch, setLineupCodeSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  const [selectedLineup, setSelectedLineup] = useState(null); 
  const [postingLineup, setPostingLineup] = useState(null); 
  const [viewingProfile, setViewingProfile] = useState(null); 
  
  const [postCaption, setPostCaption] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showMobileComments, setShowMobileComments] = useState(false);

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
        fetchNotifications(user.id);
        fetchUserLikes(user.id); 
        
        const savedLogo = localStorage.getItem('jerseyConfig');
        if (savedLogo) setUserLogo(JSON.parse(savedLogo));
    }
  };

  // --- DATA FETCHING ---
  const fetchTopLineups = async () => {
    const { data } = await supabase.from('lineups').select('*, profiles(username, avatar_url)').eq('is_posted', true).order('view_count', { ascending: false }).limit(6); 
    if (data) setTopLineups(data);
  };

  const fetchFeed = async () => {
    // FIX: likes(count) returns array of objects, need to handle that in render
    const { data } = await supabase.from('lineups').select('*, profiles(username, avatar_url), likes(count)').eq('is_posted', true).order('created_at', { ascending: false }).limit(20);
    if (data) setFeedItems(data);
  };

  const fetchMyLineups = async (userId) => {
    const { data } = await supabase.from('lineups').select('*').eq('user_id', userId).order('updated_at', { ascending: false });
    if (data) setMyLineups(data);
  };

  const fetchUserLikes = async (userId) => {
      const { data } = await supabase.from('likes').select('lineup_id').eq('user_id', userId);
      if(data) {
          const likesSet = new Set(data.map(l => l.lineup_id));
          setLikedPosts(likesSet);
      }
  };

  const fetchNotifications = async (userId) => {
      const { data: myPosts } = await supabase.from('lineups').select('id, title').eq('user_id', userId);
      if(myPosts && myPosts.length > 0) {
          const postIds = myPosts.map(p => p.id);
          const { data: recentComments } = await supabase.from('comments').select('*, profiles(username)').in('lineup_id', postIds).order('created_at', { ascending: false }).limit(10);
          if(recentComments) {
              const notifs = recentComments
                  .filter(c => c.user_id !== userId)
                  .map(c => ({
                      id: c.id,
                      user: c.profiles?.username || 'Someone',
                      text: `commented on "${myPosts.find(p=>p.id===c.lineup_id)?.title}"`,
                      time: new Date(c.created_at).toLocaleDateString()
                  }));
              setNotifications(notifs);
          }
      }
  };

  // --- INTERACTIONS ---
  const handleAuthAction = (action) => {
      if (!user) { setShowLoginModal(true); return; }
      action();
  };

  // HANDLE LIKE (Database Sync)
  const handleLike = async (lineupId) => {
      handleAuthAction(async () => {
          const isLiking = !likedPosts.has(lineupId);
          
          setLikedPosts(prev => {
              const newSet = new Set(prev);
              isLiking ? newSet.add(lineupId) : newSet.delete(lineupId);
              return newSet;
          });
          
          // Update Feed UI
          setFeedItems(prev => prev.map(item => {
              if (item.id === lineupId) {
                  const currentCount = item.likes?.[0]?.count || 0;
                  return {...item, likes: [{ count: currentCount + (isLiking ? 1 : -1) }] };
              }
              return item;
          }));
          
          // Update Modal UI if open
          if(selectedLineup && selectedLineup.id === lineupId) {
              setSelectedLineup(prev => {
                  const currentCount = prev.likes?.[0]?.count || 0;
                  return { ...prev, likes: [{ count: currentCount + (isLiking ? 1 : -1) }] };
              });
          }

          if (isLiking) {
              await supabase.from('likes').insert([{ user_id: user.id, lineup_id: lineupId }]);
          } else {
              await supabase.from('likes').delete().eq('user_id', user.id).eq('lineup_id', lineupId);
          }
      });
  };

  const handleOpenProfile = async (targetUserId) => {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', targetUserId).single();
      const { data: posts } = await supabase.from('lineups').select('*, profiles(username), likes(count)').eq('user_id', targetUserId).eq('is_posted', true).order('created_at', { ascending: false });
      if(profile) setViewingProfile({ ...profile, posts: posts || [] });
  };

  const handleShare = (code) => { if(!code) return; navigator.clipboard.writeText(code); alert(`Code ${code} copied!`); };
  const handleSearchLineup = async (e) => { e.preventDefault(); if (!lineupCodeSearch) return; setLoading(true); const { data } = await supabase.from('lineups').select('*, profiles(username, avatar_url)').eq('share_code', lineupCodeSearch.toUpperCase()).maybeSingle(); setSearchResults(data ? [data] : []); setLoading(false); };
  const handleSearchUser = async (e) => { e.preventDefault(); if (!userSearch) return; setLoading(true); const { data: profiles } = await supabase.from('profiles').select('*').ilike('username', `%${userSearch}%`); if (profiles && profiles.length > 0) { const userIds = profiles.map(u => u.id); const { data: userPosts } = await supabase.from('lineups').select('user_id').in('user_id', userIds).eq('is_posted', true); const results = profiles.map(profile => ({ ...profile, type: 'user', post_count: userPosts ? userPosts.filter(p => p.user_id === profile.id).length : 0 })); setSearchResults(results); } else { setSearchResults([]); } setLoading(false); };
  const initiatePost = (lineup) => { if(!lineup.share_code) return alert("Generate code first."); setPostingLineup(lineup); setPostCaption(''); };
  const submitPost = async () => { if(!postingLineup) return; const { error } = await supabase.from('lineups').update({ is_posted: true, caption: postCaption }).eq('id', postingLineup.id); if(!error) { setPostingLineup(null); fetchMyLineups(user.id); fetchFeed(); } };
  const deletePost = async (id) => { if(!confirm("Unpublish?")) return; await supabase.from('lineups').update({ is_posted: false, caption: null }).eq('id', id); fetchMyLineups(user.id); fetchFeed(); };
  const deleteLineup = async (id) => { if(!confirm("Delete?")) return; await supabase.from('lineups').delete().eq('id', id); fetchMyLineups(user.id); };

  const openLineup = async (lineup, isCodeSearch = false) => {
    setSelectedLineup(lineup); 
    setShowMobileComments(false);
    
    // FIX: Simplified query to ensure comments load even if likes table is missing/empty
    const { data } = await supabase.from('comments').select('*, profiles(username)').eq('lineup_id', lineup.id).order('created_at', { ascending: false });
    setComments(data || []);

    const isCreator = user && user.id === lineup.user_id;
    if (lineup.is_posted && !isCodeSearch && !isCreator) {
        supabase.rpc('increment_view_count', { row_id: lineup.id }).catch(err => console.log(err));
    }
  };

  const postComment = async (e) => {
    e.preventDefault(); 
    if (!user) { setShowLoginModal(true); return; }
    if (!newComment.trim()) return;

    // Optimistically insert
    const tempComment = {
        id: Date.now(),
        content: newComment,
        user_id: user.id,
        created_at: new Date().toISOString(),
        profiles: { username: user.user_metadata.username }, 
    };
    setComments([tempComment, ...comments]);
    setNewComment('');

    const { data, error } = await supabase.from('comments').insert([{ lineup_id: selectedLineup.id, user_id: user.id, content: newComment }]).select('*, profiles(username)').single();
    if (error) {
        console.error("Comment failed:", error);
        setComments(prev => prev.filter(c => c.id !== tempComment.id));
    } else {
        setComments(prev => prev.map(c => c.id === tempComment.id ? data : c));
    }
  };

  const TABS = [{ id: 'feed', label: 'Hub', icon: LayoutGrid }, { id: 'search', label: 'Scout', icon: Binoculars }, { id: 'dashboard', label: 'Club', icon: Shield }];

  return (
    <div className="min-h-screen bg-transparent text-white font-sans pb-24 selection:bg-pitch selection:text-black">
      <Navbar />

      <div className="fixed top-16 md:top-20 left-0 w-full z-40 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-full px-1.5 py-1.5 flex items-center gap-1 shadow-2xl transform scale-[0.85] md:scale-100 ring-1 ring-white/5 mx-4 max-w-full overflow-hidden">
            {TABS.map(tab => (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id); setShowNotifications(false); }} className={`relative flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-all duration-300 group ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-white'}`}>
                    {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-pitch to-emerald-400 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                    <span className="relative z-10 flex items-center gap-2"><tab.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${activeTab === tab.id ? 'text-slate-900' : ''}`} /><span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wider ${activeTab === tab.id ? 'text-slate-900' : ''}`}>{tab.label}</span></span>
                </button>
            ))}
            <div className="w-[1px] h-6 bg-white/10 mx-1"></div>
            <button onClick={() => setShowNotifications(!showNotifications)} className={`relative p-2.5 rounded-full transition-all hover:bg-white/10 ${showNotifications ? 'bg-white/10 text-white' : 'text-slate-400'}`}>
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-sm border border-black"></span>}
            </button>
        </div>

        <AnimatePresence>
            {showNotifications && (
                <motion.div initial={{opacity:0, y:10, scale:0.95}} animate={{opacity:1, y:0, scale:1}} exit={{opacity:0, y:10, scale:0.95}} className="absolute top-16 right-4 md:right-auto md:ml-64 w-80 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[60] pointer-events-auto">
                    <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Activity</span><span className="text-[10px] text-pitch font-bold">{notifications.length} New</span></div>
                    <div className="max-h-72 overflow-y-auto custom-scrollbar">
                        {notifications.length > 0 ? notifications.map(n => (
                            <div key={n.id} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors flex gap-3 items-center group cursor-pointer">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-pitch border border-white/5 shadow-inner">{n.user[0]}</div>
                                <div><p className="text-[10px] text-white leading-tight"><span className="font-bold text-pitch">{n.user}</span> {n.text}</p><p className="text-[9px] text-slate-500 mt-1 flex items-center gap-1"><Sparkles className="w-2 h-2" /> {n.time}</p></div>
                            </div>
                        )) : <div className="p-6 text-center text-[10px] text-slate-500 italic">No new signals.</div>}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <div className="pt-32 md:pt-48 px-4 max-w-5xl mx-auto">
        {activeTab === 'feed' && (
            <div className="animate-fade-in space-y-8">
                <div className="flex items-center justify-center gap-2 mb-6 opacity-60"><div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/20"></div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Live Tactics</span><div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/20"></div></div>
                {loading ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3].map(i => <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse"></div>)}</div> : 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">{feedItems.map(item => <LineupCard key={item.id} lineup={item} onClick={() => openLineup(item, false)} onLike={handleLike} userLiked={likedPosts.has(item.id)} onShare={handleShare} onProfileClick={handleOpenProfile} />)}</div>}
            </div>
        )}

        {activeTab === 'search' && (
            <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
                <div className="grid gap-4">
                    <form onSubmit={handleSearchLineup} className="bg-[#0f172a]/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-lg hover:border-white/20 transition-all">
                        <label className="text-[10px] uppercase font-bold text-pitch mb-2 flex items-center gap-2"><Lock className="w-3 h-3"/> Access Terminal</label>
                        <div className="flex gap-2"><input type="text" placeholder="ENTER CODE" className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 font-mono uppercase text-sm text-white" value={lineupCodeSearch} onChange={e => setLineupCodeSearch(e.target.value)} maxLength={6} /><button className="bg-pitch text-slate-900 px-4 rounded-lg font-bold text-xs"><Search className="w-4 h-4" /></button></div>
                    </form>
                    <form onSubmit={handleSearchUser} className="bg-[#0f172a]/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-lg hover:border-white/20 transition-all">
                        <label className="text-[10px] uppercase font-bold text-sky-400 mb-2 flex items-center gap-2"><Binoculars className="w-3 h-3"/> Scout Database</label>
                        <div className="flex gap-2"><input type="text" placeholder="Manager Name..." className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white" value={userSearch} onChange={e => setUserSearch(e.target.value)} /><button className="bg-sky-500 text-white px-4 rounded-lg font-bold text-xs"><Search className="w-4 h-4" /></button></div>
                    </form>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {searchResults.map(item => item.type === 'user' ? (
                        <div key={item.id} onClick={() => handleOpenProfile(item.id)} className="bg-slate-900/80 border border-white/5 rounded-xl p-3 flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3"><div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-inner">{item.username?.[0]}</div><div><h4 className="font-bold text-white text-sm">{item.username}</h4><p className="text-[9px] text-slate-500 uppercase">Manager</p></div></div><span className="text-[9px] text-pitch border border-pitch/20 bg-pitch/5 px-2 py-0.5 rounded-full font-bold">{item.post_count} Posts</span>
                        </div>
                    ) : <LineupCard key={item.id} lineup={item} onClick={() => openLineup(item, !!lineupCodeSearch)} onLike={handleLike} userLiked={likedPosts.has(item.id)} onShare={handleShare} onProfileClick={handleOpenProfile} />)}
                </div>
            </div>
        )}

        {activeTab === 'dashboard' && (
            <div className="animate-fade-in max-w-4xl mx-auto">
                {!user ? (
                    <div className="text-center py-12 bg-[#0f172a]/50 backdrop-blur-md rounded-2xl border border-dashed border-white/10">
                        <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-3"><Lock className="w-6 h-6 text-slate-500" /></div><h3 className="text-sm font-bold text-white mb-2 font-teko uppercase tracking-widest">Restricted Area</h3><button onClick={() => navigate('/auth')} className="bg-white text-black text-[10px] font-bold px-6 py-2 rounded-lg hover:bg-slate-200 shadow-lg">Authenticate</button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-5 mb-6 p-5 bg-[#0f172a]/60 backdrop-blur-xl rounded-2xl border border-white/5 shadow-xl">
                            <div className="w-16 h-16 bg-gradient-to-br from-pitch/10 to-emerald-900/50 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-2 border border-pitch/30">
                                <JerseyIcon styleId={userLogo.style} color={userLogo.color} className="w-10 h-10 drop-shadow-xl" />
                            </div>
                            <div className="flex-1"><h2 className="text-2xl font-bold text-white font-teko uppercase tracking-wide">{user.user_metadata.username}</h2><p className="text-[9px] text-emerald-400 uppercase tracking-[0.2em] font-bold mb-1">Club Director</p><div className="flex gap-2"><span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-slate-300">{myLineups.length} Tactics Created</span></div></div>
                            <button onClick={() => navigate('/builder')} className="bg-pitch text-slate-900 text-[10px] font-bold px-4 py-2 rounded-lg hover:brightness-110 shadow-lg flex items-center gap-1"><Shield className="w-3 h-3"/> New</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {myLineups.map(lineup => (
                                <div key={lineup.id} className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-3 rounded-xl flex flex-col justify-between h-36 relative group hover:border-white/10 transition-all hover:-translate-y-1">
                                    <div><h4 className="font-bold text-sm text-white truncate mb-1">{lineup.title}</h4><span className="text-[8px] bg-black/40 px-2 py-0.5 rounded text-slate-400 border border-white/5">{lineup.formation}</span></div>
                                    <div className="flex gap-2 mt-2"><button onClick={() => navigate('/builder')} className="flex-1 bg-white/5 hover:bg-white/10 py-1.5 rounded text-[9px] font-bold text-slate-300 transition-colors">Edit</button>{lineup.is_posted ? <button onClick={() => deletePost(lineup.id)} className="flex-1 border border-rose-500/20 text-rose-400 py-1.5 rounded text-[9px] hover:bg-rose-500/10 transition-colors">Unpost</button> : <button onClick={() => initiatePost(lineup)} className="flex-1 bg-pitch/90 text-slate-900 py-1.5 rounded text-[9px] font-bold hover:bg-pitch transition-colors">Post</button>}</div><button onClick={() => deleteLineup(lineup.id)} className="absolute top-2 right-2 text-slate-600 hover:text-rose-500 transition-colors bg-black/20 p-1 rounded-full"><Trash2 className="w-3 h-3"/></button>
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
        
        {viewingProfile && (
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:20}} className="fixed inset-0 z-[110] bg-[#020617] overflow-y-auto">
                <div className="max-w-2xl mx-auto min-h-screen bg-[#0f172a] shadow-2xl relative">
                    <div className="h-32 bg-gradient-to-r from-slate-900 to-slate-800 relative">
                        <button onClick={() => setViewingProfile(null)} className="absolute top-4 left-4 bg-black/40 p-2 rounded-full text-white hover:bg-white/20 transition-colors z-20"><ChevronRight className="w-5 h-5 rotate-180" /></button>
                    </div>
                    <div className="px-6 relative -mt-10 mb-6">
                        <div className="w-20 h-20 bg-slate-900 rounded-2xl border-4 border-[#0f172a] flex items-center justify-center text-3xl font-teko font-bold text-white shadow-xl">{viewingProfile.username?.[0]}</div>
                        <div className="mt-3"><h1 className="text-3xl font-teko font-bold text-white uppercase tracking-wide">{viewingProfile.username}</h1><div className="flex gap-4 text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold"><span>{viewingProfile.posts?.length || 0} Tactics</span><span>Manager Level 1</span></div></div>
                    </div>
                    <div className="px-4 pb-20">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Published Tactics</h3>
                        <div className="grid grid-cols-1 gap-4">{viewingProfile.posts?.map(post => (<LineupCard key={post.id} lineup={{...post, profiles: viewingProfile}} onClick={() => openLineup({...post, profiles: viewingProfile}, false)} onLike={handleLike} userLiked={likedPosts.has(post.id)} onShare={handleShare} onProfileClick={() => {}} />))}{viewingProfile.posts?.length === 0 && <div className="text-center py-10 text-slate-600 text-sm italic">No active tactics.</div>}</div>
                    </div>
                </div>
            </motion.div>
        )}

        {postingLineup && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/90 backdrop-blur-lg">
                <div className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-2xl p-5 shadow-2xl relative">
                    <button onClick={() => setPostingLineup(null)} className="absolute top-3 right-3 text-slate-400"><X className="w-4 h-4"/></button>
                    <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Publish Tactic</h2>
                    <textarea value={postCaption} onChange={e => setPostCaption(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-white h-24 mb-4" placeholder="Description..." />
                    <button onClick={submitPost} className="w-full bg-pitch text-slate-900 font-bold py-2 rounded uppercase text-xs">Post</button>
                </div>
            </motion.div>
        )}

        {selectedLineup && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-2 bg-black/90 backdrop-blur-md">
                <div className="bg-[#0f172a] w-full h-full md:w-full md:max-w-4xl md:h-auto md:max-h-[85vh] rounded-none md:rounded-2xl border-none md:border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
                    <button onClick={() => setSelectedLineup(null)} className="absolute top-3 right-3 z-50 bg-black/40 p-1.5 rounded-full text-white"><X className="w-4 h-4"/></button>
                    
                    <div className="h-[35%] md:h-auto md:w-[60%] bg-[#020617] relative flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
                         <div className="relative aspect-[1.6/1] w-full max-w-[95%] bg-slate-900/40 border border-white/5 rounded-lg overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                            <div className="absolute top-1/2 w-full h-[1px] bg-white/10"></div>
                            {FORMATIONS[selectedLineup.team_size]?.[selectedLineup.formation]?.map(pos => {
                                const player = selectedLineup.placed_players?.[pos.id];
                                if(!player) return null;
                                const tPos = selectedLineup.tactical_data?.[player.id];
                                return (
                                    <div key={pos.id} className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2" style={{ left: `${tPos?.x ?? pos.x}%`, top: `${tPos?.y ?? pos.y}%` }}>
                                        <img src={JERSEY_IMG} className="w-6 h-6 md:w-8 md:h-8 drop-shadow-lg" alt="kit" />
                                        <div className="bg-black/70 backdrop-blur-sm text-[6px] md:text-[8px] text-white px-1.5 rounded mt-0.5 border-l border-pitch font-bold uppercase">{player.name}</div>
                                    </div>
                                );
                            })}
                         </div>
                    </div>

                    <div className="flex-1 flex flex-col min-h-0 bg-[#0f172a]">
                        <div className="p-3 border-b border-white/10 bg-[#0f172a]">
                            <div className="flex items-center gap-3">
                                <button onClick={() => { setSelectedLineup(null); handleOpenProfile(selectedLineup.user_id); }} className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-pitch border border-white/5 hover:border-pitch transition-colors">{selectedLineup.profiles?.username?.[0]}</button>
                                <div><h3 className="text-base font-bold text-white uppercase tracking-wider">{selectedLineup.title}</h3></div>
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar relative bg-[#0f172a]">
                            {comments.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2 opacity-50"><p className="text-[9px] font-mono uppercase">Log empty.</p></div> : 
                            comments.map(c => (
                                <div key={c.id} className="mb-3 pl-3 border-l border-slate-800 hover:border-pitch/50 transition-colors">
                                    <div className="flex justify-between items-baseline mb-0.5"><span className="font-bold text-white text-[9px] font-mono text-pitch cursor-pointer hover:underline" onClick={() => { setSelectedLineup(null); handleOpenProfile(c.user_id); }}>{c.profiles?.username}</span></div>
                                    <p className="text-[10px] text-slate-300 leading-relaxed">{c.content}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-2 border-t border-white/10 bg-[#0f172a] safe-area-bottom pb-4 md:pb-2">
                            {user ? <form onSubmit={postComment} className="flex gap-2 bg-slate-900 rounded-lg p-1 border border-white/5"><input type="text" placeholder="Add comment..." className="flex-1 bg-transparent px-3 py-2 text-xs text-white outline-none" value={newComment} onChange={e => setNewComment(e.target.value)} /><button className="bg-pitch text-slate-900 px-4 py-2 rounded-md font-bold text-[10px] uppercase"><Send className="w-3 h-3"/></button></form> : <button onClick={() => navigate('/auth')} className="w-full text-[8px] text-slate-500 font-bold py-2 border border-dashed border-white/10 rounded uppercase">Login Required</button>}
                        </div>
                    </div>
                </div>
            </motion.div>
        )}

        <AnimatePresence>
            {showMobileComments && (
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", bounce: 0, duration: 0.3 }} className="absolute inset-0 z-[120] bg-[#0f172a] flex flex-col md:hidden">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2"><MessageCircle className="w-4 h-4 text-pitch"/> Comments ({comments.length})</h3>
                        <button onClick={() => setShowMobileComments(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        {comments.length === 0 ? <p className="text-center py-10 text-slate-600 text-[10px] italic">No tactical feedback yet.</p> : 
                        comments.map(c => (
                            <div key={c.id} className="group mb-4">
                                <div className="flex justify-between items-baseline mb-1"><span className="font-bold text-pitch text-[10px] font-mono">{c.profiles?.username}</span></div>
                                <p className="text-[11px] text-slate-300 leading-relaxed pl-2 border-l border-white/10 group-hover:border-pitch/30 transition-colors">{c.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-white/10 bg-black/20 safe-area-bottom">
                        {user ? <form onSubmit={postComment} className="flex gap-2 bg-slate-900 rounded-lg p-1 border border-white/5"><input type="text" placeholder="Add comment..." className="flex-1 bg-transparent px-3 py-2 text-xs text-white outline-none" value={newComment} onChange={e => setNewComment(e.target.value)} /><button className="bg-pitch text-slate-900 px-4 py-2 rounded-md font-bold text-[10px] uppercase"><Send className="w-3 h-3"/></button></form> : <button onClick={() => navigate('/auth')} className="w-full py-3 border border-dashed border-white/20 rounded-lg text-slate-500 font-bold text-[10px] uppercase tracking-widest hover:bg-white/5">Authenticate to Participate</button>}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default CommunityPage;
