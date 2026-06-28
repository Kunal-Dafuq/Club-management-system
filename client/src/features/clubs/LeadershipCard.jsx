const LeadershipCard = ({ club }) => {
    const leaders = club.memberships.filter(
        member =>
            member.status === "APPROVED" &&
            member.clubRole !== "MEMBER"
    );

    const roleOrder = {
        PRESIDENT: 1,
        SECRETARY: 2,
        TREASURER: 3,
        LEAD: 4
    };

    const sortedLeaders = [...leaders].sort(
        (a, b) =>
            roleOrder[a.clubRole] -
            roleOrder[b.clubRole]
    );

    const badgeColors = {
        PRESIDENT:
            "bg-yellow-500/20 text-yellow-400",

        SECRETARY:
            "bg-blue-500/20 text-blue-400",

        TREASURER:
            "bg-green-500/20 text-green-400",

        LEAD:
            "bg-violet-500/20 text-violet-400",

        MEMBER:
            "bg-zinc-700 text-white"
    };

    return (

        <div className="rounded-2xl bg-zinc-900 p-6">

            <h2 className="text-2xl font-bold">

                Leadership

            </h2>

            <div className="space-y-5 mt-6">

                {leaders.length === 0 && (

                    <p className="text-zinc-500">

                        No leadership assigned.

                    </p>
                )}

                {leaders.map(member => (

                    <div
                        key={member.id}
                        className="flex justify-between items-center"
                    >

                        <div>

                            <h3 className="font-semibold">

                                {member.user.name}

                            </h3>

                            <p className="text-zinc-500 text-sm">

                                {member.user.department}

                            </p>
                        </div>

                        <span
                            className={`
                                rounded-full
                                px-4
                                py-1
                                text-sm

                                ${badgeColors[member.clubRole]}
                                
                            `}
                        >
                            {member.clubRole}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeadershipCard;