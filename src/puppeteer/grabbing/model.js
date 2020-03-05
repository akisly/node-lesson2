const { Schema } = require("mongoose");
const connections = require("../../config/connection");

const GrabbingSchema = new Schema(
    {
        emails: {
            type: Array,
            required: true
        }
    },
    {
        collection: "GrabbingEmails",
        versionKey: false
    }
);

module.exports = connections.model("GrabbingModel", GrabbingSchema);
