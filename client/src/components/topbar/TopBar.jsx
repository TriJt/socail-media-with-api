import './topbar.css'
import {Search, Person, Chat} from "@mui/icons-material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {Link} from "react-router-dom"
import { useContext,useState } from 'react';
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios' ; 

export default function Topbar() {

  const {user:currentUser} = useContext(AuthContext); 
  const [user, setUser]  = useState(currentUser)
  
  // const [filteredData,setFilteredData] = useState([])
  // const handleFilter = async (e)=> { 
  //   const searchWord =  e.target.value; 
  //   const newFilter = await axios.get("http://localhost:8800/api/users?fullName="+ searchWord).filter(
  //     (value)=> { 
  //       return value.
  //     }
  //   )
  // }


  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to = "/" style={{textDecoration: 'none'}}>
        <span className="logo">Heavensocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className='searchIcon'/>
          <input type="text" placeholder='Search for friend, post' className="searchInput" />
          <div className="dataResult"> </div>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
            <span className="topbarLink">Home</span>
            <span className="topbarLink">Timeline</span>
        </div>
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


