import express from "express";
const router = express.Router();
import {
  CreatePost,
  UpdatePost,
  DeletePost,
  LikePost,
  GetPost,
  GetTimLinePost,
  GetProfilePost,
  GetProfile,
  CountPost,
} from "../controllers/post.js";

router.post("/count", CountPost);

//Create post
router.post("/", CreatePost);
// Update post
router.put("/:id", UpdatePost);
// Delete post
router.delete("/:id", DeletePost);
// Like post
router.put("/:id/like", LikePost);
// Get post
router.get("/:id", GetPost);
// get  timeline posts
router.get("/timeline/:userId", GetTimLinePost);
// get a post of user with username
router.get("/profile/:username", GetProfile);

export default router;
