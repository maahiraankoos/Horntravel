
import React from 'react';

const Header: React.FC = () => {
  const sendTestEmail = () => {
    const subject = encodeURIComponent("Test Inquiry from Horn Travel Portal");
    const body = encodeURIComponent("This is a test inquiry to verify that the email transmission to info@horntravel.com.au is working correctly.\n\nSent at: " + new Date().toLocaleString());
    window.location.href = `mailto:info@horntravel.com.au?subject=${subject}&body=${body}`;
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            alt="Horn Travel Agency Logo" 
            className="h-10 md:h-12 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHP3PZjoDTZ1bfFmls4Ibo77_IQPX7MTjE1FYf4t0xt9nigzxBChVtqqnxyVh9da3S4vxpdimC2PNEbW__xWx_yYZ-T-ClRw35DIoEfw1-dxHYM8hoUeOUYD7whHtTL2jaD2ixBZpMhbi-BugOdpm9V6aBs2foc9MEh_1OIB8_hJqPbOpPAH6B-vj4R83s-OAmiAr9JsXLbDC159eDBVJpFAqQauQqbe6ZmZHT34nJM3Z21B8L94PcCOAYv0h4NA4-qCbNB0SK7dzq" 
          />
          <span className="text-lg md:text-xl font-bold tracking-tight text-slate-900 hidden sm:inline">Horn Travel Agency</span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={sendTestEmail}
            className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-all"
            title="Verify email connection"
          >
            <span className="material-symbols-outlined text-sm">send</span>
            Send Test Email
          </button>
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
