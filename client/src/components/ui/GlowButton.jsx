import { motion } from "framer-motion";

/**
 * High-performance Glow Button with cyan/violet neon glow,
 * magnetic hover feedback, and sleek gradient border.
 */
const GlowButton = ({
  children,
  onClick,
  variant = "primary", // primary | secondary | outline
  size = "md", // sm | md | lg
  className = "",
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 focus:outline-none overflow-hidden select-none cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2.5",
    lg: "px-8 py-4 text-lg gap-3",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 bg-[length:200%_auto] text-white shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] hover:bg-right",
    secondary:
      "bg-white/10 text-white border border-white/15 hover:bg-white/15 hover:border-cyan-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
    outline:
      "bg-transparent text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/10 hover:border-cyan-400",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {/* Subtle shine overlay */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      {Icon && <Icon className="w-5 h-5 shrink-0" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default GlowButton;
