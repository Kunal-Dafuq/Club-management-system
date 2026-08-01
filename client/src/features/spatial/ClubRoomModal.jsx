import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Users,
  Award,
  ShieldCheck,
  Zap,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Calendar,
  Ticket,
  Train,
} from "lucide-react";
import { spatialAudio } from "./audioManager";
import { useState } from "react";

export default function ClubRoomModal({ roomData, onClose }) {
  const [actionDone, setActionDone] = useState(false);
  const [toast, setToast] = useState(null);

  if (!roomData) return null;

  const isEvent = roomData.type === "EVENT";
  const isGov = roomData.type === "GOVERNANCE";

  const handlePrimaryAction = () => {
    spatialAudio.playClick();
    setActionDone(!actionDone);

    if (isEvent) {
      setToast(
        !actionDone
          ? "✓ RSVP Ticket #ORGOS-2026-8891 confirmed in Prisma DB!"
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
      <div className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl select-none font-mono">
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-10 right-10 z-50 px-5 py-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-bold text-xs flex items-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative max-w-2xl w-full p-8 rounded-3xl bg-gradient-to-br from-[#0E1228] via-[#090C1A] to-[#141230] border border-cyan-400/50 shadow-[0_0_60px_rgba(6,182,212,0.35)] space-y-6"
        >
          {/* Header Strip */}
          <div className="flex items-center justify-between">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${
                isEvent
                  ? "bg-amber-500/20 border-amber-400/50 text-amber-300"
                  : isGov
                  ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300"
                  : "bg-cyan-500/20 border-cyan-400/50 text-cyan-300"
              }`}
            >
              <Train className="w-4 h-4" />
              <span>
                {isEvent
                  ? "METRO STATION // UPCOMING EVENT ARENA"
                  : isGov
                  ? "METRO STATION // EXECUTIVE GOVERNANCE"
                  : "METRO STATION // CHARTERED CLUB POD"}
              </span>
            </div>

            <button
              onClick={() => {
                spatialAudio.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {roomData.title}
            </h2>
            <p
              className="text-xs mt-1 font-bold"
              style={{ color: roomData.color || "#06B6D4" }}
            >
              {roomData.subtitle}
            </p>
          </div>

          {/* Station Terminal Details */}
          <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>METRO TELEMETRY SHADER LOG</span>
              <span className="text-emerald-400 font-bold">● SYNCED WITH DB</span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              {roomData.details}
            </p>

            {/* 3 Metric Cards for this Station */}
            {roomData.stats && (
              <div className="grid grid-cols-3 gap-3 pt-2">
                {roomData.stats.map((st, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-center"
                  >
                    <div className="text-xs text-zinc-400 font-bold">
                      {st.label}
                    </div>
                    <div className={`text-sm font-bold mt-0.5 ${st.color}`}>
                      {st.val}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrimaryAction}
                className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  actionDone
                    ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300"
                    : "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                }`}
              >
                {isEvent ? (
                  <>
                    <Ticket className="w-4 h-4 text-amber-400" />
                    <span>
                      {actionDone ? "✓ RSVP PASS ISSUED" : "🎫 INSTANT RSVP"}
                    </span>
                  </>
                ) : isGov ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>✓ VERIFY POLICY AUDIT</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>
                      {actionDone ? "✓ IN CLUB ORBIT" : "+ JOIN CLUB ORBIT"}
                    </span>
                  </>
                )}
              </button>

              <a
                href={roomData.ctaUrl || "/dashboard"}
                onClick={() => spatialAudio.playClick()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:scale-105 text-white text-xs font-bold transition-transform flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <span>{roomData.ctaLabel || "Open 2D Module"}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => {
                spatialAudio.playClick();
                onClose();
              }}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-bold transition-colors flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Metro Rails</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
