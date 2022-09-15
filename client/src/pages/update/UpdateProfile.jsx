import { useState, useEffect, useContext } from "react";
import "./updateProfile.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import TopBar from "../../components/topbar/TopBar";
import ChangePassword from "../../components/changePassword/ChangePassword";
import Email from "../../components/email/Email";
import Settings from "../../components/settingsProfile/Settings";
import Help from "../../components/help/Help";

export default function UpdateProfile() {
  // render different component with click
  const [active, setActive] = useState("1");

  return (
    <div>
      <TopBar />
      <div className="settings-container">
        <ToastContainer />
        <div className="setting">
          <div className="setting-left">
            <div className="left-title" onClick={() => setActive("1")}>
              Edit your profile
            </div>
            <div className="left-text" onClick={() => setActive("2")}>
              Change password
            </div>
            <div className="left-text" onClick={() => setActive("3")}>
              Help
            </div>
            <div className="left-text" onClick={() => setActive("4")}>
              Email from Heaven
            </div>
            <div className="left-textarea">
              <h4 className="textarea-logo"> Heaven</h4>
              <span className="textarea-span">
                Control settings when connecting experiences across Heaven,
                including sharing stories, posts, and signing in
              </span>
            </div>
          </div>
          <div className="setting-right">
            {active === "1" && <Settings />}
            {active === "2" && <ChangePassword />}
            {active === "3" && <Help />}
            {active === "4" && <Email />}
          </div>
        </div>
      </div>
    </div>
  );
}
