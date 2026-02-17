import React from 'react';

const LoadingOverlay: React.FC = () => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 text-center">
      <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-slate-700 font-semibold">Processing your inquiry...</p>
    </div>
  </div>
);

export default LoadingOverlay;