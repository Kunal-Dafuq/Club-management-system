const UpcomingEventsWidget = ({ events }) => {
  if (!events.length) {
    return (
      <div
        className="
        bg-zinc-900
        rounded-xl
        p-8
        text-center"
      >
        No upcoming events
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {events.map((event) => (

        <div
          key={event.id}
          className="bg-gray-900 p-4 rounded-lg"
        >

          <h3>
            {event.title}
          </h3>

          <p>
            {new Date(event.startTime)
              .toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEventsWidget;