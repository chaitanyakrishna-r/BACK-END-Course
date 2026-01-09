const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express  = require("express");
const path = require("path");
const methodOverride = require('method-override');
const port = "8080";
const app = express();
const { v4: uuidv4 } = require("uuid");



app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

//middlewares
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));


//to create connection between node and mysql
const connection  = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'delta_app',
    password:" "
});


// const id = uuidv4();
// console.log(id);


app.get('/',(req, res)=>{
    let q = "SELECT count(*) FROM user";
    try{
        connection.query(q,(err,result)=>{
            if (err) throw err;
             let totalUsers = result[0]["count(*)"];
             console.log(totalUsers);
            res.render("home.ejs",{totalUsers});
            
        });
    }catch(err){
        res.send("some error was found");
        console.log("Some Error Occured!");
    }
   
})

//show users

app.get("/users",(req,res)=>{
    let q = "SELECT id, username, email FROM user"
    try{
        connection.query(q,(err, result)=>{
            if(err) throw err;
            res.render("users.ejs",{users : result});
        })

    }catch(err){
        console.log("Error found");
        res.send("Some Error Occured");
    }
});

//edit
app.get("/users/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q = "SELECT *FROM user WHERE id = ?";
    try{
        connection.query(q,[id],(err, result)=>{
            if(err) throw err;
            let data = result[0];
            console.log(data);
            res.render("edit.ejs",{data});
        })
        
    }catch(err){
        res.send("error");
    }

    
})
//update
app.patch("/users/:id",(req,res)=>{
    let{id} = req.params;
    let {username, password} = req.body;

    let q = "SELECT *FROM user WHERE id = ?";
     try{
        connection.query(q,[id],(err, result)=>{
            if(err) throw err;
            let ogpassword = result[0].password;
            if(ogpassword !== password){
                res.redirect(`/users/${id}/edit`);
            }else{
                let updateQuery = "UPDATE user SET username = ? where id = ? ";
                try{
                    connection.query(updateQuery,[username,id],(err,result)=>{
                        if(err) throw err;
                        console.log("updateq",result);
                        res.redirect("/users");
                    })
                }catch(err){
                    res.send("some error occured");
                }
            }
        })
    }catch(err){
        res.send("Some error occured");
    }
   
    }
  
)



//add 
app.get('/users/new',(req,res)=>{
    res.render("newuser.ejs");
})

app.post('/users',(req,res)=>{
    let {username,password, email}=req.body;
    let id =  uuidv4();

    console.log(id,username,password,email); 
 
    let addquery = "INSERT INTO user (id,username,password,email) VALUES (?,?,?,?)";
    try{
        
         connection.query(addquery,[id,username,password,email],(err, result)=>{
            if(err) throw err;
            return res.redirect('/users');
         }
        )
    }catch(err){
        res.send("error found")
    }
    

})


//DElete
app.delete('/users/:id',(req,res)=>{
    let {id} = req.params;
    let deletequery = "DELETE FROM user WHERE id = ?";

    connection.query(deletequery,[id],(err,result)=>{
        if(err){
            res.send("some error occured");
        }
        res.redirect("/users");
    })
})


app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})



// try{
//     connection.query(q, [data],  (err, result)=>{
//         if(err) throw err;
//         console.log(result);
//         // console.log(result.length);
//         // console.log(result[0]);
//         // console.log(result[1]);
//     });
// }catch(err){
//     console.log(err);
// }

// connection.end();






//Inserting New Data
// let q = "INSERT INTO user (id, username,email,password) VALUES ?";

// let data = [];
// for(let i = 1; i <= 100; i++){
//     data.push(getRandomUser());
// }
// let user = ["123","adam","adam@yahoo.com","adam@123"];
// let users = [["123b","adamb","adamb@yahoo.com","adamb@123"], ["123c","adamc","adamc@yahoo.com","adamc@123"]];




// let getRandomUser = () => {
//   return [
//      faker.datatype.uuid(),
//      faker.internet.userName(),
//      faker.internet.email(),
//      faker.internet.password(),
//   ];
// };