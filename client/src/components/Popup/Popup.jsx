import React from "react";
import "./popup.css";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
export default function Popup(props) {
  const close = () => {
    props.setTrigger(false);
  };
  // () => props.setTrigger(false)
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={close}>
          <CancelRoundedIcon />
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
