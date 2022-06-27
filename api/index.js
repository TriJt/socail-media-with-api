import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import helmet from "helmet";
import morgan from "morgan";
const app = express(); 
import UserRoute from "./routes/users.js"
import AuthRoute from "./routes/auth.js"
import PostRoute from "./routes/post.js"
dotenv.config(); 

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


app.listen(8800, ()=> { 
    console.log("Server is running");
})