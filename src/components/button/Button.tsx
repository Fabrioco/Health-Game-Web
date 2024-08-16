import React from "react";
import "./buttonStyles.css";

type ButtonProps = {
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  onClick: () => void;
};

export default function Button({ children, type, onClick }: ButtonProps) {
  return (
    <button type={type} className="button" role="button" onClick={onClick}>
      {children}
    </button>
  );
}
