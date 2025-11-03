import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, userRole, onLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/");
    setMenuOpen(false);
  };

  const dashboardLink =
    userRole === "admin" ? "/admin-dashboard" : "/student-dashboard";

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar_logo" onClick={handleLinkClick}>
            AJMF + Navgurukul
          </Link>
        </div>

   
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>


        <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={handleLinkClick}>
            Home
          </Link>

          {!isLoggedIn && (
            <>
              <Link to="/login" className="nav-link" onClick={handleLinkClick}>
                Login
              </Link>
              <Link to="/signup" className="nav-link" onClick={handleLinkClick}>
                Signup
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link
                to={dashboardLink}
                className="nav-link"
                onClick={handleLinkClick}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="nav-link logout-button"
                aria-label="Logout"
              >
                Logout
              </button>
              <Link
                to="/profile"
                className="nav-link profile-icon"
                title="Profile"
                onClick={handleLinkClick}
              >
                👤
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
