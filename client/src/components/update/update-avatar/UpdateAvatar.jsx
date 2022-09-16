import "./updateavatar.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Cancel } from "@mui/icons-material";
import { AuthContext } from "../../../context/AuthContext";

export default function UpdateAvatar() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [files, setFiles] = useState("");

  useEffect(() => {
    // set sessionStorage after update
    sessionStorage.setItem("user", JSON.stringify(user));

    const userInfo = JSON.parse(sessionStorage.getItem("user"));

    const newUpdatedUserInfo = {
      ...userInfo,
    };

    sessionStorage.setItem("user", JSON.stringify(newUpdatedUserInfo));
  });

  const UpdateAvatar = async (e) => {
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

      const data = {
        userId: currentUser._id,
        profilePicture: list,
      };

      const response = await axios.put(
        "http://localhost:8800/api/users/" + currentUser._id,
        data
      );
      setUser({ ...user });
      const record = response.data;
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
    <div className="table-update">
      <h3> Update Avatar</h3>
      <span style={{ color: "gray", fontSize: "13px" }}> Heaven</span>
      <hr className="hr-popup" />
      <div className="table-update-avatar">
        <form>
          <label htmlFor="file" className="profile-update-avatar-label">
            <input
              type="file"
              id="file"
              multiple
              style={{ display: "none" }}
              onChange={(e) => setFiles(e.target.files)}
            ></input>
            Choose image
          </label>
        </form>
        {files && (
          <div className="profile-update-avatar-div">
            <img
              src={URL.createObjectURL(files[0])}
              alt=""
              className="profile-update-avatar-image"
            />
          </div>
        )}
        <hr className="hr-popup" />
        <button className="update-avatar-button" onClick={UpdateAvatar}>
          Save
        </button>
      </div>
    </div>
  );
}
