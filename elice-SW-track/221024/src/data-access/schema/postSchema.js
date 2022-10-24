const { Schema } = require("mongoose");

const postSchema = Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
    },
    {
        collection: "Post",
        timestamps: true,
        versionKey: false,
    }
);

module.exports = postSchema;
