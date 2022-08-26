import React,{useEffect,useState, useContext} from 'react'
import './rightbar.css'
import {Users} from "../../dummyData"
import Online from '../online/Online'
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom"
import {Add, Remove} from "@mui/icons-material"


export default function RightBar({user}) {
  const [friends, setFriends] = useState([])
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id))

  useEffect(() => {
    const  getFriends = async()=>{ 
      try {
        const friendList = await axios.get("http://localhost:8800/api/users/friends/"+user._id); 
        setFriends(friendList.data)
      } catch (err) {
      }
    };
   getFriends();
  }, [user])
  
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };



  const HomeRightbar = () => { 
    return(
      <>
        <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className='birthdayImg' />
          <span className="birthdayText">
            <b> Huynh giao</b> and <b>3 other friend</b> have a birthday today
          </span>
        </div>
        <img src="assets/person/cafe.jpg" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friend</h4>
        <ul className="rightbarFriendList">
          {Users.map( u => (
            <Online key={u.id} user = {u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar =()=>{ 
    return (
          <>
          {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
          
          <div className="rightbarInfo"> 
          <h1 className="rightbarTitle">Intro</h1>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">{user.relationship ===1 
              ? "Single" 
              : user.relationship ===2
              ? "Married"
              : "-" }</span>
            </div>
          </div>
          
          <div className="rightbarFollowings">
          <h4 className="rightTitle"> User friends</h4>
            {friends.map((friend)=> (
            <Link to= {"/profile/" +friend.username} 
              style = {{textDecoration: "none", color:"gray", textAlign: "center"}}>
            <div className="rightbarFollowing">
              <img src={friend.profilePicture
                        ? friend.profilePicture
                        :  "https://docsach24.co/no-avatar.png"} alt="" className="rightbarFollowingImg" />
              <span className="rightFollowingName">{friend.username}</span>
            </div>
            </Link>
            ))}
            </div>
          </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}
