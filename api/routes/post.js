import express from "express";
const router = express.Router(); 
import { 
    CreatePost,
    UpdatePost, 
    DeletePost, 
    LikePost, 
    GetPost, 
    GetTimLinePost
}from "../controllers/post.js"

//Create post 
router.post("/", CreatePost); 
// Update post
router.put("/:id", UpdatePost); 
// Delete post 
router.delete("/:id",DeletePost ); 
// Like post 
router.put("/:id/like", LikePost); 
// Get post 
router.get("/:id", GetPost)
// get  timeline posts
router.put("/timeline/all", GetTimLinePost)




export default router ; 