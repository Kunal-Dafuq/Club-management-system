import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Loader({ text = "SYNCING ORGOS WORKSPACE..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-8 select-none">
      <div className="relative flex items-center justify-center w-20 h-20 mb-4">
        {/* Outer cyan glowing spin ring */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin shadow-[0_0_20px_rgba(6,182,212,0.3)]" />
        {/* Inner violet reverse spin ring */}
        <div className="absolute inset-2 rounded-full border-2 border-violet-500/20 border-b-violet-400 animate-[spin_1.5s_linear_infinite_reverse] shadow-[0_0_20px_rgba(139,92,246,0.3)]" />
        {/* Center glowing spark */}
        <motion.div
          animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-400/30"
        >
          <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
        </motion.div>
      </div>

      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-cyan-300">
          {text}
        </span>
      </div>
    </div>
  );
}