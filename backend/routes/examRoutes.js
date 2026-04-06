const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");

// Get exam
router.get("/:id", async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  res.json(exam);
});

// Create exam
router.post("/create", async (req, res) => {
  const exam = new Exam(req.body);
  await exam.save();
  res.json({ message: "Exam created" });
});

module.exports = router;