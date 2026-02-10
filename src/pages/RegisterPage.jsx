import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMsg({ type: 'error', text: error.message });
    else setMsg({ type: 'success', text: 'Success! Check your email to verify.' });
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 pt-16">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-slate-700">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Join Linex11</h2>
          {msg && <div className={`p-3 rounded-lg mb-4 text-center ${msg.type === 'error' ? 'text-red-400 bg-red-500/10' : 'text-green-400 bg-green-500/10'}`}>{msg.text}</div>}
          
          <form onSubmit={handleRegister} className="space-y-6">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-pitch focus:outline-none" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-pitch focus:outline-none" />
            <button type="submit" disabled={loading} className="w-full bg-pitch text-slate-900 font-bold py-3 rounded-lg hover:bg-pitch-light transition-colors">
              {loading ? 'Creating Profile...' : 'Create Account'}
            </button>
          </form>
          <p className="mt-6 text-center text-slate-400 text-sm">
            Already have an account? <Link to="/login" className="text-pitch hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;