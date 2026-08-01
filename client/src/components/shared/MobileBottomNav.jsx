import React from "react";
import { NavLink } from "react-router-dom";
import {
  Sparkles,
  Activity,
  Users,
  MessageSquare,
  Radio,
  Menu,
} from "lucide-react";

/**
 * Universal Mobile & Tablet Bottom Navigation Bar (Omnipresent OrgOS Navigation).
 * Ensures zero feature vanishing on mobile phones, tablets, or compact screens.
 */
export default function MobileBottomNav({ onOpenMenu }) {
  const bottomItems = [
    { to: "/", label: "Planet 1", icon: Sparkles },
    { to: "/dashboard", label: "Dashboard", icon: Activity },
    { to: "/clubs", label: "Clubs", icon: Users },
    { to: "/chat", label: "Chat", icon: MessageSquare },
    { to: "/meetings", label: "AI Meet", icon: Radio },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#06080F]/95 backdrop-blur-xl border-t border-white/[0.08] px-2 flex items-center justify-around select-none shadow-2xl">
      {bottomItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all min-w-[56px] min-h-[48px] ${
                isActive
                  ? "text-cyan-400 bg-white/[0.06] font-semibold scale-105"
                  : "text-zinc-500 hover:text-zinc-300"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? "text-cyan-400 scale-110" : "text-zinc-500"
                  }`}
                />
                <span className="text-[10px] tracking-tight mt-1 font-medium">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}

      {/* Complete OrgOS App Drawer Button (Ensures 100% of apps remain accessible) */}
      <button
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all min-w-[56px] min-h-[48px] cursor-pointer"
        title="Open All OrgOS Apps & Settings"
      >
        <Menu className="w-5 h-5 text-cyan-400" />
        <span className="text-[10px] tracking-tight mt-1 font-medium">
          All Apps
        </span>
      </button>
    </nav>
  );
}
