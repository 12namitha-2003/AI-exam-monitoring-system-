import React, { useState, useEffect } from "react";

function CandidateDashboard() {

  const questions = [
    { id: 1, marks: 10, question: "Binary search complexity?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"] },
    { id: 2, marks: 5, question: "FIFO structure?", options: ["Stack", "Queue", "Tree", "Graph"] },
    { id: 3, marks: 10, question: "Best average sort?", options: ["Bubble", "Insertion", "Quick", "Selection"] }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  const question = questions[currentQuestion];
  const candidateName = localStorage.getItem("candidateName") || "Candidate";

  // Disable back
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => window.history.go(1);
  }, []);

  // Mark visited
  useEffect(() => {
    setVisited(prev => ({
      ...prev,
      [question.id]: true
    }));
  }, [question.id]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          alert("Time up! Exam submitted.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (id, option) => {
    setAnswers(prev => ({
      ...prev,
      [id]: option
    }));
  };

  const handleClear = () => {
    setAnswers(prev => {
      const updated = { ...prev };
      delete updated[question.id];
      return updated;
    });
  };

  const handleSaveNext = () => {
    setCurrentQuestion(prev =>
      Math.min(prev + 1, questions.length - 1)
    );
  };

  const getStatusColor = (id, index) => {
    if (index === currentQuestion) return "#2196F3";
    if (answers[id]) return "green";
    if (visited[id]) return "orange";
    return "lightgray";
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* LEFT PANEL */}
      <div style={{ width: "180px", borderRight: "1px solid gray", padding: "20px" }}>
        <h3>Questions</h3>

        {questions.map((q, index) => (
          <button
            key={q.id}
            style={{
              width: "50px",
              height: "40px",
              marginBottom: "10px",
              background: getStatusColor(q.id, index),
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
            onClick={() => setCurrentQuestion(index)}
          >
            {q.id}
          </button>
        ))}

        <br />

        <div>
          <p>🔵 Current</p>
          <p>🟢 Answered</p>
          <p>🟡 Visited</p>
          <p>⚪ Not Visited</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex: 1, padding: "20px", position: "relative" }}>

        {/* 🔥 TOP BAR */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Online Assessment</h2>

          {/* ✅ Submit button TOP RIGHT */}
          <button style={{
            background: "red",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            Submit Exam
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p><b>Candidate:</b> {candidateName}</p>
          <p><b>Time Left:</b> {minutes}:{seconds.toString().padStart(2, "0")}</p>
        </div>

        <hr />

        {/* Question */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Question {question.id}</h3>
          <span><b>{question.marks} Marks</b></span>
        </div>

        <p>{question.question}</p>

        {question.options.map((opt, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            <input
              type="radio"
              name={"question-" + question.id}
              checked={answers[question.id] === opt}
              onChange={() => handleAnswer(question.id, opt)}
            />
            {opt}
          </div>
        ))}

        {/* 🔥 BOTTOM BUTTON ROW */}
        <div style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          right: "20px",
          display: "flex",
          justifyContent: "space-between"
        }}>

          {/* LEFT */}
          <button onClick={handleClear}>
            Clear Response
          </button>

          {/* RIGHT */}
          <button
            style={{
              background: "#4CAF50",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={handleSaveNext}
          >
            Save & Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default CandidateDashboard;