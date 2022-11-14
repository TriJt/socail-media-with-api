import React from "react";
import "./messenger.css";
import moment from "moment";

export default function Messenger({ message, own, userinfo }) {
  return (
    <div className={own ? "messenger own" : "messenger"}>
      <div className="messenger-top">
        <img src={userinfo.profilePicture} alt="" className="messenger-img" />
        <span className="messenger-text">{message.text}</span>
      </div>
      <div className="messenger-bottom">
        {moment(message.createdAt).fromNow()}
      </div>
    </div>
  );
}
