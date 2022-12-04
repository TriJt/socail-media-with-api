import express from "express";
import {
  CreateConversation,
  GetConversation,
} from "../controllers/conversation.js";
const router = express.Router();

//create conversation
router.post("/", CreateConversation);
// get conversation
router.get("/:userId", GetConversation);

export default router;
