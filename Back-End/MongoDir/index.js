const mongoose = require('mongoose');



main().then(() =>{
    console.log("connection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});


const User = mongoose.model("User", userSchema);

// User.insertMany([
//       {name:"tom",email:"tom@gmail.com",age:31},
//       {name:"jerry",email:"jeery@gmail.com",age:35},
//       {name:"diya",email:"diya@gmail.com",age:15},
// ]).then((res)=>{console.log(res)});

// const user3 = new User({name:"bob",email:"bob2@gmail.com",age:29});

// user3.save().then(res => console.log(res))
// .catch((err)=>{
//     console.log(err);
// });

// User.find({age: {$gt : 20} }).then((data) =>{
//     console.log(data);
// });

// User.updateOne({name: "adam"},{age: 40}).then(res =>console.log(res));

// User.findOne({name: "adam"}).then((data) =>{
//      console.log(data);
//      });

User.findByIdAndDelete('69650be8bd27901532bb10dd').then(res => console.log(res));

// User.findByIddeleteMany({age: {$lt : 20}}).then(res => console.log(res));

// User.find({}).then(res => console.log(res));