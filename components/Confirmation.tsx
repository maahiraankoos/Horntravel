
import React, { useEffect, useState } from 'react';
import { InquiryData } from '../types';
import Logo from './Logo';

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

  const handlePrint = () => {
    window.print();
  };

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
              <h3 className="text-xs font-black uppercase text-primary tracking-[0.2em] mb-4">Trip Specifications</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-50 pb-3">
                  <span className="text-xs font-semibold text-slate-500">Route</span>
                  <span className="text-sm font-bold text-slate-900">{data.origin} → {data.destination}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-3">
                  <span className="text-xs font-semibold text-slate-500">Travel Period</span>
                  <span className="text-sm font-bold text-slate-900">{data.departureDate} to {data.returnDate}</span>
                </div>
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
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{p.nationality}</span>
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
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Horn Travel Agency • 27 Stubbs St, Kensington VIC 3031 • 0410 374 786</p>
          </div>
        </div>

        {/* Action Controls - Hidden on Print */}
        <div className="bg-slate-50 p-8 flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
          <button 
            onClick={onRestart}
            className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            Start New Inquiry
            <span className="material-icons-round text-sm group-hover:rotate-180 transition-transform duration-500">refresh</span>
          </button>
          <button 
            onClick={handlePrint}
            className="w-full sm:w-auto px-10 py-4 bg-white text-primary font-bold rounded-xl border border-primary/20 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-icons-round text-xl">picture_as_pdf</span>
            Convert to PDF / Print
          </button>
        </div>
      </div>

      <div className="mt-8 text-center print:hidden">
        <p className="text-xs text-slate-400 italic">This is an automated travel brief generated by the Horn Travel Digital Portal.</p>
      </div>
    </div>
  );
};

export default Confirmation;
