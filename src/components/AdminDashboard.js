import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();  // ✅ required

  return (
    <div style={{ padding: "20px" }}>

      <h2>Admin Dashboard</h2>

      {/* ✅ MENU */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => navigate("/create-exam")}>
          📝 Create Question Paper
        </button>

        <button onClick={() => navigate("/candidates")}>
          👨‍🎓 View Candidates
        </button>

        <button onClick={() => navigate("/results")}>
          📊 View Results
        </button>

        <button onClick={() => navigate("/feedback")}>
          💬 View Feedback
        </button>
      </div>

    </div>
  );
}

export default AdminDashboard;