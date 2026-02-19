import React from 'react';
import { Step } from '../types.ts';

interface StepProgressProps {
  currentStep: Step;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  const steps = [
    { id: Step.TripDetails, label: 'Trip Details' },
    { id: Step.PassengerInfo, label: 'Passenger Details' },
    { id: Step.Confirmation, label: 'Review' }
  ];

  return (
    <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto mb-12">
      <div className="absolute top-5 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full"></div>
      <div 
        className="absolute top-5 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500 rounded-full"
        style={{ width: currentStep === Step.TripDetails ? '25%' : currentStep === Step.PassengerInfo ? '75%' : '100%' }}
      ></div>
      
      {steps.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all duration-300 shadow-md ${
                isActive 
                  ? 'bg-primary text-white scale-110 shadow-primary/30' 
                  : isCompleted 
                    ? 'bg-secondary text-white' 
                    : 'bg-white border-2 border-slate-200 text-slate-400'
              }`}
            >
              {isCompleted ? <span className="material-icons-round text-lg">check</span> : step.id}
            </div>
            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${
              isActive ? 'text-primary' : isCompleted ? 'text-secondary' : 'text-slate-400'
            }`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;