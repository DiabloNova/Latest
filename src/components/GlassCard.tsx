import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

/**
 * A premium reusable GlassCard component implementing responsive glassmorphism.
 * Unified with centralized globals.css CSS custom properties to support light/dark switching.
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  hoverable = false,
  ...props
}) => {
  return (
    <div
      className={`
        relative overflow-hidden
        glass-card
        ${hoverable ? "glass-card-hover" : ""}
        ${className}
      `}
      {...props}
    >
      {/* Glossy gradient shine reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.03] pointer-events-none rounded-2xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
