const ClubStats = ({ club }) => {

    const approvedMembers =
        club.memberships.filter(
            member => member.status === "APPROVED"
        ).length;

    const pendingMembers =
        club.memberships.filter(
            member => member.status === "PENDING"
        ).length;

    const upcomingEvents =
        club.events.filter(
            event => new Date(event.startTime) > new Date()
        ).length;

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-zinc-900 p-5">

                <p className="text-zinc-400">
                    Members
                </p>

                <h2 className="text-3xl font-bold mt-2">

                    {approvedMembers}

                </h2>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-5">
                <p className="text-zinc-400">
                    Events
                </p>

                <h2 className="text-3xl font-bold mt-2">

                    {club.events.length}

                </h2>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-5">
                <p className="text-zinc-400">
                    Pending
                </p>

                <h2 className="text-3xl font-bold mt-2">

                    {pendingMembers}

                </h2>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-5">
                <p className="text-zinc-400">
                    Upcoming
                </p>

                <h2 className="text-3xl font-bold mt-2">

                    {upcomingEvents}

                </h2>
            </div>
        </div>
    );
};

export default ClubStats;