import React,{useState, useEffect, Fragment} from 'react'
import "./resetpass.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ResetPass() {
    const [validUrl, setValidUrl] = useState(false); 
    const [password, setPassword] = useState(""); 
    const [msg, setMsg] = useState("")
    const [error_msg, setError] = useState("")
    const param = useParams(); 
    const url = `http://localhost:5000/api/password-reset/${param.id}/${param.token}`

    useEffect(()=>{ 
        const verifyUrl = async()=>{ 
            try {
                await axios.get(url); 
                setValidUrl(true);
            } catch (error) {
                setValidUrl(false); 
            }
        }
        verifyUrl(); 
    },[param,url])

    const handleSubmit = async(e) =>{ 
        e.preventDefault(); 
    try {
        const {data} = await axios.post(url,{password})
        setMsg(data.message); 
        setError(""); 
        window.location = "/login"
    } catch (error) {
        // bắt sự kiện khi email bị sai 
        if(error_msg.response && 
          error_msg.response.status >= 400 &&
          error_msg.response.status <=500 
          ){ 
            setError(error.response.data.message); 
            setMsg(""); 
          }
      }
    }

    

  return (
    <Fragment> 
        {validUrl ? (
            <form onSubmit={this.handleSubmit}>
            <p className="forgotContent">Add New Password</p>
          
            <input 
                type="password" 
                className="InputForgot" 
                placeholder='Password'
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}/>
            {/* phần hiện thông báo kết quả kiểm tra email */}
            { error_msg && <div className="error_msg">{error_msg}</div>}
            { msg && <div className="success_msg">{msg}</div>}
            </form>
        ):(
            <h1> 404 Not Found</h1>
        )
            
        }
    </Fragment>
  )
}
