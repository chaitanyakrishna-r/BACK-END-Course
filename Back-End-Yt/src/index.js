import "./config/dotenv.config.js";

import connectDB from "./db/db.js";
import { app } from "./app.js";

const port = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running at port: ${port} `);
    });
  })
  .catch((error) => {
    console.log("mongoDB connection FAILED!", error);
  });
