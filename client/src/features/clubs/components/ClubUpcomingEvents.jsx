const ClubUpcomingEvents = ({ events }) => {

    if (!events.length) {
        return (
            <div className="rounded-2xl bg-zinc-900 p-6">
                <h2 className="text-xl font-bold">
                    Upcoming Events
                </h2>

                <p className="text-zinc-500 mt-4">
                    No upcoming events.
                </p>
            </div>
        );
    }

    return (

        <div className="rounded-2xl bg-zinc-900 p-6">

            <h2 className="text-xl font-bold mb-6">

                Upcoming Events

            </h2>

            <div className="space-y-5">

                {events.map(event => (

                    <div
                        key={event.id}
                        className="
                        border
                        border-white/10
                        rounded-xl
                        p-4"
                    >

                        <h3 className="font-semibold text-lg">

                            {event.title}

                        </h3>

                        <p className="text-zinc-400 mt-2">

                            {event.description}

                        </p>

                        <div className="mt-4 text-sm text-zinc-500">

                            {event.location}

                        </div>

                        <div className="text-sm text-zinc-500">

                            🗓 {new Date(event.startTime).toLocaleString()}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClubUpcomingEvents;