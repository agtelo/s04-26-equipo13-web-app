const { regenerateContent } = require("../processor/content-generator");

let GEMINI_API = process.env.GEMINI_API;

const VALID_TYPES = ["newsletter", "twitter", "reddit"];

const regenerate = async (req, res) => {

    const { messages, type } = req.body;
    
    if (!messages || !type) {

        return res.status(400).json({ message: "The 'messages' and 'type' are required" });
    }
    
    if (!VALID_TYPES.includes(type)) {

        return res.status(400).json({ message: `'type' must be one of: ${VALID_TYPES.join(", ")}` });
    }
    
    try {

        const result = await regenerateContent(messages, GEMINI_API, type);
        res.json(result);

    } catch (error) {

       res.status(500).json({ error: error.message });
    }
}

module.exports = { regenerate };