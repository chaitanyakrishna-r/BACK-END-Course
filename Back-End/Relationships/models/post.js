const mongoose = require('mongoose');

const Schema = mongoose.Schema;

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");

} 

const postSchema =  new Schema(
    {
        content: String,
        likes: Number,
        user: {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    }
)
const userSchema = new Schema(
    {
        username:String,

    }
)



// model

const User = mongoose.model('User',userSchema);
const Post = mongoose.model('Post',postSchema);

//find data
const findData = async()=>{
    const data = await Post.find({});
    console.log(data);
}

//add data 
const addUser = async()=>{
    // const user1 = new User(
    //     {username:'ckr'}
    // )
    // let result = await user1.save();
    // console.log(result);


    let results = await User.insertMany([
        {username: 'sandy'},
        {username: 'andy'},
        {username: 'candy'},
    ]);
    console.log(results);
} 

const addPost = async()=>{
    const post2 = new Post({
        content: "this is my second post",
        likes: 23,

    });
    const user1 = await User.findOne({username:'candy'});
    post2.user = user1;
    const result = await post2.save();
    console.log(result);
}

// addUser();
addPost();
findData();

