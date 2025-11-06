import React, { useState, useEffect, useCallback } from 'react';
import './UserProfileDropdown.css'; 

const UserProfileDropdown = ({ onLogout }) => {
    const [userData, setUserData] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

   
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user) {
            setUserData(user);
        }
    }, []);

  
    const getInitial = useCallback(() => {
        if (userData && userData.name) {
            return userData.name.charAt(0).toUpperCase();
        }
        return 'U';
    }, [userData]);
    

    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    
    if (!userData) {
        return null;
    }

    return (
        <div 
            className="profile-dropdown-container"
            onClick={toggleDropdown} 
        >
        
            <div className="profile-initial-logo" title={userData.name}>
                {getInitial()}
            </div>

            {dropdownOpen && (
                <div className="profile-dropdown-content">
                    <div className="profile-header">
                        <div className="profile-initial-logo large-logo">
                            {getInitial()}
                        </div>
                        <p className="profile-name-text">{userData.name}</p>
                        <p className="profile-email-text">{userData.email}</p>
                    </div>
                    
                    <div className="profile-divider"></div>
                    
                    
                    <button 
                        className="profile-logout-btn" 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            onLogout(); 
                        }}
                    >
                        Sign Out
                    </button>
                    
                    <small className="google-like-text">
                        Google Account
                    </small>
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown;