const { publishTweet } = require("../publisher/twitter-publisher");
const { publishPost } = require("../publisher/reddit-publisher");

const publishTwitter = async (req, res) => {

    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: "The content is required" });
    }

    try {

        const result = await publishTweet(content);
        res.json({ success: true, ...result });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const publishReddit = async (req, res) => {

    const { subreddit, title, content } = req.body;

    if (!subreddit || !title || !content) {
        return res.status(400).json({ message: "The 'subreddit', 'title', and 'content' are required" });
    }

    try {

        const result = await publishPost(subreddit, title, content);
        res.json({ success: true, ...result });

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};

module.exports = { publishTwitter, publishReddit};