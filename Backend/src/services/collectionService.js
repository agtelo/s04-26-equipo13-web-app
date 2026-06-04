const { collectMessagesFromAllChannels } = require('../collector/discord-collector');
const communityFeedSchema = require('../models/communityFeedmodel');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

/**
 * Collects messages from Discord and saves them to communityFeed table
 * Executes automatically every Friday OR manually when user clicks Refresh
 */
const collectAndSaveMessages = async () => {
    try {
        console.log("Starting Discord message collection...");

        // 1. Collect messages from all channels
        const messages = await collectMessagesFromAllChannels(DISCORD_TOKEN, GUILD_ID);
        console.log(`Successfully collected ${messages.length} messages`);

        if (messages.length === 0) {
            console.log("No new messages found to save");
            return { 
                success: true, 
                messageCount: 0, 
                message: "No new messages" 
            };
        }

        // 2. Filter top 15 by reactions
        const sortedMessages = messages
            .filter(m => m.reactions > 0)
            .sort((a, b) => b.reactions - a.reactions)
            .slice(0, 15);

        console.log("Filtered top 15 messages by reactions");

        // 3. Clear the table (only if there are new messages)
        await communityFeedSchema.destroy({ truncate: true });
        console.log("Cleared community feed table");

        // 4. Save new messages
        for (const msg of sortedMessages) {
            await communityFeedSchema.create({
                user_name: msg.author,
                content: msg.content,
                channel_name: msg.channel || null,
                original_date: msg.date,
                reactions: msg.reactions,
                generation_id: null,
            });
        }

        console.log(`Saved ${sortedMessages.length} messages to communityFeed`);

        return {
            success: true,
            messageCount: sortedMessages.length,
            message: "Messages collected and saved successfully",
        };

    } catch (error) {
        console.error("Error in collectAndSaveMessages:", error.message);
        throw error;
    }
};

module.exports = { collectAndSaveMessages };
