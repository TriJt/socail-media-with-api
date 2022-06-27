import './profile.css'
import TopBar from "../../components/topbar/TopBar"; 
import SideBar from "../../components/sidebar/Sidebar"; 
import RightBar from '../../components/rightbar/RightBar';
import Feed from '../../components/feed/Feed';


export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ; 
  return (
    <>
    <TopBar />
    <div className="profile">
      <SideBar/>
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img  
                  src=  {`${PF}person/bae.jpg`} 
                  alt="" 
                  className="profileCoverImg" />
            <img  
                  src={`${PF}person/1.jpg`}
                  alt="" 
                  className="profileUserImg"/>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">John Le</h4>
              <span className="profileInfoDesc">Hello bro !!! </span>
            </div>
        </div>
        <div className="profileRightBottom">
          <Feed/>
          <RightBar/>
        </div>
      </div>
    </div>
    </>
  )
}
