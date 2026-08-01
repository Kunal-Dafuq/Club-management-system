import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
} from "lucide-react";

// ============================================================================
// 1. STAR STATION NODES:
//    - LEFT CONSTELLATION (CLUBS): X = 8% to 28% (Strictly away from center Black Hole)
//    - RIGHT CONSTELLATION (EVENTS): X = 74% to 91% (Strictly away from center Black Hole)
//    - HIGHLIGHTED 6 MOST ACTIVE CLUBS (Huge radiant stars, vibrant badges)
//    - MINUTE / LEAST ACTIVE CLUBS (Tiny dwarf stars, calm compact labels)
// ============================================================================
export const CELESTIAL_2D_NODES = {
  CLUBS: [
    // --- 6 MOST ACTIVE CLUBS (HIGHLIGHTED, EXPANDED RADIANT STARS) ---
    {
      id: "tasveer",
      title: "TASVEER",
      category: "Photography Club",
      code: "C-01",
      members: "210 Members",
      rank: "#1 Most Active",
      isMostActive: true,
      sizeScale: 1.45,
      color: "#06B6D4",
      x: 22,
      y: 28, // Left-top, well outside Black Hole accretion disk
      description: "IIIT-Delhi's premier photography and visual arts society. Hosts campus photowalks, darkroom editing sprints, and annual exhibition series.",
      events: ["HackTheCampus 48h Photo Sprint", "Monochrome Studio Lab"],
      committee: ["Kunal Dev (President)", "Priya Patel (Creative Lead)"],
      recruitment: "ACTIVE RECRUITMENT",
    },
    {
      id: "astronuts",
      title: "ASTRONUTS",
      category: "Astronomy Club",
      code: "C-02",
      members: "185 Members",
      rank: "#2 Most Active",
      isMostActive: true,
      sizeScale: 1.4,
      color: "#A855F7",
      x: 14,
      y: 36,
      description: "Astronomy and space exploration society. Equipped with 10-inch Dobsonian telescopes for deep-sky observation and astrophotography.",
      events: ["Exoplanet Transit Observation", "James Webb Data Analysis Workshop"],
      committee: ["Rohan Iyer (Astrophysics Lead)", "Ananya Sharma (Sky Lead)"],
      recruitment: "ACTIVE RECRUITMENT",
    },
    {
      id: "electroholics",
      title: "ELECTROHOLICS",
      category: "Hardware Club",
      code: "C-03",
      members: "230 Members",
      rank: "#3 Most Active",
      isMostActive: true,
      sizeScale: 1.4,
      color: "#F59E0B",
      x: 26,
      y: 42,
      description: "Electronics, embedded systems, and PCB design collective. Operates the open hardware prototyping lab and ROS2 autonomous rover squad.",
      events: ["PCB Soldering Bootcamp", "IoT Smart Campus Sensors Hackathon"],
      committee: ["Sneha Verma (Technical Head)", "Aarav Mehta (Embedded Lead)"],
      recruitment: "ACTIVE RECRUITMENT",
    },
    {
      id: "muse",
      title: "MUSE",
      category: "Fashion & Styling",
      code: "C-04",
      members: "160 Members",
      rank: "#4 Most Active",
      isMostActive: true,
      sizeScale: 1.35,
      color: "#EC4899",
      x: 19,
      y: 52,
      description: "Fashion, editorial styling, and couture design house. Directs campus runway productions, sustainable fashion workshops, and digital styling books.",
      events: ["Annual Runway Gala 2026", "Sustainable Upcycling Workshop"],
      committee: ["Tanvi Nair (Creative Director)", "Simran Kaur (Runway Coordinator)"],
      recruitment: "ACTIVE RECRUITMENT",
    },
    {
      id: "foobar",
      title: "FOOBAR",
      category: "Programming Club",
      code: "C-05",
      members: "310 Members",
      rank: "#5 Most Active",
      isMostActive: true,
      sizeScale: 1.45,
      color: "#06B6D4",
      x: 27,
      y: 58,
      description: "IIIT-Delhi competitive programming, algorithms, and systems architecture society. Organizes ProCon 2026 and ICPC training bootcamps.",
      events: ["IIITD ProCon 2026 Flagship", "Dynamic Programming Bootcamp"],
      committee: ["Kunal Dev (President)", "Siddharth Bose (Algo Coach)"],
      recruitment: "ACTIVE RECRUITMENT",
    },
    {
      id: "lda",
      title: "CLUBS / LDA",
      category: "(Anime Debate) Debate Club",
      code: "C-06",
      members: "145 Members",
      rank: "#6 Most Active",
      isMostActive: true,
      sizeScale: 1.35,
      color: "#8B5CF6",
      x: 12,
      y: 62,
      description: "Literary, Debate & Anime parliamentary debate society. Hosts national parliamentary tournaments, anime discourse panels, and creative writing slams.",
      events: ["National Parliamentary Debate", "Anime Narrative & Ethics Forum"],
      committee: ["Siddharth Bose (Speaker)", "Kabir Sen (Debate Coach)"],
      recruitment: "ACTIVE RECRUITMENT",
    },

    // --- MINUTE / LEAST ACTIVE CLUBS (TINY DWARF STARS, SUBTLE COMPACT LABELS) ---
    {
      id: "robotics",
      title: "ROBOTICS ROVER",
      category: "Robotics Club",
      code: "C-07",
      members: "195 Members",
      rank: "Technical Core",
      isMostActive: false,
      sizeScale: 0.72,
      color: "#64748B",
      x: 16,
      y: 72,
      description: "Autonomous mechatronics, LiDAR navigation, and University Rover Challenge (URC) engineering team.",
      events: ["National TechFest Robotics War", "ROS2 LiDAR Calibration"],
      committee: ["Aarav Mehta (Lead)", "Sneha Verma (Mechatronics)"],
      recruitment: "SELECTIVE ROSTER",
    },
    {
      id: "ai-engine",
      title: "AI ENGINE",
      category: "AI & ML Club",
      code: "C-08",
      members: "275 Members",
      rank: "Research Lab",
      isMostActive: false,
      sizeScale: 0.72,
      color: "#64748B",
      x: 23,
      y: 75,
      description: "Neural architectures, foundation model training, and generative AI research lab working on HackPlanet AI systems.",
      events: ["HackPlanet Cloud GPU Sprint", "Transformer Deep Dive"],
      committee: ["Rohan Iyer (Research Head)", "Devika Nair (AI Lead)"],
      recruitment: "ACTIVE RECRUITMENT",
    },
    {
      id: "quant",
      title: "QUANT TRADING",
      category: "Finance Club",
      code: "C-09",
      members: "130 Members",
      rank: "FinTech Guild",
      isMostActive: false,
      sizeScale: 0.7,
      color: "#64748B",
      x: 28,
      y: 82,
      description: "Algorithmic trading, quantitative finance, and portfolio optimization club utilizing Bloomberg Terminal APIs.",
      events: ["Quant Trading Algo Sprint", "Derivatives Pricing Seminar"],
      committee: ["Vikram Rathore (Quant Lead)", "Kunal Dev (Advisor)"],
      recruitment: "ACTIVE RECRUITMENT",
    },
    {
      id: "enterprise-21",
      title: "21-MODULE",
      category: "Enterprise Club",
      code: "C-10",
      members: "90 Members",
      rank: "Governance Core",
      isMostActive: false,
      sizeScale: 0.7,
      color: "#64748B",
      x: 14,
      y: 84,
      description: "Enterprise governance, RBAC charter compliance, and campus system architecture council.",
      events: ["Leadership & Governance Summit", "FERPA Audit Workshop"],
      committee: ["Kunal Dev (Principal Architect)", "Administration Command"],
      recruitment: "INVITATION ONLY",
    },
    {
      id: "audiobytes",
      title: "AUDIOBYTES",
      category: "Music Club",
      code: "C-11",
      members: "115 Members",
      rank: "Acoustic Society",
      isMostActive: false,
      sizeScale: 0.68,
      color: "#64748B",
      x: 9,
      y: 48,
      description: "Campus acoustics, band jams, and audio engineering collective.",
      events: ["Symphony Acoustic Prelims"],
      committee: ["Kabir Sen (Music Director)"],
      recruitment: "OPEN RECRUITMENT",
    },
    {
      id: "cybersecurity",
      title: "CYBERSECURITY DEFCON",
      category: "Security Society",
      code: "C-12",
      members: "140 Members",
      rank: "CTF Guild",
      isMostActive: false,
      sizeScale: 0.68,
      color: "#64748B",
      x: 8,
      y: 76,
      description: "Ethical hacking, Capture The Flag (CTF) tournaments, and network defense.",
      events: ["IIITD CTF 2026"],
      committee: ["Aditya Rao (Security Lead)"],
      recruitment: "SELECTIVE ROSTER",
    },
    {
      id: "dmaniax",
      title: "D-MANIAX",
      category: "Dance Society",
      code: "C-13",
      members: "175 Members",
      rank: "Choreography",
      isMostActive: false,
      sizeScale: 0.68,
      color: "#64748B",
      x: 20,
      y: 88,
      description: "Western, classical, and street choreography dance crew.",
      events: ["Okhla Street Battle 2026"],
      committee: ["Simran Kaur (Choreographer)"],
      recruitment: "OPEN RECRUITMENT",
    },
  ],

  // EVENTS CONSTELLATION: SHIFTED RIGHT (X = 74% to 91%, AWAY FROM BLACK HOLE)
  EVENTS: [
    {
      id: "symphony-night",
      title: "SYMPHONY NIGHT LIVE CONCERT",
      category: "Cultural Flagship",
      status: "LIVE / UPCOMING", // EXPANDED STAR (140% Scale)
      sizeScale: 1.4,
      date: "Nov 18, 2026 • 18:30 IST",
      venue: "IIIT-Delhi Okhla Amphitheatre",
      organizer: "AudioBytes & Muse",
      seats: "420 / 500 Seats Left",
      color: "#F97316",
      x: 76, // Shifted right, well away from middle
      y: 34,
      description: "Annual multi-genre open-air symphony, acoustic band competition, and fashion runway gala.",
    },
    {
      id: "lda-championship",
      title: "LDA (ANIME DEBATE) DEBATE CHAMPIONSHIP",
      category: "Oratory Tournament",
      status: "UPCOMING", // EXPANDED STAR
      sizeScale: 1.3,
      date: "Nov 21, 2026 • 10:00 IST",
      venue: "Lecture Hall Complex 101",
      organizer: "LDA Debate Society",
      seats: "64 / 80 Teams Registered",
      color: "#F59E0B",
      x: 86, // Shifted right
      y: 39,
      description: "All-India parliamentary debate championship featuring anime narrative philosophy and ethics motions.",
    },
    {
      id: "hackplanet-2026",
      title: "HACKPLANET 2026 FLAGSHIP",
      category: "Global AI Hackathon",
      status: "COMPLETED", // CONTRACTED STAR (75% Scale)
      sizeScale: 0.75,
      date: "Oct 11-14, 2026 • Completed",
      venue: "R&D Block Ground Floor & Cloud",
      organizer: "Foobar & AI Engine",
      seats: "180 Teams • Sold Out",
      color: "#9CA3AF",
      x: 80, // Shifted right
      y: 48,
      description: "48-hour generative AI, autonomous robotics, and fintech hackathon with ₹5,00,000 prize pool.",
    },
    {
      id: "robotics-war",
      title: "ROBOTICS ROVER WAR",
      category: "Mechatronics Challenge",
      status: "COMPLETED", // CONTRACTED STAR (75% Scale)
      sizeScale: 0.75,
      date: "Nov 04, 2026 • Completed",
      venue: "Campus Robotics Arena",
      organizer: "Electroholics & Robotics",
      seats: "32 Autonomous Rovers",
      color: "#9CA3AF",
      x: 91, // Shifted right
      y: 53,
      description: "Live combat and LiDAR obstacle navigation competition for autonomous student-built rovers.",
    },
    {
      id: "ferpa-vault",
      title: "FERPA COMPLIANCE VAULT",
      category: "Security Audit",
      status: "COMPLETED", // CONTRACTED STAR (75% Scale)
      sizeScale: 0.75,
      date: "Nov 05, 2026 • Completed",
      venue: "Executive Council Chamber",
      organizer: "21-Module Enterprise",
      seats: "Open Executive Session",
      color: "#9CA3AF",
      x: 74, // Shifted right
      y: 60,
      description: "Mandatory institution-wide RBAC governance, FERPA compliance, and SOC 2 data security verification.",
    },
    {
      id: "quant-sprint",
      title: "QUANT TRADING ALGO SPRINT",
      category: "FinTech Hackathon",
      status: "UPCOMING", // EXPANDED STAR
      sizeScale: 1.25,
      date: "Dec 02, 2026 • 11:00 IST",
      venue: "Bloomberg Trading Lab 302",
      organizer: "Quant Trading Society",
      seats: "45 / 50 Traders Registered",
      color: "#F59E0B",
      x: 85, // Shifted right
      y: 67,
      description: "High-frequency algorithmic options trading sprint using live financial API datasets.",
    },
    {
      id: "ai-token-command",
      title: "AI & TOKEN QUOTA COMMAND",
      category: "System Briefing",
      status: "UPCOMING", // EXPANDED STAR
      sizeScale: 1.2,
      date: "Dec 15, 2026 • 16:00 IST",
      venue: "Virtual Neural Hub",
      organizer: "AI Engine",
      seats: "Unlimited Virtual Seats",
      color: "#A855F7",
      x: 77, // Shifted right
      y: 77,
      description: "Semester-end neural LLM quota allocation, token cost optimization, and model fine-tuning report.",
    },
    {
      id: "leadership-summit",
      title: "LEADERSHIP & GOVERNANCE SUMMIT",
      category: "Presidential Council",
      status: "UPCOMING", // EXPANDED STAR
      sizeScale: 1.2,
      date: "Dec 14, 2026 • 17:00 IST",
      venue: "Senate Hall 501",
      organizer: "Student Council Executive",
      seats: "All Club Presidents",
      color: "#3B82F6",
      x: 88, // Shifted right
      y: 82,
      description: "Annual senate session reviewing club budgets, activity metrics, and Campus Celestial Portal roadmaps.",
    },
  ],
};

// ============================================================================
// 2. CONSTELLATION LINE CONNECTIONS (SVG VECTOR PATHS)
// ============================================================================
const CLUB_CONNECTIONS = [
  ["tasveer", "astronuts"],
  ["tasveer", "electroholics"],
  ["astronuts", "lda"],
  ["astronuts", "muse"],
  ["electroholics", "foobar"],
  ["electroholics", "muse"],
  ["lda", "robotics"],
  ["muse", "robotics"],
  ["muse", "ai-engine"],
  ["foobar", "enterprise-21"],
  ["robotics", "ai-engine"],
  ["ai-engine", "quant"],
  ["quant", "enterprise-21"],
  ["audiobytes", "astronuts"],
  ["cybersecurity", "lda"],
  ["dmaniax", "quant"],
];

const EVENT_CONNECTIONS = [
  ["symphony-night", "lda-championship"],
  ["symphony-night", "hackplanet-2026"],
  ["lda-championship", "ferpa-vault"],
  ["hackplanet-2026", "robotics-war"],
  ["ferpa-vault", "leadership-summit"],
  ["ferpa-vault", "quant-sprint"],
  ["robotics-war", "quant-sprint"],
  ["quant-sprint", "ai-token-command"],
  ["leadership-summit", "ai-token-command"],
];

// ============================================================================
// 3. CLEAN, EXECUTIVE 2D CELESTIAL OVERVIEW COMPONENT (NO EXTRA CLUTTER)
// ============================================================================
export default function CelestialOverview2D({
  selectedTrack = "ALL",
  onSelectNode,
  onClosePortal,
}) {
  const [selectedNode, setSelectedNodeState] = useState(null);
  const canvasRef = useRef(null);

  const visibleClubs = useMemo(() => {
    if (selectedTrack === "EVENTS" || selectedTrack === "GOVERNANCE") return [];
    return CELESTIAL_2D_NODES.CLUBS;
  }, [selectedTrack]);

  const visibleEvents = useMemo(() => {
    if (selectedTrack === "CLUBS" || selectedTrack === "GOVERNANCE") return [];
    return CELESTIAL_2D_NODES.EVENTS;
  }, [selectedTrack]);

  const nodeMap = useMemo(() => {
    const map = {};
    [...CELESTIAL_2D_NODES.CLUBS, ...CELESTIAL_2D_NODES.EVENTS].forEach((n) => {
      map[n.id] = n;
    });
    return map;
  }, []);

  const handleNodeClick = (node) => {
    setSelectedNodeState(node);
    if (onSelectNode) onSelectNode(node);
  };

  // ==========================================================================
  // SUBTLE 60FPS HTML5 CANVAS OVERLAY ENGINE (STARS + STARDUST)
  // ==========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const setRetinaCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    setRetinaCanvasSize();
    window.addEventListener("resize", setRetinaCanvasSize);

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.3 + 0.4,
      alpha: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.01 + 0.005,
      color: Math.random() > 0.6 ? "#A855F7" : Math.random() > 0.3 ? "#06B6D4" : "#FFFFFF",
    }));

    const stardust = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 1.5 + 0.8,
      alpha: Math.random() * 0.35 + 0.15,
      color: Math.random() > 0.5 ? "rgba(168, 85, 247, 0.6)" : "rgba(6, 182, 212, 0.6)",
    }));

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 0.75 || star.alpha < 0.15) {
          star.speed = -star.speed;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();
      });

      stardust.forEach((particle) => {
        particle.x += particle.vx * 1.2;
        particle.y += particle.vy * 1.2;
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", setRetinaCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-[#020408] overflow-hidden select-none font-sans">
      {/* ==================================================================== */}
      {/* 1. ULTRA-CRISP GEMINI 16:9 MASTER BACKGROUND (/celestial-bg.jpg)     */}
      {/* ==================================================================== */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
        style={{
          backgroundImage: "url('/celestial-bg.jpg?v=3')",
          backgroundPosition: "center",
          filter: "brightness(0.96) contrast(1.02)",
          imageRendering: "high-quality",
        }}
      />

      {/* ==================================================================== */}
      {/* 2. REALISTIC CLOUD LAYERS OVER TOP SUN/HORIZON (LOWERS SUN BRIGHTNESS) */}
      {/* ==================================================================== */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-[#020408] via-[#050A18]/85 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-64 bg-radial from-[#091128]/95 via-[#060D1E]/75 to-transparent blur-3xl pointer-events-none z-10 opacity-90" />
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#030611] via-[#080E24]/65 to-transparent backdrop-blur-[1px] pointer-events-none z-10" />

      {/* ==================================================================== */}
      {/* 3. RETINA 60FPS HTML5 CANVAS STARFIELD & STARDUST OVERLAY           */}
      {/* ==================================================================== */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* ==================================================================== */}
      {/* 4. RAZOR-SHARP SVG CONSTELLATION LINES                              */}
      {/* ==================================================================== */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <svg className="w-full h-full absolute inset-0 overflow-visible">
          <defs>
            <linearGradient id="clubLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="evtLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Clubs Constellation Lines */}
          {CLUB_CONNECTIONS.map(([id1, id2], idx) => {
            const n1 = nodeMap[id1];
            const n2 = nodeMap[id2];
            if (!n1 || !n2) return null;
            const isBothActive = n1.isMostActive && n2.isMostActive;
            return (
              <line
                key={`club-line-${idx}`}
                x1={`${n1.x}%`}
                y1={`${n1.y}%`}
                x2={`${n2.x}%`}
                y2={`${n2.y}%`}
                stroke="url(#clubLineGrad)"
                strokeWidth={isBothActive ? "2.2" : "1.0"}
                strokeDasharray={isBothActive ? "4 2" : "3 3"}
                strokeOpacity={isBothActive ? 0.9 : 0.4}
                className={isBothActive ? "animate-pulse" : ""}
              />
            );
          })}

          {/* Events Constellation Lines (Dynamic thickness based on Upcoming vs Completed) */}
          {EVENT_CONNECTIONS.map(([id1, id2], idx) => {
            const n1 = nodeMap[id1];
            const n2 = nodeMap[id2];
            if (!n1 || !n2) return null;
            const isCompletedConnection = n1.status === "COMPLETED" && n2.status === "COMPLETED";
            return (
              <line
                key={`evt-line-${idx}`}
                x1={`${n1.x}%`}
                y1={`${n1.y}%`}
                x2={`${n2.x}%`}
                y2={`${n2.y}%`}
                stroke="url(#evtLineGrad)"
                strokeWidth={isCompletedConnection ? "1.0" : "2.2"}
                strokeDasharray={isCompletedConnection ? "3 3" : undefined}
                strokeOpacity={isCompletedConnection ? 0.45 : 0.95}
              />
            );
          })}

          {/* Top Star Energy Beam to Black Hole */}
          <line
            x1="50%"
            y1="12%"
            x2="50%"
            y2="58%"
            stroke="url(#clubLineGrad)"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
        </svg>

        {/* ================================================================== */}
        {/* TOP CENTER DEPARTING PLANET BUTTON -> DIRECTLY TO MAIN PAGE ( / ) */}
        {/* ================================================================== */}
        <div
          style={{ top: "12%", left: "50%" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group cursor-pointer flex flex-col items-center z-40"
          onClick={() => {
            window.location.href = "/";
          }}
          title="🚀 Click to return directly to ClubPlanet Prime Main Landing Page"
        >
          <div className="relative flex items-center justify-center mb-1">
            <span className="absolute w-12 h-12 rounded-full bg-cyan-400/50 animate-ping" />
            <div className="w-5 h-5 rotate-45 bg-cyan-400 border-2 border-white shadow-[0_0_25px_#06B6D4] transition-transform group-hover:scale-125" />
          </div>
          <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest text-center">
            DEPARTING PLANET
          </div>
          <div className="text-xs font-mono font-extrabold text-cyan-300 uppercase tracking-wider text-center group-hover:text-white transition-colors">
            CLUBPLANET PRIME (MAIN PAGE)
          </div>
        </div>

        {/* ================================================================== */}
        {/* A. CLUBS CONSTELLATION NODES:                                      */}
        {/*    - 6 MOST ACTIVE CLUBS: EXPANDED, HIGHLIGHTED, VIBRANT BADGE     */}
        {/*    - MINUTE / LEAST ACTIVE CLUBS: TINY DWARF STARS, SUBTLE LABELS  */}
        {/* ================================================================== */}
        {visibleClubs.map((club) => {
          const isHighlighted = club.isMostActive;

          return (
            <div
              key={club.id}
              style={{
                top: `${club.y}%`,
                left: `${club.x}%`,
                transform: `translate(-50%, -50%) scale(${club.sizeScale || 1})`,
              }}
              className="absolute pointer-events-auto group cursor-pointer z-40 transition-transform duration-500 hover:scale-125"
              onClick={() => handleNodeClick(club)}
            >
              {/* Hotspot Indicator: Highlighted 6 Most Active have huge radiant pinging halo */}
              <div className="relative flex items-center justify-center">
                {isHighlighted && (
                  <span
                    className="absolute w-10 h-10 rounded-full animate-ping opacity-80"
                    style={{ backgroundColor: `${club.color}50` }}
                  />
                )}
                <div
                  className={`rotate-45 border-2 border-white transition-all ${
                    isHighlighted
                      ? "w-5 h-5 shadow-[0_0_22px_rgba(168,85,247,0.9)]"
                      : "w-3 h-3 shadow-[0_0_8px_rgba(100,116,139,0.7)] opacity-80"
                  }`}
                  style={{ backgroundColor: club.color }}
                />
              </div>

              {/* Label Card: High Contrast for Most Active, Calm/Compact for Minute Clubs */}
              <div
                className={`absolute top-5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg backdrop-blur-xl font-mono whitespace-nowrap shadow-xl z-30 transition-all group-hover:scale-110 ${
                  isHighlighted
                    ? "bg-[#080B16]/95 border border-purple-400/80 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    : "bg-[#080B16]/80 border border-zinc-700/50 text-zinc-300 opacity-75"
                }`}
              >
                {isHighlighted && (
                  <div className="text-[9px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                    <span>★</span>
                    <span>{club.rank}</span>
                  </div>
                )}
                <div
                  className={`font-extrabold tracking-wide ${
                    isHighlighted ? "text-purple-200 text-xs" : "text-zinc-300 text-[10px]"
                  }`}
                >
                  {club.title}
                </div>
                <div className="text-[8px] text-zinc-400 font-sans">{club.category}</div>
              </div>
            </div>
          );
        })}

        {/* ================================================================== */}
        {/* B. EVENTS CONSTELLATION NODES:                                    */}
        {/*    - SHIFTED RIGHT (X = 74% to 91%, AWAY FROM BLACK HOLE)         */}
        {/*    - DYNAMICALLY SIZED FOR UPCOMING VS COMPLETED EVENTS           */}
        {/* ================================================================== */}
        {visibleEvents.map((evt) => {
          const isCompleted = evt.status === "COMPLETED";
          const isLiveOrFlagship = evt.status === "LIVE / UPCOMING";

          return (
            <div
              key={evt.id}
              style={{
                top: `${evt.y}%`,
                left: `${evt.x}%`,
                transform: `translate(-50%, -50%) scale(${evt.sizeScale || 1})`,
              }}
              className="absolute pointer-events-auto group cursor-pointer z-40 transition-transform duration-500 hover:scale-125"
              onClick={() => handleNodeClick(evt)}
            >
              {/* Dynamic size & glow depending on Upcoming vs Completed */}
              <div className="relative flex items-center justify-center">
                {!isCompleted && (
                  <span
                    className={`absolute rounded-full animate-ping opacity-75 ${
                      isLiveOrFlagship
                        ? "w-12 h-12 bg-amber-500/60"
                        : "w-8 h-8 bg-amber-500/40"
                    }`}
                  />
                )}
                <div
                  className={`rotate-45 border-2 border-white transition-all ${
                    isCompleted
                      ? "w-3 h-3 shadow-[0_0_6px_rgba(156,163,175,0.6)] opacity-70"
                      : isLiveOrFlagship
                      ? "w-6 h-6 shadow-[0_0_25px_#F59E0B]"
                      : "w-4.5 h-4.5 shadow-[0_0_18px_#F59E0B]"
                  }`}
                  style={{ backgroundColor: evt.color }}
                />
              </div>

              {/* Clean Event Name Label Card with Status Indicator */}
              <div
                className={`absolute top-6 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg backdrop-blur-xl text-[11px] font-mono font-bold whitespace-nowrap shadow-xl z-30 transition-all group-hover:scale-110 ${
                  isCompleted
                    ? "bg-[#080B16]/80 border border-zinc-600/40 text-zinc-300 opacity-80"
                    : "bg-[#080B16]/95 border border-amber-500/60 text-white"
                }`}
              >
                <div
                  className={`font-extrabold tracking-wide ${
                    isCompleted ? "text-zinc-400" : "text-amber-300"
                  }`}
                >
                  {evt.title}
                </div>
                <div className="text-[9px] text-zinc-400 font-sans flex items-center justify-between gap-2">
                  <span>{evt.date}</span>
                  <span
                    className={`px-1 rounded text-[8px] font-extrabold ${
                      isCompleted
                        ? "bg-zinc-700/60 text-zinc-400"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {evt.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* 5. MINIMALIST PAGE TITLE (TOP LEFT) & CLOSE BUTTON (TOP RIGHT ONLY) */}
      {/* ==================================================================== */}

      {/* TOP LEFT: ONLY CLUBPLANET CELESTIAL OVERVIEW TITLE */}
      <div className="absolute top-5 left-6 z-40 flex items-center gap-4 pointer-events-auto">
        <div className="w-12 h-12 rounded-2xl bg-[#090E1A]/90 border border-cyan-400/50 backdrop-blur-xl flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.4)]">
          <Shield className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <div className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-cyan-400">
            CAMPUS CELESTIAL PORTAL
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">
            ClubPlanet OrgOS Celestial Overview
          </h1>
          <div className="text-xs text-zinc-400 font-sans mt-0.5">
            Hover. Dive. Discover.
          </div>
        </div>
      </div>

      {/* TOP RIGHT: ONLY THE CLOSE PORTAL BUTTON */}
      <div className="absolute top-6 right-6 z-40 flex items-center gap-3 pointer-events-auto">
        <button
          onClick={onClosePortal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-900/70 border border-purple-500/60 text-purple-200 text-xs font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] cursor-pointer backdrop-blur-md"
        >
          <Lock className="w-3.5 h-3.5 text-purple-400" />
          <span>Close Celestial Portal</span>
        </button>
      </div>

      {/* ==================================================================== */}
      {/* 6. RETINA MODAL INSPECTION CARD WHEN ANY NODE IS CLICKED              */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key="node-modal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-12 right-12 z-50 w-96 p-6 rounded-3xl bg-[#0B0E1B]/95 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.4)] space-y-4 pointer-events-auto"
          >
            <div className="flex items-center justify-between">
              <span
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-extrabold uppercase tracking-wider"
                style={{
                  backgroundColor: `${selectedNode.color}25`,
                  color: selectedNode.color,
                  borderColor: selectedNode.color,
                }}
              >
                {selectedNode.category}
              </span>
              <button
                onClick={() => setSelectedNodeState(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="text-lg font-black text-white">
                {selectedNode.title}
              </h3>
              <div className="text-xs font-mono text-cyan-400 mt-0.5">
                {selectedNode.members || selectedNode.date} • {selectedNode.rank || selectedNode.venue}
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {selectedNode.description}
            </p>

            {selectedNode.events && (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                  UPCOMING CAMPAIGNS
                </div>
                {selectedNode.events.map((ev, i) => (
                  <div key={i} className="text-xs text-zinc-200 flex items-center gap-1.5">
                    <span className="text-cyan-400">✦</span>
                    <span>{ev}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <a
                href={selectedNode.members ? "/clubs" : "/events"}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-extrabold text-center transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <span>🚀 {selectedNode.members ? "Explore Club Directory" : "RSVP For Event"}</span>
              </a>
              <button
                onClick={() => setSelectedNodeState(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
