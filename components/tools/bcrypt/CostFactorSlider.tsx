'use client';

import { Info } from 'lucide-react';

interface CostFactorSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function CostFactorSlider({ value, onChange }: CostFactorSliderProps) {
  const getEstimation = () => {
    if (value < 10) return "~20ms - Fast but less secure";
    if (value === 10) return "~100ms - Balanced";
    if (value === 12) return "~300ms - Recommended for Production";
    if (value >= 14) return "~1.2s+ - High security, high latency";
    return `~${Math.pow(2, value - 10) * 100}ms estimated`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Cost Factor (Salt Rounds)</label>
        <span className="text-lg font-bold text-primary">{value}</span>
      </div>
      <input
        type="range"
        min="4"
        max="16"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10 text-[10px] text-muted-foreground">
        <Info className="w-4 h-4 text-primary shrink-0" />
        <div>
          <p className="font-bold text-foreground">Rounds: 2^{value} = {Math.pow(2, value).toLocaleString()}</p>
          <p>{getEstimation()}</p>
        </div>
      </div>
    </div>
  );
}
