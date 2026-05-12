const express = require("express");
const { collectMessages } = require("../collector/discord-collector");
const { generateContent } = require("../processor/content-generator");
const { DISCORD_TOKEN, DISCORD_CHANNEL_ID, GEMINI_API } = require("../config");

const router = express.Router();

router.post("/generate", async (req, res) => {
    try {
        const messages = await collectMessages(DISCORD_TOKEN, DISCORD_CHANNEL_ID);
        const drafts = await generateContent(messages, GEMINI_API);
        res.json({ messages, drafts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
