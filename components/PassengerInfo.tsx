
import React, { useRef } from 'react';
import { InquiryData, Passenger } from '../types.ts';

interface PassengerInfoProps {
  data: InquiryData;
  onNext: () => void;
  onBack: () => void;
  onChange: (updates: Partial<InquiryData>) => void;
}

const PassengerInfo: React.FC<PassengerInfoProps> = ({ data, onNext, onBack, onChange }) => {
  const handlePassengerUpdate = (id: string, updates: Partial<Passenger>) => {
    const updatedPassengers = data.passengers.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    onChange({ passengers: updatedPassengers });
  };

  const handlePhotoUpload = (id: string, file: File) => {
    if (!file) return;
    
    // Check file size (limit to ~1MB for localStorage safety)
    if (file.size > 1024 * 1024) {
      alert("Please upload a smaller image (under 1MB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      handlePassengerUpdate(id, { passportPhoto: base64 });
    };
    reader.readAsDataURL(file);
  };

  const addPassenger = () => {
    const newPassenger: Passenger = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      passportNumber: '',
      expiryDate: '',
      nationality: 'Australia'
    };
    onChange({ passengers: [...data.passengers, newPassenger] });
  };

  const removePassenger = (id: string) => {
    if (data.passengers.length > 1) {
      onChange({ passengers: data.passengers.filter(p => p.id !== id) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  /**
   * 6 Month Rule: Passport must be valid for at least 6 months AFTER departure.
   * If departure is 2024-01-01, min expiry must be 2024-07-01.
   */
  const getMinExpiryDate = () => {
    if (!data.departureDate) return "";
    const depDate = new Date(data.departureDate);
    depDate.setMonth(depDate.getMonth() + 6);
    return depDate.toISOString().split('T')[0];
  };

  const minExpiry = getMinExpiryDate();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Passenger Information</h2>
          <p className="text-slate-500 mt-1">Provide traveler details exactly as they appear on passport.</p>
        </div>
        <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold border border-secondary/20">
          Step 2 of 3
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {data.passengers.map((passenger, index) => (
          <div key={passenger.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  {index === 0 ? 'Primary Passenger' : `Passenger ${index + 1}`}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                {index === 0 && (
                  <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md uppercase tracking-tighter border border-secondary/20">
                    Lead Contact
                  </span>
                )}
                {index > 0 && (
                  <button 
                    type="button" 
                    onClick={() => removePassenger(passenger.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <input 
                    required
                    className="w-full bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary px-4 py-3 outline-none transition-all" 
                    placeholder="e.g. John Doe"
                    value={passenger.fullName}
                    onChange={(e) => handlePassengerUpdate(passenger.id, { fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input 
                    required
                    type="email"
                    className="w-full bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary px-4 py-3 outline-none transition-all" 
                    placeholder="john.doe@example.com"
                    value={passenger.email}
                    onChange={(e) => handlePassengerUpdate(passenger.id, { email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <input 
                    required
                    type="tel"
                    className="w-full bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary px-4 py-3 outline-none transition-all" 
                    placeholder="0410 374 786"
                    value={passenger.phone}
                    onChange={(e) => handlePassengerUpdate(passenger.id, { phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
                  <input 
                    required
                    type="date"
                    className="w-full bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary px-4 py-3 outline-none transition-all" 
                    value={passenger.dob}
                    onChange={(e) => handlePassengerUpdate(passenger.id, { dob: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-primary font-bold">id_card</span>
                  <h4 className="font-bold text-slate-800">Passport Information</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Passport Number</label>
                    <input 
                      required
                      className="w-full bg-white border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary px-4 py-3 outline-none transition-all" 
                      placeholder="E1234567"
                      value={passenger.passportNumber}
                      onChange={(e) => handlePassengerUpdate(passenger.id, { passportNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Expiry Date</label>
                    <input 
                      required
                      type="date"
                      min={minExpiry}
                      className="w-full bg-white border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary px-4 py-3 outline-none transition-all" 
                      value={passenger.expiryDate}
                      onChange={(e) => handlePassengerUpdate(passenger.id, { expiryDate: e.target.value })}
                    />
                    <p className="text-[9px] text-slate-400 mt-1">Must be valid until at least {minExpiry} (6 months after departure).</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nationality</label>
                    <select 
                      className="w-full bg-white border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary px-4 py-3 outline-none transition-all cursor-pointer"
                      value={passenger.nationality}
                      onChange={(e) => handlePassengerUpdate(passenger.id, { nationality: e.target.value })}
                    >
                      <option>Australia</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Germany</option>
                      <option>New Zealand</option>
                    </select>
                  </div>
                </div>

                {/* Passport Photo Upload Section */}
                <div className="mt-8">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Passport Photo Copy</label>
                   <div className="flex flex-col sm:flex-row items-start gap-4">
                      {passenger.passportPhoto ? (
                        <div className="relative group">
                          <img 
                            src={passenger.passportPhoto} 
                            alt="Passport Preview" 
                            className="w-32 h-24 object-cover rounded-xl border-2 border-primary/20 shadow-sm transition-all group-hover:brightness-75"
                          />
                          <button 
                            type="button"
                            onClick={() => handlePassengerUpdate(passenger.id, { passportPhoto: undefined })}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="material-symbols-outlined text-xs">close</span>
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-24 bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer relative overflow-hidden">
                          <span className="material-symbols-outlined text-2xl mb-1 transition-transform group-hover:scale-110">add_a_photo</span>
                          <span className="text-[8px] font-bold uppercase">Upload Photo</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handlePhotoUpload(passenger.id, file);
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Please provide a clear photo or scan of the passport bio page. This helps ensure names and dates match exactly for airline ticketing.
                        </p>
                        <p className="text-[10px] text-slate-400 mt-2 italic font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">info</span>
                          Max size: 1MB. Format: JPG, PNG.
                        </p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button 
          type="button" 
          onClick={addPassenger}
          className="w-full py-5 border-2 border-dashed border-slate-200 rounded-2xl text-primary font-bold hover:bg-primary/5 hover:border-primary transition-all flex items-center justify-center gap-2 group"
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">person_add</span>
          Add Another Passenger
        </button>

        <div className="sticky bottom-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-2xl shadow-slate-300 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 z-40">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <img 
                alt="Bus interior placeholder" 
                className="w-16 h-12 object-cover rounded-xl shadow-inner" 
                src="https://picsum.photos/id/101/64/48" 
              />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Current Route</p>
              <p className="font-bold text-slate-800 text-sm md:text-base">
                {data.origin || 'Origin'} to {data.destination || 'Destination'}
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button 
              type="button" 
              onClick={onBack}
              className="flex-1 md:flex-none px-8 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
            <button 
              type="submit"
              className="flex-1 md:flex-none px-10 py-3 rounded-xl bg-secondary text-white font-bold hover:opacity-90 shadow-lg shadow-secondary/20 transition-all flex items-center justify-center gap-2 group"
            >
              Submit Inquiry
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PassengerInfo;
