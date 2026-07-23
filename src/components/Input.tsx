"use client";

import React, { createContext, useContext, useState, useEffect, useId } from "react";

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
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-[var(--text-primary)]">
          {label}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        className={`w-full px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] border rounded-[var(--radius-sm)] shadow-[var(--shadow-sm)] outline-none transition-all duration-150 focus:border-[var(--color-accent-600)] focus:ring-1 focus:ring-[var(--color-accent-600)] ${
          error ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]" : "border-[var(--border)]"
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-[var(--color-error)] font-medium mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
};
