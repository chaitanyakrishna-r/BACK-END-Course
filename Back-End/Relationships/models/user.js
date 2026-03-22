const mongoose = require('mongoose');
const {Schema} = mongoose;

const MONGO_URL = "mongodb://127.0.0.1:27017/relationDemo" ;
main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}


const UserSchema = new Schema({
    username: String,
    addresses: [
        {
            _id: false,
            location: String,
            city: String,
        }
    ]
})

//create a a model
const User = mongoose.model("User",UserSchema)

const addUser = async()=>{
    let newUser = new User({
    username: "ckr",
    addresses: [
        {   
            
            location: "#23, baker street",
            city: "london",
        },
    ],
 });
 newUser.addresses.push({location:"#234, iyger street", city: "bengalurur"});
 let result = await newUser.save();
 console.log(result);
}

addUser();