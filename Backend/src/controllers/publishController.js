const { publishTweet } = require("../publisher/twitter-publisher");
const { publishPost } = require("../publisher/reddit-publisher");
const { Bluesky } = require("../publisher/bluesky-publisher");
const { publishEmail } = require("../publisher/email-publisher");
const { publishLinkedIn } = require("../publisher/linkedin-publisher");

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

const publishBluesky = async (req, res) => {

    const { content } = req.body;

    if(!content){
        return res.status(400).json({ message: "The content is required" });
    }

    try{

        const result = await Bluesky(content);

        return res.status(200).json({ success: true, ...result });

    } catch(error){

        return res.status(500).json({ error: error.message });
    }
};

const publishNewsletter = async (req, res) => {

    const { to, subject, htmlContent } = req.body;

    if(!to || !htmlContent){

        return res.status(400).json({ message: "The 'to' and 'htmlContent' fields are required" });
    }

    try{
        const result = await publishEmail(to, subject, htmlContent);

        return res.status(200).json({ success: true, ...result });

    } catch (error) {

        return res.status(500).json({ error: error.message });
    }
};

const publishLinkedInPost = async (req, res) => {

    const { content, accessToken } = req.body;

    if(!content){
        return res.status(400).json({ message: "The 'content' is required" });
    }

    try{
        // Use personId from environment if not provided
        const personId = process.env.LINKEDIN_USER_ID;

        if (!personId || personId === 'tu_user_id_aqui') {
            return res.status(400).json({
                message: "LinkedIn User ID not configured. Update LINKEDIN_USER_ID in .env with your LinkedIn Personal ID"
            });
        }

        // If no accessToken provided, return helpful error
        if (!accessToken) {
            return res.status(401).json({
                message: "LinkedIn authentication required. Please authenticate with LinkedIn first using /api/auth/linkedin",
                requiresAuth: true
            });
        }

        const result = await publishLinkedIn(content, accessToken, personId);

        return res.status(200).json({ success: true, ...result });

    } catch(error){

        return res.status(500).json({ error: error.message });
    }
};

module.exports = { publishTwitter, publishReddit, publishBluesky, publishNewsletter, publishLinkedInPost };