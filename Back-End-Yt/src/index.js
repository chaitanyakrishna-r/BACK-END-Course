import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config();

const port = process.env.PORT ||8080;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running at port: ${port} `);
    });
  })
  .catch((error) => {
    console.log("mongoDB connection FAILED!", error);
  });
