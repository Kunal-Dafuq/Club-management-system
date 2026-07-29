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
import Chat from "./pages/Chat";
import Meetings from "./pages/Meetings";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
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
        <Route path="/public-clubs" element={<Clubs />} />
        <Route path="/public-events" element={<Events />} />
      </Route>

      {/* Authenticated Routes (With OrgOS Sidebar & Topbar) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:id" element={<ClubDetailsPage />} />
          <Route path="/clubs/:id/profile" element={<ClubProfile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/pinned" element={<PinnedMessages />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}