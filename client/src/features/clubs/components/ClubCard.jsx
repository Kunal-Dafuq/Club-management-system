import { Link } from "react-router-dom";
import { ShieldCheck, Image as ImageIcon, Loader2, Check, Clock, X, Plus } from "lucide-react";

const ClubCard = ({ club, membership, onJoin, loading = false }) => {
  const status = membership?.status;
  
  const getButtonConfig = () => {
    if (loading) return { label: "Loading...", icon: Loader2, bg: "bg-zinc-700", text: "text-zinc-300", spin: true };
    if (status === "APPROVED") return { label: "Leave Club", icon: Check, bg: "bg-green-600/20 hover:bg-red-500/20", text: "text-green-500 hover:text-red-500" };
    if (status === "PENDING") return { label: "Pending", icon: Clock, bg: "bg-amber-500/20", text: "text-amber-500" };
    if (status === "REJECTED") return { label: "Request Again", icon: X, bg: "bg-red-500/20 hover:bg-violet-600", text: "text-red-500 hover:text-white" };
    return { label: "Join Club", icon: Plus, bg: "bg-violet-600 hover:bg-violet-500", text: "text-white" };
  };

  const btn = getButtonConfig();
  const Icon = btn.icon;

  return (
    <div className="group rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-900/20">
      
      <div className="h-40 bg-zinc-800 relative overflow-hidden">
        {club.bannerImage ? (
          <img
            src={club.bannerImage}
            alt={club.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-800/50">
            <ImageIcon size={32} className="mb-2 opacity-50" />
            <span className="text-sm font-medium">No Banner</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-xl font-bold text-white leading-tight line-clamp-1">
            {club.name}
          </h2>
          {club.verified && (
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <ShieldCheck size={12} />
              Official
            </span>
          )}
        </div>

        <p className="mt-3 text-sm text-zinc-400 line-clamp-2 flex-grow">
          {club.description || "No description provided for this club."}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-zinc-800 pt-4">
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Members</p>
            <h3 className="text-lg font-semibold text-white mt-1">{club.memberCount ?? 0}</h3>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Events</p>
            <h3 className="text-lg font-semibold text-white mt-1">{club.eventCount ?? 0}</h3>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</p>
            <h3 className="text-sm font-medium text-green-400 mt-2">Active</h3>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            disabled={loading || status === "PENDING"}
            onClick={() => onJoin(club.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed ${btn.bg} ${btn.text}`}
          >
            <Icon size={16} className={btn.spin ? "animate-spin" : ""} />
            {btn.label}
          </button>

          <Link
            to={`/clubs/${club.id}`}
            className="flex-1 text-center py-2.5 rounded-xl border border-zinc-700 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;