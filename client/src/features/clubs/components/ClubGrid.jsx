import ClubCard from "./ClubCard";

const ClubGrid = ({
    clubs,
    memberships,
    onJoin,
    loadingClubId
}) => {

    if (!clubs.length) {
        return (
            <div
                className="
                rounded-3xl
                border
                border-dashed
                border-white/10
                p-20
                text-center
                text-zinc-500"
            >

                <h2 className="text-3xl font-bold">

                    No Clubs Found

                </h2>

                <p className="mt-4">

                    Try changing your search or create a new club.

                </p>
            </div>
         );
    }

    return (

        <div
            className="
            grid
            gap-8
            sm:grid-cols-2
            xl:grid-cols-3"
        >

            {clubs.map((club) => (
              <ClubCard
                  key={club.id}
                  club={club}
                  membership={
                      memberships.find(
                          m => m.club.id === club.id
                      )
                  }
                  onJoin={onJoin}
                  loading={loadingClubId === club.id}
              />
            ))}
        </div>
    );
};

export default ClubGrid;