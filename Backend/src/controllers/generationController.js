const { generateDraftsFromExisting } = require('../services/generationService');
const generationLogSchema = require('../models/generationLogModel');

const triggerGeneration = async (req, res) => {
    try {
        const result = await generateDraftsFromExisting();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            message: "Generation failed",
            error: error.message,
        });
    }
};

const getGenerationHistory = async (req, res) => {
    try {
        const history = await generationLogSchema.findAll({
            order: [['started_at', 'DESC']]
        });

        return res.status(200).json(history);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to load generation history",
            error: error.message,
        });
    }
};

module.exports = { triggerGeneration, getGenerationHistory };
