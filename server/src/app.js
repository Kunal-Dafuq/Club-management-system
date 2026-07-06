const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const apiLimiter = require("./middleware/rateLimit");

const authRoutes = require("./routes/authRoutes");
const clubRoutes = require("./routes/clubRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const eventRoutes = require("./routes/eventRoutes");
const rsvpRoutes = require("./routes/rsvpRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const committeeRoutes = require("./routes/committeeRoutes");
const taskRoutes = require("./routes/taskRoutes");
const taskCommentRoutes = require("./routes/taskCommentRoutes");
const taskAttachmentRoutes = require("./routes/taskAttachmentRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const activityRoutes = require("./routes/activityRoutes");
const chatRoutes = require("./routes/chatRoutes");
const pinRoutes = require("./routes/pinRoutes");
const starRoutes = require("./src/routes/starRoutes");
const mediaRoutes=require("./src/routes/mediaRoutes");

const app = express();

/*Global Middleware*/

app.use(helmet());

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use(apiLimiter);

/*Static Files*/

app.use(
    "/uploads",
    express.static("uploads")
);

/*API Routes*/

app.use("/api/auth", authRoutes);

app.use("/api/clubs", clubRoutes);
app.use("/api/clubs", membershipRoutes);

app.use("/api/events", eventRoutes);
app.use("/api/events", rsvpRoutes);

app.use("/api/announcements", announcementRoutes);
app.use("/api/notifications", notificationRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/committees", committeeRoutes);

app.use("/api/tasks", taskRoutes);
app.use("/api/task-comments", taskCommentRoutes);
app.use("/api/task-attachments", taskAttachmentRoutes);

app.use("/api/meetings", meetingRoutes);

app.use("/api/activity", activityRoutes);

app.use("/api/pins", pinRoutes);

app.use("/api/stars",starRoutes);

app.use("/media",mediaRoutes);

/*Health Check*/

app.get("/", (req, res) => {
    res.send("ClubPlanet API Running 🚀");
});

module.exports = app;