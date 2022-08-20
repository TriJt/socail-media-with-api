import User from "../models/User.js"; 
import bcryptjs from 'bcryptjs';
import Otp from "../models/Otp.js"; 
import nodemailer from "nodemailer"

//update user
export const UpdateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcryptjs.genSalt(10);
          req.body.password = await bcryptjs.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json(user);
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  };

//delete user
export const DeleteUser = async(req, res) => { 
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
          const user = await User.findByIdAndDelete(req.params.id);
          res.status(200).json("Account has been deleted");
        } catch (err) {
          return res.status(500).json(err);
        }
      } else {
        return res.status(403).json("You can delete only your account!");
      }
}

//get user 
export const GetUser = async(req,res, next) =>{ 
  const userId = req.query.userId; 
  const username = req.query.username ; 
    try {
        const user = userId 
        ? await User.findById(userId)
        : await User.findOne({username: username}); 
        const {password, updatedAt, ...orther}  = user._doc; 
        res.status(200).json(orther); 

    } catch (err) {
        return res.status(500).json(err);
    }
}
// search user
export const SearchUser = async(req, res) => { 

  try{ 
    const data = await User.find(
    )
    res.status(200).json(data);
  }catch(err){ 
    res.status(500).json(err); 
  }
  
}


//get all user 
export const GetAllUser = async(req, res)=>{ 
  try{ 
    const Users = await User.find() ;
    res.status(200).json(Users);
  }catch(err){ 
    return res.status(500).json(err)
  }
}

//get Friends

export const GetFriends = async(req, res) =>{ 
  try {
      const user  = await User.findById(req.params.userId)
      const friends = await Promise.all(
        user.followings.map(friendId =>{ 
          return User.findById(friendId)
        })
      )
      let friendList = []; 
      friends.map((friend) =>{ 
        const {_id, username, profilePicture} = friend; 
        friendList.push({_id, username, profilePicture})
      });
      res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err)
  }
}


//follow user 
export const FollowUser  = async(req, res) => { 
    if(req.body.userId !== req.params.id){ 
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId); 
            if(!user.followers.includes(req.body.userId)){ 
                await user.updateOne({$push: { followers: req.body.userId}}); 
                await currentUser.updateOne({$push:{followings: req.params.id}}); 
                res.status(200).json("User has been followed")
            }else{ 
                res.status(403).json("you are all ready follow this user")
            }
        } catch (err) {
            res.status(500).json(err); 
        }
    }else{ 
        res.status(403).json("You can follow yourself!!")
    }
}

//unfollow user 
export const UnFollowUser = async(req, res) => { 
    if(req.body.userId !== req.params.id){ 
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId); 
            if(user.followers.includes(req.body.userId)){ 
                await user.updateOne({$pull: { followers: req.body.userId}}); 
                await currentUser.updateOne({$pull:{followings: req.params.id}}); 
                res.status(200).json("User has been unfollowed")
            }else{ 
                res.status(403).json("you don't follow this user")
            }
        } catch (err) {
            res.status(500).json(err); 
        }
    }else{ 
        res.status(403).json("You can unfollow yourself!!")
    }
}


// Send email 
export const SendEmail = async(req,res)=>{ 
    let data = await User.findOne({email: req.body.email}); 
    const responseType = {}; 
    if(data){ 
      let otpcode = Math.floor((Math.random() * 10000) + 1 ); 
      let otpData = new Otp({ 
        email: req.body.email, 
        code: otpcode, 
        expireIn: new Date().getTime() + 300 *1000
      })
      let otpResponse = await otpData.save(); 
      responseType.statusText = 'Success'; 
      responseType.message = 'Please check Your Email  ID'; 
    }else{ 
      responseType.statusText = 'Error'; 
      responseType.message = 'Email id not exist';
      }
      // return responseType to front-end check error
    res.status(200).json(responseType); 

}




// Change password 
export const ChangePassword = async(req,res)=>{ 
  let data = await Otp.find({email: req.body.email, code: req.body.code}); 
  const response = {}; 
  if(data){ 
    let currentTime = new Date().getTime(); 
    let diff = data.expireIn - currentTime ; 
    if(diff < 0 ){ 
      response.message = 'Token Expire'; 
      response.statusText = 'Error'
    }else{ 
      let user = await User.findOne({email: req.body.email}); 
      user.password = req.body.password; 
      user.save(); 
      response.message = 'Password change success';
      response.statusText = 'Success'; 
    }
  }else{ 
    response.statusText = 'Error'; 
    response.message = 'Invalid';
    }
    res.status(200).json(response); 
}


// nodemailer


let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

let mailOptions = {
    from: process.env.MAIL_FROM,
    to: 'huynhgiao20ct@gmail.com',
    subject: 'Change Password',
    text: 'Hello World!'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error.message);
    }
    console.log('success');
});