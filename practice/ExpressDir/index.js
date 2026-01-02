const express = require("express");// we are requring express
const app = express();//here express is a funtion and it is store in app which make app


// console.dir(app);

let port = 3000;


app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
});

// app.use((req, res)=>{
//     // console.log(req);
//     let code = "<h1>This is Header </h1> <ul><li>fruits</li><li>vegetables</li></ul>"
    
//     console.log("request received");
//     res.send(code);
// }) 

app.get("/",(req, res)=>{  
    res.send("This is Home section, Hello")
})

app.get("/:username/:id",(req, res)=>{

    let {username, id} = req.params;
   

    let htmlStr =`<h1>Welcome to the page of @${username}</h1>`;
    res.send(htmlStr);
})

app.get("/search",(req, res)=>{
    let {q} = (req.query);
    if(!q){
        res.send("<h1>Nothing Searched</h1>")
    }
    res.send(`search result for ${q}`);
})