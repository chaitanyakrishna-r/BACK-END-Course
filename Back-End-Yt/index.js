require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT;
console.log(port,"port");

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
})
