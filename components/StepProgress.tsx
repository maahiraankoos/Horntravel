import React from 'react';
import { Step } from '../types';

interface StepProgressProps {
    currentStep: Step;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
    const steps = ['Trip Details', 'Passenger Info', 'Confirmation'];
    const currentIndex = Object.values(Step).indexOf(currentStep);

    return (
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && <div className={`h-1 w-12 ${index <= currentIndex ? 'bg-primary' : 'bg-slate-300'}`}></div>}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${index <= currentIndex ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'}`}>{index + 1}</div>
                </div>
            ))}
        </div>
    );
};

export default StepProgress;