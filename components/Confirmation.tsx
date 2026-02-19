
import React, { useEffect, useState } from 'react';
import { InquiryData } from '../types.ts';
import Logo from './Logo.tsx';

interface ConfirmationProps {
  data: InquiryData;
  onRestart: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ data, onRestart }) => {
  const [refNumber, setRefNumber] = useState('');

  useEffect(() => {
    const rand = Math.floor(10000 + Math.random() * 90000);
    setRefNumber(`#TRV-${rand}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Success Notification - Hidden on Print */}
      <div className="bg-white rounded-3xl shadow-2xl shadow-primary/5 border border-slate-100 overflow-hidden relative mb-8 print:hidden">
        <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse"></div>
        <div className="p-10 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full flex items-center justify-center p-3">
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white shadow-lg">
                <span className="material-icons-round text-3xl">check_circle</span>
              </div>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">Inquiry Successfully Sent</h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            Our specialists at <span className="font-bold text-primary">Horn Travel Agency</span> are processing your request. 
            A summary has been prepared for your records.
          </p>
          <button 
            onClick={onRestart}
            className="mt-8 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
          >
            Start New Inquiry
          </button>
        </div>
      </div>

      {/* Official Summary Document */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden print:shadow-none print:border-none print:m-0 print:p-0">
        <div className="p-8 md:p-12 print:p-0">
          
          {/* Header Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <Logo className="h-16 md:h-20" />
              <div className="hidden md:block">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Inquiry Summary Report</p>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Inquiry Reference</p>
              <p className="text-xl font-black text-primary tracking-widest">{refNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Trip Specs */}
            <section className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black uppercase text-primary tracking-[0.2em]">Trip Specifications</h3>
                <button 
                  onClick={() => window.print()}
                  className="print:hidden text-slate-400 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">print</span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-50 pb-3">
                  <span className="text-xs font-semibold text-slate-500">Trip Type</span>
                  <span className="text-sm font-bold text-slate-900 uppercase tracking-tighter">
                    {data.tripType === 'round-trip' ? 'Round Trip' : 'One Way'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-3">
                  <span className="text-xs font-semibold text-slate-500">Route</span>
                  <span className="text-sm font-bold text-slate-900">{data.origin} → {data.destination}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-3">
                  <span className="text-xs font-semibold text-slate-500">Travel Date</span>
                  <span className="text-sm font-bold text-slate-900">
                    {data.departureDate}
                  </span>
                </div>
                {data.tripType === 'round-trip' && (
                   <div className="flex justify-between border-b border-slate-50 pb-3">
                    <span className="text-xs font-semibold text-slate-500">Return Date</span>
                    <span className="text-sm font-bold text-slate-900">{data.returnDate}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-slate-50 pb-3">
                  <span className="text-xs font-semibold text-slate-500">Travelers</span>
                  <span className="text-sm font-bold text-slate-900">{data.adults} Adults, {data.children} Children, {data.infants} Infants</span>
                </div>
                {data.needStopover && (
                  <div className="p-4 bg-slate-50 rounded-2xl print:bg-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Stopover Requested</p>
                    <p className="text-sm font-bold text-slate-800">{data.stopoverLocation} ({data.stopoverDuration})</p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Special Requests</p>
                <div className="p-4 bg-slate-50 rounded-2xl min-h-[80px] print:bg-slate-50">
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    {data.specialRequests || 'No special requests specified.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Passenger Manifest */}
            <section className="space-y-6">
              <h3 className="text-xs font-black uppercase text-primary tracking-[0.2em] mb-4">Passenger Manifest</h3>
              <div className="space-y-4">
                {data.passengers.map((p, i) => (
                  <div key={p.id} className="p-5 border border-slate-100 rounded-2xl hover:border-primary/20 transition-all bg-white print:border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                        <p className="font-bold text-slate-800">{p.fullName || 'TBA'}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{p.nationality}</span>
                        {p.passportPhoto && (
                          <span className="text-[8px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Photo Attached</span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-3">
                      <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase">Passport Number</p>
                        <p className="text-[11px] font-bold text-slate-700">{p.passportNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase">Expiry Date</p>
                        <p className="text-[11px] font-bold text-slate-700">{p.expiryDate || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase">Date of Birth</p>
                        <p className="text-[11px] font-bold text-slate-700">{p.dob || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase">Email / Contact</p>
                        <p className="text-[11px] font-bold text-slate-700 truncate">{p.email || p.phone || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Horn Travel Agency - Melbourne Office</p>
            <p className="text-[9px] text-slate-300">This document is a formal record of inquiry and does not constitute a confirmed booking.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
