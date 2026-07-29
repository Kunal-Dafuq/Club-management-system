import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Users,
  Calendar,
  Award,
  Sparkles,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import GlowButton from "./GlowButton";

/**
 * Interactive Club Modal overlay for Scene 6.
 * Displays rich club telemetry, coordinators, upcoming events,
 * recruitment status, and interactive join actions.
 */
const ClubModal = ({ club, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!club) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="
            relative w-full max-w-4xl max-h-[88vh] overflow-y-auto
            rounded-3xl border border-white/15 bg-zinc-950/90
            backdrop-blur-2xl shadow-[0_0_80px_rgba(6,182,212,0.25)]
            text-white custom-scrollbar
          "
        >
          {/* Top Banner Glow & Color Strip */}
          <div
            className="h-28 w-full relative overflow-hidden rounded-t-3xl border-b border-white/10"
            style={{
              background: `linear-gradient(135deg, ${club.color}33 0%, rgba(9,10,15,0.9) 100%)`,
            }}
          >
            <div
              className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[90px]"
              style={{ backgroundColor: club.color }}
            />
            
            <div className="absolute bottom-4 left-8 flex items-center gap-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/20 text-white"
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: club.color }} />
                {club.category}
              </span>

              {club.activeRecruitment ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Recruiting Open
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-700/40 text-zinc-400 border border-zinc-600/30">
                  Recruitment Closed
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Header */}
          <div className="p-8 pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {club.name}
                </h2>
                <p className="mt-1 text-base text-zinc-400 font-medium">
                  {club.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-bold">{club.currentMembers} Members</span>
                </div>

                <GlowButton size="sm" variant="primary">
                  Join Club
                  <ExternalLink className="w-4 h-4" />
                </GlowButton>
              </div>
            </div>

            {/* Club Description */}
            <p className="mt-6 text-zinc-300 leading-relaxed text-base border-t border-white/10 pt-6">
              {club.description}
            </p>
          </div>

          {/* Detailed Sections Grid */}
          <div className="p-8 pt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coordinators & Leadership */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-400">
                <UserCheck className="w-4 h-4" />
                Club Leadership
              </h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-zinc-500 uppercase font-mono">Faculty Coordinator</span>
                  <p className="text-sm font-semibold text-zinc-200 mt-0.5">{club.facultyCoordinator}</p>
                </div>
                <div>
                  <span className="text-xs text-zinc-500 uppercase font-mono">Student Coordinators</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {club.studentCoordinators.map((coord, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/10 border border-white/15 text-zinc-300"
                      >
                        {coord}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-violet-400">
                <Calendar className="w-4 h-4" />
                Upcoming Events
              </h3>
              
              <ul className="space-y-2.5">
                {club.upcomingEvents.map((ev, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between text-sm px-3 py-2 rounded-xl bg-white/5 border border-white/10"
                  >
                    <span className="font-medium text-zinc-200">{ev}</span>
                    <span className="text-xs font-mono text-cyan-400">RSVP Open</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Achievements */}
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                <Award className="w-4 h-4" />
                Featured Achievements
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {club.achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-zinc-200">{ach}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Preview Box */}
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-900/20 via-cyan-900/20 to-violet-900/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold text-white">Verified Official Organization</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Connected to ClubPlanet OrgOS • Audit verified by Student Affairs
                </p>
              </div>
              <GlowButton
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                Return to Club Office
              </GlowButton>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClubModal;
