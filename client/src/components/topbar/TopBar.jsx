import './topbar.css'
import {Search, Person, Chat, Remove} from "@mui/icons-material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {Link} from "react-router-dom"
import { useContext,useState, useEffect } from 'react';
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios' ; 


export default function Topbar() {

  const [open , useOpen ] = useState(false); 
  const {user:currentUser} = useContext(AuthContext); 
  const [user, setUser]  = useState(currentUser)
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]); 

  useEffect(() => {
    const loadData = async()=>{ 
      const res = await axios.get("http://localhost:8800/api/users/search"); 
      setData(res.data)
    }
    loadData(); 

  }, [])
  

const handleFilter = async (e)=> { 
  const searchWord =  e.target.value; 
  setWordEntered(searchWord); 
  const newFilter =   data.filter(
    (value)=> { 
      return value.fullName.toLowerCase().includes(searchWord.toLowerCase()); 
    }); 
  if(searchWord === ""){ 
    setFilteredData([])
  }else{ 
    setFilteredData(newFilter)
  }
}; 

  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to = "/" style={{textDecoration: 'none'}}>
        <span className="logo">Heaven</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input type="text" placeholder='Search for friend, post' className="searchInput" value={wordEntered}
          onChange={handleFilter} />
        </div>
          {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            return (
              <Link  to={`profile/${value.username}`} className = "search-link">
                <img className='img-search' src={value.profilePicture}  alt=""/>
                <p className='data'>{value.fullName} </p>
              </Link>
            );
          })}
        </div>
      )}
        </div>
      {/* Icon của các phần trong navbar  */}

      <div className="topbarRight">
        <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <NotificationsNoneIcon />
              <span className="topbarIconBadge">1</span>
            </div>
          {/* Chỗ này là sử dụng dropdown để show ra các thông tin như
            - Trang cá nhân 
            - Trợ giúp
            - Log out
            - Ghi chú nguồn  */}
          <Link to={`profile/${user.username}`}> 
                  <img src={user.profilePicture 
                  ? user.profilePicture 
                  : "https://docsach24.co/no-avatar.png"} className="topbarImage" 
                    alt='topbarimage' />
                  </Link>

        </div>
      </div>
    </div>
  )
}

