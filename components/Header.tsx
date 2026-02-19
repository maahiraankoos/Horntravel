
import React from 'react';
import Logo from './Logo.tsx';

interface HeaderProps {
  onManageClick?: () => void;
  onHomeClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onManageClick, onHomeClick }) => {
  const handleLogoClick = () => {
    window.location.href = 'https://horntravel.com.au';
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <Logo className="h-16 md:h-20" />
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={onManageClick}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs hover:bg-primary/5 hover:text-primary transition-all border border-slate-100"
          >
            <span className="material-symbols-outlined text-lg">edit_document</span>
            Manage Inquiry
          </button>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
              <span className="material-symbols-outlined text-primary text-lg md:text-xl">call</span>
              <a className="hover:text-primary transition-colors text-slate-600" href="tel:0410374786">0410 374 786</a>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[11px] font-medium text-slate-400 mt-1">
              <span>info@horntravel.com.au</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
