import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Sparkles,
  Hash,
  Users,
  Search,
  Paperclip,
  Smile,
  MoreVertical,
  CheckCheck,
  Zap,
  CornerDownRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AutoCompleteSearch from "../components/ui/AutoCompleteSearch";

const CHANNELS = [
  { id: "c-general", name: "general-announcements", unread: 0, topic: "Campus-wide org broadcasts & governance" },
  { id: "c-robotics", name: "robotics-core-tech", unread: 3, topic: "ROS2 autonomous rover & drone firmware" },
  { id: "c-hack", name: "hackplanet-2026", unread: 12, topic: "24-Hour AI hackathon coordination team" },
  { id: "c-abacus", name: "abacus-quant-society", unread: 0, topic: "Algorithmic trading & computational math" },
  { id: "c-exec", name: "exec-committee-vip", unread: 1, topic: "Presidents & budget approvers only" },
];

const INITIAL_MESSAGES = [
  {
    id: "m1",
    author: "Sneha Verma",
    role: "Tech Lead",
    avatar: "SV",
    avatarColor: "bg-cyan-500",
    time: "10:14 AM",
    content: "Just uploaded the ROS2 LiDAR sensor calibration node to the Robotics repository! Everyone check branch `feature/autonomous-rover`.",
    reactions: [{ emoji: "🚀", count: 6 }, { emoji: "🔥", count: 4 }],
    isSelf: false,
  },
  {
    id: "m2",
    author: "Anirudh Sharma",
    role: "ABACUS President",
    avatar: "AS",
    avatarColor: "bg-violet-600",
    time: "10:18 AM",
    content: "We also completed the quantitative backtest for our trading algorithm contest. Check the interactive performance chart in the Abacus channel.",
    reactions: [{ emoji: "📈", count: 8 }, { emoji: "⚡", count: 5 }],
    isSelf: false,
  },
  {
    id: "m3",
    author: "Kunal Dev",
    role: "Executive User",
    avatar: "KD",
    avatarColor: "bg-emerald-600",
    time: "10:22 AM",
    content: "Awesome work! HackPlanet registrations just crossed 180 teams. Let's make sure the GPU compute cloud servers are provisioned before Friday.",
    reactions: [{ emoji: "💯", count: 11 }, { emoji: "🎉", count: 7 }],
    isSelf: true,
  },
];

const Chat = () => {
  const [activeChannel, setActiveChannel] = useState(CHANNELS[1]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      author: "Kunal Dev",
      role: "Executive User",
      avatar: "KD",
      avatarColor: "bg-emerald-600",
      time: "Just now",
      content: inputText,
      reactions: [],
      isSelf: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simulate smart AI typing & response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}-ai`,
          author: "OrgOS AI Assistant",
          role: "System Bot",
          avatar: "AI",
          avatarColor: "bg-gradient-to-r from-cyan-500 to-violet-500",
          time: "Just now",
          content: `Synced your update across #${activeChannel.name}. All committee leads have been notified via telemetry!`,
          reactions: [{ emoji: "⚡", count: 1 }],
          isSelf: false,
        },
      ]);
    }, 1400);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-130px)] rounded-3xl bg-[#090A0F] border border-white/10 overflow-hidden shadow-2xl">
      {/* Channels Sidebar */}
      <div className="w-full lg:w-72 border-r border-white/10 bg-black/40 flex flex-col justify-between">
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-sm uppercase tracking-wider text-zinc-400 font-mono">
              OrgOS Channels
            </h2>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="space-y-1">
            {CHANNELS.map((ch) => {
              const active = activeChannel.id === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-violet-600/30 to-cyan-500/20 text-white border border-violet-500/40 shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Hash className={`w-4 h-4 ${active ? "text-cyan-400" : "text-zinc-500"}`} />
                    <span className="truncate">{ch.name}</span>
                  </div>
                  {ch.unread > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500 text-black">
                      {ch.unread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Channel Telemetry */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Active Peers:</span>
          <span className="text-cyan-400 font-bold">142 Online</span>
        </div>
      </div>

      {/* Main Messaging Area */}
      <div className="flex-1 flex flex-col justify-between bg-gradient-to-br from-[#090A0F] via-[#0D101D] to-[#090A0F]">
        {/* Channel Header */}
        <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Hash className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-white text-base">
                {activeChannel.name}
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                {activeChannel.topic}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>42 Members</span>
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3.5 ${msg.isSelf ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-extrabold text-sm shadow-lg shrink-0 ${msg.avatarColor}`}
              >
                {msg.avatar}
              </div>

              <div
                className={`max-w-xl space-y-1.5 ${
                  msg.isSelf ? "items-end text-right" : ""
                }`}
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-white">{msg.author}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                    {msg.role}
                  </span>
                  <span className="text-zinc-500 font-mono text-[10px]">
                    {msg.time}
                  </span>
                </div>

                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.isSelf
                      ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] rounded-tr-none"
                      : "bg-white/5 border border-white/10 text-zinc-200 backdrop-blur-xl rounded-tl-none"
                  }`}
                >
                  {msg.content}
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
                        className="px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1 hover:border-cyan-400/50 cursor-pointer transition-colors"
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
          ))}

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
              <span>OrgOS AI is drafting a response...</span>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-xl flex items-center gap-3"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message #${activeChannel.name}...`}
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
          />

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
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
