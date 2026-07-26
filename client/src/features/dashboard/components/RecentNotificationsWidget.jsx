import { Bell, Circle } from "lucide-react";

const RecentNotificationsWidget = ({ notifications }) => {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Bell size={20} className="text-amber-500" />
          Notifications
        </h2>
      </div>

      {!notifications.length ? (
        <div className="py-12 text-center">
          <Bell size={32} className="mx-auto text-zinc-700 mb-3" />
          <p className="text-zinc-500 font-medium">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-1">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-zinc-800/50 ${
                index !== notifications.length - 1 ? "border-b border-zinc-800/50" : ""
              }`}
            >
              <div className="mt-1">
                <Circle size={8} fill="currentColor" className="text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {notification.message}
                </p>
                <span className="text-xs text-zinc-500 mt-1 block">
                  {notification.createdAt ? new Date(notification.createdAt).toLocaleTimeString() : 'Just now'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentNotificationsWidget;