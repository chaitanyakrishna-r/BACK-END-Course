const mongoose = require('mongoose');


main().then(()=>{
    console.log("connection successsfull");
})
.catch((err)=>{
    console.log(err);
})


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}


//Schema for book

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    author:{
        type:String
    },
    price:{
        type: Number
    }
});


//model
const Book = mongoose.model("Book",bookSchema);


const book1 = new Book(
    {
        title: "verbal ability",
        author: "Ace",
        price: 499
    },

)


Book.insertMany([
    {
        title: "general aptitude",
        author: "Ace",
        price: 499
    },
    {
        title: "number ability",
        author: "Ace",
        price: 233
    },
    {
        title: "Electronics",
        author: "ISRO",
        price: 999
    },
]).then(res => {console.log(res)});



book1.save().then(res => {console.log(res)})
.catch(err => {console.log(err)});