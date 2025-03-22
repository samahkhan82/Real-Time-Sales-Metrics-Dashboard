const express = require("express");
const router = express.Router();
const { auth } = require("../config/firebase");

// User Authentication
router.post("/login", async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await auth.verifyIdToken(token);
    res.json({ uid: decodedToken.uid, role: "viewer" });
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
});

module.exports = router;
