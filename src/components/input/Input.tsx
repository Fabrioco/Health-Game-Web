import React from "react";
import "./inputStyles.css";

type InputProps = {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      className="input__field"
      id={label}
      name={label}
      autoComplete="off"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
