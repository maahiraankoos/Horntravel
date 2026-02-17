import React from 'react';
import { InquiryData } from '../types';

interface PassengerInfoProps {
    data: InquiryData;
    onNext: () => void;
    onBack: () => void;
    onChange: (updates: Partial<InquiryData>) => void;
}

const PassengerInfo: React.FC<PassengerInfoProps> = ({ data, onNext, onBack, onChange }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Passenger Information</h2>
            <div className="space-y-4">
                {data.passengers.map((p) => (
                    <div key={p.id} className="border rounded-lg p-4">
                        <input
                            type="text"
                            value={p.fullName}
                            placeholder="Full Name"
                            className="w-full border rounded px-3 py-2 mb-2"
                        />
                    </div>
                ))}
            </div>
            <div className="flex gap-4 mt-6">
                <button onClick={onBack} className="flex-1 border border-primary text-primary py-2 rounded font-semibold hover:bg-blue-50">Back</button>
                <button onClick={onNext} className="flex-1 bg-primary text-white py-2 rounded font-semibold hover:opacity-90">Submit</button>
            </div>
        </div>
    );
};

export default PassengerInfo;