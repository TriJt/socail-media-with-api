import React from "react";
import "./help.css";
export default function Help() {
  return (
    <div className="help">
      <div className="top-help">
        <span> Help</span>
      </div>
      <div className="bottom-help">
        <span className="span-help">Help Center</span>
        <span className="span-help">Help about security and privacy</span>
        <span className="span-help">Request help</span>
      </div>
      <hr className="hr-help" />
    </div>
  );
}
