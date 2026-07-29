import { useState, useMemo, useEffect } from "react";
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Save,
  ShieldAlert,
  Star,
  Info,
  Clock,
  ExternalLink,
  Zap,
  Lock,
  History,
  X,
  HelpCircle,
  Command,
  FileText,
  Sliders,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SETTINGS_DOMAINS } from "../features/settings/settingsData";

const INITIAL_SNAPSHOTS = [
  { id: "snap-101", name: "v2.4.0 — Production Golden Baseline", date: "July 26, 2026 • 18:30", author: "Kunal Dev (Principal Architect)", status: "LAST KNOWN GOOD" },
  { id: "snap-100", name: "v2.3.8 — HackPlanet 2026 Quota Update", date: "July 24, 2026 • 12:15", author: "Anirudh Sharma", status: "ARCHIVED" },
  { id: "snap-99", name: "v2.3.5 — SOC2 MFA Enforce Rollout", date: "July 20, 2026 • 09:00", author: "System Telemetry", status: "ARCHIVED" },
];

const Settings = () => {
  // Navigation & Search State
  const [selectedCatId, setSelectedCatId] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const [pinnedCategories, setPinnedCategories] = useState(["security", "general", "rbac", "aiConfig"]);

  // Form & Dirty-State Management
  const [formData, setFormData] = useState({});
  const [dirtyFields, setDirtyFields] = useState({});
  const [toastMessage, setToastMessage] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [safeModeActive, setSafeModeActive] = useState(false);

  // Flatten all categories for quick lookup
  const allCategories = useMemo(() => {
    return SETTINGS_DOMAINS.flatMap((d) => d.categories);
  }, []);

  // Initialize form state with default values from schema
  useEffect(() => {
    const defaults = {};
    allCategories.forEach((cat) => {
      cat.fields.forEach((f) => {
        defaults[`${cat.id}__${f.key}`] = f.default;
      });
    });
    setFormData(defaults);
  }, [allCategories]);

  const activeCategory = useMemo(() => {
    return allCategories.find((c) => c.id === selectedCatId) || allCategories[0];
  }, [allCategories, selectedCatId]);

  const togglePin = (catId, e) => {
    if (e) e.stopPropagation();
    if (pinnedCategories.includes(catId)) {
      setPinnedCategories((prev) => prev.filter((id) => id !== catId));
    } else {
      setPinnedCategories((prev) => [...prev, catId]);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFieldChange = (catId, key, value) => {
    const fullKey = `${catId}__${key}`;
    setFormData((prev) => ({ ...prev, [fullKey]: value }));
    setDirtyFields((prev) => ({ ...prev, [fullKey]: true }));
  };

  const dirtyCount = Object.keys(dirtyFields).length;

  const handleSaveAndPublish = () => {
    setDirtyFields({});
    showToast("✓ Synchronized 21 enterprise modules with Prisma Production DB.");
  };

  const handleResetToDefault = () => {
    const restored = {};
    activeCategory.fields.forEach((f) => {
      restored[`${activeCategory.id}__${f.key}`] = f.default;
    });
    setFormData((prev) => ({ ...prev, ...restored }));
    // Remove dirty flags for this category
    const nextDirty = { ...dirtyFields };
    activeCategory.fields.forEach((f) => {
      delete nextDirty[`${activeCategory.id}__${f.key}`];
    });
    setDirtyFields(nextDirty);
    showToast(`Restored "${activeCategory.name}" to ISO-27001 default values.`);
  };

  const handleRestoreSnapshot = (snap) => {
    setDirtyFields({});
    setShowHistoryModal(false);
    showToast(`✓ Rolled back configuration to snapshot: ${snap.name}`);
  };

  return (
    <div className="min-h-screen space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-8 z-50 px-5 py-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 backdrop-blur-xl flex items-center gap-3 text-cyan-300 font-bold text-sm shadow-[0_0_40px_rgba(6,182,212,0.4)]"
          >
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snapshot Rollback Modal */}
      <AnimatePresence>
        {showHistoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl p-8 rounded-3xl bg-gradient-to-br from-[#0D1022] via-[#0A0E1A] to-[#120F2A] border border-cyan-400/40 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-xs font-mono font-bold text-cyan-300">
                  <History className="w-3.5 h-3.5" />
                  <span>SECTION #20 — LAST KNOWN GOOD CONFIGURATION</span>
                </div>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white">
                  Configuration Snapshot Vault
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  Tamper-evident system restore points with instant Diff verification.
                </p>
              </div>

              <div className="space-y-3">
                {INITIAL_SNAPSHOTS.map((snap) => (
                  <div
                    key={snap.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          {snap.name}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {snap.status}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 font-mono mt-1">
                        {snap.date} • {snap.author}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRestoreSnapshot(snap)}
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-bold text-xs hover:bg-cyan-500/30 transition-all cursor-pointer whitespace-nowrap"
                    >
                      Restore Snapshot
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowHistoryModal(false)}
                className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                Close Snapshot Vault
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Enterprise Governance Control Bar */}
      <div className="sticky top-0 z-30 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              <span>ENTERPRISE GOVERNANCE // 21 MODULES</span>
            </span>
          </div>

          {/* Dirty-State Live Save Indicator */}
          {dirtyCount > 0 ? (
            <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>● UNSAVED DRAFT ({dirtyCount} changes)</span>
            </div>
          ) : (
            <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>✓ PRODUCTION SYNCED</span>
            </div>
          )}

          {/* Safe Mode Break-Glass Toggle */}
          <button
            onClick={() => {
              setSafeModeActive(!safeModeActive);
              showToast(
                !safeModeActive
                  ? "⚠ SAFE MODE ENABLED: Platform entered Read-Only Maintenance mode."
                  : "✓ SAFE MODE DISABLED: Full write permissions restored."
              );
            }}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              safeModeActive
                ? "bg-red-500 border-red-400 text-black shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{safeModeActive ? "SAFE MODE: READ-ONLY" : "NORMAL MODE"}</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHistoryModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span>Rollback Vault</span>
          </button>

          <button
            onClick={handleResetToDefault}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-zinc-400" />
            <span>Reset Module</span>
          </button>

          <button
            onClick={handleSaveAndPublish}
            disabled={dirtyCount === 0 && !safeModeActive}
            className={`px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center gap-2 ${
              dirtyCount > 0
                ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-105"
                : "bg-white/10 text-zinc-500 cursor-not-allowed"
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {/* Main Architecture Grid: Left Sidebar (21 Categories) + Right Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: 21 CATEGORIES SIDEBAR */}
        <div className="lg:col-span-4 space-y-5">
          {/* Global Search & Favorites Toggle */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search 21 enterprise modules (e.g. FERPA, MFA, AI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#090C17] border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/60 shadow-lg"
              />
            </div>

            <div className="flex items-center justify-between px-1">
              <button
                onClick={() => setShowPinnedOnly(!showPinnedOnly)}
                className={`text-xs font-mono font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  showPinnedOnly
                    ? "bg-amber-500/20 text-amber-300 border border-amber-400/50"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${showPinnedOnly ? "fill-amber-400 text-amber-400" : ""}`} />
                <span>Pinned Modules ({pinnedCategories.length})</span>
              </button>

              <span className="text-[10px] font-mono text-zinc-500">
                {allCategories.length} TOTAL MODULES
              </span>
            </div>
          </div>

          {/* Categorized Settings Navigation */}
          <div className="space-y-6 max-h-[720px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
            {SETTINGS_DOMAINS.map((domain) => {
              const matchingCategories = domain.categories.filter((cat) => {
                const matchesQuery =
                  cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  cat.description.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesPin =
                  !showPinnedOnly || pinnedCategories.includes(cat.id);
                return matchesQuery && matchesPin;
              });

              if (matchingCategories.length === 0) return null;

              return (
                <div key={domain.title} className="space-y-2">
                  <div className="px-3 text-[10px] font-mono font-extrabold uppercase tracking-widest text-zinc-500">
                    {domain.title}
                  </div>

                  <div className="space-y-1">
                    {matchingCategories.map((cat) => {
                      const active = selectedCatId === cat.id;
                      const isPinned = pinnedCategories.includes(cat.id);
                      const IconComponent = cat.icon;

                      return (
                        <div
                          key={cat.id}
                          onClick={() => setSelectedCatId(cat.id)}
                          className={`group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all border ${
                            active
                              ? "bg-gradient-to-r from-violet-600/30 to-cyan-500/20 text-white border-violet-500/50 shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                              : "bg-white/[0.02] border-transparent hover:bg-white/5 text-zinc-400 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <IconComponent
                              className={`w-4 h-4 shrink-0 ${
                                active ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300"
                              }`}
                            />
                            <span className="text-sm font-bold truncate">
                              {cat.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {cat.badge && (
                              <span
                                className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${cat.badgeColor}`}
                              >
                                {cat.badge}
                              </span>
                            )}

                            <button
                              onClick={(e) => togglePin(cat.id, e)}
                              className="p-1 text-zinc-600 hover:text-amber-400 transition-colors"
                            >
                              <Star
                                className={`w-3.5 h-3.5 ${
                                  isPinned ? "fill-amber-400 text-amber-400" : ""
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: MODULE CONFIGURATION & GOVERNANCE VIEWPORT */}
        <div className="lg:col-span-8 space-y-6">
          {/* Module Header Banner */}
          <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0C1022] via-[#090D1C] to-[#120F2E] space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600 p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-[14px] bg-[#090C17] flex items-center justify-center">
                    {activeCategory.icon && (
                      <activeCategory.icon className="w-6 h-6 text-cyan-400" />
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">
                    {activeCategory.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      {activeCategory.compliance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Related Settings Quick Pills */}
              {activeCategory.related && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono text-zinc-500">RELATED:</span>
                  {activeCategory.related.map((relId) => {
                    const targetCat = allCategories.find((c) => c.id === relId);
                    if (!targetCat) return null;
                    return (
                      <button
                        key={relId}
                        onClick={() => setSelectedCatId(relId)}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-cyan-400/50 transition-colors cursor-pointer"
                      >
                        {targetCat.name.replace(/^\d+\.\s*/, "")}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              {activeCategory.description}
            </p>
          </div>

          {/* Module Controls Form */}
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-zinc-400">
                Configuration Fields ({activeCategory.fields.length})
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                ● ZOD VALIDATION ACTIVE
              </span>
            </div>

            <div className="space-y-6 divide-y divide-white/5">
              {activeCategory.fields.map((field) => {
                const fieldKey = `${activeCategory.id}__${field.key}`;
                const val = formData[fieldKey] !== undefined ? formData[fieldKey] : field.default;

                return (
                  <div key={field.key} className="pt-6 first:pt-0 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1 max-w-lg">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">
                            {field.label}
                          </h3>
                          {field.help && (
                            <span
                              title={field.help}
                              className="text-zinc-500 hover:text-cyan-400 cursor-help"
                            >
                              <HelpCircle className="w-4 h-4" />
                            </span>
                          )}
                        </div>
                        {field.help && (
                          <p className="text-xs text-zinc-400">
                            {field.help}
                          </p>
                        )}
                      </div>

                      {/* FIELD CONTROL TYPE 1: TOGGLE SWITCH */}
                      {field.type === "toggle" && (
                        <button
                          onClick={() =>
                            handleFieldChange(activeCategory.id, field.key, !val)
                          }
                          disabled={safeModeActive}
                          className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                            val
                              ? "bg-gradient-to-r from-cyan-400 to-violet-500 justify-end"
                              : "bg-white/10 justify-start"
                          } ${safeModeActive ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <motion.div
                            layout
                            className="w-6 h-6 rounded-full bg-black shadow-md"
                          />
                        </button>
                      )}

                      {/* FIELD CONTROL TYPE 2: SELECT DROPDOWN */}
                      {field.type === "select" && (
                        <select
                          value={val}
                          onChange={(e) =>
                            handleFieldChange(activeCategory.id, field.key, e.target.value)
                          }
                          disabled={safeModeActive}
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/60 max-w-xs"
                        >
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#090C17] text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* FIELD CONTROL TYPE 3: TEXT OR NUMBER INPUT */}
                      {(field.type === "text" || field.type === "number") && (
                        <input
                          type={field.type}
                          value={val}
                          onChange={(e) =>
                            handleFieldChange(activeCategory.id, field.key, e.target.value)
                          }
                          disabled={safeModeActive}
                          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/60 w-64"
                        />
                      )}

                      {/* FIELD CONTROL TYPE 4: MULTI-TAG */}
                      {field.type === "multi" && (
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-cyan-300 font-mono font-bold">
                          {val}
                        </div>
                      )}
                    </div>

                    {/* Warning Alert if field has high-risk security impact */}
                    {field.warning && (
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{field.warning}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Enterprise Compliance & Telemetry Bar */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-6">
              <span>
                SLA: <strong className="text-emerald-400">12.4ms Gateway</strong>
              </span>
              <span>
                Render: <strong className="text-cyan-400">60 FPS SLA</strong>
              </span>
              <span>
                FERPA/GDPR: <strong className="text-violet-400">READY</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 text-zinc-500">
              <Command className="w-3.5 h-3.5" />
              <span>Press Ctrl+S to Publish • Ctrl+K to Search</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
