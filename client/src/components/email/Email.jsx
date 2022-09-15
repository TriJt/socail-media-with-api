import React from "react";
import "./email.css";

export default function Email() {
  return (
    <div className="email">
      <div className="top-email">
        <span> Email of heaven</span>
      </div>
      <div className="bottom-email">
        <span>
          Emails about security and login activity from Heaven in the last 14
          days will show up here. You can use this list to verify which emails
          are real and which are fake.
        </span>
      </div>
      <hr className="hr-email" />
    </div>
  );
}
