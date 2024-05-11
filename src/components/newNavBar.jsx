import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/auth.context";
import "../styles/newNavBar.css"
function NewNavBar() {
  const { isLoggedIn, user, logOut } = useContext(AuthContext);
  const { userId } = useParams();
  return (
    <div>
      <ul className="Navbar">
        <div className="navbar-left" style={{float:"left", marginLeft:"40px"}} >
          <li>
            <a href="/">
              <img
                src="https://res.cloudinary.com/dvtmccjmf/image/upload/v1715202629/movie-gallery/ooknxf0lie1byqo0o9jo.png"
                alt="logopic"
                className="logo"
              ></img>
            </a>
          </li>
          <li>
            <a href="/" className="site-name">QuickFix</a>
          </li>
        </div>
        {!isLoggedIn && (
          <div className="navbar-right"  style={{float:"right", marginRight:"60px", paddingTop:"30px"}}>
            <li>
              <a href="/about-us" className="about-us">about us</a>
            </li>
            <li>
              <a href="/login">
              <FaUserCircle className="user-icon"></FaUserCircle>
              </a>
            </li>
          </div>
        )}
        {isLoggedIn && (
          <div className="navbar-right" style={{float:"right", marginRight:"60px",  paddingTop:"30px"}}>
            <li>
              <a href="/about-us" className="about-us">about us</a>
            </li>
            <li>
            <a href={`/user/${user._id}/profile`} className="my-profile-button">My Profile</a>
            </li>
            <li>
            <a href="/" onClick={logOut} className="user-logout"><FaSignOutAlt  className="sign-out-icon"></FaSignOutAlt></a>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default NewNavBar;
