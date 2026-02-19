
import React from 'react';
import Logo from './Logo.tsx';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10 text-center md:text-left">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Logo className="h-10" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto md:mx-0">
              Your trusted partner for worldwide travel arrangements, providing seamless booking experiences since inception.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl">call</span>
                <a className="hover:text-primary transition-colors" href="tel:0410374786">0410 374 786</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl">mail</span>
                <a className="hover:text-primary transition-colors" href="mailto:info@horntravel.com.au">info@horntravel.com.au</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Location</h4>
            <div className="flex items-start justify-center md:justify-start gap-3 text-sm text-slate-600">
              <span className="material-symbols-outlined text-primary text-xl">location_on</span>
              <p>27 Stubbs Street,<br />Kensington, Vic 3031</p>
            </div>
          </div>

          <div className="md:col-span-1 text-center md:text-right">
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Office Hours</h4>
            <p className="text-sm text-slate-500">
              Mon - Fri: 9:00 AM - 5:30 PM<br />
              Sat: 10:00 AM - 2:00 PM
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p 
            onClick={onAdminClick}
            className="cursor-pointer hover:text-slate-600 transition-colors"
          >
            © 2024 Horn Travel Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
