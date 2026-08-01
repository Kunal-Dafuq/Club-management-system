import React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ShieldAlert,
  WifiOff,
  ServerOff,
  RefreshCw,
  Home,
} from "lucide-react";

export default function ErrorStateModal({
  type = "network",
  title,
  message,
  onRetry,
  onBackHome,
}) {
  const ERROR_TYPES = {
    network: {
      icon: WifiOff,
      color: "text-amber-400",
      border: "border-amber-400/30",
      bg: "bg-amber-500/10",
      defaultTitle: "Network Connection Lost",
      defaultMsg: "We couldn't connect to the ClubPlanet OrgOS servers. Please check your internet connection.",
      btnText: "Retry Connection",
    },
    permission: {
      icon: ShieldAlert,
      color: "text-red-400",
      border: "border-red-400/30",
      bg: "bg-red-500/10",
      defaultTitle: "Permission Denied",
      defaultMsg: "You do not have the required Student Council or Committee Lead privileges to access this resource.",
      btnText: "Return to Dashboard",
    },
    server: {
      icon: ServerOff,
      color: "text-violet-400",
      border: "border-violet-400/30",
      bg: "bg-violet-500/10",
      defaultTitle: "Server Temporarily Unavailable",
      defaultMsg: "Our campus infrastructure is undergoing maintenance or high traffic. We'll be back shortly.",
      btnText: "Retry Now",
    },
    validation: {
      icon: AlertTriangle,
      color: "text-cyan-400",
      border: "border-cyan-400/30",
      bg: "bg-cyan-500/10",
      defaultTitle: "Validation Error",
      defaultMsg: "Some required form inputs were invalid. Please review your entries and try again.",
      btnText: "Correct Inputs",
    },
  };

  const preset = ERROR_TYPES[type] || ERROR_TYPES.network;
  const IconComponent = preset.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-desc"
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-3xl border border-white/15 bg-[#080B14] p-8 text-center space-y-4 shadow-2xl"
      >
        <div className={`w-16 h-16 rounded-2xl ${preset.bg} border ${preset.border} flex items-center justify-center mx-auto ${preset.color}`}>
          <IconComponent className="w-8 h-8" />
        </div>

        <h3 id="error-modal-title" className="text-lg font-extrabold text-white">
          {title || preset.defaultTitle}
        </h3>
        <p id="error-modal-desc" className="text-xs text-zinc-400 leading-relaxed">
          {message || preset.defaultMsg}
        </p>

        <div className="flex items-center justify-center gap-3 pt-4">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{preset.btnText}</span>
            </button>
          )}
          {onBackHome && (
            <button
              onClick={onBackHome}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
