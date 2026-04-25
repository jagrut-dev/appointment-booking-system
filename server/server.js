require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./lib/db"); // ✅ DB connection file

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ADD THIS BLOCK HERE
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ DB ERROR FULL:", err);
  } else {
    console.log("✅ DB connected:", res.rows[0]);
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Appointment Booking API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});