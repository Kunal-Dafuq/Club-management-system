import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Activity,
  Zap,
  CreditCard,
  CheckCircle2,
  Award,
  Columns,
  DollarSign,
  Users,
  Calendar,
  Send,
  TrendingUp,
  ShieldCheck,
  BarChart,
  FileCheck,
  FileText,
  Share2,
  Cpu,
  User,
  ShieldAlert,
  GraduationCap,
} from "lucide-react";
import { ROLE_COMMANDS } from "../../constants/landingData";
import GlassCard from "./GlassCard";

const ICON_MAP = {
  Compass,
  Activity,
  Zap,
  CreditCard,
  CheckCircle2,
  Award,
  Columns,
  DollarSign,
  Users,
  Calendar,
  Send,
  TrendingUp,
  ShieldCheck,
  BarChart,
  FileCheck,
  FileText,
  Share2,
  Cpu,
};

const ROLE_ICONS = {
  student: GraduationCap,
  coordinator: User,
  faculty: ShieldAlert,
};

/**
 * RoleSelector Component for Scene 7.
 * Interactive holographic command center allowing instantaneous
 * role switching between Student, Coordinator, and Faculty/Admin.
 */
const RoleSelector = () => {
  const [activeRole, setActiveRole] = useState("student");
  const currentCommand = ROLE_COMMANDS[activeRole];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Role Switcher Floating Portals */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12">
        {Object.entries(ROLE_COMMANDS).map(([key, roleData]) => {
          const IconComponent = ROLE_ICONS[key] || User;
          const isActive = activeRole === key;

          return (
            <motion.button
              key={key}
              onClick={() => setActiveRole(key)}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative px-6 py-4 rounded-2xl border transition-all duration-300
                flex items-center gap-3 cursor-pointer
                ${
                  isActive
                    ? "bg-white/10 border-cyan-400 text-white shadow-[0_0_30px_rgba(6,182,212,0.35)]"
                    : "bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
                }
              `}
            >
              <div
                className={`p-2 rounded-xl border ${
                  isActive
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                    : "bg-white/5 border-white/10 text-zinc-400"
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              <div className="text-left">
                <div className="text-sm font-bold tracking-wide capitalize">
                  {key === "faculty" ? "Faculty / Admin" : key}
                </div>
                <div className="text-xs text-zinc-400">
                  {key === "student" && "Campus Portal"}
                  {key === "coordinator" && "Club OS Workspace"}
                  {key === "faculty" && "Governance Dashboard"}
                </div>
              </div>

              {isActive && (
                <motion.div
                  layoutId="activeRoleIndicator"
                  className="absolute -bottom-px left-6 right-6 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Role Title & Description */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              {currentCommand.title}
            </h3>
            <p className="mt-2 text-zinc-400 text-base sm:text-lg">
              {currentCommand.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Holographic Feature Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentCommand.features.map((feature, idx) => {
            const IconComp = ICON_MAP[feature.icon] || Activity;

            return (
              <GlassCard
                key={feature.id}
                hoverEffect={true}
                glowColor={`${currentCommand.color}25`}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3 rounded-2xl border border-white/10"
                      style={{
                        backgroundColor: `${currentCommand.color}1A`,
                        color: currentCommand.color,
                      }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-zinc-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Live Feature
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
              </GlassCard>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RoleSelector;
