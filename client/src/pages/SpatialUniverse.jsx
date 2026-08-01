import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  MapPin,
  LayoutGrid,
  Orbit,
  Lock,
  Compass,
} from "lucide-react";

import PortalGateway2D from "../features/spatial/PortalGateway2D";
import PortalItemModal from "../features/spatial/PortalItemModal";
import CelestialRailMap2D, { CELESTIAL_RAIL_DATA } from "../features/spatial/CelestialRailMap2D";
import CelestialOverview2D from "../features/spatial/CelestialOverview2D";

export default function SpatialUniverse() {
  const [isOpen, setIsOpen] = useState(true); // Default open to reveal rail network inside the door
  const [activeTrack, setActiveTrack] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("COSMOS"); // "COSMOS" | "MAP" | "GRID"
  const [selectedItem, setSelectedItem] = useState(null);

  const handleTogglePortal = () => {
    setIsOpen((prev) => !prev);
  };

  // Convert CELESTIAL_RAIL_DATA into a flat array of items for grid mode or search
  const allItems = useMemo(() => {
    const clubs = CELESTIAL_RAIL_DATA.CLUBS.stations;
    const events = CELESTIAL_RAIL_DATA.EVENTS.stations;
    const gov = CELESTIAL_RAIL_DATA.GOVERNANCE.stations;
    return [...clubs, ...events, ...gov];
  }, []);

  const filteredItems = useMemo(() => {
    let items = allItems;
    if (activeTrack !== "ALL") {
      items = items.filter((it) => it.track === activeTrack);
    }
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (it) =>
        it.title.toLowerCase().includes(query) ||
        it.category.toLowerCase().includes(query) ||
        it.subtitle.toLowerCase().includes(query) ||
        it.description.toLowerCase().includes(query)
    );
  }, [allItems, activeTrack, searchQuery]);

  return (
    <div className="min-h-screen bg-[#06080F] text-white selection:bg-cyan-500/30 selection:text-white pb-16">
      {/* 1. TOP EXECUTIVE HEADER BAR */}
      <header className="sticky top-0 z-40 w-full bg-[#06080F]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a
            href="/dashboard"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Dashboard</span>
          </a>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>CLUBPLANET ENTERPRISE</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-white font-bold">CAMPUS CELESTIAL PORTAL</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-cyan-400 font-bold">CELESTIAL OVERVIEW</span>
          </div>
        </div>

        {/* Search Filter, View Mode Switcher, and Verified Badge */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[11px] font-mono font-extrabold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>✦ SOC 2 / FERPA VERIFIED</span>
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search star-stations..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
            />
          </div>

          <div className="flex items-center bg-black/60 border border-white/15 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("COSMOS")}
              title="2D Celestial Overview (Ditto to Photo)"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "COSMOS"
                  ? "bg-gradient-to-r from-cyan-500/30 to-violet-500/30 border border-cyan-400/60 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)] font-extrabold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden md:inline">2D Celestial Portal</span>
            </button>
            <button
              onClick={() => setViewMode("MAP")}
              title="Celestial Star-Rail Map View"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "MAP"
                  ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Rail Map</span>
            </button>
            <button
              onClick={() => setViewMode("GRID")}
              title="Executive Card Grid View"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "GRID"
                  ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Card Grid</span>
            </button>
          </div>

          <a
            href="/dashboard"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-300 text-xs font-bold transition-all cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Close Portal</span>
          </a>
        </div>
      </header>

      {/* 2. MAIN CONTAINER - EITHER 2D CELESTIAL OVERVIEW OR GATEWAY 2D */}
      {viewMode === "COSMOS" ? (
        <main className="w-full h-full">
          <CelestialOverview2D
            selectedTrack={activeTrack}
            onSelectNode={setSelectedItem}
            onClosePortal={() => setIsOpen(false)}
          />
        </main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
          <PortalGateway2D
            isOpen={isOpen}
            onTogglePortal={handleTogglePortal}
          >
            {/* BEHIND THE SLIDING DOORS: THE INTERCONNECTED CONSTELLATION MAP OR GRID */}
            <AnimatePresence mode="wait">
              {viewMode === "MAP" ? (
                /* CELESTIAL STAR-RAIL MAP VIEW INSIDE THE DOOR */
                <motion.div
                  key="map-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex-1 flex flex-col"
                >
                  <CelestialRailMap2D
                    selectedTrack={activeTrack}
                    onSelectTrack={setActiveTrack}
                    onSelectStation={setSelectedItem}
                  />
                </motion.div>
              ) : (
                /* EXECUTIVE CARD GRID VIEW INSIDE THE DOOR */
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 overflow-y-auto max-h-[700px] space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-white">
                      Executive Directory Grid
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Tabular listing of all 15 star-stations across our OrgOS ecosystem
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {["ALL", "CLUBS", "EVENTS", "GOVERNANCE"].map((tk) => (
                      <button
                        key={tk}
                        onClick={() => setActiveTrack(tk)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          activeTrack === tk
                            ? "bg-white/15 border-white/40 text-white"
                            : "bg-white/5 border-transparent text-zinc-400 hover:text-white"
                        }`}
                      >
                        {tk === "ALL" ? "✦ All Tracks" : `${tk}`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="group relative rounded-3xl bg-gradient-to-b from-[#0E1122] via-[#0A0D1B] to-[#070913] border border-white/10 hover:border-cyan-400/40 p-5 flex flex-col justify-between transition-all hover:shadow-[0_10px_35px_rgba(6,182,212,0.15)]"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                            {item.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400">
                            {item.code}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h4>

                        <div className="text-xs font-semibold text-zinc-400 mt-1">
                          {item.subtitle}
                        </div>

                        <p className="text-xs text-zinc-400 leading-relaxed mt-2.5 line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {item.stats && (
                        <div className="grid grid-cols-3 gap-1.5 my-4 pt-3 border-t border-white/10">
                          {item.stats.map((st, i) => (
                            <div
                              key={i}
                              className="p-1.5 rounded-xl bg-white/5 border border-white/5 text-center"
                            >
                              <div className="text-[9px] font-mono font-bold text-zinc-500">
                                {st.label}
                              </div>
                              <div
                                className={`text-xs font-bold mt-0.5 ${st.color}`}
                              >
                                {st.val}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2.5 pt-1">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-semibold transition-colors text-center cursor-pointer"
                        >
                          Inspect Station
                        </button>

                        <a
                          href={item.ctaUrl || "/dashboard"}
                          className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:scale-105 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </PortalGateway2D>
      </main>
      )}

      {/* Selected Station Detail Modal */}
      <PortalItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
