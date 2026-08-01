import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Calendar,
  Shield,
  Activity,
  ChevronRight,
} from "lucide-react";

import Scene from "../3d/Scene";
import GlassCard from "../ui/GlassCard";
import GlowButton from "../ui/GlowButton";
import ClubModal from "../ui/ClubModal";
import ClubGallery from "../ui/ClubGallery";
import WaitlistForm from "../ui/WaitlistForm";
import { CLUBS_DATA, getMostActiveClubs } from "../../constants/landingData";

gsap.registerPlugin(ScrollTrigger);

// Core Priority Services / MVP Features
const PRIORITY_SERVICES = [
  {
    id: "announcements",
    title: "Centralized Broadcasts",
    subtitle:
      "Replace noisy WhatsApp groups with verified official announcements, instant push notifications, and categorized campus feeds.",
    icon: Sparkles,
    color: "#06B6D4",
    stat: "100% Delivery",
    href: "/dashboard",
    ctaLabel: "Launch Broadcast Feed",
  },
  {
    id: "events",
    title: "Event & Ticket Management",
    subtitle:
      "Automated RSVPs, QR code check-ins, live budget approvals, and instant certificate distribution for fests and workshops.",
    icon: Calendar,
    color: "#7C3AED",
    stat: "Zero Check-in Wait",
    href: "/events",
    ctaLabel: "Open Events & Tickets",
  },
  {
    id: "governance",
    title: "Committee Governance",
    subtitle:
      "Role-based access controls for student leaders, faculty advisors, and coordinators with smart task delegation.",
    icon: Shield,
    color: "#EC4899",
    stat: "3x Faster Approval",
    href: "/settings",
    ctaLabel: "Open Governance Suite",
  },
  {
    id: "analytics",
    title: "Smart Member Analytics",
    subtitle:
      "Real-time participation tracking, active membership rosters, and automated engagement scoring across campus.",
    icon: Activity,
    color: "#10B981",
    stat: "Live Roster Sync",
    href: "/clubs",
    ctaLabel: "Explore Roster Analytics",
  },
];

/**
 * Realistic Cinematic 5-Section Landing Page for ClubPlanet OrgOS.
 * Synchronizes scroll with an authentic 3D journey:
 * 1. Realistic Solar System with incandescent Sun and Exoplanet
 * 2. Diving through volumetric stratospheric cloud layers
 * 3. Approaching the Grand Architectural University Main Entrance Gates
 * 4. Stepping inside the actual architectural Club Office interior room
 * 5. Onboarding Waitlist
 */
const LandingPage = () => {
  const containerRef = useRef(null);
  const lastProgressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [selectedClub, setSelectedClub] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.fps(60);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const rounded = Math.round(self.progress * 400) / 400;
        if (Math.abs(rounded - lastProgressRef.current) >= 0.0025) {
          lastProgressRef.current = rounded;
          setProgress(rounded);
        }
      },
    });

    return () => {
      trigger.kill();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#06080F] text-white selection:bg-cyan-500/30 selection:text-white"
    >
      {/* 1. Fixed Interactive Realistic 3D Universe Background */}
      <Scene
        progress={progress}
        onSelectClub={(club) => setSelectedClub(club)}
        isMobile={isMobile}
      />

      {/* =========================================================
          SECTION 1: HERO (00 - 0.20) — SOLAR SYSTEM & EXOPLANET
      ========================================================= */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 z-10"
      >
        <div className="max-w-5xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl text-xs sm:text-sm font-semibold tracking-wide text-cyan-400 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>CLUBPLANET ORGOS // SOLAR SYSTEM APPROACH</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
          >
            The Operating System for{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
              College Organizations
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed"
          >
            Travel from our solar system into a living college ecosystem. One intelligent platform unifying student memberships, events, committee workflows, and campus collaboration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href="/campus-portal"
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:scale-105 text-white font-bold text-sm shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all flex items-center gap-2.5 border border-cyan-400/40"
            >
              <Sparkles className="w-5 h-5 text-cyan-300" />
              <span>Enter Campus Portal</span>
            </a>

            <GlowButton
              size="lg"
              variant="primary"
              onClick={() => scrollToSection("mvps")}
            >
              Dive Through Atmosphere
              <ArrowRight className="w-5 h-5" />
            </GlowButton>

            <GlowButton
              size="lg"
              variant="secondary"
              onClick={() => scrollToSection("activities")}
            >
              Visit Campus Main Gates
            </GlowButton>
          </motion.div>
        </div>

        {/* Scroll Prompt */}
        <div
          onClick={() => scrollToSection("mvps")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer animate-bounce"
        >
          <span>DIVE INTO STRATOSPHERE</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* =========================================================
          SECTION 2: DIVE THROUGH CLOUDS -> PRIORITY MVPS (0.20 - 0.45)
      ========================================================= */}
      <section
        id="mvps"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 z-10"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              01 // ATMOSPHERIC DIVE & PRIORITY MVPS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
              Everything Your Club Needs to Operate at Peak Velocity
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg">
              As we pierce through the stratosphere clouds, replace fragmented WhatsApp groups, spreadsheets, and Google Forms with 4 mission-critical modules.
            </p>
          </div>

          {/* 2x2 Grid of Priority MVP Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRIORITY_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <GlassCard
                  key={service.id}
                  hoverEffect={true}
                  glowColor={`${service.color}30`}
                  onClick={() => {
                    window.location.href = service.href;
                  }}
                  className="p-8 flex flex-col justify-between h-full cursor-pointer group transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                        style={{
                          backgroundColor: `${service.color}20`,
                          borderColor: `${service.color}50`,
                          color: service.color,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                        style={{
                          backgroundColor: `${service.color}22`,
                          color: service.color,
                        }}
                      >
                        {service.stat}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-base text-zinc-300 leading-relaxed">
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold">● MODULE: ACTIVE</span>
                    <a
                      href={service.href}
                      className="text-cyan-400 group-hover:text-cyan-300 font-bold flex items-center gap-1.5 transition-all"
                    >
                      <span>{service.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: MAIN GATES -> BEST CLUB ACTIVITIES (0.45 - 0.70)
      ========================================================= */}
      <section
        id="activities"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 z-10"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
              02 // MOST ACTIVE ORGANIZATIONS // 2-MONTH ROLLING INDEX
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
              Top 6 Most Active Campus Clubs
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg">
              Activeness criteria automatically ranked and updated from a 2-month rolling window of event frequency and student participation across IIIT-Delhi.
            </p>
          </div>

          {/* 3-Column Grid of Top Clubs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getMostActiveClubs(CLUBS_DATA, 6).map((club, index) => (
              <GlassCard
                key={club.id}
                hoverEffect={true}
                glowColor={`${club.color}30`}
                onClick={() => setSelectedClub(club)}
                className="flex flex-col justify-between cursor-pointer group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5"
                      style={{
                        backgroundColor: `${club.color}22`,
                        color: club.color,
                        border: `1px solid ${club.color}40`,
                      }}
                    >
                      <span>#{index + 1} ACTIVE</span>
                      <span>•</span>
                      <span>{club.category}</span>
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      🔥 2M INDEX
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {club.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-300 line-clamp-2 leading-relaxed">
                    {club.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <span className="text-cyan-400 font-bold">{club.eventsCount2Months || 10} Events</span>
                      <span>(last 2m)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-violet-400 font-bold">{(club.totalParticipation || 1400).toLocaleString()}</span>
                      <span>Participation</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <span>Enter Club Terminal</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: THE CLUB OFFICE INTERIOR -> GALLERY (0.70 - 0.90)
      ========================================================= */}
      <section
        id="gallery"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 z-10"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              03 // THE CLUB OFFICE HEADQUARTERS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
              Inside Student Leadership & Event Gallery
            </h2>
            <p className="mt-3 text-zinc-400 text-base sm:text-lg">
              Step through the glass doors into an actual architectural Club Office. Explore real-time fests, hackathons, and cultural celebrations.
            </p>
          </div>

          {/* Interactive Campus Life Event Gallery */}
          <ClubGallery />
        </div>
      </section>

      {/* =========================================================
          SECTION 5: JOIN THE ORBIT WAITLIST (0.90 - 1.00)
      ========================================================= */}
      <section
        id="waitlist"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-28 z-10"
      >
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              04 // JOIN THE ORBIT
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold mt-2 tracking-tight">
              Ready to Launch Your Campus Into OrgOS?
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg">
              Reserve your university workspace and experience the future of student organization management.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </section>

      {/* Interactive Full-Screen Club Detail Modal */}
      <ClubModal
        club={selectedClub}
        onClose={() => setSelectedClub(null)}
      />
    </div>
  );
};

export default LandingPage;
