"use client";

import React, { useEffect, useState } from "react";

/**
 * Premium Ambient Background component providing organic depth with interactive animated orbs.
 * Self-optimizes for mobile viewports to guarantee 60fps rendering performance.
 */
export const AmbientBackground: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="ambient-bg absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1 - Primary Accent Blue */}
      <div
        className="absolute rounded-full float-animation"
        style={{
          width: isMobile ? "220px" : "550px",
          height: isMobile ? "220px" : "550px",
          background: "radial-gradient(circle, rgba(31, 118, 249, 0.16) 0%, transparent 70%)",
          filter: isMobile ? "blur(50px)" : "blur(110px)",
          opacity: isMobile ? 0.2 : 0.45,
          top: "-100px",
          right: "-100px",
          animationDuration: "24s",
        }}
      />

      {/* Orb 2 - Secondary Accent Orange */}
      <div
        className="absolute rounded-full float-animation"
        style={{
          width: isMobile ? "180px" : "480px",
          height: isMobile ? "180px" : "480px",
          background: "radial-gradient(circle, rgba(255, 111, 65, 0.13) 0%, transparent 70%)",
          filter: isMobile ? "blur(45px)" : "blur(100px)",
          opacity: isMobile ? 0.15 : 0.4,
          bottom: "-80px",
          left: "-80px",
          animationDelay: "-8s",
          animationDuration: "20s",
        }}
      />

      {/* Orb 3 - Soft Cyan/Teal Center Accent (Desktop only) */}
      {!isMobile && (
        <div
          className="absolute rounded-full float-animation"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(121, 173, 251, 0.08) 0%, transparent 70%)",
            filter: "blur(90px)",
            opacity: 0.3,
            top: "40%",
            left: "30%",
            animationDelay: "-14s",
            animationDuration: "28s",
          }}
        />
      )}
    </div>
  );
};
