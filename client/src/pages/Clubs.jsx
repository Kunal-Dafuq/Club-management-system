import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Sparkles,
  Trophy,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Filter,
  Shield,
  UserCheck,
  Compass,
  Zap,
} from "lucide-react";
import { CLUBS_DATA } from "../constants/landingData";
import AutoCompleteSearch from "../components/ui/AutoCompleteSearch";
import RoleGovernanceBar from "../components/ui/RoleGovernanceBar";

const CATEGORIES = [
  "All Categories",
  "Technical",
  "Cultural",
  "Creative",
  "Literary",
  "Business",
  "Recreation",
  "Social Impact",
];

const BANNER_GRADIENTS = [
  "from-cyan-500/20 via-blue-500/10 to-transparent",
  "from-violet-500/20 via-purple-500/10 to-transparent",
  "from-emerald-500/20 via-teal-500/10 to-transparent",
  "from-amber-500/20 via-orange-500/10 to-transparent",
  "from-pink-500/20 via-rose-500/10 to-transparent",
];

const Clubs = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedClub, setSelectedClub] = useState(null);
  const [myMemberships, setMyMemberships] = useState(["acm", "cyborg", "tasveer", "astronuts", "electroholics", "muse", "lda", "foobar"]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleMembership = (clubId, e) => {
    e.stopPropagation();
    setMyMemberships((prev) => {
      const exists = prev.includes(clubId);
      const next = exists
        ? prev.filter((id) => id !== clubId)
        : [...prev, clubId];
      const clubName =
        CLUBS_DATA.find((c) => c.id === clubId)?.name || "Club";
      showToast(
        exists
          ? `Left ${clubName} membership roster`
          : `Joined ${clubName} active roster!`
      );
      return next;
    });
  };

  const filteredClubs = useMemo(() => {
    return CLUBS_DATA.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(search.toLowerCase()) ||
        club.tagline.toLowerCase().includes(search.toLowerCase()) ||
        club.description.toLowerCase().includes(search.toLowerCase());

      const matchesCat =
        selectedCategory === "All Categories" ||
        club.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);

  const totalMembers = useMemo(() => {
    return CLUBS_DATA.reduce((sum, c) => sum + (c.currentMembers || 0), 0);
  }, []);

  return (
    <div className="space-y-10">
      <RoleGovernanceBar />
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 backdrop-blur-xl flex items-center gap-2.5 text-cyan-300 font-semibold text-sm shadow-[0_0_30px_rgba(6,182,212,0.4)]"
          >
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discovery-First Hero Header */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#0D1022] via-[#0A0D18] to-[#12102A] p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-xs font-mono font-bold text-cyan-400">
              <Compass className="w-3.5 h-3.5" />
              <span>ORGOS CAMPUS DIRECTORY // CHARTERED SOCIETIES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Discover Organizations
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explore officially chartered student societies, technical chapters, and creative collectives. Filter by domain or join an orbit in one click.
            </p>
          </div>

          {/* OrgOS Telemetry Metrics Pill */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
            <div className="text-center px-3 border-r border-white/10">
              <div className="text-xl font-extrabold text-white font-mono">
                {CLUBS_DATA.length}
              </div>
              <div className="text-[10px] uppercase font-mono text-zinc-400">
                Active Clubs
              </div>
            </div>
            <div className="text-center px-3 border-r border-white/10">
              <div className="text-xl font-extrabold text-cyan-400 font-mono">
                {totalMembers.toLocaleString()}
              </div>
              <div className="text-[10px] uppercase font-mono text-zinc-400">
                Total Members
              </div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl font-extrabold text-violet-400 font-mono">
                34
              </div>
              <div className="text-[10px] uppercase font-mono text-zinc-400">
                Committees
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Category Filter Bar & Self-Fillable Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
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

        <div className="w-full lg:w-80">
          <AutoCompleteSearch
            items={CLUBS_DATA.map((c) => ({
              id: c.id,
              label: c.name,
              category: c.category,
              raw: c,
            }))}
            placeholder="Type 'A' (e.g. ABACUS Society)..."
            value={search}
            onChange={setSearch}
            onSelect={(item) => {
              if (item?.name) setSearch(item.name);
            }}
          />
        </div>
      </div>

      {/* Banner-Heavy Magazine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club, idx) => {
          const isMember = myMemberships.includes(club.id);
          const bannerGrad = BANNER_GRADIENTS[idx % BANNER_GRADIENTS.length];

          return (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden bg-[#0A0D18] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* Top Banner Artwork */}
              <div className={`h-40 w-full bg-gradient-to-br ${bannerGrad} relative p-6 flex flex-col justify-between overflow-hidden`}>
                <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full border border-white/10 opacity-20 pointer-events-none" />
                <div className="absolute right-4 bottom-4 w-20 h-20 rounded-full border border-cyan-400/20 opacity-30 pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/15 text-cyan-300">
                    {club.category}
                  </span>

                  <button
                    onClick={(e) => toggleMembership(club.id, e)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-mono transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isMember
                        ? "bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        : "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                    }`}
                  >
                    {isMember ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>MEMBER</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>+ ORBIT</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Overlapping Club Badge & Initial */}
                <div className="flex items-center gap-3 relative z-10 mt-auto">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-lg text-white shadow-xl border border-white/20"
                    style={{ backgroundColor: club.color || "#06B6D4" }}
                  >
                    {club.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {club.name}
                    </h3>
                    <p className="text-xs text-zinc-300 font-mono line-clamp-1">
                      {club.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                  {club.description}
                </p>

                {/* Upcoming Events Ribbon */}
                {club.upcomingEvents?.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-zinc-500">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Next Flagship Event</span>
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      {club.upcomingEvents[0]}
                    </div>
                  </div>
                )}

                {/* Footer: Member Avatar Stack & Details Link */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  {/* Avatar Stack */}
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-cyan-500 border-2 border-[#0A0D18] flex items-center justify-center text-[10px] font-bold text-black">
                        SV
                      </div>
                      <div className="w-7 h-7 rounded-full bg-violet-500 border-2 border-[#0A0D18] flex items-center justify-center text-[10px] font-bold text-white">
                        KD
                      </div>
                      <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-[#0A0D18] flex items-center justify-center text-[10px] font-bold text-black">
                        AR
                      </div>
                    </div>
                    <span className="ml-2.5 text-xs font-mono text-zinc-400">
                      +{club.currentMembers || 120} members
                    </span>
                  </div>

                  <a
                    href={`/clubs/${club.id}`}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/link"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sleek Empty Search State */}
      {filteredClubs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-white/10 bg-[#0A0D18]/80 backdrop-blur-xl p-16 text-center space-y-4 max-w-xl mx-auto shadow-2xl"
        >
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
            <Compass className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="text-xl font-extrabold text-white">
            No Student Clubs Matched Your Search
          </h3>
          <p className="text-sm text-zinc-400 max-w-sm mx-auto">
            Try adjusting your keyword filter or switching category tabs to explore IIIT-Delhi's official organizations.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All Categories");
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs tracking-wider uppercase transition shadow-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Clubs;