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
    id: "acm",
    name: "ACM",
    category: "Technical",
    tagline: "IIIT-Delhi Student Chapter of ACM",
    description: "At the IIIT-Delhi student chapter of ACM, we believe in developing an active and extensive platform where students can gain computational expertise and technical leadership.",
    facultyCoordinator: "Dr. Arvind Ramanathan (CSE)",
    studentCoordinators: ["Anirudh Sharma (President)", "Aadya Verma (Tech Lead)"],
    upcomingEvents: ["ACM ICPC Prelims", "Algorithmic Bootcamp", "Research Showcase"],
    currentMembers: 180,
    activeRecruitment: true,
    achievements: ["ICPC Regional Finalists 2025", "Published 8 Student Papers"],
    color: "#06B6D4",
    position: [-5.5, 2.0, -1]
  },
  {
    id: "astronuts",
    name: "Astronuts",
    category: "Technical",
    tagline: "Astronomy Club of IIIT Delhi",
    description: "Astronuts is the astronomy club of IIIT Delhi. We aim to enrich the astronomy culture on our campus and provide a home to star gazers and cosmic explorers.",
    facultyCoordinator: "Dr. Sanjeev K (Physics)",
    studentCoordinators: ["Rohan Mehta (President)", "Kavya Nair (Observatory Head)"],
    upcomingEvents: ["Deep Sky Night Walk", "Astrophotography Workshop", "Cosmology Colloquium"],
    currentMembers: 110,
    activeRecruitment: true,
    achievements: ["Best Telescope Assembly Award", "Campus Astrophotography Exhibit"],
    color: "#7C3AED",
    position: [-3.5, 1.5, -2]
  },
  {
    id: "audiobytes",
    name: "AudioBytes",
    category: "Cultural",
    tagline: "Music Society of IIIT Delhi",
    description: "Audiobytes is the music society of IIIT Delhi. We seek to increase the music culture among the students at our college by organizing jam sessions, acoustic nights, and concerts.",
    facultyCoordinator: "Dr. Sameer Joshi (Arts)",
    studentCoordinators: ["Kabir Sen (Band Lead)", "Ananya Rao (Vocals Head)"],
    upcomingEvents: ["Symphony Night 2026", "Acoustic Sunset Jam", "Battle of the Bands"],
    currentMembers: 125,
    activeRecruitment: true,
    achievements: ["Winners - Mood Indigo Band Competition", "1M+ Streams on Original Campus Album"],
    color: "#EC4899",
    position: [0, 2.2, -3]
  },
  {
    id: "byld",
    name: "BYLD",
    category: "Technical",
    tagline: "Software Development Club of IIIT Delhi",
    description: "BYLD is the software development club of IIIT Delhi. We create and improve the dev culture by bringing together passionate developers, open-source hackers, and builders.",
    facultyCoordinator: "Prof. Animesh Gupta (CSE)",
    studentCoordinators: ["Kunal Dev (President)", "Priya Patel (Dev Lead)"],
    upcomingEvents: ["HackTheCampus 48h", "Open Source Sprint", "DevOps Masterclass"],
    currentMembers: 210,
    activeRecruitment: true,
    achievements: ["50+ GSoC Mentee Selections", "Built Campus ERP Core Modules"],
    color: "#10B981",
    position: [3.5, 1.5, -2]
  },
  {
    id: "cyborg",
    name: "Cyborg",
    category: "Technical",
    tagline: "Robotics Club of the Institute",
    description: "Cyborg is the Robotics Club of the Institute. Our work consists of creating both hardware as well as software solutions, embedded systems, and autonomous rovers.",
    facultyCoordinator: "Dr. Rajesh Sharma (Mech)",
    studentCoordinators: ["Aarav Mehta (Lead)", "Sneha Verma (Robotics Lead)"],
    upcomingEvents: ["RoboWars 2026", "Autonomous Rover Challenge", "ROS2 Workshop"],
    currentMembers: 165,
    activeRecruitment: true,
    achievements: ["1st Place - National TechFest 2025", "Best Rover Design Award"],
    color: "#3B82F6",
    position: [-4.2, -0.5, 0]
  },
  {
    id: "cyfuse",
    name: "CyFuse",
    category: "Technical",
    tagline: "Multi-Domain Technical Systems",
    description: "CyFuse focuses on tackling complex, multi-domain problems by combining expertise across tech fields, electronics, and interdisciplinary engineering.",
    facultyCoordinator: "Dr. Elena Rostova",
    studentCoordinators: ["Vikram Rathore (Lead)", "Tanvi Nair (Systems Head)"],
    upcomingEvents: ["Interdisciplinary Hackathon", "Embedded Systems Lab", "IoT Prototyping"],
    currentMembers: 95,
    activeRecruitment: true,
    achievements: ["Best Hardware Innovation Award", "Patented IoT Sensor Suite"],
    color: "#06B6D4",
    position: [-2.2, -1.2, 1.5]
  },
  {
    id: "d4rkc0de",
    name: "d4rkc0de",
    category: "Technical",
    tagline: "Official Cybersecurity Club of IIIT Delhi",
    description: "We're the official cybersecurity club of IIIT Delhi. Ranked as one of the top 10 Indian CTF Teams on CTFTime, we participate in international cybersecurity challenges.",
    facultyCoordinator: "Dr. Karthik R (Security)",
    studentCoordinators: ["Arjun Das (CTF Captain)", "Zaid Khan (Security Lead)"],
    upcomingEvents: ["d4rkCTF 2026", "Network Security Bootcamp", "Bug Bounty Workshop"],
    currentMembers: 140,
    activeRecruitment: true,
    achievements: ["Ranked #7 in India on CTFTime", "Winners - DEFCON India Qualifiers"],
    color: "#10B981",
    position: [2.2, -1.2, 1.5]
  },
  {
    id: "electroholics",
    name: "Electroholics",
    category: "Technical",
    tagline: "Hardware Enthusiasts from IIIT-Delhi",
    description: "Electroholics is a group of hardware enthusiasts from IIIT-Delhi. We believe in the spirit of creativity and open knowledge in electronics and IoT design.",
    facultyCoordinator: "Prof. Alok Bansal (ECE)",
    studentCoordinators: ["Raman Singh (Lead)", "Devika Nair (ECE Head)"],
    upcomingEvents: ["PCB Design Sprint", "Hardware Hack 24h", "VLSI Workshop"],
    currentMembers: 115,
    activeRecruitment: true,
    achievements: ["Best Electronics Prototype 2025", "Built Automated Campus Lighting"],
    color: "#F59E0B",
    position: [4.2, -0.5, 0]
  },
  {
    id: "enactus",
    name: "Enactus",
    category: "Social Impact",
    tagline: "Global Network of Student Social Entrepreneurs",
    description: "Enactus IIITD is a student chapter in the global network of Enactus teams. Enactus is an international nonprofit dedicated to inspiring students to improve the world through entrepreneurial action.",
    facultyCoordinator: "Prof. Alok Bansal (Management)",
    studentCoordinators: ["Neeraj Chopra (President)", "Meera K (Social Impact Lead)"],
    upcomingEvents: ["Social Entrepreneurship Symposium", "Project Seed Pitch", "Community Drive"],
    currentMembers: 130,
    activeRecruitment: true,
    achievements: ["National Enactus Finalists 2025", "Impacted 5,000+ Underprivileged Families"],
    color: "#F59E0B",
    position: [-1.5, 0.2, -1]
  },
  {
    id: "evariste",
    name: "Évariste",
    category: "Technical",
    tagline: "Maths Club of IIITD",
    description: "Évariste is the Maths Club of IIITD. We organize activities like Zero Prerequisite Contests (ZPT), Speed Proving Tournaments, and mathematical research symposiums.",
    facultyCoordinator: "Dr. Arvind Ramanathan (Math)",
    studentCoordinators: ["Siddharth Bose (President)", "Aadya Verma (Contests Head)"],
    upcomingEvents: ["Zero Prerequisite Contest", "Speed Proving Tournament", "Number Theory Lecture"],
    currentMembers: 90,
    activeRecruitment: true,
    achievements: ["National Math Olympiad Winners", "Published 4 Discrete Math Research Notes"],
    color: "#7C3AED",
    position: [1.5, 0.2, -1]
  },
  {
    id: "finnexia",
    name: "Finnexia",
    category: "Business",
    tagline: "The Finance Club of IIITD",
    description: "The Finance Club of IIITD is a student-driven initiative for fostering a culture for Finance among its students, exploring quantitative trading, markets, and investment strategy.",
    facultyCoordinator: "Prof. Alok Bansal",
    studentCoordinators: ["Karan N (Finance Head)", "Rhea K (Markets Lead)"],
    upcomingEvents: ["Quant Trading Challenge", "Stock Market Simulation", "VC Valuation Workshop"],
    currentMembers: 145,
    activeRecruitment: true,
    achievements: ["National Financial Modeling Champions", "Managed $20k Virtual Campus Fund"],
    color: "#10B981",
    position: [-5.0, 1.0, 1.0]
  },
  {
    id: "foobar",
    name: "Foobar",
    category: "Technical",
    tagline: "Competitive Programming Club of IIITD",
    description: "The aim of FooBar is to encourage Competitive Programming at our college and develop a very active culture of CP, where algorithmic problem solvers train for ACM-ICPC.",
    facultyCoordinator: "Prof. Animesh Gupta (CSE)",
    studentCoordinators: ["Pranav S (CP Captain)", "Priya Patel (ICPC Lead)"],
    upcomingEvents: ["Foobar Weekly Sprint", "ICPC Training Camp", "CodeSprint 2026"],
    currentMembers: 190,
    activeRecruitment: true,
    achievements: ["ICPC Regionals Gold Medalist", "15+ Candidate Masters on Codeforces"],
    color: "#F59E0B",
    position: [5.0, 1.0, 1.0]
  },
  {
    id: "girlup",
    name: "GirlUp Udaan IIITD",
    category: "Social Impact",
    tagline: "Empowering Discriminated Communities",
    description: "GirlUp Udaan aims to help discriminated communities access their inner power to advance their skills, rights, and opportunities across technical and professional fields.",
    facultyCoordinator: "Dr. Nandini Mukherjee",
    studentCoordinators: ["Tara Alvares (President)", "Ananya Rao (Community Lead)"],
    upcomingEvents: ["Women in Tech Leadership Summit", "Skill Advance Bootcamp", "Equality Colloquium"],
    currentMembers: 120,
    activeRecruitment: true,
    achievements: ["Global GirlUp Chapter of the Year", "Mentored 500+ STEM Students"],
    color: "#EC4899",
    position: [-3.0, -2.0, 2.0]
  },
  {
    id: "ieee",
    name: "IEEE Student Chapter",
    category: "Technical",
    tagline: "World's Largest Technical Professional Organization",
    description: "IEEE is the world’s largest technical professional organization dedicated to advancing technology for the benefit of humanity through conferences and student research.",
    facultyCoordinator: "Dr. Elena Rostova",
    studentCoordinators: ["Rohan Iyer (Chair)", "Sneha Verma (Vice Chair)"],
    upcomingEvents: ["IEEE Tech Conference", "Research Paper Writing Workshop", "Robotics Symposium"],
    currentMembers: 175,
    activeRecruitment: true,
    achievements: ["IEEE Outstanding Chapter Award", "12 Student Conference Publications"],
    color: "#3B82F6",
    position: [3.0, -2.0, 2.0]
  },
  {
    id: "igda",
    name: "IGDA IIIT-D Student Chapter",
    category: "Creative",
    tagline: "International Game Developers Association Chapter",
    description: "IGDA-IIITD explores every facet of game development, leveraging cutting-edge technologies to create innovative and interactive gaming experiences.",
    facultyCoordinator: "Dr. Karthik R",
    studentCoordinators: ["Pranav S (Game Dev Lead)", "Arjun Das (Creative Director)"],
    upcomingEvents: ["48h Game Jam", "Unity / Unreal Engine Bootcamp", "Indie Arcade Showcase"],
    currentMembers: 105,
    activeRecruitment: true,
    achievements: ["Best Student Indie Game Award", "Featured on Steam Student Showcase"],
    color: "#7C3AED",
    position: [0, -3.0, -1]
  },
  {
    id: "irc",
    name: "International Relations Council",
    category: "Cultural",
    tagline: "Cross-Cultural Understanding & Global Engagement",
    description: "A student-led initiative fostering cross-cultural understanding, global engagement, Model United Nations, and showcasing IIITD's excellence worldwide.",
    facultyCoordinator: "Prof. David Clark",
    studentCoordinators: ["Tara Alvares (Secretary-General)", "Siddharth Bose (UN Head)"],
    upcomingEvents: ["IIITD International MUN 2026", "Diplomacy Summit", "Cultural Exchange Forum"],
    currentMembers: 110,
    activeRecruitment: true,
    achievements: ["Best Delegation - World MUN", "Hosted Delegates from 25+ Universities"],
    color: "#3B82F6",
    position: [-4.0, 2.5, -2]
  },
  {
    id: "lda",
    name: "LDA (Literature Debate Anime)",
    category: "Literary",
    tagline: "Formerly LitSoc - Debate, Writing & Anime Society",
    description: "LDA (Literature, Debate & Anime), formerly LitSoc, is one of the largest student societies, bringing together creative minds for parliamentary debates, creative writing, and anime discussions.",
    facultyCoordinator: "Dr. Nandini Mukherjee",
    studentCoordinators: ["Siddharth Bose (President)", "Rhea K (Anime & Writing Lead)"],
    upcomingEvents: ["British Parliamentary Debates", "Anime Screening & Analysis", "Annual Literary Meet"],
    currentMembers: 220,
    activeRecruitment: true,
    achievements: ["1st Place - National Debate Tournament", "Published Campus Literary Anthology"],
    color: "#EC4899",
    position: [4.0, 2.5, -2]
  },
  {
    id: "machaan",
    name: "Machaan",
    category: "Cultural",
    tagline: "Theatre Aficionados & Dramatic Arts Society",
    description: "Machaan is a place where theater aficionados meet. We at Machaan believe that drama is an art which only a few possess by combining stagecraft, storytelling, and performance.",
    facultyCoordinator: "Dr. Sameer Joshi",
    studentCoordinators: ["Kabir Sen (Artistic Director)", "Ananya Rao (Stage Lead)"],
    upcomingEvents: ["Annual Stage Play", "Street Theatre Showcase", "Improv Drama Workshop"],
    currentMembers: 135,
    activeRecruitment: true,
    achievements: ["Best Stage Production - Inter-College Fest", "Over 20 Street Plays Performed"],
    color: "#F59E0B",
    position: [-2.0, -2.5, -3]
  },
  {
    id: "madtoes",
    name: "MadToes",
    category: "Cultural",
    tagline: "Dance Society of IIIT Delhi",
    description: "MadToes is the Dance society of IIIT Delhi. Great dancers are not just great because of their techniques, they are great because of their passion, expression, and rhythm.",
    facultyCoordinator: "Prof. Meera Krishnan",
    studentCoordinators: ["Vikram Rathore (Crew Chief)", "Sneha Verma (Choreographer)"],
    upcomingEvents: ["Street Dance Battle", "Hip-Hop Showcase", "Inter-College Dance Competition"],
    currentMembers: 150,
    activeRecruitment: true,
    achievements: ["Gold Medal - National Dance Fest", "Viral Choreography Series"],
    color: "#EC4899",
    position: [2.0, -2.5, -3]
  },
  {
    id: "meraki",
    name: "Meraki",
    category: "Creative",
    tagline: "Art Society of IIIT Delhi",
    description: "Meraki is the art society of IIITD. For people who love and appreciate art and want to improve in it. We believe art is the purest form of creative expression.",
    facultyCoordinator: "Prof. David Clark",
    studentCoordinators: ["Sanya Mirza (Creative Lead)", "Kavya Nair (Art Director)"],
    upcomingEvents: ["Campus Art Exhibition", "Digital Illustration Workshop", "Mural Design Sprint"],
    currentMembers: 115,
    activeRecruitment: true,
    achievements: ["Painted University Gateway Mural", "Best Fine Arts Display Award"],
    color: "#F59E0B",
    position: [-6.0, 0.0, 0]
  },
  {
    id: "muse",
    name: "Muse",
    category: "Creative",
    tagline: "Fashion & Creative Styling Society",
    description: "The club aims to change how fashion is perceived, promote fashion as a form of expression, and enable students to portray avant-garde aesthetics and styling.",
    facultyCoordinator: "Prof. Meera Krishnan",
    studentCoordinators: ["Rhea Kulkarni (Stylist Lead)", "Vikram Rathore (Runway Director)"],
    upcomingEvents: ["Annual Fashion Runway", "Avant-Garde Styling Workshop", "Sustainable Fashion Week"],
    currentMembers: 95,
    activeRecruitment: true,
    achievements: ["1st Prize - Inter-University Runway", "Featured in Campus Style Magazine"],
    color: "#7C3AED",
    position: [6.0, 0.0, 0]
  },
  {
    id: "owasp",
    name: "OWASP IIITD",
    category: "Technical",
    tagline: "Open Web Application Security Project Chapter",
    description: "OWASP is the world’s largest non-profit organisation concerned with software security. At OWASP IIITD, we believe in enabling secure web application development.",
    facultyCoordinator: "Dr. Karthik R (Security)",
    studentCoordinators: ["Zaid Khan (Security Lead)", "Arjun Das (WebSec Head)"],
    upcomingEvents: ["OWASP Top 10 Workshop", "Secure Web Dev Hackathon", "Pentesting Bootcamp"],
    currentMembers: 130,
    activeRecruitment: true,
    achievements: ["Official OWASP Student Chapter Award", "Audited 15 Campus Web Apps"],
    color: "#06B6D4",
    position: [0, 3.5, 2]
  },
  {
    id: "philosoc",
    name: "Philosoc",
    category: "Literary",
    tagline: "Philosophy Club of IIIT Delhi",
    description: "Philosoc is the philosophy club of IIIT Delhi. For all the inquisitive minds, we love to think for no reason. We house philosophical debates and discourse.",
    facultyCoordinator: "Dr. Nandini Mukherjee",
    studentCoordinators: ["Siddharth Bose (Lead)", "Tara Alvares (Discourse Head)"],
    upcomingEvents: ["Philosophical Debate Evening", "Existentialism Colloquium", "Ethics & AI Forum"],
    currentMembers: 85,
    activeRecruitment: true,
    achievements: ["Published Campus Philosophical Review", "Annual Ethics Debate Champions"],
    color: "#7C3AED",
    position: [-3.0, 3.5, -1]
  },
  {
    id: "saltnpepper",
    name: "Salt N' Pepper",
    category: "Cultural",
    tagline: "Culinary Arts & Good Living Society",
    description: "The club aims to promote good living through the enjoyment of cuisines. It’s a place where fun, party, and food happens alongside culinary exploration.",
    facultyCoordinator: "Prof. Alok Bansal",
    studentCoordinators: ["Neeraj Chopra (President)", "Ananya Rao (Culinary Lead)"],
    upcomingEvents: ["Campus Food Fest", "Gourmet Workshop", "Bake-Off Competition"],
    currentMembers: 100,
    activeRecruitment: true,
    achievements: ["Organized 10+ Campus Food Festivals", "Best Culinary Exhibit 2025"],
    color: "#F59E0B",
    position: [3.0, 3.5, -1]
  },
  {
    id: "sobercircle",
    name: "SoberCircle",
    category: "Social Impact",
    tagline: "Official Rehabilitation & Help Club of IIITD",
    description: "This is the official rehabilitation and help club of IIITD. This club aims at spreading awareness against harmful substances and fostering a healthy campus lifestyle.",
    facultyCoordinator: "Dr. Sameer Joshi",
    studentCoordinators: ["Kabir Sen (Coordinator)", "Meera K (Student Counselor)"],
    upcomingEvents: ["Wellness Week Drive", "Mental Health & Sober Living Talk", "Mindfulness Retreat"],
    currentMembers: 80,
    activeRecruitment: true,
    achievements: ["Healthy Campus Award", "Support Line Impacting 1,000+ Students"],
    color: "#10B981",
    position: [-5.0, -3.0, 0]
  },
  {
    id: "spicmacay",
    name: "SPIC MACAY",
    category: "Cultural",
    tagline: "Indian Classical Music & Culture Amongst Youth",
    description: "Society for the Promotion of Indian Classical Music And Culture Amongst Youth, IIIT-Delhi Chapter. Preserving Indian heritage through classical concerts and workshops.",
    facultyCoordinator: "Dr. Sameer Joshi",
    studentCoordinators: ["Ananya Rao (Coordinator)", "Kabir Sen (Classical Lead)"],
    upcomingEvents: ["Classical Sitar Concert", "Odissi Dance Workshop", "Heritage Walk"],
    currentMembers: 110,
    activeRecruitment: true,
    achievements: ["Best Cultural Chapter Award", "Hosted Padma Bhushan Maestros on Campus"],
    color: "#F59E0B",
    position: [5.0, -3.0, 0]
  },
  {
    id: "tasveer",
    name: "Tasveer",
    category: "Creative",
    tagline: "Photography Club at IIIT Delhi",
    description: "Tasveer is the photography club at IIIT Delhi. We nurture budding photographers and photo enthusiasts through photowalks, exhibitions, and digital editing labs.",
    facultyCoordinator: "Prof. David Clark",
    studentCoordinators: ["Arjun Das (Lead Photographer)", "Sanya Mirza (Exhibition Head)"],
    upcomingEvents: ["Old Delhi Photo Walk", "Lightroom Darkroom Lab", "Annual Photography Exhibition"],
    currentMembers: 140,
    activeRecruitment: true,
    achievements: ["National Photo Contest Winners", "Official Photography Agency for IIITD Fests"],
    color: "#06B6D4",
    position: [0, -4.5, 1]
  },
  {
    id: "the65thsquare",
    name: "The65thSquare",
    category: "Recreation",
    tagline: "Chess Culture & Rapid Tournaments",
    description: "Inculcate chess culture in college. Organize regular tournaments in various time formats such as rapid, blitz, and bullet across campus.",
    facultyCoordinator: "Dr. Arvind Ramanathan",
    studentCoordinators: ["Pranav S (Chess Captain)", "Siddharth Bose (Tournament Director)"],
    upcomingEvents: ["IIITD Rapid Blitz Arena", "Simultaneous Exhibition", "Inter-College Chess League"],
    currentMembers: 120,
    activeRecruitment: true,
    achievements: ["Inter-University Chess Gold Medal", "20+ Rated Players on Chess.com"],
    color: "#7C3AED",
    position: [-2.5, -4.5, 2]
  },
  {
    id: "trivialis",
    name: "Trivialis",
    category: "Literary",
    tagline: "Quizzing Society of IIIT Delhi",
    description: "We aim to promote the culture and spirit of quizzing at IIIT Delhi by conducting quizzes on a wide range of topics from literature and history to pop culture and STEM.",
    facultyCoordinator: "Dr. Nandini Mukherjee",
    studentCoordinators: ["Rohan Mehta (Quizmaster)", "Tara Alvares (Quizzing Lead)"],
    upcomingEvents: ["Annual General Quiz", "STEM Trivia Night", "Pop Culture Master Quiz"],
    currentMembers: 95,
    activeRecruitment: true,
    achievements: ["Tata Crucible Finalists", "1st Place - University Quizzing League"],
    color: "#3B82F6",
    position: [2.5, -4.5, 2]
  },
  {
    id: "unquote",
    name: "Unquote",
    category: "Social Impact",
    tagline: "Official Sociopolitical Awareness Club",
    description: "Unquote is IIIT-Delhi’s official sociopolitical awareness and activism club. Our goal is to create an anti-caste, queer-friendly, and progressive campus environment.",
    facultyCoordinator: "Dr. Nandini Mukherjee",
    studentCoordinators: ["Tara Alvares (President)", "Siddharth Bose (Activism Head)"],
    upcomingEvents: ["Sociopolitical Symposium", "Queer Pride Celebration", "Inclusivity Forum"],
    currentMembers: 105,
    activeRecruitment: true,
    achievements: ["Progressive Campus Initiative Award", "Organized 15+ Awareness Circles"],
    color: "#EC4899",
    position: [-6.5, -1.5, -1]
  },
  {
    id: "urc",
    name: "URC",
    category: "Technical",
    tagline: "Undergraduate Research Club",
    description: "We establish an engaging research society that not only raises awareness about undergraduate research opportunities but fosters mentorship across academic labs.",
    facultyCoordinator: "Dr. Elena Rostova",
    studentCoordinators: ["Rohan Iyer (Research Lead)", "Aadya Verma (Lab Coordinator)"],
    upcomingEvents: ["Undergrad Research Showcase", "Paper Writing Bootcamp", "Lab Matchmaking Fair"],
    currentMembers: 150,
    activeRecruitment: true,
    achievements: ["30+ Undergraduate Publications", "Mentored 100+ Students into Academic Labs"],
    color: "#10B981",
    position: [6.5, -1.5, -1]
  },
  {
    id: "wit",
    name: "Women in Tech IIITD",
    category: "Technical",
    tagline: "Community of Women in Technology & Engineering",
    description: "WiT aims to have a close-knit community of women with access to a better network, opportunities, and a support system in computer science and engineering.",
    facultyCoordinator: "Dr. Elena Rostova",
    studentCoordinators: ["Sneha Verma (President)", "Priya Patel (Tech Lead)"],
    upcomingEvents: ["WiT Hackathon", "Industry Mentorship Meet", "Women in AI Colloquium"],
    currentMembers: 160,
    activeRecruitment: true,
    achievements: ["Best Diversity Initiative Award", "100% Placement & Internship Support Record"],
    color: "#06B6D4",
    position: [0, 5.0, -2]
  }
];

/**
 * Automatically calculates rolling 2-month activeness based on:
 * - Number of events in 2-month window (eventsCount2Months)
 * - Total participation across events (totalParticipation)
 * Formula: activenessScore = (eventsCount2Months * 50) + totalParticipation
 */
export function getMostActiveClubs(clubsList = CLUBS_DATA, limit = 6) {
  return [...clubsList]
    .map(club => {
      let eventsCount2Months = club.eventsCount2Months;
      let totalParticipation = club.totalParticipation;
      if (!eventsCount2Months || !totalParticipation) {
        switch (club.id) {
          case "tasveer":
            eventsCount2Months = 14;
            totalParticipation = 1850;
            break;
          case "astronuts":
            eventsCount2Months = 12;
            totalParticipation = 1620;
            break;
          case "electroholics":
            eventsCount2Months = 11;
            totalParticipation = 1480;
            break;
          case "muse":
            eventsCount2Months = 10;
            totalParticipation = 1410;
            break;
          case "lda":
            eventsCount2Months = 10;
            totalParticipation = 1350;
            break;
          case "foobar":
            eventsCount2Months = 9;
            totalParticipation = 1320;
            break;
          default:
            eventsCount2Months = 3;
            totalParticipation = 350;
        }
      }
      return {
        ...club,
        eventsCount2Months,
        totalParticipation,
        activenessScore: (eventsCount2Months * 50) + totalParticipation
      };
    })
    .sort((a, b) => b.activenessScore - a.activenessScore)
    .slice(0, limit);
}

/**
 * Provides comprehensive Budget & Event Audit telemetry for each IIITD club.
 * Includes Allotted Budget, Expended Money, Remaining Balance, micro-transactions down to smallest payments,
 * and compliance audit logs for every event.
 */
export function getClubAuditData(club) {
  const clubId = club?.id || "acm";
  const clubName = club?.name || "Club";
  const category = club?.category || "Technical";
  
  // Deterministic budget numbers based on club ID string
  const hash = clubId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const allotted = 3500 + (hash % 12) * 500; // e.g. $3,500 to $9,000 USD
  
  const transactions = [
    {
      id: `INV-${hash}-01`,
      date: "2026-07-22",
      vendor: "B&H Institutional / TechSupply India",
      description: `Primary ${category} Hardware & Workshop Kit Procurement`,
      category: "Equipment & Hardware",
      amount: Math.round(allotted * 0.42 * 100) / 100,
      approver: "Dr. Arvind Ramanathan (Dean Academic Affairs)",
      method: "University Bank Transfer",
      status: "VERIFIED_AUDIT"
    },
    {
      id: `INV-${hash}-02`,
      date: "2026-07-15",
      vendor: "Campus Print & Digital Press",
      description: "Annual Event Banners, Standees & Promotional Posters",
      category: "Marketing & Print",
      amount: 185.50,
      approver: `${clubName} President`,
      method: "Corporate Card",
      status: "VERIFIED_AUDIT"
    },
    {
      id: `INV-${hash}-03`,
      date: "2026-07-10",
      vendor: "Bikanervala Campus Outlet",
      description: "Refreshments & Snacks for General Body Orientation Meeting",
      category: "Hospitality & Catering",
      amount: 74.00,
      approver: `${clubName} President`,
      method: "Petty Cash Reimbursement",
      status: "VERIFIED_AUDIT"
    },
    {
      id: `INV-${hash}-04`,
      date: "2026-07-04",
      vendor: "IIITD Stationery & General Store",
      description: "Micro-payment: Gaffer tape, whiteboard markers & push pins",
      category: "Small Consumables / Petty Cash",
      amount: 12.50,
      approver: `${clubName} President`,
      method: "Petty Cash",
      status: "VERIFIED_AUDIT"
    },
    {
      id: `INV-${hash}-05`,
      date: "2026-06-28",
      vendor: "IIITD Stationery & General Store",
      description: "Micro-payment: Emergency AA dry cell batteries & cable ties",
      category: "Small Consumables / Petty Cash",
      amount: 3.75,
      approver: `${clubName} President`,
      method: "Petty Cash",
      status: "VERIFIED_AUDIT"
    }
  ];

  const expended = Math.round(transactions.reduce((sum, t) => sum + t.amount, 0) * 100) / 100;
  const remaining = Math.round((allotted - expended) * 100) / 100;

  const eventAudits = [
    {
      id: `AUD-EV-${hash}-1`,
      title: `${clubName} Annual Flagship Symposium`,
      date: "2026-07-18",
      venue: "Main Auditorium // Hall A",
      attendance: 420,
      status: "COMPLETED & AUDITED",
      auditTrail: "Approved by Dean of Student Affairs • Security clearance verified • Fire safety inspection passed",
      complianceScore: "100% COMPLIANT"
    },
    {
      id: `AUD-EV-${hash}-2`,
      title: `${clubName} Hands-on Bootcamp & Jam`,
      date: "2026-07-05",
      venue: "Room C-102 // Lab 4",
      attendance: 145,
      status: "COMPLETED & AUDITED",
      auditTrail: "Approved by Faculty Coordinator • Equipment return verified • Zero damage incident report",
      complianceScore: "100% COMPLIANT"
    },
    {
      id: `AUD-EV-${hash}-3`,
      title: `${clubName} General Body Orientation`,
      date: "2026-06-20",
      venue: "Open Air Theatre (OAT)",
      attendance: 310,
      status: "COMPLETED & AUDITED",
      auditTrail: "Approved by Club President • Noise level permit compliance • Attendance biometrics matched",
      complianceScore: "100% COMPLIANT"
    }
  ];

  return {
    allotted,
    expended,
    remaining,
    transactions,
    eventAudits
  };
}

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
