
//THIS FILE IS JUST TO ADD DOCUMENTS TO THE COLLECTIONS
//SO IT IS RUN ONLY WHEN SAMPLE DATA IS TO BE ADDED TO THE COLLECTION

const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
require("dotenv").config();

main()
.then(() => {
    console.log("connection succesful");
}).catch(err => console.log(err));

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    // await mongoose.connect('mongodb+srv://aryasamik:gYtEKjVPNYCxlDAg@cluster0.a2eswrk.mongodb.net/?retryWrites=true&w=majority');
    await mongoose.connect(process.env.MONGO_URI);
};

let allChats = [
    {
        from: "neha",
        to: "priya",
        msg: "send me exam sheets",
        created_at: new Date()
    },
    {
        from: "rohit",
        to: "mohit",
        msg: "teach me js callbacks",
        created_at: new Date()
    },
    {
        from: "amit",
        to: "sumit",
        msg: "all the best!",
        created_at: new Date()
    },
    {
        from: "anita",
        to: "ramesh",
        msg: "bring me some fruits",
        created_at: new Date()
    },
    {
        from: "tony",
        to: "morgan",
        msg: "i love you 3000",
        created_at: new Date()
    },
];

Chat.insertMany(allChats);