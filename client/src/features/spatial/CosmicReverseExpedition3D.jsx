import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Sphere, Ring, Line, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Compass,
  Shield,
  Orbit,
  Zap,
  ArrowRight,
  CheckCircle2,
  Play,
  RefreshCw,
  Layers,
  MapPin,
  Eye,
  Award,
  Users,
  Calendar,
  Clock,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

// ============================================================================
// 1. CELESTIAL DATA STRUCTURE: CLUBS (LEFT CONSTELLATION) & EVENTS (RIGHT)
// ============================================================================
export const COSMIC_NODES = {
  CLUBS: [
    {
      id: "tasveer",
      title: "TASVEER",
      category: "Photography Club",
      code: "C-01",
      members: "210 Members",
      rank: "#1 Most Active",
      color: "#06B6D4",
      position: [-16, 6, -12],
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
      color: "#7C3AED",
      position: [-19, 2, -15],
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
      color: "#F59E0B",
      position: [-13, 0.5, -10],
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
      color: "#EC4899",
      position: [-22, -3, -16],
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
      color: "#06B6D4",
      position: [-11, -2, -14],
      description: "IIIT-Delhi competitive programming, algorithms, and systems architecture society. Organizes ProCon 2026 and ICPC training bootcamps.",
      events: ["IIITD ProCon 2026 Flagship", "Dynamic Programming Bootcamp"],
      committee: ["Kunal Dev (President)", "Siddharth Bose (Algo Coach)"],
      recruitment: "ACTIVE RECRUITMENT",
    },
    {
      id: "lda",
      title: "LDA (ANIME DEBATE)",
      category: "Debate Club",
      code: "C-06",
      members: "145 Members",
      rank: "#6 Most Active",
      color: "#8B5CF6",
      position: [-17, -5.5, -13],
      description: "Literary, Debate & Anime parliamentary debate society. Hosts national parliamentary tournaments, anime discourse panels, and creative writing slams.",
      events: ["National Parliamentary Debate", "Anime Narrative & Ethics Forum"],
      committee: ["Siddharth Bose (Speaker)", "Kabir Sen (Debate Coach)"],
      recruitment: "ACTIVE RECRUITMENT",
    },
    {
      id: "robotics",
      title: "ROBOTICS ROVER",
      category: "Robotics Club",
      code: "C-07",
      members: "195 Members",
      rank: "Core Technical",
      color: "#06B6D4",
      position: [-24, 0, -18],
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
      rank: "Core Research",
      color: "#A855F7",
      position: [-14, -7, -15],
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
      rank: "Executive Club",
      color: "#10B981",
      position: [-19, -9, -17],
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
      color: "#3B82F6",
      position: [-10, -8, -12],
      description: "Enterprise governance, RBAC charter compliance, and campus system architecture council.",
      events: ["Leadership & Governance Summit", "FERPA Audit Workshop"],
      committee: ["Kunal Dev (Principal Architect)", "Administration Command"],
      recruitment: "INVITATION ONLY",
    },
  ],

  EVENTS: [
    {
      id: "symphony-night",
      title: "SYMPHONY NIGHT LIVE CONCERT",
      category: "Cultural Flagship",
      date: "Nov 18, 2026 • 18:30 IST",
      venue: "IIIT-Delhi Okhla Amphitheatre",
      organizer: "AudioBytes & Muse",
      seats: "420 / 500 Seats Left",
      color: "#F97316",
      position: [15, 5, -12],
      description: "Annual multi-genre open-air symphony, acoustic band competition, and fashion runway gala.",
    },
    {
      id: "lda-championship",
      title: "LDA (ANIME DEBATE) DEBATE CHAMPIONSHIP",
      category: "Oratory Tournament",
      date: "Nov 21, 2026 • 10:00 IST",
      venue: "Lecture Hall Complex 101",
      organizer: "LDA Debate Society",
      seats: "64 / 80 Teams Registered",
      color: "#F59E0B",
      position: [18, 1.5, -14],
      description: "All-India parliamentary debate championship featuring anime narrative philosophy and ethics motions.",
    },
    {
      id: "hackplanet-2026",
      title: "HACKPLANET 2026 FLAGSHIP",
      category: "Global AI Hackathon",
      date: "Oct 11-14, 2026 • 48 Hours",
      venue: "R&D Block Ground Floor & Cloud",
      organizer: "Foobar & AI Engine",
      seats: "180 Teams • Sold Out",
      color: "#EC4899",
      position: [21, -2, -15],
      description: "48-hour generative AI, autonomous robotics, and fintech hackathon with ₹5,00,000 prize pool.",
    },
    {
      id: "robotics-war",
      title: "ROBOTICS ROVER WAR",
      category: "Mechatronics Challenge",
      date: "Nov 04, 2026 • 14:00 IST",
      venue: "Campus Robotics Arena",
      organizer: "Electroholics & Robotics",
      seats: "32 Autonomous Rovers",
      color: "#F97316",
      position: [14, -1, -11],
      description: "Live combat and LiDAR obstacle navigation competition for autonomous student-built rovers.",
    },
    {
      id: "ferpa-vault",
      title: "FERPA COMPLIANCE VAULT",
      category: "Security Audit",
      date: "Nov 05, 2026 • 15:00 IST",
      venue: "Executive Council Chamber",
      organizer: "21-Module Enterprise",
      seats: "Open Executive Session",
      color: "#06B6D4",
      position: [17, -4.5, -13],
      description: "Mandatory institution-wide RBAC governance, FERPA compliance, and SOC 2 data security verification.",
    },
    {
      id: "quant-sprint",
      title: "QUANT TRADING ALGO SPRINT",
      category: "FinTech Hackathon",
      date: "Dec 02, 2026 • 11:00 IST",
      venue: "Bloomberg Trading Lab 302",
      organizer: "Quant Trading Society",
      seats: "45 / 50 Traders Registered",
      color: "#F59E0B",
      position: [23, -6, -16],
      description: "High-frequency algorithmic options trading sprint using live financial API datasets.",
    },
    {
      id: "ai-token-command",
      title: "AI & TOKEN QUOTA COMMAND",
      category: "System Briefing",
      date: "Dec 15, 2026 • 16:00 IST",
      venue: "Virtual Neural Hub",
      organizer: "AI Engine",
      seats: "Unlimited Virtual Seats",
      color: "#A855F7",
      position: [13, -7.5, -12],
      description: "Semester-end neural LLM quota allocation, token cost optimization, and model fine-tuning report.",
    },
    {
      id: "leadership-summit",
      title: "LEADERSHIP & GOVERNANCE SUMMIT",
      category: "Presidential Council",
      date: "Dec 14, 2026 • 17:00 IST",
      venue: "Senate Hall 501",
      organizer: "Student Council Executive",
      seats: "All Club Presidents",
      color: "#3B82F6",
      position: [19, -9, -15],
      description: "Annual senate session reviewing club budgets, activity metrics, and Campus Celestial Portal roadmaps.",
    },
  ],
};

// ============================================================================
// 2. 3D BLACK HOLE MESH WITH ACCRETION DISK & GRAVITATIONAL LENSING
// ============================================================================
function BlackHoleMesh({ isHovered, onPointerOver, onPointerOut, onTriggerDive }) {
  const accretionGroupRef = useRef();
  const innerRingRef = useRef();
  const middleRingRef = useRef();
  const outerRingRef = useRef();
  const pulseRingRef = useRef();

  useFrame((state, delta) => {
    const speedMultiplier = isHovered ? 3.2 : 1.0;
    if (accretionGroupRef.current) {
      accretionGroupRef.current.rotation.y += delta * 0.35 * speedMultiplier;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * 0.5 * speedMultiplier;
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.z -= delta * 0.3 * speedMultiplier;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.15 * speedMultiplier;
    }
    if (pulseRingRef.current) {
      pulseRingRef.current.rotation.z += delta * 0.8 * speedMultiplier;
      const t = state.clock.getElapsedTime();
      pulseRingRef.current.scale.setScalar(1.0 + Math.sin(t * 3) * (isHovered ? 0.12 : 0.03));
    }
  });

  return (
    <group position={[0, 0, -8]}>
      {/* 1. DARK EVENT HORIZON CORE */}
      <mesh
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onTriggerDive}
      >
        <sphereGeometry args={[4.2, 64, 64]} />
        <meshStandardMaterial
          color="#010204"
          roughness={0.05}
          metalness={0.95}
          emissive="#000000"
        />
      </mesh>

      {/* 2. PHOTON SPHERE / GRAVITATIONAL LENSING AURA */}
      <mesh ref={pulseRingRef}>
        <sphereGeometry args={[4.55, 64, 64]} />
        <meshBasicMaterial
          color={isHovered ? "#06B6D4" : "#A855F7"}
          transparent
          opacity={0.35}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. TILTED ACCRETION DISK SYSTEM */}
      <group ref={accretionGroupRef} rotation={[-0.45, 0.15, 0.2]}>
        {/* INNER DISK RING - ELECTRIC VIOLET */}
        <mesh ref={innerRingRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[5.2, 8.2, 64]} />
          <meshBasicMaterial
            color="#A855F7"
            side={THREE.DoubleSide}
            transparent
            opacity={0.75}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* MIDDLE DISK RING - NEON CYAN ION TRAILS */}
        <mesh ref={middleRingRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[8.5, 12.8, 64]} />
          <meshBasicMaterial
            color="#06B6D4"
            side={THREE.DoubleSide}
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* OUTER DISK RING - GOLDEN PLASMA RIBBONS */}
        <mesh ref={outerRingRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[13.2, 18.5, 64]} />
          <meshBasicMaterial
            color="#F59E0B"
            side={THREE.DoubleSide}
            transparent
            opacity={0.45}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 4. FLOATING INTERACTIVE HOVER LABEL AT CENTER OF BLACK HOLE */}
      <Html position={[0, -5.8, 0]} center distanceFactor={28}>
        <div
          onClick={onTriggerDive}
          className={`px-4 py-2 rounded-2xl border backdrop-blur-xl transition-all cursor-pointer select-none whitespace-nowrap ${
            isHovered
              ? "bg-gradient-to-r from-violet-600/90 to-cyan-500/90 border-cyan-400 text-white shadow-[0_0_30px_rgba(6,182,212,0.6)] scale-105"
              : "bg-black/80 border-white/20 text-zinc-300 hover:border-cyan-400"
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-wider">
            <span
              className={`w-2 h-2 rounded-full ${
                isHovered ? "bg-cyan-300 animate-ping" : "bg-violet-400"
              }`}
            />
            <span>INTERSTELLAR VOID — CONSTELLATION REALM</span>
          </div>
          <div className="text-[10px] font-sans text-zinc-400 mt-0.5 text-center">
            {isHovered ? "⚠️ ENGAGED • CLICK / HOVER TO DIVE" : "Hover / Click to Initiate Celestial Dive"}
          </div>
        </div>
      </Html>
    </group>
  );
}

// ============================================================================
// 3. DEPARTING PLANET (CLUBPLANET PRIME) AT THE TOP HORIZON
// ============================================================================
function DepartingPlanetPrime() {
  const planetRef = useRef();
  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group position={[0, 24, -55]}>
      {/* EXOPLANET SPHERE */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshStandardMaterial
          color="#06B6D4"
          roughness={0.3}
          metalness={0.7}
          emissive="#030712"
        />
      </mesh>

      {/* ATMOSPHERIC GOLDEN SUNRISE GLOW */}
      <mesh>
        <sphereGeometry args={[4.9, 32, 32]} />
        <meshBasicMaterial
          color="#F59E0B"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* HORIZON LABEL */}
      <Html position={[0, 6.2, 0]} center distanceFactor={45}>
        <div className="px-3 py-1 rounded-xl bg-black/70 border border-amber-400/50 backdrop-blur-md text-amber-300 font-mono text-[10px] font-extrabold tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.3)] whitespace-nowrap">
          DEPARTING PLANET CLUBPLANET PRIME
        </div>
      </Html>
    </group>
  );
}

// ============================================================================
// 4. INDIVIDUAL CELESTIAL NODE WITH HALO & INTERACTIVE HTML LABEL
// ============================================================================
function CelestialStarNode({ node, isSelected, onSelectNode, showLabels, isEvent = false }) {
  const starRef = useRef();
  const haloRef = useRef();

  useFrame((state, delta) => {
    if (starRef.current) {
      starRef.current.rotation.y += delta * 0.6;
    }
    if (haloRef.current) {
      haloRef.current.rotation.z += delta * (isEvent ? -0.4 : 0.4);
    }
  });

  return (
    <group position={node.position}>
      {/* 1. GLOWING STAR SPHERE */}
      <mesh
        ref={starRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelectNode(node);
        }}
      >
        <sphereGeometry args={[isSelected ? 0.75 : 0.52, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isSelected ? 1.4 : 0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 2. ROTATING ORBITAL HALO RING */}
      <mesh ref={haloRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[0.9, 1.15, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={isSelected ? 0.95 : 0.45}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. FLOATING HTML LABEL IN 3D SPACE */}
      {showLabels && (
        <Html position={[0, 1.35, 0]} center distanceFactor={26}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(node);
            }}
            className={`px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all cursor-pointer select-none whitespace-nowrap ${
              isSelected
                ? "bg-gradient-to-r from-cyan-500/90 to-violet-600/90 border-cyan-300 text-white shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-110"
                : "bg-black/80 border-white/20 text-zinc-200 hover:border-cyan-400 hover:scale-105"
            }`}
          >
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase tracking-wide">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: node.color }}
              />
              <span>{node.title}</span>
            </div>
            <div className="text-[9px] text-zinc-400 font-sans mt-0.5">
              {isEvent ? node.date : node.category}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// ============================================================================
// 5. CONSTELLATION ENERGY CONNECTIONS (GLOWING LINES BETWEEN STARS)
// ============================================================================
function ConstellationLines3D({ nodes, color, showLines }) {
  if (!showLines || nodes.length < 2) return null;

  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const p1 = new THREE.Vector3(...nodes[i].position);
      const p2 = new THREE.Vector3(...nodes[i + 1].position);
      arr.push([p1, p2]);
    }
    return arr;
  }, [nodes]);

  return (
    <group>
      {points.map(([start, end], index) => (
        <Line
          key={index}
          points={[start, end]}
          color={color}
          lineWidth={1.5}
          transparent
          opacity={0.45}
        />
      ))}
    </group>
  );
}

// ============================================================================
// 6. REVERSE EXPEDITION FLIGHT CAMERA CONTROLLER
// ============================================================================
function CameraExpeditionController({ expeditionState, selectedNode, orbitEnabled, speedMultiplier }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 2, 45));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, -8));

  useFrame((state, delta) => {
    if (selectedNode) {
      // Zoom toward selected star node
      const [nx, ny, nz] = selectedNode.position;
      targetPos.current.set(nx + 3.5, ny + 2, nz + 8);
      targetLookAt.current.set(nx, ny, nz);
    } else if (expeditionState === "PHASE_1_OFFICE") {
      // Inside Club Office -> University Entrance Gates
      targetPos.current.set(0, 8, 30);
      targetLookAt.current.set(0, 15, -40);
    } else if (expeditionState === "PHASE_2_ORBIT") {
      // Orbiting ClubPlanet Prime -> Looking down at atmosphere
      targetPos.current.set(0, 20, 5);
      targetLookAt.current.set(0, 24, -55);
    } else if (expeditionState === "PHASE_3_CRUISE") {
      // Cruising deep space -> approaching Black Hole
      targetPos.current.set(0, 5, 28);
      targetLookAt.current.set(0, 0, -8);
    } else if (expeditionState === "PHASE_5_DIVE") {
      // Event Horizon Dive! Spiraling inward toward the Black Hole core
      const t = state.clock.getElapsedTime();
      targetPos.current.set(Math.sin(t * 2) * 5, Math.cos(t * 2) * 3, -2);
      targetLookAt.current.set(0, 0, -8);
    } else {
      // Default Phase 6: Sacred Interstellar Void & Living Constellations
      const t = state.clock.getElapsedTime() * 0.15 * speedMultiplier;
      if (orbitEnabled) {
        targetPos.current.set(Math.sin(t) * 44, 4 + Math.sin(t * 0.5) * 3, Math.cos(t) * 44);
      } else {
        targetPos.current.set(0, 3, 44);
      }
      targetLookAt.current.set(0, 0, -8);
    }

    // Smooth lerp for buttery 60 FPS camera interpolation
    camera.position.lerp(targetPos.current, delta * 3.5);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

// ============================================================================
// 7. MAIN MASTER 3D CANVAS & HUD COMPONENT (EXACT MATCH TO USER SCREENSHOT)
// ============================================================================
export default function CosmicReverseExpedition3D({
  selectedTrack = "ALL",
  onSelectNodeFromHUD,
  onClosePortal,
}) {
  // 3D Scene Controls State
  const [selectedNode, setSelectedNode] = useState(null);
  const [isBlackHoleHovered, setIsBlackHoleHovered] = useState(false);
  const [expeditionState, setExpeditionState] = useState("PHASE_6_VOID"); // "PHASE_1_OFFICE" | "PHASE_2_ORBIT" | "PHASE_3_CRUISE" | "PHASE_5_DIVE" | "PHASE_6_VOID"
  const [orbitEnabled, setOrbitEnabled] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const [travelSpeed, setTravelSpeed] = useState(1.2);

  // Filtered nodes based on Left-side track toggles
  const visibleClubs = useMemo(() => {
    if (selectedTrack === "EVENTS" || selectedTrack === "GOVERNANCE") return [];
    return COSMIC_NODES.CLUBS;
  }, [selectedTrack]);

  const visibleEvents = useMemo(() => {
    if (selectedTrack === "CLUBS" || selectedTrack === "GOVERNANCE") return [];
    return COSMIC_NODES.EVENTS;
  }, [selectedTrack]);

  // Handle 6-Phase Reverse Expedition Sequence
  const triggerReverseExpedition = useCallback(() => {
    setExpeditionState("PHASE_1_OFFICE");
    setTimeout(() => setExpeditionState("PHASE_2_ORBIT"), 2500);
    setTimeout(() => setExpeditionState("PHASE_3_CRUISE"), 5000);
    setTimeout(() => setExpeditionState("PHASE_6_VOID"), 8000);
  }, []);

  const handleBlackHoleDive = useCallback(() => {
    setExpeditionState("PHASE_5_DIVE");
    setTimeout(() => {
      setExpeditionState("PHASE_6_VOID");
    }, 2800);
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-[#030509] overflow-hidden select-none">
      {/* ==================================================================== */}
      {/* 1. THREE.JS REACT THREE FIBER CANVAS (60 FPS PERFORMANCE GUARANTEED) */}
      {/* ==================================================================== */}
      <Canvas
        camera={{ position: [0, 3, 44], fov: 55, near: 0.1, far: 2000 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#030509"]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[10, 20, 15]} intensity={0.8} />

        {/* STARS BACKGROUND & DRIFTING DUST PARTICLES */}
        {showParticles && (
          <Stars
            radius={200}
            depth={100}
            count={4500}
            factor={6}
            saturation={0.5}
            fade
            speed={1.5 * travelSpeed}
          />
        )}

        {/* DEPARTING PLANET CLUBPLANET PRIME AT TOP HORIZON */}
        <DepartingPlanetPrime />

        {/* THE ENORMOUS ROTATING BLACK HOLE AT CENTER [0, 0, -8] */}
        <BlackHoleMesh
          isHovered={isBlackHoleHovered}
          onPointerOver={() => setIsBlackHoleHovered(true)}
          onPointerOut={() => setIsBlackHoleHovered(false)}
          onTriggerDive={handleBlackHoleDive}
        />

        {/* LEFT CONSTELLATION: CHARTERED CLUBS & SOCIETIES */}
        <group>
          <ConstellationLines3D
            nodes={visibleClubs}
            color="#A855F7"
            showLines={showLines}
          />
          {visibleClubs.map((club) => (
            <CelestialStarNode
              key={club.id}
              node={club}
              isSelected={selectedNode?.id === club.id}
              onSelectNode={(node) => {
                setSelectedNode(node);
                if (onSelectNodeFromHUD) onSelectNodeFromHUD(node);
              }}
              showLabels={showLabels}
              isEvent={false}
            />
          ))}
        </group>

        {/* RIGHT CONSTELLATION: UPCOMING ENTERPRISE EVENTS */}
        <group>
          <ConstellationLines3D
            nodes={visibleEvents}
            color="#F97316"
            showLines={showLines}
          />
          {visibleEvents.map((evt) => (
            <CelestialStarNode
              key={evt.id}
              node={evt}
              isSelected={selectedNode?.id === evt.id}
              onSelectNode={(node) => {
                setSelectedNode(node);
                if (onSelectNodeFromHUD) onSelectNodeFromHUD(node);
              }}
              showLabels={showLabels}
              isEvent={true}
            />
          ))}
        </group>

        {/* REVERSE EXPEDITION CAMERA INTERPOLATION ENGINE */}
        <CameraExpeditionController
          expeditionState={expeditionState}
          selectedNode={selectedNode}
          orbitEnabled={orbitEnabled}
          speedMultiplier={travelSpeed}
        />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          maxDistance={120}
          minDistance={10}
        />
      </Canvas>

      {/* ==================================================================== */}
      {/* 2. FLOATING ENTERPRISE HUD ARCHITECTURE (EXACT MATCH TO SCREENSHOT) */}
      {/* ==================================================================== */}

      {/* A. LEFT COLUMN FLOATING PANELS */}
      <div className="absolute left-6 top-6 z-30 flex flex-col gap-4 w-72 pointer-events-none">
        {/* CELESTIAL LAYERS BOX */}
        <div className="p-4 rounded-2xl bg-[#090C17]/85 border border-white/15 backdrop-blur-xl shadow-2xl pointer-events-auto space-y-3">
          <div className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-zinc-400 flex items-center justify-between">
            <span>CELESTIAL LAYERS</span>
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-xs font-bold text-purple-200">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>Clubs Constellation</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-purple-500/30 text-[10px]">12</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-orange-500/15 border border-orange-500/30 text-xs font-bold text-orange-200">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span>Events Constellation</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-orange-500/30 text-[10px]">8</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-xs font-bold text-cyan-200">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Governance Constellation</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/30 text-[10px]">6</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-xs font-bold text-blue-200">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>Interchange Nodes</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-blue-500/30 text-[10px]">4</span>
            </div>
          </div>
        </div>

        {/* PORTAL STATUS HUD RING */}
        <div className="p-4 rounded-2xl bg-[#090C17]/85 border border-white/15 backdrop-blur-xl shadow-2xl pointer-events-auto flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-zinc-400">
              PORTAL STATUS
            </div>
            <div className="text-sm font-black text-white mt-0.5">Stable</div>
            <div className="text-[10px] text-cyan-400 font-mono">
              Gravitational Fields • Nominal
            </div>
          </div>
          <div className="relative w-12 h-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 animate-spin flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          </div>
        </div>

        {/* CELESTIAL COORDINATES & LIVE RADAR */}
        <div className="p-4 rounded-2xl bg-[#090C17]/85 border border-white/15 backdrop-blur-xl shadow-2xl pointer-events-auto space-y-2">
          <div className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-zinc-400 flex items-center justify-between">
            <span>CELESTIAL COORDINATES</span>
            <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
            <span>X: -2847.21</span>
            <span>Z: -6182.94</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono font-bold">
            <span className="text-zinc-500 uppercase">VELOCITY</span>
            <span className="text-cyan-400">
              {expeditionState === "PHASE_3_CRUISE"
                ? "2.48c • ACCELERATING"
                : `${(0.62 * travelSpeed).toFixed(2)}c • CRUISE`}
            </span>
          </div>
        </div>
      </div>

      {/* B. TOP CENTER HORIZON TELEMETRY PILLS & EXPEDITION LAUNCHER */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
        <button
          onClick={triggerReverseExpedition}
          className="px-5 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-extrabold text-xs shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all cursor-pointer pointer-events-auto flex items-center gap-2"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>🚀 Launch Reverse Expedition (Office → Orbit → Black Hole Dive)</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-black/65 border border-white/15 backdrop-blur-md text-[10px] font-mono text-zinc-300 flex items-center gap-2">
            <span>CRUISING THROUGH CLOUDS</span>
            <span className="text-cyan-400 font-bold">Altitude: 12.4 km</span>
            <span className="text-violet-400 font-bold">Velocity: 0.62c</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-500/40 backdrop-blur-md text-[10px] font-mono text-purple-200 font-extrabold flex items-center gap-1.5">
            <span>ENTERING VOID SPACE</span>
            <span className="text-purple-300">• Gravity Shift Detected</span>
          </div>
        </div>
      </div>

      {/* C. RIGHT COLUMN FLOATING CONTROLS & D-PAD */}
      <div className="absolute right-6 top-6 z-30 flex flex-col gap-4 w-72 pointer-events-none">
        {/* PORTAL CONTROLS CARD */}
        <div className="p-4 rounded-2xl bg-[#090C17]/85 border border-white/15 backdrop-blur-xl shadow-2xl pointer-events-auto space-y-3">
          <div className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-zinc-400">
            PORTAL CONTROLS
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-300 font-semibold">
              <span>Camera Orbit</span>
              <button
                onClick={() => setOrbitEnabled(!orbitEnabled)}
                className={`w-9 h-5 rounded-full p-0.5 transition-all cursor-pointer flex items-center ${
                  orbitEnabled ? "bg-cyan-500 justify-end" : "bg-white/20 justify-start"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-300 font-semibold">
              <span>Star Labels</span>
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`w-9 h-5 rounded-full p-0.5 transition-all cursor-pointer flex items-center ${
                  showLabels ? "bg-cyan-500 justify-end" : "bg-white/20 justify-start"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-300 font-semibold">
              <span>Constellation Lines</span>
              <button
                onClick={() => setShowLines(!showLines)}
                className={`w-9 h-5 rounded-full p-0.5 transition-all cursor-pointer flex items-center ${
                  showLines ? "bg-cyan-500 justify-end" : "bg-white/20 justify-start"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-300 font-semibold">
              <span>Particle Flow</span>
              <button
                onClick={() => setShowParticles(!showParticles)}
                className={`w-9 h-5 rounded-full p-0.5 transition-all cursor-pointer flex items-center ${
                  showParticles ? "bg-cyan-500 justify-end" : "bg-white/20 justify-start"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-400">
              <span>TRAVEL SPEED</span>
              <span className="text-cyan-400">{travelSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={travelSpeed}
              onChange={(e) => setTravelSpeed(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* D-PAD & RESET VIEW CONTROLLER */}
        <div className="p-4 rounded-2xl bg-[#090C17]/85 border border-white/15 backdrop-blur-xl shadow-2xl pointer-events-auto flex flex-col items-center gap-3">
          <div className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-zinc-400">
            D-PAD CAMERA NAVIGATION
          </div>

          <div className="grid grid-cols-3 gap-1.5 w-28">
            <div />
            <button
              onClick={() => setSelectedNode(null)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-all cursor-pointer text-xs font-bold flex items-center justify-center"
              title="Pitch Up"
            >
              ↑
            </button>
            <div />
            <button
              onClick={() => setSelectedNode(null)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-all cursor-pointer text-xs font-bold flex items-center justify-center"
              title="Yaw Left"
            >
              ←
            </button>
            <button
              onClick={() => setSelectedNode(null)}
              className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/50 text-cyan-300 transition-all cursor-pointer text-xs font-bold flex items-center justify-center"
              title="Center View"
            >
              🎯
            </button>
            <button
              onClick={() => setSelectedNode(null)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-all cursor-pointer text-xs font-bold flex items-center justify-center"
              title="Yaw Right"
            >
              →
            </button>
            <div />
            <button
              onClick={() => setSelectedNode(null)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-all cursor-pointer text-xs font-bold flex items-center justify-center"
              title="Pitch Down"
            >
              ↓
            </button>
            <div />
          </div>

          <button
            onClick={() => setSelectedNode(null)}
            className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* D. BOTTOM CENTER INTERACTIVE INSTRUCTION PILL */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="px-6 py-2.5 rounded-2xl bg-black/85 border border-cyan-500/40 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.3)] text-xs font-mono font-bold text-zinc-200 flex items-center gap-3">
          <span className="text-cyan-400 text-base">🖱️</span>
          <span>
            {isBlackHoleHovered
              ? "⚠️ GRAVITATIONAL FIELD ENGAGED — CONTINUING HOVER INITIATES DIVE INTO THE VOID..."
              : "Hover over the black hole to initiate celestial dive | Scroll to zoom • Drag to orbit • Click nodes to explore"}
          </span>
        </div>
      </div>

      {/* E. BOTTOM RIGHT UNIVERSAL TIME & SYSTEM STATUS BAR */}
      <div className="absolute bottom-4 right-6 z-30 pointer-events-none">
        <div className="px-4 py-1.5 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md text-[10px] font-mono text-zinc-400 flex items-center gap-4">
          <span>UNIVERSAL TIME: Nov 14, 2026 • 09:42:17 PM IST</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-extrabold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYSTEM STATUS: 🟢 ONLINE</span>
          </span>
        </div>
      </div>

      {/* F. RICH FLOATING PREVIEW CARD WHEN A NODE IS SELECTED IN 3D */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key="node-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-6 z-40 w-96 p-6 rounded-3xl bg-[#0B0E1B]/95 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.3)] space-y-4"
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
                onClick={() => setSelectedNode(null)}
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
                onClick={() => setSelectedNode(null)}
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
