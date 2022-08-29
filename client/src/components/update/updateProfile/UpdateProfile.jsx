import { useState, useEffect, useContext } from "react";
import "./updateProfile.css";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useParams } from "react-router";

export default function UpdateProfile() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const username = useParams().username;

  // cover image
  const CoverImage = () => {
    return (
      <>
        <img src={user.coverPicture} alt="" className="cover-image" />
      </>
    );
  };

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

  const UpdateProfile = async (e) => {
    e.preventDefault();
  };

  return (
    <form>
      <div className="profile-update">
        {/* cover image */}
        <div className="cover-image-div">
          <button className="button-edit-cover"> Edit cover image</button>
          <CoverImage />
        </div>
        {/* avatar  */}

        {/* update Bio  */}

        {/* update profile  */}

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
      </div>
    </form>
  );
}
