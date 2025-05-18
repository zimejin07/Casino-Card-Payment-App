"use client";

import { CardType } from "../types";

type Props = {
  label: string;
  value: CardType;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const options: { label: string; value: CardType }[] = [
  { label: "Basic", value: "basic" },
  { label: "Black", value: "black" },
  { label: "Premium", value: "premium" },
];

export default function FieldSelect({ label, value, onChange }: Props) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <select
        className="form-input input-neutral"
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
