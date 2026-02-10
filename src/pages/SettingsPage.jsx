import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Layout/Navbar';
import { motion } from 'framer-motion';
import { Save, User, FileText, Shield, Heart, Trophy, AlertCircle, CheckCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import { FOOTBALL_TEAMS } from '../lib/footballTeams';

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  
  // Form State
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [favTeams, setFavTeams] = useState('');
  const [favPlayers, setFavPlayers] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  // Selection State
  const [selectedLeague, setSelectedLeague] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error('No user logged in');
      setUser(user);

      const { data, error } = await supabase
        .from('profiles')
        .select('username, bio, favorite_teams, favorite_players, avatar_url')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setUsername(data.username || '');
        setBio(data.bio || '');
        setFavTeams(data.favorite_teams || '');
        setFavPlayers(data.favorite_players || '');
        setAvatarUrl(data.avatar_url || '');
        
        if (data.avatar_url) {
            findLeagueFromLogo(data.avatar_url);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const findLeagueFromLogo = (url) => {
    for (const [league, teams] of Object.entries(FOOTBALL_TEAMS)) {
        if (teams.some(t => t.logo === url)) {
            setSelectedLeague(league);
            return;
        }
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .neq('id', user.id)
        .single();

      if (existingUser) throw new Error('Username taken.');

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username,
          bio,
          favorite_teams: favTeams,
          favorite_players: favPlayers,
          avatar_url: avatarUrl,
          updated_at: new Date(),
        });

      if (error) throw error;
      
      await supabase.auth.updateUser({ data: { username: username } });

      setMessage('Saved!');
      window.scrollTo(0,0);
    } catch (error) {
      setError(error.message);
      window.scrollTo(0,0);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white"><Loader2 className="w-8 h-8 animate-spin text-pitch" /></div>;

  return (
    <>
      <Navbar />
      {/* Reduced top padding for mobile */}
      <div className="min-h-screen bg-slate-950 pt-16 md:pt-24 px-3 md:px-4 pb-20 font-sans text-white">
        <div className="max-w-2xl mx-auto">
          
          {/* Header - Compact */}
          <div className="flex items-center gap-2 mb-4 md:mb-8 pl-1">
            <Shield className="w-5 h-5 md:w-8 md:h-8 text-pitch" />
            <h1 className="text-2xl md:text-4xl font-teko font-bold uppercase italic tracking-wider">Settings</h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-slate-900/50 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 backdrop-blur-md shadow-2xl"
          >
             {/* Messages - Compact */}
             {error && <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-200 p-2.5 rounded-lg flex items-start gap-2 text-xs md:text-sm"><AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> <span>{error}</span></div>}
             {message && <div className="mb-4 bg-emerald-500/10 border border-emerald-500/50 text-emerald-200 p-2.5 rounded-lg flex items-start gap-2 text-xs md:text-sm"><CheckCircle className="w-4 h-4 shrink-0 mt-0.5" /> <span>{message}</span></div>}

            <form onSubmit={updateProfile} className="flex flex-col gap-3.5 md:gap-6">
              
              {/* --- AVATAR (Super Compact) --- */}
              <div className="bg-black/20 p-3 md:p-4 rounded-lg border border-white/5 space-y-2">
                <label className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-pitch" /> Club Crest
                </label>
                
                <div className="flex gap-3 items-center">
                    {/* Smaller Preview Circle */}
                    <div className="shrink-0 w-16 h-16 md:w-24 md:h-24 bg-slate-800 rounded-full border border-pitch flex items-center justify-center overflow-hidden shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Avatar" className="w-10 h-10 md:w-16 md:h-16 object-contain" />
                        ) : (
                            <User className="w-6 h-6 md:w-10 md:h-10 text-slate-500" />
                        )}
                    </div>

                    {/* Tighter Dropdowns */}
                    <div className="flex-1 w-full space-y-2">
                        <select 
                            className="w-full bg-slate-900 border border-white/20 rounded-md p-2 text-sm outline-none focus:border-pitch appearance-none h-9 md:h-auto"
                            value={selectedLeague}
                            onChange={(e) => setSelectedLeague(e.target.value)}
                        >
                            <option value="">Select League</option>
                            {Object.keys(FOOTBALL_TEAMS).map(league => (
                                <option key={league} value={league}>{league}</option>
                            ))}
                        </select>

                        <select 
                            className="w-full bg-slate-900 border border-white/20 rounded-md p-2 text-sm outline-none focus:border-pitch appearance-none h-9 md:h-auto disabled:opacity-50"
                            disabled={!selectedLeague}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            value={avatarUrl}
                        >
                            <option value="">Select Team</option>
                            {selectedLeague && FOOTBALL_TEAMS[selectedLeague].map(team => (
                                <option key={team.name} value={team.logo}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
              </div>

              {/* Username - Compact Input */}
              <div className="space-y-1">
                <label className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-pitch" /> Username
                </label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))} 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-base md:text-sm focus:border-pitch outline-none transition-all font-mono" 
                    placeholder="Username" 
                    required 
                />
              </div>

              {/* Bio - Shorter Height */}
              <div className="space-y-1">
                <label className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-pitch" /> Bio
                </label>
                <textarea 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-base md:text-sm focus:border-pitch outline-none transition-all min-h-[80px] resize-none" 
                    placeholder="Tactics..." 
                    maxLength={300} 
                />
              </div>

              {/* Favorites - Tighter Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-yellow-500" /> Fav Teams
                  </label>
                  <input 
                    type="text" 
                    value={favTeams} 
                    onChange={(e) => setFavTeams(e.target.value)} 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-base md:text-sm focus:border-yellow-500 outline-none" 
                    placeholder="e.g. Barça" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-red-500" /> Fav Players
                  </label>
                  <input 
                    type="text" 
                    value={favPlayers} 
                    onChange={(e) => setFavPlayers(e.target.value)} 
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-base md:text-sm focus:border-red-500 outline-none" 
                    placeholder="e.g. Messi" 
                  />
                </div>
              </div>

              {/* Save Button - Sticky on Mobile feel */}
              <button 
                type="submit" 
                disabled={saving} 
                className="mt-2 w-full bg-gradient-to-r from-pitch to-emerald-600 hover:brightness-110 text-slate-900 font-bold uppercase py-3 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm md:text-base"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4 md:w-5 md:h-5" /> Save Changes</>}
              </button>

            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;