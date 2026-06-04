const { collectAndSaveMessages } = require('../services/collectionService');

/**
 * Endpoint to collect messages manually (when user clicks Refresh button)
 */
const triggerCollection = async (req, res) => {
    try {
        console.log("Collection request received from Frontend");
        const result = await collectAndSaveMessages();
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error in triggerCollection:", error.message);
        return res.status(500).json({
            message: "Collection failed",
            error: error.message,
        });
    }
};

module.exports = { triggerCollection };
