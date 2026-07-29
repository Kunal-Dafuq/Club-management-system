import { useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Reusable Glassmorphism Card with mouse-tracking spot light, 
 * subtle 3D tilt, gradient borders, and modern blur.
 */
const GlassCard = ({
  children,
  className = "",
  hoverEffect = true,
  glowColor = "rgba(6, 182, 212, 0.15)", // Cyan glow by default
  onClick,
  ...props
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !hoverEffect) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={
        hoverEffect
          ? {
              y: -4,
              scale: 1.01,
              transition: { duration: 0.2, ease: "easeOut" },
            }
          : {}
      }
      className={`
        relative overflow-hidden
        bg-white/[0.04] hover:bg-white/[0.07]
        border border-white/10 hover:border-cyan-500/30
        backdrop-blur-xl
        rounded-3xl
        p-7
        transition-colors duration-300
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
        group
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {/* Dynamic Mouse Tracking Spotlight */}
      {hoverEffect && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Subtle Top Gradient Accent Border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent group-hover:border-white/20 transition-all duration-300" />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassCard;