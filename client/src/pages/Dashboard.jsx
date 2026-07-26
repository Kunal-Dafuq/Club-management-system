import useAuth from "../hooks/useAuth";
import { useDashboard } from "../features/dashboard/hooks/useDashboard";
import DashboardStats from "../features/dashboard/components/DashboardStats";
import QuickActions from "../features/dashboard/components/QuickActions";
import UpcomingEventsWidget from "../features/dashboard/components/UpcomingEventsWidget";
import RecentNotificationsWidget from "../features/dashboard/components/RecentNotificationsWidget";
import ActivityChart from "../features/dashboard/components/ActivityChart";
import Loader from "../components/common/Loader";

const Dashboard = () => {
  const { user } = useAuth();
  const { loading, data, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl text-center">
        <h3 className="text-lg font-semibold mb-2">Failed to load dashboard</h3>
        <p>{error}</p>
      </div>
    );
  }

  const stats = {
    clubs: data?.clubs?.length || 0,
    events: data?.events?.length || 0,
    notifications: data?.notifications?.length || 0,
    rsvps: data?.rsvps?.length || 0,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-zinc-400 mt-2 text-sm md:text-base">
            Here's what is happening across your clubs today.
          </p>
        </div>
        <QuickActions />
      </header>

      <DashboardStats stats={stats} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ActivityChart />
          <UpcomingEventsWidget events={data?.events || []} />
        </div>

        <div className="space-y-8">
          <RecentNotificationsWidget notifications={data?.notifications || []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;