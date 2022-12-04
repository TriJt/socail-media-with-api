import { useState, useEffect, useContext } from "react";
import "./post.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Popup from "../Popup/Popup";
import moment from "moment";
import { AiFillLike, AiOutlineComment } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [postPopup, setPostPopup] = useState(false);
  const [user, setUser] = useState({});
  const [comment, setComment] = useState([]);
  const [text, setText] = useState("");
  const [avatar, setAvatar] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/posts/comment/" + post._id
      );

      setComment(res.data);
    };
    fetchComment();
  }, []);

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

  const deleteSubmit = async (e) => {
    try {
      await axios.delete("http://localhost:8800/api/posts/" + post._id, {
        data: { userId: currentUser._id },
      });
      setTimeout(() => {
        setPostPopup(false);
        window.location.reload(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const CommentHandler = async (e) => {
    e.preventDefault();

    const data = {
      commentId: "",
      postId: post._id,
      fullName: user.fullName,
      userId: user._id,
      image: user.profilePicture,
      text: text,
    };
    try {
      const res = await axios.post(
        "http://localhost:8800/api/comment/add",
        data
      );
      setComment([...comment, res.data]);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  const Update = () => {
    if (currentUser._id !== post.userId)
      return (
        <Popup trigger={postPopup} setTrigger={setPostPopup}>
          <div className="div-edit">
            <Link to={`/post/${post._id}`} style={{ textDecoration: "none" }}>
              <span className="edit-post">Go to post</span>
            </Link>

            <hr className="hr-popup" />
            <span className="edit-post" onClick={() => setPostPopup(false)}>
              Cancel
            </span>
          </div>
        </Popup>
      );
    else
      return (
        <Popup trigger={postPopup} setTrigger={setPostPopup}>
          <div className="div-edit">
            <span
              className="delete-post"
              onClick={() => {
                if (window.confirm("are you sure to delete this post?"))
                  deleteSubmit();
              }}
            >
              Delete
            </span>
            <hr className="hr-popup" />
            <Link to={`/post/${post._id}`} style={{ textDecoration: "none" }}>
              <span className="edit-post">Edit</span>
              <hr className="hr-popup" />
            </Link>
            <span className="edit-post" onClick={() => setPostPopup(false)}>
              Cancel
            </span>
          </div>
        </Popup>
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
          <div className="postTopRight">
            <div className="dropdown-select-post">
              <MoreHorizIcon
                style={{ cursor: "pointer" }}
                onClick={() => setPostPopup(true)}
              />
            </div>
            <Update />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <FiHeart onClick={likeHandler} className="likeIcon" />
            <span className="postLikeCounter"> {like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.comment.length} comments
            </span>
          </div>
        </div>
        <hr className="hrPost" />
        {/* show comment */}
        <div className="likeAndCommentPost">
          {comment.length !== 0 ? (
            <>
              {comment.map((value, index) => (
                <div className="comment-div-post" key={index}>
                  <div className="item-comment-post">
                    <span className="name-comment">{value.fullName}</span>
                    <span className="text-comment">{value.text} </span>
                  </div>
                  <FiHeart className="small" />
                </div>
              ))}
            </>
          ) : (
            <>
              <span
                style={{
                  textAlign: "center",
                  width: "100%",
                  height: "40px",
                  fontWeight: "500",
                }}
              >
                Be the first to comment on the article.{" "}
              </span>
            </>
          )}
        </div>
        <div className="postComment">
          <LinktoProfile />
          <div className="comment">
            <input
              type="text"
              className="commentInput"
              placeholder="Write a comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {text.length >= 1 ? (
              <>
                <div
                  style={{
                    color: "Blue",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  onClick={CommentHandler}
                >
                  Post
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
