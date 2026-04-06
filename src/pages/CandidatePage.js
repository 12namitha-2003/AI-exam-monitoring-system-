import React, { useEffect, useState } from "react";

function CandidatesPage() {

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      alert("Access Denied!");
      window.location.href = "/";
    }

    // ✅ Fetch users
    fetch("http://localhost:5000/api/auth/users")
      .then(res => res.json())
      .then(data => setCandidates(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👨‍🎓 Candidates List</h2>

      {candidates.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((c, i) => (
              <tr key={i}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates found</p>
      )}
    </div>
  );
}

export default CandidatesPage;