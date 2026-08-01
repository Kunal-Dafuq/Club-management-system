import { useState } from "react";
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
  CheckCircle2,
  X,
  TrendingUp,
  Shield,
  Send,
  ExternalLink,
  MoreHorizontal,
  ChevronRight,
  Filter,
} from "lucide-react";
import useAuth from "../contexts/AuthContext";
import GlassCard from "../components/ui/GlassCard";
import RoleGovernanceBar from "../components/ui/RoleGovernanceBar";
import { useOrgRole } from "../hooks/useOrgRole";
import { EVENTS_DATA } from "../constants/landingData";

const WORKSPACE_TABS = [
  { id: "overview", name: "Overview" },
  { id: "kanban", name: "Tasks" },
  { id: "budget", name: "Requisitions" },
  { id: "roster", name: "Roster" },
];

const INITIAL_TASKS = [
  {
    id: "t1",
    title: "Autonomous Drone Flight Firmware v2.4",
    committee: "Robotics Core",
    assignee: "Sneha Verma",
    status: "IN_PROGRESS",
    priority: "High",
  },
  {
    id: "t2",
    title: "Sponsor Pitch Deck for HackPlanet 2026",
    committee: "Corporate Relations",
    assignee: "Devika Nair",
    status: "TODO",
    priority: "Urgent",
  },
  {
    id: "t3",
    title: "Order 20 LiPo Batteries & ESC Units",
    committee: "Hardware Procurement",
    assignee: "Aarav Mehta",
    status: "IN_PROGRESS",
    priority: "Medium",
  },
  {
    id: "t4",
    title: "Symphony Night Sound System Setup",
    committee: "Stage & Acoustics",
    assignee: "Kabir Sen",
    status: "COMPLETED",
    priority: "High",
  },
  {
    id: "t5",
    title: "Publish NAAC Student Activity Report",
    committee: "Faculty Governance",
    assignee: "Dr. Rajesh Sharma",
    status: "COMPLETED",
    priority: "High",
  },
];

const INITIAL_BUDGET = [
  {
    id: "b1",
    title: "Quadcopter Flight Controller & Stencils",
    club: "Electroholics",
    amount: "₹45,000",
    requester: "Sneha Verma",
    status: "APPROVED",
    date: "2h ago",
  },
  {
    id: "b2",
    title: "Telescope Motorized Equatorial Mount",
    club: "Astronuts",
    amount: "₹68,500",
    requester: "Rohan Iyer",
    status: "PENDING",
    date: "1d ago",
  },
  {
    id: "b3",
    title: "Runway Lighting & Fashion Costumes",
    club: "Muse",
    amount: "₹32,000",
    requester: "Tanvi Nair",
    status: "APPROVED",
    date: "3d ago",
  },
  {
    id: "b4",
    title: "Annual Parliamentary Debate Trophies",
    club: "LDA",
    amount: "₹18,000",
    requester: "Siddharth Bose",
    status: "REVIEWING",
    date: "Just now",
  },
];

const ANNOUNCEMENTS = [
  {
    id: "a1",
    author: "Administration Command",
    club: "IIIT-Delhi Student Council",
    content:
      "All student organizations must submit semester budget requisitions and itemized audit ledgers by Friday 5:00 PM.",
    time: "10m ago",
  },
  {
    id: "a2",
    author: "Sneha Verma",
    club: "Electroholics",
    content:
      "New PCB assembly and soldering station is live in ECE Lab 204. All hardware leads meet at 6:00 PM.",
    time: "2h ago",
  },
  {
    id: "a3",
    author: "Kunal Dev",
    club: "Foobar",
    content:
      "IIITD ProCon 2026 Competitive Coding registrations have crossed 180 teams. Ensure problem testcases are finalized.",
    time: "4h ago",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [budgetList, setBudgetList] = useState(INITIAL_BUDGET);
  const [toastMessage, setToastMessage] = useState(null);
  const { canInitiateGovernedActions, role } = useOrgRole();

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

  const openGovernedAction = (type, actionLabel) => {
    if (canInitiateGovernedActions) {
      setModalType(type);
    } else {
      showToast(
        `🔒 Restricted (${role}): Apart from Super-Admins and Admins, ONLY Club Presidents can initiate ${actionLabel}.`
      );
    }
  };

  const moveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    showToast(`Task updated to ${newStatus}`);
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
      showToast("Broadcast transmitted to 1,420 members across channels.");
      setNewBroadcastText("");
    } else if (modalType === "task" && newTaskTitle) {
      setTasks((prev) => [
        {
          id: `t-${Date.now()}`,
          title: newTaskTitle,
          committee: "Executive Command",
          assignee: user?.name || "Kunal",
          status: "TODO",
          priority: "High",
        },
        ...prev,
      ]);
      showToast("New task created on Kanban board.");
      setNewTaskTitle("");
    } else if (modalType === "budget" && newBudgetTitle && newBudgetAmount) {
      setBudgetList((prev) => [
        {
          id: `b-${Date.now()}`,
          title: newBudgetTitle,
          club: "IIIT-Delhi Charter",
          amount: `₹${Number(newBudgetAmount).toLocaleString("en-IN")}`,
          requester: user?.name || "Kunal",
          status: "PENDING",
          date: "Just now",
        },
        ...prev,
      ]);
      showToast("Budget requisition submitted for SAC audit.");
      setNewBudgetTitle("");
      setNewBudgetAmount("");
    }
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-white selection:bg-white/20 selection:text-white pb-24">
      {/* Sleek Floating Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed top-24 right-8 z-50 px-4 py-2.5 rounded-xl bg-black/80 border border-white/10 backdrop-blur-2xl flex items-center gap-2.5 text-zinc-200 text-xs shadow-2xl"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-12">
        <RoleGovernanceBar />

        {/* =========================================================
            1. MINIMALIST APPLE/VERCEL HEADER
            - Generous whitespace
            - EXACTLY ONE primary CTA (+ New Requisition)
            - Muted secondary ghost actions
        ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2 border-b border-white/[0.06]">
          <div className="space-y-1.5">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              IIIT-DELHI CHARTER // EXECUTIVE COMMAND
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Welcome back, {user?.name || "Kunal"}
            </h1>
            <p className="text-sm text-zinc-500 max-w-xl font-normal">
              Sprint 14: All 9 chartered organizations operational.
            </p>
          </div>

          {/* Action Group: ONE Dominant Primary CTA + Subtle Secondary Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href="/campus-portal"
              className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-xs font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>3D Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            <button
              onClick={() => setModalType("broadcast")}
              className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Broadcast
            </button>

            <button
              onClick={() => openGovernedAction("task", "Tasks")}
              className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              New Task
            </button>

            {/* SINGLE VISUALLY DOMINANT PRIMARY CTA */}
            <button
              onClick={() => openGovernedAction("budget", "Budget Requisitions")}
              className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 text-xs transition-all shadow-sm cursor-pointer"
            >
              + New Requisition
            </button>
          </div>
        </div>

        {/* =========================================================
            2. HIGH-CONTRAST OVERVIEW TELEMETRY (4 SPACIOUS CARDS)
            - No loud colored borders or nested badges
            - Aggressively muted labels & subtitles
        ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.05] space-y-1">
            <div className="text-xs text-zinc-500 font-normal">
              Chartered Clubs
            </div>
            <div className="text-3xl font-semibold text-white tracking-tight">
              9 Active
            </div>
            <div className="text-xs text-zinc-500 font-normal pt-1">
              +2 new this semester
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.05] space-y-1">
            <div className="text-xs text-zinc-500 font-normal">
              Campus Memberships
            </div>
            <div className="text-3xl font-semibold text-white tracking-tight">
              1,420
            </div>
            <div className="text-xs text-zinc-500 font-normal pt-1">
              98% roster telemetry
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.05] space-y-1">
            <div className="text-xs text-zinc-500 font-normal">
              Kanban Velocity
            </div>
            <div className="text-3xl font-semibold text-white tracking-tight">
              24 Active
            </div>
            <div className="text-xs text-zinc-500 font-normal pt-1">
              8 completed today
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.05] space-y-1">
            <div className="text-xs text-zinc-500 font-normal">
              Approved Budget
            </div>
            <div className="text-3xl font-semibold text-white tracking-tight">
              ₹1,25,000
            </div>
            <div className="text-xs text-zinc-500 font-normal pt-1">
              SAC audited ledger
            </div>
          </div>
        </div>

        {/* =========================================================
            3. MINIMALIST TABS (Vercel / Linear Style)
            - No loud gradients
            - Sleek underline indicator
        ========================================================= */}
        <div className="flex items-center gap-6 border-b border-white/[0.06] text-sm">
          {WORKSPACE_TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 font-medium transition-colors cursor-pointer relative ${
                  active
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span>{tab.name}</span>
                {active && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* =========================================================
            4. TAB CONTENT: OVERVIEW
            - Eliminate nested border boxes
            - Subtle row hover opacity shifts
        ========================================================= */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Flagship Events & Telemetry */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">
                    Upcoming Flagship Events
                  </h3>
                  <a
                    href="/events"
                    className="text-xs text-zinc-500 hover:text-white transition-colors"
                  >
                    View calendar →
                  </a>
                </div>

                {/* Uncluttered, Borderless Rows with Subtle Hover Shift */}
                <div className="divide-y divide-white/[0.05]">
                  {EVENTS_DATA.slice(0, 4).map((evt) => (
                    <div
                      key={evt.id}
                      className="py-4 flex items-center justify-between group transition-colors hover:bg-white/[0.015] -mx-3 px-3 rounded-xl"
                    >
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium text-white">
                          {evt.title}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {evt.club} • {evt.venue}
                        </div>
                      </div>

                      <div className="text-right space-y-0.5">
                        <div className="text-xs font-mono text-zinc-400">
                          {evt.registered} / {evt.capacity}
                        </div>
                        <div className="text-[11px] text-zinc-600">
                          {evt.date.split(",")[0]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Telemetry Bar */}
              <div className="p-7 rounded-3xl bg-white/[0.015] border border-white/[0.05] space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      Campus Engagement Telemetry
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      7-day member check-in velocity
                    </p>
                  </div>
                  <span className="text-xs font-mono text-zinc-600">1,420 max</span>
                </div>

                <div className="grid grid-cols-7 gap-3 items-end h-28 pt-4">
                  {[
                    { day: "M", value: 50 },
                    { day: "T", value: 35 },
                    { day: "W", value: 70 },
                    { day: "T", value: 85 },
                    { day: "F", value: 100 },
                    { day: "S", value: 60 },
                    { day: "S", value: 75 },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                      <div
                        className="w-full rounded-md bg-white/10 hover:bg-white/25 transition-all"
                        style={{ height: `${bar.value}%` }}
                      />
                      <span className="text-[11px] font-mono text-zinc-600">
                        {bar.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Qwen AI Telemetry & Announcement Stream */}
            <div className="lg:col-span-5 space-y-8">
              {/* Sleek Minimalist AI Insight */}
              <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Insight</span>
                  </span>
                  <span className="font-mono">98.4% Confidence</span>
                </div>
                <h4 className="text-sm font-medium text-white">
                  High RSVP Turnout Projected for Friday Hackathon
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                  RSVP velocity shows a +42% spike over last semester. Consider deploying 2 additional check-in scanners at Auditorium C-101.
                </p>
              </div>

              {/* Announcements Stream */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">
                  Recent Broadcasts
                </h3>

                <div className="divide-y divide-white/[0.05]">
                  {ANNOUNCEMENTS.map((ann) => (
                    <div
                      key={ann.id}
                      className="py-4 space-y-1 -mx-3 px-3 rounded-xl hover:bg-white/[0.015] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-300">
                          {ann.club}
                        </span>
                        <span className="text-xs text-zinc-600 font-mono">
                          {ann.time}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        {ann.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 5: KANBAN TASKS (Progressive Disclosure)
            - Show core info by default
            - Reveal status arrows & actions on row hover
        ========================================================= */}
        {activeTab === "kanban" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-500">
                Committee workstreams and task assignments.
              </p>
              <button
                onClick={() => setModalType("task")}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-zinc-300 transition-colors cursor-pointer"
              >
                + Create Task
              </button>
            </div>

            <div className="divide-y divide-white/[0.05]">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="py-4 flex items-center justify-between group -mx-3 px-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-white">
                      {t.title}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {t.committee} • Assignee: {t.assignee}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                        t.status === "COMPLETED"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : t.status === "IN_PROGRESS"
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      {t.status.replace("_", " ")}
                    </span>

                    {/* Progressive Disclosure Actions on Hover */}
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.status !== "TODO" && (
                        <button
                          onClick={() =>
                            moveTask(
                              t.id,
                              t.status === "COMPLETED" ? "IN_PROGRESS" : "TODO"
                            )
                          }
                          className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] text-zinc-400"
                        >
                          ←
                        </button>
                      )}
                      {t.status !== "COMPLETED" && (
                        <button
                          onClick={() =>
                            moveTask(
                              t.id,
                              t.status === "TODO" ? "IN_PROGRESS" : "COMPLETED"
                            )
                          }
                          className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[11px] text-zinc-200"
                        >
                          →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 6: BUDGET REQUISITION LEDGER (Clean Vercel Table)
            - Remove dividing borders around table
            - Muted timestamps & requester details
        ========================================================= */}
        {activeTab === "budget" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white">
                  Campus Requisition Ledger
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  SAC-audited transparent financial log
                </p>
              </div>
              <button
                onClick={() => openGovernedAction("budget", "Budget Requisitions")}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-zinc-300 transition-colors cursor-pointer"
              >
                + Requisition Budget
              </button>
            </div>

            <div className="divide-y divide-white/[0.05]">
              {budgetList.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex items-center justify-between group -mx-3 px-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-white">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {item.club} • Requested by {item.requester}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="font-mono text-sm font-medium text-white">
                      {item.amount}
                    </span>

                    <span
                      className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                        item.status === "APPROVED"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {item.status}
                    </span>

                    {/* Progressive Disclosure Button on Row Hover */}
                    {item.status !== "APPROVED" && (
                      <button
                        onClick={() => approveBudget(item.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-zinc-200 cursor-pointer"
                      >
                        Approve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 7: ROSTER (Uncluttered List)
        ========================================================= */}
        {activeTab === "roster" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">
                Leadership Roster
              </h3>
              <span className="text-xs font-mono text-zinc-600">
                18 Executive Leads
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "Sneha Verma", role: "President & Lead", club: "Electroholics" },
                { name: "Kunal Dev", role: "President", club: "Foobar" },
                { name: "Rohan Iyer", role: "Astrophysics Lead", club: "Astronuts" },
                { name: "Tanvi Nair", role: "Design Head", club: "Muse" },
                { name: "Siddharth Bose", role: "Parliamentary Speaker", club: "LDA" },
                { name: "Priya Patel", role: "Photography Coordinator", club: "Tasveer" },
              ].map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.015] hover:bg-white/[0.03] transition-colors flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-white">
                      {member.name}
                    </div>
                    <div className="text-xs text-zinc-500">{member.role}</div>
                  </div>
                  <span className="text-xs font-mono text-zinc-600">
                    {member.club}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================
          MINIMALIST APPLE/VERCEL MODALS
          - Uncluttered inputs
          - Subtle borders
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
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0A0D16] p-7 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-white">
                  {modalType === "broadcast" && "Broadcast Announcement"}
                  {modalType === "task" && "Create Task"}
                  {modalType === "budget" && "New Requisition Request"}
                </h3>
                <button
                  onClick={() => setModalType(null)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateAction} className="space-y-4">
                {modalType === "broadcast" && (
                  <textarea
                    rows={4}
                    required
                    value={newBroadcastText}
                    onChange={(e) => setNewBroadcastText(e.target.value)}
                    placeholder="Enter announcement text..."
                    className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20"
                  />
                )}

                {modalType === "task" && (
                  <input
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Task objective..."
                    className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20"
                  />
                )}

                {modalType === "budget" && (
                  <>
                    <input
                      type="text"
                      required
                      value={newBudgetTitle}
                      onChange={(e) => setNewBudgetTitle(e.target.value)}
                      placeholder="Item purpose..."
                      className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20"
                    />
                    <input
                      type="number"
                      required
                      value={newBudgetAmount}
                      onChange={(e) => setNewBudgetAmount(e.target.value)}
                      placeholder="Amount (₹ INR)..."
                      className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20"
                    />
                  </>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 rounded-xl text-xs text-zinc-500 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 text-xs transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}