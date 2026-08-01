import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Wifi, RefreshCw } from "lucide-react";

export default function NetworkResilienceBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
    };

    const handleOnline = () => {
      setIsOnline(true);
      setShowRestored(true);
      const timer = setTimeout(() => setShowRestored(false), 4000);
      return () => clearTimeout(timer);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (isOnline && !showRestored) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className={`fixed top-0 left-0 right-0 z-[120] py-2 px-6 text-center text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg transition-colors ${
          isOnline
            ? "bg-emerald-500/90 text-black"
            : "bg-amber-500/90 text-black animate-pulse"
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4" />
            <span>
              [NETWORK RESILIENCE] Connection Restored • Re-syncing Socket.io & API Queues...
            </span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>
              [OFFLINE MODE] You are offline. Changes are queued locally and will sync automatically upon connection.
            </span>
            <RefreshCw className="w-3.5 h-3.5 animate-spin ml-2" />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
