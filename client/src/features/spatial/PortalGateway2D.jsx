import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Lock, Unlock, Compass } from "lucide-react";

export default function PortalGateway2D({
  isOpen,
  onTogglePortal,
  children,
  title = "ClubPlanet OrgOS Executive Directory",
  subtitle = "CAMPUS ARCHITECTURAL GATEWAY",
}) {
  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Expansive Architectural Gateway Frame */}
      <div className="relative w-full max-w-7xl mx-auto rounded-3xl bg-gradient-to-b from-[#0E1122]/90 via-[#0A0D1B] to-[#070913] border border-white/15 p-4 sm:p-8 md:p-10 shadow-[0_0_90px_rgba(0,0,0,0.95)] overflow-hidden min-h-[760px] flex flex-col">
        {/* Subtle Cybernetic Background Grid & Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar within Gateway Frame */}
        <div className="relative z-40 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                {subtitle}
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                {title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-[11px] font-mono font-bold text-emerald-300">
              ● SOC2 / FERPA VERIFIED
            </span>

            <button
              onClick={onTogglePortal}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                isOpen
                  ? "bg-white/10 hover:bg-white/15 border-white/20 text-zinc-300"
                  : "bg-gradient-to-r from-cyan-500 to-violet-600 border-cyan-400/50 text-white shadow-[0_0_25px_rgba(6,182,212,0.5)] scale-105"
              }`}
            >
              {isOpen ? (
                <>
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>Close Portal Doors</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4 text-cyan-200" />
                  <span>Open Campus Portal</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* DOOR CHAMBER / VIEWPORT HOLDER */}
        <div className="relative flex-1 w-full rounded-2xl border border-white/10 bg-[#05070F] overflow-hidden flex flex-col justify-center">
          {/* CONTENT INSIDE THE DOOR (The Interconnected Celestial Star-Rail Map) */}
          <div className="relative z-10 w-full h-full flex-1 flex flex-col">
            {children}
          </div>

          {/* LEFT DOOR PANEL (Covers left 50% when isOpen === false) */}
          <motion.div
            initial={false}
            animate={{
              x: isOpen ? "-102%" : "0%",
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 bottom-0 w-1/2 z-30 bg-gradient-to-r from-[#0C0F1E] via-[#101326] to-[#080A15] border-r border-cyan-400/40 flex flex-col items-end justify-center pr-6 sm:pr-12 shadow-[25px_0_60px_rgba(0,0,0,0.95)] pointer-events-none"
          >
            <div className="space-y-1.5 text-right font-mono">
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                PORTAL SECTOR 01
              </div>
              <div className="text-base font-extrabold text-white tracking-tight">
                STUDENT SOCIETIES
              </div>
              <div className="text-xs text-cyan-400 font-bold">
                6 CHARTERED HUBS
              </div>
            </div>
            {/* Architectural vertical metallic handle strip */}
            <div className="absolute right-3 top-1/4 bottom-1/4 w-1.5 rounded-full bg-gradient-to-b from-cyan-400/80 via-violet-500/80 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
          </motion.div>

          {/* RIGHT DOOR PANEL (Covers right 50% when isOpen === false) */}
          <motion.div
            initial={false}
            animate={{
              x: isOpen ? "102%" : "0%",
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 bottom-0 w-1/2 z-30 bg-gradient-to-l from-[#0C0F1E] via-[#101326] to-[#080A15] border-l border-cyan-400/40 flex flex-col items-start justify-center pl-6 sm:pl-12 shadow-[-25px_0_60px_rgba(0,0,0,0.95)] pointer-events-none"
          >
            <div className="space-y-1.5 text-left font-mono">
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                PORTAL SECTOR 02
              </div>
              <div className="text-base font-extrabold text-white tracking-tight">
                CAMPUS EVENTS
              </div>
              <div className="text-xs text-amber-400 font-bold">
                5 FLAGSHIP ARENAS
              </div>
            </div>
            {/* Architectural vertical metallic handle strip */}
            <div className="absolute left-3 top-1/4 bottom-1/4 w-1.5 rounded-full bg-gradient-to-b from-violet-500/80 via-cyan-400/80 to-transparent shadow-[0_0_15px_rgba(124,58,237,0.8)]" />
          </motion.div>

          {/* CENTER CHARTER SEAL (Visible only when Closed) */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.3 }}
                onClick={onTogglePortal}
                className="absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-6 rounded-3xl bg-[#090C1A]/95 border border-cyan-400/60 shadow-[0_0_70px_rgba(6,182,212,0.5)] backdrop-blur-2xl flex flex-col items-center text-center cursor-pointer group max-w-md mx-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all">
                  <Unlock className="w-7 h-7 text-cyan-300" />
                </div>
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  CLUBPLANET CELESTIAL PORTAL
                </div>
                <div className="text-xl font-extrabold text-white mt-1 tracking-tight">
                  Enter Constellation Transit Map
                </div>
                <div className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Click to open doors and explore 6 Clubs & Societies, 5 Upcoming Events, and 4 Governance hubs mapped as stars along our rail network.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
