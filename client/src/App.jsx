import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SplashCursor from "./components/SplashCursor";

// Layouts & Components (eager loaded for instant shell rendering)
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import NetworkResilienceBanner from "./components/common/NetworkResilienceBanner";
import CommandPalette from "./components/orgos/CommandPalette";

// Lazy Loaded Pages for performance & code splitting
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Clubs = lazy(() => import("./pages/Clubs"));
const ClubDetailsPage = lazy(() => import("./pages/ClubDetailsPage"));
const ClubProfile = lazy(() => import("./pages/ClubProfile"));
const Events = lazy(() => import("./pages/Events"));
const CreateEvent = lazy(() => import("./pages/CreateEvent"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Chat = lazy(() => import("./pages/Chat"));
const Meetings = lazy(() => import("./pages/Meetings"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Admin = lazy(() => import("./pages/Admin"));
const Notifications = lazy(() => import("./pages/Notifications"));
const PinnedMessages = lazy(() => import("./pages/PinnedMessages"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SpatialUniverse = lazy(() => import("./pages/SpatialUniverse"));

const PageLoader = () => (
  <div className="flex flex-col h-screen w-screen items-center justify-center bg-[#06080F] text-white space-y-4 select-none">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
      <div className="absolute inset-2 rounded-full border-2 border-violet-500/20 border-b-violet-400 animate-spin" />
    </div>
    <div className="text-xs font-mono font-extrabold uppercase tracking-widest text-cyan-400 animate-pulse">
      LOADING ORGOS MODULE...
    </div>
  </div>
);

export default function App() {
  return (
    <>
      <NetworkResilienceBanner />
      <CommandPalette />
      <SplashCursor
        VELOCITY_DISSIPATION={10}
        PRESSURE={0.4}
      />
      <Suspense fallback={<PageLoader />}>
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
            {/* Full-Screen Sleek 2D Campus Portal Directory */}
            <Route path="/campus-portal" element={<SpatialUniverse />} />
            <Route path="/campus-3d" element={<SpatialUniverse />} />

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
      </Suspense>
    </>
  );
}