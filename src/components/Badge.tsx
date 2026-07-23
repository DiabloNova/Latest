import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "info" | "neutral";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = "",
  variant = "neutral",
  ...props
}) => {
  const styles = {
    neutral: "bg-[var(--card)] text-[var(--text-secondary)] border border-[var(--border)]",
    success: "bg-emerald-500/10 text-[var(--color-success)] border border-emerald-500/20",
    warning: "bg-amber-500/10 text-[var(--color-warning)] border border-amber-500/20",
    error: "bg-red-500/10 text-[var(--color-error)] border border-red-500/20",
    info: "bg-blue-500/10 text-[var(--color-info)] border border-blue-500/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-[var(--radius-full)] ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
