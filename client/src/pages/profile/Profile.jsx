import "./profile.css";
import TopBar from "../../components/topbar/TopBar";
import RightBar from "../../components/rightbar/RightBar";
import Feed from "../../components/feed/Feed";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Cancel } from "@mui/icons-material";
import LocalSeeSharpIcon from "@mui/icons-material/LocalSeeSharp";
import CreateIcon from "@mui/icons-material/Create";
import Popup from "../../components/Popup/Popup";
import UpdateProfile from "../../components/update/updateProfile/UpdateProfile";
import { ToastContainer, toast } from "react-toastify";
import UpdateCover from "../../components/update/update-cover/UpdateCover";
import UpdateAvatar from "../../components/update/update-avatar/UpdateAvatar";

export default function Profile() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const username = useParams().username;

  const [buttonPopup, setButtonPopup] = useState(false);
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
        <img src={user.profilePicture} alt="" className="profileUserImg" />
        <div>
          <button
            className="buttonImageProfile"
            onClick={() => setAvatar(true)}
          >
            <LocalSeeSharpIcon />
          </button>
        </div>
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
          </div>
          {/* image avatar */}
          <div className="profileInfo">
            <ProfilePicture />
            <ButtonCoverPicture />
            {/* popup for cover picture */}
            <Popup trigger={popupCover} setTrigger={setPopupCover}>
              <UpdateCover />
            </Popup>
            {/* popup for update profile */}
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <div className="table-update">
                <h3> Edit profile</h3>
                <hr className="hr-popup" />
                <div className="table-update-cover">
                  <UpdateProfile />
                </div>
              </div>
            </Popup>
            <Popup trigger={avatar} setTrigger={setAvatar}>
              <UpdateAvatar />
            </Popup>

            <div className="nameAndDesc">
              <h4 className="fullName"> {user.fullName}</h4>
              <span className="desc"> {user.desc}</span>
            </div>

            {/* edit profile */}

            <button
              className="buttonEditProfile"
              onClick={() => setButtonPopup(true)}
            >
              <CreateIcon /> Edit profile
            </button>
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
