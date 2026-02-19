
import React, { useState } from 'react';
import Logo from './Logo.tsx';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Credentials as requested
    if (username === 'horntravel' && password === 'Horn@2020') {
      onLoginSuccess();
    } else {
      setError('Invalid username or password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Logo className="h-24 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-slate-900">Agency Portal</h2>
          <p className="text-slate-500 text-sm mt-2">Please sign in to access the inquiry database.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold p-4 rounded-xl flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Username</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                <input 
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full btn-gradient py-4 rounded-2xl text-white font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all transform active:scale-[0.98]"
            >
              Sign In to Dashboard
            </button>

            <button 
              type="button"
              onClick={onCancel}
              className="w-full py-4 text-slate-400 text-sm font-bold hover:text-slate-600 transition-colors"
            >
              Return to Website
            </button>
          </form>
        </div>
        
        <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-12">
          Horn Travel Internal Systems • Kensington Office
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
