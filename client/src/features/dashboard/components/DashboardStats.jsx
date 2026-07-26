import { Users, Calendar, Bell, CheckCircle } from "lucide-react"; // Example icons

const DashboardStats = ({ stats }) => {
  const cards = [
    { title: "Active Clubs", value: stats.clubs, icon: Users, color: "text-blue-400" },
    { title: "Upcoming Events", value: stats.events, icon: Calendar, color: "text-green-400" },
    { title: "Notifications", value: stats.notifications, icon: Bell, color: "text-amber-400" },
    { title: "My RSVPs", value: stats.rsvps, icon: CheckCircle, color: "text-purple-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-zinc-400 font-medium text-sm tracking-wide">
                {card.title}
              </h3>
              <div className={`p-2 rounded-lg bg-zinc-800/50 ${card.color}`}>
                <Icon size={20} strokeWidth={2.5} />
              </div>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;