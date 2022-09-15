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

  //declaration fields in form
  const [inputField, setInputField] = useState({
    fullName: "",
    userId: currentUser._id,
    desc: "",
    city: "",
    from: "",
    relationship: "",
  });
  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  // update profile
  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8800/api/users/" + currentUser._id,
        inputField
      );
      const record = response.data;
      if (record.statusText === "Success") {
        toast.success(record.message);
      } else {
        toast.error(record.message);
      }
      setUser({ ...user });
    } catch (err) {
      toast.error("Somethings went wrong");
    }
  };

  return (
    <div className="settings">
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
              <input type="text" className="input-info" />
              <span className="textarea-span"> You can change your name</span>
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span> Username</span>
            </div>
            <div className="right">
              <input type="text" className="input-info" />
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span> Bio</span>
            </div>
            <div className="right">
              <textarea name="" id="" cols="10" rows="4"></textarea>
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
              <input type="text" className="input-info" />
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span> Telephone</span>
            </div>
            <div className="right">
              <input type="text" className="input-info" />
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span> Sex</span>
            </div>
            <div className="right">
              <input type="text" className="input-info" />
            </div>
          </div>
          <div className="setting-info">
            <div className="left"></div>
            <div className="right">
              <button className="button-send"> Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
