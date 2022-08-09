import User from "../models/User.js"; 
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"
//REGISTER 
export const Register = async(req, res) => { 
    try{ 
        const salt = await bcryptjs.genSaltSync(10); 
        const pass = await req.body.password 
        const hashPassword = bcryptjs.hashSync(pass, salt); 
        //create new user 
        try{ 
            const newUser =  new User({
                fullName: req.body.fullName, 
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
        console.log(err)
    }
}

//LOGIN 

export const Login  = async(req, res, next) => { 
    try{ 

        const user = await User.findOne({email: req.body.email}); 
        const responseType = {
            message:'ok'
        }
        if(user){ 
            
            const match =  await bcryptjs.compare(req.body.password,user.password);
            if(match){ 
                responseType.message ='Login Successfully'; 
                responseType.token = 'ok'
                
            }else{ 
                responseType.message ='Invalid Password'; 
            }
        }else{ 
            responseType.message ='Invalid Email';
        
        }
         res.status(200).json(user)
         return

    }
    catch(err){ 
         res.status(500).json(err); 
         return
    }

}