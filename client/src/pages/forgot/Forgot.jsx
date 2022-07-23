import React, { useState, useRef, useContext } from 'react'
import './forgot.css'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import {useNavigate } from "react-router"
import {Link} from "react-router-dom"
import { loginCall } from '../../apiCalls';
import {AuthContext} from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

// Viết code vào ngày 23 tháng 7 năm 2022
// Trang này gồm có phần đăng nhập và phần quên mật khẩu 
// Phần quên mật khẩu sử dụng nodemailer để gửi mã code về cho email rồi check coi code đó có đúng hông
// Nếu code đó đúng thì cho đổi mật khẩu còn sai thì yêu cầu nhập lại 


export default function Forgot() {
  const [pass, setPass] = useState(false);

  const toggleBtn = ()=> { 
    setPass(prevState => !prevState)
  }

  const email  = useRef(); 
  const password = useRef(); 
  const {user,isFetching, error, dispatch} = useContext(AuthContext)

  const handleClick = (e) => {
    e.preventDefault(); 
    loginCall({
      email: email.current.value,
      password: password.current.value},dispatch )
  }; 
 

  return (
    <div className="forgotDiv">
      {/* Phần đăng nhập vào trang */}
      <div className="forgotTop"> 
      <div className="forgotTopLeft">
      <Link to = "/" style={{textDecoration: 'none'}}>
        <span className="logo">Heaven</span>
        </Link>
      </div>
      <div className="forgotTopRight">
      <form  onSubmit={handleClick}>
        <input type="email" required ref ={email}className='inputLoginEmail' placeholder='Email'/>
        <input type="pass" required ref ={password} className='inputLoginPass' placeholder='Password' />
        <button className="buttonLoginForgot" type ="submit" disabled ={isFetching}>{isFetching ? (<CircularProgress color="white" size= "20px" /> ) : ("Log In")}</button>
        {/* Link qua trang quên mật khẩu */}
        <Link to={"/forgot"} className ="linkForgot"> Forgot your account ? </Link>
        </form>
      </div>
      
      </div>
      {/* Phần này là phần quên mật khẩu  */}
      <div className="forgotBottom">
        <div className="forgotBox">
          <h4 className="forgotHeader"> Find your Account</h4>
          <hr  className='hrForgot'/>
          <p className="forgotContent">Please enter your email to find your account </p>
          <input type="text" className="InputForgot" placeholder='Email' />
          <hr  className='hrForgot'/>
          {/* phần này là các button để đưa các tác vụ vào trong form */}
          <div className="buttonForgot">
            {/* chuyển về trang login */}
            <button className="Exit"><Link to={"/login"} className="linkExit"> Exit</Link></button>
            {/* Tim kiếm tài khoản trong back-end và check để hiển thị  */}
            <button className="Find">Find</button>
          </div>
        </div>
      </div>
    </div>
    
  )
}
