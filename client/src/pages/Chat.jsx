import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Hash,
  Users,
  Paperclip,
  CheckCheck,
  Zap,
  ChevronDown,
  FileText,
  Image as ImageIcon,
  Code,
  Archive,
  Download,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { compressImageClientSide, validatePlatformLimits } from "../utils/imageCompressor";

// Multi-Club Organization Structure with Dedicated Channels per Club
const CLUBS_WORKSPACES = [
  {
    id: "tasveer",
    name: "Tasveer Photography",
    icon: "📷",
    channels: [
      { id: "tasveer-general", name: "general", unread: 0, topic: "General photography & campus shoot announcements" },
      { id: "tasveer-committee", name: "core-committee", unread: 2, topic: "Odyssey Fest camera gear & budget requisitions" },
      { id: "tasveer-shoots", name: "events-planning", unread: 0, topic: "Weekend photowalks & exhibition curation" },
      { id: "tasveer-media", name: "media-dump", unread: 5, topic: "RAW image uploads & Lightroom preset sharing" },
    ],
  },
  {
    id: "electroholics",
    name: "Electroholics Hardware",
    icon: "⚡",
    channels: [
      { id: "electro-general", name: "general", unread: 0, topic: "IIITD Embedded systems, IoT & robotics discussions" },
      { id: "electro-projects", name: "projects-hardware", unread: 3, topic: "Autonomous drone & rover schematic reviews" },
      { id: "electro-committee", name: "core-committee", unread: 0, topic: "Lab component purchasing & solder station slots" },
    ],
  },
  {
    id: "astronuts",
    name: "Astronuts Astronomy",
    icon: "🪐",
    channels: [
      { id: "astro-general", name: "general", unread: 0, topic: "Stargazing nights & observatory telescope bookings" },
      { id: "astro-research", name: "astrophotography", unread: 4, topic: "Deep sky stacked frames & celestial tracking" },
    ],
  },
  {
    id: "muse",
    name: "Muse Fashion Society",
    icon: "👗",
    channels: [
      { id: "muse-general", name: "general", unread: 0, topic: "Runway themes, styling ideas & apparel workshops" },
      { id: "muse-committee", name: "core-committee", unread: 1, topic: "Odyssey Fest fashion show stage & lighting budget" },
      { id: "muse-design", name: "costume-design", unread: 0, topic: "Fabric sourcing, tailoring patterns & lookbooks" },
    ],
  },
  {
    id: "foobar",
    name: "Foobar Competitive Coding",
    icon: "💻",
    channels: [
      { id: "foobar-general", name: "general", unread: 0, topic: "ICPC, Codeforces rounds & algorithmic bootcamps" },
      { id: "foobar-procon", name: "procon-2026", unread: 2, topic: "Problem setting & testcase generation for IIITD ProCon" },
    ],
  },
  {
    id: "exec",
    name: "Student Council Executive",
    icon: "🏛️",
    channels: [
      { id: "exec-general", name: "general", unread: 0, topic: "Campus-wide organization governance & SAC policies" },
      { id: "exec-budget", name: "budget-approvals", unread: 1, topic: "Club budget requisitions & financial audit logs" },
    ],
  },
];

// Initial Messages Isolated by Channel ID
const INITIAL_MESSAGES_BY_CHANNEL = {
  "tasveer-general": [
    {
      id: "m-t1",
      author: "Kunal Dev",
      role: "Tasveer President",
      avatar: "KD",
      avatarColor: "bg-emerald-600",
      time: "9:30 AM",
      content: "Welcome to #general! All Odyssey Fest photo team assignments are now live.",
      reactions: [{ emoji: "📸", count: 8 }, { emoji: "🔥", count: 5 }],
      isSelf: true,
    },
    {
      id: "m-t2",
      author: "Riya Sharma",
      role: "Lead Editor",
      avatar: "RS",
      avatarColor: "bg-cyan-600",
      time: "10:05 AM",
      content: "Don't forget to bring your SD cards for backup after the main stage events tonight!",
      reactions: [{ emoji: "👍", count: 4 }],
      isSelf: false,
    },
  ],
  "tasveer-committee": [
    {
      id: "m-tc1",
      author: "Kunal Dev",
      role: "Tasveer President",
      avatar: "KD",
      avatarColor: "bg-emerald-600",
      time: "10:15 AM",
      content: "Odyssey Fest registrations just crossed 180 teams. Let's make sure our camera gear and audit requisitions are approved before Friday.",
      reactions: [{ emoji: "💯", count: 11 }, { emoji: "🎉", count: 7 }],
      isSelf: true,
    },
  ],
  "electro-projects": [
    {
      id: "m-e1",
      author: "Sneha Verma",
      role: "Electroholics Lead",
      avatar: "SV",
      avatarColor: "bg-cyan-500",
      time: "10:14 AM",
      content: "Just uploaded the PCB schematic and embedded firmware for our autonomous quadcopter build!",
      reactions: [{ emoji: "🚀", count: 6 }, { emoji: "🔥", count: 4 }],
      isSelf: false,
    },
  ],
  "muse-general": [
    {
      id: "m-m1",
      author: "Aanya Kapoor",
      role: "Muse President",
      avatar: "AK",
      avatarColor: "bg-pink-600",
      time: "10:00 AM",
      content: "Hey team! Our runway theme for Odyssey Fest 2026 is 'Neo-Futurism & Cyberpunk Elegance'. Start sharing lookbook ideas!",
      reactions: [{ emoji: "✨", count: 9 }, { emoji: "👗", count: 7 }],
      isSelf: false,
    },
  ],
};

const Chat = () => {
  const [activeClub, setActiveClub] = useState(CLUBS_WORKSPACES[0]);
  const [activeChannel, setActiveChannel] = useState(CLUBS_WORKSPACES[0].channels[0]);
  const [messagesByChannel, setMessagesByChannel] = useState(INITIAL_MESSAGES_BY_CHANNEL);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [clubDropdownOpen, setClubDropdownOpen] = useState(false);

  // Local File Upload State
  const [stagedFile, setStagedFile] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on message updates
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const currentMessages = messagesByChannel[activeChannel.id] || [];

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages.length, activeChannel.id]);

  // Handle switching active club workspace
  const handleSelectClub = (club) => {
    setActiveClub(club);
    setActiveChannel(club.channels[0]);
    setClubDropdownOpen(false);
  };

  // Helper to format file size cleanly
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  // Helper to get file icon by MIME type or extension
  const getFileIcon = (type, name) => {
    if (type?.startsWith("image/")) return "🖼️";
    if (type?.includes("pdf") || name?.endsWith(".pdf")) return "📄";
    if (name?.endsWith(".py") || name?.endsWith(".cpp") || name?.endsWith(".js") || name?.endsWith(".jsx")) return "💻";
    if (name?.endsWith(".zip") || name?.endsWith(".tar") || name?.endsWith(".csv")) return "📦";
    return "📎";
  };

  // Handle Local Storage File Pick with Industry Benchmarks & Client-Side Photo Compression
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Validate against industry platform limits (Photos 10MB cap, Docs 25MB, Videos up to 2GB Resumable)
      const limitCheck = validatePlatformLimits(file, { allowResumableLargeVideo: true });

      let finalFile = file;
      let savingsInfo = null;

      // Automatically compress RAW/HEIC/PNG/JPEG photos on browser canvas before staging
      if (file.type.startsWith("image/")) {
        const compRes = await compressImageClientSide(file, { maxWidth: 1920, maxHeight: 1920, quality: 0.82 });
        if (compRes.compressed) {
          finalFile = compRes.file;
          savingsInfo = `Compressed -${compRes.savingsPercent}% (${formatFileSize(compRes.originalSize)} → ${formatFileSize(compRes.compressedSize)})`;
        }
      }

      const fileUrl = URL.createObjectURL(finalFile);
      const isImage = finalFile.type.startsWith("image/");

      setStagedFile({
        name: finalFile.name,
        size: formatFileSize(finalFile.size),
        type: finalFile.type || "application/octet-stream",
        icon: getFileIcon(finalFile.type, finalFile.name),
        url: fileUrl,
        isImage: isImage,
        savingsInfo: savingsInfo,
        requiresResumableTus: limitCheck.requiresResumableTus,
      });
    } catch (err) {
      alert(err.message);
    } finally {
      // Reset input so selecting the same file again works
      e.target.value = null;
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !stagedFile) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      author: "Kunal Dev",
      role: `${activeClub.name.split(" ")[0]} President`,
      avatar: "KD",
      avatarColor: "bg-emerald-600",
      time: "Just now",
      content: inputText.trim(),
      reactions: [],
      attachment: stagedFile
        ? {
            name: stagedFile.name,
            size: stagedFile.size,
            type: stagedFile.type,
            icon: stagedFile.icon,
            url: stagedFile.url,
            isImage: stagedFile.isImage,
          }
        : null,
      isSelf: true,
    };

    setMessagesByChannel((prev) => ({
      ...prev,
      [activeChannel.id]: [...(prev[activeChannel.id] || []), newMsg],
    }));

    setInputText("");
    setStagedFile(null);

    // Simulate contextual AI assistant response for this specific channel
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiReply = {
        id: `ai-${Date.now()}`,
        author: "OrgOS AI Assistant",
        role: "System Bot",
        avatar: "AI",
        avatarColor: "bg-gradient-to-r from-cyan-500 to-violet-500",
        time: "Just now",
        content: `Synced your update in #${activeChannel.name} for ${activeClub.name}. All channel members have been notified!`,
        reactions: [{ emoji: "⚡", count: 1 }],
        isSelf: false,
      };

      setMessagesByChannel((prev) => ({
        ...prev,
        [activeChannel.id]: [...(prev[activeChannel.id] || []), aiReply],
      }));
    }, 1200);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-130px)] rounded-3xl bg-[#070910] border border-white/[0.06] overflow-hidden shadow-2xl select-none">
      {/* Hidden Native File Input for Local Storage Uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* =========================================================
          1. CHANNELS & CLUB WORKSPACE SIDEBAR (Linear/Vercel SaaS)
      ========================================================= */}
      <div className="w-full lg:w-72 border-r border-white/[0.06] bg-black/40 flex flex-col justify-between">
        <div className="p-5 space-y-5">
          {/* Club Workspace Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setClubDropdownOpen(!clubDropdownOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-lg">{activeClub.icon}</span>
                <div className="truncate">
                  <div className="text-xs font-semibold text-white truncate">
                    {activeClub.name}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    {activeClub.channels.length} Channels
                  </div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </button>

            {/* Club Workspace Menu */}
            <AnimatePresence>
              {clubDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute top-14 left-0 z-50 w-full p-1.5 rounded-2xl bg-[#0E1224] border border-white/15 shadow-2xl backdrop-blur-xl space-y-1"
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    Switch Club Workspace
                  </div>
                  {CLUBS_WORKSPACES.map((club) => (
                    <button
                      key={club.id}
                      type="button"
                      onClick={() => handleSelectClub(club)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                        activeClub.id === club.id
                          ? "bg-white/10 text-white font-semibold"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{club.icon}</span>
                      <span className="truncate">{club.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Channels List for Active Club */}
          <div className="space-y-1.5">
            <div className="px-2 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                {activeClub.name} Channels
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-0.5">
              {activeClub.channels.map((ch) => {
                const active = activeChannel.id === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      active
                        ? "bg-white/[0.08] text-white font-semibold"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Hash className={`w-3.5 h-3.5 ${active ? "text-cyan-400" : "text-zinc-500"}`} />
                      <span className="truncate">{ch.name}</span>
                    </div>
                    {ch.unread > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white/10 text-white">
                        {ch.unread}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* System Telemetry Footer */}
        <div className="p-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>{activeClub.name}</span>
          <span className="text-emerald-400 font-semibold">Live Workspace</span>
        </div>
      </div>

      {/* =========================================================
          2. MAIN CHANNEL MESSAGING STREAM
      ========================================================= */}
      <div className="flex-1 flex flex-col justify-between bg-gradient-to-br from-[#070910] via-[#0B0D17] to-[#070910]">
        {/* Channel Header (Minimalist Vercel / Apple style) */}
        <div className="h-16 px-6 border-b border-white/[0.06] flex items-center justify-between bg-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-cyan-400">
              <Hash className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">
                #{activeChannel.name}
              </h3>
              <p className="text-[11px] text-zinc-500 truncate max-w-md">
                {activeChannel.topic}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.06] text-zinc-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>42 Members</span>
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          {currentMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-2 py-16">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 text-xl">
                #
              </div>
              <h4 className="text-sm font-semibold text-white">
                Welcome to #{activeChannel.name}
              </h4>
              <p className="text-xs text-zinc-500 max-w-sm">
                This is the start of the #{activeChannel.name} channel for {activeClub.name}. You can upload local files or send updates.
              </p>
            </div>
          ) : (
            currentMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3.5 ${msg.isSelf ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white font-extrabold text-xs shadow-lg shrink-0 ${msg.avatarColor}`}
                >
                  {msg.avatar}
                </div>

                <div
                  className={`max-w-xl space-y-1.5 ${
                    msg.isSelf ? "items-end text-right" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-white">{msg.author}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-400 border border-white/[0.06]">
                      {msg.role}
                    </span>
                    <span className="text-zinc-500 font-mono text-[10px]">
                      {msg.time}
                    </span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.isSelf
                        ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.25)] rounded-tr-none"
                        : "bg-white/[0.04] border border-white/[0.08] text-zinc-200 backdrop-blur-xl rounded-tl-none"
                    }`}
                  >
                    {msg.content && <div>{msg.content}</div>}

                    {/* Real Uploaded Attachment Display */}
                    {msg.attachment && (
                      <div className="mt-3 space-y-2">
                        {/* Image Preview Thumbnail if uploaded image */}
                        {msg.attachment.isImage && msg.attachment.url && (
                          <div className="rounded-xl overflow-hidden border border-white/15 max-h-60 bg-black/40">
                            <img
                              src={msg.attachment.url}
                              alt={msg.attachment.name}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}

                        {/* File Details Bar & Download/Open Action */}
                        <div className="p-3 rounded-xl bg-black/40 border border-white/15 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-xl shrink-0">
                              {msg.attachment.icon || "📎"}
                            </span>
                            <div className="truncate">
                              <div className="font-semibold text-white font-mono truncate">
                                {msg.attachment.name}
                              </div>
                              <div className="text-[10px] text-zinc-400 font-mono">
                                {msg.attachment.size} • LOCAL FILE
                              </div>
                            </div>
                          </div>
                          <a
                            href={msg.attachment.url}
                            download={msg.attachment.name}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-[11px] transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reactions */}
                  {msg.reactions.length > 0 && (
                    <div
                      className={`flex items-center gap-1.5 ${
                        msg.isSelf ? "justify-end" : ""
                      }`}
                    >
                      {msg.reactions.map((r, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-xs bg-white/[0.04] border border-white/[0.08] text-zinc-300 flex items-center gap-1 hover:border-cyan-400/50 cursor-pointer transition-colors"
                        >
                          <span>{r.emoji}</span>
                          <span className="font-mono text-[10px] font-bold">
                            {r.count}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-xs font-mono text-cyan-400 pl-12"
            >
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span>Campus AI Assistant is drafting a response in #{activeChannel.name}...</span>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* =========================================================
            3. REAL LOCAL STORAGE ATTACHMENT STAGING BAR
        ========================================================= */}
        {stagedFile && (
          <div className="px-6 py-3 bg-white/[0.04] border-t border-white/10 flex items-center justify-between text-xs font-mono text-white">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg">{stagedFile.icon}</span>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-cyan-300">STAGED FILE:</span>
                  <span className="truncate">{stagedFile.name}</span>
                  <span className="text-zinc-500">({stagedFile.size})</span>
                </div>
                {stagedFile.savingsInfo ? (
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>⚡ Client-Side WebP Compressed • {stagedFile.savingsInfo} • 10MB Photo Cap</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Tus Resumable Protocol v1.0 Active • 6MB Chunks • 25MB Email Standard / 2GB Document Mode</span>
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStagedFile(null)}
              className="text-zinc-400 hover:text-white font-semibold px-2 py-1 rounded hover:bg-white/10 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        )}

        {/* =========================================================
            4. MESSAGE & FILE UPLOAD INPUT FORM
        ========================================================= */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-white/[0.06] bg-black/40 backdrop-blur-xl flex items-center gap-3"
        >
          {/* Real OS File Picker Trigger */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Attach File from Local Storage (.pdf, image, .py, .zip, etc.)"
            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
              stagedFile
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "bg-white/[0.04] border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message #${activeChannel.name} (${activeClub.name})...`}
            className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
          />

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-white text-black font-semibold text-sm shadow-sm hover:bg-zinc-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
