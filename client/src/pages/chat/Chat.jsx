import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import TopBar from "../../components/topbar/TopBar";
import ChatRightBar from "../../components/rightbar/ChatRight";
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
import { Search } from "@mui/icons-material";

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
  const [friend, setFriends] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/users/friends/" + user._id
      );
      setData(res.data);
    };
    loadData();
  }, []);

  const handleFilter = async (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.username.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

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
    const getFriends = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/users/friends/" + user._id
      );
      setFriends(res.data);
    };
    getFriends();
  }, [user._id]);

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

  const CreateConversation = async (id) => {
    try {
      const data = {
        senderId: user._id,
        receiverId: id,
      };
      console.log("data", data);
      const res = await axios.post(
        "http://localhost:8800/api/conversations/",
        data
      );
      console.log(res.data);

      // setConversations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
              <div className="topbarCenter">
                <div className="searchbar">
                  <Search className="searchIcon" />
                  <input
                    type="text"
                    placeholder="Search for friend, post"
                    className="searchInput"
                    value={wordEntered}
                    onChange={handleFilter}
                  />
                </div>
                {filteredData.length !== 0 && (
                  <div className="dataResult chatSearch">
                    {filteredData.map((value, key) => {
                      return (
                        <div
                          key={key}
                          className="search-link"
                          onClick={() => CreateConversation(value._id)}
                        >
                          <img
                            className="img-search"
                            src={value.profilePicture}
                            alt=""
                          />
                          <p className="data">{value.username} </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="chat-menu-main">
              {conversations.map((c, index) => (
                <div onClick={() => setCurrentChat(c)} key={index}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
            </div>
          </div>
          {/* Chat box main */}
          <div className="chat-box">
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
        </div>
      </div>
    </div>
  );
}
