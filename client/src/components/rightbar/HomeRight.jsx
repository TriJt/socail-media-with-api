import React, { useState, useEffect, useContext } from "react";

import Online from "../online/Online";
import "./rightbar.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function HomeRight({ onlineUser, currentId, setCurrentChat }) {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/users/friends/" + user._id
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUser.includes(f._id)));
  }, [friends, onlineUser]);

  return (
    <div className="home-right">
      <h4 className="rightbarTitle">Online Friend</h4>
      <ul className="rightbarFriendList">
        {onlineFriends.map((u) => (
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img
                src={u.profilePicture}
                alt=""
                className="rightbarProfileImg"
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{u.fullName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
