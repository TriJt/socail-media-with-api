import './topbar.css'
import {Search} from "@mui/icons-material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {Link} from "react-router-dom"
import { useContext,useState, useEffect } from 'react';
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios' ; 
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {useNavigate } from "react-router"

export default function Topbar() { 
  const {user:currentUser} = useContext(AuthContext); 
  const [user, setUser]  = useState(currentUser)
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]); 
  const history = useNavigate()
  useEffect(() => {
    const loadData = async()=>{ 
      const res = await axios.get("http://localhost:8800/api/users/search"); 
      setData(res.data)
    }
    loadData(); 

  }, [])
  

  // search user with filter search words 

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

  // Log out button 
  const LogoutHandle =() => { 
    localStorage.clear(); 
    history("/login"); 
    window.location.reload(); 
  }



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

          <Navbar>
            <li className='nav-item'> 
                <Link  to={`/`}>
                  <ControlPointOutlinedIcon  className='icon-button'/>
                </Link>
            </li>
            <li className='nav-item'> 
                <Link  to={`/`}>
                  <MailOutlinedIcon  className='icon-button'/>
                </Link>
            </li>
            <li className='nav-item'> 
                <Link  to={`/`}>
                  <NotificationsNoneIcon  className='icon-button'/>
                </Link>
            </li>
            <li className='nav-item'> 
            <Link  to={`profile/${user.username}`}
                      
                      > 
                      <img src={user.profilePicture 
                        ? user.profilePicture 
                        : "https://docsach24.co/no-avatar.png"} className="icon-button" 
                          alt='topbarimage' />
                      </Link>
            </li>
            <li className='nav-item'> 
              <button onClick={LogoutHandle} className = "button-logout"><LogoutOutlinedIcon className='icon-button' /></button>  
            </li>
          </Navbar>
      </div> 
    </div>
  )
}

function Navbar(props){ 
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        {props.children}
      </ul>
    </nav> 
  )
}



