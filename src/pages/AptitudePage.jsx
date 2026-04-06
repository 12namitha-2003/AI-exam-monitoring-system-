import { useState } from "react";

function AptitudePage({ questions }) {
  const [answers, setAnswers] = useState({});

  return (
    <div>
      {questions.map((q, i) => (
        <div key={i}>
          <h3>{q.question}</h3>

          {q.options.map((opt, j) => (
            <div key={j}>
              <input
                type="radio"
                onChange={() =>
                  setAnswers({ ...answers, [i]: opt })
                }
              />
              {opt}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AptitudePage;