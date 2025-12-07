
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    res.status(201).json({ success: true, message: "Feedback submitted" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    res.status(200).json({ success: true, data: [] }); // dummy for now
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
