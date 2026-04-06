const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: String,
  examId: String,
  aptitudeScore: Number,
  codingScore: Number,
  integrityScore: Number,
  report: String,
});

module.exports = mongoose.model("Result", resultSchema);