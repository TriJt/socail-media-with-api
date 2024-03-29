import React, { useState, useRef, useContext } from "react";
import "./passform.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PasswordForm(props) {
  //declaration fields in form
  const [inputField, setInputField] = useState({
    otpCode: "",
    password: "",
    repass: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  //declaration field error of form
  const [errField, setErrField] = useState({
    otpCodeErr: "",
    passwordErr: "",
    repassErr: "",
  });
  const history = useNavigate();

  //validate form for check error of form pass
  const validateForm = () => {
    let formValid = true;
    setInputField({
      otpCodeErr: "",
      passwordErr: "",
      repassErr: "",
    });
    if (inputField.otpCode === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        otpCodeErr: "Please Enter OTP!!",
      }));
    }

    if (inputField.password === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Please Enter Your Password !!",
      }));
    }
    if (inputField.repass === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        repassErr: "Please Enter Confirm Password !!",
      }));
    }
    if (inputField.repass !== "" && inputField.repass !== inputField.password) {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        repassErr: "Password was not match !!",
      }));
    }
    return formValid;
  };

  const submitButton = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      Object.assign(inputField, props);
      let url = "http://localhost:8800/api/users/change-password";
      let options = {
        method: "POST",
        url: url,
        headers: {},
        data: inputField,
      };
      try {
        let response = await axios(options);
        if (response.data.statusText === "Success") {
          toast.success(response.data.message);
          history.push("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error("Somethings was wrong");
      }
    } else {
      toast.error("Form Invalid");
    }
  };

  return (
    <form autoComplete="false" id="OtpForm">
      <ToastContainer />
      <h4 className="content-pass">Change Password</h4>
      <hr className="hrForgot" />

      <div className="item-login">
        <input
          type="number"
          name="otpCode"
          placeholder="OTP"
          autoComplete="off"
          maxLength={4}
          onChange={InputHandler}
          value={inputField.otpCode}
          className="input-login"
        />
      </div>

      {errField.otpCodeErr.length > 0 && (
        <span className="error">{errField.otpCodeErr} </span>
      )}
      <div className="item-login">
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          onChange={InputHandler}
          value={inputField.password}
          className="input-login"
        />
      </div>

      {errField.otpCodeErr.length > 0 && (
        <span className="error">{errField.passwordErr} </span>
      )}
      <div className="item-login">
        <input
          type="password"
          name="repass"
          placeholder="Password Again"
          autoComplete="off"
          onChange={InputHandler}
          value={inputField.repass}
          className="input-login"
        />
      </div>

      {errField.repassErr.length > 0 && (
        <span className="error">{errField.repassErr} </span>
      )}

      <div className="buttonForgot">
        {/* Link to login page */}
        <button className="button-exit">
          <Link to={"/login"} className="linkExit">
            Back
          </Link>
        </button>
        <button className="button-submit" type="submit" onClick={submitButton}>
          Change Password
        </button>
      </div>
    </form>
  );
}
