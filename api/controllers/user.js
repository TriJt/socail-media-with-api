import User from "../models/User.js"; 
import bcryptjs from 'bcryptjs';


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
        res.status(200).json("Account has been updated");
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
    try {
        const user = await User.findById(req.params.id); 
        const {password, updatedAt, ...orther}  = user._doc; 
        res.status(200).json(orther); 

    } catch (err) {
        return res.status(500).json(err);
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

//infollow user 
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