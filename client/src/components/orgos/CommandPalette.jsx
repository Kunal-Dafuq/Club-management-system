import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  Sparkles,
  Calendar,
  Users,
  Building2,
  Settings,
  FileText,
  Video,
  Award,
  ArrowRight,
  Shield,
  Compass,
  Terminal,
} from "lucide-react";
import { ROUTES } from "../../constants/routes";

const PALETTE_COMMANDS = [
  {
    id: "nav-dash",
    category: "Navigation",
    title: "Navigate to Dashboard",
    subtitle: "Open the main Executive Command Center",
    icon: Compass,
    action: (navigate) => navigate(ROUTES.DASHBOARD),
    shortcut: "D",
  },
  {
    id: "nav-clubs",
    category: "Navigation",
    title: "Explore All Chartered Clubs",
    subtitle: "Browse 28 student clubs & cultural societies",
    icon: Building2,
    action: (navigate) => navigate(ROUTES.CLUBS),
    shortcut: "C",
  },
  {
    id: "nav-events",
    category: "Navigation",
    title: "Campus Events Calendar",
    subtitle: "View upcoming hackathons & cultural fests",
    icon: Calendar,
    action: (navigate) => navigate(ROUTES.EVENTS),
    shortcut: "E",
  },
  {
    id: "nav-spatial",
    category: "Navigation",
    title: "3D Spatial Universe (Planet One)",
    subtitle: "Enter the interactive celestial metro navigation map",
    icon: Sparkles,
    action: (navigate) => navigate(ROUTES.UNIVERSE),
    shortcut: "U",
  },
  {
    id: "ai-copilot",
    category: "AI & Workflows",
    title: "Run OrgOS AI Copilot",
    subtitle: "Open AI Executive Command Suite & Announcement Generator",
    icon: Command,
    action: (navigate, onOpenCopilot) => {
      if (onOpenCopilot) onOpenCopilot();
    },
    shortcut: "⌘+I",
  },
  {
    id: "act-create-event",
    category: "Quick Actions",
    title: "Create New Campus Event",
    subtitle: "Draft a new event with RSVP QR codes & capacity limits",
    icon: Calendar,
    action: (navigate) => navigate(ROUTES.EVENTS),
  },
  {
    id: "act-create-task",
    category: "Quick Actions",
    title: "Assign Committee Kanban Task",
    subtitle: "Create a task with deadline & high-priority tags",
    icon: Award,
    action: (navigate) => navigate(ROUTES.TASKS),
  },
  {
    id: "act-privacy-export",
    category: "Security & Compliance",
    title: "Download GDPR Privacy Export",
    subtitle: "Download an instant JSON archive of your institutional footprint",
    icon: Shield,
    action: (navigate) => navigate(ROUTES.PROFILE),
  },
  {
    id: "nav-settings",
    category: "Navigation",
    title: "Open Institutional Settings",
    subtitle: "Configure charter presets, FERPA, MFA & AI modules",
    icon: Settings,
    action: (navigate) => navigate(ROUTES.SETTINGS),
    shortcut: "S",
  },
];

export default function CommandPalette({ onOpenCopilot }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Handle Ctrl+K / Cmd+K toggle & Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Filter commands by search query
  const filteredCommands = PALETTE_COMMANDS.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd) => {
    setIsOpen(false);
    if (cmd.action) {
      cmd.action(navigate, onOpenCopilot);
    }
  };

  const handleListKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) =>
          (prev - 1 + (filteredCommands.length || 1)) %
          (filteredCommands.length || 1)
      );
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredCommands[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="command-palette-title"
      className="fixed inset-0 z-[120] flex items-start justify-center bg-black/80 backdrop-blur-xl pt-[15vh] p-4"
      onClick={() => setIsOpen(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl border border-white/20 bg-[#0A0D1A]/95 overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.2)] flex flex-col"
      >
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-[#080B16]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            id="command-palette-title"
            type="text"
            placeholder="Type a command or search OrgOS (e.g. 'events', 'settings', 'copilot')..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleListKeyDown}
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none font-sans"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="px-2 py-0.5 rounded-lg bg-white/10 text-[10px] font-mono font-bold text-zinc-300">
              ESC
            </span>
          </div>
        </div>

        {/* Command List Options */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Terminal className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-xs font-mono text-zinc-400">
                No matching OrgOS commands found for "{query}".
              </p>
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              const IconComp = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => handleSelect(cmd)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full p-3.5 rounded-2xl flex items-center justify-between transition text-left cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/40"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-cyan-500 text-black font-bold"
                          : "bg-white/10 text-cyan-400"
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {cmd.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400">
                          {cmd.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        {cmd.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {cmd.shortcut && (
                      <span className="px-2 py-1 rounded-lg bg-white/10 text-[10px] font-mono font-bold text-zinc-300">
                        {cmd.shortcut}
                      </span>
                    )}
                    <ArrowRight
                      className={`w-4 h-4 ${
                        isSelected ? "text-cyan-400 translate-x-1" : "text-zinc-600"
                      } transition-transform`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="px-6 py-2.5 border-t border-white/10 bg-[#080B16] flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <Command className="w-3.5 h-3.5" />
            <span>Enterprise Command Palette Active</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
