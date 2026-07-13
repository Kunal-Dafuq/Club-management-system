const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");

const apiLimiter = require("./middleware/rateLimit");

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
const errorHandler = require("./middleware/errorHandler");
const googleAuthRoutes = require("./routes/googleAuthRoutes");
const meetingSummaryRoutes = require("./routes/meetingSummaryRoutes");
const meetingPollRoutes = require("./routes/meetingPollRoutes");

const tusServer = require("./config/tus");

const app = express();

app.use(helmet());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use(errorHandler);

app.use(apiLimiter);

app.use((req,res,next)=>{
    req.io = app.get("io");
    next();
});

app.use(
    "/uploads",
    express.static(
        path.join(__dirname,"../uploads")
    )
);

app.use("/media",mediaRoutes);

app.use("/api/auth",authRoutes);

app.use("/api/clubs",clubRoutes);
app.use("/api/clubs",membershipRoutes);

app.use("/api/events",eventRoutes);
app.use("/api/events",rsvpRoutes);

app.use("/api/announcements",announcementRoutes);
app.use("/api/notifications",notificationRoutes);

app.use("/api/upload",uploadRoutes);

app.use("/api/chat",chatRoutes);

app.use("/api/committees",committeeRoutes);

app.use("/api/tasks",taskRoutes);
app.use("/api/task-comments",taskCommentRoutes);
app.use("/api/task-attachments",taskAttachmentRoutes);

app.use("/api/meetings",meetingRoutes);

app.use("/api/activity",activityRoutes);

app.use("/api/pins",pinRoutes);

app.use("/api/stars",starRoutes);

app.use("/api/search",searchRoutes);

app.use("/api/saved-messages",savedMessageRoutes);

app.use("/api/read",readRoutes);

app.use("/api/google",googleAuthRoutes);

app.use("/api/meeting-summary",meetingSummaryRoutes);

app.use("/api/meeting-polls",meetingPollRoutes);

app.all("/files/*",(req,res)=>{
    tusServer.handle(req,res);
});

app.get("/", (req, res) => {
    res.send("ClubPlanet API Running 🚀");
});

app.all("/files/*", (req, res) => {
    tusServer.handle(req, res);
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;