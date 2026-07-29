// ClubPlanet Landing Page Storytelling Data & Configuration
export const FRAGMENTED_NODES = [
  { id: "whatsapp", name: "WhatsApp Groups", icon: "MessageSquare", color: "#25D366", position: [-5, 2.5, 2], status: "Uncoordinated" },
  { id: "excel", name: "Excel Sheets", icon: "Table", color: "#107C41", position: [4, -3, 1.5], status: "Outdated" },
  { id: "forms", name: "Google Forms", icon: "FileText", color: "#7248B9", position: [5, 3, -1], status: "Disconnected" },
  { id: "discord", name: "Discord Servers", icon: "MessageCircle", color: "#5865F2", position: [-4, -2.5, -2], status: "Fragmented" },
  { id: "email", name: "Email Chains", icon: "Mail", color: "#EA4335", position: [2.5, 4, 2.5], status: "Lost in Inbox" },
  { id: "boards", name: "Notice Boards", icon: "Layout", color: "#FBBF24", position: [-3, 1, -3.5], status: "Static & Unseen" }
];

export const CONVERGENCE_CARDS = [
  { id: "announcements", title: "Centralized Announcements", subtitle: "Instant multi-channel broadcasts with read tracking", icon: "Radio", color: "#06B6D4" },
  { id: "committees", title: "Committee Collaboration", subtitle: "Structured workspaces with role-based governance", icon: "Users", color: "#7C3AED" },
  { id: "tasks", title: "Smart Task Delegation", subtitle: "Kanban task boards with automated reminders", icon: "CheckSquare", color: "#10B981" },
  { id: "attendance", title: "QR Attendance", subtitle: "One-click QR event check-in & verification", icon: "QrCode", color: "#3B82F6" },
  { id: "events", title: "Event Management", subtitle: "End-to-end ticketing, RSVP & budget approval", icon: "Calendar", color: "#F59E0B" },
  { id: "ai_summaries", title: "AI Meeting Summaries", subtitle: "Automatic action item extraction from meetings", icon: "Sparkles", color: "#EC4899" },
  { id: "analytics", title: "Analytics Dashboard", subtitle: "Real-time engagement & growth telemetry", icon: "BarChart3", color: "#8B5CF6" }
];

export const CAMPUS_BUILDINGS = [
  { id: "admin", name: "Main Administration", description: "Campus governance & organizational policy center", position: [-8, 0, -10], height: 5, color: "#4B5563" },
  { id: "library", name: "University Library", description: "Knowledge repository & research archives", position: [8, 0, -8], height: 4, color: "#4B5563" },
  { id: "innovation", name: "Innovation Hub", description: "Startup incubation & tech project prototyping", position: [-6, 0, 5], height: 6, color: "#3B82F6" },
  { id: "stadium", name: "Sports Complex", description: "Athletics, tournaments & recreation grounds", position: [9, 0, 6], height: 3.5, color: "#10B981" },
  { id: "auditorium", name: "Auditorium", description: "Main auditorium for cultural fests & hackathons", position: [0, 0, -12], height: 4.5, color: "#F59E0B" },
  { id: "club_office", name: "The Club Office", description: "The beating heart of campus student organizations", position: [0, 0, 0], height: 8, color: "#06B6D4", isGlow: true }
];

export const CLUBS_DATA = [
  {
    id: "abacus",
    name: "ABACUS Society",
    category: "Technical",
    tagline: "Algorithmic computing, quantitative finance & math modeling",
    description: "The official campus quantitative & mathematical sciences club. We build algorithmic trading models, organize math olympiads, and research computational number theory.",
    facultyCoordinator: "Dr. Arvind Ramanathan (Math)",
    studentCoordinators: ["Anirudh Sharma (Lead)", "Aadya Verma (Quant Head)"],
    upcomingEvents: ["Abacus Quant Challenge 2026", "Algorithmic Trading Bootcamp", "National Math Symposium"],
    currentMembers: 185,
    activeRecruitment: true,
    achievements: ["1st Place - National Quant Olympiad 2025", "Published 6 Computational Math Papers"],
    color: "#06B6D4",
    position: [-5.5, 2.0, -1]
  },
  {
    id: "robotics",
    name: "Robotics Club",
    category: "Technical",
    tagline: "Autonomous systems, ROS & mechatronics design",
    description: "Building autonomous rovers, combat robots, and IoT drones. Participating in national robotics championships and workshops.",
    facultyCoordinator: "Dr. Rajesh Sharma (Mech Engg)",
    studentCoordinators: ["Aarav Mehta (Lead)", "Sneha Verma (Tech Lead)"],
    upcomingEvents: ["RoboWars 2026", "Drone Piloting Workshop", "ROS2 Bootcamp"],
    currentMembers: 142,
    activeRecruitment: true,
    achievements: ["1st Place - National TechFest 2025", "Best Innovation Award - Rover Challenge"],
    color: "#06B6D4",
    position: [-3.5, 1.5, -2]
  },
  {
    id: "coding",
    name: "Coding Club",
    category: "Technical",
    tagline: "Competitive programming, open source & hackathons",
    description: "The premier developer community on campus. We host weekly coding contests, open-source sprints, and algorithm sessions.",
    facultyCoordinator: "Prof. Animesh Gupta (CSE)",
    studentCoordinators: ["Kunal Dev (President)", "Priya Patel (CP Head)"],
    upcomingEvents: ["HackTheCampus 48h", "LeetCode Weekly Sprint", "Open Source Day"],
    currentMembers: 380,
    activeRecruitment: true,
    achievements: ["ICPC Regional Finalists 2025", "50+ GSoC Mentee Selections"],
    color: "#7C3AED",
    position: [0, 2.2, -3]
  },
  {
    id: "ai",
    name: "AI & ML Club",
    category: "Technical",
    tagline: "Deep learning, LLM research & generative AI",
    description: "Exploring frontier artificial intelligence, computer vision, and neural network architectures with real-world datasets.",
    facultyCoordinator: "Dr. Elena Rostova (AI Lab)",
    studentCoordinators: ["Rohan Iyer (Research Lead)", "Tanvi Nair (Project Head)"],
    upcomingEvents: ["GenAI Hackathon", "PyTorch Deep Dive", "AI Ethics Symposium"],
    currentMembers: 210,
    activeRecruitment: true,
    achievements: ["Published 4 Student Papers in IEEE", "1st Prize - Smart India Hackathon"],
    color: "#EC4899",
    position: [3.5, 1.5, -2]
  },
  {
    id: "music",
    name: "Music Club (Crescendo)",
    category: "Cultural",
    tagline: "Acoustic jams, fusion bands & orchestral performances",
    description: "Where rhythm meets harmony. From indie rock bands to classical vocal ensembles, we soundtrack every campus fest.",
    facultyCoordinator: "Dr. Sameer Joshi (Arts)",
    studentCoordinators: ["Kabir Sen (Band Lead)", "Ananya Rao (Vocals Head)"],
    upcomingEvents: ["Symphony Night 2026", "Acoustic Sunset Jam", "Battle of the Bands"],
    currentMembers: 165,
    activeRecruitment: false,
    achievements: ["Winners - Mood Indigo Band Competition", "1M+ Streams on Original Campus Album"],
    color: "#F59E0B",
    position: [-4.2, -0.5, 0]
  },
  {
    id: "dance",
    name: "Dance Club (Zeal)",
    category: "Cultural",
    tagline: "Hip-hop, contemporary, classical & street choreography",
    description: "High-energy choreography crews representing the university in national college dance festivals and street battles.",
    facultyCoordinator: "Prof. Meera Krishnan",
    studentCoordinators: ["Vikram Rathore (Crew Chief)", "Rhea Kulkarni (Choreographer)"],
    upcomingEvents: ["Street Dance Showdown", "Contemporary Workshop", "Annual Cultural Showcase"],
    currentMembers: 190,
    activeRecruitment: true,
    achievements: ["Gold Medal - Inter-University Dance Fest", "Viral Flash Mob - 500k Views"],
    color: "#EF4444",
    position: [-2.2, -1.2, 1.5]
  },
  {
    id: "photo",
    name: "Photography Club (Aperture)",
    category: "Creative",
    tagline: "Visual storytelling, cinematography & darkroom edits",
    description: "Capturing campus life through lenses. We specialize in street photography, studio lighting, and documentary filmmaking.",
    facultyCoordinator: "Prof. David Clark (Media)",
    studentCoordinators: ["Arjun Das (Editor in Chief)", "Sanya Mirza (Lead Photographer)"],
    upcomingEvents: ["Golden Hour Photo Walk", "Lightroom Pro Masterclass", "Campus Film Festival"],
    currentMembers: 125,
    activeRecruitment: true,
    achievements: ["National Geographic Young Lens Award", "Official Media Partners for Campus Fest"],
    color: "#10B981",
    position: [2.2, -1.2, 1.5]
  },
  {
    id: "lit",
    name: "Literary Club (Quill)",
    category: "Literary",
    tagline: "Debates, poetry slams, MUN & journalism",
    description: "Foster critical thinking and eloquence. We publish the annual campus journal and host Parliamentary debates.",
    facultyCoordinator: "Dr. Nandini Mukherjee (English)",
    studentCoordinators: ["Siddharth Bose (Editor)", "Tara Alvares (Debate Head)"],
    upcomingEvents: ["Inter-College MUN 2026", "Spoken Word Poetry Night", "Journalism Workshop"],
    currentMembers: 140,
    activeRecruitment: false,
    achievements: ["Best Delegation - Asian MUN", "10,000+ Copies Distributed of Annual Magazine"],
    color: "#8B5CF6",
    position: [4.2, -0.5, 0]
  },
  {
    id: "ecell",
    name: "Entrepreneurship Cell",
    category: "Business",
    tagline: "Startup incubation, VC pitching & founder talks",
    description: "Empowering student founders. We connect budding entrepreneurs with seed grants, industry mentors, and angel investors.",
    facultyCoordinator: "Prof. Alok Bansal (Management)",
    studentCoordinators: ["Neeraj Chopra (President)", "Devika Nair (Corporate Relations)"],
    upcomingEvents: ["E-Summit 2026", "Pitch Tank Season 4", "Founder Fireside Chat"],
    currentMembers: 230,
    activeRecruitment: true,
    achievements: ["5 Student Startups Incubated with $100k Seed", "Top E-Cell Award 2025"],
    color: "#3B82F6",
    position: [-1.5, 0.2, -1]
  },
  {
    id: "gaming",
    name: "Gaming & Esports Club",
    category: "Recreation",
    tagline: "Valorant, FIFA, BGMI & game development studios",
    description: "Competitive esports rosters and Unity/Unreal game development groups building playable indies and hosting tournaments.",
    facultyCoordinator: "Dr. Karthik R (IT Dept)",
    studentCoordinators: ["Zaid Khan (Esports Captain)", "Pranav S (Game Dev Lead)"],
    upcomingEvents: ["University Valorant League", "Game Jam 48h", "FIFA 26 Arena"],
    currentMembers: 310,
    activeRecruitment: true,
    achievements: ["National Collegiate Esports Champions", "Best Indie Game at Student Arcade"],
    color: "#06B6D4",
    position: [1.5, 0.2, -1]
  }
];

export const EVENTS_DATA = [
  {
    id: "hack-planet",
    title: "HackPlanet 24-Hour AI Hackathon",
    category: "Hackathon",
    date: "OCT 24, 2026",
    time: "10:00 AM - 10:00 AM (Next Day)",
    venue: "Main Auditorium // Innovation Hub",
    club: "Coding Club & AI Club",
    description: "The flagship 24-hour campus hackathon. Build autonomous agents, LLM apps, and real-time computer vision tools. $10,000 in cash prizes, cloud credits, and direct startup incubator mentorship.",
    registered: 184,
    capacity: 200,
    price: "FREE",
    badge: "$10,000 PRIZE POOL",
    color: "#06B6D4",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
    isFeatured: true
  },
  {
    id: "robo-wars",
    title: "Inter-College Robotics Olympiad 2026",
    category: "Competition",
    date: "NOV 02, 2026",
    time: "02:00 PM - 08:00 PM",
    venue: "University Stadium Arena",
    club: "Robotics Club",
    description: "Witness 30 lb combat robots battle in the armored cage arena alongside autonomous line-follower and rover obstacle courses.",
    registered: 142,
    capacity: 300,
    price: "FREE",
    badge: "NATIONAL ARENA",
    color: "#7C3AED",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    isFeatured: false
  },
  {
    id: "crescendo-night",
    title: "Crescendo Symphony & Battle of the Bands",
    category: "Cultural",
    date: "NOV 15, 2026",
    time: "06:30 PM - 11:00 PM",
    venue: "Open Air Amphitheater",
    club: "Music Club (Crescendo)",
    description: "Annual musical extravaganza featuring 8 collegiate bands, classical fusion orchestras, and acoustic sunset jams under the stars.",
    registered: 420,
    capacity: 500,
    price: "FREE",
    badge: "LIVE CONCERT",
    color: "#EC4899",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    isFeatured: false
  },
  {
    id: "e-summit",
    title: "E-Summit 2026: Seed Pitch Tank Season 4",
    category: "Business",
    date: "DEC 05, 2026",
    time: "11:00 AM - 05:00 PM",
    venue: "Management Hall 101",
    club: "Entrepreneurship Cell",
    description: "Student founders pitch live to seed funds and angel investors. Winner receives $15,000 non-dilutive grant and incubator workspace.",
    registered: 95,
    capacity: 150,
    price: "FREE",
    badge: "VC PITCHING",
    color: "#F59E0B",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    isFeatured: false
  },
  {
    id: "dance-showdown",
    title: "Zeal Street Dance & Choreography Clash",
    category: "Cultural",
    date: "DEC 12, 2026",
    time: "05:00 PM - 09:30 PM",
    venue: "Main Auditorium",
    club: "Dance Club (Zeal)",
    description: "High-voltage hip-hop, popping, and contemporary dance battles between top collegiate dance crews across the state.",
    registered: 210,
    capacity: 350,
    price: "FREE",
    badge: "CREW BATTLE",
    color: "#EF4444",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&auto=format&fit=crop&q=80",
    isFeatured: false
  },
  {
    id: "photo-walk",
    title: "Aperture Golden Hour Photo Walk & Cinema Talk",
    category: "Workshop",
    date: "OCT 30, 2026",
    time: "04:30 PM - 07:30 PM",
    venue: "Campus Architectural Quad",
    club: "Photography Club (Aperture)",
    description: "Hands-on photography masterclass covering golden hour portraiture, manual camera settings, and cinematic color grading.",
    registered: 65,
    capacity: 80,
    price: "FREE",
    badge: "MASTERCLASS",
    color: "#10B981",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    isFeatured: false
  }
];

export const ROLE_COMMANDS = {
  student: {
    title: "Student Experience",
    subtitle: "Your campus passport to events, clubs, and digital credentials",
    color: "#06B6D4",
    features: [
      { id: "event_discovery", title: "Event Discovery", desc: "AI-recommended workshops, concerts, and hackathons tailored to your interests.", icon: "Compass" },
      { id: "club_feed", title: "Unified Club Feed", desc: "Real-time updates, announcements, and polls from every club you follow.", icon: "Activity" },
      { id: "one_click_rsvp", title: "One-Click Registration", desc: "Instant RSVP with automated Google Calendar sync and ticket generation.", icon: "Zap" },
      { id: "digital_id", title: "Digital Membership Card", desc: "Apple & Google Wallet compatible QR pass for campus access and attendance.", icon: "CreditCard" },
      { id: "attendance", title: "Live Attendance Tracking", desc: "Track your involvement hours and unlock participation badges.", icon: "CheckCircle2" },
      { id: "certificates", title: "Verified Certificates", desc: "Blockchain-verifiable certificates for workshops, fests, and club leadership.", icon: "Award" }
    ]
  },
  coordinator: {
    title: "Club Coordinator Command",
    subtitle: "High-velocity tools to run your club like a tech startup",
    color: "#7C3AED",
    features: [
      { id: "task_board", title: "Kanban Task Board", desc: "Delegate tasks across committees with automated deadlines and status tracking.", icon: "Columns" },
      { id: "budget", title: "Budget & Expense Workflow", desc: "Transparent expenditure requests, receipt upload, and instant faculty approval.", icon: "DollarSign" },
      { id: "committees", title: "Committee Governance", desc: "Manage sub-teams, designate roles, and control permission scopes.", icon: "Users" },
      { id: "meeting_scheduler", title: "AI Meeting Scheduler", desc: "Auto-sync availability and generate AI summaries of executive meetings.", icon: "Calendar" },
      { id: "announcements", title: "Multi-Channel Broadcasts", desc: "Publish once to reach members via WhatsApp, Email, Discord, and in-app push.", icon: "Send" },
      { id: "analytics", title: "Club Engagement Analytics", desc: "Track member retention, RSVP conversion rates, and event popularity metrics.", icon: "TrendingUp" }
    ]
  },
  faculty: {
    title: "Faculty & Administration OS",
    subtitle: "Comprehensive governance, compliance, and campus-wide telemetry",
    color: "#EC4899",
    features: [
      { id: "audit_logs", title: "Real-Time Audit Logs", desc: "Full immutable record of budget approvals, leadership changes, and room bookings.", icon: "ShieldCheck" },
      { id: "org_analytics", title: "Campus-Wide Analytics", desc: "Macro-level dashboards comparing engagement across departments and societies.", icon: "BarChart" },
      { id: "compliance", title: "Automated Compliance", desc: "Ensure safety protocols, NOC clearances, and venue regulations are met.", icon: "FileCheck" },
      { id: "reports", title: "Accreditation Reports", desc: "One-click generation of NAAC / NIRF / ABET student activity documentation.", icon: "FileText" },
      { id: "cross_club", title: "Cross-Club Sponsorships", desc: "Facilitate inter-club collaborations and corporate sponsor distribution.", icon: "Share2" },
      { id: "insights", title: "AI Campus Insights", desc: "Predictive analytics on student well-being, burnout, and extracurricular balance.", icon: "Cpu" }
    ]
  }
};

export const ORGOS_VISION_NODES = [
  { name: "Universities", count: "1,200+", desc: "Colleges & Academic Campuses", color: "#06B6D4", position: [-5, 3, 0] },
  { name: "Student Unions", count: "4,500+", desc: "Student Governance Councils", color: "#7C3AED", position: [4, 4, -2] },
  { name: "Research Labs", count: "800+", desc: "Scientific & Innovation Collectives", color: "#10B981", position: [6, -2, 2] },
  { name: "Incubation Centers", count: "350+", desc: "Campus Startup Incubators", color: "#F59E0B", position: [-4, -3, 3] },
  { name: "Startups", count: "12,000+", desc: "Early-Stage Venture Teams", color: "#EC4899", position: [0, 5, -4] },
  { name: "NGOs", count: "2,100+", desc: "Social Impact & Volunteer Organizations", color: "#3B82F6", position: [-6, 0, -3] },
  { name: "Enterprise Orgs", count: "500+", desc: "Corporate Employee Resource Groups", color: "#8B5CF6", position: [5, 1, 4] }
];

export const SCENE_TIMELINES = [
  { index: 0, id: "scene-1", title: "01 // The Fragmented Cosmos", subtitle: "The Chaos of Disconnected Tools", progressRange: [0.0, 0.11] },
  { index: 1, id: "scene-2", title: "02 // The Convergence", subtitle: "Unifying Campus Organizations", progressRange: [0.11, 0.22] },
  { index: 2, id: "scene-3", title: "03 // Journey Into Planet", subtitle: "Entering the ClubPlanet Core", progressRange: [0.22, 0.33] },
  { index: 3, id: "scene-4", title: "04 // Through the Clouds", subtitle: "Emerging into the Living Campus", progressRange: [0.33, 0.44] },
  { index: 4, id: "scene-5", title: "05 // University Campus", subtitle: "Exploring Campus Ecosystem", progressRange: [0.44, 0.55] },
  { index: 5, id: "scene-6", title: "06 // The Club Office", subtitle: "Interactive Holographic Club Roster", progressRange: [0.55, 0.66] },
  { index: 6, id: "scene-7", title: "07 // Role Command Centers", subtitle: "Student, Coordinator & Faculty OS", progressRange: [0.66, 0.77] },
  { index: 7, id: "scene-8", title: "08 // OrgOS Vision", subtitle: "The Global Galactic Network", progressRange: [0.77, 0.88] },
  { index: 8, id: "scene-9", title: "09 // Join the Orbit", subtitle: "Get Early Access to OrgOS", progressRange: [0.88, 1.0] }
];
