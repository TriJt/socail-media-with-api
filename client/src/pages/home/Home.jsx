import React from 'react'
import './home.css'

import TopBar from "../../components/topbar/TopBar"; 
import SideBar from "../../components/sidebar/Sidebar"; 
import RightBar from '../../components/rightbar/RightBar';
import Feed from '../../components/feed/Feed';

const Home = () => {
  return (
    <>
    <TopBar />
    <div className="homeContainer">
      <SideBar/>
      <Feed/>
      <RightBar/>
    </div>
    </>
    
  )
}

export default Home