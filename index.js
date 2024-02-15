const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const User = require("./models/user.js");
var methodOverride = require('method-override');
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));//to be able to access the contents parsed through url in post request from the form
app.use(methodOverride('_method'));

main() 
.then(() => {
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    // await mongoose.connect('mongodb+srv://aryasamik:gYtEKjVPNYCxlDAg@cluster0.a2eswrk.mongodb.net/?retryWrites=true&w=majority');
    await mongoose.connect(process.env.MONGO_URI);
};

// let chat1 = new Chat({
//     from: "neha",
//     to: "priya",
//     msg: "send me exam sheets",
//     created_at: new Date()
// });

// chat1.save().then(res => {
//     console.log(res);//time in UTC form
// }).catch((err) => {
//     console.log(err);
// });

app.listen("8080", () => {
    console.log("server is listening on 8080");
});

app.get("/" , (req, res) => {
    res.render("root.ejs");
});

app.get("/users/new", (req, res) => {
    res.render("signup.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/login/verify", async (req, res) => {
    // console.log(req.query.username);
    let user = await User.find({username: req.query.username});
    // console.log(user[0]);
    // res.send(user[0]);
    if(user[0]){
        let chats = await Chat.find({from: req.query.username});
        // res.render("index.ejs", {chats});
        res.redirect(`/${req.query.username}/chats`);
    }
    else{
        res.send("no such username");
    }
});

app.get("/users", async (req, res) => {
    // console.log(req.body);
    if(req.params.username){
        let chats = await Chat.find({from : req.params.username});
        res.render("index.ejs", {chats});
    }
    else{
        let users = await User.find();
        res.render("users.ejs", {users});
    }
});

app.post("/users", async (req, res) => {
    let newUser = req.body;
    // console.log(newUser);
    let user = new User({
        name: req.body.name,
        username: req.body.username,
        phone: req.body.phone
    });

    await user.save().then(res => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
        // prompt("username or phone already in use");
    });

    res.redirect("/users");
});

app.get("/:username/chats", async (req, res) => {
    // console.log(req.params.id);
    // let user = await User.find({username: req.params.username});
    // console.log(user[0].username);
    let chats = await Chat.find({from : req.params.username});
    // console.log(chats);
    if(chats[0]){
        res.render("index.ejs", {chats});
    }
    else{
        res.send(`No chats available for user ${req.params.username}`);
    }
});

app.get("/chats", async (req, res) => {
    let chats = await Chat.find(); //find() is an async function so we use await
    // console.log(chats); 
    res.render("index.ejs", {chats});
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/chats", (req, res) => {
    let newChat = req.body;
    console.log(newChat);
    let chat = new Chat({
        from: req.body.from,
        to: req.body.to,
        msg: req.body.msg,
        created_at: new Date()
    });

    chat.save().then(res => {
        console.log(res);//time in UTC form
    }).catch((err) => {
        console.log(err);
    });

    res.redirect("/chats");
});

app.get("/chats/:id/update", async (req, res) => {
    let id = req.params.id;
    let chat = await Chat.find({_id: id});
    chat = chat[0];
    res.render("update.ejs", { chat });
});

app.patch("/chats/:id", (req, res) => {
    let id = req.params.id;
    let new_msg = req.body.msg;
    Chat.updateOne({_id: id}, {msg: new_msg})
    .then((res) => {
        console.log(res);
    }). catch ((err) => {
        console.log(err);
    });
    res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
    let id = req.params.id;
    await Chat.findByIdAndDelete(id)
    .then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
});