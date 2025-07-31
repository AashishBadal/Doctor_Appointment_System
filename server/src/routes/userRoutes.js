import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData, updateProfile } from "../controllers/userController.js";
import { upload } from "../middleware/file-upload-middleware.js";

const uploader = upload()
const userRouter = express.Router();

userRouter.get("/", userAuth,getUserData);
userRouter.put("/:id",uploader.single('profile_image'),updateProfile)

export default userRouter;