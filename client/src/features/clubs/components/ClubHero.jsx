import { Pin, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

const ClubHero = ({ club, roomId }) => {
  const dynamicBackground = club.primaryColor
    ? `linear-gradient(135deg, ${club.primaryColor}, ${club.secondaryColor || '#18181b'}, ${club.accentColor || '#09090b'})`
    : 'linear-gradient(135deg, #3b82f6, #18181b)'; // Safe fallback gradient

  return (
    <div className="rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl relative mb-12">
      <div className="relative h-64 sm:h-72" style={{ background: dynamicBackground }}>
        <img
          src={club.bannerUrl || "https://placehold.co/1200x350/18181b/3f3f46"}
          alt={`${club.name} Banner`}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
      </div>

      <div className="px-6 sm:px-10 pb-8 relative">
        <div className="absolute -top-16 flex justify-between items-end w-[calc(100%-3rem)] sm:w-[calc(100%-5rem)]">
          <img
            src={club.logoUrl || "https://placehold.co/128/27272a/ffffff?text=Logo"}
            alt="Club Logo"
            className="w-32 h-32 rounded-2xl border-4 border-zinc-900 shadow-xl object-cover bg-zinc-800"
          />
          
          {roomId && (
            <Link
              to={`/chat/${roomId}/pins`}
              className="flex items-center gap-2 bg-zinc-800/80 backdrop-blur border border-zinc-700 hover:bg-zinc-700 hover:text-white text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium transition-all mb-4"
            >
              <Pin size={16} />
              <span className="hidden sm:inline">Pinned Messages</span>
            </Link>
          )}
        </div>

        <div className="pt-20">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {club.name}
            </h1>
            {club.verified && (
              <BadgeCheck className="text-blue-500" size={28} />
            )}
          </div>

          <p className="text-lg text-zinc-300 mt-2 font-medium">
            {club.tagline}
          </p>

          {club.motto && (
            <p className="italic text-zinc-500 mt-1">
              "{club.motto}"
            </p>
          )}

          <p className="mt-6 text-zinc-400 leading-relaxed max-w-3xl">
            {club.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubHero;