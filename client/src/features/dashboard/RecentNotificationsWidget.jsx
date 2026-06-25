const RecentNotificationsWidget = ({ notifications }) => {
  if (!notifications.length) {
    return (
      <div
        className="
        bg-zinc-900
        rounded-xl
        p-8
        text-center"
      >
        No notifications
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {notifications.map((notification) => (

        <div
          key={notification.id}
          className="bg-gray-900 p-4 rounded-lg"
        >

          {notification.message}

        </div>
      ))}
    </div>
  );
};

export default RecentNotificationsWidget;