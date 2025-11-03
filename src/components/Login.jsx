import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@navgurukul.org")) {
      alert("Only @navgurukul.org emails are allowed to login!");
      return;
    }

    try {
      const response = await fetch(
        "https://attendance-backend-3fjj.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Invalid credentials!");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(data));
      if (onLogin) onLogin(data);

      alert("Login successful!");

      if (data.role === "admin") navigate("/admin-dashboard");
      else if (data.role === "student") navigate("/student-dashboard");
      else alert("Unknown role. Contact admin.");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to your account to continue</p>

        <form onSubmit={handleLogin} className="login-form">
          <label className="login-label">Email / Student ID</label>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email or ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label className="login-label">Password</label>
          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="forgot-link">
            <a href="#">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
