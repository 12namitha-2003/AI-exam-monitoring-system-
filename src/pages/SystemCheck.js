// 📁 frontend/src/pages/SystemCheck.js

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SystemCheck() {

  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [camera, setCamera] = useState(false);
  const [mic, setMic] = useState(false);
  const [tabSwitch, setTabSwitch] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    startSystemCheck();

    // 🚫 Detect tab switching
    const handleVisibility = () => {
      if (document.hidden) {
        setTabSwitch(true);
        alert("❌ Tab switching is not allowed during the exam!");
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // ================= CAMERA + MIC =================
  const startSystemCheck = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCamera(true);
      setMic(true);

    } catch (error) {
      alert("⚠ Please allow camera & microphone access!");
    }
  };

  // ================= STOP CAMERA =================
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  // ================= START EXAM =================
  const handleStartExam = async () => {

    if (!agreed) {
      alert("Please accept instructions before starting!");
      return;
    }

    if (tabSwitch) {
      alert("❌ Tab switching detected. Exam blocked!");
      return;
    }

    if (!camera || !mic) {
      alert("❌ Camera & Microphone must be ON!");
      return;
    }

    try {
      const elem = document.documentElement;

      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      }

      stopCamera();
      navigate("/exam");

    } catch (err) {
      alert("Fullscreen permission required!");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>

      <h2 style={{ textAlign: "center" }}>System Check & Instructions</h2>

      {/* ================= GENERAL INSTRUCTIONS ================= */}
      <h3>📘 General Instructions</h3>
      <ul>
        <li>Read all questions carefully before answering</li>
        <li>Do not refresh or close the browser during the exam</li>
        <li>Ensure a stable internet connection</li>
        <li>Each question carries marks as specified</li>
        <li>You can change answers before final submission</li>
      </ul>

      {/* ================= STRICT RULES ================= */}
      <h3>🚫 Strict Rules</h3>
      <ul>
        <li>No tabs other than the exam tab should be open</li>
        <li>Switching tabs will be detected and may terminate the exam</li>
        <li>Camera must remain ON at all times</li>
        <li>Microphone must remain ON at all times</li>
        <li>Fullscreen mode is mandatory</li>
      </ul>

      {/* ================= AGREEMENT ================= */}
      <div style={{ marginTop: "15px" }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        {" "}I agree to follow all instructions and rules
      </div>

      {/* ================= STATUS ================= */}
      <h3 style={{ marginTop: "20px" }}>⚙ System Status</h3>
      <p>📷 Camera: {camera ? "✅ ON" : "❌ OFF"}</p>
      <p>🎤 Microphone: {mic ? "✅ ON" : "❌ OFF"}</p>
      <p>🛑 Tab Status: {tabSwitch ? "❌ VIOLATION DETECTED" : "✅ OK"}</p>

      <br />

      {/* ================= CAMERA PREVIEW ================= */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "10px",
          border: "1px solid #ccc"
        }}
      />

      <br /><br />

      {/* ================= START BUTTON ================= */}
      <button
        onClick={handleStartExam}
        style={{
          padding: "12px 25px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Start Exam
      </button>

    </div>
  );
}

export default SystemCheck;