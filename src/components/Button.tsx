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
  const baseStyle = `
    inline-flex items-center justify-center font-semibold whitespace-nowrap
    transition-all duration-200 ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-600)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]
    disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]
  `;

  const variants = {
    primary: `
      bg-[var(--color-primary-600)] text-white
      hover:bg-[var(--color-primary-700)] shadow-[var(--shadow-sm)]
      border border-transparent
    `,
    secondary: `
      bg-[var(--muted-surface)] text-[var(--text-primary)]
      hover:bg-[var(--border)] border border-[var(--border)]
    `,
    outline: `
      bg-[var(--card)] text-[var(--text-primary)] border border-[var(--border)]
      hover:bg-[var(--muted-surface)] hover:border-[var(--border-strong)]
    `,
    ghost: `
      bg-transparent text-[var(--text-secondary)] hover:bg-[var(--muted-surface)] hover:text-[var(--text-primary)] border border-transparent
    `,
    danger: `
      bg-[var(--color-error)] text-white hover:opacity-90 border border-transparent shadow-[var(--shadow-sm)]
    `,
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-[var(--radius-md)] gap-1.5",
    md: "px-4 py-2 text-sm rounded-[var(--radius-md)] gap-2",
    lg: "px-6 py-2.5 text-base rounded-[var(--radius-lg)] gap-2",
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
