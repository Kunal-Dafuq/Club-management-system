import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Cpu, ShieldCheck } from "lucide-react";

const LOGS = [
  "INITIALIZING THREE.JS WEBGL RENDERER...",
  "ALLOCATING 60 FPS HARDWARE BUFFER...",
  "SYNTHESIZING CLUBPLANET CHARTERED PORTAL DOORS...",
  "ENCRYPTING TELEMETRY & RBAC PERMISSION SHADERS...",
  "SPATIAL UNIVERSE v2.5 READY FOR ENTRY.",
];

export default function SpatialPreloader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [logIdx, setLogIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish(), 400);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onFinish]);

  useEffect(() => {
    setLogIdx(Math.min(Math.floor((progress / 100) * LOGS.length), LOGS.length - 1));
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#090A0F] text-white p-6 select-none"
    >
      {/* Glow Backdrop */}
      <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-xs font-mono font-bold text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          <Cpu className="w-4 h-4 animate-spin text-cyan-400" />
          <span>CLUBPLANET ORGOS // SPATIAL UNIVERSE</span>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Entering 3D Campus
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            {LOGS[logIdx]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-zinc-400">
            <span>SHADER COMPILATION</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>GPU Accelerated • 60 FPS Render SLA • Web Audio Ready</span>
        </div>
      </div>
    </motion.div>
  );
}
