const { generateContent } = require('../processor/content-generator');
const contentDraftSchema = require('../models/contentDraftModel');
const generationLogSchema = require('../models/generationLogModel');
const communityFeedSchema = require('../models/communityFeedmodel');
const { runGeneration } = require('../services/generationService');
const { collectMessagesFromAllChannels } = require('../collector/discord-collector');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
//const CHANNEL_ID = process.env.DISCORD_GUILD_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const GEMINI_KEY = process.env.GEMINI_API;

const triggerGeneration = async (req, res) => {

    try {
        const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
        const GUILD_ID = process.env.DISCORD_GUILD_ID;
        const messages = await collectMessagesFromAllChannels(DISCORD_TOKEN, GUILD_ID);
        const result = await runGeneration(messages, process.env.GEMINI_API);

        return res.status(200).json({ message: "Generation completed", logs: result });

    } catch (error) {

        return res.status(500).json({ message: "Generation failed", error: error.message });
    }
};

const getGenerationHistory = async (req, res) => {

    try {
        //Obtenemos el historial de generación ordenado por fecha de creación descendente
        const history = await generationLogSchema.findAll({
            order: [['started_at', 'DESC']]
        });

        //Devolvemos el historial como respuesta JSON
        return res.status(200).json(history);

    } catch (error) {

        return res.status(500).json({ message: "Failed to load generation history", error: error.message });
    }
};

module.exports = { triggerGeneration, getGenerationHistory };