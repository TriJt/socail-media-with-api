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

export default function Profile() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const username = useParams().username;
  const [avatar, setAvatar] = useState(false);
  const [files, setFiles] = useState("");
  const [file2, setFile2] = useState("");
  const [count, setCount] = useState();
  const [step1, setStep1] = useState(false);

  // update session storage
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
    const userInfo = JSON.parse(sessionStorage.getItem("user"));

    const newUpdatedUserInfo = {
      ...userInfo,
    };
    sessionStorage.setItem("user", JSON.stringify(newUpdatedUserInfo));
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/users?username=" + username
      );
      setUser(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const Count = async () => {
      const data = {
        username: username,
      };
      const res = await axios.post(
        "http://localhost:8800/api/posts/count",
        data
      );
      setCount(res.data);
    };
    Count();
  });

  const Close = () => {
    setFiles(null);
    setStep1(false);
  };

  const HandleCover = async (e) => {
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
        coverPicture: list,
      };

      const response = await axios.put(
        "http://localhost:8800/api/users/" + user._id,
        newCoverPicture
      );
      const record = response.data;
      if (record.status === 200) {
        toast.success(record.message);
      } else {
        toast.error(record.message);
      }
      setUser(record.value);
      setStep1(false);
    } catch (err) {
      toast.error("Somethings went wrong");
    }
  };

  // change span to button in className dropdown-text
  const ButtonCoverPicture = () => {
    return (
      <div className="dropdown">
        <div className="dropdown-select" onClick={() => setStep1(true)}>
          <span> Edit cover photo</span>
        </div>
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
      </div>
    );
  };

  const UpdateAvatar = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(file2).map(async (file2) => {
          const data = new FormData();
          data.append("file", file2);
          data.append("upload_preset", "social0722");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/johnle/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );

      const newProfile = {
        profilePicture: list,
      };

      const response = await axios.put(
        "http://localhost:8800/api/users/" + user._id,
        newProfile
      );

      if (response.data.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Somethings went wrong");
    }
  };

  return (
    <>
      <TopBar />
      <div className="profile">
        {/* div show update cover image */}
        <ToastContainer />
        <div className="profileRightTop">
          {/* image cover  */}

          {step1 ? (
            <div className="profileCover">
              <img
                src={files ? URL.createObjectURL(files[0]) : user.coverPicture}
                alt=""
                className="profileCoverImg"
              />
              <div className="close" onClick={Close}>
                <span>Exit</span>
              </div>
              <div className="update-action">
                <form action="" className="form">
                  <div className="dropdown-select">
                    <label htmlFor="file">
                      <input
                        type="file"
                        id="file"
                        multiple
                        className="update-cover-input"
                        style={{ display: "none" }}
                        onChange={(e) => setFiles(e.target.files)}
                      />
                      Choose image
                    </label>
                  </div>
                  <div className="dropdown-select" onClick={HandleCover}>
                    <span> Save</span>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="profileCover">
              <img src={user.coverPicture} alt="" className="profileCoverImg" />
              <ButtonCoverPicture />
            </div>
          )}

          {/* image avatar */}
          <div className="profileInfo">
            <div className="avatar-profile">
              <ProfilePicture />
            </div>

            {/* popup for update profile */}
            <Popup trigger={avatar} setTrigger={setAvatar}>
              <div className="table-update">
                <h3> Update Avatar</h3>
                <span style={{ color: "gray", fontSize: "13px" }}> Heaven</span>
                <hr className="hr-popup" />
                <div className="table-update-avatar">
                  <form>
                    <label
                      htmlFor="file2"
                      className="profile-update-avatar-label"
                    >
                      <input
                        type="file"
                        id="file2"
                        multiple
                        style={{ display: "none" }}
                        onChange={(e) => setFile2(e.target.files)}
                      ></input>
                      Choose image
                    </label>
                  </form>

                  <div className="profile-update-avatar-div">
                    <img
                      src={
                        file2
                          ? URL.createObjectURL(file2[0])
                          : user.profilePicture
                      }
                      alt=""
                      className="profile-update-avatar-image"
                    />
                  </div>

                  <hr className="hr-popup" />
                  <button
                    className="update-avatar-button"
                    onClick={UpdateAvatar}
                  >
                    Save
                  </button>
                </div>
              </div>
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

              <div className="info-profile-f1">
                <h4 className="info-fullName"> {user.fullName}</h4>
                <span className="info-desc"> {user.desc}</span>
              </div>
              <div className="info-profile-f1">{count} post</div>
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
