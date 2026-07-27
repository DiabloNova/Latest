import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

/**
 * A premium reusable GlassCard component implementing responsive glassmorphism.
 *
 * Performance Optimized:
 * - Desktop: Full backdrop-blur-xl
 * - Tablet: Reduced backdrop-blur-lg
 * - Mobile: Minimal backdrop-blur-sm to protect GPU and battery life
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
        bg-white/[0.03] lg:bg-white/[0.04]
        backdrop-blur-sm sm:backdrop-blur-sm md:backdrop-blur-lg lg:backdrop-blur-xl
        border border-white/10 lg:border-white/[0.08]
        rounded-2xl
        shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] lg:shadow-[0_12px_48px_0_rgba(0,0,0,0.35)]
        transition-all duration-300 ease-in-out
        ${hoverable ? "hover:-translate-y-1 hover:bg-white/[0.06] hover:border-white/15 hover:shadow-[0_16px_48px_0_rgba(31,118,249,0.15)]" : ""}
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
