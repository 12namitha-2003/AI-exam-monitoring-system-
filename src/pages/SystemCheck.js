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
  const [error, setError] = useState("");

  // ================= INIT =================
  useEffect(() => {
    startSystemCheck();

    // 🚫 Detect tab switching
    const handleVisibility = () => {
      if (document.hidden) {
        setTabSwitch(true);
        alert("❌ Tab switching is not allowed!");
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
      setError("");

      // 🔥 Detect if user turns OFF camera/mic later
      stream.getTracks().forEach(track => {
        track.onended = () => {
          setCamera(false);
          setMic(false);
          alert("⚠ Camera or Microphone turned OFF!");
        };
      });

    } catch (error) {
      setCamera(false);
      setMic(false);
      setError("⚠ Camera & Microphone access is required!");
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
      alert("❌ Please accept instructions!");
      return;
    }

    if (tabSwitch) {
      alert("❌ Tab switching detected!");
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

      // 👉 change route if needed
      navigate("/aptitude");

    } catch (err) {
      alert("❌ Fullscreen permission required!");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>

      <h2 style={{ textAlign: "center" }}>System Check & Instructions</h2>

      {/* ================= ERROR ================= */}
      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      )}

      {/* ================= GENERAL ================= */}
      <h3>📘 General Instructions</h3>
      <ul>
        <li>Read all questions carefully</li>
        <li>Do not refresh or close browser</li>
        <li>Ensure stable internet</li>
        <li>Answer all questions</li>
      </ul>

      {/* ================= STRICT ================= */}
      <h3>🚫 Strict Rules</h3>
      <ul>
        <li>No tab switching</li>
        <li>Camera must stay ON</li>
        <li>Microphone must stay ON</li>
        <li>Fullscreen is mandatory</li>
      </ul>

      {/* ================= AGREEMENT ================= */}
      <div style={{ marginTop: "15px" }}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        {" "}I agree to all instructions
      </div>

      {/* ================= STATUS ================= */}
      <h3 style={{ marginTop: "20px" }}>⚙ System Status</h3>
      <p>📷 Camera: {camera ? "✅ ON" : "❌ OFF"}</p>
      <p>🎤 Microphone: {mic ? "✅ ON" : "❌ OFF"}</p>
      <p>🛑 Tab Status: {tabSwitch ? "❌ VIOLATION" : "✅ OK"}</p>

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
        disabled={!camera || !mic || !agreed}
        style={{
          padding: "12px 25px",
          background: (!camera || !mic || !agreed) ? "gray" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: (!camera || !mic || !agreed) ? "not-allowed" : "pointer"
        }}
      >
        Start Exam
      </button>

    </div>
  );
}

export default SystemCheck;