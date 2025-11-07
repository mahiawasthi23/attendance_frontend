import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfileDropdown from "./UserProfileDropdown";
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
             <img src="Anish_nav.png" alt="Navgurukul Logo" className="nav-navgurukul-logo" />
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
            <Link to="/login" className="nav-link" onClick={handleLinkClick}>
              Login
            </Link>
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
              
              
              <UserProfileDropdown onLogout={handleLogout} /> 
              
              
              
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;