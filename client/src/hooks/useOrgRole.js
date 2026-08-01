import { useState, useEffect } from "react";

export const ORG_ROLES = [
  { id: "SUPER_ADMIN", label: "Super-Admin", icon: "👑", desc: "Full infrastructure & OrgOS governance power" },
  { id: "ADMIN", label: "Admin", icon: "🛡️", desc: "Campus-wide moderation, audits & approval rights" },
  { id: "CLUB_PRESIDENT", label: "Club President", icon: "🎖️", desc: "Can initiate Budget Requests, Events & Tasks for club" },
  { id: "CLUB_MEMBER", label: "Club Member", icon: "👤", desc: "Read-only: Cannot initiate Budgets, Events, or Tasks" },
  { id: "STUDENT_VIEWER", label: "Student Viewer", icon: "👁️", desc: "Read-only: Public visitor access" }
];

/**
 * Custom hook to manage active user role and enforce governance rule:
 * Apart from Super-Admins and Admins, only Club President can make budget requests, events, and tasks.
 */
export function useOrgRole() {
  const [role, setRole] = useState(() => {
    return localStorage.getItem("orgos_active_role") || "CLUB_PRESIDENT";
  });

  const changeRole = (newRole) => {
    localStorage.setItem("orgos_active_role", newRole);
    setRole(newRole);
    window.dispatchEvent(new CustomEvent("orgos_role_change", { detail: newRole }));
  };

  useEffect(() => {
    const handleRoleChange = () => {
      setRole(localStorage.getItem("orgos_active_role") || "CLUB_PRESIDENT");
    };
    window.addEventListener("orgos_role_change", handleRoleChange);
    return () => window.removeEventListener("orgos_role_change", handleRoleChange);
  }, []);

  // Governance Rule: Apart from Super-Admins and Admins, ONLY Club President can initiate Budget Requests, Events, Tasks
  const canInitiateGovernedActions = ["SUPER_ADMIN", "ADMIN", "CLUB_PRESIDENT"].includes(role);

  return { role, changeRole, canInitiateGovernedActions };
}
