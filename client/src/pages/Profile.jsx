import { useState } from "react";
import {
  UserCheck,
  Award,
  Trophy,
  Activity,
  Shield,
  Calendar,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  MapPin,
  Clock,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const ACHIEVEMENTS = [
  {
    id: "a1",
    title: "HackPlanet 2025 First Place Winner",
    category: "HACKATHON CHAMPION",
    date: "March 2025",
    color: "from-cyan-500/20 to-violet-600/20 border-cyan-400/50",
    desc: "Led autonomous ROS2 rover navigation model and won 1st out of 140 teams.",
  },
  {
    id: "a2",
    title: "Google Summer of Code 2025 Selected Mentor",
    category: "OPEN SOURCE",
    date: "June 2025",
    color: "from-violet-500/20 to-pink-600/20 border-violet-400/50",
    desc: "Mentored 4 international student contributors on ROS2 telemetry pipelines.",
  },
  {
    id: "a3",
    title: "ACM ICPC Regional Finalist",
    category: "ALGORITHMIC COMPETITION",
    date: "November 2025",
    color: "from-emerald-500/20 to-cyan-600/20 border-emerald-400/50",
    desc: "Ranked 6th across university competitive programming divisions.",
  },
];

const ORBITS = [
  { name: "ABACUS Society", role: "Vice President", members: "140", color: "text-violet-400 border-violet-500/40" },
  { name: "Robotics Core Tech", role: "Tech Lead", members: "210", color: "text-cyan-400 border-cyan-500/40" },
  { name: "Coding Club", role: "Senior Orbit Member", members: "450", color: "text-emerald-400 border-emerald-500/40" },
];

const ACTIVITY_HISTORY = [
  { time: "10:22 AM", action: "Approved HackPlanet GPU Server Requisition ($850)", tag: "GOVERNANCE" },
  { time: "Yesterday", action: "Submitted ROS2 LiDAR sensor calibration task to Kanban", tag: "ROBOTICS" },
  { time: "July 24", action: "Confirmed RSVP for Symphony Night sound rehearsal", tag: "EVENT" },
];

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-10">
      {/* Obsidian Executive Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#0E1228] via-[#090D1C] to-[#161230] p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Glowing Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 to-violet-600 p-1 shadow-[0_0_35px_rgba(6,182,212,0.4)]">
                <div className="w-full h-full rounded-2xl bg-[#090C17] flex items-center justify-center text-3xl font-extrabold text-white">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : "KD"}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-black flex items-center justify-center text-[10px] font-bold text-black">
                ✓
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-widest bg-cyan-500/20 border border-cyan-400 text-cyan-300">
                  CORE EXECUTIVE
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-violet-500/20 border border-violet-400 text-violet-300">
                  CLUB PRESIDENT
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 border border-emerald-400 text-emerald-300">
                  DEV ORBIT
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                {user?.name || "Kunal Dev"}
              </h1>

              <p className="text-sm text-zinc-400 max-w-xl font-mono">
                {user?.email || "kunal.dev@clubplanet.edu"} • Computer Science & Quantitative Economics
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 text-right">
            <span className="text-xs font-mono text-zinc-400">ORGOS REPUTATION</span>
            <span className="text-2xl font-extrabold text-cyan-400 font-mono">
              4,120 PTS
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Telemetry Statistics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Meeting Attendance", val: "84%", sub: "+6% this semester", color: "text-emerald-400" },
          { label: "Committee Tasks Completed", val: "12", sub: "100% on time", color: "text-cyan-400" },
          { label: "Chartered Club Orbits", val: "3", sub: "2 leadership roles", color: "text-violet-400" },
          { label: "Budget Requisitions", val: "$2,100", sub: "Approved by Exec", color: "text-amber-400" },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-[#0A0D18] border border-white/10 space-y-1 shadow-lg"
          >
            <div className="text-xs font-mono text-zinc-400">{stat.label}</div>
            <div className={`text-2xl font-extrabold font-mono ${stat.color}`}>
              {stat.val}
            </div>
            <div className="text-[10px] font-mono text-zinc-500">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Grid: 3D Glass Achievement Cards & Chartered Orbits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 3D Achievement Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-white">
              Executive Achievements & Honors
            </h2>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              3 CHARTERED HONORS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ACHIEVEMENTS.map((ach) => (
              <motion.div
                key={ach.id}
                whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
                className={`p-6 rounded-3xl bg-gradient-to-br ${ach.color} border shadow-xl space-y-4 flex flex-col justify-between`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-cyan-300">
                      {ach.category}
                    </span>
                    <Trophy className="w-4 h-4 text-amber-400" />
                  </div>
                  <h3 className="text-base font-extrabold text-white">
                    {ach.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {ach.desc}
                </p>

                <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-zinc-400 flex justify-between">
                  <span>AWARDED</span>
                  <span>{ach.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Chartered Orbit Memberships & Recent History */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#090C17] border border-white/10 space-y-5">
            <h2 className="text-xl font-extrabold text-white">
              Chartered Orbit Memberships
            </h2>

            <div className="space-y-3">
              {ORBITS.map((o, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-white text-sm">{o.name}</h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      {o.members} orbit members
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${o.color}`}
                  >
                    {o.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#090C17] border border-white/10 space-y-4">
            <h2 className="text-lg font-extrabold text-white">
              Recent Orbit Activity
            </h2>

            <div className="space-y-3">
              {ACTIVITY_HISTORY.map((hist, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5 max-w-[240px]">
                    <div className="font-bold text-white leading-snug">
                      {hist.action}
                    </div>
                    <div className="font-mono text-[10px] text-zinc-500">
                      {hist.time}
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-cyan-300">
                    {hist.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          ENTERPRISE PRIVACY & DATA PROTECTION CENTER
      ========================================================= */}
      <div className="p-8 rounded-3xl bg-[#090C17] border border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>GDPR • FERPA • Institutional Data Privacy Governance</span>
            </div>
            <h2 className="text-xl font-extrabold text-white mt-1">
              Privacy, Data Export & Account Retention Center
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Control your institutional footprint, download itemized telemetry logs, or execute secure account deletion.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ user: user || { name: "Kunal", email: "kunal2101@iiitd.ac.in" }, exportedAt: new Date().toISOString(), status: "GDPR_COMPLIANT_EXPORT" }, null, 2));
                const downloadAnchor = document.createElement("a");
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", `orgos_privacy_export_${Date.now()}.json`);
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
              }}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider transition shadow-lg cursor-pointer flex items-center gap-2"
            >
              <span>Download My Data (JSON)</span>
            </button>
            <button
              onClick={() => alert("Account deletion request submitted to IIIT-Delhi Registrar. 30-day retention grace period initiated.")}
              className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              <span>Request Deletion</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Public Directory Profile</div>
              <div className="text-[10px] text-zinc-500">Allow campus search visibility</div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
              ENABLED
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Committee Mention Alerts</div>
              <div className="text-[10px] text-zinc-500">Real-time room notification push</div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
              ENABLED
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Telemetry & AI Analytics</div>
              <div className="text-[10px] text-zinc-500">Contribute anonymous event analytics</div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
              CONSENTED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;