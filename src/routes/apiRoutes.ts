import { Router } from "express";
import usersController from "../controllers/usersController"
import {privateRoute} from "../middlewares/auth"
const router = Router()

// API Routes
router.get("/users", privateRoute, usersController.AllUsers)
router.post("/users", usersController.createUser)
router.post("/users/login", usersController.loginUser)
router.get("/users/:username", usersController.findUser)
router.put("/users/edit/:username", usersController.editUser)
router.delete("/users/delete/:username", usersController.deleteUser)



export default router;