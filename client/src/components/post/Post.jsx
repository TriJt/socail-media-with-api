import { useState, useEffect,useContext } from 'react'
import './post.css'
import {MoreVert} from '@mui/icons-material'
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'

export default function Post({post}) {

  const [like, setLike] = useState(post.likes.length);
  const [user, setUser] = useState({})
  const [isLiked, setIsLiked] = useState(false); 
  const {user:currentUser} = useContext(AuthContext)

  useEffect(()=>{ 
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id, post.likes])   

  useEffect(() => {
    const fetchUser = async() =>{ 
      // Lấy dữ liệu bài post từ API timeline 
      const res = await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`); 
      setUser(res.data);
    }
    fetchUser();
  }, [post.userId]) 


  const likeHandler =()=>{ 
    try {
      axios.put("http://localhost:8800/api/posts/"+post._id+"/like", {userId:currentUser._id })
    } catch (err) {
      console.log(err)
    }
    setLike(isLiked  ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to = {`profile/${user.username}`}> 
            <img src={user.profilePicture 
            ? user.profilePicture 
            : "https://docsach24.co/no-avatar.png" } 
            alt="" 
            className="postProfileImg" />
            </Link>
            <span className="postUsername">{user.firstName} {user.lastName}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className='postIcon'/> 
          </div>

        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.img} alt=""  className='postImg'/>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="https://i.pinimg.com/564x/c0/d2/16/c0d21611b7e1ef0bf8486900301822a4.jpg" onClick={likeHandler} alt="" className='likeIcon'/>
            <img src="https://i.pinimg.com/564x/dc/c4/31/dcc431b1556f141a480e28f80abf4ce5.jpg" onClick={likeHandler} alt="" className='likeIcon'/>
            <span className="postLikeCounter"> {like} people like it</span>
          </div>
          <div className="postBottomRight"> 
          <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
