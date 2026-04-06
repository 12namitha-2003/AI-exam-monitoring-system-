import { useNavigate } from "react-router-dom";

function ExamSelector({ exam }) {
  const navigate = useNavigate();

  const startExam = () => {
    if (exam.type === "aptitude") {
      navigate("/aptitude");
    } else {
      navigate("/coding");
    }
  };

  return <button onClick={startExam}>Start Exam</button>;
}

export default ExamSelector;