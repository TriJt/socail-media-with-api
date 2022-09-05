import { useState, useEffect, useContext } from "react";
import "./updateProfile.css";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { Cancel } from "@mui/icons-material";

export default function UpdateProfile() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const username = useParams().username;
  const [files, setFiles] = useState("");

  //declaration fields in form
  const [inputField, setInputField] = useState({
    fullName: "",
    desc: "",
    city: "",
    from: "",
    relationship: "",
  });
  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  // update avatar

  return (
    <div className="profile-update">
      <ToastContainer />
      {/* cover image */}
      <div className="profile-update-avatar"></div>

      {/* avatar  */}

      {/* update Bio  */}

      {/* update profile  */}
      <form>
        <div className="profile-edit">
          <label className="label-edit"> Full Name:</label>
          <input type="text" className="input-edit" />
        </div>
        <div className="profile-edit">
          <label className="label-edit"> Description:</label>
          <input type="text" className="input-edit" />
        </div>
        <div className="profile-edit">
          <label className="label-edit"> City:</label>
          <input type="text" className="input-edit" />
        </div>
        <div className="profile-edit">
          <label className="label-edit"> From:</label>
          <input type="text" className="input-edit" />
        </div>
        <div className="profile-edit">
          <label className="label-edit">Relationship:</label>
          <input type="text" className="input-edit" />
        </div>
        <button className="button-update" type="submit" onClick={UpdateProfile}>
          Update profile
        </button>
      </form>
    </div>
  );
}
