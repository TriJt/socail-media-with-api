import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import TopBar from "../../components/topbar/TopBar";
import HomeRightBar from "../../components/rightbar/HomeRight";
import "./chat.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Conversation from "../../components/conversation/Conversation";
import Messenger from "../../components/messenger/Messenger";
import SendIcon from "@mui/icons-material/Send";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";

export default function Chat() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUser", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  // get conversation from data
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/conversations/" + user._id
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [user._id]);

  // get message from data
  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  // create new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "http://localhost:8800/api/messages/",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // scroll focus to new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <TopBar />
      <div className="chat-container">
        <div className="chat">
          <div className="chat-menu">
            {/* header for chat menu */}
            <div className="chat-menu-wrapper">
              <div className="chat-username">
                <span>{user.username} </span>
                <ExpandMoreIcon />
              </div>
              {/* button to show popup and find new friend to text mess */}
              <div className="chat-popup-find">
                <PersonSearchOutlinedIcon />
              </div>
              {/* For main menu mess */}
            </div>
            <div className="chat-menu-main">
              {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
            </div>
          </div>
          {/* Chat box main */}
          <div className="chat-box">
            {/* for main chat box */}
            <div className="chat-box-main">
              {currentChat ? (
                <>
                  <div className="main-top">
                    {messages.map((m) => (
                      <div ref={scrollRef}>
                        <Messenger
                          message={m}
                          own={m.sender === user._id}
                          userinfo={user}
                        />
                      </div>
                    ))}
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
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      ></textarea>
                      <ImageOutlinedIcon className="bottom-icon" />
                      <FavoriteBorderOutlinedIcon className="bottom-icon" />
                      <SendIcon
                        className="bottom-icon"
                        onClick={handleSubmit}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="noConversation">
                  <SendOutlinedIcon
                    fontSize="large"
                    className="icon-noConversation"
                  />
                  <h4 className="h4-noConversation"> Your Conversation</h4>
                  <span className="span-noConversation">
                    Open a conversations to chat with your friend{" "}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="chat-online">
            <HomeRightBar
              onlineUser={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
