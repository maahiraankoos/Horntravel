
import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-sm w-full text-center space-y-6 transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-icons-round text-primary text-3xl animate-pulse">flight</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900">Transmitting Inquiry</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Sending your trip details to our Kensington office at <span className="font-bold text-slate-700">info@horntravel.com.au</span>...
          </p>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary h-full animate-loading-bar"></div>
        </div>
      </div>
      
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); width: 30%; }
          50% { transform: translateX(50%); width: 60%; }
          100% { transform: translateX(200%); width: 30%; }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
