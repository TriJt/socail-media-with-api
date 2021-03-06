import express from "express";
const router = express.Router(); 
import {UpdateUser,
        DeleteUser,
        GetUser,
        GetFriends, 
        FollowUser, 
        UnFollowUser,
        GetAllUser,
        SearchUser
    } from "../controllers/user.js"
// Search user 
router.get("/search", SearchUser)
// Update user
router.put("/:id", UpdateUser); 
// Delete user 
router.delete("/:id",DeleteUser ); 
// Get user 
router.get("/", GetUser)
//get friends 
router.get("/friends/:userId", GetFriends);
// follow a user
router.put("/:id/follow", FollowUser)
//unfollow a user
router.put("/:id/unfollow", UnFollowUser)
// router get all user 
router.get("/all", GetAllUser)
export default router ; 