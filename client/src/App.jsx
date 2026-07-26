import { Routes, Route } from "react-router-dom";

// Layouts & Components
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clubs from "./pages/Clubs";
import ClubDetailsPage from "./pages/ClubDetailsPage";
import ClubProfile from "./pages/ClubProfile";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import PinnedMessages from "./pages/PinnedMessages";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:id" element={<ClubDetailsPage />} />
        <Route path="/clubs/:id/profile" element={<ClubProfile />} />
        <Route path="/events" element={<Events />} />
      </Route>

      {/* Authenticated Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/pinned" element={<PinnedMessages />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}