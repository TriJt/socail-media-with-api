import React, { useState, useEffect } from "react";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import "./rightbar.css";
import axios from "axios";

export default function HomeRight({ onlineUser, currentId, setCurrentChat }) {
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

  console.log(onlineUser);
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
