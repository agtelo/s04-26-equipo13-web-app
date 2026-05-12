const express = require("express");
const { regenerateContent } = require("../processor/content-generator");
const { GEMINI_API } = require("../config");

const router = express.Router();

const VALID_TYPES = ["newsletter", "twitter"];

router.post("/regenerate", async (req, res) => {
    const { messages, type } = req.body;

    if (!messages || !type) {
        return res.status(400).json({ error: "Se requieren 'messages' y 'type'" });
    }

    if (!VALID_TYPES.includes(type)) {
        return res.status(400).json({ error: `'type' debe ser uno de: ${VALID_TYPES.join(", ")}` });
    }

    try {
        const result = await regenerateContent(messages, GEMINI_API, type);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
