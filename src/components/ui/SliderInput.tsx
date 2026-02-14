"use client";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (value: number) => void;
}

export default function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: SliderInputProps) {
  return (
    <div className="w-full space-y-4">
      <div className="text-center">
        <span className="text-5xl font-bold text-pink-600">{value}</span>
        <span className="text-xl text-pink-400 ml-1">{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        aria-label={label}
      />
      <div className="flex justify-between text-sm text-gray-400">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}
