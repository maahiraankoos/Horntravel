
import React, { useState } from 'react';
import { InquiryRecord, InquiryData, Passenger } from '../types.ts';
import NumberInput from './NumberInput.tsx';

const DB_KEY = 'horntravel_inquiries_db';

interface ManageInquiryProps {
  onBack: () => void;
}

const ManageInquiry: React.FC<ManageInquiryProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<InquiryRecord[]>([]);
  const [record, setRecord] = useState<InquiryRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setRecord(null);
    setSearchResults([]);
    
    const db = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    const q = searchQuery.trim().toLowerCase();
    
    if (!q) return;

    // Find all matching records
    const matches = db.filter((r: InquiryRecord) => 
      r.id.toLowerCase().includes(q) || 
      r.passengers.some(p => p.phone.toLowerCase().includes(q))
    );

    if (matches.length === 1) {
      setRecord(matches[0]);
    } else if (matches.length > 1) {
      setSearchResults(matches);
    } else {
      setError('No inquiry found with that reference or phone number.');
    }
  };

  const handleSave = () => {
    if (!record) return;
    
    const db = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
    const index = db.findIndex((r: InquiryRecord) => r.id === record.id);
    
    if (index !== -1) {
      db[index] = record;
      localStorage.setItem(DB_KEY, JSON.stringify(db));
      setIsEditing(false);
      alert('Your changes have been saved successfully.');
    }
  };

  const updateRecord = (updates: Partial<InquiryRecord>) => {
    if (record) setRecord({ ...record, ...updates });
  };

  const updatePassenger = (pid: string, updates: Partial<Passenger>) => {
    if (!record) return;
    const passengers = record.passengers.map(p => p.id === pid ? { ...p, ...updates } : p);
    setRecord({ ...record, passengers });
  };

  const resetSearch = () => {
    setSearchResults([]);
    setRecord(null);
    setError('');
  };

  const getMinExpiryDate = () => {
    if (!record?.departureDate) return today;
    const depDate = new Date(record.departureDate);
    depDate.setMonth(depDate.getMonth() + 6);
    return depDate.toISOString().split('T')[0];
  };

  return (
    <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-12">
      {/* Search View */}
      {!record && searchResults.length === 0 && (
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl text-primary">search</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Manage Your Inquiry</h2>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Enter your Reference Number (e.g. #TRV-12345) or the phone number used during booking to retrieve your details.
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">confirmation_number</span>
              <input 
                required
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Reference # or Phone"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-bold text-slate-800 transition-all shadow-sm"
              />
            </div>
            {error && <p className="text-red-500 text-xs font-bold px-2">{error}</p>}
            <button 
              type="submit"
              className="w-full btn-gradient py-4 rounded-2xl text-white font-bold shadow-lg shadow-primary/20 hover:opacity-95 transition-all active:scale-[0.98]"
            >
              Retrieve Record
            </button>
            <button 
              type="button" 
              onClick={onBack}
              className="w-full py-4 text-slate-400 text-sm font-bold hover:text-slate-600 transition-colors"
            >
              Return to Website
            </button>
          </form>
        </div>
      )}

      {/* Multiple Results Found View */}
      {!record && searchResults.length > 1 && (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Multiple Records Found</h2>
              <p className="text-slate-500 text-sm mt-1">We found {searchResults.length} inquiries matching "{searchQuery}". Please select one to continue.</p>
            </div>
            <button 
              onClick={resetSearch}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              New Search
            </button>
          </div>

          <div className="grid gap-4">
            {searchResults.map((match) => (
              <div 
                key={match.id} 
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-primary uppercase tracking-wider">{match.id}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${match.tripType === 'one-way' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      {match.tripType === 'one-way' ? 'One Way' : 'Round Trip'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900">{match.origin} → {match.destination}</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">calendar_today</span>
                    Travels on {match.departureDate}
                  </p>
                </div>
                <button 
                  onClick={() => setRecord(match)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  Manage Inquiry
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail & Edit View */}
      {record && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Record</p>
              <h3 className="text-2xl font-black text-slate-900">{record.id}</h3>
              <p className="text-xs text-slate-500 mt-1">Submitted on {new Date(record.submittedAt).toLocaleDateString()}</p>
              {record.agentCode && <p className="text-xs text-secondary font-bold">Agent: {record.agentCode}</p>}
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex-1 md:flex-none px-6 py-3 bg-primary text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  Edit Details
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 md:flex-none px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex-1 md:flex-none px-6 py-3 bg-secondary text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm"
                  >
                    Save Changes
                  </button>
                </>
              )}
              <button 
                onClick={() => {
                  setRecord(null);
                  if (searchResults.length <= 1) setSearchResults([]);
                }}
                className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-600 transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isEditing ? 'opacity-100' : 'pointer-events-none'}`}>
            <div className="md:col-span-2 space-y-6">
              <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em]">Trip Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Origin</label>
                    <input 
                      disabled={!isEditing}
                      value={record.origin}
                      onChange={(e) => updateRecord({ origin: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 disabled:opacity-70 transition-all outline-none focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Destination</label>
                    <input 
                      disabled={!isEditing}
                      value={record.destination}
                      onChange={(e) => updateRecord({ destination: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 disabled:opacity-70 transition-all outline-none focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Departure Date</label>
                    <input 
                      type="date"
                      min={today}
                      disabled={!isEditing}
                      value={record.departureDate}
                      onChange={(e) => updateRecord({ departureDate: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 disabled:opacity-70 transition-all outline-none focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  {record.tripType === 'round-trip' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Return Date</label>
                      <input 
                        type="date"
                        min={record.departureDate || today}
                        disabled={!isEditing}
                        value={record.returnDate}
                        onChange={(e) => updateRecord({ returnDate: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 disabled:opacity-70 transition-all outline-none focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Agent Code</label>
                    <input 
                      disabled={!isEditing}
                      value={record.agentCode}
                      onChange={(e) => updateRecord({ agentCode: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-800 disabled:opacity-70 transition-all outline-none focus:ring-2 focus:ring-primary/10"
                      placeholder="Enter agent code if applicable"
                    />
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em]">Passenger Details</h4>
                <div className="space-y-4">
                  {record.passengers.map((p, idx) => (
                    <div key={p.id} className="p-6 bg-slate-50 rounded-2xl space-y-4 border border-slate-100 hover:border-slate-200 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shadow-sm">{idx + 1}</span>
                          <p className="font-bold text-slate-800">{isEditing ? `Editing Traveler ${idx+1}` : p.fullName}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-slate-400 uppercase px-1">Full Name</label>
                          <input 
                            disabled={!isEditing}
                            value={p.fullName}
                            onChange={(e) => updatePassenger(p.id, { fullName: e.target.value })}
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 disabled:opacity-70 shadow-sm outline-none focus:ring-2 focus:ring-primary/10"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-slate-400 uppercase px-1">Passport Number</label>
                          <input 
                            disabled={!isEditing}
                            value={p.passportNumber}
                            onChange={(e) => updatePassenger(p.id, { passportNumber: e.target.value })}
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 disabled:opacity-70 shadow-sm outline-none focus:ring-2 focus:ring-primary/10"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-slate-400 uppercase px-1">Expiry Date</label>
                          <input 
                            type="date"
                            min={getMinExpiryDate()}
                            disabled={!isEditing}
                            value={p.expiryDate}
                            onChange={(e) => updatePassenger(p.id, { expiryDate: e.target.value })}
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 disabled:opacity-70 shadow-sm outline-none focus:ring-2 focus:ring-primary/10"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-slate-400 uppercase px-1">Phone Contact</label>
                          <input 
                            disabled={!isEditing}
                            value={p.phone}
                            onChange={(e) => updatePassenger(p.id, { phone: e.target.value })}
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 disabled:opacity-70 shadow-sm outline-none focus:ring-2 focus:ring-primary/10"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-6">Traveler Counts</h4>
                <div className="space-y-4">
                  <NumberInput 
                    label="Adults" 
                    sublabel="12+ years" 
                    value={record.adults} 
                    onChange={(v) => isEditing && updateRecord({ adults: v })} 
                    min={1}
                  />
                  <NumberInput 
                    label="Children" 
                    sublabel="2-11 years" 
                    value={record.children} 
                    onChange={(v) => isEditing && updateRecord({ children: v })} 
                  />
                  <NumberInput 
                    label="Infants" 
                    sublabel="Under 2 years" 
                    value={record.infants} 
                    onChange={(v) => isEditing && updateRecord({ infants: v })} 
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ManageInquiry;
