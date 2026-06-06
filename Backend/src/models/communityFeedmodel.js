const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const communityFeedSchema = sequelize.define('CommunityFeed', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    channel_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    original_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    reactions: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
},
{
    timestamps: true
});

module.exports = communityFeedSchema;