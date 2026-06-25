const EventCard = ({ event }) => {
  return (
    <div className="bg-zinc-900 p-6 rounded-xl">
      <h3 className="text-xl font-semibold">
        {event.title}
      </h3>

      <p className="text-zinc-400 mt-2">
        {event.description}
      </p>

      <p className="mt-4">
        {new Date(event.startTime).toLocaleString()}
      </p>

      <button
        className="
        mt-4
        px-4
        py-2
        bg-blue-600
        rounded-lg"
      >
        RSVP
      </button>
    </div>
  );
};

export default EventCard;