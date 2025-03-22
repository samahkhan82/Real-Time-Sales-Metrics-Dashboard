const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { db, auth } = require("./config/firebase");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const salesRef = db.ref("sales");

// API to fetch sales data
app.get("/sales", async (req, res) => {
  try {
    const snapshot = await salesRef.once("value");
    const salesData = snapshot.val() || {}; // Ensure no null values

    const salesArray = Object.entries(salesData).map(([id, data]) => ({
      id,
      ...data,
    }));

    res.status(200).json(salesArray);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sales data" });
  }
});

// API to add a sale
app.post("/add-sale", async (req, res) => {
  try {
    const { amount, product } = req.body;
    const timestamp = Date.now();
    await salesRef.child(timestamp).set({ amount, product });

    res.status(200).json({ message: "Sale added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add sale" });
  }
});

// Real-time sales updates via WebSockets
salesRef.on("value", (snapshot) => {
  io.emit("sales_update", snapshot.val());
});

server.listen(5000, () => console.log("Server running on port 5000"));
