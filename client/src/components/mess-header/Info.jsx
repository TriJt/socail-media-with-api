import React from "react";
import "./info.css";

export default function Info() {
  return (
    <div className="info">
      <div className="info-top">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          alt=""
          className="info-img"
        />
        <div className="info-info">
          <span className="info-name"> Thanh tri </span>
          <span className="info-active "> Active 2 hour ago </span>
        </div>
      </div>
      <div className="info-bottom"></div>
    </div>
  );
}
