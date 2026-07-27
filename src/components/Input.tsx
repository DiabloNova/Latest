"use client";

import React, { useId } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  className = "",
  label,
  error,
  type = "text",
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="w-full flex flex-col gap-1.5 animate-fade-in">
      {label && (
        <label htmlFor={inputId} className="text-xs font-bold text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        className={`
          w-full px-4 py-3 text-sm rounded-xl outline-none
          bg-white/[0.02] text-white border transition-all duration-300
          backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]
          placeholder:text-white/30
          ${
            error
              ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
              : "border-white/10 focus:border-[#1F76F9] focus:ring-1 focus:ring-[#1F76F9]/30 focus:bg-white/[0.04] focus:shadow-[0_0_15px_rgba(31,118,249,0.15)]"
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-400 font-semibold mt-0.5 animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
};
