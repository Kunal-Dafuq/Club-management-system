import { Users, CalendarDays, Sparkles } from "lucide-react";
import ClubStats from "./ClubStats";
import LeadershipCard from "./LeadershipCard";
import ClubUpcomingEvents from "./ClubUpcomingEvents"; // Fixed name to match import
import MembersList from "./MembersList";
import Announcements from "./Announcements";
import ActivityTimeline from "./ActivityTimeline";
import PendingRequests from "./PendingRequests";
import CoordinatorPanel from "./CoordinatorPanel";

const ClubDetails = ({ club, membership, onJoin, loadingJoin }) => {
  if (!club) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-900/30 p-8 text-center">
        <Sparkles size={48} className="text-zinc-700 mb-4" />
        <h2 className="text-2xl font-bold text-white">Select a Club</h2>
        <p className="text-zinc-400 mt-2 max-w-sm">
          Click any club from the directory to view its details, upcoming events, and membership information.
        </p>
      </div>
    );
  }

  const approvedMembers = club.memberships?.filter((m) => m.status === "APPROVED") || [];
  const upcomingEvents = club.events?.filter((event) => new Date(event.startTime) > new Date()) || [];

  const announcements = [
    { id: 1, title: "Orientation Meeting", content: "All new members must attend Sunday's meeting.", createdAt: new Date() },
    { id: 2, title: "Hackathon Registration", content: "Registrations close tomorrow.", createdAt: new Date() }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 overflow-hidden shadow-xl shadow-black/20">
        <img
          src={club.bannerImage || "https://placehold.co/800x300/18181b/3f3f46?text=Club+Banner"}
          alt={`${club.name} banner`}
          className="w-full h-56 object-cover opacity-80"
        />
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{club.name}</h1>
            <p className="text-zinc-400 mt-2 leading-relaxed max-w-2xl">{club.description}</p>
          </div>
          
          {!membership && (
            <button
              onClick={() => onJoin?.(club.id)}
              disabled={loadingJoin}
              className="shrink-0 bg-white hover:bg-zinc-200 text-black px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loadingJoin ? "Joining..." : "Join Club"}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-zinc-400 text-sm font-medium">Active Members</h2>
            <p className="text-3xl font-bold text-white mt-1">{approvedMembers.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6">
          <div className="p-3 bg-green-500/10 text-green-400 rounded-xl">
            <CalendarDays size={24} />
          </div>
          <div>
            <h2 className="text-zinc-400 text-sm font-medium">Upcoming Events</h2>
            <p className="text-3xl font-bold text-white mt-1">{upcomingEvents.length}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ClubStats club={club} />
          <ClubUpcomingEvents events={upcomingEvents} />
          <Announcements announcements={announcements} />
          <ActivityTimeline clubId={club.id} />
        </div>
        
        <div className="space-y-8">
          {membership?.role === "COORDINATOR" && (
             <CoordinatorPanel membership={membership} club={club} />
          )}
          {membership?.role === "COORDINATOR" && (
             <PendingRequests clubId={club.id} />
          )}
          <LeadershipCard members={approvedMembers} />
          <MembersList members={approvedMembers} />
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;