// components/ui/input-number.tsx
import { FC } from "react";

interface InputNumberProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export const InputNumber: FC<InputNumberProps> = ({ value, min = 1, max = 100, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(min, Math.min(max, Number(e.target.value)));
    onChange(newValue);
  };

  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={handleChange}
      className="border rounded p-2 w-20"
    />
  );
};
