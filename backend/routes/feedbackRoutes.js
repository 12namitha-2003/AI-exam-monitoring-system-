const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// ================= SUBMIT FEEDBACK =================
router.post("/submit", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    res.json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving feedback" });
  }
});

// ================= GET FEEDBACK =================
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedback" });
  }
});

module.exports = router;