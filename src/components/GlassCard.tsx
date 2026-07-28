import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

/**
 * Enterprise surface card.
 *
 * Fully theme-aware: uses design tokens so it renders as a crisp white card
 * in light mode and an elevated slate card in dark mode, with soft diffused
 * shadows instead of heavy drops.
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
        relative rounded-[var(--radius-lg)]
        bg-[var(--card)] text-[var(--card-foreground)]
        border border-[var(--border)]
        shadow-[var(--shadow-sm)]
        transition-all duration-200 ease-out
        ${hoverable ? "hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] hover:border-[var(--border-strong)]" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
