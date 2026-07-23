import { useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import socket from "./socket/socket";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clubs from "./pages/Clubs";
import ClubDetails from "./pages/ClubDetails";
import ClubProfile from "./pages/ClubProfile";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import PinnedMessages from "./pages/PinnedMessages";

import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import MeetingUploader from "./features/meetings/MeetingUploader";
import MeetingRecorder from "./features/meetings/MeetingRecorder";

function AppRoutes() {
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        socket.auth = {
            token
        };

        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                element={

                    <ProtectedRoute>

                        <DashboardLayout />

                    </ProtectedRoute>

                }
            >
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/clubs"
                    element={<Clubs />}
                />

                <Route
                    path="/clubs/:id"
                    element={<ClubDetails />}
                />

                <Route
                    path="/club-profile/:id"
                    element={<ClubProfile />}
                />

                <Route
                    path="/events"
                    element={<Events />}
                />

                <Route
                    path="/create-event"
                    element={<CreateEvent />}
                />

                <Route
                    path="/notifications"
                    element={<Notifications />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/chat/:roomId/pins"
                    element={<PinnedMessages />}
                />

                <Route
                    path="/meetings/upload"
                    element={<MeetingUploader />}
                />

                <Route
                    path="/meetings/record"
                    element={<MeetingRecorder />}
                />
            </Route>
      </Routes>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}