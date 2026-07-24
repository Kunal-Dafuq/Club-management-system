import { Link } from "react-router-dom";

const ClubCard = ({
    club,
    membership,
    onJoin,
    loading=false
}) => {
  const status = membership?.status;
  const role = membership?.clubRole;
    return (
        <div
            className="
            rounded-3xl
            overflow-hidden
            border
            border-white/10
            bg-white/5
            backdrop-blur-lg
            transition
            duration-300
            hover:scale-[1.02]
            hover:border-violet-500/40"
        >

            <div className="h-44 bg-zinc-800">
                {club.bannerImage ? (
                    <img
                        src={club.bannerImage}
                        alt={club.name}
                        className="
                        h-full
                        w-full
                        object-cover"
                    />

                ) : (

                    <div
                        className="
                        h-full
                        flex
                        items-center
                        justify-center
                        text-zinc-500"
                    >
                        No Banner
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">

                        {club.name}

                    </h2>

                    <span
                        className="
                        text-xs
                        px-3
                        py-1
                        rounded-full
                        bg-green-600/20
                        text-green-400"
                    >

                        Official

                    </span>
                </div>

                <p
                    className="
                    mt-4
                    text-zinc-400
                    line-clamp-3"
                >

                    {club.description}

                </p>

                <div
                    className="
                    mt-6
                    grid
                    grid-cols-3
                    gap-3"
                >

                    <div>
                        <p className="text-sm text-zinc-500">

                            Members

                        </p>

                        <h3 className="text-lg font-semibold">

                            {club.memberCount ?? 0}

                        </h3>
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500">

                            Events

                        </p>

                        <h3 className="text-lg font-semibold">

                            {club.eventCount ?? 0}

                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-zinc-500">

                            Status

                        </p>

                        <h3 className="text-green-400">

                            Active

                        </h3>
                    </div>
                </div>

                <div
                    className="
                    mt-8
                    flex
                    gap-3"
                >

                    <button
                        disabled={
                            loading ||
                            status === "PENDING"
                        }
                        onClick={() => onJoin(club.id)}
                        className="
                            flex-1
                            rounded-xl
                            bg-violet-600
                            py-3
                            hover:bg-violet-500
                            disabled:opacity-60"
                    >
                        {loading
                            ? "Loading..."
                            : status === "APPROVED"
                            ? "Leave Club"
                            : status === "PENDING"
                            ? "Pending Approval"
                            : status === "REJECTED"
                            ? "Request Again"
                            : "Join Club"}
                    </button>

                    <Link
                        to={`/clubs/${club.id}`}
                        className="
                        flex-1
                        text-center
                        rounded-xl
                        border
                        border-white/10
                        py-3
                        hover:bg-white/10"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ClubCard;