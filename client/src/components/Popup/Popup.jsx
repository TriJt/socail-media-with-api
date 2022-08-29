import React from "react";
import "./popup.css";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
export default function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          <CancelRoundedIcon />
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
