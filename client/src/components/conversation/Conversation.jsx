import { useState, useEffect } from "react";
import axios from "axios";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    // promise for getuser with friendId
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users?userId=" + friendId
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <div className="conversation-image">
        <img src={user?.profilePicture} alt="" className="conversation-img" />
      </div>
      <div className="conversation-name">
        <span className="name">{user?.username}</span>
      </div>
    </div>
  );
}
