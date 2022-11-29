import React, { useState, useEffect, useContext } from "react";

import Online from "../online/Online";
import "./rightbar.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function ChatRight({ onlineUser, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/users/friends/" + currentId
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUser.includes(f._id)));
  }, [friends, onlineUser]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home-right">
      <h4 className="rightbarTitle">Online Friend</h4>
      <ul className="rightbarFriendList">
        <>
          {onlineFriends.map((u) => (
            <li className="rightbarFriend">
              <div
                className="rightbarProfileImgContainer"
                onClick={() => handleClick(u)}
              >
                <img
                  src={u?.profilePicture}
                  alt=""
                  className="rightbarProfileImg"
                />
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">{u?.fullName}</span>
            </li>
          ))}
        </>
      </ul>
    </div>
  );
}
