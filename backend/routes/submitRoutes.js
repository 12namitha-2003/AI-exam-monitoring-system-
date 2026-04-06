const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const Result = require("../models/Result");
const generateReport = async (data) => {
  let score = 100;
  let reasons = [];
  let explanation = [];

  if (data.lookAway > 10) {
    score -= 20;
    reasons.push("Frequent looking away");
    explanation.push(
      "The candidate frequently looked away from the screen, which may indicate distraction or external assistance."
    );
  }

  if (data.phoneDetected > 0) {
    score -= 30;
    reasons.push("Mobile phone usage detected");
    explanation.push(
      "A mobile phone was detected during the exam, which is considered a strong indicator of possible cheating."
    );
  }

  if (data.faceMissing > 5) {
    score -= 15;
    reasons.push("Face not visible");
    explanation.push(
      "The candidate's face was not visible for a significant duration, making monitoring difficult."
    );
  }

  if (data.tabSwitch > 2) {
    score -= 20;
    reasons.push("Multiple tab switches");
    explanation.push(
      "Frequent tab switching was detected, which may indicate searching for answers externally."
    );
  }

  let level = "Low";
  if (score < 80) level = "Medium";
  if (score < 50) level = "High";

  return `
Candidate Monitoring Report:

The candidate's behavior was analyzed throughout the exam.

${
  reasons.length === 0
    ? "No suspicious activity was detected. The candidate maintained good focus."
    : "Some suspicious activities were observed during the exam."
}

Reasons:
${reasons.map((r) => `- ${r}`).join("\n")}

Detailed Explanation:
${explanation.map((e, i) => `${i + 1}. ${e}`).join("\n")}

Final Integrity Score: ${score}/100
Risk Level: ${level}
`;
};

router.post("/submit", async (req, res) => {
  const { examId, answers, codingOutput, monitoringData } = req.body;

  const exam = await Exam.findById(examId);

  // ✅ Aptitude evaluation
  let correct = 0;
  exam.questions.forEach((q, i) => {
    if (answers[i] === q.correctAnswer) correct++;
  });

  const aptitudeScore = correct;

  // ✅ Coding evaluation (simple)
  let passed = 0;
  exam.codingQuestions[0]?.testCases.forEach((tc) => {
    if (codingOutput === tc.output) passed++;
  });

  const codingScore =
    (passed / exam.codingQuestions[0]?.testCases.length) * 100 || 0;

  // ✅ Integrity score (example)
  const integrityScore = 100 - monitoringData.suspicion;

  // ✅ Generate AI report
  const report = await generateReport(monitoringData);

  const result = new Result({
    examId,
    aptitudeScore,
    codingScore,
    integrityScore,
    report,
  });

  await result.save();

  res.json({ aptitudeScore, codingScore, integrityScore, report });
  // ================= GET ALL RESULTS =================
router.get("/results", async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching results" });
  }
});
});

module.exports = router;