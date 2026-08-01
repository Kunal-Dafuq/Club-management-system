import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Building2,
  Calendar,
  Layers,
  ExternalLink,
  ChevronRight,
  Info,
  Share2,
} from "lucide-react";

// Star-Stations plotted on a 1000x560 celestial rail coordinate system
export const CELESTIAL_RAIL_DATA = {
  CLUBS: {
    id: "CLUBS",
    title: "Clubs & Societies Rail Track",
    color: "#06B6D4",
    secondaryColor: "#7C3AED",
    bgClass: "bg-cyan-500/20 text-cyan-300 border-cyan-400/50",
    path: "M 140 140 C 210 105, 250 105, 280 105 C 360 105, 380 155, 440 155 C 520 155, 540 115, 600 115 C 680 115, 700 170, 760 170 C 820 170, 840 120, 890 120",
    stations: [
      {
        id: "tasveer",
        track: "CLUBS",
        type: "CLUB",
        code: "C-01",
        title: "TASVEER",
        category: "Creative",
        subtitle: "Photography Club at IIIT Delhi",
        description:
          "Tasveer is the photography club at IIIT Delhi. We nurture budding photographers and photo enthusiasts through photowalks, exhibitions, and digital editing labs.",
        x: 140,
        y: 140,
        color: "#06B6D4",
        stats: [
          { label: "2M EVENTS", val: "14 EVENTS", color: "text-cyan-400" },
          { label: "PARTICIPATION", val: "1,850 ATTENDEES", color: "text-emerald-400" },
          { label: "RANK", val: "#1 MOST ACTIVE", color: "text-violet-400" },
        ],
        ctaLabel: "Open Club Directory",
        ctaUrl: "/clubs",
        status: "TOP ACTIVE ORBIT",
      },
      {
        id: "astronuts",
        track: "CLUBS",
        type: "CLUB",
        code: "C-02",
        title: "ASTRONUTS",
        category: "Technical",
        subtitle: "Astronomy Club of IIIT Delhi",
        description:
          "Astronuts is the astronomy club of IIIT Delhi. We aim to enrich the astronomy culture on our campus and provide a home to star gazers and cosmic explorers.",
        x: 280,
        y: 105,
        color: "#7C3AED",
        stats: [
          { label: "2M EVENTS", val: "12 EVENTS", color: "text-cyan-400" },
          { label: "PARTICIPATION", val: "1,620 ATTENDEES", color: "text-emerald-400" },
          { label: "RANK", val: "#2 MOST ACTIVE", color: "text-violet-400" },
        ],
        ctaLabel: "Open Club Directory",
        ctaUrl: "/clubs",
        status: "TOP ACTIVE ORBIT",
      },
      {
        id: "electroholics",
        track: "CLUBS",
        type: "CLUB",
        code: "C-03",
        title: "ELECTROHOLICS",
        category: "Technical",
        subtitle: "Hardware Enthusiasts from IIIT-Delhi",
        description:
          "Electroholics is a group of hardware enthusiasts from IIIT-Delhi. We believe in the spirit of creativity and open knowledge in electronics and IoT design.",
        x: 440,
        y: 155,
        color: "#F59E0B",
        stats: [
          { label: "2M EVENTS", val: "11 EVENTS", color: "text-amber-400" },
          { label: "PARTICIPATION", val: "1,480 ATTENDEES", color: "text-emerald-400" },
          { label: "RANK", val: "#3 MOST ACTIVE", color: "text-violet-400" },
        ],
        ctaLabel: "Open Club Directory",
        ctaUrl: "/clubs",
        status: "TOP ACTIVE ORBIT",
      },
      {
        id: "muse",
        track: "CLUBS",
        type: "CLUB",
        code: "C-04",
        title: "MUSE",
        category: "Creative",
        subtitle: "Fashion & Creative Styling Society",
        description:
          "The club aims to change how fashion is perceived, promote fashion as a form of expression, and enable students to portray avant-garde aesthetics and styling.",
        x: 600,
        y: 115,
        color: "#EC4899",
        stats: [
          { label: "2M EVENTS", val: "10 EVENTS", color: "text-pink-400" },
          { label: "PARTICIPATION", val: "1,410 ATTENDEES", color: "text-emerald-400" },
          { label: "RANK", val: "#4 MOST ACTIVE", color: "text-violet-400" },
        ],
        ctaLabel: "Open Club Directory",
        ctaUrl: "/clubs",
        status: "TOP ACTIVE ORBIT",
      },
      {
        id: "lda",
        track: "CLUBS",
        type: "CLUB",
        code: "C-05",
        title: "LDA (LITERATURE DEBATE ANIME)",
        category: "Literary",
        subtitle: "Debate, Writing & Anime Society",
        description:
          "LDA (Literature, Debate & Anime), formerly LitSoc, is one of the largest student societies, bringing together creative minds for parliamentary debates, creative writing, and anime discussions.",
        x: 760,
        y: 170,
        color: "#10B981",
        stats: [
          { label: "2M EVENTS", val: "10 EVENTS", color: "text-emerald-400" },
          { label: "PARTICIPATION", val: "1,350 ATTENDEES", color: "text-cyan-400" },
          { label: "RANK", val: "#5 MOST ACTIVE", color: "text-violet-400" },
        ],
        ctaLabel: "Open Club Directory",
        ctaUrl: "/clubs",
        status: "TOP ACTIVE ORBIT",
      },
      {
        id: "foobar",
        track: "CLUBS",
        type: "CLUB",
        code: "C-06",
        title: "FOOBAR",
        category: "Technical",
        subtitle: "Competitive Programming Club of IIITD",
        description:
          "The aim of FooBar is to encourage Competitive Programming at our college and develop a very active culture of CP, where algorithmic problem solvers train for ACM-ICPC.",
        x: 890,
        y: 120,
        color: "#3B82F6",
        stats: [
          { label: "2M EVENTS", val: "9 EVENTS", color: "text-blue-400" },
          { label: "PARTICIPATION", val: "1,320 ATTENDEES", color: "text-emerald-400" },
          { label: "RANK", val: "#6 MOST ACTIVE", color: "text-violet-400" },
        ],
        ctaLabel: "Open Club Directory",
        ctaUrl: "/clubs",
        status: "TOP ACTIVE ORBIT",
      },
    ],
  },

  EVENTS: {
    id: "EVENTS",
    title: "Upcoming Events & Championships Rail Track",
    color: "#F59E0B",
    secondaryColor: "#EC4899",
    bgClass: "bg-amber-500/20 text-amber-300 border-amber-400/50",
    path: "M 180 300 C 265 350, 290 350, 350 350 C 430 350, 450 290, 510 290 C 590 290, 610 340, 670 340 C 755 340, 780 280, 840 280",
    stations: [
      {
        id: "hackplanet_event",
        track: "EVENTS",
        type: "EVENT",
        code: "E-01",
        title: "HACKPLANET 2026 FLAGSHIP",
        category: "Annual Hackathon Arena",
        subtitle: "Oct 15–17, 2026 • 1,116 / 1,500 Seats • $10,000 Prize",
        description:
          "University Annual Flagship Hackathon. 36 hours of continuous building, mentorship, and VC judging. Holographic QR Pass #ORGOS-2026-8891 active.",
        x: 180,
        y: 300,
        color: "#F59E0B",
        stats: [
          { label: "SEATS FILLED", val: "1,116 / 1,500", color: "text-amber-400" },
          { label: "PRIZE POOL", val: "$10,000 USD", color: "text-emerald-400" },
          { label: "VENUE", val: "MAIN ARENA HALL", color: "text-pink-400" },
        ],
        ctaLabel: "Open Events Calendar",
        ctaUrl: "/events",
        status: "RSVP OPEN",
      },
      {
        id: "rover_war",
        track: "EVENTS",
        type: "EVENT",
        code: "E-02",
        title: "ROBOTICS ROVER WAR 2026",
        category: "National Autonomous Challenge",
        subtitle: "Nov 04, 2026 • 32 Competing Squads • Outdoor Stadium",
        description:
          "National Autonomous Rover obstacle course and LiDAR challenge. Watch 32 university squads battle across simulated Martian terrain.",
        x: 350,
        y: 350,
        color: "#06B6D4",
        stats: [
          { label: "SQUADS", val: "32 FINALISTS", color: "text-cyan-400" },
          { label: "FIRST PRIZE", val: "$4,500 + NVIDIA KIT", color: "text-emerald-400" },
          { label: "VENUE", val: "STADIUM TRACK B", color: "text-violet-400" },
        ],
        ctaLabel: "Open Events Calendar",
        ctaUrl: "/events",
        status: "RSVP OPEN",
      },
      {
        id: "symphony_live",
        track: "EVENTS",
        type: "EVENT",
        code: "E-03",
        title: "SYMPHONY NIGHT LIVE CONCERT",
        category: "Open Air Musical Gala",
        subtitle: "Nov 18, 2026 • 2,400 RSVP Tickets • Open Air Theatre",
        description:
          "Annual open-air musical gala featuring 85-piece student symphony orchestra and acoustic electronic fusion bands. Free campus entry with QR pass.",
        x: 510,
        y: 290,
        color: "#EC4899",
        stats: [
          { label: "RSVP ISSUED", val: "2,400 TICKETS", color: "text-pink-400" },
          { label: "GUEST ARTISTS", val: "3 HEADLINERS", color: "text-emerald-400" },
          { label: "VENUE", val: "OPEN AIR THEATRE", color: "text-violet-400" },
        ],
        ctaLabel: "Open Events Calendar",
        ctaUrl: "/events",
        status: "RSVP OPEN",
      },
      {
        id: "algo_hackathon",
        track: "EVENTS",
        type: "EVENT",
        code: "E-04",
        title: "QUANT TRADING ALGO SPRINT",
        category: "Quantitative Options Competition",
        subtitle: "Dec 02, 2026 • 400 Trading Teams • Finance Lab 101",
        description:
          "8-hour quantitative options pricing and automated trading competition hosted by ABACUS Society on simulated exchange servers.",
        x: 670,
        y: 340,
        color: "#7C3AED",
        stats: [
          { label: "REGISTERED", val: "400 TRADERS", color: "text-violet-400" },
          { label: "SERVER LATENCY", val: "0.4ms SIMULATED", color: "text-emerald-400" },
          { label: "VENUE", val: "FINANCE LAB 101", color: "text-cyan-400" },
        ],
        ctaLabel: "Open Events Calendar",
        ctaUrl: "/events",
        status: "REGISTRATION",
      },
      {
        id: "leadership_summit",
        track: "EVENTS",
        type: "EVENT",
        code: "E-05",
        title: "LEADERSHIP & GOVERNANCE SUMMIT",
        category: "University Executive Council",
        subtitle: "Dec 14, 2026 • All 9 Club Councils • Main Auditorium",
        description:
          "Annual executive session where all 9 chartered student organization presidents present yearly budget audits and elect next academic council.",
        x: 840,
        y: 280,
        color: "#10B981",
        stats: [
          { label: "ATTENDANCE", val: "ALL 9 COUNCILS", color: "text-emerald-400" },
          { label: "AUDIT ACCURACY", val: "100% PRISMA SYNC", color: "text-cyan-400" },
          { label: "VENUE", val: "MAIN AUDITORIUM", color: "text-amber-400" },
        ],
        ctaLabel: "Open Events Calendar",
        ctaUrl: "/events",
        status: "MANDATORY",
      },
    ],
  },

  GOVERNANCE: {
    id: "GOVERNANCE",
    title: "Executive Governance Rail Track",
    color: "#10B981",
    secondaryColor: "#3B82F6",
    bgClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50",
    path: "M 220 480 C 320 450, 340 450, 420 450 C 520 450, 540 490, 620 490 C 715 490, 735 450, 810 450",
    stations: [
      {
        id: "settings_core",
        track: "GOVERNANCE",
        type: "GOVERNANCE",
        code: "G-01",
        title: "21-MODULE ENTERPRISE CONSOLE",
        category: "Schema-Driven Admin Suite",
        subtitle: "5 Domains • 21 Config Ready • ISO-27001 Security",
        description:
          "Central executive administration suite controlling Workspace, Branding, Security, AI Quotas, and Tamper-Evident Audit Logs across all clubs.",
        x: 220,
        y: 480,
        color: "#10B981",
        stats: [
          { label: "MODULES", val: "21 CONFIG READY", color: "text-emerald-400" },
          { label: "DIRTY-STATE", val: "SYNCED WITH DB", color: "text-cyan-400" },
          { label: "SECURITY TIER", val: "ISO-27001", color: "text-violet-400" },
        ],
        ctaLabel: "Open 21-Module Settings",
        ctaUrl: "/settings",
        status: "PRODUCTION",
      },
      {
        id: "rbac_ferpa",
        track: "GOVERNANCE",
        type: "GOVERNANCE",
        code: "G-02",
        title: "FERPA / GDPR COMPLIANCE VAULT",
        category: "Student Privacy & Audit Control",
        subtitle: "100% Protected • Directory Masked • MFA Enforced",
        description:
          "Enforces strict academic privacy regulations, campus IP whitelisting, hardware MFA requirements, and automated student consent logging.",
        x: 420,
        y: 450,
        color: "#06B6D4",
        stats: [
          { label: "FERPA STATUS", val: "100% PROTECTED", color: "text-cyan-400" },
          { label: "DIRECTORY", val: "MASKED ON CLUBS", color: "text-emerald-400" },
          { label: "MFA POLICY", val: "HARDWARE TOTP REQUIRED", color: "text-violet-400" },
        ],
        ctaLabel: "Open 21-Module Settings",
        ctaUrl: "/settings",
        status: "COMPLIANT",
      },
      {
        id: "ai_quotas",
        track: "GOVERNANCE",
        type: "GOVERNANCE",
        code: "G-03",
        title: "AI ENGINE & TOKEN QUOTA COMMAND",
        category: "Enterprise AI & Automation",
        subtitle: "Gemini 2.5 Pro • 100M Token Pool • Autonomous RSVP",
        description:
          "Manages AI budget allocations, real-time word filters, attachment MB quotas, and autonomous RSVP reminder cron jobs across the campus.",
        x: 620,
        y: 490,
        color: "#7C3AED",
        stats: [
          { label: "AI MODEL", val: "GEMINI 2.5 PRO", color: "text-violet-400" },
          { label: "TOKEN BUDGET", val: "100M / MONTH", color: "text-cyan-400" },
          { label: "MEETINGS AI", val: "REALTIME SUMMARY", color: "text-emerald-400" },
        ],
        ctaLabel: "Open 21-Module Settings",
        ctaUrl: "/settings",
        status: "OPERATIONAL",
      },
      {
        id: "disaster_recovery",
        track: "GOVERNANCE",
        type: "GOVERNANCE",
        code: "G-04",
        title: "DISASTER RECOVERY & ROLLBACK VAULT",
        category: "Tamper-Evident Audit & Backups",
        subtitle: "v2.4.0 Golden Snapshot • Safe Mode Ready",
        description:
          "Tamper-evident cryptographic audit logs, hourly PostgreSQL database snapshots, and emergency break-glass read-only Safe Mode toggle.",
        x: 810,
        y: 450,
        color: "#10B981",
        stats: [
          { label: "SNAPSHOT", val: "v2.4.0 GOLDEN", color: "text-amber-400" },
          { label: "AUDIT LOGS", val: "CRYPTOGRAPHIC HASH", color: "text-emerald-400" },
          { label: "SAFE MODE", val: "STANDBY READY", color: "text-pink-400" },
        ],
        ctaLabel: "Open Admin Center",
        ctaUrl: "/admin",
        status: "STANDBY",
      },
    ],
  },
};

// Dotted Interconnected Transfer Rail Links between Clubs & Events
const INTERCHANGE_LINKS = [
  { from: { x: 140, y: 140 }, to: { x: 670, y: 340 } }, // Abacus -> Quant Hackathon
  { from: { x: 280, y: 105 }, to: { x: 350, y: 350 } }, // Robotics -> Rover War
  { from: { x: 440, y: 155 }, to: { x: 510, y: 290 } }, // Symphony -> Symphony Night
  { from: { x: 600, y: 115 }, to: { x: 620, y: 490 } }, // AI Research -> AI Quota Command
];

export default function CelestialRailMap2D({
  selectedTrack,
  onSelectTrack,
  onSelectStation,
}) {
  const [hoveredStation, setHoveredStation] = useState(null);

  const allTracks = Object.values(CELESTIAL_RAIL_DATA);

  return (
    <div className="relative w-full h-full min-h-[620px] bg-[#05070E] flex flex-col justify-between p-4 sm:p-6 select-none overflow-hidden">
      {/* Background Starfield Grid & Cyber Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Filter Strip inside Door */}
      <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-3">
        <div>
          <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
            CELESTIAL ORGOS TRANSIT NETWORK
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
            Interconnected Constellation Rail Map
          </h3>
        </div>

        {/* Track Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onSelectTrack("ALL")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              selectedTrack === "ALL"
                ? "bg-white/15 border-white/40 text-white shadow-lg"
                : "bg-white/5 border-transparent text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            ✦ All Rail Lines
          </button>
          <button
            onClick={() => onSelectTrack("CLUBS")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              selectedTrack === "CLUBS"
                ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-lg"
                : "bg-white/5 border-transparent text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            ● Clubs Line (6)
          </button>
          <button
            onClick={() => onSelectTrack("EVENTS")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              selectedTrack === "EVENTS"
                ? "bg-amber-500/20 border-amber-400/50 text-amber-300 shadow-lg"
                : "bg-white/5 border-transparent text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            ● Events Line (5)
          </button>
          <button
            onClick={() => onSelectTrack("GOVERNANCE")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              selectedTrack === "GOVERNANCE"
                ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-lg"
                : "bg-white/5 border-transparent text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            ● Governance Line (4)
          </button>
        </div>
      </div>

      {/* SVG CELESTIAL INTERCONNECTED RAIL MAP (1000x560 viewBox) */}
      <div className="relative w-full flex-1 min-h-[460px] bg-[#05070E] rounded-2xl border border-white/10 overflow-hidden shadow-inner flex items-center justify-center">
        <svg
          viewBox="0 0 1000 560"
          className="w-full h-full max-h-[520px]"
        >
          <defs>
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="star-halo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* BACKGROUND CONSTELLATION MESH LINES */}
          <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" strokeDasharray="3,6">
            <line x1="100" y1="0" x2="100" y2="560" />
            <line x1="300" y1="0" x2="300" y2="560" />
            <line x1="500" y1="0" x2="500" y2="560" />
            <line x1="700" y1="0" x2="700" y2="560" />
            <line x1="900" y1="0" x2="900" y2="560" />
            <line x1="0" y1="140" x2="1000" y2="140" />
            <line x1="0" y1="320" x2="1000" y2="320" />
            <line x1="0" y1="470" x2="1000" y2="470" />
          </g>

          {/* INTERCHANGE / TRANSFER DOTTED CYBERNETIC RAIL LINKS */}
          <g stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="4,6">
            {INTERCHANGE_LINKS.map((link, idx) => (
              <line
                key={idx}
                x1={link.from.x}
                y1={link.from.y}
                x2={link.to.x}
                y2={link.to.y}
              />
            ))}
          </g>

          {/* MAIN RAIL TRACK CURVES (Paths for Line A, Line B, Line C) */}
          {allTracks.map((trk) => {
            const isVisible = selectedTrack === "ALL" || selectedTrack === trk.id;
            if (!isVisible) return null;

            return (
              <g key={trk.id}>
                {/* Background Track Glow */}
                <path
                  d={trk.path}
                  fill="none"
                  stroke={trk.color}
                  strokeWidth="8"
                  strokeOpacity="0.2"
                  filter="url(#neon-glow)"
                />
                {/* Main Sharp Track Line */}
                <path
                  d={trk.path}
                  fill="none"
                  stroke={trk.color}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* White core transit pulse line */}
                <path
                  d={trk.path}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  strokeDasharray="6,12"
                />
              </g>
            );
          })}

          {/* STAR-STATION NODES ALONG THE RAILS */}
          {allTracks.map((trk) => {
            const isVisible = selectedTrack === "ALL" || selectedTrack === trk.id;
            if (!isVisible) return null;

            return trk.stations.map((stn) => {
              const isHovered = hoveredStation?.id === stn.id;
              return (
                <g
                  key={stn.id}
                  transform={`translate(${stn.x}, ${stn.y})`}
                  onClick={() => onSelectStation(stn)}
                  onMouseEnter={() => setHoveredStation(stn)}
                  onMouseLeave={() => setHoveredStation(null)}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Halo */}
                  <circle
                    r={isHovered ? 26 : 16}
                    fill={stn.color}
                    fillOpacity={isHovered ? 0.35 : 0.15}
                    filter="url(#star-halo)"
                    className="transition-all duration-300"
                  />

                  {/* Star-Station Diamond Border */}
                  <polygon
                    points="0,-12 12,0 0,12 -12,0"
                    fill={isHovered ? "#ffffff" : "#090C1A"}
                    stroke={stn.color}
                    strokeWidth="2.5"
                    className="transition-colors duration-200"
                  />

                  {/* Center Star Core Dot */}
                  <circle
                    r="4"
                    fill={isHovered ? stn.color : "#ffffff"}
                    className="transition-colors duration-200"
                  />

                  {/* Architectural Station Code Pill */}
                  <g transform="translate(16, -14)">
                    <rect
                      x="0"
                      y="0"
                      width="38"
                      height="16"
                      rx="4"
                      fill="#0B0E1B"
                      stroke={stn.color}
                      strokeWidth="1"
                      strokeOpacity="0.6"
                    />
                    <text
                      x="19"
                      y="11"
                      fontSize="9"
                      fill="#ffffff"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {stn.code}
                    </text>
                  </g>

                  {/* Station Title Label Next to Star */}
                  <text
                    x="18"
                    y="14"
                    fontSize="11"
                    fill={isHovered ? "#06B6D4" : "#ffffff"}
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="transition-colors"
                  >
                    {stn.title}
                  </text>

                  {/* Subtitle / Category Label Below */}
                  <text
                    x="18"
                    y="27"
                    fontSize="9"
                    fill="#94a3b8"
                    fontFamily="sans-serif"
                  >
                    {stn.subtitle}
                  </text>
                </g>
              );
            });
          })}
        </svg>

        {/* Hovered Station Live Telemetry Floating Preview Card */}
        <AnimatePresence>
          {hoveredStation && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-6 right-6 max-w-sm w-full p-5 rounded-2xl bg-[#090C1A]/95 border border-cyan-400/50 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.95)] z-30 pointer-events-none font-mono"
            >
              <div className="flex items-center justify-between text-[10px] text-cyan-400 font-bold uppercase">
                <span>STATION TELEMETRY // {hoveredStation.code}</span>
                <span>● CLICK TO OPEN</span>
              </div>
              <h4 className="text-lg font-bold text-white mt-1">
                {hoveredStation.title}
              </h4>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2 font-sans">
                {hoveredStation.description}
              </p>
              {hoveredStation.stats && (
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10">
                  {hoveredStation.stats.map((st, i) => (
                    <div
                      key={i}
                      className="p-1.5 rounded-lg bg-white/5 text-center"
                    >
                      <div className="text-[9px] text-zinc-400">{st.label}</div>
                      <div className={`text-xs font-bold mt-0.5 ${st.color}`}>
                        {st.val}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Legend Footer Strip */}
        <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-4 px-4 py-2 rounded-xl bg-black/80 border border-white/10 backdrop-blur-xl text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="text-white font-semibold">Clubs Rail (6)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span className="text-white font-semibold">Events Rail (5)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-white font-semibold">Governance Rail (4)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-6 border-t border-dashed border-white/40" />
            <span>Interchange Link</span>
          </div>
        </div>
      </div>
    </div>
  );
}
