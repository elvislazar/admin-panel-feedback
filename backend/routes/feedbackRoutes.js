const express = require("express");
const Feedback = require("../models/Feedback");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback)
      return res.status(404).json({ message: "Feedback Not Found" });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add Feedback
router.post("/", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    const saved = await newFeedback.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Invalid Data" });
  }
});

// Update Feedback
router.put("/:id", async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Feedback Not Found" });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Invalid Data" });
  }
});

// Delete Feedback
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Feedback Not Found" });

    res.json({ message: "Feedback Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
