const ClubAnalytics = ({ club }) => {

    const approved =
        club.memberships.filter(
            m => m.status === "APPROVED"
        );

    const pending =
        club.memberships.filter(
            m => m.status === "PENDING"
        );

    const rejected =
        club.memberships.filter(
            m => m.status === "REJECTED"
        );

    const upcoming =
        club.events.filter(
            event =>
                new Date(event.startTime) >
                new Date()
        );

    return (

        <div className="rounded-2xl bg-zinc-900 p-6">

            <h2 className="text-2xl font-bold mb-6">

                Club Analytics

            </h2>

            <div className="grid grid-cols-2 gap-5">

                <AnalyticsCard
                    title="Approved"
                    value={approved.length}
                />

                <AnalyticsCard
                    title="Pending"
                    value={pending.length}
                />

                <AnalyticsCard
                    title="Rejected"
                    value={rejected.length}
                />

                <AnalyticsCard
                    title="Upcoming Events"
                    value={upcoming.length}
                />
            </div>
        </div>
    );
};

const AnalyticsCard = ({
    title,
    value
}) => (

    <div className="rounded-xl bg-zinc-800 p-5">

        <p className="text-zinc-400">

            {title}

        </p>

        <h2 className="text-4xl font-bold mt-2">

            {value}

        </h2>
    </div>
);

export default ClubAnalytics;