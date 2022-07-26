// phần này là để thể hiện các router của reset password 
import express from "express"
const router = express.Router(); 
import User from "../models/User.js";
import Token from "../models/Token.js"; 
import crypto from "crypto"; 
import sendEmail from "../utils/sendEmail.js"; 
import Joi from "joi"; 
import passwordComplexity from "joi-password-complexity"; 
import bcryptjs from "bcryptjs" 

//send password link 
router.post("/", async(req,res)=>{ 
    try {
        const emailSchema = Joi.object({ 
            email : Joi.string().email().required().label("Email")
        }); 
        const {error} = emailSchema.validate(req.body);
        if(error)
            return res.status(400).send({message: console.error.details[0].message})

        // Tìm kiếm user theo email để check, nếu email không tồn tại thì thông báo cho client để client thay đổi cho đúng email đã có trong database
        let user = await User.findOne({email :  req.body.email}); 
        if(!user)
            return res.status(409).send({message: "User with given email does not exist !"})

        // Khởi tạo token dể check random khi gửi mail cho client
        let token = await Token.findOne({userId: user._id}); 
        if(!token){ 
            token = await new Token({ 
                userId : user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save()
        }

        // Khởi tạo url để gửi qua mail cho client 
        const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}`
        await sendEmail(user.email, "Password Reset", url); 

        // phần này là hiển thị thông báo bên client khi nhập đúng email và đã gửi email qua cho tài khoản client
        res.status(200).send({message: "Password reset link sent to your email account "})

    } catch (error) {
        res.status(500).send({message : "Internal server error"})
    }

})

// verify url 
router.get("/:id/:token", async(req,res)=>{ 
    try {
        // tìm user theo id 
        const user = await User.findOne({_id: req.params.id}); 
        if(!user) return res.status(400).send({message: "Invalid link"}); 

        // tìm kiếm token theo token
        const token = await Token.findOne({ 
            userId: user._id, 
            token: req.params.token
        }); 
        if(!token) return res.status(400).send({message: "Invalid link"});
         
        res.status(200).send({message: "Invalid Url"});

    } catch (error) {
        res.status(500).send({message : "Internal server error"})
    }
})

//reset password 
router.post("/:id/:token", async(req,res)=>{ 
    try {
        
        const passwordSchema = Joi.object({ 
            password: passwordComplexity().required().label("Password")
        }); 
        const {error} = passwordSchema.validate(req.body);
        if(error)
            return res.status(400).send({message: console.error.details[0].message}) 

        const user = await User.findOne({_id: req.params.id}); 
        if(!user) return res.status(400).send({message: "Invalid link"}); 

        // tìm kiếm token theo token
        const token = await Token.findOne({ 
            userId: user._id, 
            token: req.params.token
        }); 
        if(!token) return res.status(400).send({message: "Invalid link"});

        if(!user.verified) user.verified = true; 

        const salt = await bcryptjs.genSalt(Number(process.env.SALT)); 
        const hashPassword  = await bcryptjs.hash(req.hash.password, salt); 

        user.password = hashPassword; 
        await user.save(); 
        await token.remove(); 

        res.status(200).send({message:"Password reset successfully" })
    } catch (error) {
        res.status(500).send({message : "Internal server error"})
    }
})




export default router ; 