const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 8080;
const Chat = require("./models/chat.js");

//mongoose

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send("home page");
});

//index route

app.get("/chats", async (req, res) => {
  try {
    const chats = await Chat.find({});
    console.log(chats.length);
    res.render("index.ejs", { chats });
    // res.send("heelo")
  } catch (err) {
    console.log(err);
  }
});

//new route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});


creat route
app.post("/chats", async(req, res) => {
    try{
        let { from, to, message } = req.body;
        const chat =  new  Chat({
        from: from,
        to: to,
        message: message,
        create_at: Date.now(),
  });
     await chat.save()
   
    res.redirect("/chats");
  } catch(err){
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});

