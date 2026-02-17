import React from 'react';
import { InquiryData } from '../types';

interface ConfirmationProps {
    data: InquiryData;
    onRestart: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ data, onRestart }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-2xl mx-auto text-center">
            <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold">Thank You!</h2>
                <p className="text-slate-600 mt-2">Your travel inquiry has been submitted successfully.</p>
            </div>
            <button onClick={onRestart} className="w-full bg-primary text-white py-2 rounded font-semibold hover:opacity-90 mt-6">New Inquiry</button>
        </div>
    );
};

export default Confirmation;