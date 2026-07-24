import { useEffect, useState } from "react";
import { getClubActivities } from "../../services/activityService";

const ActivityTimeline = ({ clubId }) => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!clubId) return;
        const fetchActivities = async () => {

            try {

                const response =
                    await getClubActivities(clubId);

                setActivities(response.data);

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }
        };

        fetchActivities();

    }, [clubId]);

    if (loading)
        return <p>Loading activities...</p>;

    return (
        <div className="rounded-2xl bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">

                Activity Timeline

            </h2>

            <div className="mt-6 space-y-6">

                {activities.length === 0 && (

                    <p className="text-zinc-500">

                        No recent activity.

                    </p>
                )}

                {activities.map(activity => (

                    <div
                        key={activity.id}
                        className="border-l-2 border-violet-500 pl-5"
                    >

                        <h3 className="font-semibold">

                            {activity.description}

                        </h3>

                        <p className="text-zinc-500 text-sm mt-1">

                            {new Date(
                                activity.createdAt
                            ).toLocaleString()}

                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityTimeline;