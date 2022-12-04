import express from "express";
import {
  CreateComment,
  DeleteComment,
  GetComments,
  GetCommentWithIdComment,
  GetCommentWithIdPost,
  UpdateComment,
} from "../controllers/comment.js";
const router = express.Router();

router.post("/add", CreateComment);

router.put("/:id", UpdateComment);

router.delete("/:id", DeleteComment);

router.post("/post", GetCommentWithIdPost);

router.get("/reply/:id", GetCommentWithIdComment);

router.get("/", GetComments);

export default router;
