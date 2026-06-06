// Main backend file - Initializes server, configures routes, and schedules weekly tasks
require("dotenv").config();

const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

// Import services
const { collectAndSaveMessages } = require('./services/collectionService');
const { generateDraftsFromExisting } = require('./services/generationService');

// Import routes
const userRoutes = require("./routes/userRoutes");
const regenerateRoutes = require("./routes/regenerateRoutes");
const publishRoutes = require("./routes/publishRoutes");
const draftRoutes = require("./routes/draftRoutes");
const generationRoutes = require("./routes/generationRoutes");
const communityFeedRoutes = require("./routes/communityFeedRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const linkedinRoutes = require('./routes/linkedinRoutes');

// Import LinkedIn OAuth config
require('./config/linkedin');

// Import database
const sequelize = require("./config/database");

// Environment variables
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

// Create Express app
const app = express();

// Configure middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true // Allow credentials (cookies) for CORS
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure sessions for passport/OAuth (MUST be before passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: true, // Allow uninitialized sessions for OAuth state
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax', // Required for OAuth redirects
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport (MUST be after session)
app.use(passport.initialize());
app.use(passport.session());

// Register routes
app.use("/user", userRoutes);
app.use("/api", publishRoutes);
app.use("/generation", generationRoutes);
app.use("/drafts", draftRoutes);
app.use("/api", regenerateRoutes);
app.use("/community-feed", communityFeedRoutes);
app.use("/collection", collectionRoutes);
app.use("/api", linkedinRoutes);

// Start server
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Successfully connected to database");

        await sequelize.sync({ alter: true });
        console.log("Database tables synchronized");

        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Error connecting to database:", error);
    }
}

startServer();

// ============================================
// CRON JOB: Collect messages every Friday
// ============================================
// Syntax: "minutes hours day month day_of_week"
// 0 16 * * 5 = Friday at 16:00
cron.schedule("0 16 * * 5", async () => {
    console.log("\n========== Scheduled Task: Message Collection ==========");
    console.log("Time: Friday at 16:00");
    console.log("=====================================================\n");

    try {
        await collectAndSaveMessages();
        console.log("Message collection completed\n");

    } catch (error) {
        console.error("Error in collection cron job:", error.message);
    }
});

// ============================================
// CRON JOB: Generate drafts every Friday
// ============================================
// 30 minutes after collection
cron.schedule("30 16 * * 5", async () => {
    console.log("\n========== Scheduled Task: Draft Generation ==========");
    console.log("Time: Friday at 16:30 (30 minutes after collection)");
    console.log("=====================================================\n");

    try {
        await generateDraftsFromExisting();
        console.log("Draft generation completed\n");

    } catch (error) {
        console.error("Error in generation cron job:", error.message);
    }
});

console.log("\nScheduled tasks configured:");
console.log("  Friday 16:00 - Collect messages from Discord");
console.log("  Friday 16:30 - Generate drafts with Gemini\n");
