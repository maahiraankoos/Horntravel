
import React from 'react';

interface NumberInputProps {
  label: string;
  sublabel: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, sublabel, value, onChange, min = 0, max = 10 }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
      <div>
        <p className="font-bold text-slate-800 text-sm">{label}</p>
        <p className="text-[10px] text-slate-500 font-medium">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button 
          type="button"
          onClick={() => value > min && onChange(value - 1)}
          disabled={value <= min}
          className={`w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center transition-all ${
            value <= min ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/10 hover:border-primary text-slate-600'
          }`}
        >
          <span className="material-icons-round text-lg">remove</span>
        </button>
        <span className="w-6 text-center font-bold text-slate-800 tabular-nums">{value}</span>
        <button 
          type="button"
          onClick={() => value < max && onChange(value + 1)}
          disabled={value >= max}
          className={`w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center transition-all ${
            value >= max ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary/10 hover:border-primary text-primary'
          }`}
        >
          <span className="material-icons-round text-lg">add</span>
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
