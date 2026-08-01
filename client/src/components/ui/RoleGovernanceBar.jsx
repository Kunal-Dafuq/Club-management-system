import React from "react";
import { ShieldCheck, Lock, AlertTriangle, ChevronDown } from "lucide-react";
import { useOrgRole, ORG_ROLES } from "../../hooks/useOrgRole";

/**
 * Enterprise Governance & Role Selector Bar.
 * Makes permissions visible and testable across the UI.
 */
const RoleGovernanceBar = ({ compact = false, className = "" }) => {
  const { role, changeRole, canInitiateGovernedActions } = useOrgRole();
  const activeRoleObj = ORG_ROLES.find((r) => r.id === role) || ORG_ROLES[2];

  return (
    <div
      className={`w-full rounded-2xl border ${
        canInitiateGovernedActions
          ? "border-emerald-500/30 bg-emerald-950/20"
          : "border-amber-500/30 bg-amber-950/20"
      } backdrop-blur-md p-3 sm:p-4 transition-all ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {canInitiateGovernedActions ? (
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                GOVERNANCE MANDATE
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  canInitiateGovernedActions
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                }`}
              >
                {canInitiateGovernedActions
                  ? "✅ AUTHORIZED TO INITIATE"
                  : "🔒 RESTRICTED (READ-ONLY)"}
              </span>
            </div>
            {!compact && (
              <p className="text-xs text-zinc-400 mt-0.5">
                Apart from Super-Admins and Admins, <strong className="text-zinc-200">ONLY Club Presidents</strong> can initiate Budget Requisitions, Events, and Tasks.
              </p>
            )}
          </div>
        </div>

        {/* Role Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-[10px] font-mono uppercase text-zinc-500 mr-1 shrink-0">
            TEST ROLE:
          </span>
          {ORG_ROLES.map((r) => {
            const isSelected = r.id === role;
            return (
              <button
                key={r.id}
                onClick={() => changeRole(r.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1 shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                    : "bg-white/5 hover:bg-white/10 text-zinc-400 border border-white/10"
                }`}
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleGovernanceBar;
