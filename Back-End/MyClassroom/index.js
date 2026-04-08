const express = require('express');
const app = express();
const port = 3001;
const cookieParser = require("cookie-parser");
const session = require("express-session");

//middleware
app.use(cookieParser("secretcode"));


//session
const sessionOption ={
    secret:"mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie:{
        experies: Date.now()+7 * 24 * 60 * 60 *1000,
        maxAge:7 * 24 * 60 * 60 *1000,
        htmlOnly: true,
    }
}

app.use(session(sessionOption));

app.get('/',(req,res)=>{
    res.send("home page");
})

app.get('/getcookies',(req,res)=>{
    res.cookie("name","chaitanya");
    res.cookie("made_in","India",{signed: true});
    res.send("getting cookies")
})


app.get('/verifycookies',(req,res)=>{
    console.log(req.cookies);
    console.log(req.cookies.name);
    console.log(req.signedCookies.made_in);
})










app.listen(port,()=>{
    console.log("listeing at the port 3001");
})