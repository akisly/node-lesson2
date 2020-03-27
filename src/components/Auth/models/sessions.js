const { Schema, ObjectId } = require("mongoose");
const connections = require("../../../config/connection");

const SessionsSchema = new Schema(
    {
        userId: {
            type: ObjectId,
            required: true
        },
        refreshToken: {
            type: String,
            required: true
        },
        "user-agent": {
            type: String
        },
        expiresIn: {
            type: Date
        },
        createdAt: {
            type: Date
        }
    },
    {
        collection: "sessions",
        versionKey: false
    }
);

module.exports = connections.model("SessionsModel", SessionsSchema);
