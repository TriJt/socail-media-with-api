import React, { useState, useEffect, useContext } from "react";
import TopBar from "../../components/topbar/TopBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./single.css";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import { FiHeart } from "react-icons/fi";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Popup from "../../components/Popup/Popup";

export default function SinglePost() {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const { user: currentUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState({});
  const [like, setLike] = useState("");
  const [update, setUpdate] = useState(false);
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState([]);
  const [text, setText] = useState("");
  const [comment, setComment] = useState([]);
  const [postPopup, setPostPopup] = useState(false);
  const [idComment, setIdComment] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [updateComment, setUpdateComment] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [reply, setReply] = useState("");
  const [dataReply, setDataReply] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/posts/" + id);
      setData(res.data);
      setDesc(res.data.desc);
      setImg(res.data.img);
      setLike(res.data.likes.length);
      const resUser = await axios.get(
        "http://localhost:8800/api/users?userId=" + res.data.userId
      );
      setUser(resUser.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/posts/comment/" + id
      );
      // setComment(res.data);
      const comment = res.data;
      const length = comment.length;
      let i;
      let a;
      let j;
      for (i = 0; i <= length; i++) {
        console.log(comment[i].commentId);
        console.log(comment[i]._id);
        for (j = 0; j <= length; j++) {
          if (comment[i].commentId === comment[j]._id) {
            a = comment[i];
          }
          console.log(comment[i].commentId);
          console.log(comment[i]._id);
        }
      }
      setReply(a);
      // const resReply = await axios.get(
      //   "http://localhost:8800/api/comment/reply/" + comment._id
      // );
      // setDataReply(resReply.data);
      // console.log(resReply);
    };
    fetchComment();
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

  const LinktoProfile = () => {
    return (
      <Link to={`profile/${user.username}`}>
        <img src={user.profilePicture} alt="" className="postProfileImg" />
      </Link>
    );
  };

  const resetComment = async () => {
    const res = await axios.get(
      "http://localhost:8800/api/posts/comment/" + id
    );
    setComment(res.data);
  };
  const deleteSubmit = async (e) => {
    try {
      await axios.delete("http://localhost:8800/api/comment/" + idComment, {
        data: { userId: currentUser._id, postId: id },
      });
      resetComment();
      setTimeout(() => {
        setPostPopup(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const Update = () => {
    if (currentUser._id !== data.userId)
      return (
        <Popup trigger={postPopup} setTrigger={setPostPopup}>
          <div className="div-edit">
            <Link to={`/post/${data._id}`} style={{ textDecoration: "none" }}>
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
                if (window.confirm("are you sure to delete this comment?"))
                  deleteSubmit();
              }}
            >
              Delete
            </span>
            <hr className="hr-popup" />
            <span
              className="edit-post"
              onClick={() => {
                setShowUpdate(true);
                setPostPopup(false);
              }}
            >
              Edit
            </span>
            <hr className="hr-popup" />
            <span className="edit-post" onClick={() => setPostPopup(false)}>
              Cancel
            </span>
          </div>
        </Popup>
      );
  };

  const UpdateHandler = async (e) => {
    e.preventDefault();
    const dataUpdate = {
      userId: currentUser._id,
      desc: desc,
      img: img[0],
    };

    try {
      const res = await axios.put(
        "http://localhost:8800/api/posts/" + id,
        dataUpdate
      );

      setData(res.data);
      setUpdate(false);
      toast.success("Update post successfully");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const updateCommentHandler = async (e) => {
    e.preventDefault();
    const dataUpdate = {
      text: updateComment,
    };

    try {
      const res = await axios.put(
        "http://localhost:8800/api/comment/" + idComment,
        dataUpdate
      );
      resetComment();
      setShowUpdate(false);
      toast.success("Update comment successfully");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const CommentReplyHandler = async (e) => {
    e.preventDefault();

    const data = {
      commentId: idComment,
      postId: id,
      fullName: user.fullName,
      userId: user._id,
      image: user.profilePicture,
      text: reply,
    };
    try {
      const res = await axios.post(
        "http://localhost:8800/api/comment/add",
        data
      );
      setComment([...comment, res.data]);
      setShowReply(false);
    } catch (error) {
      console.log(error);
    }
  };

  const CommentHandler = async (e) => {
    e.preventDefault();

    const data = {
      commentId: "",
      postId: id,
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

  return (
    <>
      <TopBar />
      <ToastContainer />
      <div className="singleContainer">
        <div className="container-sing">
          {!data && data.img !== null ? (
            <>
              <div className="left-single">
                <img src={img} alt="" className="image-single" />
              </div>
            </>
          ) : (
            <div className="left-single">
              <img src={img} alt="" className="image-single" />
            </div>
          )}

          <div className="right-single">
            <div className="top-single">
              <div className="profile-single">
                <img
                  src={user.profilePicture}
                  alt=""
                  className="avatar-single"
                />
                <div className="name-single">
                  <span className="name">{user.fullName}</span>
                </div>
              </div>
              <Update />
              <div className="dropdown-select-post" style={{ float: "right" }}>
                <MoreHorizIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setUpdate(true)}
                />
              </div>
            </div>
            <div className="center-single">
              <div className="item-center">
                <img
                  src={user.profilePicture}
                  alt=""
                  className="avatar-single"
                />

                <div className="item-single">
                  <div className="name-single">
                    <span className="name">{user.fullName}</span>
                    {update === true ? (
                      <>
                        <div className="update-div">
                          <textarea
                            type="text"
                            name="Desc"
                            className="input-update"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                          />
                          <div className="div-button">
                            <button onClick={UpdateHandler}>Update</button>
                            <button onClick={() => setUpdate(false)}>
                              Close
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <span> {data.desc}</span>
                      </>
                    )}
                  </div>
                  <div className="time-single">
                    <span className="postDate">
                      {moment(data.createdAt).fromNow()}
                    </span>
                    {/* show comment */}
                  </div>
                </div>
              </div>
              <div className="likeAndCommentPost">
                {comment.length !== 0 ? (
                  <>
                    {comment.map((value, index) => (
                      <div className="comment-container">
                        <div className="image-comment">
                          <img
                            src={value.image}
                            alt=""
                            className="postProfileImg"
                          />
                        </div>
                        <div className="comment-div" key={index}>
                          <div className="item-comment">
                            <div className="name-container-comment">
                              <span className="name-comment">
                                {value.fullName}
                              </span>
                              {showUpdate && idComment === value._id ? (
                                <>
                                  <div className="update-div">
                                    <textarea
                                      type="text"
                                      name="Desc"
                                      className="input-update"
                                      value={updateComment}
                                      onChange={(e) =>
                                        setUpdateComment(e.target.value)
                                      }
                                    />
                                    <div className="div-button">
                                      <button onClick={updateCommentHandler}>
                                        Update
                                      </button>
                                      <button
                                        onClick={() => setShowUpdate(false)}
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <span className="text-comment">
                                  {value.text}
                                </span>
                              )}
                            </div>
                            <FiHeart className="small" />
                          </div>
                          <div className="update-comment">
                            <span className="postDate">
                              {moment(comment.createdAt).fromNow()}
                            </span>
                            <span>{value.like.length} like</span>
                            <span
                              onClick={() => {
                                setShowReply(true);
                                setIdComment(value._id);
                              }}
                            >
                              Reply
                            </span>
                            <span className="update-icon">
                              {currentUser._id === value.userId ? (
                                <MoreHorizIcon
                                  style={{
                                    fontSize: "13px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setPostPopup(true);
                                    setIdComment(value._id);
                                    setUpdateComment(value.text);
                                  }}
                                />
                              ) : null}
                            </span>
                          </div>
                          {showReply && idComment === value._id ? (
                            <>
                              <div className="postComment">
                                <LinktoProfile />
                                <div className="comment">
                                  <input
                                    type="text"
                                    className="commentInput"
                                    placeholder="Write a comment"
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                  />
                                  {reply.length >= 1 ? (
                                    <>
                                      <div
                                        style={{
                                          color: "Blue",
                                          fontWeight: "500",
                                          cursor: "pointer",
                                        }}
                                        onClick={CommentReplyHandler}
                                      >
                                        Post
                                      </div>
                                    </>
                                  ) : (
                                    <div
                                      style={{
                                        color: "red",
                                        cursor: "pointer",
                                        marginRight: "4px",
                                        fontSize: "14px",
                                      }}
                                      onClick={() => setShowReply(false)}
                                    >
                                      {" "}
                                      Cancel
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          ) : null}

                          {reply.map((r, index) => (
                            <div
                              className="name-container-comment"
                              style={{ paddingLeft: "10px" }}
                              key={index}
                            >
                              <span className="name-comment">{r.fullName}</span>
                              {showUpdate === false ? (
                                <span className="text-comment">{r.text}</span>
                              ) : (
                                <>
                                  <div className="update-div">
                                    <textarea
                                      type="text"
                                      name="Desc"
                                      className="input-update"
                                      value={updateComment}
                                      onChange={(e) =>
                                        setUpdateComment(e.target.value)
                                      }
                                    />
                                    <div className="div-button">
                                      <button onClick={updateCommentHandler}>
                                        Update
                                      </button>
                                      <button
                                        onClick={() => setShowUpdate(false)}
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>{" "}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
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
      </div>
    </>
  );
}
