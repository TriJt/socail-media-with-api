import "./topbar.css";
import { Search } from "@mui/icons-material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";

export default function Topbar() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [data, setData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get("http://localhost:8800/api/users/search");
      setData(res.data);
    };

    loadData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/users?userId=" + user._id
      );
      setUser(res.data);
    };
    fetchData();
  }, []);

  // search user with filter search words

  const handleFilter = async (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.fullName.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  // Log out button
  const LogoutHandle = () => {
    window.sessionStorage.clear();
    window.location.reload();
    history("/login");
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Heaven</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            placeholder="Search for friend, post"
            className="searchInput"
            value={wordEntered}
            onChange={handleFilter}
          />
        </div>
        {filteredData.length !== 0 && (
          <div className="dataResult">
            {filteredData.map((value, key) => {
              return (
                <Link to={`profile/${value.username}`} className="search-link">
                  <img
                    className="img-search"
                    src={value.profilePicture}
                    alt=""
                  />
                  <p className="data">{value.fullName} </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      {/* Icon của các phần trong navbar  */}

      <div className="topbarRight">
        {/* chuyển về trang chủ */}
        <div className="div-icon">
          <Link to={`/`}>
            <HomeIcon className="icon-button" />
          </Link>
        </div>
        {/* Chuyển qua trang tin nhắn */}
        <div className="div-icon">
          <Link to={`/chat`}>
            <MailOutlinedIcon className="icon-button" />
          </Link>
        </div>
        {/* dropdown button  */}
        <div className="top-dropdown">
          <div className="top-dropdown-select">
            <Link to={`profile/${user.username}`}>
              <img src={user.profilePicture} className="icon-button" alt="" />
            </Link>
          </div>
          <ul className="top-dropdown-list">
            <li className="top-dropdown-item">
              <AccountCircleOutlinedIcon />
              <Link to={`profile/${user.username}`} className="dropdown-link">
                <span className="dropdown-text">My profile</span>
              </Link>
            </li>
            {/* tạo một cái popup trang đăng nhập  */}
            <li className="top-dropdown-item">
              <ChangeCircleOutlinedIcon />
              <span className="dropdown-text">Change account</span>
            </li>
            {/* chuyển hướng qua trang cài đặt/ chỉnh sửa thông tin cá nhân  */}
            <li className="top-dropdown-item">
              <SettingsOutlinedIcon />
              <Link to={`/settings`} className="dropdown-link">
                <span className="dropdown-text">Settings</span>
              </Link>
            </li>
            {/* Quay lại trang cá nhân và xóa dữ liệu có trong localStorage */}
            <li className="top-dropdown-item" onClick={LogoutHandle}>
              <LogoutOutlinedIcon />
              <span className="dropdown-text">Log out</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
