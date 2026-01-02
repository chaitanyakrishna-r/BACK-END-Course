const express = require("express");
const app = express();
const port = 8080;

app.listen(port, ()=>{
    console.log(`listening at port ${port}`)
})

app.get("/cards",(req,res)=>{
    console.log(req.body);
    res.send("get request is working");
})