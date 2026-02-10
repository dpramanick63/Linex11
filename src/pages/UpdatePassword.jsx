import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import { Lock, Save } from 'lucide-react';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Check if user actually clicked a valid link
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth'); // Kick them out if no session found
      }
    });
  }, [navigate]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
        setError(error.message);
    } else {
        setMessage("Password updated successfully! Redirecting...");
        setTimeout(() => navigate('/builder'), 2000);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 pt-20 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-950/80 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-teko text-white uppercase text-center mb-6">Set New Password</h2>
            
            {message && <div className="p-3 bg-green-500/20 text-green-400 text-sm rounded mb-4 text-center">{message}</div>}
            {error && <div className="p-3 bg-red-500/20 text-red-400 text-sm rounded mb-4 text-center">{error}</div>}

            <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-4">
                <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                        type="password" 
                        placeholder="Enter new password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 text-white outline-none focus:border-pitch"
                        required
                    />
                </div>
                <button disabled={loading} className="w-full py-3 bg-pitch text-slate-900 font-bold uppercase rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> {loading ? 'Updating...' : 'Save Password'}
                </button>
            </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;