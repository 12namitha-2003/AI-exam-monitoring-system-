import React, { useEffect, useState } from "react";

function CreateExamPage() {

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  // 🔒 Admin protection
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Access Denied!");
      window.location.href = "/";
    }
  }, []);

  // ➕ Add new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: ""
      }
    ]);
  };

  // ❌ Remove question
  const removeQuestion = (index) => {
    const newQ = questions.filter((_, i) => i !== index);
    setQuestions(newQ);
  };

  // ✏️ Update question
  const updateQuestion = (index, value) => {
    const newQ = [...questions];
    newQ[index].question = value;
    setQuestions(newQ);
  };

  // ✏️ Update option
  const updateOption = (qIndex, optIndex, value) => {
    const newQ = [...questions];
    newQ[qIndex].options[optIndex] = value;
    setQuestions(newQ);
  };

  // ✔ Update correct answer
  const updateAnswer = (index, value) => {
    const newQ = [...questions];
    newQ[index].correctAnswer = value;
    setQuestions(newQ);
  };

  // 🚀 Submit exam
  const handleSubmit = async () => {

    if (!title || questions.length === 0) {
      alert("Please add title and questions!");
      return;
    }

    const examData = {
      title,
      type: "aptitude",
      questions
    };

    const res = await fetch("http://localhost:5000/api/exam/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(examData)
    });

    const data = await res.json();

    localStorage.setItem("examId", data.examId);

    alert("✅ Exam Created Successfully!");
  };

  // ✅ ONLY ONE RETURN (inside function)
  return (
    <div style={{ padding: "20px" }}>

      <h2>📝 Create Question Paper</h2>

      {/* Exam Title */}
      <input
        placeholder="Enter Exam Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <button onClick={addQuestion}>➕ Add Question</button>

      {/* Questions */}
      {questions.map((q, index) => (
        <div key={index} style={{
          border: "1px solid #ccc",
          padding: "15px",
          marginTop: "15px",
          borderRadius: "10px"
        }}>

          <h4>Question {index + 1}</h4>

          <input
            placeholder="Enter question"
            value={q.question}
            onChange={(e) => updateQuestion(index, e.target.value)}
            style={{ width: "100%" }}
          />

          <br /><br />

          {q.options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => updateOption(index, i, e.target.value)}
              style={{ display: "block", marginBottom: "5px" }}
            />
          ))}

          <input
            placeholder="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) => updateAnswer(index, e.target.value)}
          />

          <br /><br />

          <button onClick={() => removeQuestion(index)}>
            ❌ Remove Question
          </button>

        </div>
      ))}

      <br />

      <button onClick={handleSubmit}>
        🚀 Save Question Paper
      </button>

    </div>
  );
}

export default CreateExamPage;





const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f4f6f9"
};

const formStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "400px"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "blue",
  color: "white"
};

const otpButtonStyle = {
  position: "absolute",
  right: "10px",
  top: "5px"
};

const verifyButtonStyle = {
  background: "green",
  color: "white"
};

const toggleStyle = {
  position: "absolute",
  right: "10px",
  cursor: "pointer"
};