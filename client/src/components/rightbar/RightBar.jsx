import React from 'react'
import './rightbar.css'
import {Users} from "../../dummyData"
import Online from '../online/Online'

export default function RightBar({profile}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ; 
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
          <h4 className="rightTitle"> User Information</h4>
          <div className="rightbarInfo"> 
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">New York</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">Madrid</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">In relationship</span>
            </div>
          </div>
          <h4 className="rightTitle"> User friends</h4>
          <div className="rightbarFollowings">
            <div className="rightbarFollowing">
              <img src={`${PF}person/sad.jpg`} alt="" className="rightbarFollowingImg" />
              <span className="rightFollowingName">Trang ty</span>
            </div>
            <div className="rightbarFollowing">
              <img src={`${PF}person/sad.jpg`} alt="" className="rightbarFollowingImg" />
              <span className="rightFollowingName">Trang quynh</span>
            </div>
            <div className="rightbarFollowing">
              <img src={`${PF}person/sad.jpg`} alt="" className="rightbarFollowingImg" />
              <span className="rightFollowingName">Trang tien</span>
            </div>
            <div className="rightbarFollowing">
              <img src= {`${PF}person/sad.jpg`} alt="" className="rightbarFollowingImg" />
              <span className="rightFollowingName">Thanh tru</span>
            </div>
            </div>
          </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}
