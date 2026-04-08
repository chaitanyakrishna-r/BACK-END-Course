const express = require("express");
const app = express();
const path = require('path');
const session = require("express-session");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
cpmst
let port = 3000;




// // app.use((req,res)=>{
// //     console.log("request received");
// //     let code = "<h1>Fruits</h1><ul><li>apple</li><li>orange</li></ul>"
// //     res.send(code);
// // }) 


// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("singed cookie sent");
// })

// app.get("/verify",(req,res)=>{
//      console.log(req.signedCookies);
//      res.send("verifired");
// })

// app.get('/',(req,res)=>{
//     console.log(req.cookies);
//     res.send("Home")
// })

// app.get('/getcookies',(req,res)=>{
//     res.cookie("greet","Hello");
//     res.send("sent you some cookies!")
// })

// app.get('/greet',(req,res)=>{
//     const {name = "anonymous"} = req.cookies;
//     res.send(`hi ${name}! how are you `)
// })



// let code = "<h1>Fruits</h1><ul><li>apple</li><li>orange</li></ul>"
// app.get("/fruits",(req,res)=>{
//     res.send(code);
// })
// app.get("/apple",(req,res)=>{
//     res.send("hey i am apple");
// })
// app.get("/orange",(req,res)=>{
//     res.send("response from orange");
// })

// app.post("/",(req,res)=>{
//     res.send("you sent a post request to root");
// })

// app.get("/:username/:id",(req,res)=>{
//     let {username,id} = req.params;
//     res.send(`user name is ${username} and ${id}`);
// })

// app.get("/search",(req,res)=>{
//     let {q} = req.query;
//     res.send(`search results for query: ${q}`);
// })




// app.get("/reqcount",(req,res)=>{

//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`the Number request ${req.session.count}`);
// })
 
const sessionOption = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
}

//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(session(sessionOption));
app.use(flash());

//middleware - custome 
app.use((req,res,next)=>{
     res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register",(req,res)=>{
    const {name = "anonymous"}= req.query;
    if(name == "anonymous"){
        req.flash("error","user not registered");

    }else{
        req.flash("success","user registered successfully! ");
    }
    req.session.name = name;
    res.redirect('/hello');
})

app.get("/hello",(req,res)=>{
   
    res.render('page.ejs',{name : req.session.name });
})

app.listen(port, ()=>{
    console.log(`app is listening on ${port}`);
})
