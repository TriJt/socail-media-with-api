import React, { useState, useContext, useEffect } from "react";
import "./home.css";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Home = () => {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [data, setData] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/users/limit");
      setData(res.data);
    };
    fetchData();
  }, []);

  // Log out button
  const LogoutHandle = () => {
    window.sessionStorage.clear();
    window.location.reload();
    history("/login");
  };

  return (
    <>
      <TopBar />
      <div className="homeContainer">
        <Feed />
        <div className="new-friend">
          <div className="top-friend">
            <div className="item-new">
              <img src={user.profilePicture} alt="" className="image-home" />
              <div className="text-item">
                <span className="name">{user.username}</span>
                <span className="text">{user.fullName}</span>
              </div>
              <div className="button-follow" onClick={LogoutHandle}>
                {" "}
                Log out
              </div>
            </div>
          </div>
          <div className="bottom-friend">
            <div className="header-home">
              <span>Suggestions for you</span>

              <span>See all</span>
            </div>
            <div className="items-home">
              {data.map((friends, u) => (
                <div className="item-friends" key={u}>
                  <img
                    src={friends.profilePicture}
                    alt=""
                    className="image-friend"
                  />
                  <div className="text-item">
                    <span className="name">{friends.username}</span>
                    <span className="text">Suggestions for you</span>
                  </div>
                  <div className="button-follow">
                    <Link
                      to={"/profile/" + friends.username}
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        textAlign: "center",
                      }}
                    >
                      See
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
