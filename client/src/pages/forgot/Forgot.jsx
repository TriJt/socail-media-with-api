import React, { useState, useRef, useContext } from "react";
import "./forgot.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordForm from "../password Form/PasswordForm";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [OtpForm, showForm] = useState(true);
  const [errField, setErrField] = useState({
    EmailErr: "",
  });

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = { email: email };
        const response = await axios.post(
          "http://localhost:8800/api/users/send_email",
          data
        );
        const record = response.data;

        if (record.statusText === "Success") {
          toast.success("Record Successfully !");
          showForm(false);
        } else {
          toast.error(record.message);
        }
      } catch (e) {
        toast.error("Somethings went wrong");
      }
    }
  };

  const validateForm = () => {
    let formValid = true;

    if (email === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        EmailErr: "Please Enter Email  !!",
      }));
    }

    return formValid;
  };

  return (
    <div className="forgotDiv">
      <div className="forgotTop">
        <div className="forgotTopLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="forgot-logo">heaven</span>
          </Link>
        </div>
        <ToastContainer />
      </div>

      <div className="forgotBottom">
        <div className="forgotBox">
          {OtpForm ? (
            <form autoComplete="false" id="OtpForm">
              <h4 className="content-pass"> Find your Account</h4>
              <hr className="hrForgot" />
              <p className="forgotContent">
                Please enter your email to find your account{" "}
              </p>
              <div className="item-login">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  className="input-login"
                  placeholder="Email"
                />
              </div>
              {errField.EmailErr.length > 0 && (
                <span className="error">{errField.EmailErr} </span>
              )}
              <hr className="hrForgot" />
              <div className="buttonForgot">
                {/* Link to login page */}
                <Link to={"/login"} className="linkExit">
                  <button className="button-exit">Exit</button>
                </Link>
                <button
                  className="button-submit"
                  type="submit"
                  onClick={sendOtp}
                >
                  Send OTP
                </button>
              </div>
            </form>
          ) : (
            <PasswordForm email={email} />
          )}
        </div>
      </div>
    </div>
  );
}
