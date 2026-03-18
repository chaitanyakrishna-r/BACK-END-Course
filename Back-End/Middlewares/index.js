const express = require('express');
const app = express();
const port = 8080;

//middleware
// app.use((req, res,next)=>{
//     // const{query} = req.query;
//     console.log("I am middleware 1");
//    return next();
    
// })

// app.use((req, res,next)=>{
//     // const{query} = req.query;
//     console.log("I am middleware 2");
//     next();
    
// })

//utility middleware - logger function

app.use((req,res,next)=>{
    req.time = Date.now()
    console.log(req.method, req.hostname, req.path, req.time);
    return next();
})

 app.use("/random", (req, res, next)=>{
    console.log("Im middleware from random path");
    next()
 })


const checkToken = ("/api",(req, res, next)=>{
    console.log(req.query.token);
    const token = req.query.token;
    if(token === "givenaccess"){
        next();
    }
    res.send("ACCESS DENIED!");

})

app.get("/",checkToken,(req, res)=>{
    res.send("I am root.");
})

app.get("/api",(req, res)=>{
    res.send("data");
})

app.get("/random",(req, res)=>{
    res.send("random page");
})


//404 
app.use((req, res)=>{
    res.send("Page not found!");
})

app.listen(port, ()=>{
    console.log(`Server is listening at Port ${port}`);
})