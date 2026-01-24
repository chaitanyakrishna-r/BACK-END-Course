const express = require("express");
const app = express();

let port = 3000;

app.listen(port, ()=>{
    console.log(`app is listening on ${port}`);
})

app.use((req,res)=>{
    console.log("request received");
    let code = "<h1>Fruits</h1><ul><li>apple</li><li>orange</li></ul>"
    res.send(code);
}) 


let code = "<h1>Fruits</h1><ul><li>apple</li><li>orange</li></ul>"
app.get("/fruits",(req,res)=>{
    res.send(code);
})
app.get("/apple",(req,res)=>{
    res.send("hey i am apple");
})
app.get("/orange",(req,res)=>{
    res.send("response from orange");
})

app.post("/",(req,res)=>{
    res.send("you sent a post request to root");
})

app.get("/:username/:id",(req,res)=>{
    let {username,id} = req.params;
    res.send(`user name is ${username} and ${id}`);
})

app.get("/search",(req,res)=>{
    let {q} = req.query;
    res.send(`search results for query: ${q}`);
})