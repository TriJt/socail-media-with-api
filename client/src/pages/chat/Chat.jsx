import React from "react";
import TopBar from "../../components/topbar/TopBar";
import "./chat.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Conversation from "../../components/conversation/Conversation";
import Messenger from "../../components/messenger/Messenger";
import Info from "../../components/mess-header/Info";

export default function Chat() {
  return (
    <div>
      <TopBar />
      <div className="chat-container">
        <div className="chat">
          <div className="chat-menu">
            {/* header for chat menu */}
            <div className="chat-menu-wrapper">
              <div className="chat-username">
                <span>thanhtri </span>
                <ExpandMoreIcon />
              </div>
              {/* button to show popup and find new friend to text mess */}
              <div className="chat-popup-find">
                <PersonSearchOutlinedIcon />
              </div>
              {/* For main menu mess */}
            </div>
            <div className="chat-menu-main">
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
            </div>
          </div>
          {/* Chat box main */}
          <div className="chat-box">
            {/* for header chat box */}
            <div className="chat-box-wrapper">
              <Info />
            </div>
            {/* for main chat box */}
            <div className="chat-box-main">
              <div className="main-top">
                <Messenger />
                <Messenger own={true} />
                <Messenger />
                <Messenger own={true} />
              </div>
              <div className="main-bottom">
                <div className="bottom-text">
                  <textarea
                    name=""
                    id=""
                    placeholder="Texting..."
                    cols="30"
                    rows="1"
                    className="bottom-textarea"
                  ></textarea>
                  <ImageOutlinedIcon />
                  <FavoriteBorderOutlinedIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
