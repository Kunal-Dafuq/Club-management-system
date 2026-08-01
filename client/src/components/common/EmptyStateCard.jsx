import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Calendar,
  MessageSquare,
  CheckSquare,
  Mic,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function EmptyStateCard({
  type = "default",
  title,
  description,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
}) {
  const PRESETS = {
    clubs: {
      icon: Compass,
      defaultTitle: "No clubs found.",
      defaultDesc: "We couldn't find any IIIT-Delhi student clubs matching your current search or filters.",
      defaultPrimary: "Explore Clubs",
      defaultSecondary: "Create Club",
    },
    events: {
      icon: Calendar,
      defaultTitle: "No upcoming events.",
      defaultDesc: "There are no scheduled flagship events or workshops for the selected timeframe.",
      defaultPrimary: "Create Event",
      defaultSecondary: "Browse Calendar",
    },
    chat: {
      icon: MessageSquare,
      defaultTitle: "No messages yet.",
      defaultDesc: "This committee channel is quiet. Break the ice by sharing an update or document!",
      defaultPrimary: "Start the conversation",
    },
    tasks: {
      icon: CheckSquare,
      defaultTitle: "No tasks assigned.",
      defaultDesc: "Your Kanban board is clear! Create a new committee requisition or engineering task.",
      defaultPrimary: "Create Task",
    },
    meetings: {
      icon: Mic,
      defaultTitle: "No meetings uploaded.",
      defaultDesc: "Upload an audio recording to generate Whisper AI transcripts and Qwen executive summaries.",
      defaultPrimary: "Upload Recording",
      defaultSecondary: "Record Meeting",
    },
    default: {
      icon: Compass,
      defaultTitle: "Nothing to display",
      defaultDesc: "No items match your query.",
      defaultPrimary: "Reset Filters",
    },
  };

  const preset = PRESETS[type] || PRESETS.default;
  const IconComponent = preset.icon;
  const heading = title || preset.defaultTitle;
  const subtext = description || preset.defaultDesc;
  const primaryBtn = primaryActionLabel || preset.defaultPrimary;
  const secondaryBtn = secondaryActionLabel || preset.defaultSecondary;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl border border-white/10 bg-[#080B14]/80 backdrop-blur-xl p-12 text-center space-y-4 max-w-lg mx-auto shadow-2xl my-8"
    >
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
        <IconComponent className="w-8 h-8 animate-pulse" />
      </div>

      <h3 className="text-xl font-extrabold text-white">{heading}</h3>
      <p className="text-sm text-zinc-400 max-w-sm mx-auto">{subtext}</p>

      <div className="flex items-center justify-center gap-3 pt-2">
        {onPrimaryAction && (
          <button
            onClick={onPrimaryAction}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs tracking-wider uppercase transition shadow-lg cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{primaryBtn}</span>
          </button>
        )}
        {onSecondaryAction && secondaryBtn && (
          <button
            onClick={onSecondaryAction}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wider uppercase transition cursor-pointer flex items-center gap-1.5"
          >
            <span>{secondaryBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
