import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
const app = express(); 
import UserRoute from "./routes/users.js"
import AuthRoute from "./routes/auth.js"
import PostRoute from "./routes/post.js"
import passwordResetRoutes from "./routes/passwordReset.js"




dotenv.config(); 

const corsOptions = {
    
    credentials: true, // This is important.
    origin: true,
  }
app.use(cors(corsOptions)); 

mongoose 
 .connect(process.env.MONGO_PROD_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true   })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));




//middleware 
app.use(express.json()); 
app.use(helmet()); 
app.use(morgan("common"))


// route for page 
app.use("/api/auth",AuthRoute); 
//route for user
app.use("/api/users",UserRoute); 
//route for post 
app.use("/api/posts",PostRoute); 
//route for reset password
app.use("/api/password-reset",passwordResetRoutes); 



app.listen(8800, ()=> { 
    console.log("Server is running");
})