import React from "react";
import { useParams } from "react-router-dom";

function AdminDetail() {

  const { id } = useParams();

  return (
    <div style={{padding:"20px"}}>
      <h2>Candidate Monitoring Details</h2>
      <p>Candidate ID: {id}</p>
    </div>
  );
}

export default AdminDetail;