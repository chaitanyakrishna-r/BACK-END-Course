const express = require("express");
const app = express();
const port = 8080; 
const path = require("path");
const { v4 : uuidv4 } = require('uuid');
const methodOverride = require('method-override');



app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

let posts = [
    {
        username:"ckr",
        id:uuidv4(),
        content: "I love coding!",
    },
    {
        username:"adam",
        id:uuidv4(),
        content: "i am from america",
    },
    {
        username:"eva",
        id:uuidv4(),
        content: "hey! guy how are you",
    },
    {
        username:"neha",
        id:uuidv4(),
        content: "i have studied in iitd",
    }, 
]
app.use(express.urlencoded({extended:true}));
app.use(express.json())


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req, res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username, content} = req.body;
    // let id =uuidv4();
    console.log(username,content);
    posts.push({username,content,id:uuidv4()});
    res.redirect("/posts")
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>p.id === id)
    post.content = newContent;
    console.log(post)
    res.redirect("/posts");
})

// to edit
// app.patch("/posts/:id", (req, res) => {
//     const { id } = req.params;
//     const post = posts.find(p => p.id === id);

//     if (!post) {
//         return res.status(404).send("Post not found");
//     }

//     post.content = req.body.content;
//     res.redirect("/posts");
// });

app.get("/posts/:id",(req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id ===p.id);
    res.render("show.ejs",{post});
    // res.send("request working");
})

//edit request
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>p.id === id);
    res.render("edit.ejs",{post});
})
//delete 
app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    posts = posts.filter((p)=>p.id !== id);
    console.log(posts);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`listening in the port ${port}`)
});