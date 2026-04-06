import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get examId from URL
  const queryParams = new URLSearchParams(location.search);
  const examId = queryParams.get("examId");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= SEND OTP =================
  const sendOtp = async () => {
    if (!formData.email) {
      alert("Enter email first!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await res.json();
      alert(data.message);
      setOtpSent(true);

    } catch (error) {
      alert("Error sending OTP");
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Email Verified ✅");
        setIsVerified(true);
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Error verifying OTP");
    }
  };

  // ================= REGISTER =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      alert("Please verify OTP first!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration Successful 🎉");

        // ✅ Store examId (VERY IMPORTANT)
        if (examId) {
          localStorage.setItem("examId", examId);
        }

        // ✅ Go to system check (not login)
        navigate("/system-check");

      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Error registering");
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>

        <h2 style={{ textAlign: "center" }}>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <div style={{ position: "relative", width: "100%", margin: "10px 0" }}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ ...inputStyle, paddingRight: "110px" }}
          />

          <button type="button" onClick={sendOtp} style={otpButtonStyle}>
            Send OTP
          </button>
        </div>

        {otpSent && (
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />

            <button type="button" onClick={verifyOtp} style={verifyButtonStyle}>
              Verify
            </button>
          </div>
        )}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <span onClick={() => setShowPassword(!showPassword)} style={toggleStyle}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <div style={{ position: "relative" }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={toggleStyle}>
            {showConfirmPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button type="submit" style={buttonStyle}>
          Register
        </button>

      </form>
    </div>
  );
}
export default Register;