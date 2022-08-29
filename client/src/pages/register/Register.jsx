import { useState } from "react";
import "./register.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  // check show pass before add
  const [pass, setPass] = useState(false);
  const [repass, setRePass] = useState(false);
  const toggleBtnPass = (e) => {
    e.preventDefault();
    setPass((prevState) => !prevState);
  };
  const toggleBtnRePass = (e) => {
    e.preventDefault();

    setRePass((prevState) => !prevState);
  };

  //declaration fields in form
  const [inputField, setInputField] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
  });
  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const history = useNavigate();
  //declaration field error of form
  const [errField, setErrField] = useState({
    fullNameErr: "",
    usernameErr: "",
    emailErr: "",
    passwordErr: "",
    repasswordErr: "",
  });
  // click button to submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const user = {
        fullName: inputField.fullName,
        username: inputField.username,
        email: inputField.email,
        password: inputField.password,
      };
      try {
        const response = await axios.post(
          "http://localhost:8800/api/auth/register",
          user
        );
        if (response.status === 200) {
          toast.success("Added Successfully !");
          setTimeout(() => {
            history("/login");
          }, 1500);
        }
      } catch (err) {
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("Form Invalid!");
    }
  };
  // validate form before handClick action
  const validateForm = () => {
    let formValid = true;
    setInputField({
      fullNameErr: "",
      usernameErr: "",
      emailErr: "",
      passwordErr: "",
      repasswordErr: "",
    });
    if (inputField.fullName === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        fullNameErr: "Please Enter Your Full Name !!",
      }));
    }
    if (inputField.username === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        usernameErr: "Please Enter Your Username !!",
      }));
    }
    if (inputField.email === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        emailErr: "Please Enter Your Email !!",
      }));
    }

    if (inputField.password === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Please Enter Your Password !!",
      }));
    }
    if (
      inputField.repassword !== "" &&
      inputField.repassword !== inputField.password
    ) {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        repasswordErr: "Your RePassword is not match!! Input Again",
      }));
    }
    return formValid;
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">heaven</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on heaven.
          </span>
        </div>
        <div className="loginRight">
          <ToastContainer />
          <form className="loginBox">
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={inputField.fullName}
              onChange={InputHandler}
              className="loginInput"
            />
            {errField.fullNameErr.length > 0 && (
              <span className="error">{errField.fullNameErr} </span>
            )}
            <input
              type="text"
              placeholder="Username"
              minLength={8}
              name="username"
              value={inputField.username}
              onChange={InputHandler}
              className="loginInput"
            />
            {errField.usernameErr.length > 0 && (
              <span className="error">{errField.usernameErr} </span>
            )}
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={inputField.email}
              onChange={InputHandler}
              className="loginInput"
            />
            {errField.emailErr.length > 0 && (
              <span className="error">{errField.emailErr} </span>
            )}
            <div className="passwordDiv">
              <input
                type={pass ? "text" : "password"}
                minLength={8}
                name="password"
                placeholder="Password"
                value={inputField.password}
                onChange={InputHandler}
                className="passwordInput"
              />
              <button className="btnPassword" onClick={toggleBtnPass}>
                {pass ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
            {errField.passwordErr.length > 0 && (
              <span className="error">{errField.passwordErr} </span>
            )}
            <div className="passwordDiv">
              <input
                type={repass ? "text" : "password"}
                name="repassword"
                value={inputField.repassword}
                onChange={InputHandler}
                placeholder="Password Again"
                className="passwordInput"
              />
              <button className="btnPassword" onClick={toggleBtnRePass}>
                {repass ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
            {errField.repasswordErr.length > 0 && (
              <span className="error">{errField.repasswordErr} </span>
            )}
            <button
              className="loginButton"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
