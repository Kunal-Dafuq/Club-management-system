import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X, CornerDownLeft, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AutoCompleteSearch — Self-fillable interactive search bar with:
 * 1) Alphabetically ordered result dropdowns matching prefix first
 * 2) Closest-match inline ghost text autocompletion (e.g., type "A" -> autocompletes "ABACUS")
 * 3) Keyboard navigation (TAB / RIGHT ARROW / ENTER to fill and select)
 */
export default function AutoCompleteSearch({
  items = [],
  placeholder = "Search...",
  value = "",
  onChange,
  onSelect,
  className = "",
  autoFocus = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Normalize items to { id, label, category, link, raw }
  const normalizedItems = useMemo(() => {
    return items.map((item, idx) => {
      if (typeof item === "string") {
        return { id: `item-${idx}`, label: item, category: "Result", raw: item };
      }
      return {
        id: item.id || `item-${idx}`,
        label: item.label || item.name || item.title || "",
        category: item.category || item.type || "ClubPlanet",
        link: item.link || null,
        raw: item,
      };
    });
  }, [items]);

  // Filter and alphabetically sort results: prefix matches first, then substring matches
  const filteredItems = useMemo(() => {
    if (!value || !value.trim()) return [];

    const query = value.trim().toLowerCase();

    const prefixMatches = [];
    const otherMatches = [];

    normalizedItems.forEach((item) => {
      const lowerLabel = item.label.toLowerCase();
      if (lowerLabel.startsWith(query)) {
        prefixMatches.push(item);
      } else if (lowerLabel.includes(query)) {
        otherMatches.push(item);
      }
    });

    // Sort alphabetically within each bucket
    prefixMatches.sort((a, b) => a.label.localeCompare(b.label));
    otherMatches.sort((a, b) => a.label.localeCompare(b.label));

    return [...prefixMatches, ...otherMatches];
  }, [normalizedItems, value]);

  // Closest result for inline auto-completion ghost text
  const closestMatch = useMemo(() => {
    if (!value || !value.trim() || filteredItems.length === 0) return null;
    const first = filteredItems[0];
    const query = value.trim().toLowerCase();
    if (first.label.toLowerCase().startsWith(query)) {
      return first.label;
    }
    return null;
  }, [filteredItems, value]);

  // Suffix text for ghost inline completion
  const completionSuffix = useMemo(() => {
    if (!closestMatch || !value) return "";
    if (closestMatch.toLowerCase().startsWith(value.toLowerCase())) {
      return closestMatch.slice(value.length);
    }
    return "";
  }, [closestMatch, value]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [value]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (item) => {
    if (onChange) {
      onChange(item.label);
    }
    setIsOpen(false);
    if (onSelect) {
      onSelect(item.raw || item);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab" || e.key === "ArrowRight") {
      if (completionSuffix && closestMatch) {
        e.preventDefault();
        if (onChange) onChange(closestMatch);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        setSelectedIndex(
          (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems.length > 0 && isOpen) {
        handleSelect(filteredItems[selectedIndex]);
      } else if (closestMatch) {
        if (onChange) onChange(closestMatch);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Input box with inline ghost autocompletion overlay */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none z-10" />

        {/* Ghost Completion Text Box overlay */}
        {completionSuffix && isOpen && (
          <div className="absolute inset-0 pl-10 pr-9 py-2.5 flex items-center text-sm font-medium pointer-events-none overflow-hidden whitespace-nowrap">
            <span className="opacity-0">{value}</span>
            <span className="text-zinc-500 font-mono tracking-tight bg-white/5 px-1 rounded ml-0.5">
              {completionSuffix}
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (value && value.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-black/60 border border-white/10 hover:border-white/20 focus:border-cyan-400/60 text-white text-sm placeholder:text-zinc-500 focus:outline-none transition-all shadow-inner"
        />

        {value && (
          <button
            type="button"
            onClick={() => {
              if (onChange) onChange("");
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors z-10 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* AutoComplete Dropdown List */}
      <AnimatePresence>
        {isOpen && filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mt-2 py-2 bg-[#0A0D18]/95 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl overflow-hidden z-50 max-h-72 overflow-y-auto divide-y divide-white/5"
          >
            {/* Header hint */}
            <div className="px-3 py-1.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Self-Fill Matching Results</span>
              </span>
              <span>TAB / → to Auto-type</span>
            </div>

            {filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => handleSelect(item)}
                  className={`px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-cyan-500/20 text-white"
                      : "text-zinc-300 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-sm font-semibold truncate">
                      {item.label}
                    </span>
                    {item.category && (
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                          isSelected
                            ? "border-cyan-400/50 bg-cyan-500/20 text-cyan-200"
                            : "border-white/10 bg-white/5 text-zinc-400"
                        }`}
                      >
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 shrink-0">
                    {isSelected && (
                      <span className="flex items-center gap-1 text-cyan-300 font-mono text-[11px]">
                        <span>Select</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
