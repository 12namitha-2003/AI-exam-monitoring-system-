const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  title: String,
  type: String, // "aptitude" or "coding"
  duration: Number,

  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],

  codingQuestions: [
    {
      title: String,
      description: String,
      testCases: [
        {
          input: String,
          output: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Exam", examSchema);