import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ to = "/" }) => { // Default fallback is Home ("/")
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Check if there is a previous entry in the history to go back to
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      // If no history (e.g., refresh), go to the fallback (Home)
      navigate(to);
    }
  };

  return (
    <button 
      onClick={handleBack}
      className="absolute top-6 left-6 z-50 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-all shadow-lg active:scale-95 group"
      aria-label="Go Back"
    >
      <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
    </button>
  );
};

export default BackButton;