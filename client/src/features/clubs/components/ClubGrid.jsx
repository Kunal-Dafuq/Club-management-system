import { SearchX } from "lucide-react";
import ClubCard from "./ClubCard";

const ClubGrid = ({ clubs = [], memberships = [], onJoin, loadingClubId }) => {
  
  if (!clubs.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-900/30 text-center">
        <SearchX size={48} className="text-zinc-600 mb-4" />
        <h2 className="text-2xl font-bold text-white tracking-tight">
          No Clubs Found
        </h2>
        <p className="mt-2 text-zinc-400 max-w-sm">
          Try adjusting your search filters or check back later. If you have the permissions, you can create a new club.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {clubs.map((club) => (
        <ClubCard
          key={club.id}
          club={club}
          membership={memberships?.find((m) => m.club.id === club.id)}
          onJoin={onJoin}
          loading={loadingClubId === club.id}
        />
      ))}
    </div>
  );
};

export default ClubGrid;