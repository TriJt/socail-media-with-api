import { useState, useEffect, useContext } from "react";
import "./post.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";

import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Popup from "../Popup/Popup";
import moment from "moment";
import { AiFillLike, AiOutlineComment } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { useParams } from "react-router";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [postPopup, setPostPopup] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  //link to profile
  const LinktoProfile = () => {
    return (
      <Link to={`profile/${user.username}`}>
        <img src={user.profilePicture} alt="" className="postProfileImg" />
      </Link>
    );
  };

  // Like post
  const likeHandler = () => {
    try {
      axios.put("http://localhost:8800/api/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <LinktoProfile />
            <span className="postUsername">{user.fullName} </span>
            <span className="postDate">{moment(post.createdAt).fromNow()}</span>
          </div>
          {/* show button update and delete post */}
          {/* need setting popup button in here */}
          <div className="postTopRight">
            <div className="dropdown-select-post">
              <MoreHorizIcon onClick={() => setPostPopup(true)} />
            </div>
            <Popup trigger={postPopup} setTrigger={setPostPopup}>
              <div className="div-edit">
                <span className="delete-post">Delete</span>
                <hr className="hr-popup" />
                <span className="edit-post">Edit</span>
                <hr className="hr-popup" />
              </div>
            </Popup>
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <AiFillLike onClick={likeHandler} className="likeIcon" />
            <FcLike onClick={likeHandler} className="heartIcon" />
            <span className="postLikeCounter"> {like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
        <hr className="hrPost" />
        <div className="likeAndCommentPost">
          <div className="likePostIcon" onClick={likeHandler}>
            <AiFillLike className="likeIcon" />
            Like
          </div>
          <div className="likePostIcon">
            <AiOutlineComment className="likeIcon" />
            Comment
          </div>
        </div>
        <hr className="hrPost" />
        <div className="postComment">
          <LinktoProfile />
          <div className="comment">
            <input
              type="text"
              className="commentInput"
              placeholder="Write a comment"
            />
            <CameraAltIcon className="" />
          </div>
        </div>
      </div>
    </div>
  );
}
