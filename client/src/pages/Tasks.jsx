import { useState, useMemo } from "react";
import {
  CheckSquare,
  Filter,
  Plus,
  Sparkles,
  Layers,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Users,
  Search,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AutoCompleteSearch from "../components/ui/AutoCompleteSearch";
import RoleGovernanceBar from "../components/ui/RoleGovernanceBar";

const INITIAL_KANBAN = {
  TODO: [
    {
      id: "t-1",
      title: "ROS2 Autonomous Drone Firmware V2.4",
      committee: "Robotics Core Tech",
      priority: "URGENT",
      priorityColor: "bg-red-500/20 text-red-300 border-red-500/40",
      assignee: "Sneha Verma",
      date: "July 29",
      comments: 4,
    },
    {
      id: "t-2",
      title: "ABACUS Society Quantitative Model Review",
      committee: "ABACUS Quant Society",
      priority: "HIGH",
      priorityColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      assignee: "Anirudh Sharma",
      date: "July 30",
      comments: 2,
    },
  ],
  IN_PROGRESS: [
    {
      id: "t-3",
      title: "Sponsor Pitch Deck for HackPlanet 2026",
      committee: "Corporate Relations",
      priority: "HIGH",
      priorityColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      assignee: "Kunal Dev",
      date: "July 28",
      comments: 7,
    },
    {
      id: "t-4",
      title: "Order 20 LiPo Batteries & ESC Controllers",
      committee: "Hardware Procurement",
      priority: "URGENT",
      priorityColor: "bg-red-500/20 text-red-300 border-red-500/40",
      assignee: "Rohan Iyer",
      date: "July 27",
      comments: 11,
    },
  ],
  REVIEW: [
    {
      id: "t-5",
      title: "Symphony Night 32-Channel Mixer Sound Check",
      committee: "Stage & Acoustics",
      priority: "MEDIUM",
      priorityColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      assignee: "Kabir Sen",
      date: "July 26",
      comments: 3,
    },
  ],
  COMPLETED: [
    {
      id: "t-6",
      title: "Publish NAAC Student Activity Report 2026",
      committee: "Faculty Governance",
      priority: "HIGH",
      priorityColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      assignee: "Dr. Rajesh Sharma",
      date: "July 24",
      comments: 5,
    },
  ],
};

const FILTER_COMMITTEES = [
  "All Committees",
  "Robotics Core Tech",
  "ABACUS Quant Society",
  "Corporate Relations",
  "Hardware Procurement",
];

const Tasks = () => {
  const [board, setBoard] = useState(INITIAL_KANBAN);
  const [search, setSearch] = useState("");
  const [selectedCommittee, setSelectedCommittee] = useState("All Committees");
  const [selectedTaskModal, setSelectedTaskModal] = useState(null);

  const moveTaskToCompleted = (taskId, fromCol) => {
    setBoard((prev) => {
      const target = prev[fromCol].find((t) => t.id === taskId);
      if (!target) return prev;
      const rem = prev[fromCol].filter((t) => t.id !== taskId);
      return {
        ...prev,
        [fromCol]: rem,
        COMPLETED: [{ ...target, priority: "DONE", priorityColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" }, ...prev.COMPLETED],
      };
    });
  };

  const filteredBoard = useMemo(() => {
    const out = {};
    for (const col of Object.keys(board)) {
      out[col] = board[col].filter((t) => {
        const matchesSearch =
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.committee.toLowerCase().includes(search.toLowerCase());
        const matchesComm =
          selectedCommittee === "All Committees" ||
          t.committee === selectedCommittee;
        return matchesSearch && matchesComm;
      });
    }
    return out;
  }, [board, search, selectedCommittee]);

  const totalTasks = Object.values(board).flat().length;
  const completedCount = board.COMPLETED.length;
  const completionRate = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="space-y-8">
      <RoleGovernanceBar />
      {/* Task Modal */}
      <AnimatePresence>
        {selectedTaskModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-gradient-to-br from-[#0F1326] via-[#0A0D1A] to-[#14122C] border border-cyan-400/40 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${selectedTaskModal.priorityColor}`}>
                  {selectedTaskModal.priority} PRIORITY
                </span>
                <button
                  onClick={() => setSelectedTaskModal(null)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white">
                  {selectedTaskModal.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-1">
                  COMMITTEE: {selectedTaskModal.committee}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex justify-between text-xs font-mono text-zinc-300">
                  <span>ASSIGNEE</span>
                  <span className="font-bold text-white">{selectedTaskModal.assignee}</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-zinc-300">
                  <span>DUE DATE</span>
                  <span className="font-bold text-cyan-400">{selectedTaskModal.date}</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-zinc-300">
                  <span>STATUS</span>
                  <span className="font-bold text-emerald-400">ACTIVE IN SPRINT</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedTaskModal(null)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                Close Task View
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Linear-Style Workspace Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#0E1226] via-[#090D1A] to-[#120F2A] p-8 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-xs font-mono font-bold text-amber-400">
            <Layers className="w-3.5 h-3.5" />
            <span>LINEAR // COMMITTEE TASK KANBAN</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Sprint Task Board
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl">
            Autonomous committee kanban with priority colored badges, instant completion triggers, and self-fillable search.
          </p>
        </div>

        {/* Sprint Velocity Telemetry Pill */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <div className="text-center px-4 border-r border-white/10">
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">
              {completionRate}%
            </div>
            <div className="text-[10px] font-mono uppercase text-zinc-400">
              Sprint Velocity
            </div>
          </div>
          <div className="text-center px-4 border-r border-white/10">
            <div className="text-2xl font-extrabold text-white font-mono">
              {totalTasks}
            </div>
            <div className="text-[10px] font-mono uppercase text-zinc-400">
              Total Tasks
            </div>
          </div>
          <div className="text-center px-4">
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">
              {completedCount}
            </div>
            <div className="text-[10px] font-mono uppercase text-zinc-400">
              Completed
            </div>
          </div>
        </div>
      </div>

      {/* Filter Strip & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {FILTER_COMMITTEES.map((comm) => {
            const active = selectedCommittee === comm;
            return (
              <button
                key={comm}
                onClick={() => setSelectedCommittee(comm)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400/50"
                    : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10"
                }`}
              >
                {comm}
              </button>
            );
          })}
        </div>

        <div className="w-full lg:w-80">
          <AutoCompleteSearch
            items={Object.values(board)
              .flat()
              .map((t) => ({
                id: t.id,
                label: t.title,
                category: t.committee,
                raw: t,
              }))}
            placeholder="Search tasks (e.g. ABACUS...)"
            value={search}
            onChange={setSearch}
            onSelect={(item) => {
              if (item?.label) setSearch(item.label);
            }}
          />
        </div>
      </div>

      {/* 4-Column Dynamic Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { id: "TODO", title: "TODO", color: "border-zinc-500/40 text-zinc-300" },
          { id: "IN_PROGRESS", title: "IN PROGRESS", color: "border-cyan-500/50 text-cyan-300" },
          { id: "REVIEW", title: "IN REVIEW", color: "border-amber-500/50 text-amber-300" },
          { id: "COMPLETED", title: "COMPLETED", color: "border-emerald-500/50 text-emerald-300" },
        ].map((col) => {
          const columnTasks = filteredBoard[col.id] || [];
          return (
            <div
              key={col.id}
              className="rounded-3xl bg-[#090C17] border border-white/10 p-5 flex flex-col justify-between min-h-[480px]"
            >
              <div className="space-y-4">
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full border ${col.color} bg-current`} />
                    <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-white">
                      {col.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-zinc-300">
                    {columnTasks.length}
                  </span>
                </div>

                {/* Column Tasks */}
                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      onClick={() => setSelectedTaskModal(task)}
                      whileHover={{ scale: 1.02 }}
                      className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer shadow-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${task.priorityColor}`}
                        >
                          {task.priority}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {task.date}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                        {task.title}
                      </h4>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-zinc-400 font-mono">
                        <span className="truncate max-w-[120px]">
                          {task.committee}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-[9px]">
                            {task.assignee.slice(0, 2).toUpperCase()}
                          </span>

                          {col.id !== "COMPLETED" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveTaskToCompleted(task.id, col.id);
                              }}
                              title="Mark Completed"
                              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-zinc-400 hover:text-emerald-400 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Column Footer Add Button */}
              <button className="mt-4 w-full py-2.5 rounded-xl border border-dashed border-white/15 hover:border-cyan-400/50 text-zinc-400 hover:text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                <Plus className="w-3.5 h-3.5" />
                <span>NEW TASK</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;