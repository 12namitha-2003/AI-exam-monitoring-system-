import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function AdminDetail() {

  const { id } = useParams();

  // 🔒 Protect page
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      alert("Access Denied!");
      window.location.href = "/";
    }
  }, []);

  // Dummy monitoring data
  const monitoringData = {
    1: {
      name: "Namitha",
      score: 20,
      alerts: ["No issues detected"]
    },
    2: {
      name: "Alex",
      score: 15,
      alerts: ["Multiple faces detected", "Looking away frequently"]
    },
    3: {
      name: "John",
      score: 22,
      alerts: ["No issues detected"]
    }
  };

  const candidate = monitoringData[id];

  return (
    <div style={{padding:"20px"}}>

      <h2>Candidate Monitoring Details</h2>

      <p><b>Name:</b> {candidate?.name}</p>
      <p><b>Score:</b> {candidate?.score}</p>

      <h3>⚠ Alerts</h3>

      <ul>
        {candidate?.alerts.map((alert,index)=>(
          <li key={index}>{alert}</li>
        ))}
      </ul>

    </div>
  );
}

export default AdminDetail;