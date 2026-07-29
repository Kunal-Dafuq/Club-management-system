import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AutoCompleteSearch from "../ui/AutoCompleteSearch";
import { CLUBS_DATA, EVENTS_DATA } from "../../constants/landingData";

const Topbar = () => {
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
    <header className="h-16 border-b border-white/10 flex justify-between items-center px-8 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="w-80">
        <AutoCompleteSearch
          items={searchItems}
          value={searchQuery}
          onChange={setSearchQuery}
          onSelect={handleSelect}
          placeholder="Type 'A' (e.g. ABACUS Society)..."
        />
      </div>

      <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
        ClubPlanet OrgOS
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm font-semibold text-zinc-300">
            {user?.name || "User"}
          </span>
        </div>

        <button
          onClick={logout}
          className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;