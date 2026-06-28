const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const clubRoutes = require("./routes/clubRoutes");
const eventRoutes = require("./routes/eventRoutes");
const rsvpRoutes = require("./routes/rsvpRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const app = express();
const helmet = require("helmet");
const apiLimiter = require("./middleware/rateLimit");
const uploadRoutes = require("./routes/uploadRoutes");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/clubs", membershipRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/events",rsvpRoutes);
app.use("/api/notifications" , notificationRoutes);
app.use("/api/announcements", announcementRoutes);
app.use(helmet());
app.use(apiLimiter);
app.use("/api/activity",require("./routes/activityRoutes"));
app.use("/api/upload", uploadRoutes);
app.get("/", (req, res) => 
  {res.send("API running");
});

module.exports = app;