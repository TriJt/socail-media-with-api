import React from "react";
import "./home.css";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";

const Home = () => {
  return (
    <>
      <TopBar />
      <div className="homeContainer">
        {/* <SideBar/> */}
        <Feed />
      </div>
    </>
  );
};

export default Home;
