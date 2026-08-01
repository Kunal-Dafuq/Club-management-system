import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import Topbar from "../components/shared/Topbar";
import OrgOSCopilot from "../components/orgos/OrgOSCopilot";
import { Command, Wand2 } from "lucide-react";

const DashboardLayout = () => {
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#06080F] text-white selection:bg-white/20 selection:text-white">
      <Sidebar />
      <div className="flex flex-1 flex-col relative">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-8 py-10 lg:px-12 lg:py-14">
          <Outlet />
        </main>

        {/* Apple/Vercel Inspired Sleek Floating AI & Command Trigger */}
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/70 hover:bg-white/10 backdrop-blur-2xl border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white font-medium text-xs transition-all duration-200 shadow-2xl cursor-pointer group"
          title="Open IIIT-Delhi OrgOS AI Vision Suite (⌘I)"
        >
          <Wand2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
          <span>OrgOS Copilot</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-500 group-hover:text-zinc-300 text-[10px] font-mono transition-colors">
            ⌘I
          </kbd>
        </button>

        {/* Phase 9 & 10 Interactive Suite Modal */}
        <OrgOSCopilot
          isOpen={isCopilotOpen}
          onClose={() => setIsCopilotOpen(false)}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;