const { Schema } = require("mongoose");
const connections = require("../../config/connection");

const ScreenshotSchema = new Schema(
    {
        webViewLink: {
            type: String,
            required: true
        }
    },
    {
        collection: "Screenshots",
        versionKey: false
    }
);

module.exports = connections.model("ScreenshotModel", ScreenshotSchema);
