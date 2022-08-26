import React , {useContext,useRef}from 'react'
import './share.css'
import {PermMedia, Label, Room, EmojiEmotions,Cancel} from '@mui/icons-material'
import {AuthContext} from "../../context/AuthContext"
import { useState } from 'react';
import axios from 'axios' ; 
import {Link} from "react-router-dom"


export default function Share() {
  const {user:currentUser} = useContext(AuthContext); 
  const [user, setUser]  = useState(currentUser)
  const desc = useRef()
  const [files, setFiles] = useState("")

  //link to profile 
  const LinktoProfile = ()=> { 
    return ( 
      <Link to = {`profile/${user.username}`}> 
      <img src={user.profilePicture  
      ? user.profilePicture 
      : "https://docsach24.co/no-avatar.png" } 
      alt="" 
      className="postProfileImg" />
      </Link>
    )
  }

  const submitHandler = async(e) => { 
    e.preventDefault(); 
    // up load file to cloudinary 
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "social0722");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/johnle/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newPost = {
        userId: currentUser._id,
        desc:desc.current.value,
        img: list,
      };

      await axios.post("http://localhost:8800/api/posts/", newPost);
      window.location.reload();
    } catch (err) {console.log(err)}

  }


  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <LinktoProfile/>
          <input type="text"
          placeholder={"what 's in your mind " +user.fullName +"?" }
          className="shareInput"
          ref = {desc} />
        </div>
        <hr className="shareHr" />
        {files && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(files[0])} alt="" className="shareImg" />
            <Cancel className='shareCancelImg' onClick ={ () => setFiles(null)} />
          </div>
        )}
        <div className="uploadFile">
        <form className="shareBottom" >
          <span className='contentShareOption'> Add to your post</span>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor='tomato' className='shareIcon'/>
                <input style={{display: "none"}}
                 type="file"  
                 id ="file" 
                 multiple
                onChange ={(e)=> setFiles(e.target.files)} />
              </label>
              <div className="shareOption">
                <Label htmlColor='blue' className='shareIcon'/>
              </div>
              <div className="shareOption">
                <Room htmlColor='green' className='shareIcon'/>
              </div>
              <div className="shareOption">
                <EmojiEmotions htmlColor='goldenrod' className='shareIcon'/>
              </div>
            </div>
        </form>
        </div>
        <button className="shareButton" onClick={submitHandler}>Post</button>
      </div>
    </div>
  )
}

