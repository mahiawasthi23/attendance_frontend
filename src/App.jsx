import React, {useState} from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Login from './components/Login'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };
  
  return (
    <Router>
       <Navbar isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
