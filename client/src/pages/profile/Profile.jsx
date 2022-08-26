import './profile.css'
import TopBar from "../../components/topbar/TopBar"; 
import RightBar from '../../components/rightbar/RightBar';
import Feed from '../../components/feed/Feed';
import { useState, useEffect , useContext} from 'react';
import axios from "axios"
import { useParams } from 'react-router';
import {AuthContext} from "../../context/AuthContext"; 
import LocalSeeSharpIcon from '@mui/icons-material/LocalSeeSharp';
import CreateIcon from '@mui/icons-material/Create';


export default function Profile() {
  const {user:currentUser} = useContext(AuthContext); 
  const [user, setUser]  = useState(currentUser)
  const username = useParams().username; 
  const [files, setFiles] = useState("")

  //update file to cloudnary

  useEffect(()=>{ 
    const fetchUser = async () => { 
      const res = await axios.get(`http://localhost:8800/api/users?username=${username}`); 
      setUser(res.data); 
    }; 
    fetchUser(); 
  },[username]); 


  //cover picture 
  const CoverPicture =() => { 
    return (
      <img  
      src=  {user.coverPicture 
      ? user.coverPicture
      : "https://docsach24.co/no-avatar.png"} 
      alt="" 
      className="profileCoverImg" />
    )
  }

  // profile  picture
  const ProfilePicture =() => { 
    return (
      <img  
                  src=  {user.profilePicture 
                    ? user.profilePicture 
                    : "https://docsach24.co/no-avatar.png"}
                  alt="" 
                  className="profileUserImg"/>
    )
  }



  // update cover image 
  const updateCoverPicture = async(e) => { 
    e.preventDefault(); 

// up load file to cloudinary and update coverPicture in database
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

  const newCoverPicture = {
    userId: currentUser._id,
    coverPicture: list,
  };

  await axios.post("http://localhost:8800/api/users/"+currentUser._id + "/cover_image", newCoverPicture);
  window.location.reload();
} catch (err) {console.log(err)}


  }



  return (
    <>
    <TopBar />
    <div className="profile">
        <div className="profileRightTop">
          <div className="profileCover">
            <CoverPicture/>
              <button className="button-cover"> <LocalSeeSharpIcon />  Edit cover photo  </button>
            <ProfilePicture/>
              <button className="button-profile"><LocalSeeSharpIcon/></button>
            </div>
            
            <div className="profileInfo">
                  <div className="name"> 
                  <h4 className="fullName"> {user.fullName}</h4>
                  <span className='desc'> {user.desc}</span>
                  </div>
                    <button className="buttonEditProfile"> <CreateIcon/>   Edit profile</button>
            </div>
            
        </div>
        <div className="profileRightBottom">
          <RightBar user = {user}/>
          <Feed username = {username}/>
        </div>
      
    </div>
    </>
  )
}
