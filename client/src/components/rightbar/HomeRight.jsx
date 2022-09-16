import React from "react";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import "./rightbar.css";

export default function HomeRight() {
  return (
    <div className="home-right">
      <h4 className="rightbarTitle">Online Friend</h4>
      <ul className="rightbarFriendList">
        {Users.map((u) => (
          <Online key={u.id} user={u} />
        ))}
      </ul>
    </div>
  );
}
