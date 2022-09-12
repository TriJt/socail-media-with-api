import { useState, useEffect, useContext } from "react";
import "./updateProfile.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import TopBar from "../../components/topbar/TopBar";

export default function UpdateProfile() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const username = useParams().username;
  const [files, setFiles] = useState("");

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
    <div>
      <TopBar />
      <div className="profile-update">
        <ToastContainer />
        {/* cover image */}

        {/* avatar  */}

        {/* update Bio  */}

        {/* update profile  */}
        <form>
          <div className="profile-edit">
            <label className="label-edit"> Full Name:</label>
            <input
              type="text"
              className="input-edit"
              name="fullName"
              placeholder={user.fullName}
              value={inputField.fullName}
              onChange={InputHandler}
            />
          </div>
          <div className="profile-edit">
            <label className="label-edit"> Description:</label>
            <input
              type="text"
              className="input-edit"
              name="desc"
              placeholder={user.desc}
              value={inputField.desc}
              onChange={InputHandler}
            />
          </div>
          <div className="profile-edit">
            <label className="label-edit"> City:</label>
            <input
              type="text"
              className="input-edit"
              name="city"
              placeholder={user.city}
              value={inputField.city}
              onChange={InputHandler}
            />
          </div>
          <div className="profile-edit">
            <label className="label-edit"> From:</label>
            <input
              type="text"
              className="input-edit"
              name="from"
              placeholder={user.from}
              value={inputField.from}
              onChange={InputHandler}
            />
          </div>
          <div className="profile-edit">
            <label className="label-edit">Relationship:</label>
            <input
              type="text"
              className="input-edit"
              name="relationship"
              placeholder={user.relationship}
              value={inputField.relationship}
              onChange={InputHandler}
            />
          </div>
          <button
            className="button-update"
            type="submit"
            onClick={submitUpdate}
          >
            Update profile
          </button>
        </form>
      </div>
    </div>
  );
}
