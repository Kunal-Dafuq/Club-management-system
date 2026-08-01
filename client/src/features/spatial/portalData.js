// Professional Enterprise Data for ClubPlanet Campus Portal
// Categorized into 3 sleek ecosystem tracks: Clubs, Events, and Governance

export const PORTAL_TRACKS = {
  CLUBS: {
    id: "CLUBS",
    title: "Chartered Clubs & Societies",
    subtitle: "University-approved student organizations, research labs, and academic collectives.",
    badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-400/40",
    accentColor: "#06B6D4",
    items: [
      {
        id: "abacus",
        type: "CLUB",
        title: "ABACUS QUANT SOCIETY",
        category: "Algorithmic Trading & Economics",
        subtitle: "140 Members • $1,250 Budget • Bloomberg API",
        description:
          "Chartered quantitative economics and automated trading collective. Active sprint: High-frequency options pricing models and Bloomberg Terminal API integration.",
        stats: [
          { label: "MEMBERSHIP", val: "140 / 150 MAX", color: "text-cyan-400" },
          { label: "ANNUAL BUDGET", val: "$1,250 USD", color: "text-emerald-400" },
          { label: "ACTIVE SPRINT", val: "V2 TRADING ALGO", color: "text-violet-400" },
        ],
        ctaLabel: "Open Club Directory",
        ctaUrl: "/clubs",
        status: "ACTIVE ORBIT",
      },
      {
        id: "robotics",
        type: "CLUB",
        title: "ROBOTICS CORE TECH",
        category: "Autonomous Systems & Mechatronics",
        subtitle: "210 Members • Room 402B Lab • ROS2 v2.4",
        description:
          "Official AI & mechatronics robotics hub. Active sprint: 20 LiPo battery ESC controller calibration and autonomous LiDAR mapping rover testing.",
        stats: [
          { label: "MEMBERSHIP", val: "210 ENG STUDENTS", color: "text-cyan-400" },
          { label: "HARDWARE LAB", val: "ROOM 402B OPEN", color: "text-emerald-400" },
          { label: "FIRMWARE", val: "ROS2 v2.4.1", color: "text-violet-400" },
        ],
        ctaLabel: "Open Club Directory",
        ctaUrl: "/clubs",
        status: "ACTIVE ORBIT",
      },
      {
        id: "symphony",
        type: "CLUB",
        title: "SYMPHONY ACOUSTICS",
        category: "Orchestra & Acoustic Engineering",
        subtitle: "95 Members • Dolby Setup • Studio A",
        description:
          "Premier university musical society and acoustics engineering group. Currently rehearsing for the Annual Symphony Live Concert at the Open Air Theatre.",
        stats: [
          { label: "MEMBERSHIP", val: "95 MUSICIANS", color: "text-pink-400" },
          { label: "ASSETS POOL", val: "$3,400 USD", color: "text-emerald-400" },
          { label: "REHEARSAL", val: "STUDIO A ACTIVE", color: "text-violet-400" },
        ],
        ctaLabel: "Open Club Directory",
        ctaUrl: "/clubs",
        status: "ACTIVE ORBIT",
      },
      {
        id: "ai_research",
        type: "CLUB",
        title: "AI & DEEP LEARNING CORE",
        category: "LLM & Multimodal Research",
        subtitle: "180 Members • 8x H100 Cluster • Gemini 2.5",
        description:
          "Dedicated student research lab specializing in Generative AI, Multimodal Transformer architectures, and campus AI workflow automation.",
        stats: [
          { label: "MEMBERSHIP", val: "180 RESEARCHERS", color: "text-blue-400" },
          { label: "GPU CLUSTER", val: "8x NVIDIA H100", color: "text-emerald-400" },
          { label: "AI ENGINE", val: "GEMINI 2.5 PRO", color: "text-violet-400" },
        ],
        ctaLabel: "Open Club Directory",
        ctaUrl: "/clubs",
        status: "RESEARCH TIER",
      },
      {
        id: "literary",
        type: "CLUB",
        title: "LITERARY & DEBATE SOCIETY",
        category: "Parliamentary Debate & Journal",
        subtitle: "120 Members • #3 in Region • Nov 22 Summit",
        description:
          "Chartered university forensic, debate, and journal society. Conducting weekly British Parliamentary debates and publishing Campus Voice quarterly.",
        stats: [
          { label: "MEMBERSHIP", val: "120 ORATORS", color: "text-amber-400" },
          { label: "RANKING", val: "#3 IN REGION", color: "text-emerald-400" },
          { label: "NEXT SUMMIT", val: "NOV 22, 2026", color: "text-violet-400" },
        ],
        ctaLabel: "Open Club Directory",
        ctaUrl: "/clubs",
        status: "ACTIVE ORBIT",
      },
      {
        id: "aerospace",
        type: "CLUB",
        title: "AEROSPACE & DRONE CORE",
        category: "UAV & Sub-Orbital Rocketry",
        subtitle: "85 Members • 12 Active UAVs • Field 3 Permit",
        description:
          "Student aeronautical engineering society building autonomous quadcopters and sounding rockets. Telemetry link active on 433MHz campus antenna.",
        stats: [
          { label: "MEMBERSHIP", val: "85 AERONAUTS", color: "text-emerald-400" },
          { label: "DRONE FLEET", val: "12 ACTIVE UAVS", color: "text-cyan-400" },
          { label: "LAUNCH SITE", val: "FIELD 3 PERMIT", color: "text-violet-400" },
        ],
        ctaLabel: "Open Club Directory",
        ctaUrl: "/clubs",
        status: "ACTIVE ORBIT",
      },
    ],
  },

  EVENTS: {
    id: "EVENTS",
    title: "Upcoming Events & Championships",
    subtitle: "Flagship university hackathons, national technical tournaments, and campus summits.",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-400/40",
    accentColor: "#F59E0B",
    items: [
      {
        id: "hackplanet_event",
        type: "EVENT",
        title: "HACKPLANET 2026 FLAGSHIP",
        category: "Annual Hackathon Arena",
        subtitle: "Oct 15–17, 2026 • 1,116 / 1,500 Seats • $10,000 Prize",
        description:
          "University Annual Flagship Hackathon. 36 hours of continuous building, mentorship, and VC judging. Holographic QR Pass #ORGOS-2026-8891 active.",
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
        type: "EVENT",
        title: "ROBOTICS ROVER WAR 2026",
        category: "National Autonomous Challenge",
        subtitle: "Nov 04, 2026 • 32 Competing Squads • Outdoor Stadium",
        description:
          "National Autonomous Rover obstacle course and LiDAR challenge. Watch 32 university squads battle across simulated Martian terrain.",
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
        type: "EVENT",
        title: "SYMPHONY NIGHT LIVE CONCERT",
        category: "Open Air Musical Gala",
        subtitle: "Nov 18, 2026 • 2,400 RSVP Tickets • Open Air Theatre",
        description:
          "Annual open-air musical gala featuring 85-piece student symphony orchestra and acoustic electronic fusion bands. Free campus entry with QR pass.",
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
        type: "EVENT",
        title: "QUANT TRADING ALGO SPRINT",
        category: "Quantitative Options Competition",
        subtitle: "Dec 02, 2026 • 400 Trading Teams • Finance Lab 101",
        description:
          "8-hour quantitative options pricing and automated trading competition hosted by ABACUS Society on simulated exchange servers.",
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
        type: "EVENT",
        title: "ANNUAL LEADERSHIP & GOVERNANCE SUMMIT",
        category: "University Executive Council",
        subtitle: "Dec 14, 2026 • All 9 Club Councils • Main Auditorium",
        description:
          "Annual executive session where all 9 chartered student organization presidents present yearly budget audits and elect next academic council.",
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
    title: "Executive Governance & Administration",
    subtitle: "Enterprise compliance, security policies, AI token quotas, and system recovery.",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-400/40",
    accentColor: "#10B981",
    items: [
      {
        id: "settings_core",
        type: "GOVERNANCE",
        title: "21-MODULE ENTERPRISE CONSOLE",
        category: "Schema-Driven Admin Suite",
        subtitle: "5 Domains • 21 Config Ready • ISO-27001 Security",
        description:
          "Central executive administration suite controlling Workspace, Branding, Security, AI Quotas, and Tamper-Evident Audit Logs across all clubs.",
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
        type: "GOVERNANCE",
        title: "FERPA / GDPR COMPLIANCE VAULT",
        category: "Student Privacy & Audit Control",
        subtitle: "100% Protected • Directory Masked • MFA Enforced",
        description:
          "Enforces strict academic privacy regulations, campus IP whitelisting, hardware MFA requirements, and automated student consent logging.",
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
        type: "GOVERNANCE",
        title: "AI ENGINE & TOKEN QUOTA COMMAND",
        category: "Enterprise AI & Automation",
        subtitle: "Gemini 2.5 Pro • 100M Token Pool • Autonomous RSVP",
        description:
          "Manages AI budget allocations, real-time word filters, attachment MB quotas, and autonomous RSVP reminder cron jobs across the campus.",
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
        type: "GOVERNANCE",
        title: "DISASTER RECOVERY & ROLLBACK VAULT",
        category: "Tamper-Evident Audit & Backups",
        subtitle: "v2.4.0 Golden Snapshot • Safe Mode Ready",
        description:
          "Tamper-evident cryptographic audit logs, hourly PostgreSQL database snapshots, and emergency break-glass read-only Safe Mode toggle.",
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
