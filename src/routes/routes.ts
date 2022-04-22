import { Router } from "express";
import usersController from "../controllers/usersController"
import chatController from "../controllers/chatController";
import {privateRoute} from "../middlewares/auth"
import { upload } from "../middlewares/multer"
const router = Router()


// API Routes
router.get("/users", privateRoute, usersController.AllUsers)
router.post("/register", upload.single('avatar'),usersController.createUser, chatController.avatarUpload,)
router.post("/login", usersController.loginUser)
router.post("/users", usersController.findUser)
router.put("/users", usersController.editUser)
router.delete("/users/:username", usersController.deleteUser)

router.get("/", chatController.renderLogin)
router.post("/upload" , upload.single('avatar'), chatController.avatarUpload)

export default router;