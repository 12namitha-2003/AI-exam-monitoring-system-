const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  rating: Number
});

module.exports = mongoose.model("Feedback", feedbackSchema);