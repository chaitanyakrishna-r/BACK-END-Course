const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const methodOverride = require('method-override');




//middleware
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));


//view engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


let posts = [
    {
        id:"1a",
        username: "ckr",
        content: "I my india",
    },
    {
        id:"2a",
        username: "chay",
        content: "i love maths",
    },
    {
         id:"3a",
        username: "ck",
        content: "I love coding",
    },
]


app.get("/",(req, res)=>{
    res.send("This is Root");
})

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("newPost.ejs");
})

app.post("/posts",(req,res)=>{
    let {username, content} = req.body;

    posts.push(
        {
            username:username,
            content: content,
            id:Date.now().toString(),
        })

    res.redirect("/posts");//by defeaut this will sent get request
})



//view posts or individual post
app.get("/posts/:id",(req,res)=>{
   let {id} = req.params;

   let post = posts.find(post => post.id === id);
   res.render("show.ejs",{post});
})

//edit post
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find(post => post.id === id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("edit.ejs",{post});
})


//delete/ destroy
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})





//server
app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})