import express from "express";
import {
    CreateMessage,
    GetMessage
} from "../controllers/message.js";
const router = express.Router();

//create Message
router.post("/", CreateMessage);
// get Message 
router.get("/:conversationId", GetMessage)

export default router;