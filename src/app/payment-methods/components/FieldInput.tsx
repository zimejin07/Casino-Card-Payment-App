"use client";

import {ChangeEvent} from "react";

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
                                       label, type = "text", placeholder, maxLength, value, onChange, error, valid,
                                   }: Props) {
    const getValidationClass = (valid: boolean | null) => {
        if (valid === true) return "input-valid";
        if (valid === false) return "input-invalid";
        return "input-neutral";
    };

    return (<div>
            <label className="form-label">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                className={`form-input ${getValidationClass(valid)}`}
                value={value}
                onChange={onChange}
            />
            {valid === false && error && <p className="form-error">{error}</p>}
        </div>);
}
