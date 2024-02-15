const mongoose = require("mongoose");
// const { stringify } = require("querystring");
// DONT KNOW FROM WHERE THIS STATEMENT WAS ADDED

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: [true, 'username already exists']
    },
    phone: {
        type: String,
        maxLength: 10,
        minLength: 10,
        required: true
    },

});

const User = mongoose.model("User", userSchema);

module.exports = User;