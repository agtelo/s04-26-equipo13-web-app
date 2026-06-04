const { json } = require("sequelize");
const contentDraftModel = require("../models/contentDraftModel");
const { regenerateDraftFromContent } = require("../processor/content-generator");

/**
 * Get all drafts with optional filter by published status
 * Query params: ?published=true or ?published=false
 */
const getAllDrafts = async (req, res) => {
    try {
        const { published } = req.query;
        
        let options = {
            order: [["createdAt", "DESC"]]
        };
        
        // Filter by published status if provided
        if (published !== undefined) {
            options.where = { is_published: published === 'true' };
        }
        
        const drafts = await contentDraftModel.findAll(options);
        return res.status(200).json(drafts);

    } catch(error) {
        return res.status(500).json({
            message: "Failed to load drafts",
            error: error.message
        });
    }
};

const getDraftById = async (req, res) => {
    const { id } = req.params;

    try {
        const draft = await contentDraftModel.findByPk(id);

        if(!draft) {
            return res.status(404).json({message: "Draft not found"});
        }

        return res.status(200).json(draft);

    } catch(error) {
        return res.status(500).json({
            message: "Failed to load draft",
            error: error.message
        });
    }
};

const updateDraft = async (req, res) => {
    const { id } = req.params;
    const { content, is_published } = req.body;

    if (!content && is_published === undefined) {
        return res.status(400).json({ 
            message: "Either 'content' or 'is_published' is required" 
        });
    }

    try {
        const draft = await contentDraftModel.findByPk(id);

        if(!draft) {
            return res.status(404).json({message: "Draft not found"});
        }

        const updateData = {};

        if (content !== undefined) {
            updateData.content = content;
        } 

        if (is_published !== undefined) {
            updateData.is_published = is_published;
        } 

        await draft.update(updateData);

        return res.status(200).json({
            message: "Draft updated successfully",
            draft
        });

    } catch(error) {
        return res.status(500).json({
            message: "Failed to update draft",
            error: error.message
        });
    }
};

const deleteDraft = async (req, res) => {
    const { id } = req.params;

    try {
        const draft = await contentDraftModel.findByPk(id);

        if(!draft) {
            return res.status(404).json({message: "Draft not found"});
        }

        await draft.destroy();

        return res.status(200).json({
            message: "Draft deleted successfully"
        });

    } catch(error) {
        return res.status(500).json({
            message: "Failed to delete draft",
            error: error.message
        });
    }
};

const regenerateDraft = async (req, res) => {
    const { id } = req.params;

    try {
        const draft = await contentDraftModel.findByPk(id);

        if(!draft) {
            return res.status(404).json({message: "Draft not found"});
        }

        const result = await regenerateDraftFromContent(
            draft.content,
            process.env.GEMINI_API,
            draft.typeContent
        );

        const newContent = result[draft.typeContent];

        await draft.update({ content: newContent });

        return res.status(200).json({
            message: "Draft regenerated successfully",
            draft
        });

    } catch(error) {
        return res.status(500).json({
            message: "Failed to regenerate draft",
            error: error.message
        });
    }
};

module.exports = { 
    getAllDrafts,
    getDraftById,
    updateDraft,
    deleteDraft,
    regenerateDraft
};