import React, { useState, useRef, useContext } from "react";
import "./login.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Login() {
  // check show password text
  const [pass, setPass] = useState(false);

  const toggleBtn = (e) => {
    e.preventDefault();
    setPass((prevState) => !prevState);
  };

  //declaration fields in form
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });
  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const [errField, setErrField] = useState({
    emailErr: "",
    passwordErr: "",
  });

  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });

    const data = {
      email: inputField.email,
      password: inputField.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/login",
        data
      );
      if (response.data.status === 300) {
        setErrField((prevState) => ({
          ...prevState,
          emailErr: response.data.message,
        }));
        setTimeout(() => {
          setErrField({
            emailErr: "",
            passwordErr: "",
          });
          setInputField({
            email: "",
            password: "",
          });
        }, 3000);
      } else {
        if (response.data.status === 301) {
          // check password
          setErrField((prevState) => ({
            ...prevState,
            passwordErr: response.data.message,
          }));
          setTimeout(() => {
            setErrField({
              emailErr: "",
              passwordErr: "",
            });
            setInputField({
              email: "",
              password: "",
            });
          }, 3000);
        } else {
          toast.success(response.data.message);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.value,
          });
        }
      }
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err,
      });
      throw err;
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">heaven</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Heaven.
          </span>
        </div>
        <div className="loginRight">
          <ToastContainer />
          <form className="loginBox">
            <div className="item-login">
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="off"
                onChange={InputHandler}
                value={inputField.email}
                className="input-login"
              />
            </div>

            {errField.emailErr.length > 0 && (
              <span className="error">{errField.emailErr} </span>
            )}
            <div className="item-login">
              <input
                type={pass ? "text" : "password"}
                name="password"
                autoComplete="off"
                onChange={InputHandler}
                value={inputField.password}
                placeholder="Password"
                className="input-login"
              />

              <button className="btnPassword" onClick={toggleBtn}>
                {pass ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
            {errField.passwordErr.length > 0 && (
              <span className="error">{errField.passwordErr} </span>
            )}
            <button
              className="loginButton"
              type="submit"
              disabled={isFetching}
              onClick={handleClick}
            >
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>

            {/* Link to forgot page */}
            <Link to={"/forgot"} className="forgot-content">
              <span>Forgot Password? </span>{" "}
            </Link>

            <hr className="hr-login" />
            {/* Link to register page */}
            <Link to="/register">
              <button className="loginRegisterButton">
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </Link>
          </form>
          <span className="content-login">
            {" "}
            Create a Page for a celebrity, brand, or business.
          </span>
        </div>
      </div>
    </div>
  );
}
