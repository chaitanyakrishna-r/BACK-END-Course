const express = require("express");
const path = require ("path");
const app = express();

const port = 3000;

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"/public/js")));
app.use(express.static(path.join(__dirname,"/public/css")));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
}) 
app.get("/rolldice",(req, res)=>{
    let diceVal = Math.floor(Math.random()*6 + 1);
    res.render("rolldice.ejs",{num:diceVal});
})

app.get("/ig/:username",(req, res)=>{
    let {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data){
         res.render("insta.ejs",{data : instaData[username]});
    }else{
        res.render("error");
    }
   
})


app.get("/",(req, res)=>{
    res.render("home.ejs");
})