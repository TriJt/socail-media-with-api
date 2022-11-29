import React, { useState, useEffect, useContext } from "react";
import TopBar from "../../components/topbar/TopBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./single.css";
import moment from "moment";
import { AiFillLike, AiOutlineComment } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";
import { FiHeart } from "react-icons/fi";

export default function SinglePost() {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const { user: currentUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState({});
  const [like, setLike] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/posts/" + id);
      setData(res.data);
      setLike(res.data.likes.length);
      console.log(res.data.likes.length);

      const resUser = await axios.get(
        "http://localhost:8800/api/users?userId=" + res.data.userId
      );
      setUser(resUser.data);
    };
    fetchData();
  }, []);

  // Like post
  const likeHandler = () => {
    try {
      axios.put("http://localhost:8800/api/posts/" + data._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <>
      <TopBar />
      <div className="singleContainer">
        <div className="container-sing">
          <div className="left-single">
            <img src={data.img} alt="" className="image-single" />
          </div>
          <div className="right-single">
            <div className="top-single">
              <img src={user.profilePicture} alt="" className="avatar-single" />
              <div className="name-single">
                {" "}
                <span className="name">{user.fullName}</span>
              </div>
            </div>
            <div className="center-single">
              {/* description for post  */}
              <img src={user.profilePicture} alt="" className="avatar-single" />
              <div className="item-single">
                <div className="name-single">
                  {" "}
                  <span className="name">{user.fullName}</span>
                  <span> {data.desc}</span>
                </div>
                <div className="time-single">
                  <span className="postDate">
                    {moment(data.createdAt).fromNow()}
                  </span>
                  {/* show comment */}
                </div>
              </div>
            </div>
            <div className="bottom-single">
              <div className="postBottomLeft">
                <FiHeart onClick={likeHandler} className="likeIcon" />
                <span className="postLikeCounter"> {like} people like it</span>
              </div>
              <span className="postDate">
                {moment(data.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
