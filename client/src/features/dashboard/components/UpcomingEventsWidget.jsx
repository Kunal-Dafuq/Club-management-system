import { CalendarDays, MapPin, Clock } from "lucide-react";

const UpcomingEventsWidget = ({ events }) => {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <CalendarDays size={20} className="text-green-500" />
          Upcoming Events
        </h2>
        <button className="text-sm text-green-500 hover:text-green-400 transition-colors">
          View all
        </button>
      </div>

      {!events.length ? (
        <div className="py-12 text-center border-2 border-dashed border-zinc-800 rounded-xl">
          <CalendarDays size={32} className="mx-auto text-zinc-600 mb-3" />
          <p className="text-zinc-400 font-medium">No upcoming events scheduled.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {events.map((event) => {
            const eventDate = new Date(event.startTime);
            return (
              <div
                key={event.id}
                className="group bg-zinc-800/40 border border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600 p-4 rounded-xl transition-all cursor-pointer"
              >
                <h3 className="font-semibold text-white truncate mb-3 group-hover:text-green-400 transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-zinc-500" />
                    <span>
                      {eventDate.toLocaleDateString(undefined, { 
                        weekday: 'short', month: 'short', day: 'numeric' 
                      })} • {eventDate.toLocaleTimeString(undefined, { 
                        hour: '2-digit', minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-zinc-500" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsWidget;