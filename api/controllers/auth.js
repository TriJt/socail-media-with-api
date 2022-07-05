import User from "../models/User.js"; 
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"
//REGISTER 
export const Register = async(req, res, next) => { 
    try{ 
        const salt = bcryptjs.genSaltSync(10); 
        const hashPassword = bcryptjs.hashSync(req.body.password, salt); 
        //create new user 
        try{ 
            const newUser =  new User({
                firstName: req.body.firstName, 
                lastName: req.body.lastName, 
                username: req.body.username, 
                email: req.body.email, 
                password: hashPassword,
            }); 
            //save user and return response
            const saveUser = await newUser.save(); 
            res.status(200).json(saveUser); 
        }catch(err){ 
            next(err)
        }
    }
    catch(err){ 
        next(err)
    }
}

//LOGIN 

export const Login  = async(req, res, next) => { 
    try{ 
        const user = await User.findOne({email: req.body.email}); 
        !user && res.status(404).json("Email not found"); 

        const validPassword = await bcryptjs.compare(req.body.password,user.password);
        !validPassword && res.status(400).json("Wrong password"); 
        // // Create and assign a token
        // const token  = jwt.sign({_id: user._id},process.env.JWT ); 
        // res.header('auth-token', token).send(token); 
        res.status(200).json(user) ;
    }
    catch(err){ 
        res.status(500).json(err); 
    }

}