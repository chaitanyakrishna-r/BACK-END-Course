import express from "express";
import { loginUser, logoutUser, registerUser,regenerateAccessToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(
  loginUser
)

router.post("/logout",verifyJWT,logoutUser)

router.post("/refresh-token", regenerateAccessToken);

export default router;

