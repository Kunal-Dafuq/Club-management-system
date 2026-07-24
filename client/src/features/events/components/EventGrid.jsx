import EventCard from "./EventCard";

const EventGrid = ({ events }) => {
  return (
    <div
      className="
      grid
      md:grid-cols-2
      lg:grid-cols-3
      gap-6"
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </div>
  );
};

export default EventGrid;