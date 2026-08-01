import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  QrCode,
  CheckCircle2,
  X,
  Ticket,
  Filter,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import { EVENTS_DATA } from "../constants/landingData";
import AutoCompleteSearch from "../components/ui/AutoCompleteSearch";
import RoleGovernanceBar from "../components/ui/RoleGovernanceBar";

const EVENT_CATEGORIES = [
  "All Events",
  "Hackathon",
  "Competition",
  "Cultural",
  "Business",
  "Workshop",
];

const Events = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "timeline"
  const [qrModalEvent, setQrModalEvent] = useState(null);

  // Live Ticking Countdown Clock for Flagship HackPlanet
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 28,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((ev) => {
      const matchesSearch =
        ev.title.toLowerCase().includes(search.toLowerCase()) ||
        (ev.clubName &&
          ev.clubName.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        selectedCategory === "All Events" ||
        ev.category?.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const featuredEvent = useMemo(() => {
    return (
      EVENTS_DATA.find((ev) => ev.category === "Hackathon") || EVENTS_DATA[0]
    );
  }, []);

  return (
    <div className="space-y-10">
      <RoleGovernanceBar />
      {/* QR Ticket Holographic Modal */}
      <AnimatePresence>
        {qrModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#10152B] to-[#0A0D18] border border-cyan-400/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-center space-y-6"
            >
              <button
                onClick={() => setQrModalEvent(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-xs font-mono font-bold text-cyan-300">
                <Ticket className="w-3.5 h-3.5" />
                <span>HOLOGRAPHIC ORGOS ENTRY PASS</span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white">
                  {qrModalEvent.title}
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  {qrModalEvent.clubName || "Main Campus Auditorium"}
                </p>
              </div>

              {/* QR Box */}
              <div className="mx-auto w-52 h-52 p-4 rounded-3xl bg-white flex items-center justify-center shadow-2xl">
                <QrCode className="w-40 h-40 text-black" />
              </div>

              <div className="text-xs font-mono text-zinc-400 space-y-1">
                <div>PASS ID: #ORGOS-2026-8891</div>
                <div className="text-emerald-400 font-bold">
                  ✓ VERIFIED & ENCRYPTED IN PRISMA DB
                </div>
              </div>

              <button
                onClick={() => setQrModalEvent(null)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm"
              >
                Close Pass
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Flagship Event Countdown Hero */}
      {featuredEvent && (
        <div className="relative rounded-3xl overflow-hidden border border-cyan-500/40 bg-gradient-to-br from-cyan-950/60 via-[#0E1224] to-violet-950/60 p-8 sm:p-10 shadow-[0_0_50px_rgba(6,182,212,0.25)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold uppercase bg-cyan-500/20 border border-cyan-400 text-cyan-300">
                  FLAGSHIP HACKATHON
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 border border-amber-400 text-amber-300">
                  {featuredEvent.badge || "$10,000 PRIZE POOL"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {featuredEvent.title}
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {featuredEvent.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>{featuredEvent.date || "March 15-17, 2026"}</span>
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-violet-400" />
                  <span>{featuredEvent.location || "Main Auditorium"}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>1,116 / 1,500 Seats Registered</span>
                </span>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => setQrModalEvent(featuredEvent)}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-105 transition-transform cursor-pointer flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>RSVP / Generate QR Pass</span>
                </button>
              </div>
            </div>

            {/* Right Column: Live Ticking Countdown Clock */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <div className="w-full max-w-sm p-6 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-xl space-y-5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>LIVE ORGOS COUNTDOWN</span>
                  <span className="text-emerald-400 font-bold animate-pulse">
                    ● SYNCED
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { val: timeLeft.days, label: "DAYS" },
                    { val: timeLeft.hours, label: "HOURS" },
                    { val: timeLeft.minutes, label: "MINS" },
                    { val: timeLeft.seconds, label: "SECS" },
                  ].map((unit, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <div className="text-2xl font-extrabold text-cyan-400 font-mono">
                        {String(unit.val).padStart(2, "0")}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase mt-1">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>Registration Fill Rate</span>
                    <span className="text-cyan-400 font-bold">74% Capacity</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Strip & Grid/Timeline View Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {EVENT_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400/50"
                    : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-cyan-500 text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Ticket Grid
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === "timeline"
                  ? "bg-cyan-500 text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Hour Timeline
            </button>
          </div>

          <div className="w-64">
            <AutoCompleteSearch
              items={EVENTS_DATA.map((ev, i) => ({
                id: `ev-${i}`,
                label: ev.title,
                category: ev.category || "Event",
                raw: ev,
              }))}
              placeholder="Search event schedule..."
              value={search}
              onChange={setSearch}
              onSelect={(item) => {
                if (item?.title) setSearch(item.title);
              }}
            />
          </div>
        </div>
      </div>

      {/* VIEW 1: TICKET GRID VIEW */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative rounded-3xl overflow-hidden bg-[#0A0D18] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between p-6 space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-white/5 border border-white/10 text-cyan-400">
                    {ev.category || "CAMPUS EVENT"}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    #{idx + 101}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {ev.title}
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                  {ev.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{ev.date || "July 29, 2026"}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-violet-400" />
                    <span>{ev.location || "Room 104"}</span>
                  </span>
                </div>

                <button
                  onClick={() => setQrModalEvent(ev)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                >
                  <Ticket className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Get QR Pass</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* VIEW 2: TIMELINE SCHEDULE VIEW */}
      {viewMode === "timeline" && (
        <div className="rounded-3xl border border-white/10 bg-[#0A0D18] p-6 space-y-4">
          <div className="text-xs font-mono font-extrabold uppercase tracking-widest text-zinc-500 pb-2 border-b border-white/10">
            Hour-by-Hour Campus Activity Schedule
          </div>

          <div className="space-y-3">
            {filteredEvents.map((ev, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 text-xs font-mono font-bold text-cyan-400">
                    {`0${(i % 8) + 9}:00 AM`}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      {ev.clubName || "Main Campus Auditorium"} • {ev.location || "Room 104"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setQrModalEvent(ev)}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-bold text-xs hover:bg-cyan-500/30 transition-colors cursor-pointer"
                >
                  RSVP Pass
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;