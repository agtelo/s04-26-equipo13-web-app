const { generateContent } = require('../processor/content-generator');
const contentDraftSchema = require('../models/contentDraftModel');
const generationLogSchema = require('../models/generationLogModel');
const communityFeedSchema = require('../models/communityFeedmodel');

const GEMINI_KEY = process.env.GEMINI_API;

/**
 * Generates drafts using messages already saved in communityFeed
 * Does not collect messages, only generates content with existing data
 */
const generateDraftsFromExisting = async () => {
    const startedAt = new Date();
    const log = await generationLogSchema.create({ status: 'running', started_at: startedAt });

    try {
        console.log("Starting draft generation...");

        // 1. Get messages already saved in communityFeed
        const feedMessages = await communityFeedSchema.findAll({
            order: [['reactions', 'DESC']]
        });

        if (feedMessages.length === 0) {
            throw new Error("No messages in communityFeed. Run 'Collect Messages' first.");
        }

        console.log(`Using ${feedMessages.length} saved messages to generate drafts`);

        // 2. Convert data to format expected by generateContent
        const messages = feedMessages.map(msg => ({
            author: msg.user_name,
            content: msg.content,
            channel: msg.channel_name,
            date: msg.original_date,
            reactions: msg.reactions,
        }));

        // 3. Generate content with Gemini
        console.log("Generating content with Gemini...");
        const drafts = await generateContent(messages, GEMINI_KEY);

        // 4. Save drafts (replace previous ones)
        await contentDraftSchema.destroy({ truncate: true });

        const draftTypes = ['newsletter', 'twitter', 'bluesky', 'linkedin', 'reddit'];

        for (const type of draftTypes) {
            await contentDraftSchema.create({
                typeContent: type,
                content: drafts[type],
                message_count: messages.length,
                is_published: false,
            });
        }

        console.log("Drafts generated and saved");

        // 5. Update log to success
        await log.update({
            status: 'success',
            message_count: messages.length,
            finished_at: new Date(),
        });

        console.log("Generation completed successfully");

        return {
            success: true,
            messageCount: messages.length,
            message: "Drafts generated successfully",
        };

    } catch (error) {
        console.error("Error in generateDraftsFromExisting:", error.message);
        await log.update({
            status: 'error',
            error_msg: error.message,
            finished_at: new Date(),
        });
        throw error;
    }
};

module.exports = { generateDraftsFromExisting };
