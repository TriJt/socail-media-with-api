import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

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
    city: user.city,
    from: user.from,
    userId: user._id,
    relationship: user.relationship,
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
      <div className="top"></div>
      <div className="bottom">
        <form>
          <div className="setting-info">
            <div className="left">
              <span> City</span>
            </div>
            <div className="right">
              <input
                type="text"
                name="username"
                className="input-info"
                placeholder={user.city}
                autoComplete="off"
                onChange={InputHandler}
                value={inputField.city}
              />
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span> From</span>
            </div>
            <div className="right">
              <input
                type="text"
                name="from"
                className="input-info"
                placeholder={user.from}
                autoComplete="off"
                onChange={InputHandler}
                value={inputField.from}
              />
            </div>
          </div>
          <div className="setting-info">
            <div className="left">
              <span>Relationship</span>
            </div>
            <div className="right">
              <select
                name="relationship"
                className="input-info"
                onChange={InputHandler}
                value={inputField.relationship}
              >
                <option value="Marry">Marry</option>
                <option value="Single">Single</option>
                <option value="Dating">Dating</option>
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
