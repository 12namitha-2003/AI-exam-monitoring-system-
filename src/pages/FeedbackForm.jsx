import React, { useState } from "react";

function FeedbackForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5
  });

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/api/feedback/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("✅ Feedback submitted!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💬 Give Feedback</h2>

      <input placeholder="Name"
        onChange={(e) => setForm({...form, name: e.target.value})} />

      <input placeholder="Email"
        onChange={(e) => setForm({...form, email: e.target.value})} />

      <textarea placeholder="Your feedback"
        onChange={(e) => setForm({...form, message: e.target.value})} />

      <input type="number" min="1" max="5"
        onChange={(e) => setForm({...form, rating: e.target.value})} />

      <br /><br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default FeedbackForm;