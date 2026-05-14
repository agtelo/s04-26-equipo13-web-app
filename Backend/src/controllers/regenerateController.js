const { regenerateContent } = require("../processor/content-generator");

let GEMINI_API = process.env.GEMINI_API;

const VALID_TYPES = ["newsletter", "twitter", "reddit"];

const regenerate = async (req, res) => {

    const { messages, type } = req.body;
    
    if (!messages || !type) {

        return res.status(400).json({ message: "Se requieren 'messages' y 'type'" });
    }
    
    if (!VALID_TYPES.includes(type)) {

        return res.status(400).json({ message: `'type' debe ser uno de: ${VALID_TYPES.join(", ")}` });
    }
    
    try {

        const result = await regenerateContent(messages, GEMINI_API, type);
        res.json(result);

    } catch (error) {

       res.status(500).json({ error: error.message });
    }
}

module.exports = { regenerate };