import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  Ticket,
  Users,
  Sparkles,
  ArrowRight,
  X,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_NOTIFICATIONS = [
  {
    id: "n-1",
    group: "TODAY — ORGOS TELEMETRY",
    title: "HackPlanet 2026 Emergency GPU Requisition",
    source: "AI & ML Club + Robotics Core",
    time: "10:14 AM",
    priority: "ACTION REQUIRED",
    priorityColor: "border-red-500/50 text-red-300 bg-red-500/10",
    description:
      "Committee Leader Rohan Iyer submitted a requisition for $850 USD Equivalent Credits to provision 8x AWS Cloud GPU clusters for participants.",
    type: "budget",
    amount: "$850",
    read: false,
    status: "PENDING",
  },
  {
    id: "n-2",
    group: "TODAY — ORGOS TELEMETRY",
    title: "Symphony Night Acoustic Sound Check Confirmed",
    source: "Stage & Acoustics Committee",
    time: "09:30 AM",
    priority: "INFORMATION",
    priorityColor: "border-cyan-500/50 text-cyan-300 bg-cyan-500/10",
    description:
      "Room 104 Main Auditorium 32-channel acoustic mixer calibration completed. Rehearsal slots assigned to 14 campus bands.",
    type: "info",
    read: false,
    status: "CONFIRMED",
  },
  {
    id: "n-3",
    group: "YESTERDAY — BUDGET GOVERNANCE",
    title: "Robotics Rover LiDAR Sensor Order Approved",
    source: "Robotics Core Tech",
    time: "4:15 PM",
    priority: "BUDGET APPROVED",
    priorityColor: "border-violet-500/50 text-violet-300 bg-violet-500/10",
    description:
      "President Anirudh Sharma approved the purchase of 20x LiPo batteries and ESC motor controllers ($1,250).",
    type: "approved",
    read: true,
    status: "PROCESSED",
  },
  {
    id: "n-4",
    group: "EARLIER THIS WEEK — ORBIT MEMBERSHIPS",
    title: "ABACUS Society Quantitative Trading Contest RSVP",
    source: "ABACUS Society",
    time: "July 24",
    priority: "RSVP CONFIRMED",
    priorityColor: "border-emerald-500/50 text-emerald-300 bg-emerald-500/10",
    description:
      "Your Holographic Entry Pass (#ORGOS-2026-8891) for the algorithmic trading contest has been encrypted in database.",
    type: "rsvp",
    read: true,
    status: "ACTIVE PASS",
  },
];

const Notifications = () => {
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS);
  const [filterRead, setFilterRead] = useState("all"); // "all" | "unread"

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleAction = (id, newStatus) => {
    setItems((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: newStatus, read: true } : n
      )
    );
  };

  const filteredItems = items.filter((n) =>
    filterRead === "unread" ? !n.read : true
  );

  // Group items by time header
  const groups = [
    "TODAY — ORGOS TELEMETRY",
    "YESTERDAY — BUDGET GOVERNANCE",
    "EARLIER THIS WEEK — ORBIT MEMBERSHIPS",
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-violet-500/20 border border-violet-500/40 text-violet-300">
              ACTIVITY STREAM
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mt-1">
            Timeline Notifications
          </h1>
          <p className="text-zinc-400 mt-1 text-sm">
            Intelligent grouping with interactive executive actions and vertical timeline visualization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterRead(filterRead === "all" ? "unread" : "all")}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            {filterRead === "all" ? "Show Unread Only" : "Show All Activity"}
          </button>

          <button
            onClick={markAllRead}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform cursor-pointer"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Vertical Timeline Visualization */}
      <div className="relative space-y-10 pl-6 border-l-2 border-gradient-to-b from-cyan-400 via-violet-500 to-white/10 border-cyan-400/30">
        {groups.map((groupTitle) => {
          const groupItems = filteredItems.filter(
            (n) => n.group === groupTitle
          );
          if (groupItems.length === 0) return null;

          return (
            <div key={groupTitle} className="space-y-4 relative">
              {/* Timeline Group Dot */}
              <div className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />

              <div className="text-xs font-mono font-extrabold uppercase tracking-widest text-cyan-400">
                {groupTitle}
              </div>

              <div className="space-y-4">
                {groupItems.map((notif) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-6 rounded-3xl border transition-all shadow-xl space-y-4 ${
                      !notif.read
                        ? "bg-gradient-to-br from-[#10142A] via-[#0A0E1A] to-[#14122C] border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                        : "bg-[#090C17] border-white/10 text-zinc-300"
                    }`}
                  >
                    {/* Header Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase border ${notif.priorityColor}`}
                        >
                          {notif.priority}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          {notif.source}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-zinc-500">
                          {notif.time}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            notif.status === "PENDING"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-emerald-500/20 text-emerald-300"
                          }`}
                        >
                          {notif.status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-extrabold text-white">
                        {notif.title}
                      </h3>
                      <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
                        {notif.description}
                      </p>
                    </div>

                    {/* Interactive Action Buttons */}
                    {notif.type === "budget" && notif.status === "PENDING" && (
                      <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleAction(notif.id, "APPROVED & ALLOCATED")
                          }
                          className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-extrabold text-xs hover:scale-105 transition-transform cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve {notif.amount} Request</span>
                        </button>
                        <button
                          onClick={() =>
                            handleAction(notif.id, "DECLINED REQUEST")
                          }
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-zinc-300 hover:text-red-300 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;