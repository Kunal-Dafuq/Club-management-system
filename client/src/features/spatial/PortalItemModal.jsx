import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Ticket,
  Building2,
  Calendar,
  Layers,
} from "lucide-react";
import { useState } from "react";

export default function PortalItemModal({ item, onClose }) {
  const [actionDone, setActionDone] = useState(false);
  const [toast, setToast] = useState(null);

  if (!item) return null;

  const isEvent = item.type === "EVENT";
  const isGov = item.type === "GOVERNANCE";

  const handlePrimaryAction = () => {
    setActionDone(!actionDone);
    if (isEvent) {
      setToast(
        !actionDone
          ? "✓ RSVP Pass #ORGOS-2026-8891 confirmed in Prisma DB!"
          : "RSVP Pass Released."
      );
    } else if (isGov) {
      setToast("✓ Executive Policy Audit Verified.");
    } else {
      setToast(
        !actionDone
          ? "✓ Successfully joined Chartered Organization Orbit!"
          : "Left Organization Orbit."
      );
    }
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl select-none">
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono font-bold text-xs flex items-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-[#090C1A] border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.8)] space-y-6"
        >
          {/* Top Category Badge & Close Button */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-zinc-300">
              {isEvent ? (
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
              ) : isGov ? (
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span>
                {isEvent
                  ? "UPCOMING FLAGSHIP EVENT"
                  : isGov
                  ? "EXECUTIVE GOVERNANCE MODULE"
                  : "CHARTERED STUDENT ORGANIZATION"}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Subtitle */}
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              {item.category}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
              {item.title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-cyan-400 mt-1">
              {item.subtitle}
            </p>
          </div>

          {/* Description & Metrics Grid */}
          <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>EXECUTIVE SYNOPSIS</span>
              <span className="text-emerald-400 font-bold">● ACTIVE IN PRISMA DB</span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {item.description}
            </p>

            {item.stats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {item.stats.map((st, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center"
                  >
                    <div className="text-[11px] font-mono font-bold text-zinc-400">
                      {st.label}
                    </div>
                    <div className={`text-sm font-extrabold mt-0.5 ${st.color}`}>
                      {st.val}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrimaryAction}
                className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  actionDone
                    ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300"
                    : "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105"
                }`}
              >
                {isEvent ? (
                  <>
                    <Ticket className="w-4 h-4 text-amber-300" />
                    <span>
                      {actionDone ? "✓ RSVP PASS ISSUED" : "🎫 Claim RSVP Pass"}
                    </span>
                  </>
                ) : isGov ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>✓ Verify Policy Audit</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-cyan-200" />
                    <span>
                      {actionDone ? "✓ In Club Orbit" : "+ Join Club Orbit"}
                    </span>
                  </>
                )}
              </button>

              <a
                href={item.ctaUrl || "/dashboard"}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-bold transition-colors flex items-center gap-2"
              >
                <span>{item.ctaLabel || "Open Full Module"}</span>
                <ExternalLink className="w-4 h-4 text-zinc-400" />
              </a>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-3 rounded-xl bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer w-full sm:w-auto text-center"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
