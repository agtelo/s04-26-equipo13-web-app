const { json } = require("sequelize");
const communityFeedModel = require('../models/communityFeedModel');

const getCommunityFeed = async (req, res) => {

    try {

        const feed = await communityFeedModel.findAll({
            
            order: [['reactions', 'DESC']]
        });

        return res.status(200).json(feed);

    } catch (error) {

        return res.status(500).json({ message: "Failed to load community feed", error: error.message });
    }
};

module.exports = { getCommunityFeed };