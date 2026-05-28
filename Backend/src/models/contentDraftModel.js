const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const contentDraftSchema = sequelize.define('Content', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    typeContent: {
        type: DataTypes.ENUM('newsletter', 'twitter', 'bluesky')
    },
    content: {
        type: DataTypes.TEXT
    },
    is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    message_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: true
});

module.exports = contentDraftSchema;