// 📁 frontend/src/pages/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 CLEAN LOGIN FUNCTION
  const handleLogin = async () => {
    console.log("Login clicked");

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password.trim()
        })
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        alert("Login Successful 🎉");
        navigate("/system-check");   // ✅ only navigation
      } else {
        alert(data.message || "Login failed");
      }

    } catch (error) {
      console.log("ERROR:", error);
      alert("Server not responding ❌");
    } finally {
      setLoading(false);
    }
  };

 const handleForgotPassword = async () => {
  if (!formData.email.trim()) {
    alert("Enter registered email first");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email.trim()
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Reset link sent to your email 📩");
    } else {
      alert(data.message);
    }

  } catch (error) {
    alert("Error sending reset link");
  }
};
  return (
    <div style={containerStyle}>

      <div style={formStyle}>

        <h2 style={{ textAlign: "center" }}>Sign In</h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Password */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={toggleStyle}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Options */}
        <div style={optionsRow}>
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            {" "}Remember me
          </label>

          <span style={linkStyle} onClick={handleForgotPassword}>
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <button
          type="button"
          style={buttonStyle}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        {/* Register */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don’t have an account?{" "}
          <span
            style={linkStyle}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>

      </div>

    </div>
  );
}

/* Styles */

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(to right, #6a11cb, #2575fc)"
};

const formStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "15px",
  width: "320px",
  boxShadow: "0 0 20px rgba(0,0,0,0.2)"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "20px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#000",
  color: "white",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  fontWeight: "bold"
};

const toggleStyle = {
  position: "absolute",
  right: "15px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: "12px",
  color: "blue"
};

const optionsRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
  marginTop: "5px"
};

const linkStyle = {
  color: "blue",
  cursor: "pointer"
};

export default Login;