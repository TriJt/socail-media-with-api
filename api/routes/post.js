import express from "express";
const router = express.Router(); 
import { 
    CreatePost,
    UpdatePost, 
    DeletePost, 
    LikePost, 
    GetPost, 
    GetTimLinePost,
    GetProfilePost
}from "../controllers/post.js"

import Post from "../models/Post.js";
import User from "../models/User.js"


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
router.get("/timeline/:userId", GetTimLinePost)
// get a post of user with username
router.get("/profile/:username", async(req, res) =>{
    try {
        const user = await User.findOne({username: req.params.username}); 
        const posts = await Post.find({userId: user._id})
        res.status(200).json(posts); 
    } catch (err) {
        res.status(500).json(err)
    }

})




export default router ; 