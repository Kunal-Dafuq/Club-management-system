import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/Sidebar";
import Topbar from "../components/shared/Topbar";
import MobileBottomNav from "../components/shared/MobileBottomNav";
import OrgOSCopilot from "../components/orgos/OrgOSCopilot";
import { Command, Wand2 } from "lucide-react";

const DashboardLayout = () => {
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#06080F] text-white selection:bg-white/20 selection:text-white">
      {/* Universal Responsive Sidebar (Fixed on Desktop/TV, Slide-Over Drawer on Mobile/Tablet) */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex flex-1 flex-col relative min-w-0">
        <Topbar onOpenMenu={() => setIsMobileMenuOpen(true)} />

        {/* Universal Multi-Screen Main Workspace Container (Mobile -> Laptop -> Tablet -> TV 4K) */}
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:px-12 lg:py-14 lg:pb-14 2xl:px-20 2xl:py-16 3xl:px-28 3xl:py-20 max-w-[2400px] w-full mx-auto">
          <Outlet />
        </main>

        {/* Apple/Vercel Inspired Sleek Floating AI & Command Trigger */}
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="fixed bottom-20 lg:bottom-8 right-6 lg:right-8 z-40 flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/80 hover:bg-white/10 backdrop-blur-2xl border border-white/[0.1] hover:border-white/20 text-zinc-300 hover:text-white font-medium text-xs transition-all duration-200 shadow-2xl cursor-pointer group"
          title="Open IIIT-Delhi OrgOS AI Vision Suite (⌘I)"
        >
          <Wand2 className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white transition-colors" />
          <span>OrgOS Copilot</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 group-hover:text-zinc-200 text-[10px] font-mono transition-colors">
            ⌘I
          </kbd>
        </button>

        {/* Phase 9 & 10 Interactive Suite Modal */}
        <OrgOSCopilot
          isOpen={isCopilotOpen}
          onClose={() => setIsCopilotOpen(false)}
        />

        {/* Universal Mobile & Tablet Bottom Navigation (100% Feature Accessibility) */}
        <MobileBottomNav onOpenMenu={() => setIsMobileMenuOpen(true)} />
      </div>
    </div>
  );
};

export default DashboardLayout;