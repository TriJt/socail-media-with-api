import React, { useState, useRef, useContext } from 'react'
import './forgot.css'
import axios from 'axios';
import {useNavigate } from "react-router"
import {Link} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordForm from '../password Form/PasswordForm';

export default function Forgot() {
  const history = useNavigate()
  // phần này là các biến để đăng nhập vào trong form đăng nhập 
  const emailRef  = useRef(); 
  const [OtpForm, showForm] = useState(true); 
  // phần này là để gửi Otp về gmail

  const sendOtp = async(e) =>{ 
    e.preventDefault(); 
    try {
      const data = {email : emailRef.current.value}; 
      const response = await axios.post('http://localhost:8800/api/users/send_email', data); 
      const record = response.data; 

        if(record.statusText === 'Success'){ 
          toast.success("Record Successfully !");
          showForm(false); 
        }else{
          toast.error(record.message); 
        }
    } catch (e) {
      toast.error("Somethings went wrong")
    }

  }



  return (
    <div className="forgotDiv">
      {/* Phần đăng nhập vào trang */}
      <div className="forgotTop"> 
      <div className="forgotTopLeft">
      <Link to = "/" style={{textDecoration: 'none'}}>
        <span className="logo">Heaven</span>
        </Link>
      </div>
      <ToastContainer />
      </div>
      {/* Phần này là phần quên mật khẩu  */}
      <div className="forgotBottom">
        <div className="forgotBox">
       { OtpForm ? 
        <form autoComplete='false' id='OtpForm' >
          <h4 className="content-pass"> Find your Account</h4>
          <hr  className='hrForgot'/>
          <p className="forgotContent">Please enter your email to find your account </p>
            <input 
              type="email" 
              autoComplete='off'
              name='email'
              ref={emailRef}
              className="InputForgot" 
              placeholder='Email' />
              <hr  className='hrForgot'/>
          <div className="buttonForgot">
            {/* Link to login page */}
            <button className="Exit"><Link to={"/login"} className="linkExit"> Exit</Link></button>
            <button className="Find" type ="submit" onClick={sendOtp}>Send OTP  </button>
          </div>
          </form>
          : 
          <PasswordForm email = {emailRef.current.value}/>
          }
        </div>
      </div>
    </div>
    
  )
}
