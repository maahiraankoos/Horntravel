
import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        <div className="flex items-center">
          <Logo className="h-16 md:h-20" />
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
            <span className="material-symbols-outlined text-primary text-lg md:text-xl">call</span>
            <a className="hover:text-primary transition-colors text-slate-600" href="tel:0410374786">0410 374 786</a>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            <span className="material-symbols-outlined text-primary">mail</span>
            <a className="hover:text-primary transition-colors text-slate-600" href="mailto:info@horntravel.com.au">info@horntravel.com.au</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
