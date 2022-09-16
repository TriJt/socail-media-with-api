import { useParams } from "react-router";
import "./feed.css";
import { useState, useEffect, useContext } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    const fetchPosts = async () => {
      // Lấy dữ liệu bài post từ API timeline
      const res = user.username
        ? await axios.get(
            "http://localhost:8800/api/posts/profile/" + user.username
          )
        : await axios.get(
            "http://localhost:8800/api/posts/timeline/" + user._id
          );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [user.username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!user.username || user.username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
