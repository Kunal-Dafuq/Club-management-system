import React from "react";

export default function SkeletonLoader({ type = "dashboard", count = 3 }) {
  const renderDashboardSkeleton = () => (
    <div className="space-y-6 animate-pulse p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 rounded-3xl bg-white/[0.04] border border-white/10 p-5 flex flex-col justify-between">
            <div className="w-1/3 h-4 rounded bg-white/10" />
            <div className="w-2/3 h-7 rounded bg-white/15" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-72 rounded-3xl bg-white/[0.04] border border-white/10 p-6" />
        <div className="h-72 rounded-3xl bg-white/[0.04] border border-white/10 p-6" />
      </div>
    </div>
  );

  const renderClubCardsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="rounded-3xl bg-[#0A0D18] border border-white/10 overflow-hidden h-72 flex flex-col justify-between">
          <div className="h-36 bg-white/[0.06] p-6 flex flex-col justify-between">
            <div className="w-20 h-5 rounded-full bg-white/10" />
            <div className="w-24 h-7 rounded-full bg-white/10 self-end" />
          </div>
          <div className="p-5 space-y-3">
            <div className="w-3/4 h-6 rounded bg-white/15" />
            <div className="w-full h-4 rounded bg-white/10" />
            <div className="w-1/2 h-4 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderChatSkeleton = () => (
    <div className="space-y-4 animate-pulse p-6">
      <div className="flex justify-start">
        <div className="w-64 h-16 rounded-2xl bg-white/[0.06] border border-white/10" />
      </div>
      <div className="flex justify-end">
        <div className="w-72 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/20" />
      </div>
      <div className="flex justify-start">
        <div className="w-52 h-12 rounded-2xl bg-white/[0.06] border border-white/10" />
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="space-y-3 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="h-16 rounded-2xl bg-white/[0.04] border border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10" />
            <div className="space-y-1.5">
              <div className="w-36 h-4 rounded bg-white/15" />
              <div className="w-24 h-3 rounded bg-white/10" />
            </div>
          </div>
          <div className="w-20 h-7 rounded-lg bg-white/10" />
        </div>
      ))}
    </div>
  );

  if (type === "dashboard") return renderDashboardSkeleton();
  if (type === "club-card" || type === "event-card") return renderClubCardsSkeleton();
  if (type === "chat-message") return renderChatSkeleton();
  return renderListSkeleton();
}
