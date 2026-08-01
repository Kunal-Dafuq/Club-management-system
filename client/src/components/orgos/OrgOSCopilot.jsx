import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  QrCode,
  Award,
  CalendarDays,
  DollarSign,
  Wand2,
  CheckCircle2,
  Copy,
  Building2,
  Users,
  TrendingUp,
  X,
  ChevronRight,
  GitBranch,
  FileText,
  Webhook,
  Activity,
  Shield,
  Layers,
  Database,
  Globe,
  Share2,
  History,
  Gauge,
  Cpu,
  Radio,
  Clock,
  Key,
  Box,
} from "lucide-react";

const AI_ANNOUNCEMENT_TEMPLATES = {
  Technical: {
    title: "🚀 Flagship AI & Robotics Hackathon 2026 Announcement",
    text: "Attention IIIT-Delhi Tech Community! Electroholics & Foobar are joining forces to host the annual 48-Hour Systems & AI Hackathon. Assemble your teams, claim your GPU cluster allocations, and register before Friday midnight. Cash prizes pool: ₹1,50,000!",
  },
  Astronomy: {
    title: "🌌 Celestial Expedition & Deep-Sky Stargazing Night",
    text: "Astronuts invites all students to the Okhla Campus Observatory deck this Saturday at 21:00 HRS. We will be tracking the Perseid Meteor Shower and observing Jupiter's moons using our 12-inch Dobsonian telescope. Refreshments provided!",
  },
  Creative: {
    title: "📸 Tasveer & Muse Annual Campus Gallery Showcase",
    text: "Experience IIIT-Delhi through a new lens! Tasveer and Muse present 'Metamorphosis' — an interactive photography and visual arts exhibition at the R&D Block Main Foyer. Join us for the inaugural walkthrough on Wednesday at 17:00 HRS.",
  },
};

const AI_TASK_RECOMMENDATIONS = [
  {
    category: "Technical",
    task: "Deploy GPU Container Sandbox for 48-Hour Hackathon Participants",
    priority: "HIGH",
    owner: "DevOps Lead",
    deadline: "In 2 Days",
  },
  {
    category: "Governance",
    task: "Submit Annual Budget Audit & Committee Spending Roster to Student Council",
    priority: "CRITICAL",
    owner: "Club Treasurer",
    deadline: "Tomorrow",
  },
  {
    category: "Logistics",
    task: "Verify QR Code Attendance Scanner & Digital Certificate Signing Key",
    priority: "MEDIUM",
    owner: "Events Coordinator",
    deadline: "In 4 Days",
  },
];

const RESOURCE_ROOMS = [
  { id: "c101", name: "C-101 Lecture Hall", capacity: 180, status: "AVAILABLE", type: "Auditorium" },
  { id: "rd202", name: "R&D Seminar Room 202", capacity: 60, status: "BOOKED", type: "Conference" },
  { id: "lab3", name: "ECE Embedded Hardware Lab-3", capacity: 40, status: "AVAILABLE", type: "Laboratory" },
];

const MULTI_TENANT_PRESETS = [
  { id: "iiitd", name: "IIIT-Delhi University", domain: "orgos.iiitd.edu.in", clubs: 28, members: 1420, active: true },
  { id: "bits", name: "BITS Pilani Student Union", domain: "orgos.bits-pilani.ac.in", clubs: 64, members: 4800, active: false },
  { id: "mit", name: "MIT Student Activities Office", domain: "sao.mit.edu", clubs: 520, members: 11200, active: false },
];

export default function OrgOSCopilot({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("ai-announcements");
  const [selectedTemplate, setSelectedTemplate] = useState("Technical");
  const [announcementText, setAnnouncementText] = useState(
    AI_ANNOUNCEMENT_TEMPLATES.Technical.text
  );
  const [copied, setCopied] = useState(false);
  const [attendanceScanSuccess, setAttendanceScanSuccess] = useState(false);
  const [budgetBalance, setBudgetBalance] = useState(125000);
  const [selectedTenant, setSelectedTenant] = useState(MULTI_TENANT_PRESETS[0]);
  const [timelineYear, setTimelineYear] = useState("2026-S2");
  const [selectedNode, setSelectedNode] = useState("Electroholics Club");

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(announcementText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const simulateQRScan = () => {
    setAttendanceScanSuccess(true);
    setTimeout(() => setAttendanceScanSuccess(false), 4000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="orgos-copilot-title"
      className="fixed inset-0 z-[105] flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-6xl rounded-3xl border border-white/15 bg-[#070A14] overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col max-h-[90vh]"
      >
        {/* Executive Modal Top Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#0A0E1C]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Wand2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3
                id="orgos-copilot-title"
                className="text-lg font-black text-white flex items-center gap-2"
              >
                <span>IIIT-Delhi OrgOS Enterprise Command Suite</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-mono font-extrabold uppercase">
                  UNIVERSITY PLATFORM EDITION
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                AI Copilot • Digital Twin Graph • Digital Identity NFC • Executive Telemetry • Innovation Lab
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 11 Enterprise Tab Navigation Bar (Phases 9 & 10) */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-white/10 bg-black/40 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab("ai-announcements")}
            className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "ai-announcements"
                ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Copilot & NLP</span>
          </button>

          <button
            onClick={() => setActiveTab("digital-twin-graph")}
            className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "digital-twin-graph"
                ? "bg-violet-500/20 border border-violet-400/50 text-violet-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-violet-400" />
            <span>Digital Twin Graph</span>
          </button>

          <button
            onClick={() => setActiveTab("digital-identity-timeline")}
            className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "digital-identity-timeline"
                ? "bg-emerald-500/20 border border-emerald-400/50 text-emerald-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Key className="w-3.5 h-3.5 text-emerald-400" />
            <span>Smart ID & Timeline</span>
          </button>

          <button
            onClick={() => setActiveTab("executive-control-center")}
            className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "executive-control-center"
                ? "bg-amber-500/20 border border-amber-400/50 text-amber-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>Executive Control Center</span>
          </button>

          <button
            onClick={() => setActiveTab("innovation-lab")}
            className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "innovation-lab"
                ? "bg-pink-500/20 border border-pink-400/50 text-pink-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Box className="w-3.5 h-3.5 text-pink-400" />
            <span>Innovation Lab & VR</span>
          </button>

          <button
            onClick={() => setActiveTab("ai-tasks")}
            className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "ai-tasks"
                ? "bg-blue-500/20 border border-blue-400/50 text-blue-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>AI Tasks & Attendance</span>
          </button>

          <button
            onClick={() => setActiveTab("hierarchy-tenants")}
            className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "hierarchy-tenants"
                ? "bg-teal-500/20 border border-teal-400/50 text-teal-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 text-teal-400" />
            <span>Organization Hierarchy</span>
          </button>

          <button
            onClick={() => setActiveTab("resource-budget")}
            className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "resource-budget"
                ? "bg-amber-500/20 border border-amber-400/50 text-amber-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Resources & Finance</span>
          </button>

          <button
            onClick={() => setActiveTab("workflows-docs")}
            className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "workflows-docs"
                ? "bg-blue-500/20 border border-blue-400/50 text-blue-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Workflow Studio</span>
          </button>

          <button
            onClick={() => setActiveTab("marketplace-dev")}
            className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "marketplace-dev"
                ? "bg-pink-500/20 border border-pink-400/50 text-pink-300"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Webhook className="w-3.5 h-3.5 text-pink-400" />
            <span>Extension Marketplace</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-8 overflow-y-auto flex-1 space-y-6">
          {/* =========================================================
              TAB 1: AI OPERATING SYSTEM & ANNOUNCEMENTS
          ========================================================= */}
          {activeTab === "ai-announcements" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-extrabold text-white">
                    Qwen AI Executive Announcement Generator
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Generate IIIT-Delhi Student Council compliant broadcasts with 1-click transmission formatting.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {Object.keys(AI_ANNOUNCEMENT_TEMPLATES).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedTemplate(cat);
                        setAnnouncementText(
                          AI_ANNOUNCEMENT_TEMPLATES[cat].text
                        );
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                        selectedTemplate === cat
                          ? "bg-cyan-500 text-black shadow-md"
                          : "bg-white/10 text-zinc-300 hover:bg-white/20"
                      }`}
                    >
                      {cat} Preset
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>
                    SUBJECT: {AI_ANNOUNCEMENT_TEMPLATES[selectedTemplate].title}
                  </span>
                  <span>TARGET: All IIIT-Delhi Undergraduate & PG Members</span>
                </div>

                <textarea
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  rows={4}
                  className="w-full p-4 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans leading-relaxed"
                />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-zinc-400">
                    NLP Readiness Score:{" "}
                    <strong className="text-emerald-400 font-bold">99.4% (Executive Ready)</strong>
                  </span>
                  <button
                    onClick={handleCopy}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:scale-105 transition-transform text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Broadcast Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 2: DIGITAL TWIN OF THE ORGANIZATION & AI GRAPH
          ========================================================= */}
          {activeTab === "digital-twin-graph" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-violet-400" />
                    <span>Digital Twin of the Organization & AI Knowledge Graph</span>
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Explore interactive relationship connections: Club ➔ Committee ➔ Task ➔ Meeting ➔ Decision ➔ Event ➔ Attendance.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/40 text-violet-300 font-mono text-xs font-bold">
                  LIVE GRAPH ENGINE (1,420 NODES)
                </span>
              </div>

              {/* Graphical Node Inspector */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8 p-6 rounded-3xl bg-black/40 border border-white/10 font-mono text-xs space-y-4">
                  <div className="text-cyan-400 font-bold uppercase tracking-wider">
                    INTERACTIVE KNOWLEDGE GRAPH ARCHITECTURE
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>[CLUB] Electroholics Tech Society</span>
                      <span>ID: #NODE-CL-01</span>
                    </div>
                    <div className="pl-6 border-l-2 border-emerald-400/30 space-y-2">
                      <div className="text-violet-300">
                        ├──(owns)──&gt; [COMMITTEE] Robotics & Autonomous Systems Lead
                      </div>
                      <div className="pl-6 border-l-2 border-violet-400/30 space-y-2">
                        <div className="text-cyan-300">
                          ├──(organizes)──&gt; [EVENT] Flagship HackPlanet 2026 (RSVP: 420)
                        </div>
                        <div className="text-pink-300">
                          └──(assigns)──&gt; [TASK #402] GPU Cluster Container Allocation (DUE: 48h)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/10">
                    <span>Selected Node: <strong className="text-white">{selectedNode}</strong></span>
                    <span>AI Relationship Score: <strong className="text-emerald-400">99.8% Connected</strong></span>
                  </div>
                </div>

                <div className="md:col-span-4 p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                  <h5 className="font-bold text-white text-sm">Node Inspector & Actions</h5>
                  <div className="space-y-2 text-xs">
                    {["Electroholics Club", "HackPlanet 2026 Event", "Task #402: GPU Sandbox", "Robotics Committee"].map((node) => (
                      <button
                        key={node}
                        onClick={() => setSelectedNode(node)}
                        className={`w-full p-3 rounded-xl text-left font-mono transition cursor-pointer flex items-center justify-between ${
                          selectedNode === node
                            ? "bg-violet-500/20 border border-violet-400 text-white"
                            : "bg-white/5 border border-white/5 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span>{node}</span>
                        <ChevronRight className="w-4 h-4 text-violet-400" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 3: DIGITAL IDENTITY & ORGANIZATION TIMELINE
          ========================================================= */}
          {activeTab === "digital-identity-timeline" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Smart Digital Identity Card */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Key className="w-4 h-4 text-emerald-400" />
                    <span>Digital Campus Identity System (NFC & QR)</span>
                  </h4>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    SAC VERIFIED BADGE
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-400/30 space-y-6">
                  <div className="flex items-center justify-between border-b border-emerald-400/20 pb-4">
                    <div>
                      <h5 className="font-extrabold text-white text-base">IIIT-Delhi Campus Member ID</h5>
                      <p className="text-xs font-mono text-emerald-300">Roll: 2024210 • Undergraduate Senate</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-extrabold">
                      ACTIVE CHARTER
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1 text-xs">
                      <div className="text-zinc-400">Primary Society:</div>
                      <div className="font-bold text-white text-sm">Electroholics & Astronuts</div>
                      <div className="text-[10px] font-mono text-zinc-500 mt-1">SHA-256 Sign: 0x9f4a...8e1c</div>
                    </div>

                    <div className="w-20 h-20 rounded-xl bg-white p-2 shadow-lg flex items-center justify-center">
                      <QrCode className="w-full h-full text-black" />
                    </div>
                  </div>

                  <button
                    onClick={() => alert("NFC Campus Gate Signer triggered! Verified IIIT-Delhi Student Smart Card ID.")}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg"
                  >
                    Transmit NFC Smart Identity Credential
                  </button>
                </div>
              </div>

              {/* Right Column: Organization Timeline Time-Machine */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                    <History className="w-4 h-4 text-cyan-400" />
                    <span>Organization Timeline Time-Machine</span>
                  </h4>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    PERMANENT AUDIT HISTORY
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400">SELECT SEMESTER SNAPSHOT:</span>
                    <span className="font-mono font-extrabold text-cyan-400">{timelineYear}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {["2024-S1", "2025-S1", "2025-S2", "2026-S2"].map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setTimelineYear(yr)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer border ${
                          timelineYear === yr
                            ? "bg-cyan-500 text-black border-cyan-400 shadow-lg"
                            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono">
                    <div className="text-emerald-400 font-bold">✓ {timelineYear} Audited Ledger State Loaded:</div>
                    <div className="text-zinc-300">28 Active Clubs • ₹1,25,000 Semester Allocation</div>
                    <div className="text-zinc-500 text-[10px]">All historical club constitutions and meeting minutes available for read-only inspection.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 4: EXECUTIVE CONTROL CENTER & OBSERVABILITY
          ========================================================= */}
          {activeTab === "executive-control-center" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-amber-400" />
                  <span>Executive Control Center & Platform Observability</span>
                </h4>
                <p className="text-xs text-zinc-400">
                  Mission-control cloud platform telemetry: API latency, queue depth, cache hit rates, and server SLA.
                </p>
              </div>

              {/* 4 Mission Control Telemetry Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10px] text-zinc-400">API LATENCY (P99)</div>
                  <div className="text-2xl font-black text-emerald-400">14ms</div>
                  <div className="text-[10px] text-zinc-500">Nginx Alpine HTTP/2 verified</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10px] text-zinc-400">CACHE HIT RATE</div>
                  <div className="text-2xl font-black text-cyan-400">96.4%</div>
                  <div className="text-[10px] text-zinc-500">Prisma query caching active</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10px] text-zinc-400">QUEUE DEPTH</div>
                  <div className="text-2xl font-black text-violet-400">0 PENDING</div>
                  <div className="text-[10px] text-zinc-500">3,840 completed automation jobs</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10px] text-zinc-400">ERROR RATE (24H)</div>
                  <div className="text-2xl font-black text-emerald-400">0.00%</div>
                  <div className="text-[10px] text-zinc-500">Zero unhandled exceptions</div>
                </div>
              </div>

              {/* Server SLA & Global Notification Orchestrator */}
              <div className="p-6 rounded-3xl bg-white/[0.03] border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-amber-400 font-bold uppercase">
                    GLOBAL NOTIFICATION ORCHESTRATOR ACTIVE
                  </div>
                  <h5 className="font-extrabold text-white text-sm mt-1">
                    Push, Email, SMS & Discord Server Bot Throttling Configured (SLA: 99.98%)
                  </h5>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Multi-tenant tenant isolation • Encrypted pg_dump database snapshots scheduled daily at 02:00 AM IST.
                  </p>
                </div>
                <span className="px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-400/50">
                  PLATFORM OPTIMAL
                </span>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 5: INNOVATION LAB (VR / AR / BLOCKCHAIN / NLP)
          ========================================================= */}
          {activeTab === "innovation-lab" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Box className="w-5 h-5 text-pink-400" />
                  <span>OrgOS Innovation Lab (Experimental Campus Sandbox)</span>
                </h4>
                <p className="text-xs text-zinc-400">
                  Experimental spatial navigation, autonomous scheduling agents, and blockchain certificate issuance.
                </p>
              </div>

              {/* 4 Experimental Innovation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3 hover:border-pink-400/40 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">VR Campus Exploration (Okhla Campus)</span>
                    <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono text-[10px] font-bold">WEBXR READY</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Interactive 3D celestial metro map rendered via Three.js with full room auditorium walk-through previews.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3 hover:border-pink-400/40 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Voice-Controlled OrgOS NLP Agent</span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">WHISPER AI</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Natural language voice recognition allowing hands-free command palette navigation and meeting minutes drafting.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3 hover:border-pink-400/40 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Autonomous Committee Scheduling Agent</span>
                    <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono text-[10px] font-bold">ENGINE</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    AI automatically analyzes faculty availability and lecture hall schedules to suggest clash-free meeting slots.
                  </p>
                </div>

                <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3 hover:border-pink-400/40 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Blockchain Cryptographic Certificates</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">SHA-256 NFT</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Tamper-proof digital achievement certificates and membership credentials verified on institutional ledger.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              REMAINING TABS: WORKSPACES, HIERARCHY, FINANCE, WORKFLOWS, MARKETPLACE
          ========================================================= */}
          {activeTab === "ai-tasks" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-violet-400" />
                    <span>AI Committee Task Recommendations</span>
                  </h4>
                  <span className="text-xs font-mono text-violet-300">
                    3 HIGH-IMPACT SUGGESTIONS
                  </span>
                </div>

                <div className="space-y-3">
                  {AI_TASK_RECOMMENDATIONS.map((rec, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2 hover:border-violet-400/40 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300">
                          {rec.category}
                        </span>
                        <span className="text-[10px] font-mono text-amber-400 font-bold">
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white leading-snug">
                        {rec.task}
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1 border-t border-white/5">
                        <span>Assignee: {rec.owner}</span>
                        <span>Due: {rec.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-cyan-400" />
                    <span>QR Attendance & Cryptographic Certificates</span>
                  </h4>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    SECURE SHA-256 SIGNED
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 text-center space-y-5">
                  <div className="w-24 h-24 rounded-2xl bg-white p-3 mx-auto shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center">
                    <QrCode className="w-full h-full text-black" />
                  </div>

                  <div className="space-y-1">
                    <h5 className="font-extrabold text-white text-sm">
                      IIIT-Delhi HackPlanet 2026 Check-In Pass
                    </h5>
                    <p className="text-[11px] font-mono text-zinc-400">
                      Hash Key: 0x9f4a...8d2e • Cryptographically Verified
                    </p>
                  </div>

                  <button
                    onClick={simulateQRScan}
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg"
                  >
                    {attendanceScanSuccess
                      ? "✓ Member Check-In Verified! +50 Activity XP"
                      : "Simulate Campus Gate Scanner Scan"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "hierarchy-tenants" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-extrabold text-white">
                    Organization Hierarchy & Multi-Tenant SaaS Engine
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Switch institutional charters instantly. All clubs, budgets, timezones, and roles adapt automatically.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {MULTI_TENANT_PRESETS.map((tenant) => {
                    const isSel = selectedTenant.id === tenant.id;
                    return (
                      <button
                        key={tenant.id}
                        onClick={() => setSelectedTenant(tenant)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition cursor-pointer border ${
                          isSel
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {tenant.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/[0.03] border border-emerald-400/30 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h5 className="text-base font-extrabold text-white">
                      Active Charter: {selectedTenant.name} ({selectedTenant.domain})
                    </h5>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      {selectedTenant.clubs} Chartered Organizations • {selectedTenant.members} Registered Members
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold">
                    TENANT ISOLATED • ENCRYPTED SCHEMA
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">🏛️ {selectedTenant.name} University Charter</span>
                    <span className="text-zinc-500">LEVEL 0 (TENANT ROOT)</span>
                  </div>
                  <div className="pl-6 space-y-2">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                      <span className="text-cyan-300">├── Okhla Academic Campus & Student Senate</span>
                      <span className="text-zinc-500">LEVEL 1 (CAMPUS)</span>
                    </div>
                    <div className="pl-6 space-y-2">
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                        <span className="text-violet-300">│   ├── Technical Clubs Council (Electroholics, Foobar, Astronuts)</span>
                        <span className="text-zinc-500">LEVEL 2 (COUNCIL)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                        <span className="text-pink-300">│   ├── Cultural Clubs Council (Tasveer, Muse, Audiobyte)</span>
                        <span className="text-zinc-500">LEVEL 2 (COUNCIL)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                        <span className="text-amber-300">│   └── Research & Student Chapters (ACM Chapter, IEEE Student Branch)</span>
                        <span className="text-zinc-500">LEVEL 2 (CHAPTER)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "resource-budget" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span>Institutional Resource Booking Roster</span>
                  </h4>
                  <span className="text-xs font-mono text-cyan-400">
                    REAL-TIME SYNC
                  </span>
                </div>

                <div className="space-y-3">
                  {RESOURCE_ROOMS.map((room) => (
                    <div
                      key={room.id}
                      className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between"
                    >
                      <div>
                        <h5 className="font-extrabold text-white text-sm">
                          {room.name}
                        </h5>
                        <p className="text-xs text-zinc-400 font-mono mt-0.5">
                          Capacity: {room.capacity} seats • {room.type}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                          room.status === "AVAILABLE"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {room.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Student Council Budget Manager</span>
                  </h4>
                  <span className="text-xs font-mono text-emerald-400">
                    SEMESTER BALANCE
                  </span>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-xs font-mono text-zinc-400">
                        AVAILABLE ALLOCATION
                      </p>
                      <h3 className="text-3xl font-black text-white mt-1">
                        ₹{budgetBalance.toLocaleString("en-IN")}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                      AUDITED BY SAC
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-zinc-300">
                      <span>HackPlanet 2026 Sponsorship Grant</span>
                      <span className="text-emerald-400 font-bold">+₹75,000</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>ECE Soldering & PCB Procurement</span>
                      <span className="text-red-400 font-bold">-₹18,500</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Tasveer Photography Exhibition Frames</span>
                      <span className="text-red-400 font-bold">-₹12,000</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      alert(
                        "New Requisition Workflow initiated. Request sent to Faculty Advisor for digital countersignature."
                      )
                    }
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-extrabold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg"
                  >
                    + Submit Digital Budget Requisition
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "workflows-docs" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-extrabold text-white">
                  Workflow Automation Studio & Digital Document Center
                </h4>
                <p className="text-xs text-zinc-400">
                  Visual drag-and-drop workflow automation pipeline and SHA-256 verified constitution document repository.
                </p>
              </div>

              {/* No-Code Event Pipeline Card */}
              <div className="p-6 rounded-3xl bg-white/[0.03] border border-blue-400/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                    ACTIVE RULE #1: FLAGSHIP EVENT LIFECYCLE AUTOMATION
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                    RULE ENABLED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-400/30 text-blue-300 font-bold">
                    1. Event Created
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300">
                    2. Notify Members (Push + Email)
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300">
                    3. Create Kanban Tasks
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300">
                    4. Generate QR Code Pass
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-bold">
                    5. Archive After Completion
                  </div>
                </div>
              </div>

              {/* Digital Document Center */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">IIIT-Delhi Student Council Constitution.pdf</div>
                    <div className="text-[10px] text-zinc-500">SHA-256 Verified • Version 4.2</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                    OFFICIAL
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">Hackathon Sponsorship Agreement Template.docx</div>
                    <div className="text-[10px] text-zinc-500">Corporate Relations Standard</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 font-mono text-[10px] font-bold">
                    TEMPLATE
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">Semester Financial Audit Ledger 2026.xlsx</div>
                    <div className="text-[10px] text-zinc-500">Audited by Registrar Office</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                    LEDGER
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "marketplace-dev" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-extrabold text-white">
                  Extension Marketplace & Developer API Portal
                </h4>
                <p className="text-xs text-zinc-400">
                  Connect third-party enterprise tools and generate live Webhook signing keys for custom bots.
                </p>
              </div>

              {/* 6 Integrated App Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "Google Workspace", status: "CONNECTED", color: "text-emerald-400", desc: "Calendar & Drive sync" },
                  { name: "Discord Server Bot", status: "CONNECTED", color: "text-emerald-400", desc: "Auto channel broadcasts" },
                  { name: "GitHub Classroom", status: "CONNECTED", color: "text-emerald-400", desc: "Hackathon repo grading" },
                  { name: "Slack Enterprise", status: "READY", color: "text-cyan-400", desc: "Executive council alerts" },
                  { name: "Zoom Meetings", status: "READY", color: "text-cyan-400", desc: "Auto recording upload" },
                  { name: "Microsoft 365", status: "READY", color: "text-cyan-400", desc: "Outlook invite sync" },
                ].map((app, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between h-28">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{app.name}</span>
                      <span className={`text-[10px] font-mono font-bold ${app.color}`}>{app.status}</span>
                    </div>
                    <p className="text-xs text-zinc-500">{app.desc}</p>
                    <button className="text-left text-[11px] font-mono text-cyan-400 hover:underline">
                      Configure Integration →
                    </button>
                  </div>
                ))}
              </div>

              {/* Developer API Sandbox Card */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-pink-400 font-bold uppercase">
                    REST API & WEBHOOK SANDBOX
                  </div>
                  <div className="font-mono text-xs text-zinc-300 mt-1">
                    LIVE API KEY: cp_live_9a8b7c6d5e4f3a2b1c0d... (SHA-256)
                  </div>
                </div>
                <button
                  onClick={() => alert("Copied live OrgOS REST API Key to clipboard! See /api-docs for OpenAPI 3.0 specs.")}
                  className="px-4 py-2 rounded-xl bg-pink-500/20 border border-pink-400/50 text-pink-300 font-mono text-xs font-bold hover:bg-pink-500/30 transition cursor-pointer"
                >
                  Generate New API Key
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Executive Modal Footer */}
        <div className="flex items-center justify-between px-8 py-4 border-t border-white/10 bg-[#0A0E1C]/90 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              OrgOS Enterprise Command Suite Active • Press Ctrl+K / ⌘+K Anywhere
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition cursor-pointer"
          >
            Close Suite
          </button>
        </div>
      </motion.div>
    </div>
  );
}
