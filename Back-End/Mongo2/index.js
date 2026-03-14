const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 8080;
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

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
app.use(methodOverride("_method"));

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


// create route
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


//edit route
app.get("/chats/:id/edit",async(req,res) =>{
  let {id} = req.params;
  const editChat = await Chat.findById(id);
  res.render("edit.ejs",{editChat});
})

//update route
app.put("/chats/:id", async(req,res)=>{
  let {id} = req.params;
  let {newMessage} = req.body;
 
   const updatedChat = await Chat.findByIdAndUpdate(
    id,
    {message : newMessage},
    {runValidators: true, new : true},
  );
  // console.log(updatedChat);
  res.redirect("/chats")

})


//destory route
app.delete("/chats/:id", async(req,res)=>{
  const {id} = req.params;
  const deleteChat = await Chat.findByIdAndDelete(id);
  console.log(deleteChat);
  res.redirect("/chats");
})

//destory all route
app.delete("/chats", async(req,res)=>{
  await Chat.deleteMany({});
  res.redirect("/chats");
  
})

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});

