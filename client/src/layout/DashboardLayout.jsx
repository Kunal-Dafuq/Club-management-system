import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";
import Topbar from "../components/shared/Topbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      <Topbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-8">

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;