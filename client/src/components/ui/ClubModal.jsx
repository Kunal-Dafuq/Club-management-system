import { useState, useEffect } from "react";
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
  DollarSign,
  FileText,
  Lock,
  Plus,
  AlertTriangle,
  Receipt,
  CreditCard,
} from "lucide-react";
import GlowButton from "./GlowButton";
import RoleGovernanceBar from "./RoleGovernanceBar";
import { useOrgRole } from "../../hooks/useOrgRole";
import { getClubAuditData } from "../../constants/landingData";

/**
 * Interactive Club Modal overlay for OrgOS.
 * Features 4 distinct tabs: Overview, Event Audit Log, Budget & Expenditure Audit, and Governance & Roles.
 */
const ClubModal = ({ club, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "events" | "budget" | "governance"
  const [toastMessage, setToastMessage] = useState(null);
  const { canInitiateGovernedActions, role } = useOrgRole();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!club) return null;

  const auditData = getClubAuditData(club);

  const handleGovernedAction = (actionName) => {
    if (canInitiateGovernedActions) {
      setToastMessage({
        type: "success",
        text: `✅ AUTHORIZED (${role}): ${actionName} initiated for ${club.name}. Audit entry recorded.`,
      });
    } else {
      setToastMessage({
        type: "error",
        text: `🔒 GOVERNANCE RESTRICTION: Apart from Super-Admins and Admins, ONLY the Club President can initiate ${actionName}.`,
      });
    }
    setTimeout(() => setToastMessage(null), 4000);
  };

  const percentageSpent = Math.min(
    100,
    Math.round((auditData.expended / auditData.allotted) * 100)
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="
            relative w-full max-w-5xl max-h-[90vh] overflow-y-auto
            rounded-3xl border border-white/15 bg-zinc-950/95
            backdrop-blur-2xl shadow-[0_0_80px_rgba(6,182,212,0.25)]
            text-white custom-scrollbar
          "
        >
          {/* Top Banner Glow & Color Strip */}
          <div
            className="h-28 w-full relative overflow-hidden rounded-t-3xl border-b border-white/10"
            style={{
              background: `linear-gradient(135deg, ${club.color}33 0%, rgba(9,10,15,0.95) 100%)`,
            }}
          >
            <div
              className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[90px]"
              style={{ backgroundColor: club.color }}
            />
            
            <div className="absolute bottom-4 left-8 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/20 text-white">
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

            {/* Toast feedback banner */}
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-between ${
                  toastMessage.type === "success"
                    ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-300"
                    : "bg-red-950/50 border-red-500/50 text-red-300"
                }`}
              >
                <span>{toastMessage.text}</span>
                <button onClick={() => setToastMessage(null)} className="p-1 hover:opacity-75">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Navigation Tabs */}
            <div className="mt-6 flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "overview"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                    : "text-zinc-400 hover:text-white bg-white/5 border border-transparent"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "events"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                    : "text-zinc-400 hover:text-white bg-white/5 border border-transparent"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Event Audit Log ({auditData.eventAudits.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("budget")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "budget"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                    : "text-zinc-400 hover:text-white bg-white/5 border border-transparent"
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Budget & Expenditure Ledger</span>
              </button>
              <button
                onClick={() => setActiveTab("governance")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "governance"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                    : "text-zinc-400 hover:text-white bg-white/5 border border-transparent"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Governance & Role Check</span>
              </button>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="p-8 pt-4 space-y-6">
              <p className="text-zinc-300 leading-relaxed text-base">
                {club.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>
            </div>
          )}

          {/* TAB 2: EVENT AUDIT LOG */}
          {activeTab === "events" && (
            <div className="p-8 pt-4 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-cyan-950/20 border border-cyan-500/30 p-4 rounded-2xl">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    Complete Event Compliance & Audit Log
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Every scheduled event is verified for safety, budget compliance, and attendance biometrics.
                  </p>
                </div>

                <button
                  onClick={() => handleGovernedAction("New Event")}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    canInitiateGovernedActions
                      ? "bg-cyan-500 hover:bg-cyan-400 text-black"
                      : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>+ SCHEDULE NEW EVENT</span>
                  {!canInitiateGovernedActions && <Lock className="w-3.5 h-3.5 ml-1 text-amber-400" />}
                </button>
              </div>

              <div className="space-y-4">
                {auditData.eventAudits.map((evAudit) => (
                  <div
                    key={evAudit.id}
                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          {evAudit.id}
                        </span>
                        <h4 className="text-lg font-bold text-white">{evAudit.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {evAudit.complianceScore}
                        </span>
                        <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded">
                          {evAudit.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-400">
                      <div>
                        <span className="text-zinc-500 font-mono">DATE: </span>
                        <strong className="text-zinc-200">{evAudit.date}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-mono">VENUE: </span>
                        <strong className="text-zinc-200">{evAudit.venue}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-mono">ATTENDANCE: </span>
                        <strong className="text-cyan-400">{evAudit.attendance} Verified Attendees</strong>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-start gap-2 text-xs text-zinc-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-emerald-400 uppercase font-semibold">Audit Trail: </span>
                        <span>{evAudit.auditTrail}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BUDGET & EXPENDITURE AUDIT LEDGER */}
          {activeTab === "budget" && (
            <div className="p-8 pt-4 space-y-6">
              {/* 3 Summary Telemetry Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
                    ALLOTTED MONEY
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    ${auditData.allotted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[11px] text-zinc-400">Total Approved FY2026 Allocation</span>
                </div>

                <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30">
                  <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                    EXPENDED AMOUNT
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    ${auditData.expended.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[11px] text-zinc-400">{percentageSpent}% of total allotment spent</span>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                  <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                    REMAINING AMOUNT
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    ${auditData.remaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold">Available for Requisitions</span>
                </div>
              </div>

              {/* Allocation Progress Bar */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">FY2026 BUDGET EXPENDITURE PROGRESS</span>
                  <span className="text-cyan-400 font-bold">{percentageSpent}% EXPENDED</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-amber-500 to-emerald-500 rounded-full"
                    style={{ width: `${percentageSpent}%` }}
                  />
                </div>
              </div>

              {/* Requisition Action Bar */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-violet-950/20 border border-violet-500/30">
                <div>
                  <h4 className="text-sm font-bold text-white">Initiate New Budget Requisition</h4>
                  <p className="text-xs text-zinc-400">
                    Governance rule: Only Super-Admins, Admins, and Club Presidents can request budget or reimburse petty cash.
                  </p>
                </div>

                <button
                  onClick={() => handleGovernedAction("Budget Requisition")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    canInitiateGovernedActions
                      ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>+ NEW REQUISITION</span>
                  {!canInitiateGovernedActions && <Lock className="w-3.5 h-3.5 ml-1 text-amber-400" />}
                </button>
              </div>

              {/* Itemized Transaction Ledger (Smallest to Smallest Payment) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <Receipt className="w-4 h-4" />
                    Itemized Expenditure Audit (Smallest to Smallest Payment)
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    Showing all {auditData.transactions.length} verified invoices
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-[11px] font-mono uppercase text-zinc-400">
                        <th className="py-3 px-4">Invoice / Date</th>
                        <th className="py-3 px-4">Vendor & Description</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Approved By</th>
                        <th className="py-3 px-4 text-right">Amount (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-xs">
                      {auditData.transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-white/[0.04] transition-colors">
                          <td className="py-3.5 px-4 font-mono">
                            <div className="font-bold text-cyan-400">{tx.id}</div>
                            <div className="text-[11px] text-zinc-400">{tx.date}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{tx.vendor}</div>
                            <div className="text-zinc-400 text-[11px]">{tx.description}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 font-mono text-[11px]">
                              {tx.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-zinc-200">{tx.approver}</div>
                            <div className="text-[10px] font-mono text-emerald-400">{tx.method} • Verified</div>
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400 text-sm">
                            ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GOVERNANCE & ROLES */}
          {activeTab === "governance" && (
            <div className="p-8 pt-4 space-y-6">
              <RoleGovernanceBar />

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  Initiation Governance & Role Protocol
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  In accordance with IIIT-Delhi Student Council & OrgOS Policy: <strong className="text-white">apart from Super-Admins and Admins, ONLY the Club President</strong> is permitted to submit Budget Requisitions, schedule Official Campus Events, or assign Organization Tasks.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                        ACTION 01
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">Budget Requisition</h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Request institutional funds, reimburse petty cash, or allocate sponsorship money.
                      </p>
                    </div>

                    <button
                      onClick={() => handleGovernedAction("Budget Requisition")}
                      className={`mt-4 w-full py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        canInitiateGovernedActions
                          ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                      }`}
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>TEST REQUISITION</span>
                      {!canInitiateGovernedActions && <Lock className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
                        ACTION 02
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">Schedule Event</h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Book campus venues (OAT, Auditorium) and publish events to student calendars.
                      </p>
                    </div>

                    <button
                      onClick={() => handleGovernedAction("Schedule Event")}
                      className={`mt-4 w-full py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        canInitiateGovernedActions
                          ? "bg-cyan-500 hover:bg-cyan-400 text-black"
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>TEST EVENT</span>
                      {!canInitiateGovernedActions && <Lock className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-violet-400 font-bold">
                        ACTION 03
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">Assign Task</h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Create Kanban board tasks and assign responsibilities to club coordinators.
                      </p>
                    </div>

                    <button
                      onClick={() => handleGovernedAction("Assign Task")}
                      className={`mt-4 w-full py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        canInitiateGovernedActions
                          ? "bg-violet-500 hover:bg-violet-400 text-white"
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>TEST TASK</span>
                      {!canInitiateGovernedActions && <Lock className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <span>IIITD Student Council • ClubPlanet Enterprise OrgOS</span>
            <span className="text-emerald-400 font-mono">ALL AUDIT LOGS SYNCHRONIZED</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClubModal;
