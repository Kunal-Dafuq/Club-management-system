import { useAuth } from "../contexts/AuthContext";
import DashboardStats from "../features/dashboard/DashboardStats";
import QuickActions from "../features/dashboard/QuickActions";
import UpcomingEventsWidget from "../features/dashboard/UpcomingEventsWidget";
import RecentNotificationsWidget from "../features/dashboard/RecentNotificationsWidget";
import Loader from "../components/Loader";
import { useDashboard } from "../hooks/useDashboard";

const Dashboard = () => {
  const { user } = useAuth();
  const {
    loading,
    data,
    error
  } = useDashboard();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        Something went wrong
      </div>
    );
  }

  const stats = {
    clubs: data?.clubs?.length || 0,
    events: data?.events?.length || 0,
    notifications: data?.notifications?.length || 0,
    rsvps: data?.rsvps?.length || 0
  };

  return (
    <div className="space-y-10">

      <div>

        <h1 className="text-4xl font-bold">

          Welcome {user?.name}

        </h1>

        <p className="text-zinc-400 mt-2">

          Here's your activity overview.

        </p>

      </div>

      <DashboardStats stats={stats} />

      <QuickActions />

      <div className="grid lg:grid-cols-2 gap-8">

        <div>

          <h2 className="text-2xl font-bold mb-4">

            Upcoming Events

          </h2>

          <UpcomingEventsWidget

            events={data?.events || []}

          />

        </div>

        <div>

          <h2 className="text-2xl font-bold mb-4">

            Recent Notifications

          </h2>

          <RecentNotificationsWidget

            notifications={

              data?.notifications || []

            }

          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;