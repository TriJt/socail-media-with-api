import express from "express";
const router = express.Router(); 
import {Register, Login} from "../controllers/auth.js"


// Register user
router.post("/register",Register ); 
// Login to social app 
router.post("/login", Login); 


export default router ; 