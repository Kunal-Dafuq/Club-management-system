import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AutoCompleteSearch from "../ui/AutoCompleteSearch";
import { CLUBS_DATA, EVENTS_DATA } from "../../constants/landingData";
import { Command, LogOut, Menu } from "lucide-react";

export default function Topbar({ onOpenMenu }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const searchItems = useMemo(() => {
    const clubs = CLUBS_DATA.map((c) => ({
      id: `club-${c.id}`,
      label: c.name,
      category: "Club",
      link: "/clubs",
    }));

    const events = EVENTS_DATA.map((e, idx) => ({
      id: `ev-${idx}`,
      label: e.title,
      category: "Event",
      link: "/events",
    }));

    const pages = [
      { id: "p-dash", label: "Dashboard", category: "Workspace", link: "/dashboard" },
      { id: "p-clubs", label: "Clubs Directory", category: "Workspace", link: "/clubs" },
      { id: "p-events", label: "Events Calendar", category: "Workspace", link: "/events" },
      { id: "p-tasks", label: "Committee Tasks", category: "Workspace", link: "/tasks" },
      { id: "p-profile", label: "Executive Profile", category: "Workspace", link: "/profile" },
    ];

    return [...clubs, ...events, ...pages];
  }, []);

  const handleSelect = (item) => {
    if (item?.link) {
      navigate(item.link);
    }
  };

  return (
    <header className="h-14 border-b border-white/[0.06] flex justify-between items-center px-4 sm:px-6 lg:px-8 bg-[#06080F]/90 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Mobile & Tablet Hamburger Button */}
        <button
          onClick={onOpenMenu}
          className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          title="Open OrgOS Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Responsive Search Box (Adapts from tiny Mobile 320px to 4K TV) */}
        <div className="w-44 sm:w-64 md:w-72 lg:w-80 xl:w-96">
          <AutoCompleteSearch
            items={searchItems}
            value={searchQuery}
            onChange={setSearchQuery}
            onSelect={handleSelect}
            placeholder="Search OrgOS (⌘K)..."
          />
        </div>

        <button
          onClick={() => navigate("/")}
          className="text-xs font-medium text-zinc-500 hover:text-white transition-colors hidden sm:inline-block cursor-pointer"
        >
          Planet One →
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <span className="text-xs font-medium text-zinc-400 truncate max-w-[100px] sm:max-w-none">
          {user?.name || "Kunal"}
        </span>

        <button
          onClick={logout}
          className="text-xs text-zinc-600 hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Sign out of IIIT-Delhi OrgOS"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}