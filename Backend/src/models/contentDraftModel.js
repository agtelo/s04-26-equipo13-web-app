const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const contentDraftSchema = sequelize.define('Content', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    typeContent: {
        type: DataTypes.ENUM
    },
    content: {
        type: DataTypes.TEXT
    },
    is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    timestamps: true
});

module.exports = contentDraftSchema;