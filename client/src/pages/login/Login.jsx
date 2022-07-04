import React, { useState, useRef, useContext } from 'react'
import './login.css'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { loginCall } from '../../apiCalls';
import {AuthContext} from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from "react-router-dom"

export default function Login() {
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
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">Heavensocial</h3>
            <span className="loginDesc">
              Connect with friends and the world around you on Heavensocial.
            </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input 
              type="email"
              required 
              placeholder='Email' 
              className="loginInput"
              ref ={email} />
            <div className="passwordDiv">
              <input 
              type={pass ? "text" :"password"} 
              required
              minLength={8}
              placeholder='Password' className="passwordInput" 
              ref = {password}/>
              <button className='btnPassword' onClick={toggleBtn}> 
                {
                  pass ? <VisibilityOffIcon /> : <VisibilityIcon/>
                }
              
              </button>
            </div>
            <button className="loginButton" type ="submit" disabled ={isFetching}>{isFetching ? (<CircularProgress color="white" size= "20px" /> ) : ("Log In")}</button>
            <span className="loginForgot">Forgot Password? </span>
            <Link to="/register" >  
            <button className="loginRegisterButton">{isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}</button>
              </Link>
          </form>
        </div>
      </div>
      
    </div>
  )
}
