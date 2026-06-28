import ClubStats from "./components/ClubStats";

const ClubDetails = ({
    club,
    membership
}) => {

    if (!club) {
        return (
            <div
                className="
                rounded-3xl
                border
                border-white/10
                bg-zinc-900
                p-10
                sticky
                top-6"
            >

                <h2 className="text-2xl font-bold">

                    Club Details

                </h2>

                <p className="mt-6 text-zinc-400">

                    Select a club to view its details.

                </p>

            </div>
        );
    }

    return (

        <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-zinc-900
            p-8
            sticky
            top-6
            space-y-8"
        >

            <div>

                <h2 className="text-3xl font-bold">

                    {club.name}

                </h2>

                <p
                    className="
                    mt-4
                    text-zinc-400"
                >

                    {club.description}

                </p>

            </div>

            <ClubStats
                members={club.memberships?.length || 0}
                events={club.events?.length || 0}
            />

            <div>

                <h3 className="text-xl font-semibold">

                    About

                </h3>

                <p
                    className="
                    mt-3
                    text-zinc-400"
                >

                    {club.description}

                </p>
            </div>
        </div>
    );
};

export default ClubDetails;