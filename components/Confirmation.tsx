
import React, { useEffect, useState } from 'react';
import { InquiryData } from '../types';

interface ConfirmationProps {
  data: InquiryData;
  onRestart: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ data, onRestart }) => {
  const [refNumber, setRefNumber] = useState('');
  const [currentDate] = useState(new Date().toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }));

  useEffect(() => {
    const rand = Math.floor(100000 + Math.random() * 900000);
    setRefNumber(`HORN-${rand}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-0">
      {/* Success Hero Card - Hidden on Print */}
      <div className="bg-white rounded-3xl shadow-2xl shadow-primary/10 border border-slate-100 overflow-hidden relative mb-12 print:hidden transform transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
        <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse"></div>
        
        <div className="p-10 md:p-16 text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full flex items-center justify-center p-3 animate-bounce-slow">
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white shadow-xl">
                <span className="material-icons-round text-5xl">verified</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Booking Inquiry Received</h1>
          <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            Your travel request has been successfully transmitted to our <span className="font-bold text-slate-700">Kensington Office</span>.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mb-8 inline-block w-full max-w-sm">
            <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference ID</p>
              <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-1 rounded border border-secondary/20">CONFIRMED</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl font-black text-primary tracking-tighter">{refNumber}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(refNumber);
                  alert("Reference copied!");
                }}
                className="text-slate-400 hover:text-primary transition-colors p-2 bg-white rounded-xl shadow-sm border border-slate-100"
                title="Copy reference"
              >
                <span className="material-symbols-outlined text-xl">content_copy</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Container */}
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden print:shadow-none print:border-none print:rounded-none">
        
        {/* PDF Document Header */}
        <div className="hidden print:flex items-center justify-between p-10 border-b-4 border-primary bg-slate-50">
          <div className="flex items-center gap-6">
             <img 
              alt="Horn Travel Logo" 
              className="h-16 w-auto grayscale" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHP3PZjoDTZ1bfFmls4Ibo77_IQPX7MTjE1FYf4t0xt9nigzxBChVtqqnxyVh9da3S4vxpdimC2PNEbW__xWx_yYZ-T-ClRw35DIoEfw1-dxHYM8hoUeOUYD7whHtTL2jaD2ixBZpMhbi-BugOdpm9V6aBs2foc9MEh_1OIB8_hJqPbOpPAH6B-vj4R83s-OAmiAr9JsXLbDC159eDBVJpFAqQauQqbe6ZmZHT34nJM3Z21B8L94PcCOAYv0h4NA4-qCbNB0SK7dzq" 
            />
            <div className="text-left">
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter">HORN TRAVEL AGENCY</h2>
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Official Inquiry Summary</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-black text-slate-900">{refNumber}</p>
            <p className="text-[10px] text-slate-500 font-bold">{currentDate}</p>
          </div>
        </div>

        <div className="p-8 md:p-14">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Trip Overview</h2>
              <p className="text-slate-500 text-sm font-medium">Detailed travel preferences and itinerary requirements.</p>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">airplane_ticket</span>
              Status: Processing
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Itinerary */}
            <div className="lg:col-span-7 space-y-10">
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-6 flex items-center gap-3">
                  <span className="w-6 h-px bg-primary/30"></span>
                  Itinerary Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="group">
                      <p className="text-[9px] text-slate-400 font-extrabold uppercase mb-1">Departure From</p>
                      <div className="flex items-center gap-3">
                        <span className="material-icons-round text-primary text-xl">flight_takeoff</span>
                        <p className="text-lg font-black text-slate-800 leading-tight">{data.origin || 'Not Specified'}</p>
                      </div>
                    </div>
                    <div className="group">
                      <p className="text-[9px] text-slate-400 font-extrabold uppercase mb-1">Arriving At</p>
                      <div className="flex items-center gap-3">
                        <span className="material-icons-round text-primary text-xl">flight_land</span>
                        <p className="text-lg font-black text-slate-800 leading-tight">{data.destination || 'Not Specified'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] text-slate-400 font-extrabold uppercase mb-1">Departure Date</p>
                      <p className="font-black text-slate-800">{data.departureDate || 'TBA'}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] text-slate-400 font-extrabold uppercase mb-1">Return Date</p>
                      <p className="font-black text-slate-800">{data.returnDate || 'TBA'}</p>
                    </div>
                  </div>
                </div>
              </section>

              {data.needStopover && (
                <section>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-secondary mb-6 flex items-center gap-3">
                    <span className="w-6 h-px bg-secondary/30"></span>
                    Stopover Request
                  </h3>
                  <div className="p-6 bg-secondary/5 border-2 border-dashed border-secondary/20 rounded-3xl flex items-center justify-between">
                    <div>
                      <p className="text-[9px] text-secondary/60 font-extrabold uppercase">Preferred Hub</p>
                      <p className="text-xl font-black text-slate-800">{data.stopoverLocation}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-secondary/60 font-extrabold uppercase">Est. Stay</p>
                      <p className="text-xl font-black text-slate-800">{data.stopoverDuration}</p>
                    </div>
                  </div>
                </section>
              )}

              <section>
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-6 flex items-center gap-3">
                  <span className="w-6 h-px bg-primary/30"></span>
                  Traveler Composition
                </h3>
                <div className="flex gap-4">
                  {[
                    { val: data.adults, label: 'Adults' },
                    { val: data.children, label: 'Children' },
                    { val: data.infants, label: 'Infants' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 text-center p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                      <p className="text-3xl font-black text-slate-900 mb-1">{item.val}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Preferences & Support */}
            <div className="lg:col-span-5 space-y-10">
              <section className="h-full">
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-6 flex items-center gap-3">
                  <span className="w-6 h-px bg-primary/30"></span>
                  Special Requirements
                </h3>
                <div className="p-8 bg-slate-900 text-white rounded-[2rem] h-[calc(100%-40px)] shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                     <span className="material-icons-round text-8xl">format_quote</span>
                   </div>
                   <p className="relative z-10 text-sm leading-relaxed font-medium italic text-slate-300">
                     {data.specialRequests || 'No additional special requests or airline preferences were specified for this inquiry.'}
                   </p>
                   <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 relative z-10">
                     <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                       <span className="material-icons-round text-white text-sm">support_agent</span>
                     </div>
                     <div>
                       <p className="text-[9px] font-black uppercase text-primary">Assigned Agent</p>
                       <p className="text-xs font-bold text-white">General Queue - Kensington</p>
                     </div>
                   </div>
                </div>
              </section>
            </div>
          </div>

          {/* Detailed Passenger Identification - New PDF Centric Design */}
          <section className="mt-20">
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-900">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Passenger Identification</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Official Documentation</p>
            </div>
            
            <div className="space-y-8">
              {data.passengers.map((p, i) => (
                <div key={p.id} className="relative p-8 border-2 border-slate-100 rounded-[2rem] group hover:border-primary/30 transition-all bg-white overflow-hidden print:border-slate-200">
                  <div className="absolute -top-1 -right-1 bg-slate-900 text-white px-6 py-2 rounded-bl-3xl font-black text-xs tracking-widest">
                    ID #{i + 1}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-8">
                    {/* Passenger Profile Info */}
                    <div className="md:col-span-2 flex items-start gap-6">
                      <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 flex-shrink-0">
                        <span className="material-icons-round text-slate-300 text-4xl">person</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[9px] text-slate-400 font-black uppercase mb-0.5">Legal Name (As per Passport)</p>
                          <p className="text-xl font-black text-slate-900 leading-none">{p.fullName || 'UNSPECIFIED'}</p>
                        </div>
                        <div className="flex gap-6">
                          <div>
                            <p className="text-[8px] text-slate-400 font-bold uppercase mb-0.5">Date of Birth</p>
                            <p className="text-sm font-bold text-slate-800">{p.dob || 'TBA'}</p>
                          </div>
                          <div>
                            <p className="text-[8px] text-slate-400 font-bold uppercase mb-0.5">Nationality</p>
                            <p className="text-sm font-bold text-slate-800">{p.nationality}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Passport Data */}
                    <div className="md:col-span-1 space-y-4">
                      <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <p className="text-[8px] text-primary/60 font-black uppercase mb-1">Passport Number</p>
                        <p className="text-base font-black text-slate-800 tracking-wider">{p.passportNumber || 'N/A'}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[8px] text-slate-400 font-black uppercase mb-1">Expiry Date</p>
                        <p className="text-base font-bold text-slate-800">{p.expiryDate || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-1 space-y-4">
                       <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                         <span className="material-icons-round text-primary text-base">mail</span>
                         <span className="truncate">{p.email || 'N/A'}</span>
                       </div>
                       <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                         <span className="material-icons-round text-primary text-base">call</span>
                         <span>{p.phone || 'N/A'}</span>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer for Printed Document */}
          <div className="hidden print:grid grid-cols-2 gap-12 mt-20 pt-10 border-t-2 border-slate-100">
            <div>
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-10">Client Declaration</p>
              <div className="h-20 border-b border-slate-300 mb-2"></div>
              <p className="text-[9px] text-slate-400 italic">I confirm the above details match my travel documentation.</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-10">Agency Endorsement</p>
              <div className="h-20 flex items-end justify-end mb-2">
                 <img alt="Stamp" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS-gcNI4e6hjfrjmYgehO6D4pl8YVqy-JrWw1mJTzDzXRB8ZCq7Fp7sVa_sJSyh3FhTqlZ6KpQum-aC89cPQJN5PXrF19V5dKoCSKQOqu2fz9Nsdi2rspZYmeyh3wl8cCE92v5RXR90NScJe4ONGXL3WLN9-YAKELNGN_acfW2mfC3hp48zDH_DBMLBs_VZ9wB0_aPR-8L_YoGUAENmycIEY5YIfPsu4UHoJHFXM4zYesotkKQUHMGNG15zZ6XiEoiRF1HrPzxHt5m" className="h-16 opacity-30" />
              </div>
              <p className="text-[9px] text-slate-400">Verified by Horn Travel Ticketing System</p>
            </div>
          </div>
        </div>

        {/* Interactive Buttons - Hidden on Print */}
        <div className="bg-slate-50 p-10 flex flex-col sm:flex-row items-center justify-center gap-6 print:hidden border-t border-slate-100">
          <button 
            onClick={onRestart}
            className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group"
          >
            Start New Inquiry
            <span className="material-icons-round text-sm group-hover:rotate-180 transition-transform duration-500">refresh</span>
          </button>
          <button 
            onClick={handlePrint}
            className="w-full sm:w-auto px-10 py-5 bg-white text-primary font-black rounded-2xl border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/5 group"
          >
            <span className="material-icons-round text-xl group-hover:scale-125 transition-transform">picture_as_pdf</span>
            Convert to PDF / Print
          </button>
        </div>
      </div>
      
      <div className="mt-12 text-center print:hidden">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mb-4">Official Travel Portal</p>
        <div className="flex items-center justify-center gap-6 text-xs font-bold text-slate-500">
           <a href="tel:0410374786" className="hover:text-primary transition-colors">0410 374 786</a>
           <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
           <a href="mailto:info@horntravel.com.au" className="hover:text-primary transition-colors">info@horntravel.com.au</a>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
