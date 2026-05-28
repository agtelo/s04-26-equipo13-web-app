const { DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const generationLogSchema = sequelize.define("GenerationLog", {
    status: {
        type: DataTypes.ENUM("success", "error", "running"),
        allowNull: false,
        defaultValue: "success"
    },
    message_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    error_msg: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    started_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    finished_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: false
});

module.exports = generationLogSchema;