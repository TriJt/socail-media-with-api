import React from "react";
import "./home.css";
import TopBar from "../../components/topbar/TopBar";

import Feed from "../../components/feed/Feed";
import HomeRight from "../../components/rightbar/HomeRight";

const Home = () => {
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        {/* <SideBar/> */}
        <Feed />
        <HomeRight />
      </div>
    </>
  );
};

export default Home;
