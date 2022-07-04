import { useState,useRef } from 'react'
import './register.css'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import {useNavigate } from "react-router"
import {Link} from "react-router-dom"

export default function Register() {
  const [pass, setPass] = useState(false);

  const toggleBtn = ()=> { 
    setPass(prevState => !prevState)
  }
  const username  = useRef(); 
  const email  = useRef(); 
  const password = useRef(); 
  const passwordAgain = useRef(); 
  const history = useNavigate()


  const handleClick = async(e) => {
    e.preventDefault(); 
    if(passwordAgain.current.value !== password.current.value){ 
      passwordAgain.current.setCustomValidity("Passwords don't match!!")
    }
    else{ 
      const user = { 
        username : username.current.value, 
        email : email.current.value, 
        password : password.current.value
      }; 
      try { 
         await axios.post("http://localhost:8800/api/auth/register", user)
        history("/login")
      } catch (err) {
        console.log(err);
      }
    }
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
            <input type="text" placeholder='Username'required ref={username} className="loginInput" />
            <input type="email" placeholder='Email'required ref={email}  className="loginInput" />
            <div className="passwordDiv">
              <input type={pass ? "text" :"password"} required ref={password} placeholder='Password' className="passwordInput" />
              <button className='btnPassword' onClick={toggleBtn}> 
                {
                  pass ? <VisibilityOffIcon /> : <VisibilityIcon/>
                }
              
              </button>
            </div>
            <div className="passwordDiv">
              <input type="password" required ref={passwordAgain} placeholder='Password Again' className="passwordInput" />
              
            </div>
            <button className="loginButton" type="submit">Sign Up</button>
            <Link to ="/login" > 
            <button className="loginRegisterButton">Log into Account</button>
            </Link>
            
          </form>
        </div>
      </div>
      
    </div>
  )
}
