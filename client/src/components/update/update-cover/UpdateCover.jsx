import "./updatecover.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Cancel } from "@mui/icons-material";
import { AuthContext } from "../../../context/AuthContext";

export default function UpdateCover() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [files, setFiles] = useState("");

  const updateCoverPicture = async (e) => {
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
        userId: currentUser._id,
        coverPicture: list,
      };

      const response = await axios.put(
        "http://localhost:8800/api/users/" + currentUser._id,
        newCoverPicture
      );
      const record = response.data;
      if (record.statusText === "Success") {
        toast.success(record.message);
      } else {
        toast.error(record.message);
      }
      user.coverPicture = list[0];
      setUser({ ...user });
    } catch (err) {
      toast.error("Somethings went wrong");
    }
  };

  return (
    <div className="table-update">
      <h3>Update Cover Picture</h3>
      <hr className="hr-popup" />
      <div className="table-update-cover">
        {files && (
          <div className="shareImgContainer">
            <img
              src={URL.createObjectURL(files[0])}
              alt=""
              className="update-cover-image"
            />
            <Cancel className="shareCancelImg" onClick={() => setFiles(null)} />
          </div>
        )}
        <form>
          <label htmlFor="file" className="update-cover-label">
            <input
              type="file"
              id="file"
              multiple
              className="update-cover-input"
              onChange={(e) => setFiles(e.target.files)}
            />
            Choose image
          </label>
        </form>
      </div>
      <button className="update-cover-button" onClick={updateCoverPicture}>
        Save
      </button>
    </div>
  );
}
