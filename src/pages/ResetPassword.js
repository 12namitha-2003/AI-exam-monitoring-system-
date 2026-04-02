import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = async () => {

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password reset successful");
        navigate("/");
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Error resetting password");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>

      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirm(e.target.value)}
      /><br/><br/>

      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;