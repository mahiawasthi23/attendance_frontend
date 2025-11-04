import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      alert("Only @navgurukul.org emails are allowed!");
      return;
    }

    try {
      const res = await fetch(
        "https://attendance-backend-3fjj.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        if (data.message && data.message.toLowerCase().includes("not found")) {
          alert("User not found! Redirecting to SignUp...");
          navigate("/signup");
          return;
        }
        alert(data.message || "Invalid credentials!");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(data));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (onLogin) onLogin(data);


      if (data.role === "Admin") navigate("/admin-dashboard");
      else navigate("/student-dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to your account</p>

        <form onSubmit={handleLogin} className="login-form">
          <label className="login-label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

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

          <p className="login-text">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

