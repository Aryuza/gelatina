"use client";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function TextInput({
  value,
  onChange,
  placeholder = "",
  autoFocus = true,
}: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className="w-full rounded-2xl border-2 border-gray-200 bg-white px-5 py-4 text-lg font-medium text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
    />
  );
}
