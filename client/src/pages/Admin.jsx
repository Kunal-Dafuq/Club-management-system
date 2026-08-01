import { useState } from "react";
import {
  ShieldAlert,
  Activity,
  Users,
  Database,
  Cpu,
  Server,
  Lock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  BarChart3,
  DollarSign,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import RoleGovernanceBar from "../components/ui/RoleGovernanceBar";

const SYSTEM_HEALTH_METRICS = [
  { label: "OrgOS API Gateway", status: "HEALTHY", val: "12.4ms", color: "text-emerald-400 border-emerald-500/40" },
  { label: "Prisma DB Connection Pool", status: "HEALTHY", val: "4/20 conn", color: "text-emerald-400 border-emerald-500/40" },
  { label: "Client WebGL Frame Buffer", status: "OPTIMIZED", val: "60 FPS", color: "text-cyan-400 border-cyan-500/40" },
  { label: "JWT Token Engine", status: "ENCRYPTED", val: "HS256", color: "text-violet-400 border-violet-500/40" },
];

const AUDIT_LOGS = [
  { id: "l1", time: "10:24 AM", user: "Kunal Dev (President)", action: "APPROVED_BUDGET", target: "HackPlanet GPU Credits ($850)", ip: "192.168.1.10" },
  { id: "l2", time: "10:18 AM", user: "Sneha Verma (Lead)", action: "CREATED_TASK", target: "ROS2 LiDAR Calibration", ip: "192.168.1.45" },
  { id: "l3", time: "09:55 AM", user: "System Telemetry", action: "SYNC_CHANNELS", target: "Discord #announcements webhook", ip: "127.0.0.1" },
  { id: "l4", time: "09:12 AM", user: "Dr. Rajesh Sharma", action: "PUBLISHED_REPORT", target: "NAAC Activity Summary 2026", ip: "192.168.1.88" },
];

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("telemetry");

  return (
    <div className="space-y-8">
      <RoleGovernanceBar />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-red-500/20 border border-red-500/40 text-red-300">
              ENTERPRISE GOVERNANCE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mt-1">
            Admin Control Center
          </h1>
          <p className="text-zinc-400 mt-1 text-sm">
            Real-time system health, database connection telemetry, and organization audit logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/settings"
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
          >
            <span>⚙ 21-Module Enterprise Settings</span>
          </a>
          <button className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors">
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span>Sync System Diagnostics</span>
          </button>
        </div>
      </div>

      {/* System Health Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SYSTEM_HEALTH_METRICS.map((metric, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                {metric.label}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${metric.color}`}
              >
                {metric.status}
              </span>
            </div>

            <div className="text-2xl font-extrabold text-white font-mono">
              {metric.val}
            </div>
          </div>
        ))}
      </div>

      {/* Main Control Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Telemetry & Organization Insights */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A0D18] to-[#0D1224] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-white">
                Live Audit Stream & Governance Logs
              </h2>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Real-time security events and executive approvals across OrgOS.
              </p>
            </div>

            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Filter audit logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
          </div>

          <div className="space-y-3">
            {AUDIT_LOGS.filter(
              (l) =>
                l.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                l.target.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    [{log.time}]
                  </span>
                  <div>
                    <span className="text-xs font-bold text-white mr-2">
                      {log.user}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-violet-300">
                      {log.action}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono text-zinc-400">
                  <span className="text-white">{log.target}</span>
                  <span className="text-zinc-600">{log.ip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Organization Security & User Management */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.03] space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-white">
              System Permissions
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Role-based governance presets.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { role: "SUPER_ADMIN", count: "3 Users", desc: "Full OrgOS infrastructure & budget power", color: "text-red-400 border-red-500/40" },
              { role: "CLUB_PRESIDENT", count: "11 Users", desc: "Can approve budgets up to $5,000", color: "text-violet-400 border-violet-500/40" },
              { role: "COMMITTEE_LEAD", count: "34 Users", desc: "Can assign tasks & call meetings", color: "text-cyan-400 border-cyan-500/40" },
              { role: "GENERAL_VIEWER", count: "1,116 Users", desc: "Standard student orbit member", color: "text-zinc-400 border-white/20" },
            ].map((r, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${r.color}`}>
                    {r.role}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {r.count}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
