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
} from "lucide-react";

const NAV_GROUPS = [
  {
    title: "Main Campus",
    items: [
      { to: "/", label: "Planet One", icon: Sparkles },
    ],
  },
  {
    title: "Organization",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: Activity, badge: "Live" },
      { to: "/campus-portal", label: "Campus Portal", icon: Sparkles },
      { to: "/clubs", label: "Clubs Directory", icon: Users, badge: "28" },
      { to: "/events", label: "Events Calendar", icon: Calendar },
    ],
  },
  {
    title: "Workspace",
    items: [
      { to: "/tasks", label: "Tasks", icon: CheckSquare },
      { to: "/chat", label: "Campus Chat", icon: MessageSquare },
      { to: "/meetings", label: "AI Meetings", icon: Radio },
    ],
  },
  {
    title: "Command",
    items: [
      { to: "/notifications", label: "Notifications", icon: Bell },
      { to: "/profile", label: "Profile", icon: UserCheck },
      { to: "/settings", label: "Settings", icon: Settings },
      { to: "/admin", label: "Admin Center", icon: ShieldAlert },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-56px)] bg-[#06080F]/90 border-r border-white/[0.06] flex flex-col justify-between p-6 select-none z-30">
      <div className="space-y-8">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-2">
            <div className="px-3 text-[11px] font-medium uppercase tracking-widest text-zinc-600">
              {group.title}
            </div>

            <nav className="space-y-0.5">
              {group.items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-white/[0.07] text-white"
                          : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3 min-w-0">
                          <IconComponent
                            className={`w-4 h-4 transition-colors ${
                              isActive ? "text-white" : "text-zinc-500"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                              isActive
                                ? "bg-white/10 text-white"
                                : "bg-white/[0.03] text-zinc-600"
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

      {/* Minimalist Apple/Vercel Footer without Box Fatigue */}
      <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-600">
        <span>OrgOS v2.4</span>
        <span className="text-zinc-500">⌘K</span>
      </div>
    </aside>
  );
}