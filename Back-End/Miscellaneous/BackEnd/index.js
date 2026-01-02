const express = require("express");
const path = require("path");
const app = express();

const port = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.get("/register",(req,res)=>{
    let {user,password} = req.query;
    res.send(`Standard GET response, Welcomd ${user}!`);
})

app.post("/register",(req,res)=>{
    let {user,password} = req.body;
    res.send(`Standard POST response, Welcomd ${user}!`);
})