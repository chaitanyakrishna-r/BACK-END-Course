const mongoose = require('mongoose');

//Schema

const chatSchema = new mongoose.Schema(
    {
        from: {type: String,require: true,},
        to: {
            type: String,
            require: true,
        },
        message:{
            type: String,
            maxLength: 50,
        },
        create_at:{
            type: Date,
            default: Date.now,
        }
    }
);


//create model
const Chat = mongoose.model("Chat", chatSchema);


module.exports = Chat;