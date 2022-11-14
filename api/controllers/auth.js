import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
//REGISTER
export const Register = async (req, res) => {
  try {
    const salt = bcryptjs.genSaltSync(10);
    const pass = await req.body.password;
    const hashPassword = bcryptjs.hashSync(pass, salt);

    try {
      const newUser = new User({
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
      });

      const saveUser = await newUser.save();
      res.status(200).json(saveUser);
    } catch (err) {
      res.status(500).json("Can't create new user! Please check error before");
    }
  } catch (err) {
    console.log(err);
  }
};

//LOGIN

export const Login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const responseType = {};
  if (!user) {
    responseType.status = 300;
    responseType.message = "Email was wrong!";
  }

  try {
    const match = await bcryptjs.compare(req.body.password, user.password);
    if (!match) {
      responseType.status = 301;
      responseType.message = "Password not match!";
    } else {
      responseType.status = 200;
      responseType.message = "Login Successfully";
      responseType.value = user;
    }
  } catch (err) {
    console.log(err);
  }

  res.json(responseType);
};
