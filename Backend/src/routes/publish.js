const express = require("express");
const { publishTweet } = require("../publisher/twitter-publisher");
const { publishPost } = require("../publisher/reddit-publisher");

const router = express.Router();

router.post("/publish/twitter", async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: "Se requiere 'content'" });
    }

    try {
        const result = await publishTweet(content);
        res.json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/publish/reddit", async (req, res) => {
    const { subreddit, title, content } = req.body;

    if (!subreddit || !title || !content) {
        return res.status(400).json({ error: "Se requieren 'subreddit', 'title' y 'content'" });
    }

    try {
        const result = await publishPost(subreddit, title, content);
        res.json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
