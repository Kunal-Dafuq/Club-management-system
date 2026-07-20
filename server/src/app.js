// ==============================
// Core Packages
// ==============================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const hpp = require("hpp");
const morgan = require("morgan");
const path = require("path");

const app = express();


// ==============================
// Environment
// ==============================

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173"
].filter(Boolean);


// ==============================
// Security Middlewares
// ==============================

const apiLimiter = require("./middleware/rateLimiter");
const security = require("./middleware/security");

const requestId = require("./middleware/requestId");
const requestLogger = require("./middleware/requestLogger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");


// ==============================
// External Services
// ==============================

const tusServer = require("./config/tus");


// ==============================
// Routes
// ==============================

const authRoutes = require("./routes/authRoutes");
const clubRoutes = require("./routes/clubRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const eventRoutes = require("./routes/eventRoutes");
const rsvpRoutes = require("./routes/rsvpRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const committeeRoutes = require("./routes/committeeRoutes");
const taskRoutes = require("./routes/taskRoutes");
const taskCommentRoutes = require("./routes/taskCommentRoutes");
const taskAttachmentRoutes = require("./routes/taskAttachmentRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const activityRoutes = require("./routes/activityRoutes");
const chatRoutes = require("./routes/chatRoutes");
const pinRoutes = require("./routes/pinRoutes");
const starRoutes = require("./routes/starRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const searchRoutes = require("./routes/searchRoutes");
const savedMessageRoutes = require("./routes/savedMessageRoutes");
const readRoutes = require("./routes/readRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");
const meetingSummaryRoutes = require("./routes/meetingSummaryRoutes");
const meetingPollRoutes = require("./routes/meetingPollRoutes");
const googleMeetRoutes = require("./routes/googleMeetRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const profileRoutes = require("./routes/profileRoutes");
const reportRoutes = require("./routes/reportRoutes");
const auditRoutes = require("./routes/auditRoutes");
const healthRoutes = require("./routes/healthRoute");
const fileRoutes = require("./routes/fileRoutes");
const exportRoutes = require("./routes/exportRoutes");
const systemRoutes = require("./routes/systemRoutes");
const adminRoutes = require("./routes/adminRoutes");
const clubDashboardRoutes = require("./routes/clubDashboardRoutes");
const meetingRecordingRoutes = require("./routes/meetingRecordingRoutes");


// ===================================================
// Trust Proxy
// ===================================================

app.set("trust proxy", 1);


// ===================================================
// Hide Express
// ===================================================

app.disable("x-powered-by");


// ===================================================
// Request Tracking
// ===================================================

app.use(requestId);
app.use(requestLogger);


// ===================================================
// Logging
// ===================================================

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("combined"));
}


// ===================================================
// Security
// ===================================================

app.use(
    helmet({
        crossOriginResourcePolicy: false,
        contentSecurityPolicy: false
    })
);

security(app);

app.use(hpp());

app.use(compression());


// ===================================================
// Rate Limiting
// ===================================================

app.use(apiLimiter);


// ===================================================
// CORS
// ===================================================

app.use(
    cors({
        origin(origin, callback) {

            if (
                !origin ||
                allowedOrigins.includes(origin)
            ) {
                return callback(null, true);
            }

            callback(
                new Error("CORS Not Allowed")
            );
        },

        credentials: true,

        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ],

        exposedHeaders: [
            "Content-Disposition"
        ]
    })
);

app.options(/.*/, cors());


// ===================================================
// Body Parsers
// ===================================================

app.use(
    express.json({
        limit: "10mb"
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "10mb"
    })
);


// ===================================================
// Cookies
// ===================================================

app.use(
    cookieParser(
        process.env.COOKIE_SECRET
    )
);


// ===================================================
// Socket Injection
// ===================================================

app.use((req, res, next) => {
    req.io = app.get("io");
    next();
});


// ===================================================
// Static Files
// ===================================================

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "../uploads")
    )
);

app.use("/media", mediaRoutes);


// ===================================================
// API Routes
// ===================================================

app.use("/api/auth", authRoutes);

app.use("/api/clubs", clubRoutes);
app.use("/api/clubs", membershipRoutes);

app.use("/api/events", eventRoutes);
app.use("/api/events", rsvpRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/announcements", announcementRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/committees", committeeRoutes);

app.use("/api/tasks", taskRoutes);
app.use("/api/task-comments", taskCommentRoutes);
app.use("/api/task-attachments", taskAttachmentRoutes);

app.use("/api/meetings", meetingRoutes);

app.use("/api/activity", activityRoutes);

app.use("/api/pins", pinRoutes);

app.use("/api/stars", starRoutes);

app.use("/api/search", searchRoutes);

app.use("/api/saved-messages", savedMessageRoutes);

app.use("/api/read", readRoutes);

app.use("/api/google", googleAuthRoutes);

app.use("/api/google-meet", googleMeetRoutes);

app.use("/api/meeting-summary", meetingSummaryRoutes);

app.use("/api/meeting-polls", meetingPollRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/audit", auditRoutes);

app.use("/api/files", fileRoutes);

app.use("/api/export", exportRoutes);

app.use("/api/system", systemRoutes);

app.use("/health", healthRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/clubs", clubDashboardRoutes);

app.use("/api/meeting-recordings",meetingRecordingRoutes);

// ===================================================
// Tus Upload Server
// ===================================================

app.use("/files", (req, res) => {
    tusServer.handle(req, res);
});


// ===================================================
// Root
// ===================================================

app.get("/", (req, res) => {

    res.send("ClubPlanet API Running 🚀");

});


// ===================================================
// 404 Handler
// ===================================================

app.use(notFound);


// ===================================================
// Error Handlers
// ===================================================

app.use(errorHandler);

// ===================================================

module.exports = app;