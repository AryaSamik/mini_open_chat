const mongoose = require("mongoose");
// const { stringify } = require("querystring");
// DONT KNOW FROM WHERE THIS STATEMENT WAS ADDED

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        maxLength: 50,
    },
    created_at: {
        type: Date,
        required: true
    }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;