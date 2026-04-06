import { useState } from "react";
import CodeEditor from "../components/CodeEditor";

function CodingPage() {
  const [code, setCode] = useState("");

  const runCode = () => {
    console.log("Running code...");
  };

  const submitCode = () => {
    console.log("Submitting code...");
  };

  return (
    <div>
      <h2>Coding Test</h2>

      <CodeEditor code={code} setCode={setCode} />

      <button onClick={runCode}>Run</button>
      <button onClick={submitCode}>Submit</button>
    </div>
  );
}

export default CodingPage;