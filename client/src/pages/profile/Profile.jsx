import "./profile.css";
import TopBar from "../../components/topbar/TopBar";
import RightBar from "../../components/rightbar/RightBar";
import Feed from "../../components/feed/Feed";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import { ToastContainer, toast } from "react-toastify";
import UpdateCover from "../../components/update/update-cover/UpdateCover";
import UpdateAvatar from "../../components/update/update-avatar/UpdateAvatar";

export default function Profile() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const username = useParams().username;
  const [popupCover, setPopupCover] = useState(false);
  const [avatar, setAvatar] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  //cover picture
  const CoverPicture = () => {
    return (
      <>
        <img src={user.coverPicture} alt="" className="profileCoverImg" />
      </>
    );
  };

  // button update cover picture
  // change span to button in className dropdown-text
  const ButtonCoverPicture = () => {
    return (
      <div className="dropdown">
        <div className="dropdown-select">
          <span> Edit cover photo</span>
        </div>
        <ul className="dropdown-list">
          <li className="dropdown-item">
            <label className="choose-image">
              <input
                style={{ display: "none" }}
                onClick={() => setPopupCover(true)}
              />
              Choose Image
            </label>
          </li>
        </ul>
      </div>
    );
  };

  // profile  picture
  const ProfilePicture = () => {
    return (
      <div className="avatarProfile">
        <img
          src={user.profilePicture}
          alt=""
          className="profileUserImg"
          onClick={() => setAvatar(true)}
        />
        {/* <div>
          <button className="buttonImageProfile">
            <LocalSeeSharpIcon />
          </button>
        </div> */}
      </div>
    );
  };

  return (
    <>
      <TopBar />
      <div className="profile">
        {/* div show update cover image */}
        <ToastContainer />
        <div className="profileRightTop">
          {/* image cover  */}
          <div className="profileCover">
            <CoverPicture />
            <ButtonCoverPicture />
          </div>
          {/* image avatar */}
          <div className="profileInfo">
            <div className="avatar-profile">
              <ProfilePicture />
            </div>

            {/* popup for cover picture */}
            <Popup trigger={popupCover} setTrigger={setPopupCover}>
              <UpdateCover />
            </Popup>
            {/* popup for update profile */}
            <Popup trigger={avatar} setTrigger={setAvatar}>
              <UpdateAvatar />
            </Popup>

            <div className="info-profile">
              <div className="info-profile-f1">
                <span className="info-username"> {user.username}</span>
                <button className="info-button">
                  <Link to={`/settings`} className="dropdown-link">
                    <span className="info-span">Edit your profile </span>
                  </Link>
                </button>
              </div>
              {/* Full name and bio */}
              <div className="info-profile-f1">
                <h4 className="info-fullName"> {user.fullName}</h4>
                <span className="info-desc"> {user.desc}</span>
              </div>
              <div className="info-profile-f1">51 posts</div>
            </div>
            {/* for count a post  */}
          </div>
        </div>
        <div className="profileRightBottom">
          <RightBar user={user} />
          <Feed username={username} />
        </div>
      </div>
    </>
  );
}
