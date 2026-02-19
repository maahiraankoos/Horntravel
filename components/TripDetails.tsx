
import React from 'react';
import { InquiryData } from '../types.ts';
import NumberInput from './NumberInput.tsx';

interface TripDetailsProps {
  data: InquiryData;
  onNext: () => void;
  onChange: (updates: Partial<InquiryData>) => void;
}

const TripDetails: React.FC<TripDetailsProps> = ({ data, onNext, onChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <main className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden max-w-3xl mx-auto">
      <div className="p-6 md:p-10">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900">Step 1: Trip Details</h2>
          <p className="text-slate-500 text-sm mt-1">Tell us where and when you'd like to go.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Trip Type Selector */}
          <div className="flex p-1.5 bg-slate-100 rounded-2xl max-w-sm mx-auto md:mx-0">
            <button
              type="button"
              onClick={() => onChange({ tripType: 'round-trip' })}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                data.tripType === 'round-trip' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className="material-symbols-outlined text-lg">sync</span>
              Round Trip
            </button>
            <button
              type="button"
              onClick={() => onChange({ tripType: 'one-way' })}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                data.tripType === 'one-way' 
                ? 'bg-white text-secondary shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className="material-symbols-outlined text-lg">trending_flat</span>
              One Way
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <span className="material-icons-round text-primary text-lg">flight_takeoff</span>
                Origin
              </label>
              <input 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                placeholder="City or Airport" 
                type="text"
                value={data.origin}
                onChange={(e) => onChange({ origin: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <span className="material-icons-round text-primary text-lg">flight_land</span>
                Destination
              </label>
              <input 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                placeholder="City or Airport" 
                type="text"
                value={data.destination}
                onChange={(e) => onChange({ destination: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <span className="material-icons-round text-primary text-lg">calendar_today</span>
                Departure Date
              </label>
              <input 
                required
                min={today}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                type="date"
                value={data.departureDate}
                onChange={(e) => onChange({ departureDate: e.target.value })}
              />
            </div>
            {data.tripType === 'round-trip' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <span className="material-icons-round text-primary text-lg">event_repeat</span>
                  Return Date
                </label>
                <input 
                  required
                  min={data.departureDate || today}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                  type="date"
                  value={data.returnDate}
                  onChange={(e) => onChange({ returnDate: e.target.value })}
                />
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-50">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Traveler Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NumberInput 
                label="Adults" 
                sublabel="12+ years" 
                value={data.adults} 
                onChange={(val) => onChange({ adults: val })} 
                min={1} 
              />
              <NumberInput 
                label="Children" 
                sublabel="2-11 years" 
                value={data.children} 
                onChange={(val) => onChange({ children: val })} 
              />
              <NumberInput 
                label="Infants" 
                sublabel="Under 2 years" 
                value={data.infants} 
                onChange={(val) => onChange({ infants: val })} 
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-50">
            <label className="inline-flex items-center cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={data.needStopover} 
                  onChange={(e) => onChange({ needStopover: e.target.checked })}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </div>
              <span className="ml-3 text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">I need a stopover</span>
            </label>

            {data.needStopover && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-primary/5 rounded-2xl border border-primary/10 transition-all">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Stopover Location</label>
                  <input 
                    className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                    placeholder="e.g. Dubai, Singapore" 
                    type="text"
                    value={data.stopoverLocation}
                    onChange={(e) => onChange({ stopoverLocation: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (Days)</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                    value={data.stopoverDuration}
                    onChange={(e) => onChange({ stopoverDuration: e.target.value })}
                  >
                    <option>1 Day</option>
                    <option>2 Days</option>
                    <option>3 Days</option>
                    <option>4+ Days</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-50 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <span className="material-icons-round text-primary text-lg">notes</span>
                Special Requests or Preferences (Optional)
              </label>
              <textarea 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" 
                placeholder="Mention any specific airline, dietary requirements, or wheelchair assistance..." 
                rows={4}
                value={data.specialRequests}
                onChange={(e) => onChange({ specialRequests: e.target.value })}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <span className="material-icons-round text-primary text-lg">badge</span>
                Agent Code (Optional)
              </label>
              <input 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                placeholder="Enter agent code if applicable" 
                type="text"
                value={data.agentCode}
                onChange={(e) => onChange({ agentCode: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-6">
            <button 
              type="button"
              className="text-slate-500 font-semibold hover:text-slate-800 transition-colors flex items-center gap-2"
            >
              <span className="material-icons-round">close</span>
              Cancel
            </button>
            <button 
              type="submit"
              className="btn-gradient hover:opacity-90 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/30 flex items-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Next Step: Passenger Details
              <span className="material-icons-round">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default TripDetails;
