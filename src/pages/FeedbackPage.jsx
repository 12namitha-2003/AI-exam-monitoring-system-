import React, { useEffect, useState } from "react";

function FeedbackPage() {

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      alert("Access Denied!");
      window.location.href = "/";
    }

    fetch("http://localhost:5000/api/feedback")
      .then(res => res.json())
      .then(data => setFeedbacks(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>💬 Candidate Feedback</h2>

      {feedbacks.length > 0 ? (
        feedbacks.map((f, i) => (
          <div key={i} style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px"
          }}>
            <p><b>Name:</b> {f.name}</p>
            <p><b>Email:</b> {f.email}</p>
            <p><b>Rating:</b> ⭐ {f.rating}</p>
            <p><b>Message:</b> {f.message}</p>
          </div>
        ))
      ) : (
        <p>No feedback available</p>
      )}
    </div>
  );
}

export default FeedbackPage;