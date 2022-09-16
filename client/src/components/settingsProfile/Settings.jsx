import { useState, useEffect, useContext } from "react";
import "./settings.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";

// complete setting front-end
// need connect back-end and update
export default function Settings() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    // set locaL storage after update
    sessionStorage.setItem("user", JSON.stringify(user));
    const userInfo = JSON.parse(sessionStorage.getItem("user"));
    const newUpdatedUserInfo = {
      ...userInfo,
    };
    sessionStorage.setItem("user", JSON.stringify(newUpdatedUserInfo));
  });
  //declaration fields in form
  const [inputField, setInputField] = useState({
    fullName: user.fullName,
    username: user.username,
    userId: user._id,
    email: user.email,
    desc: user.desc,
    sex: user.sex,
    telephone: user.telephone,
  });
  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  // update profile
  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8800/api/users/" + user._id,
        inputField
      );
      const record = response.data;
      setUser(record.value);
      if (record.statusText === "Success") {
        toast.success(record.message);
      } else {
        toast.error(record.message);
      }
    } catch (err) {
      toast.error("Somethings went wrong");
    }
  };

  return (
    <div className="settings">
      <ToastContainer />
      {/* for avatar */}
      <div className="top">
        <div className="left">
          <img src={user.profilePicture} alt="" className="avatar-setting" />
        </div>
        <div className="right">
          <span className="span-username">{user.username} </span>
          {/*  add submit avatar*/}
          <button className="button-right"> Change your avatar</button>
        </div>
      </div>
      <div className="bottom">
        <form>
          <div className="setting-info">
            <div className="left">
              <span>Name </span>
            </div>
            <div className="right">
              <input
                name="fullName"
                type="text"
                className="input-info"
                placeholder={user.fullName}
                autoComplete="off"
                onChange={InputHandler}
                value={inputField.fullName}
              />
              <span className="textarea-span"> You can change your name</span>
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span> Username</span>
            </div>
            <div className="right">
              <input
                type="text"
                name="username"
                className="input-info"
                placeholder={user.username}
                autoComplete="off"
                onChange={InputHandler}
                value={inputField.username}
              />
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span> Bio</span>
            </div>
            <div className="right">
              <textarea
                name="desc"
                id=""
                type="text"
                cols="10"
                rows="4"
                placeholder={user.desc}
                autoComplete="off"
                onChange={InputHandler}
                value={inputField.desc}
              ></textarea>
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span> Email</span>
            </div>
            <div className="right">
              <h6>Personal information</h6>
              <span className="textarea-span">
                Provide your personal information, regardless of whether you use
                the account for business, pets or otherwise. This information
                will not be visible on your public profile.
              </span>
              <input
                type="email"
                name="email"
                className="input-info"
                placeholder={user.email}
                autoComplete="off"
                onChange={InputHandler}
                value={inputField.email}
              />
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span> Telephone</span>
            </div>
            <div className="right">
              <input
                type="text"
                maxLength={11}
                name="telephone"
                className="input-info"
                placeholder={user.telephone}
                autoComplete="off"
                onChange={InputHandler}
                value={inputField.telephone}
              />
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span>Gender</span>
            </div>
            <div className="right">
              <select
                name="sex"
                className="input-info"
                onChange={InputHandler}
                value={inputField.sex}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other genders">Other genders</option>
              </select>
            </div>
          </div>
          <div className="setting-info">
            <div className="left"></div>
            <div className="right">
              <button className="button-send" onClick={submitUpdate}>
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
