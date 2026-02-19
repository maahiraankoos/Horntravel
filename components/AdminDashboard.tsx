
import React, { useState, useEffect, useRef } from 'react';
import { InquiryRecord } from '../types.ts';
import Logo from './Logo.tsx';

const DB_KEY = 'horntravel_inquiries_db';

interface AdminDashboardProps {
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [records, setRecords] = useState<InquiryRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadDatabase();
  }, []);

  const loadDatabase = () => {
    const data = localStorage.getItem(DB_KEY);
    if (data) setRecords(JSON.parse(data));
  };

  const deleteRecord = (id: string) => {
    if (window.confirm('Delete this inquiry permanently?')) {
      const updated = records.filter(r => r.id !== id);
      setRecords(updated);
      localStorage.setItem(DB_KEY, JSON.stringify(updated));
      if (selectedId === id) setSelectedId(null);
    }
  };

  const downloadBackup = () => {
    const dataStr = JSON.stringify(records, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `horn_travel_DB_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        
        if (Array.isArray(importedData)) {
          if (window.confirm(`Merge ${importedData.length} records into current database?`)) {
            const existingIds = new Set(records.map(r => r.id));
            const newRecords = importedData.filter(r => !existingIds.has(r.id));
            const merged = [...newRecords, ...records];
            
            setRecords(merged);
            localStorage.setItem(DB_KEY, JSON.stringify(merged));
            alert('Database restored successfully!');
          }
        } else {
          alert('Invalid backup file format.');
        }
      } catch (err) {
        alert('Failed to read backup file.');
      }
    };
    reader.readAsText(file);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Type', 'Origin', 'Destination', 'Departure', 'Return', 'Adults', 'Children', 'Agent Code', 'Passengers'];
    const rows = records.map(r => [
      r.id,
      new Date(r.submittedAt).toLocaleDateString(),
      r.tripType || 'round-trip',
      r.origin,
      r.destination,
      r.departureDate,
      r.returnDate || '',
      r.adults,
      r.children,
      r.agentCode || '',
      r.passengers.map(p => p.fullName).join('; ')
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `horn_travel_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedRecord = records.find(r => r.id === selectedId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Logo className="h-10" />
          <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
          <div className="flex flex-col">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Admin Portal</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400">Database Active</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImport} 
            className="hidden" 
            accept=".json"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 bg-white border border-slate-200 text-slate-700 text-[11px] font-bold rounded-lg hover:bg-slate-50 flex items-center gap-2"
            title="Restore from a saved backup file"
          >
            <span className="material-symbols-outlined text-sm">upload_file</span>
            Import Backup
          </button>
          <button 
            onClick={downloadBackup}
            className="px-3 py-2 bg-white border border-slate-200 text-primary text-[11px] font-bold rounded-lg hover:bg-primary/5 flex items-center gap-2"
            title="Download database to your computer for safety"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            Backup to File
          </button>
          <button 
            onClick={exportCSV}
            className="px-3 py-2 bg-white border border-slate-200 text-slate-700 text-[11px] font-bold rounded-lg hover:bg-slate-50 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            CSV
          </button>
          <button 
            onClick={onExit}
            className="px-4 py-2 bg-slate-900 text-white text-[11px] font-bold rounded-lg hover:bg-slate-800 ml-2"
          >
            Exit Admin
          </button>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden">
        {/* List Side */}
        <div className="w-full md:w-1/3 bg-white border-r border-slate-200 overflow-y-auto">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Inquiries ({records.length})</p>
            {records.length > 0 && (
               <span className="text-[9px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">Auto-Saved</span>
            )}
          </div>
          {records.length === 0 ? (
            <div className="p-12 text-center">
              <span className="material-symbols-outlined text-slate-200 text-5xl mb-4">database_off</span>
              <p className="text-sm text-slate-400 font-bold">No records in this browser.</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 text-xs text-primary font-bold hover:underline"
              >
                Import from Backup File
              </button>
            </div>
          ) : (
            records.map(record => (
              <button
                key={record.id}
                onClick={() => setSelectedId(record.id)}
                className={`w-full p-5 text-left border-b border-slate-100 transition-all hover:bg-slate-50 ${selectedId === record.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-black text-primary">{record.id}</span>
                  <span className="text-[9px] font-bold text-slate-400">{new Date(record.submittedAt).toLocaleDateString()}</span>
                </div>
                <p className="font-bold text-slate-800 text-sm truncate">{record.origin} → {record.destination}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${record.tripType === 'one-way' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {record.tripType === 'one-way' ? 'One Way' : 'Round Trip'}
                  </span>
                  <p className="text-xs text-slate-500 truncate">{record.passengers[0]?.fullName || 'Unknown'}</p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail Side */}
        <div className="hidden md:block flex-grow bg-slate-50 overflow-y-auto p-8">
          {selectedRecord ? (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="bg-blue-100 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase mb-4 inline-block">Lead Profile</span>
                    <h3 className="text-2xl font-black text-slate-900">{selectedRecord.origin} to {selectedRecord.destination}</h3>
                    <p className="text-slate-500 text-sm mt-1">Submitted on {new Date(selectedRecord.submittedAt).toLocaleString()}</p>
                    {selectedRecord.agentCode && (
                      <p className="text-xs text-secondary font-bold mt-2">Agent Code: {selectedRecord.agentCode}</p>
                    )}
                  </div>
                  <button 
                    onClick={() => deleteRecord(selectedRecord.id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-8 pt-8 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Type</p>
                    <p className="font-bold text-slate-800 capitalize">{selectedRecord.tripType?.replace('-', ' ') || 'Round Trip'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Departure</p>
                    <p className="font-bold text-slate-800">{selectedRecord.departureDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Return</p>
                    <p className="font-bold text-slate-800">{selectedRecord.tripType === 'one-way' ? 'N/A' : selectedRecord.returnDate || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Travelers</p>
                    <p className="font-bold text-slate-800">{selectedRecord.adults}A, {selectedRecord.children}C, {selectedRecord.infants}I</p>
                  </div>
                </div>

                {selectedRecord.specialRequests && (
                  <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">Special Requests</p>
                    <p className="text-sm text-slate-700 italic">"{selectedRecord.specialRequests}"</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Passenger Manifest</h4>
                {selectedRecord.passengers.map((p, i) => (
                  <div key={p.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">{i+1}</div>
                      <div>
                        <p className="font-bold text-slate-800">{p.fullName}</p>
                        <p className="text-xs text-slate-500">{p.email} | {p.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Passport</p>
                        <p className="text-xs font-bold text-slate-700">{p.passportNumber || 'N/A'} ({p.nationality})</p>
                        <p className="text-[10px] text-slate-400">Exp: {p.expiryDate || 'N/A'}</p>
                      </div>
                      {p.passportPhoto && (
                        <div className="relative group">
                          <img 
                            src={p.passportPhoto} 
                            alt="Passport" 
                            className="w-12 h-12 object-cover rounded-lg border border-slate-200 shadow-sm cursor-zoom-in hover:scale-150 transition-transform origin-right z-10 relative"
                            onClick={() => {
                              const win = window.open();
                              win?.document.write(`<img src="${p.passportPhoto}" style="max-width:100%"/>`);
                            }}
                          />
                          <div className="absolute -bottom-1 -right-1 bg-primary text-white p-0.5 rounded-md shadow-sm z-20">
                            <span className="material-symbols-outlined text-[10px]">visibility</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300">
              <div className="text-center max-w-sm">
                <span className="material-symbols-outlined text-6xl mb-4">info</span>
                <p className="font-bold text-slate-800">Select an inquiry to view details</p>
                <p className="text-xs mt-2 text-slate-400">Your data is stored safely in this browser. To transfer data to another computer, use the "Backup to File" button above.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
