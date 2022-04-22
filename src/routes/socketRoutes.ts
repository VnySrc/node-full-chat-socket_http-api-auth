import { Router } from "express";
import chatController from "../controllers/chatController";

const router = Router()

router.get("/", chatController.renderChat)

export default router