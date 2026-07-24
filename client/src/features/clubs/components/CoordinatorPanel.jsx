import PendingRequests from "./PendingRequests";

const CoordinatorPanel = ({
    membership,
    club
}) => {

    if (
        !membership ||
        membership.status !== "APPROVED"
    ) {
        return null;
    }

    const allowed = [
        "PRESIDENT",
        "LEAD",
        "SECRETARY"
    ];

    if (!allowed.includes(membership.clubRole)) {
        return null;
    }

    return (
        <div className="space-y-6">

            <div className="rounded-2xl bg-zinc-900 p-6">

                <h2 className="text-2xl font-bold">

                    Coordinator Panel

                </h2>

                <p className="text-zinc-400 mt-2">

                    Manage members and club operations.

                </p>

            </div>

            <PendingRequests
                clubId={club.id}
            />
        </div>
    );
};

export default CoordinatorPanel;