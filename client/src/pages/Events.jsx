import {useEffect,useState} from "react";
import {useLocation} from "react-router-dom";
import Loader from "../components/Loader";
import EventGrid from "../features/events/EventGrid";
import { getEvents } from "../services/eventService";

const Events = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();

        console.log(
          "DATA:",
          JSON.stringify(response.data, null, 2)
        );

        setEvents(response.data.events || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    console.log("EVENTS:", events);
  }, [events]);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">
          Events
        </h1>

        <div className="bg-red-100 border border-red-300 rounded-xl p-6">
          <p className="text-red-700">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="space-y-8">
        {location.state?.success && (
          <div
            className="
              bg-green-100
              border
              border-green-300
              rounded-lg
              p-4
            "
          >
            <p className="text-green-700">
              {location.state.success}
            </p>
          </div>
        )}
        
        <h1 className="text-4xl font-bold">
          Events
        </h1>

        <div className="rounded-xl shadow p-10 text-center">
          <h2 className="text-2xl font-semibold">
            No Events Found
          </h2>

          <p className="text-gray-500 mt-2">
            No events match your search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        Events
      </h1>

      <input
        type="text"
        placeholder="Search Events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3"
      />

      <EventGrid events={filteredEvents} />
    </div>
  );
};

export default Events;