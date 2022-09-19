import React from "react";
import "./messenger.css";

export default function Messenger({ own }) {
  return (
    <div className={own ? "messenger own" : "messenger"}>
      <div className="messenger-top">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          alt=""
          className="messenger-img"
        />
        <span className="messenger-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </span>
      </div>
      <div className="messenger-bottom">2 hour ago </div>
    </div>
  );
}
