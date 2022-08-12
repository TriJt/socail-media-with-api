import React, { useState, useRef, useContext } from 'react'
import './login.css'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { loginCall } from '../../apiCalls';
import {AuthContext} from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate } from "react-router"

export default function Login() {
  // check show password text
  const [pass, setPass] = useState(false);

  const toggleBtn = (e)=> { 
    e.preventDefault();
    setPass(prevState => !prevState)
  }

  //declaration fields in form 
  const [inputField, setInputField] = useState({  
    email:'', 
    password:'', 
  })
  const InputHandler  = (e)=>{ 
    setInputField({...inputField, [e.target.name] :e.target.value })
  }

  const history = useNavigate()
//declaration field error of form 
  const [errField, setErrField] = useState({ 
    emailErr: '', 
    passwordErr:''
  })

  const {user,isFetching, error, dispatch} = useContext(AuthContext)

  const handleClick = (e) => {
    e.preventDefault(); 
    if(validateForm()){ 
      try{ 
        loginCall({
          email: inputField.email,
          password: inputField.password},dispatch )
      }catch(err){ 
        toast.error("Something went wrong!");
      }
    }else{ 
      toast.error("Form Invalid!");
    }

  }; 

  // validate form before handClick action
  const validateForm =  ()=>{ 
    let formValid = true; 
    setInputField({
      emailErr: '', 
      passwordErr:'', 
    })
    if(inputField.email === '' ){ 
      formValid =false ; 
      setErrField(prevState=> ({ 
        ...prevState,emailErr: 'Please Enter Your Email !!'
      }))
    }

    if(inputField.password === '' ){ 
      formValid =false ; 
      setErrField(prevState=> ({ 
        ...prevState,passwordErr: 'Please Enter Your Password !!'
      }))
    }
    return formValid ; 

  }
  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">heaven</h3>
            <span className="loginDesc">
              Connect with friends and the world around you on Heaven.
            </span>
        </div>
        <div className="loginRight">
        <ToastContainer />
          <form className="loginBox" >
            <input 
              type="email"
              name="email"
              placeholder='Email' 
              autoComplete='off'
              onChange={InputHandler}
              value={inputField.email}
              className="loginInput" />
                          { 
              errField.emailErr.length > 0  && <span className='error'>{errField.emailErr} </span>
            }
            <div className="passwordDiv">
              <input 
              type={pass ? "text" :"password"} 
              name ='password'
              autoComplete='off'
              onChange={InputHandler}
              value={inputField.password}
              placeholder='Password' className="passwordInput"  />
              
              <button className='btnPassword' onClick={toggleBtn}> 
                {
                  pass ? <VisibilityOffIcon /> : <VisibilityIcon/>
                }
              
              </button>
            </div>
            { 
              errField.passwordErr.length > 0  && <span className='error'>{errField.passwordErr} </span>
            }
            <button className="loginButton" type ="submit" disabled ={isFetching} onClick = {handleClick}>{isFetching ? (<CircularProgress color="white" size= "20px" /> ) : ("Log In")}</button>
            

            {/* Link to forgot page */}
            <Link to={"/forgot"} className='forgotPass'><p className="loginForgot">Forgot Password? </p> </Link>
            
            <hr  className='hr-login'/>
            {/* Link to register page */}
            <Link to="/register" >  
            <button className="loginRegisterButton">{isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}</button>
              </Link>
              </form>
          <span className="content-login"> Create a Page for a celebrity, brand, or business.</span>
        </div>
      </div>
      
    </div>
  )
}