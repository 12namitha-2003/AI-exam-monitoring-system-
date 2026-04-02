import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  // 🔒 Protect admin page
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      alert("Access Denied!");
      window.location.href = "/";
    }
  }, []);

  // Dummy data (later from backend)
  const candidates = [
    { id: 1, name: "Namitha", score: 20, status: "Normal" },
    { id: 2, name: "Alex", score: 15, status: "Suspicious" },
    { id: 3, name: "John", score: 22, status: "Normal" }
  ];

  return (
    <div style={{ padding: "20px" }}>

      <h2>Admin Dashboard</h2>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((c) => (
            <tr
              key={c.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/admin/${c.id}`)}
            >
              <td>{c.name}</td>
              <td>{c.score}</td>
              <td style={{ color: c.status === "Suspicious" ? "red" : "green" }}>
                {c.status}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;