import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle, KeyRound, Key, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';

const Auth = () => {
  const navigate = useNavigate();
  
  // View States: 'login' | 'signup' | 'verify_otp' | 'forgot_password'
  const [view, setView] = useState('login');
  
  // Form Data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  // --- 1. SIGN UP (Step 1: Create User & Send OTP) ---
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null); setMessage(null);

    // --- NEW: Check Username Uniqueness First ---
    // We check the public profiles table to see if this username is already claimed
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    // If a user is found, STOP immediately
    if (existingUser) {
      setError("Username already taken. Please choose another.");
      setLoading(false);
      return; 
    }
    // ---------------------------------------------

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { username }
      }
    });

    if (error) {
        if (error.message.includes("already registered")) {
            setError("This email is already in the squad. Try logging in!");
        } else {
            setError(error.message); // If 500 happens, it shows here
        }
        setLoading(false);
    } else {
        // If successful, Supabase sends an email. We move to the OTP screen.
        setMessage("Verification code sent! Check your email.");
        setView('verify_otp');
        setLoading(false);
    }
  };

  // --- 2. VERIFY OTP (Step 2: Confirm Code) ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);

    const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'signup'
    });

    if (error) {
        setError(error.message);
        setLoading(false);
    } else {
        setMessage("Email verified! Welcome to the squad.");
        setTimeout(() => navigate('/builder'), 1500);
    }
  };

  // --- 3. LOGIN (Password) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
        setError("Invalid credentials. Check your email or password.");
        setLoading(false);
    } else {
        navigate('/builder');
    }
  };

  // --- 4. FORGOT PASSWORD ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null); setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/update-password',
    });

    if (error) {
        setError(error.message); // This will show the 500 error text if SMTP fails
        setLoading(false);
    } else {
        setMessage("Reset link sent! Check your email (and spam).");
        setLoading(false);
    }
  };

  // --- 5. GOOGLE LOGIN ---
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:5173/builder' }
    });
    if (error) setError(error.message);
  };

  // Helper to switch views cleanly
  const switchView = (newView) => {
      setView(newView);
      setError(null);
      setMessage(null);
      setOtp(''); 
      setShowPassword(false); // Reset password visibility on view change
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 flex items-center justify-center p-4 relative overflow-hidden">
        
        {/* Auth Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-md bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden z-10"
        >
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-teko font-bold text-white uppercase italic tracking-wider">
                    {view === 'login' && 'Welcome Back'}
                    {view === 'signup' && 'Join the Squad'}
                    {view === 'verify_otp' && 'Verify Email'}
                    {view === 'forgot_password' && 'Recover Account'}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                    {view === 'login' && 'Sign in to access your tactics'}
                    {view === 'signup' && 'Create your legacy today'}
                    {view === 'verify_otp' && 'Enter the 6-digit code sent to your email'}
                    {view === 'forgot_password' && 'We will send you a link to reset your password'}
                </p>
            </div>

            {/* Error / Message Banners */}
            <AnimatePresence mode='wait'>
                {error && (
                    <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} className="mb-4 bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-3 text-red-200 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{error}</span>
                    </motion.div>
                )}
                {message && (
                    <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} className="mb-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg p-3 flex items-start gap-3 text-emerald-200 text-sm">
                        <CheckCircle className="w-5 h-5 shrink-0" />
                        <span>{message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Forms */}
            <form onSubmit={(e) => {
                if(view === 'login') handleLogin(e);
                else if(view === 'signup') handleSignUp(e);
                else if(view === 'verify_otp') handleVerifyOtp(e);
                else if(view === 'forgot_password') handleForgotPassword(e);
            }} className="flex flex-col gap-4">
                
                {/* USERNAME (Signup Only) */}
                {view === 'signup' && (
                    <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-pitch transition-colors" />
                        <input type="text" placeholder="Manager Name" value={username} onChange={e=>setUsername(e.target.value)} required className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-pitch transition-colors" />
                    </div>
                )}

                {/* EMAIL (All Views Except Verify OTP) */}
                {view !== 'verify_otp' && (
                    <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-pitch transition-colors" />
                        <input type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-pitch transition-colors" />
                    </div>
                )}

                {/* PASSWORD (Login & Signup) - WITH EYE TOGGLE */}
                {(view === 'login' || view === 'signup') && (
                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-pitch transition-colors" />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={password} 
                            onChange={e=>setPassword(e.target.value)} 
                            required 
                            className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-white outline-none focus:border-pitch transition-colors" 
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                )}

                {/* OTP INPUT (Verify Only) */}
                {view === 'verify_otp' && (
                    <div className="relative group">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-pitch transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Enter 6-digit Code" 
                            value={otp} 
                            onChange={e=>setOtp(e.target.value)} 
                            required 
                            className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-pitch transition-colors text-center tracking-[0.5em] font-mono text-xl uppercase" 
                        />
                    </div>
                )}

                {/* Submit Buttons */}
                <button disabled={loading} className="mt-2 w-full py-3 bg-gradient-to-r from-pitch to-emerald-600 rounded-xl text-slate-900 font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                    {loading ? <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" /> : (
                        <>
                            {view === 'login' && 'Sign In'}
                            {view === 'signup' && 'Create Account'}
                            {view === 'verify_otp' && 'Verify Code'}
                            {view === 'forgot_password' && 'Send Reset Link'}
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>

            {/* Social Divider */}
            {(view === 'login' || view === 'signup') && (
                <>
                    <div className="flex items-center gap-4 my-6">
                        <div className="h-px bg-white/10 flex-1" />
                        <span className="text-slate-500 text-xs uppercase tracking-widest">Or Continue With</span>
                        <div className="h-px bg-white/10 flex-1" />
                    </div>

                    <button type="button" onClick={handleGoogleLogin} className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold uppercase tracking-wider hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                        Google
                    </button>
                </>
            )}

            {/* Navigation Links */}
            <div className="mt-6 flex flex-col items-center gap-2 text-sm text-slate-400">
                {view === 'login' ? (
                    <>
                        <button onClick={() => switchView('forgot_password')} className="hover:text-white flex items-center gap-1 transition-colors"><KeyRound className="w-3 h-3 text-pitch" /> Forgot Password?</button>
                        <p className="mt-2">Don't have a team? <button onClick={() => switchView('signup')} className="text-pitch hover:underline font-bold">Sign Up</button></p>
                    </>
                ) : (
                    <button onClick={() => switchView('login')} className="text-pitch hover:underline font-bold">Back to Login</button>
                )}
            </div>

        </motion.div>
      </div>
    </>
  );
};

export default Auth;