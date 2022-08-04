import User from "../models/User.js"; 
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"
//REGISTER 
export const Register = async(req, res) => { 
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
            res.status(500).json("Can't create new user! Please check error before")
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
        !validPassword && res.status(500).json("Wrong password"); 
        res.status(200).json(user) ;
    }
    catch(err){ 
        res.status(500).json(err); 
    }

}