require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT;
console.log(port,"port");

const gitHubData = {
  "users": [
    {
      "id": 1,
      "name": "Chaitanya",
      "email": "chaitanya@example.com",
      "age": 25,
      "isActive": true,
      "skills": ["React", "Node.js", "MongoDB"]
    },
    {
      "id": 2,
      "name": "Rahul",
      "email": "rahul@example.com",
      "age": 22,
      "isActive": false,
      "skills": ["C++", "DSA", "Python"]
    },
    {
      "id": 3,
      "name": "Sneha",
      "email": "sneha@example.com",
      "age": 27,
      "isActive": true,
      "skills": ["UI/UX", "Figma", "Tailwind CSS"]
    }
  ],
  "company": {
    "name": "TechNova",
    "location": "Bangalore",
    "employees": 120,
    "departments": ["Development", "Design", "Marketing"]
  }
};

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.get("/login",(req,res)=>{
    res.send("login page");
})

app.get("/github",(req,res)=>{
    res.json(gitHubData);
})

app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
})
