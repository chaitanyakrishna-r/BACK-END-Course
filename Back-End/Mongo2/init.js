const mongoose = require("mongoose");
const Chat = require('./models/chat.js');


//mongoose

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const allChats = [
  { from: "adam", to: "eve", message: "Hi Eve! How are you?" },
  { from: "eve", to: "adam", message: "I'm good Adam, how about you?" },
  { from: "adam", to: "eve", message: "Did you finish your work?" },
  { from: "eve", to: "adam", message: "Yes, I finished it today." },
  { from: "adam", to: "eve", message: "Great! Want to grab coffee?" },
  { from: "eve", to: "adam", message: "Sure, let's go in the evening." },
  { from: "adam", to: "eve", message: "See you at 6 PM." },
  { from: "eve", to: "adam", message: "Perfect, see you!" },
  { from: "adam", to: "eve", message: "Don't forget your phone." },
  { from: "eve", to: "adam", message: "Haha, I won’t 😄" },
];

Chat.insertMany(allChats);