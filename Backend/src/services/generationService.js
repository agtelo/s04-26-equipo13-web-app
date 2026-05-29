const { collectMessagesFromAllChannels } = require('../collector/discord-collector');
const { generateContent } = require('../processor/content-generator');
const contentDraftSchema = require('../models/contentDraftModel');
const generationLogSchema = require('../models/generationLogModel');
const communityFeedSchema = require('../models/communityFeedmodel');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const GEMINI_KEY = process.env.GEMINI_API;

const runGeneration = async () => {

    const startedAt = new Date();

    const log = await generationLogSchema.create({ status: 'running', started_at: startedAt });

    try {

        // 1. Recolectar mensajes
        const messages = await collectMessagesFromAllChannels(DISCORD_TOKEN, GUILD_ID);

        // 2. Guardar community feed (top 15 por reacciones)
        await communityFeedSchema.destroy({ truncate: true });
        const sortedMessages = messages
            .filter(m => m.reactions > 0)
            .sort((a, b) => b.reactions - a.reactions)
            .slice(0, 15);


        for (const msg of sortedMessages) {
            await communityFeedSchema.create({
                user_name: msg.author,
                content: msg.content,
                channel_name: msg.channel || null,
                original_date: msg.date,
                reactions: msg.reactions,
                generation_id: log.id
            });
        }

        // 3. Generar contenido con Gemini
        const drafts = await generateContent(messages, GEMINI_KEY);

        // 4. Guardar drafts
        await contentDraftSchema.destroy({ truncate: true });

        const draftTypes = ['newsletter', 'twitter', 'bluesky'];

        for (const type of draftTypes) {
            await contentDraftSchema.create({
                typeContent: type,
                content: drafts[type],
                message_count: messages.length,
                is_published: false
            });
        }

        // 5. Actualizar log a success
        await log.update({ status: 'success', message_count: messages.length, finished_at: new Date() });

        return { success: true, messageCount: messages.length };

    } catch (error) {
        
        await log.update({ status: 'error', error_msg: error.message, finished_at: new Date() });
        throw error;
    }
};

module.exports = { runGeneration };