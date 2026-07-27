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
    inline-flex items-center justify-center font-bold tracking-wide
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F76F9] focus:ring-offset-[#0A0E27]
    disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]
  `;

  // Premium interactive glassmorphism buttons matching Linear/Stripe design aesthetics
  const variants = {
    primary: `
      bg-gradient-to-r from-[#1F76F9] to-[#FF6F41] text-white
      hover:shadow-[0_0_20px_0_rgba(31,118,249,0.45)] hover:scale-[1.02]
      border border-transparent
    `,
    secondary: `
      bg-white/[0.04] text-white hover:bg-white/[0.08]
      backdrop-blur-sm border border-white/10
      hover:shadow-[0_4px_16px_0_rgba(255,255,255,0.05)] hover:scale-[1.01]
    `,
    outline: `
      bg-transparent text-white border border-white/10
      hover:bg-white/[0.04] hover:border-white/20
    `,
    ghost: `
      bg-transparent text-white hover:bg-white/[0.04] border border-transparent
    `,
    danger: `
      bg-red-600 text-white hover:bg-red-500
      hover:shadow-[0_0_20px_0_rgba(239,68,68,0.4)] hover:scale-[1.02]
      border border-transparent
    `,
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs rounded-lg",
    md: "px-5 py-2.5 text-sm rounded-xl",
    lg: "px-7 py-3 text-base rounded-2xl",
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
