import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent-600)] disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-[var(--color-primary-700)] text-white hover:bg-[var(--color-primary-800)] border border-transparent shadow-sm",
    secondary: "bg-[var(--color-accent-600)] text-white hover:bg-blue-600 border border-transparent shadow-sm",
    outline: "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--card)]",
    ghost: "bg-transparent text-[var(--foreground)] hover:bg-[var(--card)] border border-transparent",
    danger: "bg-[var(--color-error)] text-white hover:bg-red-600 border border-transparent shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-[var(--radius-sm)]",
    md: "px-4 py-2 text-sm rounded-[var(--radius-md)]",
    lg: "px-6 py-3 text-base rounded-[var(--radius-lg)]",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
