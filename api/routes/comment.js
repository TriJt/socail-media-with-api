import express from "express";
import {
  CreateComment,
  DeleteComment,
  GetCommentWithIdComment,
  GetCommentWithIdPost,
  UpdateComment,
} from "../controllers/comment";
const router = express.Router();

router.post("/", CreateComment);

router.put("/:id", UpdateComment);

router.delete("/:id", DeleteComment);

router.post("/post", GetCommentWithIdPost);

router.post("/id-comment", GetCommentWithIdComment);

export default router;
