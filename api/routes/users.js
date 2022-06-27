import express from "express";
const router = express.Router(); 
import {UpdateUser,
        DeleteUser,
        GetUser, 
        FollowUser, 
        UnFollowUser
    } from "../controllers/user.js"


// Update user
router.put("/:id", UpdateUser); 
// Delete user 
router.delete("/:id",DeleteUser ); 
// Get user 
router.get("/:id", GetUser)
// follow a user
router.put("/:id/follow", FollowUser)
//unfollow a user
router.put("/:id/unfollow", UnFollowUser)


export default router ; 