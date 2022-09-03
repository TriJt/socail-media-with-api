import "./profile.css";
import TopBar from "../../components/topbar/TopBar";
import RightBar from "../../components/rightbar/RightBar";
import Feed from "../../components/feed/Feed";
import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Cancel } from "@mui/icons-material";
import LocalSeeSharpIcon from "@mui/icons-material/LocalSeeSharp";
import CreateIcon from "@mui/icons-material/Create";
import Popup from "../../components/Popup/Popup";
import UpdateProfile from "../../components/update/updateProfile/UpdateProfile";

export default function Profile() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const username = useParams().username;
  const [files, setFiles] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [popupCover, setPopupCover] = useState(false);

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
        {/* {files && (
          <div className="shareImgContainer">
            <img
              src={
                user.coverPicture
                  ? user.coverPicture
                  : URL.createObjectURL(files[0])
              }
              alt=""
              className="profileCoverImg"
            /> */}
        {/* <Cancel className="shareCancelImg" onClick={() => setFiles(null)} /> */}
        {/* </div>
        )} */}
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
          <button className="buttonImageProfile">
            <LocalSeeSharpIcon />
          </button>
        </div>
      </div>
    );
  };

  // update cover image
  const updateCoverPicture = async (e) => {
    // e.preventDefault();
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

      await axios.put(
        "http://localhost:8800/api/users/" + currentUser._id,
        newCoverPicture
      );
      user.coverPicture = list[0];
      console.log(list);
      setUser({ ...user });
      setButtonPopup(false);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // update profile

  return (
    <>
      <TopBar />
      <div className="profile">
        {/* div show update cover image */}
        <div className="updateDiv" name="updateDiv">
          <div className="containerUpdate"></div>
        </div>
        <div className="profileRightTop">
          {/* image cover  */}
          <div className="profileCover">
            <CoverPicture />
          </div>
          {/* image avatar */}
          <div className="profileInfo">
            <ProfilePicture />
            <ButtonCoverPicture />
            <Popup trigger={popupCover} setTrigger={setPopupCover}>
              <div className="table-update">
                <h3> Choose Picture</h3>
                <hr className="hr-popup" />
                {files && (
                  <div className="shareImgContainer">
                    <img
                      src={URL.createObjectURL(files[0])}
                      alt=""
                      className="image-cover-update"
                    />
                    <Cancel
                      className="shareCancelImg"
                      onClick={() => setFiles(null)}
                    />
                  </div>
                )}
                <form>
                  <label htmlFor="file" className="shareOption">
                    <input
                      type="file"
                      id="file"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                    />
                  </label>
                </form>
                <button
                  className="shareButton"
                  onClick={() => {
                    updateCoverPicture();
                  }}
                >
                  Save
                </button>
              </div>
            </Popup>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <div className="table-update">
                <h3> Edit profile</h3>
                <hr className="hr-popup" />
                <UpdateProfile />
              </div>
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
