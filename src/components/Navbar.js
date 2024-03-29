import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuClick, setMenuClick] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("authtoken");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <div className="site-logo">
          <img src={Logo} alt="logo" />
        </div>

        {localStorage.getItem("authtoken") ? (
          <div>
            <p onClick={handleLogout}>Logout</p>
          </div>
        ) : (
          <div>
            <p
              onClick={() => {
                navigate(`/login/user`);
              }}
            >
              User
            </p>
            <p
              onClick={() => {
                navigate(`/login/admin`);
              }}
            >
              Admin
            </p>
          </div>
        )}

        <div className="menu-dots" onClick={() => setMenuClick(!menuClick)}>
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>

      {menuClick && !localStorage.getItem("authtoken") && (
        <div className="menu-items">
          <ul>
            <li onClick={() => navigate("/login/user")}>User</li>
            <li onClick={() => navigate("/login/admin")}>Admin</li>
          </ul>
        </div>
      )}

      {menuClick && localStorage.getItem("authtoken") && (
        <div className="menu-items">
          <ul>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
