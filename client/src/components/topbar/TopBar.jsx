import './topbar.css'
import {Search, Person, Chat} from "@mui/icons-material"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {Link} from "react-router-dom"

export default function Topbar() {
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
            <img src="/assets/person/1.jpg" className="topbarImage" alt='topbarimage' />
        </div>
      </div>
    </div>
  )
}


