import './profile.css'
import TopBar from "../../components/topbar/TopBar"; 
import SideBar from "../../components/sidebar/Sidebar"; 
import RightBar from '../../components/rightbar/RightBar';
import Feed from '../../components/feed/Feed';
import { useState, useEffect } from 'react';
import axios from "axios"
import { useParams } from 'react-router';

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
  const [user, setUser]  = useState({})
  const username = useParams().username; 
  
  useEffect(()=>{ 
    const fetchUser = async () => { 
      const res = await axios.get(`http://localhost:8800/api/users?username=${username}`); 
      setUser(res.data); 
    }; 
    fetchUser(); 
  },[username]); 



  return (
    <>
    <TopBar />
    <div className="profile">
      <SideBar/>
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img  
                  src=  {user.coverPicture 
                  ? user.coverPicture
                  : "https://docsach24.co/no-avatar.png"} 
                  alt="" 
                  className="profileCoverImg" />
            <img  
                  src=  {user.profilePicture 
                    ? user.profilePicture 
                    : "https://docsach24.co/no-avatar.png"}
                  alt="" 
                  className="profileUserImg"/>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
        </div>
        <div className="profileRightBottom">
          <Feed username = {username}/>
          <RightBar user = {user}/>
        </div>
      </div>
    </div>
    </>
  )
}
