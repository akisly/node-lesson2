const { Schema } = require("mongoose");
const connections = require("../../../config/connection");

const RegisterUserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        collection: "systemusers",
        versionKey: false
    }
);

module.exports = connections.model("RegisterUserModel", RegisterUserSchema);
