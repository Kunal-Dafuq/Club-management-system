import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Users,
  Calendar,
  CheckSquare,
  DollarSign,
  Radio,
  Plus,
  ArrowRight,
  Shield,
  Activity,
  CheckCircle2,
  Clock,
  X,
  TrendingUp,
  Award,
  Send,
  UserCheck,
} from "lucide-react";
import useAuth from "../contexts/AuthContext";
import GlassCard from "../components/ui/GlassCard";
import GlowButton from "../components/ui/GlowButton";
import { CLUBS_DATA, EVENTS_DATA } from "../constants/landingData";

const WORKSPACE_TABS = [
  { id: "overview", name: "Overview & Telemetry", icon: Activity },
  { id: "kanban", name: "Committee Kanban Board", icon: CheckSquare },
  { id: "budget", name: "Budget & Requisitions", icon: DollarSign },
  { id: "roster", name: "Member Roster & Leads", icon: Users },
];

const INITIAL_TASKS = [
  {
    id: "t1",
    title: "Autonomous Drone Firmware V2.4",
    committee: "Robotics Core Tech",
    assignee: "Sneha Verma",
    status: "IN_PROGRESS",
    priority: "HIGH",
    color: "#06B6D4",
  },
  {
    id: "t2",
    title: "Sponsor Pitch Deck for HackPlanet",
    committee: "Corporate Relations",
    assignee: "Devika Nair",
    status: "TODO",
    priority: "URGENT",
    color: "#7C3AED",
  },
  {
    id: "t3",
    title: "Order 20 LiPo Batteries & ESCs",
    committee: "Hardware Procurement",
    assignee: "Aarav Mehta",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    color: "#06B6D4",
  },
  {
    id: "t4",
    title: "Symphony Night Sound System Setup",
    committee: "Stage & Acoustics",
    assignee: "Kabir Sen",
    status: "COMPLETED",
    priority: "HIGH",
    color: "#F59E0B",
  },
  {
    id: "t5",
    title: "Publish NAAC Student Activity Report",
    committee: "Faculty Governance",
    assignee: "Dr. Rajesh Sharma",
    status: "COMPLETED",
    priority: "HIGH",
    color: "#EC4899",
  },
];

const INITIAL_BUDGET = [
  {
    id: "b1",
    title: "Robotics Rover Carbon Fiber Chassis",
    club: "Robotics Club",
    amount: "$1,250",
    requester: "Aarav Mehta",
    status: "APPROVED",
    date: "2 hours ago",
    color: "#06B6D4",
  },
  {
    id: "b2",
    title: "HackPlanet Cloud GPU Compute Credits",
    club: "AI & ML Club",
    amount: "$850",
    requester: "Rohan Iyer",
    status: "PENDING",
    date: "1 day ago",
    color: "#7C3AED",
  },
  {
    id: "b3",
    title: "Acoustic Drum Kit & PA System",
    club: "Music Club",
    amount: "$920",
    requester: "Kabir Sen",
    status: "APPROVED",
    date: "3 days ago",
    color: "#F59E0B",
  },
  {
    id: "b4",
    title: "Annual Magazine Publishing & Print",
    club: "Literary Club",
    amount: "$600",
    requester: "Siddharth Bose",
    status: "REVIEWING",
    date: "Just now",
    color: "#8B5CF6",
  },
];

const ANNOUNCEMENTS = [
  {
    id: "a1",
    author: "Administration Command",
    club: "OrgOS System Broadcast",
    content:
      "All student organizations must submit their semester budget requisitions by Friday 5:00 PM.",
    time: "10 mins ago",
    color: "#06B6D4",
  },
  {
    id: "a2",
    author: "Aarav Mehta (Lead)",
    club: "Robotics Club",
    content:
      "New ROS2 LiDAR sensor kit has arrived in Room 204. Committee leaders meet at 6:00 PM for hardware inspection.",
    time: "2 hours ago",
    color: "#7C3AED",
  },
  {
    id: "a3",
    author: "Kunal Dev (President)",
    club: "Coding Club",
    content:
      "HackPlanet 24-Hour AI Hackathon registrations have crossed 180 teams! Ensure mentor rosters are finalized.",
    time: "4 hours ago",
    color: "#EC4899",
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [budgetList, setBudgetList] = useState(INITIAL_BUDGET);
  const [toastMessage, setToastMessage] = useState(null);

  // Modals for quick actions
  const [modalType, setModalType] = useState(null); // 'broadcast' | 'task' | 'budget'
  const [newBroadcastText, setNewBroadcastText] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newBudgetTitle, setNewBudgetTitle] = useState("");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const moveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    showToast(`Task moved to ${newStatus}`);
  };

  const approveBudget = (id) => {
    setBudgetList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "APPROVED" } : b))
    );
    showToast("Requisition approved & logged to campus ledger.");
  };

  const handleCreateAction = (e) => {
    e.preventDefault();
    if (modalType === "broadcast" && newBroadcastText) {
      showToast("Broadcast transmitted to 1,420 members across channels!");
      setNewBroadcastText("");
    } else if (modalType === "task" && newTaskTitle) {
      setTasks((prev) => [
        {
          id: `t-${Date.now()}`,
          title: newTaskTitle,
          committee: "Executive Command",
          assignee: user?.name || "Kunal",
          status: "TODO",
          priority: "HIGH",
          color: "#06B6D4",
        },
        ...prev,
      ]);
      showToast("New task created on Kanban board!");
      setNewTaskTitle("");
    } else if (modalType === "budget" && newBudgetTitle && newBudgetAmount) {
      setBudgetList((prev) => [
        {
          id: `b-${Date.now()}`,
          title: newBudgetTitle,
          club: "Robotics Club",
          amount: `$${newBudgetAmount}`,
          requester: user?.name || "Kunal",
          status: "PENDING",
          date: "Just now",
          color: "#06B6D4",
        },
        ...prev,
      ]);
      showToast("Budget requisition submitted to Faculty Board.");
      setNewBudgetTitle("");
      setNewBudgetAmount("");
    }
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-white pt-24 pb-28 px-6 selection:bg-cyan-500/30 selection:text-white">
      {/* Floating Feedback Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 px-5 py-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 backdrop-blur-xl flex items-center gap-2.5 text-cyan-300 font-semibold text-sm shadow-[0_0_30px_rgba(6,182,212,0.4)]"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* =========================================================
            1. EXECUTIVE COMMAND HEADER
        ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-xs font-mono font-bold text-cyan-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                EXECUTIVE WORKSPACE // {user?.role || "PRESIDENT"} COMMAND
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Welcome back, {user?.name || "Kunal"}
            </h1>
            <p className="text-zinc-400 mt-2 text-base max-w-2xl">
              Sprint 14: Technical Championship & Fest Preparation • All 9
              chartered campus organizations operational.
            </p>
          </div>

          {/* Quick Action Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setModalType("broadcast")}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>+ Broadcast</span>
            </button>
            <button
              onClick={() => setModalType("task")}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4 text-violet-400" />
              <span>+ New Task</span>
            </button>
            <GlowButton
              size="sm"
              variant="primary"
              onClick={() => setModalType("budget")}
            >
              + Requisition Budget
            </GlowButton>
          </div>
        </div>

        {/* =========================================================
            2. EXECUTIVE METRIC CARDS
        ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard className="p-6 border-white/10">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
              <span>CHARTERED CLUBS</span>
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              9 Active
            </div>
            <div className="text-xs text-emerald-400 font-mono mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+2 New This Semester</span>
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/10">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
              <span>CAMPUS MEMBERSHIPS</span>
              <Users className="w-4 h-4 text-violet-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              1,420
            </div>
            <div className="text-xs text-cyan-400 font-mono mt-2">
              98% Active Roster Telemetry
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/10">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
              <span>COMMITTEE TASKS</span>
              <CheckSquare className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              24 Active
            </div>
            <div className="text-xs text-zinc-400 font-mono mt-2">
              8 Tasks Completed Today
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/10">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
              <span>BUDGET APPROVED</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">
              $12,450
            </div>
            <div className="text-xs text-amber-400 font-mono mt-2">
              $2,100 Pending Review
            </div>
          </GlassCard>
        </div>

        {/* =========================================================
            3. WORKSPACE NAVIGATION TABS
        ========================================================= */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
          {WORKSPACE_TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================
            4. TAB CONTENT AREA
        ========================================================= */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Live Activity Feed & Flagship Events */}
            <div className="lg:col-span-8 space-y-8">
              {/* Activity Chart Card */}
              <GlassCard className="p-7 border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Campus Engagement Telemetry
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Daily active member attendance and RSVP velocity over the past 7 days
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    REALTIME SYNC
                  </span>
                </div>

                {/* Animated Activity Bar Chart */}
                <div className="grid grid-cols-7 gap-3 items-end h-44 pt-6 px-2">
                  {[
                    { day: "MON", value: 65, label: "650" },
                    { day: "TUE", value: 45, label: "450" },
                    { day: "WED", value: 85, label: "850" },
                    { day: "THU", value: 95, label: "950" },
                    { day: "FRI", value: 100, label: "1,420" },
                    { day: "SAT", value: 75, label: "750" },
                    { day: "SUN", value: 90, label: "900" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center gap-2 h-full justify-end group"
                    >
                      <span className="text-[10px] font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.label}
                      </span>
                      <div
                        className="w-full rounded-xl bg-gradient-to-t from-cyan-600/40 via-cyan-500 to-violet-500 transition-all duration-500 group-hover:brightness-125"
                        style={{ height: `${item.value}%` }}
                      />
                      <span className="text-xs font-mono text-zinc-400">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Upcoming Events Management Box */}
              <GlassCard className="p-7 border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">
                    Upcoming Flagship Events
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">
                    6 Events Scheduled →
                  </span>
                </div>

                <div className="space-y-3">
                  {EVENTS_DATA.slice(0, 3).map((evt) => (
                    <div
                      key={evt.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 hover:border-cyan-400/40 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono text-xs font-bold shrink-0"
                          style={{
                            backgroundColor: `${evt.color}20`,
                            color: evt.color,
                            border: `1px solid ${evt.color}50`,
                          }}
                        >
                          <span>{evt.date.split(",")[0].split(" ")[0]}</span>
                          <span className="text-sm">
                            {evt.date.split(",")[0].split(" ")[1]}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">
                            {evt.title}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            {evt.venue} • {evt.club}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-mono font-bold text-white">
                          {evt.registered} / {evt.capacity} Registered
                        </div>
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded uppercase mt-1 inline-block"
                          style={{
                            backgroundColor: `${evt.color}25`,
                            color: evt.color,
                          }}
                        >
                          {evt.badge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Right Column: Centralized Announcement Stream */}
            <div className="lg:col-span-4 space-y-6">
              <GlassCard className="p-6 border-white/10 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-cyan-400" />
                    <span>Live Broadcasts</span>
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="space-y-4">
                  {ANNOUNCEMENTS.map((ann) => (
                    <div
                      key={ann.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: `${ann.color}25`,
                            color: ann.color,
                          }}
                        >
                          {ann.club}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {ann.time}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-200 leading-relaxed">
                        {ann.content}
                      </p>

                      <div className="text-[11px] font-semibold text-zinc-400 pt-1 border-t border-white/5">
                        By {ann.author}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: COMMITTEE KANBAN TASK BOARD
        ========================================================= */}
        {activeTab === "kanban" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">
                Manage tasks across student committees, hardware procurement, and fest operations.
              </p>
              <button
                onClick={() => setModalType("task")}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Create Task</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { key: "TODO", label: "TO DO (QUEUE)", color: "#7C3AED" },
                { key: "IN_PROGRESS", label: "IN PROGRESS", color: "#06B6D4" },
                { key: "COMPLETED", label: "COMPLETED", color: "#10B981" },
              ].map((col) => {
                const colTasks = tasks.filter((t) => t.status === col.key);
                return (
                  <GlassCard
                    key={col.key}
                    className="p-5 border-white/10 space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span
                        className="text-xs font-mono font-bold uppercase tracking-wider"
                        style={{ color: col.color }}
                      >
                        {col.label}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-mono">
                        {colTasks.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {colTasks.map((t) => (
                        <div
                          key={t.id}
                          className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 hover:border-white/30 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className="text-[10px] font-mono px-2 py-0.5 rounded"
                              style={{
                                backgroundColor: `${t.color}22`,
                                color: t.color,
                              }}
                            >
                              {t.committee}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400 font-bold">
                              {t.priority}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white">
                            {t.title}
                          </h4>

                          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/5">
                            <span>{t.assignee}</span>

                            <div className="flex items-center gap-1">
                              {col.key !== "TODO" && (
                                <button
                                  onClick={() =>
                                    moveTask(
                                      t.id,
                                      col.key === "COMPLETED"
                                        ? "IN_PROGRESS"
                                        : "TODO"
                                    )
                                  }
                                  className="p-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300"
                                  title="Move Back"
                                >
                                  ←
                                </button>
                              )}
                              {col.key !== "COMPLETED" && (
                                <button
                                  onClick={() =>
                                    moveTask(
                                      t.id,
                                      col.key === "TODO"
                                        ? "IN_PROGRESS"
                                        : "COMPLETED"
                                    )
                                  }
                                  className="p-1 rounded bg-cyan-500/20 text-cyan-300"
                                  title="Advance Status"
                                >
                                  →
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: BUDGET & REQUISITIONS
        ========================================================= */}
        {activeTab === "budget" && (
          <GlassCard className="p-7 border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Campus Requisition Ledger
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Transparent immutable record of club expenditures and hardware purchases.
                </p>
              </div>
              <GlowButton
                size="sm"
                variant="primary"
                onClick={() => setModalType("budget")}
              >
                + Requisition Budget
              </GlowButton>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-mono text-zinc-400 uppercase">
                    <th className="py-3 px-4">Item Title</th>
                    <th className="py-3 px-4">Organization</th>
                    <th className="py-3 px-4">Requester</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  {budgetList.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-white">
                        {item.title}
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-zinc-300">
                        {item.club}
                      </td>
                      <td className="py-4 px-4 text-zinc-400">
                        {item.requester}
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-cyan-400">
                        {item.amount}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                            item.status === "APPROVED"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/40"
                              : "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {item.status !== "APPROVED" ? (
                          <button
                            onClick={() => approveBudget(item.id)}
                            className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold cursor-pointer"
                          >
                            Approve Requisition
                          </button>
                        ) : (
                          <span className="text-xs font-mono text-zinc-500">
                            Logged ✓
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {/* =========================================================
            TAB 4: MEMBER ROSTER & LEADERSHIP
        ========================================================= */}
        {activeTab === "roster" && (
          <GlassCard className="p-7 border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Active Leadership Roster
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Chartered Presidents, Vice Presidents, and Committee Leads
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-violet-500/20 text-violet-300 border border-violet-400">
                18 Executive Leaders
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  name: "Aarav Mehta",
                  role: "President & Technical Lead",
                  club: "Robotics Club",
                  color: "#06B6D4",
                },
                {
                  name: "Kunal Dev",
                  role: "President",
                  club: "Coding Club",
                  color: "#7C3AED",
                },
                {
                  name: "Sneha Verma",
                  role: "Mechatronics Head",
                  club: "Robotics Club",
                  color: "#06B6D4",
                },
                {
                  name: "Rohan Iyer",
                  role: "AI Research Lead",
                  club: "AI & ML Club",
                  color: "#EC4899",
                },
                {
                  name: "Kabir Sen",
                  role: "Band Lead & Coordinator",
                  club: "Music Club",
                  color: "#F59E0B",
                },
                {
                  name: "Neeraj Chopra",
                  role: "E-Cell President",
                  club: "Entrepreneurship Cell",
                  color: "#3B82F6",
                },
              ].map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                      style={{
                        backgroundColor: `${member.color}25`,
                        color: member.color,
                        border: `1px solid ${member.color}50`,
                      }}
                    >
                      {member.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {member.name}
                      </h4>
                      <p className="text-xs text-zinc-400">{member.role}</p>
                    </div>
                  </div>

                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${member.color}22`,
                      color: member.color,
                    }}
                  >
                    {member.club.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>

      {/* =========================================================
          INTERACTIVE ACTION MODALS (BROADCAST / TASK / BUDGET)
      ========================================================= */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalType(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl border border-cyan-400/50 bg-[#0A0D18]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white">
                  {modalType === "broadcast" && "Transmit System Broadcast"}
                  {modalType === "task" && "Create Committee Kanban Task"}
                  {modalType === "budget" && "Submit Requisition Request"}
                </h3>
                <button
                  onClick={() => setModalType(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateAction} className="space-y-4">
                {modalType === "broadcast" && (
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                      Announcement Message (Multi-Channel)
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={newBroadcastText}
                      onChange={(e) => setNewBroadcastText(e.target.value)}
                      placeholder="Enter announcement to broadcast via WhatsApp, Discord, and Push..."
                      className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}

                {modalType === "task" && (
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                      Task Title & Objective
                    </label>
                    <input
                      type="text"
                      required
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="e.g. Upgrade Drone Flight Controller Firmware..."
                      className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}

                {modalType === "budget" && (
                  <>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                        Requisition Item / Purpose
                      </label>
                      <input
                        type="text"
                        required
                        value={newBudgetTitle}
                        onChange={(e) => setNewBudgetTitle(e.target.value)}
                        placeholder="e.g. Robotics Rover Carbon Fiber Parts..."
                        className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                        Estimated Amount ($ USD)
                      </label>
                      <input
                        type="number"
                        required
                        value={newBudgetAmount}
                        onChange={(e) => setNewBudgetAmount(e.target.value)}
                        placeholder="e.g. 1200"
                        className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </>
                )}

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 transition-transform"
                  >
                    Confirm Transmission
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;