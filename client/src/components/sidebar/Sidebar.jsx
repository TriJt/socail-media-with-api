import React from 'react'
import './sidebar.css'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import {Chat, Group, Bookmark,QuestionAnswer, Work, Event, School} from '@mui/icons-material'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import {Users} from "../../dummyData"
import CloseFriend from '../closeFriend/CloseFriend';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <RssFeedIcon  className='sidebarIcon'/>
              <span className="sidebarListItemText">Feed</span>
            </li>
            <li className="sidebarListItem">
              <Chat  className='sidebarIcon'/>
              <span className="sidebarListItemText">Chats</span>
            </li>
            <li className="sidebarListItem">
              <OndemandVideoIcon  className='sidebarIcon'/>
              <span className="sidebarListItemText">Video</span>
            </li>
            <li className="sidebarListItem">
              <Group  className='sidebarIcon'/>
              <span className="sidebarListItemText">Groups</span>
            </li>
            <li className="sidebarListItem">
              <Bookmark  className='sidebarIcon'/>
              <span className="sidebarListItemText">Bookmasks</span>
            </li>
            <li className="sidebarListItem">
              <QuestionAnswer  className='sidebarIcon'/>
              <span className="sidebarListItemText">Questions</span>
            </li>
            <li className="sidebarListItem">
              <Work  className='sidebarIcon'/>
              <span className="sidebarListItemText">Jobs</span>
            </li>
            <li className="sidebarListItem">
              <Event  className='sidebarIcon'/>
              <span className="sidebarListItemText">Events</span>
            </li>
            <li className="sidebarListItem">
              <School  className='sidebarIcon'/>
              <span className="sidebarListItemText">Courses</span>
            </li>
          </ul>
          <button className='sidebarButton'>Show More</button> 
          <hr className="sidebarHr" />
          <ul className="sidebarFriendList">
            {Users.map(u => (
              <CloseFriend key={u.id} user = {u} />
            ))}
          </ul>
      </div>
    </div>
  )
}

