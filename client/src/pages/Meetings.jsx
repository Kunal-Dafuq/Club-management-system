import { useState } from "react";
import {
  Radio,
  Play,
  Pause,
  Sparkles,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  Download,
  Share2,
  Volume2,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const MEETINGS_LIST = [
  {
    id: "m-101",
    title: "HackPlanet 2026 Emergency Infrastructure Check",
    club: "AI & ML Club + Robotics Core",
    date: "July 26, 2026 • 45 mins",
    attendees: 18,
    status: "PROCESSED",
    summary:
      "Agreed to provision 8x AWS Cloud GPU clusters for participant models. Robotics core will sponsor power distribution units.",
    actionItems: [
      { id: "a1", text: "Provision AWS EC2 P4d GPU instances", assignee: "Rohan Iyer", done: true },
      { id: "a2", text: "Finalize LiPo battery safety protocols", assignee: "Aarav Mehta", done: true },
      { id: "a3", text: "Send budget requisition to Executive Council", assignee: "Kunal Dev", done: false },
    ],
    transcript: [
      { time: "02:14", speaker: "Rohan Iyer", text: "We need at least 8 GPU nodes ready for 180 teams." },
      { time: "08:45", speaker: "Kunal Dev", text: "Agreed. I'll approve the $850 requisition from the AI Club budget." },
      { time: "19:12", speaker: "Sneha Verma", text: "Robotics will handle the power strips and LiDAR telemetry tables." },
    ],
  },
  {
    id: "m-102",
    title: "Symphony Night Acoustic & Stage Calibration",
    club: "Music Club (Crescendo)",
    date: "July 24, 2026 • 60 mins",
    attendees: 12,
    status: "PROCESSED",
    summary:
      "Stage sound engineers confirmed 32-channel mixer compatibility. Rehearsal slots assigned to 14 campus bands.",
    actionItems: [
      { id: "a4", text: "Book Main Auditorium for sound check", assignee: "Kabir Sen", done: true },
      { id: "a5", text: "Publish band performance schedule", assignee: "Ananya Rao", done: false },
    ],
    transcript: [
      { time: "05:10", speaker: "Kabir Sen", text: "The mixer in Room 104 is ready for Friday's rehearsal." },
    ],
  },
];

const Meetings = () => {
  const [selectedMeeting, setSelectedMeeting] = useState(MEETINGS_LIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("summary"); // "summary" | "transcript" | "actions"

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            AI Meeting Room & Transcripts
          </h1>
          <p className="text-zinc-400 mt-1 text-sm">
            Autonomous audio recording, real-time speech transcription, and action item extraction for committee leaders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-pink-500/20 border border-pink-500/40 text-pink-300 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>AI TRANSCRIBER ONLINE</span>
          </span>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Meeting List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-xs font-mono font-extrabold uppercase tracking-wider text-zinc-500 px-1">
            Recorded Sessions ({MEETINGS_LIST.length})
          </div>

          <div className="space-y-3">
            {MEETINGS_LIST.map((m) => {
              const active = selectedMeeting.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMeeting(m)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    active
                      ? "bg-gradient-to-br from-violet-950/40 via-[#0E1222] to-cyan-950/30 border-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.25)]"
                      : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 uppercase">
                      {m.club}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-zinc-300">
                      {m.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-2">
                    {m.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-zinc-400 mt-4 font-mono">
                    <span>{m.date}</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{m.attendees} peers</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Workspace & AI Player */}
        <div className="lg:col-span-8 space-y-6">
          {/* Interactive Audio Player & Waveform */}
          <div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-r from-[#0E1222] via-[#10162B] to-[#0E1222] shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">
                  {selectedMeeting.title}
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  {selectedMeeting.date}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Audio Waveform Simulator */}
            <div className="flex items-center gap-4 bg-black/50 p-4 rounded-2xl border border-white/5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 text-black flex items-center justify-center font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 transition-transform cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <div className="flex-1 flex items-center gap-1 h-8 overflow-hidden">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-all ${
                      isPlaying
                        ? "bg-gradient-to-t from-cyan-400 to-violet-400 animate-pulse"
                        : "bg-white/15"
                    }`}
                    style={{
                      height: `${Math.max(20, Math.sin(i * 0.4) * 80)}%`,
                    }}
                  />
                ))}
              </div>

              <span className="text-xs font-mono text-cyan-400 font-bold">
                {isPlaying ? "08:45 / 45:00" : "00:00 / 45:00"}
              </span>
            </div>
          </div>

          {/* AI Summary / Transcripts / Action Items Tabs */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              {[
                { id: "summary", label: "AI Executive Summary", icon: Sparkles },
                { id: "actions", label: "Action Items (Kanban Sync)", icon: CheckCircle2 },
                { id: "transcript", label: "Full Transcript Stream", icon: FileText },
              ].map((tab) => {
                const active = activeTab === tab.id;
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "text-zinc-400 hover:text-white bg-white/5 border border-white/5"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: AI Summary */}
            {activeTab === "summary" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-900/20 to-cyan-900/20 border border-violet-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase text-cyan-400">
                    <Sparkles className="w-4 h-4" />
                    <span>OrgOS Neural Analysis</span>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed">
                    {selectedMeeting.summary}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Action Items */}
            {activeTab === "actions" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {selectedMeeting.actionItems.map((act) => (
                  <div
                    key={act.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                          act.done
                            ? "bg-emerald-500 border-emerald-400 text-black"
                            : "border-white/30 text-transparent"
                        }`}
                      >
                        {act.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          act.done ? "line-through text-zinc-400" : "text-white"
                        }`}
                      >
                        {act.text}
                      </span>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/10 text-zinc-300">
                      {act.assignee}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tab 3: Transcript */}
            {activeTab === "transcript" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3 max-h-80 overflow-y-auto"
              >
                {selectedMeeting.transcript.map((line, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex gap-4"
                  >
                    <span className="text-xs font-mono text-cyan-400 font-bold shrink-0">
                      [{line.time}]
                    </span>
                    <div>
                      <span className="text-xs font-bold text-white mr-2">
                        {line.speaker}:
                      </span>
                      <span className="text-sm text-zinc-300">
                        {line.text}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetings;
