// ======================================================
// Core Packages
// ======================================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const hpp = require("hpp");
const morgan = require("morgan");
const path = require("path");

const app = express();

// ======================================================
// Configuration
// ======================================================

const tusServer = require("./config/tus");

const apiLimiter = require("./middleware/rateLimiter");
const security = require("./middleware/security");
const requestId = require("./middleware/requestId");
const requestLogger = require("./middleware/requestLogger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

// ======================================================
// Environment
// ======================================================

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173"
].filter(Boolean);

// ======================================================
// Express Settings
// ======================================================

app.set("trust proxy", 1);
app.disable("x-powered-by");

// ======================================================
// Request Tracking
// ======================================================

app.use(requestId);
app.use(requestLogger);

// ======================================================
// Logging
// ======================================================

app.use(
    morgan(
        process.env.NODE_ENV === "development"
            ? "dev"
            : "combined"
    )
);

// ======================================================
// Security
// ======================================================

app.use(
    helmet({
        crossOriginResourcePolicy: false,
        contentSecurityPolicy: false
    })
);

security(app);

app.use(hpp());

app.use(compression());

app.use(apiLimiter);

// ======================================================
// CORS
// ======================================================

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
            "Authorization",
            "Content-Type"
        ],

        exposedHeaders: [
            "Content-Disposition"
        ]
    })
);

app.options(/.*/, cors());

// ======================================================
// Body Parser
// ======================================================

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

// ======================================================
// Cookies
// ======================================================

app.use(
    cookieParser(
        process.env.COOKIE_SECRET
    )
);

// ======================================================
// Socket Injection
// ======================================================

app.use((req, res, next) => {

    req.io = app.get("io");

    next();

});

// ======================================================
// Static Files
// ======================================================

app.use(
    "/uploads",
    express.static(
        path.join(
            __dirname,
            "../uploads"
        )
    )
);

// ======================================================
// API Routes
// ======================================================

const routes = [

    ["/api/auth", require("./routes/authRoutes")],

    ["/api/clubs", require("./routes/clubRoutes")],
    ["/api/memberships", require("./routes/membershipRoutes")],
    ["/api/clubs", require("./routes/clubDashboardRoutes")],

    ["/api/events", require("./routes/eventRoutes")],
    ["/api/events", require("./routes/rsvpRoutes")],

    ["/api/chat", require("./routes/chatRoutes")],

    ["/api/notifications", require("./routes/notificationRoutes")],

    ["/api/announcements", require("./routes/announcementRoutes")],

    ["/api/committees", require("./routes/committeeRoutes")],

    ["/api/tasks", require("./routes/taskRoutes")],

    ["/api/task-comments", require("./routes/taskCommentRoutes")],

    ["/api/task-attachments", require("./routes/taskAttachmentRoutes")],

    ["/api/meetings", require("./routes/meetingRoutes")],

    ["/api/meeting-summaries", require("./routes/meetingSummaryRoutes")],

    ["/api/meeting-polls", require("./routes/meetingPollRoutes")],

    ["/api/meeting-recordings",require("./routes/meetingRecordingRoutes")],

    ["/api/activity", require("./routes/activityRoutes")],

    ["/api/dashboard", require("./routes/dashboardRoutes")],

    ["/api/analytics", require("./routes/analyticsRoutes")],

    ["/api/profile", require("./routes/profileRoutes")],

    ["/api/search", require("./routes/searchRoutes")],

    ["/api/upload", require("./routes/uploadRoutes")],

    ["/api/files", require("./routes/fileRoutes")],

    ["/media", require("./routes/mediaRoutes")],

    ["/api/pins", require("./routes/pinRoutes")],

    ["/api/stars", require("./routes/starRoutes")],

    ["/api/read", require("./routes/readRoutes")],

    ["/api/saved-messages", require("./routes/savedMessageRoutes")],

    ["/api/google", require("./routes/googleAuthRoutes")],

    ["/api/google-meet", require("./routes/googleMeetRoutes")],

    ["/api/reports", require("./routes/reportRoutes")],

    ["/api/export", require("./routes/exportRoutes")],

    ["/api/audit", require("./routes/auditRoutes")],

    ["/api/system", require("./routes/systemRoutes")],

    ["/api/admin", require("./routes/adminRoutes")],

    ["/health", require("./routes/healthRoute")]

];

routes.forEach(([path, router]) => {
    app.use(path, router);
});

// ======================================================
// Tus Upload
// ======================================================

app.use("/files", (req, res) => {
    tusServer.handle(req, res);
});

// ======================================================
// Root
// ======================================================

app.get("/", (req, res) => {

    res.json({

        success: true,

        service: "ClubPlanet Backend",

        status: "Running",

        environment:
            process.env.NODE_ENV,

        timestamp:
            new Date().toISOString()

    });

});

// ======================================================
// Error Handling
// ======================================================

app.use(notFound);

app.use(errorHandler);

module.exports = app;