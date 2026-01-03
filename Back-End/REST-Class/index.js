const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})

app.use(express.static(path.join(__dirname,"/public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));