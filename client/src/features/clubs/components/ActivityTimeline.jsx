import { useEffect, useState } from "react";
import { Activity, History } from "lucide-react";
import { getClubActivities } from "../services/clubService";
import Loader from "../../../components/common/Loader";

const ActivityTimeline = ({ clubId }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clubId) return;
    
    const fetchActivities = async () => {
      try {
        const response = await getClubActivities(clubId);
        setActivities(response.data || []);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [clubId]);

  return (
    <div className="rounded-3xl bg-zinc-900/50 border border-zinc-800 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
          <Activity size={24} />
        </div>
        Activity Timeline
      </h2>

      {loading ? (
        <div className="py-10 flex justify-center">
          <Loader />
        </div>
      ) : activities.length === 0 ? (
        <div className="py-12 border-2 border-dashed border-zinc-800 rounded-2xl text-center">
          <History size={32} className="mx-auto text-zinc-600 mb-3" />
          <p className="text-zinc-400 font-medium">No recent activity.</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-zinc-800 ml-4 space-y-8 pb-4">
          {activities.map((activity, index) => (
            <div key={activity.id || index} className="relative pl-6">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-zinc-900"></div>
              
              <h3 className="font-semibold text-white text-md">
                {activity.description}
              </h3>
              <p className="text-zinc-500 text-xs font-medium mt-1 uppercase tracking-wider">
                {new Intl.DateTimeFormat('en-US', {
                  month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                }).format(new Date(activity.createdAt))}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;