import React from "react";
import "./conversation.css";

export default function Conversation() {
  return (
    <div className="conversation">
      <div className="conversation-image">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          alt=""
          className="conversation-img"
        />
      </div>
      <div className="conversation-name">
        <span className="name"> Thanh tri</span>
      </div>
    </div>
  );
}
