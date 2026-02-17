import React from 'react';
import { InquiryData } from '../types';

interface TripDetailsProps {
    data: InquiryData;
    onNext: () => void;
    onChange: (updates: Partial<InquiryData>) => void;
}

const TripDetails: React.FC<TripDetailsProps> = ({ data, onNext, onChange }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Trip Details</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Origin</label>
                    <input type="text" value={data.origin} onChange={(e) => onChange({ origin: e.target.value })} className="w-full border rounded px-3 py-2" placeholder="Departure city" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Destination</label>
                    <input type="text" value={data.destination} onChange={(e) => onChange({ destination: e.target.value })} className="w-full border rounded px-3 py-2" placeholder="Arrival city" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Departure Date</label>
                        <input type="date" value={data.departureDate} onChange={(e) => onChange({ departureDate: e.target.value })} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Return Date</label>
                        <input type="date" value={data.returnDate} onChange={(e) => onChange({ returnDate: e.target.value })} className="w-full border rounded px-3 py-2" />
                    </div>
                </div>
                <button onClick={onNext} className="w-full bg-primary text-white py-2 rounded font-semibold hover:opacity-90 mt-6">Continue</button>
            </div>
        </div>
    );
};

export default TripDetails;
