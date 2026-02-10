import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import BuilderPage from './pages/BuilderPage';
import UpdatePassword from './pages/UpdatePassword';
import SettingsPage from './pages/SettingsPage';
import CommunityPage from './pages/CommunityPage'; // Imported CommunityPage

const AppContent = () => {
  return (
    <div className="relative min-h-screen w-full text-white overflow-x-hidden font-sans">
      
      {/* --- GLOBAL BACKGROUND VIDEO LAYER --- */}
      <div className="fixed inset-0 -z-50">
        
        {/* Unified Video (Visible on all screens) */}
        <video 
          className="absolute inset-0 w-full h-full object-cover" 
          src="/background1.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
        />
        
        {/* Dark Overlay (Glass Effect Base) */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
      </div>

      {/* --- ROUTES --- */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* BUILDER ROUTE */}
        <Route path="/builder" element={<BuilderPage />} />
        
        {/* NEW PASSWORD RESET ROUTE */}
        <Route path="/update-password" element={<UpdatePassword />} />

        {/* SETTINGS ROUTE */}
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* COMMUNITY ROUTE */}
        <Route path="/community" element={<CommunityPage />} />

        {/* Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;