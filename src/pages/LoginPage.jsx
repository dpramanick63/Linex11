import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 pt-16">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Manager Login</h2>
          {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-slate-400 mb-1 text-sm">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-pitch focus:outline-none" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 text-sm">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-pitch focus:outline-none" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-pitch text-slate-900 font-bold py-3 rounded-lg hover:bg-pitch-light transition-colors">
              {loading ? 'Processing...' : 'Enter Locker Room'}
            </button>
          </form>
          <p className="mt-6 text-center text-slate-400 text-sm">
            New Manager? <Link to="/register" className="text-pitch hover:underline">Register Here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;