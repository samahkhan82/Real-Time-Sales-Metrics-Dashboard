const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");

// Fetch Sales Data
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.ref("sales").once("value");
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales data" });
  }
});

module.exports = router;
