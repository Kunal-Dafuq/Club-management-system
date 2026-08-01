import React from "react";
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
  X,
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

export default function Sidebar({ isOpen = false, onClose }) {
  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-6 select-none">
      <div className="space-y-8 overflow-y-auto pr-1">
        {/* Mobile Close Button inside drawer header */}
        <div className="flex items-center justify-between lg:hidden pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold tracking-wide text-white">ClubPlanet OrgOS</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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
                    onClick={() => {
                      if (onClose) onClose();
                    }}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 lg:py-2 rounded-xl text-xs sm:text-sm lg:text-xs font-medium transition-all min-h-[44px] lg:min-h-[36px] ${
                        isActive
                          ? "bg-white/[0.07] text-white"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3 min-w-0">
                          <IconComponent
                            className={`w-4 h-4 transition-colors ${
                              isActive ? "text-cyan-400" : "text-zinc-500"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                              isActive
                                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                                : "bg-white/[0.03] text-zinc-500"
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
      <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-600">
        <span>OrgOS v2.4</span>
        <span className="text-zinc-500">⌘K</span>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop / Laptop / TV Fixed Sidebar (Responsive width scaling for TV displays) */}
      <aside className="hidden lg:flex lg:w-64 xl:w-72 2xl:w-80 min-h-[calc(100vh-56px)] bg-[#06080F]/90 border-r border-white/[0.06] flex-col justify-between z-30 shrink-0">
        {sidebarContent}
      </aside>

      {/* 2. Mobile & Tablet Full Navigation Drawer Overlay (Omnipresent 100% Feature Access) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={onClose}
          />

          {/* Slide-over Menu Panel */}
          <aside className="relative w-72 max-w-[85vw] h-full bg-[#06080F] border-r border-white/[0.1] z-10 shadow-2xl animate-slideIn">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}