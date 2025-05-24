"use client";

import { ChangeEvent } from "react";
import Image from "next/image";

type Props = {
  label: string;
  type?: "text" | "password";
  placeholder: string;
  maxLength: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  valid: boolean | null;
};

export default function FieldInput({
  label,
  type = "text",
  placeholder,
  maxLength,
  value,
  onChange,
  error,
  valid,
}: Props) {
  const getValidationClass = (valid: boolean | null) => {
    if (valid === true) return "input-valid";
    if (valid === false) return "input-invalid";
    return "input-neutral";
  };

  return (
    <div>
      <label className="form-label">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`form-input pr-10 ${getValidationClass(valid)}`}
          value={value}
          onChange={onChange}
        />
        {valid !== null && (
          <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
            {valid ? (
              <Image
                src="/form-success.svg"
                alt="Valid"
                width={20}
                height={20}
                className="opacity-80"
              />
            ) : (
              <Image
                src="/form-error.svg"
                alt="Invalid"
                width={20}
                height={20}
                className="opacity-80"
              />
            )}
          </span>
        )}
      </div>
      {valid === false && error && <p className="form-error">{error}</p>}
    </div>
  );
}
