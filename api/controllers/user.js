import User from "../models/User.js";
import bcryptjs from 'bcryptjs';
import Otp from "../models/Otp.js";
import nodemailer from "nodemailer"
import {
  OAuth2Client
} from 'google-auth-library'

//update user
export const UpdateUser = async (req, res) => {
  const responseType = {};
  if (req.body.userId === req.params.id) {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    user.save();
    responseType.statusText = 'Success';
    responseType.message = 'Update successfully';
  } else {
    responseType.statusText = 'Error';
    responseType.message = 'Update Failed ';
  }
  res.status(200).json(responseType);
};



//delete user
export const DeleteUser = async (req, res) => {
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
export const GetUser = async (req, res, next) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId ?
      await User.findById(userId) :
      await User.findOne({
        username: username
      });
    const {
      password,
      updatedAt,
      ...orther
    } = user._doc;
    res.status(200).json(orther);

  } catch (err) {
    return res.status(500).json(err);
  }
}
// search user
export const SearchUser = async (req, res) => {

  try {
    const data = await User.find()
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }

}


//get all user 
export const GetAllUser = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (err) {
    return res.status(500).json(err)
    console.log(err)
  }
}

//get Friends

export const GetFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const friends = await Promise.all(
      user.followings.map(friendId => {
        return User.findById(friendId)
      })
    )
    let friendList = [];
    friends.map((friend) => {
      const {
        _id,
        username,
        profilePicture
      } = friend;
      friendList.push({
        _id,
        username,
        profilePicture
      })
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err)
  }
}


//follow user 
export const FollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $push: {
            followers: req.body.userId
          }
        });
        await currentUser.updateOne({
          $push: {
            followings: req.params.id
          }
        });
        res.status(200).json("User has been followed")
      } else {
        res.status(403).json("you are all ready follow this user")
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can follow yourself!!")
  }
}

//unfollow user 
export const UnFollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          $pull: {
            followers: req.body.userId
          }
        });
        await currentUser.updateOne({
          $pull: {
            followings: req.params.id
          }
        });
        res.status(200).json("User has been unfollowed")
      } else {
        res.status(403).json("you don't follow this user")
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can unfollow yourself!!")
  }
}

// Change password 
export const ChangePassword = async (req, res) => {
  let data = await Otp.find({
    email: req.body.email,
    code: req.body.code
  });
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      response.message = 'Token Expire';
      response.statusText = 'Error'
    } else {
      let user = await User.findOne({
        email: req.body.email
      });
      user.password = req.body.password;
      user.save();
      response.message = 'Password change successfully';
      response.statusText = 'Success';
    }
  } else {
    response.statusText = 'Error';
    response.message = 'Invalid';
  }
  res.status(200).json(response);
}


// nodemailer
// send mail to get otp 

const GOOGLE_MAILER_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_MAILER_CLIENT_SECRET = process.env.CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = process.env.EMAIL_FROM;

//Initialize(Khởi tạo) OAuth2Client with Client ID and Client Secret

const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
)
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})




// Send email 
export const SendEmail = async (req, res) => {
  let data = await User.findOne({
    email: req.body.email
  });
  const responseType = {};
  if (data) {
    let otpcode = Math.floor((Math.random() * 10000) + 1);
    let otpData = new Otp({
      email: req.body.email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000
    })
    const myAccessTokenObject = await myOAuth2Client.getAccessToken()
    const myAccessToken = myAccessTokenObject.token

    // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: ADMIN_EMAIL_ADDRESS,
        clientId: GOOGLE_MAILER_CLIENT_ID,
        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken
      }
    })
    const mailOptions = {
      to: req.body.email, // Gửi đến ai?
      subject: 'OTP for change password', // Tiêu đề email
      html: `<h3>${otpcode}</h3>` // Nội dung email
    }
    await transport.sendMail(mailOptions)

    let otpResponse = await otpData.save();
    responseType.statusText = 'Success';
    responseType.message = 'Please check Your Email  ID';
  } else {
    responseType.statusText = 'Error';
    responseType.message = 'Email id not exist';
  }
  // return responseType to front-end check error
  res.status(200).json(responseType);

}