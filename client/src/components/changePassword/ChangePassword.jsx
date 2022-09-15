import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";

// complete front-end
export default function ChangePassword() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);

  return (
    <div className="settings">
      {/* for avatar */}
      <div className="top">
        <div className="left">
          <img src={user.profilePicture} alt="" className="avatar-setting" />
        </div>
        <div className="right">
          <span className="span-username">{user.username} </span>
        </div>
      </div>
      <div className="bottom">
        <form>
          <div className="setting-info">
            <div className="left">
              <span>Old password </span>
            </div>
            <div className="right">
              <input type="text" className="input-info" />
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span> New password</span>
            </div>
            <div className="right">
              <input type="text" className="input-info" />
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span>Confirm new password</span>
            </div>
            <div className="right">
              <input type="text" className="input-info" />
            </div>
          </div>

          <div className="setting-info">
            <div className="left"></div>
            <div className="right">
              <button className="button-send">Change password</button>
            </div>
          </div>
        </form>
        <div className="setting-info">
          <div className="left"></div>
          <div className="right">
            <button className="button-right">Forget password</button>
          </div>
        </div>
      </div>
    </div>
  );
}
