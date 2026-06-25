const GlassCard = ({ children }) => {
  return (
    <div
      className="
      bg-white/5
      border
      border-white/10
      backdrop-blur-xl
      rounded-3xl
      p-8"
    >
      {children}
    </div>
  );
};

export default GlassCard;