import React, { useEffect, useState } from "react";

function ResultsPage() {

  const [results, setResults] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Access Denied!");
      window.location.href = "/";
    }

    // ✅ Fetch results
    fetch("http://localhost:5000/api/results")
      .then(res => res.json())
      .then(data => setResults(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Candidate Results</h2>

      {results.length > 0 ? (
        results.map((r, i) => (
          <div key={i} style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px"
          }}>
            <p><b>Aptitude:</b> {r.aptitudeScore}</p>
            <p><b>Coding:</b> {r.codingScore}</p>
            <p><b>Integrity:</b> {r.integrityScore}</p>
            <pre>{r.report}</pre>
          </div>
        ))
      ) : (
        <p>No results available</p>
      )}
    </div>
  );
}

export default ResultsPage;