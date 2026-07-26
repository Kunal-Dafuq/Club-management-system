import { Megaphone, BellOff } from "lucide-react";

const Announcements = ({ announcements = [] }) => {
  return (
    <div className="rounded-3xl bg-zinc-900/50 border border-zinc-800 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
          <Megaphone size={24} />
        </div>
        Announcements
      </h2>

      {announcements.length === 0 ? (
        <div className="py-12 border-2 border-dashed border-zinc-800 rounded-2xl text-center">
          <BellOff size={32} className="mx-auto text-zinc-600 mb-3" />
          <p className="text-zinc-400 font-medium">No announcements right now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="group border border-zinc-800 bg-zinc-800/20 hover:bg-zinc-800/60 rounded-2xl p-5 transition-colors"
            >
              <h3 className="font-semibold text-lg text-white group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-zinc-400 mt-2 leading-relaxed text-sm">
                {item.content}
              </p>
              <p className="text-xs font-medium text-zinc-500 mt-4 uppercase tracking-wider">
                {new Intl.DateTimeFormat('en-US', {
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                }).format(new Date(item.createdAt))}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;