import { NavLink } from "react-router-dom";
import {
  Activity,
  Users,
  Calendar,
  CheckSquare,
  MessageSquare,
  Radio,
  Bell,
  UserCheck,
  Settings,
  ShieldAlert,
  Sparkles,
  Command,
  Zap,
} from "lucide-react";

const NAV_GROUPS = [
  {
    title: "Organization Orbit",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: Activity, badge: "LIVE", badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" },
      { to: "/clubs", label: "Clubs Directory", icon: Users, badge: "11", badgeColor: "bg-white/5 text-zinc-400 border-white/10" },
      { to: "/events", label: "Events Calendar", icon: Calendar, badge: "24h", badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/40" },
    ],
  },
  {
    title: "Workspace & Collaboration",
    items: [
      { to: "/tasks", label: "Committee Tasks", icon: CheckSquare, badge: "5", badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
      { to: "/chat", label: "OrgOS Chat", icon: MessageSquare, badge: "NEW", badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" },
      { to: "/meetings", label: "AI Meeting Room", icon: Radio, badge: "AI", badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/40" },
    ],
  },
  {
    title: "Executive Command",
    items: [
      { to: "/notifications", label: "Notifications", icon: Bell, badge: "3", badgeColor: "bg-red-500/20 text-red-300 border-red-500/40" },
      { to: "/profile", label: "Executive Profile", icon: UserCheck },
      { to: "/settings", label: "Enterprise Settings", icon: Settings, badge: "21 MOD", badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" },
      { to: "/admin", label: "Admin Center", icon: ShieldAlert, badge: "CORE", badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/40" },
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="w-72 min-h-[calc(100vh-64px)] bg-[#090A0F] border-r border-white/10 flex flex-col justify-between p-5 select-none z-30">
      {/* Navigation Groups */}
      <div className="space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-2">
            <div className="px-3 text-[10px] font-mono font-extrabold uppercase tracking-widest text-zinc-500 flex items-center justify-between">
              <span>{group.title}</span>
            </div>

            <nav className="space-y-1">
              {group.items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-violet-600/25 via-cyan-500/15 to-transparent text-white border border-violet-500/40 shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                          : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Left Active Bar */}
                        {isActive && (
                          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-cyan-400 to-violet-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                        )}

                        <div className="flex items-center gap-3 min-w-0">
                          <IconComponent
                            className={`w-4 h-4 transition-colors ${
                              isActive
                                ? "text-cyan-400"
                                : "text-zinc-500 group-hover:text-zinc-300"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                              item.badgeColor || "bg-white/5 text-zinc-400 border-white/10"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* System Telemetry Footer */}
      <div className="mt-8 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>OrgOS v2.4</span>
          </span>
          <span className="text-emerald-400 font-bold">60 FPS</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-11/12 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full" />
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span>Obsidian Engine</span>
          <span>ENCRYPTED</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;